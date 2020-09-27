import { Router } from "https://deno.land/x/oak@v6.2.0/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"
import { getPassword } from "./model/db.ts"
import * as message from "./model/message.ts"

const challenge = Math.random()
const router = new Router()

router
    .get('/', ctx => {
        ctx.response.body = {
            challenge: challenge
        }
    })
    .post('/', async ctx => {
        //request : { userName, hash }
        const request = await ctx.request.body().value

        const password = getPassword(request.userName)

        const hash = createHash("md5")
        hash.update(challenge.toString())
        hash.update(password)

        const response = {
            authenticated: request.hash === hash.toString() ? true : false
        }

        //ctx.response.headers.set('Content-Type', 'application/json')
        ctx.response.body = JSON.stringify(response)
    })
    .get('/message', ctx => {

        const userName = ctx.request.url.searchParams.get('sender')

        ctx.response.body = JSON.stringify(message.getMessages(userName || ''))
    })
    .post('/message', async ctx => {
        const data = await ctx.request.body().value

        message.addMessage(data)
    })

export default router