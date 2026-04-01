## Todo Frontend

This frontend is a Next.js app for the Todo backend.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env.local
```

3. Set the backend URL in `.env.local`.

For local backend development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

For the deployed backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://todo-backend-prod-304789550280.us-east-1.elasticbeanstalk.com
```

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy

The simplest deployment target for this Next.js app is Vercel.

Before deploying, add this environment variable in the hosting platform:

```env
NEXT_PUBLIC_API_BASE_URL=http://todo-backend-prod-304789550280.us-east-1.elasticbeanstalk.com
```

For Vercel:

1. Import the `fe` directory from GitHub as a new project.
2. Use the `Next.js` framework preset.
3. Add `NEXT_PUBLIC_API_BASE_URL` in Project Settings -> Environment Variables.
4. Deploy.

Official references:

- [Next.js environment variables](https://nextjs.org/docs/pages/guides/environment-variables)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
