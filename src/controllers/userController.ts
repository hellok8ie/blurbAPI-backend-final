import { RequestHandler } from "express";
import { Blurp } from "../models/blurp";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";


export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({ 
        where: { username: req.body.username }
    });

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token, existingUser });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userId = req.params.userId;
    
    let userFound = await User.findByPk(userId)

    // let userFound = await User.findByPk(userId, {include: {model: Blurp, where: {userId}}});

    if (userFound) {
        res.status(200).json(userFound)
    } else {
        res.status(404).json({});
    };
}

export const editUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userId = req.params.userId;
    let updateUser: User = req.body;
    let userFound = await User.findByPk(userId)

    if (userFound && userFound.userId == user.userId 
        && userFound.userId == updateUser.userId) {
            await User.update(updateUser, { where: { userId: userId}});
            res.status(200).json();
        } else {
            res.status(400).json();
        };
};