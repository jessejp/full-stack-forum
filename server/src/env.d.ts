declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_SENDERER: string;
      EMAIL_SENDERER_PASSWORD: string;
    }
  }
}

export {}
