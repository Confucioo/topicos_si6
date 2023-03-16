const socket = new WebSocket('ws://localhost:8080');

const output = document.getElementById('output');
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
