import express from 'express';
import connection from '../../../../database/connection.js';

export default class Details {
    static async getDetails(req, res) {
        try {
            const ticketId = req.params.ticketId * 1;
            if (isNaN(ticketId)) {
                return res.status(400).json({ message: 'Invalid ticket ID' });
            }

            const query = `
            SELECT 
            ticket.*, 
            department.departmentName, 
            category.categoryName, 
            subcategory.subcategoryName
        FROM 
            ticket
            INNER JOIN department ON ticket.department = department.departmentId
            INNER JOIN category ON ticket.category = category.categoryId
            INNER JOIN subcategory ON ticket.subcategory= subcategory.subcategoryId
        WHERE 
            ticket.ticketId = ?

            `;
            const [details] = await connection.execute(query, [ticketId]);

            if (details.length > 0) {
                console.log(details);
                return res.status(200).json(details);
            } else {
                console.log('Ticket not found');
                return res.status(404).json({ message: 'Ticket not found' });
            }
        } catch (err) {
            console.error('Error retrieving ticket details:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
