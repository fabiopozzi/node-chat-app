const socket = io();

socket.on('message', (msg) => {
    console.log(msg);
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = document.querySelector('input').value;
    socket.emit('sendMessage', msg);
})
