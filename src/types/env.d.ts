declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_URL: string;

      // api
      NEXT_PUBLIC_API_ENDPOINT: string;

      // auth::Start
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_EXPIRES: string;

      JWT_SECRET: string;
      JWT_EXPIRES: string;
      // auth::End

      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

export {};
