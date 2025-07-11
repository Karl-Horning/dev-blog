---
title: Using Blackboard's Swagger File to Create a Postman Collection and Make an API Call
date: 2025-07-11T10:00:00+00:00
author: Karl Horning
description: "Learn how to import Blackboard Learn's Swagger file into Postman, configure authentication, and make your first API call using client credentials."
summary: "This beginner-friendly tutorial walks you through importing Blackboard's Learn API into Postman, setting up OAuth2 authentication, and making a test request using client credentials."
tags: ["Blackboard", "Postman", "API", "Swagger", "OAuth2", "EdTech"]
image: /assets/img/postman_blackboard.webp
thumbnail: "/assets/img/postman_blackboard.webp"
---

This guide will help you import Blackboard Ultra's API into Postman, set up authentication, and make your first API request. It’s written for users who may be new to Postman or working with APIs.

---

## 🛠️ Prerequisites

Before you begin, make sure you have:

- A Blackboard Learn instance with REST API access enabled
- A registered application in the [Anthology Developer Portal](https://developer.blackboard.com/)
- Postman installed ([Download here](https://www.postman.com/downloads/))
- Credentials for the `client_credentials` grant type (provided when registering your application)

---

## 🔁 Step 1: Download the Blackboard API Swagger File

1. Go to the Blackboard REST API documentation:

   👉 [https://developer.blackboard.com/portal/displayApi](https://developer.blackboard.com/portal/displayApi)

2. Under the **Learn APIs** section, right-click the link below and open it in a new tab (or, open the link below 🤪):

   👉 [https://devportal-docstore.s3.amazonaws.com/learn-swagger.json](https://devportal-docstore.s3.amazonaws.com/learn-swagger.json)

![Browser prompt to save the learn-swagger.json file as a JSON document.](/dev-blog/assets/img/postman_blackboard/1.3_save_the_json_file.webp)

3. When prompted to save the file:

   1. Name the file `learn-swagger.json`
   2. Choose **JavaScript Object Notation (.json)** as the file type
   3. Click **Save**

![JSON Swagger file open in a browser tab with the Save button highlighted.](/dev-blog/assets/img/postman_blackboard/1.4_alternative_save.webp)

4. Alternatively, if your browser displays the file instead of downloading it, click **Save**, then follow step 3.

---

## 🧰 Step 2: Import the Swagger File into Postman

![Postman interface showing how to create a new workspace from the New menu.](/dev-blog/assets/img/postman_blackboard/2.1_new_workspace.webp)

1. Open **Postman**.
2. From the top-left, click **New > Workspace**.

![Postman workspace creation window with "Blank workspace" selected.](/dev-blog/assets/img/postman_blackboard/2.3_blank_workspace.webp)

3. Select **Blank workspace** and click **Next**.
4. Name your workspace something like **Blackboard APIs**, then click **Create**.

![Postman interface with the Import window open, selecting the Swagger file as a Postman Collection.](/dev-blog/assets/img/postman_blackboard/2.5_import_postman_collection.webp)

5. Once in your new workspace:

   1. Click **File > Import…** (or press `Command + O`)
   2. Locate and select the `learn-swagger.json` file you downloaded
   3. Make sure **Postman Collection** is selected as the import type
   4. Click **Import**

You should now see the Learn API endpoints available in the **Collections** tab.

---

## 🔐 Step 3: Set Up the Authentication Environment

![Creating a new environment in Postman with the Create Environment modal open.](/dev-blog/assets/img/postman_blackboard/3.1_create_env.webp)

1. In Postman, click **Environments** (top-right) > **Create Environment**.

![Postman environment editor showing variables for base URL, client username, and client password.](/dev-blog/assets/img/postman_blackboard/3.2_save_env.webp)

2. Name the environment something like **Blackboard Auth**.
3. Add the following **variables**:

| Variable Name       | Initial Value           | Type    |
| ------------------- | ----------------------- | ------- |
| `baseUrl`           | (Provided by Anthology) | Default |
| `basicAuthUsername` |(From Developer Portal)  | Secret  |
| `basicAuthPassword` |(From Developer Portal)  | Secret  |

> These values are provided when you register your application in the [Anthology Developer Portal](https://developer.blackboard.com/). You’ll use the `client ID` as your username and the `client secret` as your password.

4. Click **Save** (or press `Command + S`).

---

## 🔑 Step 4: Request an Access Token

To interact with Blackboard's REST API, you’ll need to obtain an OAuth2 access token. This token authenticates your API calls and is required for most requests.

![Postman Params tab with only the grant_type parameter selected and set to client_credentials.](/dev-blog/assets/img/postman_blackboard/4.1_set_params.webp)

1. Make sure **Blackboard Auth** is selected in the environment dropdown (top-right).
2. In the **Collections** tab, go to:
   `Learn APIs > learn > api > public > v1 > oauth2 > token > Request Token`
3. Select the **Params** tab:

   1. Deselect all parameters except for `grant_type`
   2. Set `grant_type` to `client_credentials`

![Postman Tests tab showing a script that saves the access token to an environment variable.](/dev-blog/assets/img/postman_blackboard/4.4_set_scripts.webp)

4. Go to the **Authorization** tab:

   - **Type:** Basic Auth
   - **Username:** {% raw %}`{{basicAuthUsername}}`{% endraw %}
   - **Password:** {% raw %}`{{basicAuthPassword}}`{% endraw %}

5. Go to the **Headers** tab and change the existing header to:

   - **Key:** `Content-Type`
   - **Value:** `application/x-www-form-urlencoded`
6. Go to the **Scripts** tab (may be labelled "Tests" or "Post-response"):

   - Paste the following script:

   ```javascript
   // Parse the response body to get the access token.
    const response = pm.response.json();

    // Set the access token in the environment variables.
    pm.environment.set('apiKey', `Bearer ${response.access_token}`);
   ```

7. Click **Send** (or press `Command + Enter`) to retrieve your access token.

---

## 🌐 Step 5: Add the Access Token to All API Requests

![Postman Collection-level Authorization tab set to API Key with Authorization as the header key.](/dev-blog/assets/img/postman_blackboard/5.1_set_access_token.webp)

1. In the **Collections** tab, click on **Learn APIs** (at the top level).
2. Select the **Authorization** tab.
3. Change the following settings:

| Field         | Value                                |
| ------------- | ------------------------------------ |
| **Auth Type** | API Key                              |
| **Key**       | `Authorization`                      |
| **Value**     | {% raw %}`{{apiKey}}`{% endraw %}    |
| **Add to**    | Header                               |

4. Click **Save** (or press `Command + S`).

All requests in the collection will now use your access token automatically.

> 💡 **Tip:** Some individual requests may still have old parameters set by default. If you get errors, check the **Params** tab and uncheck or delete any unnecessary ones.

You're now ready to explore Blackboard's Learn API.

## ✅ Step 6: Make a Simple API Call

Let’s test the setup with a basic GET request to list users.

1. In the **Collections** tab, navigate to:
   `Learn APIs > learn > api > public > v1 > users > Get Users`
2. Click on the request and make sure:
   - The **Authorization** is inherited from the collection
   - There are no unnecessary parameters selected
3. Click **Send**.

You should receive a JSON response containing user records.

If you receive a 401 error, double-check that your access token has been saved and that it's correctly set under the collection’s **Authorization** tab.

## 🧯 Troubleshooting

Here are some common issues and how to fix them:

- **401 Unauthorized**:
  - Check your `client_credentials` (client ID and secret)
  - Make sure the token request succeeded
  - Confirm the token is included in the header (check the "Authorization" tab is set to "Bearer Token" and using the correct variable)

- **400 Bad Request**:
  - This often happens if unused parameters are still selected in the request.
  - For example, when testing `GET /users`, if parameters like `dataSourceId` are left checked and contain placeholder or junk values, Blackboard will reject the request with a `400` error and a verbose message like:

    ```json
    {
      "status": 400,
      "message": ": 1 errors\nField error in object 'usersSearchCriteriaPubV1' on field 'dataSourceId': rejected value [anim nostrud occaecat elit amet]; ...",
      "extraInfo": "..."
    }
    ```

  - Solution: go to the **Params** tab and deselect or delete any unnecessary parameters before sending the request.

- **Empty or unexpected responses**:
  - Your Learn environment may not contain any users or courses yet.
  - Try calling a different endpoint or inspecting the full JSON response for pagination info.

- **Token not saving or reused**:
  - Ensure your token save script (under the **Tests** tab) is error-free and includes the `Bearer` prefix.
  - Check your Collection-level **Authorization** settings are set to inherit the token from the environment variable (for example, {% raw %}`{{token}}`{% endraw %}).

## 🎉 Summary

You've now:

- Imported Blackboard’s Learn API (Swagger file) into Postman
- Set up a Postman environment for OAuth2 authentication
- Retrieved an access token using the `client_credentials` grant type
- Configured all API requests to use your token automatically
- Made your first successful API request

From here, you can explore other endpoints to manage users, courses, announcements, enrolments, and more. If you’re working in an institutional context, be sure to follow data protection policies when experimenting with real user data.

Happy exploring!

— Karl
