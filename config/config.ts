interface EnvironemntVariables {
    mongodbUrl: string;
    stripeSecrectKey: string;
    stripePublicKey: string;
    domainUrl: string;
}

export const envVariables: EnvironemntVariables = {
    mongodbUrl: process.env.MONGODB_URI! as string,
    stripeSecrectKey: process.env.STRIPE_SECRET_KEY! as string,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY! as string,
    domainUrl: process.env.DOMAIN_URL! as string,
}