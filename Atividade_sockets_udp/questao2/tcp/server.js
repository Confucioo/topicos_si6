const net = require('net')

const handleConection = socket => {
  console.log('Cliente conectado')
  socket.on('error', () => {
    console.log('perda de conexao')
  })
  socket.on('end', () => {
    console.log('desconectado')
  })
  socket.on('data', data => {
    const str = data.toString()
    console.log(str)

    const msg_ = data.toString()
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
      socket.write(result.toString())
  })
}

const server = net.createServer(handleConection)
server.listen(4000, '127.0.0.1')