import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts"
import { DB } from "https://deno.land/x/sqlite@v2.3.0/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"

const app = new Application()
const PORT = 8000

app.use(ctx => {
    const challenge = Math.random()
    const hash = createHash("md5")
    hash.update(challenge.toString())
    hash.update("test")
    ctx.response.body = { hash: hash.toString() }
})

if (import.meta.main) {
    app.listen({
        //hostname: '0.0.0.0',
        port: PORT
    })
}
