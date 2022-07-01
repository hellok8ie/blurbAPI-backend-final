"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.getUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    let newUser = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await user_1.User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username }
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
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
exports.loginUser = loginUser;
const getUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userId = req.params.userId;
    let userFound = await user_1.User.findByPk(userId);
    // let userFound = await User.findByPk(userId, {include: {model: Blurp, where: {userId}}});
    if (userFound) {
        res.status(200).json(userFound);
    }
    else {
        res.status(404).json({});
    }
    ;
};
exports.getUser = getUser;
const editUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userId = req.params.userId;
    let updateUser = req.body;
    let userFound = await user_1.User.findByPk(userId);
    if (userFound && userFound.userId == user.userId
        && userFound.userId == updateUser.userId) {
        await user_1.User.update(updateUser, { where: { userId: userId } });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
    ;
};
exports.editUser = editUser;
