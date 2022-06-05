export class JwtCustomConfig {

  public static getInstance(): JwtCustomConfig {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  private static instance: JwtCustomConfig;

  public config: {JWT: string};

  constructor() {
    this.config = {
      JWT: `${process.env.JWT_SECRET}`,
    }
  }
  
}

export const config = JwtCustomConfig.getInstance().config;