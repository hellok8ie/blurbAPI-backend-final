import { Router } from 'express';
import { createBlurp, deleteBlurp, getAllBlurps, getBlurp, updateBlurp } from '../controllers/blurpController';

const router = Router();

//GET localhost:3000/api/blurps
router.get('/', getAllBlurps);

//POST localhots:3000/api/blurps
router.post('/', createBlurp);

//GET localhost:3000/api/blurps/:blurpId
router.get('/:blurpId', getBlurp);

//PUT localhost:3000/api/blurps/:blurpId
router.put('/:blurpId', updateBlurp);

//DELETE localhost:3000/api/blurps/:blurpId
router.delete('/:blurpId', deleteBlurp);

export default router;

