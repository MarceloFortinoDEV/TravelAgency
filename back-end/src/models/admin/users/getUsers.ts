import connection from "../../../database"

export const getUsers = (callback: (error:any, result:any) => void) => {
    const query = 'SELECT * FROM users'

    connection.query(query, callback)
}