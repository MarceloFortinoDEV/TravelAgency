import connection from "../../database"

export const getAgency = (callback: (error:any, result:any) => void) => {
    const query = 'SELECT * FROM agency'

    connection.query(query, callback)
}