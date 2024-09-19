import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JWTDecodedPayload } from 'jsonwebtoken';
import { JwtPayload } from '../types/middlewareLoggedInTypes';
import 'dotenv/config';

const SECRET = process.env.SECRET as string;

const isLoggedIn = (req: Request, res: Response, next: NextFunction): Response | void => {
    let token = req.get('Authorization') || req.query.token || req.body.token;

    if (token) {
        token = token.replace('Bearer ', ''); // Remove the 'Bearer ' prefix if present

        // Verify the token - corrected typing for the callback
        jwt.verify(token, SECRET, (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token, authorization denied' });
            }

            if (decoded && typeof decoded !== 'string') {
                // Here you are assuming the payload has a `user` object with a `username` property.
                const decodedPayload = decoded as JwtPayload;
                req.user = {
                    username: decodedPayload.user.username,
                    email: '', // Adjust this as per your needs, since email is missing in JwtPayload
                    password: '', // Adjust this as per your needs
                };

                // Pass control to the next middleware
                return next();
            } else {
                return res.status(401).json({ message: 'Token decoding failed, authorization denied' });
            }
        });
    } else {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
};

export default isLoggedIn;
