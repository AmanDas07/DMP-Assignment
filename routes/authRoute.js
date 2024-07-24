import express from 'express';
import { loginController, registerController } from '../Controllers/authController.js'



const router = express.Router();

router.post("/Register", registerController);

router.post("/login", loginController);


export default router;