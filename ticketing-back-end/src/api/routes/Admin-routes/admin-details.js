import express from 'express';
import AdminDetails from '../../controllers-models/admin/Details/AdminDetails.js';
const adminDetailsRoute = express.Router();
adminDetailsRoute.route('/departments').get(AdminDetails.getDepartments);
adminDetailsRoute.route('/admindetails').post(AdminDetails.getAdminData);


export default adminDetailsRoute;
