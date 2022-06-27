"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'Blurbs the word, Bird';
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
const signUserToken = async (user) => {
    let token = jsonwebtoken_1.default.sign({ userId: user.userId }, secret, { expiresIn: '30 minutes' });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secret);
            return user_1.User.findByPk(decoded.userId);
        }
        catch (error) {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
