import express from 'express';

import signUpLocalController from '../../controllers-models/website/auth/local-singup-controller.js';
import signInLocalController from '../../controllers-models/website/auth/local-login-controller.js';
const websiteAuth = express.Router();
websiteAuth.route('/sign-up-local').post(signUpLocalController.signUpUser);
websiteAuth.route('/login').post(signInLocalController.signInUser);

export default websiteAuth;