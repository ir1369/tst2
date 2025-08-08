# Google OAuth Setup Instructions

## 🚀 Quick Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### 2. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "SoftQA"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes: `openid`, `email`, `profile`

### 3. Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

### 4. Environment Variables
Create a `.env.local` file in your project root:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 5. Test the Integration
1. Start your development server: `npm run dev`
2. Go to `/login`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth flow

## 🔧 Troubleshooting

### Common Issues:
- **"Invalid redirect URI"**: Make sure the redirect URI in Google Console matches exactly
- **"Client ID not found"**: Check that your environment variables are loaded correctly
- **CORS errors**: Ensure your domain is properly configured in Google Console

### Security Notes:
- Never commit `.env.local` to version control
- Use different client IDs for development and production
- Regularly rotate your client secrets

## 📚 Additional Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication](https://nextjs.org/docs/authentication) 