import io from 'socket.io-client'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337'
const socket = io(API_URL);

export const createPrivateRoom = (roomName, playerName, cb = () => {}) => {
    socket.emit('create-private-room', {
        playerName,
        roomName
    })
    socket.on('create-private-room', (res) => {
        cb(res.roomCode)
    })
}

export const joinPrivateRoom = (roomCode, playerName, cb = () => {}) => {
    socket.emit('join-private-room', {code: roomCode, name: playerName})
    socket.on('join-private-room', output => {
        cb(output)
    })
}

export const addPrompt = (prompt, cb = () => {}) => {
    socket.emit('add-prompt', {prompt});
}

export const getPlayers = (roomCode, cb = () => {}) => {
    socket.emit('get-players', { roomCode })
    socket.on('get-players', ({ players }) => {
        cb(players)
    })
}

export const subscribeToJoins = (cb = () => {}) => {
    socket.on('join-private-room', ({players}) => {
        console.log("EVENT HEARD")
        cb(null,players)
    })
}

export const sendVote = (vote, cb = () => {}) => {
    socket.emit('vote', {vote});
}

export const getInfo = (roomCode, cb = () => {}) => {
    socket.on('end-round', ({prompt, quip1, quip2}) => {
        cb(prompt, quip1, quip2)
    })
}

export const startGame = (roomCode, cb = () => {}) => {
    socket.emit('start-game', { code: roomCode })
}

export const getPrompts = (roomCode, cb = () => {}) => {
    socket.on('start-game', msg => {
        cb(msg)
    })
}

export const answerPrompt = ( round, roomcode, answer, prompt, cb = () => {}) => {
    console.log('happening');
    socket.emit('answerPrompt', {round: round, roomcode: roomcode, answer: answer , prompt: prompt})

}

export default socket