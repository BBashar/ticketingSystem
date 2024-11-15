import connection from "../../../../database/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from "../../../../environment/environment.js";
export default class AdminAuth {
    static async signUpUser(req, res) {
        try {
            // modelul este acum implicit în req.body
            const reqNewUser = req.body;


            const [userDb] = await connection.execute('SELECT email FROM supportMember WHERE email = ?', [reqNewUser.email.toLowerCase()]);

            if (userDb.length > 0) {
                return res.status(400).json({ message: 'User already registered' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(reqNewUser.password, salt);

            const [newUser] = await connection.execute(
                'INSERT INTO supportMember (firstName, lastName, email, password,department) VALUES (?, ?, ?, ?,?)',
                [reqNewUser.firstName, reqNewUser.lastName, reqNewUser.email, hashedPass, 4]
            );

            const expiresIn = '48h';
            const token = jwt.sign(
                { userId: newUser.insertId },
                environment.TOKEN_SECRET,
                { expiresIn }
            );

            return res.status(200).json({ firstName: reqNewUser.firstName, token: token });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error with local auth' });
        }
    }
}