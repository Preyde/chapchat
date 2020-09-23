import { Application, Router } from "https://deno.land/x/oak@v6.2.0/mod.ts"
import { DB } from "https://deno.land/x/sqlite@v2.3.0/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"

const app = new Application()
const router = new Router()
const PORT = 8000





const challenge = Math.random()



router
    .get('/', ctx => {
        ctx.response.body = {
            challenge: challenge
        }
    })
    .post('/', async ctx => {

        const request = await ctx.request.body().value
        // user = [<name>, <passwort>]

        const db = new DB('user.db')

        const query = db.query(`SELECT password FROM user WHERE name = '${request.userName}'`).next()

        const password = query.value[0]

        const hash = createHash("md5")
        hash.update(challenge.toString())
        hash.update(password)

        const response = {
            authenticated: request.hash === hash.toString() ? true : false
        }

        ctx.response.headers.set('Content-Type', 'application/json')
        ctx.response.body = JSON.stringify(response)
    })


app.use(router.allowedMethods())
app.use(router.routes())


if (import.meta.main) {
    app.listen({
        hostname: '0.0.0.0',
        port: PORT
    })
}
