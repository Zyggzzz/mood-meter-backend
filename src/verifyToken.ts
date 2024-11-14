import type { Request } from "express";

export class Auth {
  private API_KEY: string = "";
  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error("API_KEY is not defined in environment variables");
    }
    this.API_KEY = apiKey;
  }

  validateApiKey(request: Request) {
    const getAuthToken = request.headers.authorization;
    return getAuthToken && getAuthToken === `Bearer ${this.API_KEY}`;
  }
}
