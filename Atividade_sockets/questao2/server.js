const net = require('net')
const readline = require('readline')
let socket_list = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function broadcast(data_, this_socket) {
    socket_list_index = socket_list.indexOf(this_socket)
    if (data_ === 'end') {
        socket_list.splice(socket_list_index, 1)
        this_socket.end()
    }
    else {
        socket_list.forEach(socket => {
            // console.log('sending data_')
            if (socket_list.indexOf(socket) !== socket_list_index) socket.write(data_)
        })
    }

}

const handleConection = socket => {
    socket_list.push(socket)

    socket.on('error', () => {
        console.log('perdeu conexao')
    })
    socket.on('data', data => {
        const str = data.toString()
        // console.log(str)
        broadcast(str, socket)
    })
}
const server = net.createServer(handleConection)
server.listen(4000, '127.0.0.1')

