import express from 'express';

import AdminAuth from '../../controllers-models/admin/Auth/admin-auth.js';
import AdminLogin from '../../controllers-models/admin/Auth/admin-login.js';
const adminAuthRoute = express.Router();
adminAuthRoute.route('/admin-auth').post(AdminAuth.signUpUser);
adminAuthRoute.route('/admini-login').post(AdminLogin.signInUser);

export default adminAuthRoute;
