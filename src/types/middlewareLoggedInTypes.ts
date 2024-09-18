import { UserInfo } from "./modelTypes";

declare module 'express-serve-static-core'{
    interface Request {
        user?: UserInfo;
    }
}

export interface JwtPayload {
    user: {
        username: string;
    };
}
