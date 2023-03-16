const WebSocket = require('ws')
const socket = new WebSocket.Server({ port: 8080 });

const clientlist = new Set();

socket.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  clientlist.add(ws);

  // recebe uma mensagem
  ws.on('message', (message) => {
    // console.log('Mensagem recebida:', message.toString());
    // console.log(message)

    // envia mensagem para todos os outros clientes
    clientlist.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
    clientlist.delete(ws);
  });
});