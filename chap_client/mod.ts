import { readLines } from "https://deno.land/std/io/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"
import * as log from "https://deno.land/std/log/mod.ts"

let challenge = ''

try {
    const data = await fetch("http://192.168.2.127:8000/")
    const json = await data.json()
    challenge = json.challenge.toString()
} catch (err) {
    log.error('Server ist offline!')
    Deno.exit()
}


console.log('Benutzernamen eingeben')
const userNameData = await readLines(Deno.stdin).next()
const userName = (userNameData.value as string).replace('\r', '')

console.log('Passwort eingeben')
const passwordData = await readLines(Deno.stdin).next();
const password = (passwordData.value as string).replace('\r', '')


const hash = createHash('md5')

hash.update(challenge)
hash.update(password)

const body = {
    userName: userName,
    hash: hash.toString()
}

const response = await fetch("http://192.168.2.127:8000/", {

    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    method: 'POST'
})

const { authenticated } = await response.json().catch(() => log.error('Falsche Login-Daten'))

if (authenticated) {
    log.info('Login erfolgreich')
} else {
    log.error('Login fehlgeschlagen')
    Deno.exit()
}

setInterval(async () => {
    const messages = await (await fetch("http://192.168.2.127:8000/message?sender=" + userName)).json()
    if (messages) {

        for (let message of messages) {

            const { sender, text, time } = message
            const date = new Date(time)

            console.log(`${formatTime(date)} --- ${sender}: ${text}`)
        }
    }
}, 500)

while (true) {
    const messageInput = await readLines(Deno.stdin).next()
    const text = (messageInput.value as string).replace('\r', '')

    const message = {
        sender: userName,
        text: text
    }

    console.log(`${formatTime(new Date())} --- ${userName}: ${text}`)

    fetch("http://192.168.2.127:8000/message", {
        body: JSON.stringify(message),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
}
function formatTime(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}`
}







