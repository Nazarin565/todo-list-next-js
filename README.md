# Skidochki app

This project uses Next.js with Firebase.

## How to Run the Project Locally

1. Clone repository with `git clone`
2. Install dependencies with `npm install` or `npm i`
3. Сreate and add keys from your Firebase project according to the following instructions
4. Run `npm run dev`

#### How to get and add Firebase keys

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project or create a new one.
3. Go to **Project settings**.
4. In the **General** tab, find the **Your apps** section and click the icon to set up for your web app.
5. Copy the following configuration parameters:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

#### Adding Keys to `.env.local`

Create a `.env.local` file in the root directory of your project and add the keys you obtained:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```
