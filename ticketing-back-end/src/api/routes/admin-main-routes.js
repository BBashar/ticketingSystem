import express from 'express';
import adminAuthRoute from '../routes/Admin-routes/admin-auth.js';
import adminTickets from './Admin-routes/admin-tickets.js';
import adminDetailsRoute from './Admin-routes/admin-details.js';
import usersRoute from './Admin-routes/admin-getUsers.js';
const adminMainRoutes = express.Router();


adminMainRoutes.use('/', adminAuthRoute, adminTickets, adminDetailsRoute, usersRoute);

export default adminMainRoutes;