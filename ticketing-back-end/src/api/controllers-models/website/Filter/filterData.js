import express from 'express';
import connection from '../../../../database/connection.js';

export default class Filter {
    static async filterData(req, res) {
        try {
            console.log('Filtering tickets...');
            const { locality, category, subcategory, ticketNumber } = req.body;

            let sqlQuery = `
                SELECT *
                FROM ticket
                WHERE (locality = ? OR ? IS NULL)
                AND (category = ? OR ? IS NULL)
                AND (subcategory = ? OR ? IS NULL)
            `;
            const params = [locality, locality, category, category, subcategory, subcategory];

            // Add condition for ticket number if provided
            if (ticketNumber) {
                sqlQuery += ` AND ticketNumber = ?`;
                params.push(ticketNumber);
            }

            const [tickets] = await connection.execute(sqlQuery, params);

            if (tickets.length > 0) {
                console.log(tickets);
                return res.status(200).json(tickets);
            } else {
                return res.status(200).json({ message: 'Tickets not found' });
            }
        } catch (err) {
            console.error('Error filtering tickets:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
