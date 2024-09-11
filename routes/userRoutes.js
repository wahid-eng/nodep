import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController.js';

const route = Router();

// get all users
route.get('/', getUsers);

// create an user
route.post('/', createUser);

export default route;