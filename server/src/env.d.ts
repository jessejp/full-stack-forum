declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_HOST: string;
      SMTP_SENDER: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      SMTP_PORT: string;
      SMTP_SECURE: string;
    }
  }
}

export {}
