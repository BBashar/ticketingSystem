import connection from "../../../../database/connection.js";
import express from 'express';

export default class Subcategory {
    static async getSubcategories(req, res) {
        try {
            const [subcategories] = await connection.execute('SELECT * FROM subcategory');

            if (subcategories.length > 0) {
                return res.status(200).json(subcategories);
            }
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}

