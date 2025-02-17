import connection from "../../database"

export const updateAgency = (id: string, name: string, socialName: string, cnpj: string, stateRegister: string, cnpjStatus: string, foundationDate: string, callback: (error:any) => void) => {
    const query = 'UPDATE agency SET name = ?, cnpj = ?, stateRegister = ?, cnpjStatus = ?, foundationDate = ?, socialName = ? WHERE id = ?'

    connection.query(query, [name, cnpj, stateRegister, cnpjStatus, foundationDate, socialName, id], callback)
}