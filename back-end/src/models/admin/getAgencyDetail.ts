import connection from "../../database"

export const getAgencyDetail = (id: string, callback: (error:any, result:any) => void) => {
    const query = 'SELECT * FROM agency WHERE id = ?'

    connection.query(query, [id], callback)
}