---
title: Running Canvas LMS Locally with Docker (and Why canvas.docker Didn't Work for Me)
date: 2025-08-11T18:00:00+00:00
author: Karl Horning
description: "Learn how to run Canvas LMS locally using Docker, troubleshoot common issues with the canvas.docker proxy, and access the API and GraphQL sandbox."
summary: "This guide walks you through setting up Canvas LMS using Docker, explains why 'canvas.docker' might not work out of the box, and shows how to access the Canvas API and GraphQL interface locally."
tags: ["Canvas LMS", "Docker", "EdTech", "API", "GraphQL", "Local Development"]
image: /assets/img/canvas_lms_docker.webp
thumbnail: "/assets/img/docker-canvas.webp"
---

I recently set up Canvas LMS locally using Docker and thought I'd share the process — and more importantly, the **troubleshooting** I had to do when things didn't quite go as expected. Hopefully, this will help someone else who's running into the same issues.

## 🧱 Getting Started

I followed the [Canvas LMS Quick Start guide](https://github.com/instructure/canvas-lms/wiki/Quick-Start), which uses Docker Compose to spin up all the required services. Once I had the repo cloned, I ran:

```sh
docker compose up -d
```

After that, the instructions say to visit:

```bash
http://canvas.docker
```

...but when I opened that URL, I was greeted with:

![Screenshot of the Dinghy HTTP Proxy page](/dev-blog/assets/img/canvas_docker/dinghy-http-proxy-page.webp)

> **Welcome to the Dinghy HTTP Proxy**
> If you expected to see your application at this URL, it may not be running, or it may be improperly configured.

At this point, Canvas wasn't accessible — even though all the containers seemed to be running:

![Canvas running in Docker](/dev-blog/assets/img/canvas_docker/docker-running-canvas.webp)

---

## 🔍 Debugging the Proxy Message

It turned out that the `canvas.docker` domain was just a local DNS alias that relied on Dinghy or a similar proxy, but **Canvas itself wasn't being served properly**, because:

* The Docker Compose config **didn't expose any ports**.
* The `web` service was running Nginx and Passenger inside the container, but nothing on the host could access it.

I checked this by running:

```sh
docker compose ps
```

...and saw that the `web` service didn't list any ports like `0.0.0.0:3000->80/tcp`. That confirmed it.

---

## 🛠️ Fixing It with `docker-compose.override.yml`

To expose Canvas to my local machine, I updated the `docker-compose.override.yml` file by adding this:

```yaml
services:
  web:
    ports:
      - "3000:80"
```

This tells Docker to map **port 80 inside the container** (where Nginx is serving Canvas) to **port 3000 on my host machine**.

Then I restarted everything:

```sh
docker compose down
docker compose up -d
```

And now, I could access Canvas at:

```bash
http://localhost:3000
```

🎉 Success!

---

## ❌ Why `http://canvas.docker` Still Doesn't Work

The `canvas.docker` URL requires additional setup. Unless you're using Dinghy or explicitly mapping that hostname to `127.0.0.1` in `/etc/hosts`, your browser won't know where to send the request.

If you really want to use that domain locally, you can add this to your hosts file:

```plaintext
127.0.0.1 canvas.docker
```

But for me, just using `http://localhost:3000` is simpler and works fine.

---

## 🔍 API Troubleshooting

Once I had Canvas running, I tried to access the API by visiting:

```bash
http://localhost:3000/api/v1/
```

But that gave me a Rails routing error:

> **No route matches \[GET] "/api/v1"**

This is expected — Canvas's API doesn't have a root endpoint at `/api/v1/`. Instead, you need to call specific endpoints like:

```bash
http://localhost:3000/api/v1/users/self
```

You can access the API using an access token from your account settings, or by using `fetch` in the browser console (if you're already logged in).

---

## ⚙️ Using GraphQL

Canvas also supports GraphQL, and in development mode you can use the built-in GraphiQL sandbox interface. Just go to:

```bash
http://localhost:3000/graphiql
```

Here you can run queries like:

```graphql
query Account {
  account(id: "1") {
    name
    id
  }
}
```

If you're logged in, you'll see results for your account — no token needed in the browser.

---

## Final Thoughts

If you're trying to get Canvas LMS running locally and hit a wall with `canvas.docker`, don't worry — you're not alone. Mapping the internal port to your host using Docker Compose is the key. Once that's done, everything works as expected using `http://localhost:3000`.

If you've been through this setup yourself or have tips for making it smoother, I'd love to hear them!

— Karl
