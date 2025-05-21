export const getEnv = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
    NEXT_PUBLIC_AUTH_SERVER: process.env.NEXT_PUBLIC_AUTH_SERVER as string,
    NEXT_PUBLIC_AUTH_TENANT_KEY: process.env
      .NEXT_PUBLIC_AUTH_TENANT_KEY as string,
    NEXT_PUBLIC_COS_SECRET_ID: process.env.NEXT_PUBLIC_COS_SECRET_ID as string,
    NEXT_PUBLIC_COS_SECRET_KEY: process.env
      .NEXT_PUBLIC_COS_SECRET_KEY as string,
    NEXT_PUBLIC_COS_PREFIX: process.env.NEXT_PUBLIC_COS_PREFIX as string,
    NEXT_PUBLIC_COS_BUCKET: process.env.NEXT_PUBLIC_COS_BUCKET as string,
    NEXT_PUBLIC_COS_REGION: process.env.NEXT_PUBLIC_COS_REGION as string,
  };
};
