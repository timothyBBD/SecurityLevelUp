import mysql from 'mysql2';


(async function sqlTesting()
{
    const options = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };


    let connection = mysql.createConnection(options);
    const username = 'Jimmy';
    const isAdmin = false;

    connection.connect();
    connection.query('CALL add_new_user(?,?)', [ username, isAdmin ]);

    connection.query('SELECT * FROM users',(error, results) => {
        if (error) throw error;
        console.log(results);
    });

    connection.end();
})();