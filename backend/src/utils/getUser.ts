import connection from "../database"

export const getUser = async(email: string, callback: (error:any, result:any) => void) => {
    const query = 'SELECT * FROM users WHERE email = ?'

    connection.query(query, [email], callback)
}