const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConection = socket => {
    console.log('alguem se conectou')
    socket.on('error', () => {
        console.log('perda de conexao')
    })
    socket.on('end', () => {
        console.log('desconectado')
    })
    socket.on('data', data => {
        const str = data.toString()
        if (str === 'end') {
            socket.end()
        }
        console.log(str)
    })
    rl.addListener('line', line => {
        socket.write(line)
    })
}
const server = net.createServer(handleConection)
server.listen(4000, '127.0.0.1')

