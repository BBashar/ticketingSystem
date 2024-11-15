import express from 'express';
import User from '../../controllers-models/website/user/getUserData.js';
const user = express.Router();

user.route('/myprofile').post(User.getUserData);
user.route('/usertickets').post(User.getUserTicket);

export default user;