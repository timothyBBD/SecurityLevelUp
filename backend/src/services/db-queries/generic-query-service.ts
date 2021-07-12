import mysql, { RowDataPacket } from 'mysql2/promise';


const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};


export const query = async (query: string, ...args: any[]) => {
    let connection = await mysql.createConnection(options);
    const [rows]: any[] = await connection.execute(query, args);
    connection.end();
    return rows[0];
};

