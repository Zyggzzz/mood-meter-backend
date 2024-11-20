import type { Request } from "express";
import { Log } from ".";

export class Auth {
  private API_KEY: string = "";
  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      Log("API key not provided", "error");
      process.exit(1);
    }
    this.API_KEY = apiKey;
  }

  validateApiKey(request: Request) {
    const getAuthToken = request.headers.authorization;
    return getAuthToken && getAuthToken === `Bearer ${this.API_KEY}`;
  }
}
