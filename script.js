const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const colors = ["#d14f17", "#8abf0d", "#bf2b02", "#bfac02", "#d417a8"];
//const myColor = Math.floor(Math.random() * colors.length);
//Orange, Lime, Red, Yellow, Pink

const name = prompt("Please enter your name...");
appendMessage('You joined', '');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: `, data.message);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, '');
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`, "");
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    if(message != '' && message != ' ' && message != '  ') {
        appendMessage("You: ", message);
        socket.emit('send-chat-message', message);
    }
    messageInput.value = '';
});

function appendMessage(user, message, color) {
    const messageElement = document.createElement('div');
    const userText = document.createElement('h1');
    const messageText = document.createElement('p');

    userText.textContent = user;
    messageText.innerText = message;

    if(color != null)
        userText.style.color = color

    messageElement.append(userText);
    messageElement.append(messageText)
    messageContainer.append(messageElement);

    window.scrollTo(0,document.body.scrollHeight);
}

