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
}

export const envVariables: EnvironemntVariables = {
    mongodbUrl: process.env.MONGODB_URI as string,
    stripeSecrectKey: process.env.STRIPE_SECRET_KEY as string,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY as string,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
    domainUrl: process.env.DOMAIN_URL as string,
    currency: process.env.CURRENCY as string,
    successToken: process.env.SUCCESS_ORDER_TOKEN as string,
    failedToken: process.env.FAILED_ORDER_TOKEN as string,
    nextAuthSecret: process.env.NEXT_AUTH_SECRET_KEY as string,
}

export const loaderColor = '#1b6ea5';