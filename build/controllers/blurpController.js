"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlurp = exports.updateBlurp = exports.getAllUserBlurps = exports.getBlurp = exports.createBlurp = exports.getAllBlurps = void 0;
const blurp_1 = require("../models/blurp");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllBlurps = async (req, res, next) => {
    let blurps = await blurp_1.Blurp.findAll({ include: [{
                model: user_1.User,
                required: true
            }],
        order: [['blurpId', 'DESC']] });
    res.status(200).json(blurps);
};
exports.getAllBlurps = getAllBlurps;
const createBlurp = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newBlurp = req.body;
    newBlurp.userId = user.userId;
    if (newBlurp.blurp) {
        let created = await blurp_1.Blurp.create(newBlurp);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createBlurp = createBlurp;
const getBlurp = async (req, res, next) => {
    let blurpId = req.params.blurpId;
    let blurpFound = await blurp_1.Blurp.findByPk(blurpId);
    if (blurpFound) {
        res.status(200).json(blurpFound);
    }
    else {
        res.status(404).json({});
    }
    ;
};
exports.getBlurp = getBlurp;
const getAllUserBlurps = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let blurpsFound = await blurp_1.Blurp.findAll({ where: { userId: user.userId } });
    res.status(200).json(blurpsFound);
};
exports.getAllUserBlurps = getAllUserBlurps;
const updateBlurp = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let blurpId = req.params.blurpId;
    let newBlurp = req.body;
    let blurpFound = await blurp_1.Blurp.findByPk(blurpId);
    if (blurpFound && blurpFound.userId == user.userId
        && blurpFound.blurpId == newBlurp.blurpId
        && newBlurp.blurp) {
        await blurp_1.Blurp.update(newBlurp, { where: { blurpId: blurpId } });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
    ;
};
exports.updateBlurp = updateBlurp;
const deleteBlurp = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let blurpId = req.params.blurpId;
    let blurpFound = await blurp_1.Blurp.findByPk(blurpId);
    if (blurpFound && blurpFound.userId == user.userId) {
        await blurp_1.Blurp.destroy({ where: { blurpId: blurpId } });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
    ;
};
exports.deleteBlurp = deleteBlurp;
