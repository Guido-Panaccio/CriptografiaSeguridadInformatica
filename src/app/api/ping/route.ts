
import {NextRequest, NextResponse} from "next/server"
import {conn}  from '../../../utils/database'

export const GET = async (req: NextRequest) => {
    const response = await conn.query('SELECT NOW()')
    return NextResponse.json(
        {message: "pong", time: response.rows[0].now}, 
        {status: 200}
    )
}

