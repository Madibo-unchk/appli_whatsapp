window.ChatUI = window.ChatUI || {};

        ChatUI.showContactsModal = async function() {
            const modal = document.getElementById('contactsModal');
            const listContainer = document.getElementById('contactsListModal');
            modal.classList.remove('hidden');

            // Charge les contacts
            const data = await loadData();
            // Trie les contacts par ordre alphabétique
            const sortedContacts = data.contacts.slice().sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            // Affiche la liste
            listContainer.innerHTML = sortedContacts.map(contact => `
                <div class="p-3 flex items-center border-b border-gray-700">
                    <div class="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">
                        ${contact.name.charAt(0)}
                    </div>
                    <div class="flex-1">
                        <div class="text-gray-100 font-medium">${contact.name}</div>
                        <div class="text-gray-500 text-sm">${contact.lastMessage}</div>
                    </div>
                    <div class="text-gray-500 text-xs">${contact.time}</div>
                </div>
            `).join('');
        };

        ChatUI.hideContactsModal = function() {
            document.getElementById('contactsModal').classList.add('hidden');
        };

        ChatUI.showContactsPage = async function() {
            isContactsPage = true;
            document.getElementById('sidebarTitle').textContent = 'Contacts';
            document.getElementById('contactsActions').style.display = 'flex';

            // Charge et trie les contacts
            const data = await loadData();
            const sortedContacts = data.contacts.slice().sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            // Affiche la liste dans le même container que les discussions
            const contactsList = document.getElementById('contactsList');
            contactsList.innerHTML = '';
            sortedContacts.forEach(contact => {
                const contactElement = createContactItem(contact.name, contact.lastMessage, contact.time, contact.active);

                // Ajoute l'événement pour ouvrir la discussion
                contactElement.addEventListener('click', () => {
                    // Met à jour le header du chat
                    document.getElementById('chatName').textContent = contact.name;
                    document.getElementById('chatAvatar').textContent = contact.name.charAt(0);

                    // Affiche la zone de chat, masque l'accueil
                    document.getElementById('welcomeScreen').style.display = 'none';
                    document.getElementById('chatContainer').style.display = 'flex';

                    // Affiche les messages
                    const messagesContainer = document.getElementById('messagesContainer');
                    messagesContainer.innerHTML = '';
                    if (contact.messages) {
                        contact.messages.forEach(msg => {
                           contact.messages.forEach(msg => {
                         messagesContainer.appendChild(createMessage(msg.text, msg.time, msg.sent));
                           });
                        });
                    }
                });

                contactsList.appendChild(contactElement);
            });
        };

        function showDiscussionsPage() {
            isContactsPage = false;
            document.getElementById('sidebarTitle').textContent = 'Discussion';
            document.getElementById('contactsActions').style.display = 'none';

            // Recharge la liste des discussions (ici, tu peux afficher les discussions récentes)
            const contactsList = document.getElementById('contactsList');
            contactsList.innerHTML = '';

            loadData().then(data => {
                data.contacts.forEach(contact => {
                    const contactElement = createContactItem(contact.name, contact.lastMessage, contact.time, contact.active);
                    contactElement.addEventListener('click', () => {
                        // Affiche la discussion comme avant
                        document.querySelectorAll('.contact-item').forEach(item => {
                            item.classList.remove('bg-gray-700');
                        });
                        contactElement.classList.add('bg-gray-700');
                        document.getElementById('welcomeScreen').style.display = 'none';
                        document.getElementById('chatContainer').style.display = 'flex';
                        document.getElementById('chatName').textContent = contact.name;
                        document.getElementById('chatAvatar').textContent = contact.name.charAt(0);
                        const messagesContainer = document.getElementById('messagesContainer');
                        messagesContainer.innerHTML = '';
                        if (contact.messages) {
                            contact.messages.forEach(msg => {
                                messagesContainer.appendChild(createMessage(msg.text, msg.time, msg.sent));
                            });
                        }
                    });
                    contactsList.appendChild(contactElement);
                });
            });
        }

        ChatUI.showMenu = function() {
            const menu = document.getElementById('menuOptions');
            menu.classList.toggle('hidden');
            // Fermer le menu si on clique ailleurs
            document.addEventListener('click', function handler(e) {
                if (!menu.contains(e.target) && !e.target.closest('[onclick="ChatUI.showMenu()"]')) {
                    menu.classList.add('hidden');
                    document.removeEventListener('click', handler);
                }
            });
        };

        ChatUI.showAddModal = function() {
            document.getElementById('addModal').classList.remove('hidden');
        };
        ChatUI.hideAddModal = function() {
            document.getElementById('addModal').classList.add('hidden');
        };

        window.AuthManager = window.AuthManager || {};
        AuthManager.logout = function() {
            document.getElementById('loginPage').style.display = 'flex';
        };

        document.getElementById('loginForm').onsubmit = async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const phone = document.getElementById('phone').value.trim();

            // Charge les contacts depuis le fichier JSON
            const res = await fetch('src/data.json');
            const data = await res.json();
            const found = data.contacts.find(
                c => c.name.toLowerCase() === username.toLowerCase() && c.phone === phone
            );

            if (found) {
                document.getElementById('loginPage').style.display = 'none';
                // Tu peux stocker l'utilisateur connecté ici si besoin
            } else {
                alert("Nom ou numéro incorrect !");
            }
        };








