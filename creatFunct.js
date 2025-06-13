async function loadData() {
            const res = await fetch('https://render-json-server-1.onrender.com/contacts');
            const contacts = await res.json();
            return { contacts }; // pour garder la même structure que data.contacts
        }
https://render-json-server-1.onrender.com
        // Fonction pour créer un élément de contact
        function createContactItem(name, lastMessage, time, isActive = false) {
            const contactItem = document.createElement('div');
            contactItem.className = `p-4 flex items-center cursor-pointer border-b border-gray-700 transition-colors hover:bg-gray-800 ${isActive ? 'bg-gray-700' : ''}`;
            
            contactItem.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">
                    ${name.charAt(0)}
                </div>
                <div class="flex-1">
                    <div class="text-gray-100 font-medium mb-0.5">${name}</div>
                    <div class="text-gray-500 text-sm">${lastMessage}</div>
                </div>
                <div class="text-gray-500 text-xs">${time}</div>
            `;
            
            return contactItem;
        }
        
        // Fonction pour créer un message
        function createMessage(text, time, isSent = false) {
            const message = document.createElement('div');
            message.className = `mb-4 flex ${isSent ? 'justify-end' : ''}`;
            
            const bubble = document.createElement('div');
            bubble.className = `max-w-3/5 py-2 px-3 rounded-lg relative ${isSent ? 'bg-green-800 text-gray-100' : 'bg-gray-800 text-gray-100'}`;
            
            bubble.innerHTML = `
                <div class="mb-1">${text}</div>
                <div class="text-xs text-gray-400 ${isSent ? 'text-right' : 'text-left'}">${time}</div>
            `;
            
            message.appendChild(bubble);
            return message;
        }
        
        document.addEventListener('DOMContentLoaded', async function() {
            const contactsList = document.getElementById('contactsList');
            const messagesContainer = document.getElementById('messagesContainer');
            const welcomeScreen = document.getElementById('welcomeScreen');
            const chatContainer = document.getElementById('chatContainer');
            const chatName = document.getElementById('chatName');
            const chatAvatar = document.getElementById('chatAvatar');

            try {
                const data = await loadData();
                data.contacts.forEach(contact => {
                    const contactElement = createContactItem(contact.name, contact.lastMessage, contact.time, contact.active);
                    contactElement.addEventListener('click', () => {
                        document.querySelectorAll('.contact-item').forEach(item => {
                            item.classList.remove('bg-gray-700');
                        });
                        contactElement.classList.add('bg-gray-700');
                        welcomeScreen.style.display = 'none';
                        chatContainer.style.display = 'flex';
                        chatName.textContent = contact.name;
                        chatAvatar.textContent = contact.name.charAt(0);
                        messagesContainer.innerHTML = '';
                        contact.messages.forEach(msg => {
                            messagesContainer.appendChild(createMessage(msg.text, msg.time, msg.sent));
                        });
                    });
                    contactsList.appendChild(contactElement);
                });
            } catch (error) {
                console.log('Erreur de chargement des données', error);
            }
        });