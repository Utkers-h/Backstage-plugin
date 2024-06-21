# Setting Up a Custom Plugin for Creating GitHub Repositories in Backstage
This guide will walk you through setting up a custom plugin in Backstage for creating GitHub repositories. The setup includes configuring GitHub OAuth for authentication, updating the frontend and backend of your Backstage instance, and ensuring your GitHub user is properly defined

------------------------
## Step 1: [Create an OAuth App in GitHub](https://backstage.io/docs/auth/github/provider/)
- Navigate to GitHub.com > Account Settings > Developer Settings > OAuth Apps.
- Click on New OAuth App.
- Fill in the required fields:
- Homepage URL: http://localhost:7007
- Authorization callback URL: http://localhost:7007/api/auth/github/handler/frame
- Click Register application.
- You will receive a Client ID and Client Secret. Keep these handy as they will be used in your Backstage configuration.

## Step 2: Update app-config.yaml
- Add the following configuration for GitHub authentication:
```sh
auth:
  environment: development
  providers:
    github:
      development:
        clientId: <your-client-id>
        clientSecret: <your-client-secret>
        signIn:
          resolvers:
            # Choose one of these resolvers based on your setup
            - resolver: emailMatchingUserEntityProfileEmail
            - resolver: emailLocalPartMatchingUserEntityName
            - resolver: usernameMatchingUserEntityName

```

## Step 3: Update the Frontend
- Navigate to  packages/app/src/App.tsx.
- Import the GitHub authentication API reference
  
  - ``` sh
    import { githubAuthApiRef } from '@backstage/core-plugin-api';

    ```
- Add the GitHub authentication configuration:'
-  ``` sh
    const githubAuthCfg = {
    id: 'github-auth-provider',
    title: 'GitHub',
    message: 'Sign in using GitHub',
    apiRef: githubAuthApiRef,
    };
   ```
- Update the SignInPage component in your App.tsx:
  -   ``` sh
      backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

      ```
## Step 5: Define Your GitHub User
- Open or create examples/org.yaml.
- Add your GitHub user configuration:
  
  - ``` sh
    apiVersion: backstage.io/v1alpha1
    kind: User
    metadata:
    name: <github-username>
    spec:
      memberOf: [guests]

    ```
## Step 6: Set Up Environment Variables
- Create a fine-grained GitHub token with necessary permissions.
- Add the token to your environment variables:
  
   -   ``` sh
       export GITHUB_TOKEN="<your-fine-grained-github-token>"
        ```
## Step 8: Run the Application
- Navigate to the root directory of your Backstage project.
- Start the development server:
  
  - ``` sh
    yarn dev
    ```
