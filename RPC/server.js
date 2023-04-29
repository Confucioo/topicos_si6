const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log("server error: \n" + err.stack);
    server.close();
});

server.on('message', (msg, rinfo) => {
    let [operacao, var1, var2] = msg.toString().split(',');
    operacao = operacao;
    var1 = parseInt(var1);
    var2 = parseInt(var2);

    let result;
    switch (operacao) {
        case "Multiplicacao":
            result = var1 * var2;
            break;
        case "Divisao":
            result = var1 / var2;
            break;
        case "Soma": 
            result = var1 + var2;
            break;
        case "Subtração": 
            result = var1 - var2;
            break;
        default:
            result = undefined;
    }
    console.log(result)
    result = result.toString();
    
    server.send(result, 0, result.length, 41325, 'localhost');
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);