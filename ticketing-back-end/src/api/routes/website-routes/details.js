import express from 'express';
import Details from '../../controllers-models/website/Details/details.js';
const details = express.Router();

details.route('/ticket/:ticketId').get(Details.getDetails);

export default details;