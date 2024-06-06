import { Pool } from 'pg'

let conn: any

if (!conn){
    conn = new Pool({
        user: 'admin',
        password: 'admin123',
        host: 'localhost', //con docker tambien es localhost por defecto
        port: 5432,
        database: 'hospitales'
    })
}

export { conn }