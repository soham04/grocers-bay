declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: string;
      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
    }
  }
}

export { }
