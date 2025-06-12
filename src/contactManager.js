const ContactManager = {
    contacts: [],
    currentContact: null,

    init() {
        this.renderContacts();
    },

    renderContacts(filteredContacts = null) {
        const contactsList = document.getElementById('contactsList');
        const contacts = filteredContacts || this.contacts;
        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item" onclick="ContactManager.selectContact(${contact.id})">
                <div class="contact-avatar">${contact.avatar}</div>
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-last-message">${contact.lastMessage}</div>
                </div>
                <div class="contact-time">${contact.time}</div>
            </div>
        `).join('');
    },

    selectContact(contactId) {
        this.currentContact = this.contacts.find(c => c.id === contactId);
        if (this.currentContact) {
            ChatUI.showChatArea(this.currentContact);
            MessageHandler.loadMessages(contactId);
            document.querySelectorAll('.contact-item').forEach(item => {
                item.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        }
    },

    searchContacts(query) {
        if (!query.trim()) {
            this.renderContacts();
            return;
        }
        const filtered = this.contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        );
        this.renderContacts(filtered);
    },

    addContact(contact) {
        contact.id = Date.now();
        this.contacts.unshift(contact);
        this.renderContacts();
    },

    showCreateContactDialog() {
        document.getElementById('createContactModal').classList.remove('hidden');
        document.getElementById('newContactName').value = '';
        document.getElementById('newContactPhone').value = '';
    },

    hideCreateContactModal() {
        document.getElementById('createContactModal').classList.add('hidden');
    },

    createContact() {
        const name = document.getElementById('newContactName').value.trim();
        const phone = document.getElementById('newContactPhone').value.trim();
        if (!name) {
            alert("Le nom ne doit pas être vide.");
            return;
        }
        if (!/^\d{6,15}$/.test(phone)) {
            alert("Le numéro doit contenir uniquement des chiffres (6 à 15).");
            return;
        }
        if (this.contacts.some(c => c.phone === phone)) {
            alert("Ce numéro existe déjà !");
            return;
        }
        this.contacts.push({
            id: Date.now(),
            name: name,
            phone: phone,
            avatar: name[0].toUpperCase(),
            lastMessage: "",
            time: "",
            online: false
        });
        this.hideCreateContactModal();
        this.renderContacts();
    }
};

window.ContactManager = ContactManager;