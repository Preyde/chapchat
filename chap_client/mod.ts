import { readLines } from "https://deno.land/std/io/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"
import * as log from "https://deno.land/std/log/mod.ts"

let challenge = ''

try {
    const data = await fetch("http://localhost:8000")
    const json = await data.json()
    challenge = json.challenge.toString()
} catch (err) {
    log.error("Server ist offline!")
    Deno.exit()
}


console.log("Benutzernamen eingeben")
const userNameData = await readLines(Deno.stdin).next()
const userName = (userNameData.value as string).replace('\r', '')

console.log("Passwort eingeben")
const passwordData = await readLines(Deno.stdin).next();
const password = (passwordData.value as string).replace('\r', '')


const hash = createHash("md5")

hash.update(challenge)
hash.update(password)

const body = {
    userName: userName,
    hash: hash.toString()
}

const response = await fetch("http://localhost:8000", {

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(body),
    method: 'POST'
})

const { authenticated } = await response.json().catch(() => log.error("Falsche Login-Daten"))

if (authenticated) {
    log.info("Login erfolgreich")
} else {
    log.error("Login fehlgeschlagen")
}




