import connection from "../../../database"

export const updateUser = (id: string, name: string, role: string, callback: (error:any) => void) => {
    const query = 'UPDATE users SET name = ?, role = ? WHERE id = ?'

    connection.query(query, [name, role, id], callback)
}