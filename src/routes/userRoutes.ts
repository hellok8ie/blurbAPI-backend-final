import { Router } from 'express';
import { createUser, getUser, loginUser, editUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.put('/profile/edit/:userId', editUser);
router.get('/profile/:userId', getUser);


export default router;