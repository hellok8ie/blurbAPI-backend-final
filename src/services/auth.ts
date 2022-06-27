import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const secret = 'Blurbs the word, Bird';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
};

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        {userId: user.userId},
        secret,
        {expiresIn: '30 minutes'}
    );
    return token
};

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decoded: any = await jwt.verify(token, secret);
            return User.findByPk(decoded.userId);
        } catch (error) {
            return null
        }
    } else {
        return null;
    }
}