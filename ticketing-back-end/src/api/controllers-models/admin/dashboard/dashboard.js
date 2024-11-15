import express from 'express';
import connection from '../../../../database/connection.js';

export default class Dashboard {
    static async getData(req, res) {
        try {
            const query = `
      SELECT 
        SUM(CASE WHEN progress = 1 THEN 1 ELSE 0 END) AS newCount,
        SUM(CASE WHEN progress = 2 THEN 1 ELSE 0 END) AS inProgressCount,
        SUM(CASE WHEN progress = 3 THEN 1 ELSE 0 END) AS closedCount,
        SUM(CASE WHEN progress = 4 THEN 1 ELSE 0 END) AS onHoldCount
      FROM ticket;
    `;

            // Execute the query
            const [results] = await db.query(query);

            // Extract the counts from the query results
            const { newCount, inProgressCount, closedCount, onHoldCount } = results[0];
            console.log(results[0]);

            // Send the counts in the response
            return res.json({
                new: newCount,
                inProgress: inProgressCount,
                closed: closedCount,
                onHold: onHoldCount
            });

        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}