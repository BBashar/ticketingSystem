import express from 'express';
import connection from '../../../../database/connection.js';
import e from 'express';
export default class AdminTicket {
    static async getAllTicketsByDepartment(req, res) {
        try {
            const userId = req.param('user');

            console.log(userId);

            const [tickets] = await connection.execute(`SELECT t.*
            FROM ticket t
            JOIN supportmember s ON t.department = s.department
            WHERE s.supportMemberId = ?
            `, [userId]);
            console.log(tickets);
            if (tickets.length > 0) {
                return res.status(200).json(tickets);
            } else {
                return res.status(400).json({ message: "no ticktes found" });
            }
        } catch (err) {
            console.log(err);
        }
    }
    static async getAllNewTickets(req, res) {
        try {
            const userId = req.param('user');
            const [tickets] = await connection.execute(`
            SELECT t.* FROM ticket t 
            WHERE t.department = ( SELECT s.department FROM supportmember s WHERE s.supportMemberId = ? ) 
            AND t.progress = ?;  `, [userId, 1]);
            if (tickets.length > 0) {
                return res.status(200).json(tickets);
            } else {
                return res.status(400).json({ message: "no ticktes found" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async getAllAssignedToSupport(req, res) {
        try {
            const userId = req.param('user');
            const [tickets] = await connection.execute(`
            SELECT t.*
            FROM ticket t
            WHERE t.department = (
                SELECT s.department
                FROM supportmember s
                WHERE s.supportMemberId = ?
            )
            AND t.supportMemberId = ?            
            `, [userId, userId]);
            if (tickets.length > 0) {
                return res.status(200).json(tickets);
            } else {
                return res.status(400).json({ message: "no ticktes found" });
            }
        } catch (err) {
            return res.status(400).json({
                message: err
            });
        }
    }

    static async getDetails(req, res) {
        try {
            const ticketId = req.params.ticketId * 1;
            if (isNaN(ticketId)) {
                return res.status(400).json({ message: 'Invalid ticket ID' });
            }

            const query = `
                SELECT ticket.*, department.departmentName, category.categoryName, subcategory.subcategoryName
                FROM ticket
                INNER JOIN department ON ticket.department = department.departmentId
                INNER JOIN category ON ticket.category = category.categoryId
                INNER JOIN subcategory ON ticket.subcategory= subcategory.subcategoryId
                WHERE ticket.ticketId = ?
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

    static async updateDetails(req, res) {
        try {
            const ticketId = req.params.ticketId * 1;
            const formTicket = req.body;
            const updateQuery = `
                UPDATE ticket
                SET category = ?,
                    subcategory = ?,
                    department = ?,
                    ticketNumber = ?,
                    shortDescription = ?,
                    description = ?,
                    anonym = ?,
                    userEmail = ?,
                    phoneNumber = ?,
                    attachment = ?,
                    locality = ?,
                    userId = ?,
                    progress = ?
                WHERE ticketId = ?;
            `;

            const updatedTicket = await connection.execute(updateQuery, [
                formTicket.category || null,
                formTicket.subcategory || null,
                formTicket.department || null,
                formTicket.ticketNumber || null,
                formTicket.shortDescription || null,
                formTicket.description || null,
                formTicket.anonym || null,
                formTicket.userEmail || null,
                formTicket.phoneNumber || null,
                formTicket.attachment || null,
                formTicket.locality || null,
                formTicket.userId || null,
                formTicket.progress || null,
                ticketId
            ]);

            console.log('Bilet actualizat cu succes:', updatedTicket);
            res.status(200).json({ message: 'Bilet actualizat cu succes', updatedTicket });
        } catch (err) {
            console.error('Eroare la actualizarea biletului:', err);
            res.status(500).json({ error: 'Eroare la actualizarea biletului' });
        }
    }


}