import express from 'express';
import Subcategory from '../../controllers-models/website/Categories/getSubcategories.js';

const subcategories = express.Router();

subcategories.route('/subcategories').get(Subcategory.getSubcategories);

export default subcategories;