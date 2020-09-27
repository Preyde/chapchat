import { DB } from "https://deno.land/x/sqlite@v2.3.0/mod.ts"

const db = new DB('user.db')

export function getPassword(userName: string) {
    const query = db.query(`SELECT password FROM user WHERE name = '${userName}'`).next()
    return query.value[0]
}

