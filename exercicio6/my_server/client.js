const socket = new WebSocket('ws://localhost:8080');

const feed = document.getElementById('feed');
const nicknameInput = document.getElementById('nickname');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

sendButton.addEventListener('click', () => {
    const nickname = nicknameInput.value;
    const message = messageInput.value;
    const data = {nickname: nickname, message: message};

    socket.send(JSON.stringify(data));
    messageInput.value = '';
});

socket.addEventListener('message', async (event) => {
    console.log('recebeu de outros clientes')
    const text = await new Response(event.data).text();

    let div = document.getElementById("feed");
    div.append(text);

    var linebreak = document.createElement('br');
    div.appendChild(linebreak);
});
