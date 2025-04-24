# Google OAuth Setup for SummitPoint

This guide will help you set up Google OAuth for the SummitPoint application.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

## Steps to Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Name your OAuth client (e.g., "SummitPoint Client")
7. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Your production URL
8. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.com/api/auth/callback/google`
9. Click "Create"
10. You will receive a Client ID and Client Secret

## Setting Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Configuration
API_BASE_URL=https://summitpoint.co.tz/api
```

For the `NEXTAUTH_SECRET`, you can generate a secure random string using:

```bash
openssl rand -base64 32
```

## Testing Google OAuth

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the login page
3. Click "Sign in with Google"
4. Complete the Google authentication flow

## Troubleshooting

- Ensure your redirect URIs exactly match what's configured in Google Cloud Console
- Check that your environment variables are correctly loaded
- Verify that your Google Cloud project has the Google+ API enabled
- If you're getting errors about missing scopes, ensure you've configured the necessary OAuth consent screen 