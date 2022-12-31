var dgram = require('dgram');
var readline = require('readline');
var client = dgram.createSocket("udp4");

const message = Buffer.from('2 / 3');
client.send(message, 41234, 'localhost')


client.on("message", function (msg) {
    console.log("Recebido: " + msg );

  });