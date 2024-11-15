import express from 'express';
import connection from '../../../../database/connection.js';

export default class User {
    static async getUserData(req, res) {
        try {
            const { userId } = req.body;
            const [userData] = await connection.execute('SELECT * FROM user WHERE userId = ?', [userId]);

            if (userData.length > 0) {
                console.log(userData);
                return res.status(200).json({ userData: userData[0] });
            } else {
                return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "A apărut o eroare la preluarea datelor utilizatorului." });
        }
    }

    static async getUserTicket(req, res) {
        try {
            const { userId } = req.body;
            const [tickets] = await connection.execute('SELECT * FROM ticket where userId =?', [userId]);
            if (userId.length >= 0) {
                console.log(tickets);
                return res.status(200).json(tickets);
            } else {
                console.log('user not found');
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err });
        }
    }
}
