"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blurpController_1 = require("../controllers/blurpController");
const router = (0, express_1.Router)();
//GET localhost:3000/api/blurps
router.get('/', blurpController_1.getAllBlurps);
//POST localhots:3000/api/blurps
router.post('/', blurpController_1.createBlurp);
//GET localhost:3000/api/blurps/:blurpId
router.get('/:blurpId', blurpController_1.getBlurp);
//PUT localhost:3000/api/blurps/:blurpId
router.put('/:blurpId', blurpController_1.updateBlurp);
//DELETE localhost:3000/api/blurps/:blurpId
router.delete('/:blurpId', blurpController_1.deleteBlurp);
exports.default = router;
