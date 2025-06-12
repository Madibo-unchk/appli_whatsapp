 const NotificationManager = {
            init() {
                if ('Notification' in window) {
                    Notification.requestPermission();
                }
            },

            show(title, message) {
                if (Notification.permission === 'granted') {
                    new Notification(title, {
                        body: message,
                        icon: '💬'
                    });
                }
            }
        };