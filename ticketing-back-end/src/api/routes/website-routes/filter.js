import express from 'express';
import Filter from '../../controllers-models/website/Filter/filterData.js';

const filterTickets = express.Router();
filterTickets.route('/filter').post(Filter.filterData);
export default filterTickets;