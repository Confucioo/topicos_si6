const dgram = require('dgram');

const operacao = process.argv[2]; //process pega a linha utilizada no terminal, o terceiro elemento é a operação
const var1 = parseInt(process.argv[3]); //o quarto e o quinto elemento são as variaveis
const var2 = parseInt(process.argv[4]);

const mensagem = `${operacao},${var1},${var2}`; //Serializando a mensagem

const client = dgram.createSocket('udp4');

client.bind(41325);

client.send(Buffer.from(mensagem), 0, mensagem.length, 41234, 'localhost', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Mensagem enviada: ${mensagem}`);
    }
});

client.on('message', (msg, rinfo) => {
    console.log(`Resultado: ${msg}`);
    client.close(); //fecha o socket assim que receber a resposta
});
