import express from 'express';
import UserTicket from '../../controllers-models/website/Ticket/userTicket-controller.js';
const createTicket = express.Router();
createTicket.route('/create-ticket').post(UserTicket.createTicket);

export default createTicket;