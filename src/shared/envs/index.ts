export const envs = {
  url: {
    backend: {
      dev: process.env.BACKEND_LOCALHOST_URL!,
      prod: process.env.BACKEND_PRODUCTION_URL!,
    },
    frontend: {
      dev: {
        client: process.env.FRONTEND_LOCAL_HOST_CLIENT_URL!,
        admin: process.env.FRONTEND_LOCAL_HOST_ADMIN_URL!,
        master: process.env.FRONTEND_LOCAL_HOST_MASTER_URL!,
        public1: process.env.FRONTEND_LOCAL_HOST_PUBLIC_URL_1!,
        public2: process.env.FRONTEND_LOCAL_HOST_PUBLIC_URL_2!,
      },
      prod: {
        client: process.env.FRONTEND_PRODUCTION_CLIENT_URL!,
        admin: process.env.FRONTEND_PRODUCTION_ADMIN_URL!,
        master: process.env.FRONTEND_PRODUCTION_MASTER_URL!,
      },
    },
  },
  cloudinary: {
    image: {
      cloud_name: process.env.CLOUDINARY_IMAGE_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_IMAGE_API_KEY!,
      api_secret: process.env.CLOUDINARY_IMAGE_API_SECRET!,
      main_folder: process.env.CLOUDINARY_MAIN_FOLDER!,
    },
    product: {
      cloud_name: process.env.CLOUDINARY_PRODUCT_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_PRODUCT_API_KEY!,
      api_secret: process.env.CLOUDINARY_PRODUCT_API_SECRET!,
      main_folder: process.env.CLOUDINARY_MAIN_FOLDER!,
    },
    video: {
      cloud_name: process.env.CLOUDINARY_VIDEO_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_VIDEO_API_KEY!,
      api_secret: process.env.CLOUDINARY_VIDEO_API_SECRET!,
      main_folder: process.env.CLOUDINARY_MAIN_FOLDER!,
    },
  },
  oAuth: {
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_endpoint: process.env.GOOGLE_REDIRECT_ENDPOINT!,
    },
    github: {
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      redirect_endpoint: process.env.GITHUB_REDIRECT_ENDPOINT!,
    },
    linkedin: {
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      redirect_endpoint: process.env.LINKEDIN_REDIRECT_ENDPOINT!,
    },
  },
  mitral: {
    api_key: process.env.MISTRAL_API_KEY!, // Mistral automatically read it with this name only don't change it
    api_key_post: process.env.MISTRAL_API_KEY_POST!,
    api_key_get: process.env.MISTRAL_API_KEY_GET!,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
    password: process.env.REDIS_PASSWORD!,
    username: process.env.REDIS_USERNAME!,
  },
  razorpay: {
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
    webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET!,
  },
  mail_service: {
    base_url: {
      dev: process.env.MAIL_SERVICE_DEVELOPMENT_BASE_URL!,
      prod: process.env.MAIL_SERVICE_PRODUCTION_BASE_URL!,
    },
  },
  jwt_secret: process.env.JWT_SECRET!,
  mongo_uri: process.env.MONGODB_URI!,
  is_dev_mode: process.env.IS_DEV! === "true",
  port: process.env.PORT! || 5454,
};
