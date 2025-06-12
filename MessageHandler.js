window.MessageHandler = window.MessageHandler || {};

MessageHandler.sendMessage = function() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;

    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;

    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'mb-4 flex justify-end';
    messageDiv.innerHTML = `
        <div class="max-w-[60%] py-2 px-3 rounded-lg bg-green-800 text-gray-100">
            <div>${text}</div>
            <div class="text-xs text-gray-400 text-right">${time}</div>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};