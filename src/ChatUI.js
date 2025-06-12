const ChatUI = {
            showChatArea(contact) {
                document.getElementById('welcomeScreen').style.display = 'none';
                document.getElementById('chatContainer').style.display = 'flex';
                
                document.getElementById('chatAvatar').textContent = contact.avatar;
                document.getElementById('chatName').textContent = contact.name;
                document.getElementById('chatStatus').textContent = contact.online ? 'en ligne' : 'vu récemment';
            },

            showWelcomeScreen() {
                document.getElementById('welcomeScreen').style.display = 'flex';
                document.getElementById('chatContainer').style.display = 'none';
            },

            showNewChatDialog() {
                const name = prompt('Nom du nouveau contact :');
                if (name) {
                    const newContact = {
                        name: name,
                        avatar: name.charAt(0).toUpperCase(),
                        lastMessage: 'Nouveau contact',
                        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                        online: Math.random() > 0.5
                    };
                    ContactManager.addContact(newContact);
                }
            },

            showMenu() {
                alert('Menu des options (fonctionnalité à implémenter)');
            }
        };

        // TypingIndicator.js - Indicateur de frappe
        const TypingIndicator = {
            show(userName = null) {
                const indicator = document.getElementById('typingIndicator');
                const userSpan = document.getElementById('typingUser');
                
                if (userName) {
                    userSpan.textContent = userName;
                } else if (ContactManager.currentContact) {
                    userSpan.textContent = ContactManager.currentContact.name.split(' ')[0];
                }
                
                indicator.style.display = 'flex';
            },

            hide() {
                const indicator = document.getElementById('typingIndicator');
                indicator.style.display = 'none';
            }
        };