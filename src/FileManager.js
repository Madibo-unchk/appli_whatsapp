const FileManager = {
            showAttachMenu() {
                const options = ['Photo/Vidéo', 'Document', 'Contact', 'Localisation'];
                const choice = prompt('Choisir le type de fichier :\n' + 
                    options.map((opt, i) => `${i + 1}. ${opt}`).join('\n'));
                
                if (choice && choice >= 1 && choice <= 4) {
                    this.handleFileType(options[choice - 1]);
                }
            },

            handleFileType(type) {
                const input = document.getElementById('messageInput');
                input.value = `[${type} partagé]`;
                MessageHandler.sendMessage();
            }
        };