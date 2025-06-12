 const ThemeManager = {
            themes: {
                dark: {
                    '--bg-primary': '#111b21',
                    '--bg-secondary': '#202c33',
                    '--text-primary': '#e9edef',
                    '--text-secondary': '#8696a0'
                },
                light: {
                    '--bg-primary': '#f0f2f5',
                    '--bg-secondary': '#ffffff',
                    '--text-primary': '#111b21',
                    '--text-secondary': '#667781'
                }
            },

            setTheme(themeName) {
                const theme = this.themes[themeName];
                if (theme) {
                    Object.entries(theme).forEach(([property, value]) => {
                        document.documentElement.style.setProperty(property, value);
                    });
                }
            }
        };