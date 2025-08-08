declare namespace NodeJS {
  interface ProcessEnv {
    MONGOURI: string;
    PORT?: string;
    DOMAIN?: string;
    SECRET: string;
  }
}
