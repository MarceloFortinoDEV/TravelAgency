import connection from "../../../database"

export const deleteUser = (id: string, callback: (error:any, result:any) => void) => {
    const query = 'DELETE FROM users WHERE id = ?'

    connection.query(query, [id], callback)
}