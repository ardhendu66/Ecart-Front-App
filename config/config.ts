interface EnvironemntVariables {
    mongodbUrl: string;
}

export const envVariables: EnvironemntVariables = {
    mongodbUrl: process.env.MONGODB_URI! as string,
}