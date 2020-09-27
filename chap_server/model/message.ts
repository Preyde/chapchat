interface Message {
    sender: string,
    text: string,
    time: Date,
    sentTo?: string[]
}

let messages: Message[] = []


export function addMessage(message: Message) {
    message.time = new Date()
    message.sentTo = []
    messages.push(message)
}

export function getMessages(userName: string) {
    const messagesToSend = messages.filter(msg => msg.sender != userName && !(msg.sentTo?.includes(userName)))

    for (let msg of messages) {
        if (!msg.sentTo?.includes(userName)) {
            msg.sentTo?.push(userName)

        }
    }

    return messagesToSend
}

