import connection from "../../database";

export const registerAgency = (name: string, cnpj: string, socialName: string, stateRegister: string, cnpjStatus: string, foundationDate: string, callback: (error:any, results: any) => void) => {
    const query = 'INSERT INTO agency (name, cnpj, socialName, stateRegister, cnpjStatus, foundationDate) VALUES(?, ?, ?, ?, ?, ?)';

    connection.query(query, [name, Number(cnpj), socialName, stateRegister, cnpjStatus, new Date(foundationDate)], callback)
}