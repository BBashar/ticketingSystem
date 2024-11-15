import express from 'express';
import Users from '../../controllers-models/admin/UsersInfo/users.js';

const usersRoute = express.Router();
usersRoute.route('/getUsers/:userId').get(Users.getAllUsers);

export default usersRoute;