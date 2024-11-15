import connection from "../../../../database/connection.js";
import { environment } from "../../../../environment/environment.js";


export default class UserTicket {
    static async createTicket(req, res) {
        //generate a ticket number
        const ticketNumber = generateRandomEightDigitNumber();
        try {
            //data
            const formTicket = req.body;
            //find department id based on subcategory
            const department = checkDepartment(formTicket.subcategory * 1);

            //insertTicket
            const ticket = await connection.execute(
                'INSERT INTO ticket (assignmentGroup,category,subcategory,department,ticketNumber,shortDescription,description,anonym,userEmail,phoneNumber,attachment,locality,userId,progress) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [1,
                    formTicket.category ? parseInt(formTicket.category, 10) : null,
                    formTicket.subcategory ? parseInt(formTicket.subcategory, 10) : null,
                    department || null,
                    ticketNumber || null,
                    formTicket.shortDescription || null,
                    formTicket.description || null,
                    formTicket.anonym,
                    formTicket.userEmail || null,
                    formTicket.phoneNumber || null,
                    formTicket.attachment || null,
                    formTicket.locality || null,
                    formTicket.userId || null,
                    1

                ]);

            if (ticket.length > 0) {
                return res.status(200).json({ ticketNumber: ticketNumber });
            }

        } catch (err) {
            console.log(`an error occured during creating tikcte || err: ${err}`);
        }
    }
}

function generateRandomEightDigitNumber() {

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const day = now.getDate().toString().padStart(2, '0');
    const time = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const secondsLastDigit = now.getSeconds().toString().slice(-1);
    const customNumber = `TN${year}${day}${time}${secondsLastDigit}`;

    return customNumber;
}

function checkDepartment(subcategoryID) {
    const mai = [1, 4];
    const primaria = [2, 3];
    const ministre = [5, 6]

    if (mai.includes(subcategoryID)) {
        return 1;
    }
    if (primaria.includes(subcategoryID)) {
        return 2;
    } if (ministre.includes(subcategoryID)) {
        return 3;
    }
}