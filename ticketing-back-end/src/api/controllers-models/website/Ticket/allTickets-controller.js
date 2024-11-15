import express from 'express';
import connection from '../../../../database/connection.js';
export default class Ticket {
    static async getAllTickets(req, res) {
        try {
            const [tickets] = await connection.execute('SELECT * FROM ticket ORDER BY ticketId DESC');
            if (tickets.length > 0) {
                return res.status(200).json(tickets);
            } else {
                return res.status(400).json({ message: "no ticktes found" });
            }
        } catch (err) {
            console.log(err);
        }
    }
    static async getHomePageTickets(req, res) {
        try {
            const [tickets] = await connection.execute('SELECT * FROM ticket ORDER BY ticketId DESC LIMIT 6');
            if (tickets.length > 0) {
                return res.status(200).json(tickets);
            } else {
                return res.status(400).json({ message: "no ticktes found" });
            }
        } catch (err) {
            console.log(err);
        }
    }

}