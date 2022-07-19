import express from 'express';

import { signin, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin',signin);
router.patch('/:id/updateUser',auth,updateUser);

export default router;