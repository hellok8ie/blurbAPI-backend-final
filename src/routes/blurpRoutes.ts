import { Router } from 'express';

const router = Router();

//GET localhost:3000/api/blurps
router.get('/', getAllMessages);

//POST localhots:3000/api/blurps
router.post('/', createMessage);

router.get('/:messageId', getMessage);

router.put('/:messageId', updateMessage);

router.delete('/:messageId', deleteMessage);

export default router;

