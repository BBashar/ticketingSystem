import express from 'express';
import Ticket from '../../controllers-models/website/Ticket/allTickets-controller.js';
const getTickets = express.Router();
getTickets.route('/getAllTickets').get(Ticket.getAllTickets);
getTickets.route('/homeTickets').get(Ticket.getHomePageTickets);

export default getTickets;