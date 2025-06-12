 const EmojiManager = {
            emojis: ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉'],
            
            toggleEmojiPicker() {
                // Simuler un sélecteur d'émojis simple
                const emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
                const input = document.getElementById('messageInput');
                input.value += emoji;
                input.focus();
            }
        };
