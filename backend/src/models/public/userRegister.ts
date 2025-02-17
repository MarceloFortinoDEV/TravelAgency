import connection from "../../database";
import * as bcrypt from 'bcrypt'

export const userRegister = async(name: string, email: string, password: string, callback: (error:any) => void) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES(?, ?, ?, ?)';

    const role = 'ANALIST'

    const hashPassword = await bcrypt.hash(password, 10);
    
    connection.query(query, [name, email, hashPassword, role], callback)
}