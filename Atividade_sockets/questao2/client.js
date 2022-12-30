const { TIMEOUT } = require('dns')
const net = require('net')
const readline = require('readline')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const get_username = new Promise(user_name => {
    rl.question('Digite o nome de usuario: ', (answer) => {
        user_name(answer)
    })
})
rl.question()

get_username.then(username => {
    client.connect(4000, '127.0.0.1', () => {
        // console.log(username + ' conectou')
        client.write(username + ' conectou')

        rl.addListener('line', line => {
            if(line !== 'end') client.write(username + ': ' + line)
            else{
                client.write('end')
            }
            
        })

        client.on('data', data => {
            const str = data.toString()
            console.log(str)
        })
        client.on('end', () => {
            client.end()
            process.exit()
        })

    })
})
