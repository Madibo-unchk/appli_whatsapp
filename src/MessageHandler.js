const MessageHandler = {
            messages: {},
            typingTimeout: null,

            loadMessages(contactId) {
                const messagesContainer = document.getElementById('messagesContainer');
                const contactMessages = this.messages[contactId] || [];
                
                messagesContainer.innerHTML = contactMessages.map(message => `
                    <div class="message ${message.sent ? 'sent' : 'received'}">
                        <div class="message-bubble">
                            <div class="message-text">${message.text}</div>
                            <div class="message-time">${message.time}</div>
                        </div>
                    </div>
                `).join('');
                
                this.scrollToBottom();
            },

            sendMessage() {
                const input = document.getElementById('messageInput');
                const text = input.value.trim();
                
                if (!text || !ContactManager.currentContact) return;
                
                const message = {
                    id: Date.now(),
                    text: text,
                    sent: true,
                    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                };
                
                const contactId = ContactManager.currentContact.id;
                if (!this.messages[contactId]) {
                    this.messages[contactId] = [];
                }
                
                this.messages[contactId].push(message);
                this.loadMessages(contactId);
                input.value = '';
                
                // Simuler une réponse automatique
                this.simulateReply(contactId);
            },

            simulateReply(contactId) {
                const replies = [
                    'Intéressant !',
                    'Je vois 🤔',
                    'Ah d\'accord !',
                    'Merci pour l\'info',
                    'Super !',
                    'On en parle plus tard ?'
                ];
                
                setTimeout(() => {
                    TypingIndicator.show();
                    
                    setTimeout(() => {
                        TypingIndicator.hide();
                        
                        const reply = {
                            id: Date.now(),
                            text: replies[Math.floor(Math.random() * replies.length)],
                            sent: false,
                            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                        };
                        
                        this.messages[contactId].push(reply);
                        this.loadMessages(contactId);
                    }, 2000);
                }, 1000);
            },

            handleKeyPress(event) {
                if (event.key === 'Enter') {
                    this.sendMessage();
                }
            },

            handleTyping() {
                // Simuler l'indicateur "en train d'écrire"
                clearTimeout(this.typingTimeout);
                this.typingTimeout = setTimeout(() => {
                    // L'utilisateur a arrêté de taper
                }, 1000);
            },

            scrollToBottom() {
                const container = document.getElementById('messagesContainer');
                container.scrollTop = container.scrollHeight;
            }
        };