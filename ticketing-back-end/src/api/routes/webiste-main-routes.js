import express from 'express';
import websiteAuth from './website-routes/auth.js';
import categories from './website-routes/categories.js';
import subcategories from './website-routes/subcategory.js';
import createTicket from './website-routes/createTicket.js';
import user from './website-routes/user.js';
import getTickets from './website-routes/getTickets.js';
import details from './website-routes/details.js';
import filterTickets from './website-routes/filter.js';
const websiteRouterV1 = express.Router();

websiteRouterV1.use('/', websiteAuth, categories, subcategories, createTicket, user, getTickets, details, filterTickets);

export default websiteRouterV1;