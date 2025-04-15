interface EnvironemntVariables {
    mongodbUrl: string;
    stripeSecrectKey: string;
    stripePublicKey: string;
    stripeWebhookSecret: string;
    domainUrl: string;
    currency: string;
    successToken: string;
    failedToken: string;
    nextAuthSecret: string;
    cloudName: string;
    cloudApiKey: string;
    cloudApiSecret: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    productionEmail: string;
    productionEmailPassword: string;
    domainName: string;
}

export const envVariables: EnvironemntVariables = {
    mongodbUrl: process.env.MONGODB_URI as string,
    stripeSecrectKey: process.env.STRIPE_SECRET_KEY as string,
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
    domainUrl: process.env.DOMAIN_URL as string,
    currency: process.env.CURRENCY as string,
    successToken: process.env.SUCCESS_ORDER_TOKEN as string,
    failedToken: process.env.FAILED_ORDER_TOKEN as string,
    nextAuthSecret: process.env.NEXT_AUTH_SECRET_KEY as string,
    cloudName: process.env.CLOUDINARY_UPLOAD_CLOUD as string,
    cloudApiKey: process.env.CLOUDINARY_API_KEY as string,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET as string,
    jwtSecret: process.env.JWT_SECRET_KEY as string,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
    productionEmail: process.env.PRODUCTION_EMAIL as string,
    productionEmailPassword: process.env.PRODUCTION_EMAIL_PASSWORD as string,
    domainName: process.env.DOMAIN_URL as string,
}

export const loaderColor = '#1b6ea5';