import type { Request } from "express";
export declare class Auth {
    private API_KEY;
    constructor(apiKey: string | undefined);
    validateApiKey(request: Request): boolean | "" | undefined;
}
