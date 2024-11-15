import express from 'express';
import connection from '../../../../database/connection.js';

export default class Support {

    static async assignedTicket(req, res) {
        try {
            const ticketId = req.params.ticketId;
            const { adminId } = req.body;
            console.log(ticketId);
            console.log(adminId);

            const updateAssignedTo = await connection.execute('UPDATE ticket SET supportMemberId = ?, progress = ? WHERE ticketId = ?', [adminId, 2, ticketId]);

            console.log('support assigned');
            res.status(200).json({ message: 'Bilet actualizat cu succes', updateAssignedTo });

        } catch (err) {

            console.log('error la support assigned', err);
            res.status(500).json({ message: 'Eroare la actualizarea biletului' });
        }
    }
}
