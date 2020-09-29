import { readLines } from "https://deno.land/std/io/mod.ts"
import { createHash } from "https://deno.land/std/hash/mod.ts"
import * as log from "https://deno.land/std/log/mod.ts"
import * as colors from "https://deno.land/std@0.71.0/fmt/colors.ts"

let challenge = ''

const ip = await handleUserIO('IP-Adresse eingeben')

const port = await handleUserIO('Port eingeben')

try {
    const data = await fetch(`http://${ip}:${port}/`)
    const json = await data.json()
    challenge = json.challenge.toString()
} catch (err) {
    log.error('Falsche/r IP/PORT oder Server offline')
    Deno.exit()
}

console.log(colors.green('Server ist online'))

const userName = await handleUserIO('Benutzernamen eingeben')

const password = await handleUserIO('Passwort eingeben')

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
    console.log(colors.green('Login erfolgreich'))
} else {
    console.log(colors.red('Login fehlgeschlagen'))
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

    let minutes = date.getMinutes()
    const min = minutes.toString().length < 2 ? '0' + minutes : minutes
    return `${date.getHours()}:${min}`
}

async function handleUserIO(consoleOutPut: string) {

    let input = ''

    while (!input) {
        console.log(consoleOutPut)
        const rawInput = (await readLines(Deno.stdin).next()).value
        input = (rawInput as string).replace('\r', '')
    }
    return input
}







