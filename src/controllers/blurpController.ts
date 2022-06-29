import { RequestHandler } from "express";
import { Blurp } from "../models/blurp";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllBlurps: RequestHandler = async (req,res,next) => {
    let blurps = await Blurp.findAll({include: [{model: User, required: true}]});
    res.status(200).json(blurps);
};

export const createBlurp: RequestHandler = async (req,res,next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newBlurp: Blurp = req.body;
    newBlurp.userId = user.userId;

    if (newBlurp.blurp) {
        let created = await Blurp.create(newBlurp);
        res.status(201).json(created);
    } else {
        res.status(400).send();
    }
};

export const getBlurp: RequestHandler = async (req,res,next) => {
    let blurpId = req.params.blurpId;
    let blurpFound = await Blurp.findByPk(blurpId);
    if (blurpFound) {
        res.status(200).json(blurpFound);
    } else {
        res.status(404).json({});
    };
};

export const updateBlurp: RequestHandler = async (req,res,next) => {

    let user:User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let blurpId = req.params.blurpId;
    let newBlurp: Blurp = req.body;
    let blurpFound = await Blurp.findByPk(blurpId);

    if (blurpFound && blurpFound.userId == user.userId 
        && blurpFound.blurpId == newBlurp.blurpId
        && newBlurp.blurp) {
            await Blurp.update(newBlurp, { where: { blurpId: blurpId}});
            res.status(200).json();
        } else {
            res.status(400).json();
        };
};

export const deleteBlurp: RequestHandler = async (req,res,next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let blurpId = req.params.blurpId;
    let blurpFound = await Blurp.findByPk(blurpId);

    if (blurpFound && blurpFound.userId == user.userId) {
        await Blurp.destroy({where: {blurpId: blurpId}});
        res.status(200).json();
    } else {
        res.status(404).json();
    };
};