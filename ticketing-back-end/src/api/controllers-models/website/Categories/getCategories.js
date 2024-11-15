import connection from "../../../../database/connection.js";
import express from 'express';

export default class Categories {
    static async getCategories(req, res) {
        try {
            const [categories] = await connection.execute('SELECT * FROM category');

            if (categories.length > 0) {
                return res.status(200).json(categories);
            }

        } catch (err) {
            console.log(`an error occured during selecting data from Category tabel, err: ${err}`);
            return res.status(400).json({ message: err });
        }
    }
}