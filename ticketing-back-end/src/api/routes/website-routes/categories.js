import express from 'express';
import Categories from '../../controllers-models/website/Categories/getCategories.js';

const categories = express.Router();

categories.route('/categories').get(Categories.getCategories);


export default categories;