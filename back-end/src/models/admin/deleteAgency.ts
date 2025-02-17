import connection from "../../database"

export const deleteAgency = (id: string, callback: (error:any, result:any) => void) => {
    const query = 'DELETE FROM agency WHERE id = ?'

    connection.query(query, [id], callback)
}