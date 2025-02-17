import connection from "../../../database";
import * as bcrypt from 'bcrypt'

export const userAdminRegister = async(name: string, email: string, password: string, role: string, callback: (error:any) => void) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES(?, ?, ?, ?)';

    const hashPassword = await bcrypt.hash(password, 10);
    
    connection.query(query, [name, email, hashPassword, role], callback)
}