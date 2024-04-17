import express from 'express';
import validar from '../controller/login_controller.js'

const login = express.Router();

login.post('/validar', validar);

export default login;