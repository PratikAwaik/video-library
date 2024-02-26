# Video library

A video based application library where you can upload videos, give them title and description. Browse videos uploaded by other users and upload your own.

Check it out [here](https://vidext-video-library.vercel.app/).

## Setup the repo locally

1. Clone the repository using `git clone https://github.com/PratikAwaik/video-library.git`
2. Run `pnpm install` or `npm install` or use any other package manager of your choice to install the dependencies.
3. Copy `.env.example` file to `.env` and fill in the required environment variables.
4. Finally, run `pnpm run dev` or `npm run dev` or use any other package manager of your choice to run the development environment.

## Testing the API calls

1. The file `video-feed.tsx` contains the component for displaying all the videos uploaded by the users. The component also contains the API call, `getVideos` to fetch all the videos. Therefore, to check if the API functions properly, just visit the homepage and check if the videos are fetched.
2. To test the `incrementPlayCount` functionality, click on any of the videos from the homepage. The view count will increase by one only if you've visited the video for the first time.

## Features

- Browse video library
- Upload videos
- Likes and views
- Mobile responsive layout
- Loading and error pages
- Media player controls using [media-chrome library](https://www.media-chrome.org/)
- Using server side rendering for video feed and video details page

## Tech stack

The project is setup using [t3 stack](https://create.t3.gg/).

- Next.js
- Typescript
- TailwindCSS
- Shadcn
- tRPC
- Prisma
- PostgreSQL hosted on verceldb
- Cloudinary
- Zod
