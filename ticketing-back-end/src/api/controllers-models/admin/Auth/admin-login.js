
import connection from "../../../../database/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from "../../../../environment/environment.js";
export default class AdminLogin {
    static async signInUser(req, res) {
        try {
            const { email, password } = req.body;

            const user = await connection.execute('SELECT * FROM supportMember WHERE LOWER(email) = ? ', [email.toLowerCase()]);

            const userRecord = user[0][0];

            if (userRecord?.active === 0) {
                return res.status(400).json({ message: 'Access is restricted for this user ' });
            }

            if (!userRecord || !userRecord.password) {
                return res.status(500).json({ message: 'Invalid credentials' });
            }

            const validPass = await bcrypt.compare(password, userRecord.password);
            if (!validPass) {
                return res.status(400).send({ message: "Wrong data" });
            }

            const expiresIn = '48h'; // 2 days
            const token = jwt.sign({ userId: userRecord.userId }, environment.TOKEN_SECRET, { expiresIn });

            res.status(200).json({ firstName: userRecord.first_name, token: token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error auth" });
        }
    }
}

