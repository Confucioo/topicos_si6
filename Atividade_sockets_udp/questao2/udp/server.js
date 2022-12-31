const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

socket.on('message', (msg, rinfo) => {
    console.log('Ip:port: ' + rinfo.address + ':' + rinfo.port + ' enviou: ' + msg.toString())
    const msg_ = msg.toString()
    const myArray = msg_.split(" ");
    
    if(myArray[1] ==''){
        result = '0'
      }else if (myArray[1] =='+'){
        result = parseFloat(myArray[0]) + parseFloat(myArray[2]);
      }else if (myArray[1] =='-'){
        result = parseFloat(myArray[0]) - parseFloat(myArray[2]);
      }else if (myArray[1] =='/'){
        result = parseFloat(myArray[0]) / parseFloat(myArray[2]);
      }else if (myArray[1] =='*'){
        result = parseFloat(myArray[0]) * parseFloat(myArray[2]);
      }else{
        result = '0';
      }

    const message = Buffer.from(result.toString());
    socket.send(message, rinfo.port, rinfo.address)
})

socket.bind(41234)