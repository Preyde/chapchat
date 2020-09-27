import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts"
import router from "./api.ts"
import * as log from "https://deno.land/std@0.71.0/log/mod.ts"

const app = new Application()
const PORT = 8000


app.use(router.allowedMethods())
app.use(router.routes())


if (import.meta.main) {

    log.info(`Server is now listening on Port ${PORT}....`)

    app.listen({
        hostname: '0.0.0.0',
        port: PORT
    })
}
