import express from 'express';
import AdminTicket from '../../controllers-models/admin/Tickets/Tickets.js';
import Details from '../../../api/controllers-models/website/Details/details.js';
import Support from '../../controllers-models/admin/support/support.js';
import Dashboard from '../../controllers-models/admin/dashboard/dashboard.js';
const adminTickets = express.Router();
adminTickets.route('/admin-allTickets').get(AdminTicket.getAllTicketsByDepartment);
adminTickets.route('/new').get(AdminTicket.getAllNewTickets);
adminTickets.route('/assigned').get(AdminTicket.getAllAssignedToSupport);
adminTickets.route('/ticket/:ticketId').get(AdminTicket.getDetails);
adminTickets.route('/ticket/:ticketId').put(AdminTicket.updateDetails);
adminTickets.route('/assigned-to-me/:ticketId').put(Support.assignedTicket);
adminTickets.route('/dashboard').get(Dashboard.getData);





export default adminTickets;