import express from 'express';
import connection from '../../../../database/connection.js';
export default class AdminDetails {
    static async getDepartments(req, res) {
        try {
            const [departments] = await connection.execute('SELECT * FROM department');
            if (departments.length > 0) {
                console.log('Selection succeed');
                return res.status(200).json(departments);
            }
        } catch (err) {
            console.log(err);
            return res.status(200).json({ message: err });
        }
    }

    static async getAdminData(req, res) {
        try {
            const { userId } = req.body;
            const [userData] = await connection.execute('SELECT * FROM supportmember WHERE supportmemberId = ?', [userId]);

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
}