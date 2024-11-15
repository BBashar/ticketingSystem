import express from 'express';
import connection from '../../../../database/connection.js';

export default class Users {
    static async getAllUsers(req, res) {
        try {
            const supportMemberId = req.params.userId;

            // Query to get the department of the support member
            const [supportMemberResults] = await connection.execute(
                'SELECT department FROM supportmember WHERE supportMemberId = ?',
                [supportMemberId]
            );

            // Ensure the result is not empty
            if (supportMemberResults.length === 0) {
                return res.status(404).json({ message: 'Support member not found' });
            }

            const department = supportMemberResults[0].department;

            // Query to get users based on the department and userId presence in tickets
            const usersQuery = `
            SELECT DISTINCT u.firstName, u.lastName, u.email, u.phone 
FROM user u 
JOIN ticket t ON u.userId = t.userId 
WHERE t.department LIKE ?

            `;

            const [usersResults] = await connection.execute(usersQuery, [department]);

            // Respond with the users data
            return res.status(200).json(usersResults);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}
