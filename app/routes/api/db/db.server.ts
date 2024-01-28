import pkg from 'pg';
const {Client} = pkg;

// ここでDBクライアントを生成する
export const client = new Client({
    user: 'user',
    host: 'localhost',
    database: 'todo',
    password: 'password',
    port: 5432,
});

client.connect();