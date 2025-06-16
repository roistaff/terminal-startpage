# Terminal Firefox Startup Page

A minimal Unix terminal-themed Firefox startup page with customizable bookmarks and extensible command system.

## Features

- 🖥️ Clean terminal interface with virtual cursor
- 🔗 Customizable bookmarks via JSON file
- ⌨️ Extensible command system
- 🔍 Google search integration
- 📊 System information display (neofetch)
- 📱 Responsive design

## Setup

1. Download all files to a folder on your computer
2. In Firefox, go to **Settings → Home → Homepage and new windows**
3. Select **Custom URLs** and add the path to your `index.html` file
4. Customize your bookmarks by editing `bookmarks.json`

## File Structure

\`\`\`
terminal-startpage/
├── index.html          # Main startup page
├── bookmarks.json      # Customizable bookmarks
├── commands.js         # Custom commands (easy to modify!)
└── README.md          # This file
\`\`\`

## Customizing Bookmarks

Edit the `bookmarks.json` file to customize your links:

\`\`\`json
{
  "bookmarks": [
    {"name": "reddit.com", "url": "https://reddit.com"},
    {"name": "youtube.com", "url": "https://youtube.com"},
    {"name": "github.com", "url": "https://github.com"},
    {"name": "your-site.com", "url": "https://your-site.com"}
  ]
}
\`\`\`

### Bookmark Properties
- **name**: Display text for the link
- **url**: Full URL (must include https://)

## Built-in Commands

| Command | Description |
|---------|-------------|
| `neofetch` | Show system information |
| `clear` | Clear terminal output |
| `help` | Show available commands |
| `date` | Show current date and time |
| `whoami` | Show current user |
| `pwd` | Show current directory |
| `ls` | List directory contents |
| `reddit` | Open Reddit in new tab |
| `youtube` | Open YouTube in new tab |

## Customizing Commands

All custom commands are now in the separate `commands.js` file for easy modification.

### Adding Commands in commands.js

1. **Simple commands**: Add directly to the commands object
2. **Using addCommand()**: Use the helper function for dynamic addition
3. **Command aliases**: Create shortcuts for existing commands

### Examples in commands.js

The file includes many example commands you can uncomment and modify:
- `fortune` - Random fortune messages
- `social` - Open multiple social media sites
- `stats` - Show browser statistics
- `note`/`shownote` - Save and retrieve notes

### Built-in Command Aliases

- `h` → `help`
- `c` → `clear`  
- `q` → `quote`
- `j` → `joke`
- `yt` → `youtube`
- `gh` → `github`
- `ig` → `instagram`

## Adding Custom Commands

### Method 1: Using addCommand() function

Add commands dynamically using the built-in function:

\`\`\`javascript
// Simple text output
addCommand('time', 'show current time', function() {
    return \`<span style="color: #00ff00;">$ time</span><br>\${new Date().toLocaleTimeString()}\`;
});

// Open a website
addCommand('github', 'open github', function() {
    window.open('https://github.com', '_blank');
    return '<span style="color: #00ff00;">$ github</span><br>Opening GitHub...';
});

// Interactive command with logic
addCommand('calc', 'simple calculator', function() {
    const result = Math.floor(Math.random() * 100);
    return \`<span style="color: #00ff00;">$ calc</span><br>Random number: \${result}\`;
});
\`\`\`

### Method 2: Direct commands object modification

Add commands directly to the commands object:

\`\`\`javascript
commands.weather = {
    description: 'show weather info',
    execute: function() {
        return '<span style="color: #00ff00;">$ weather</span><br>Sunny, 25°C';
    }
};
\`\`\`

### Command Function Structure

Each command function should:
- Return HTML string for output
- Use `<span style="color: #00ff00;">$ commandname</span>` for command echo
- Use `<br>` for line breaks
- Return empty string `''` to clear output

### Examples

\`\`\`javascript
// Random quote command
addCommand('quote', 'show random quote', function() {
    const quotes = [
        "Code is poetry.",
        "Keep it simple, stupid.",
        "Make it work, make it right, make it fast."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return \`<span style="color: #00ff00;">$ quote</span><br>"\${randomQuote}"\`;
});

// System info command
addCommand('uptime', 'show page uptime', function() {
    const minutes = Math.floor((Date.now() - startTime) / 60000);
    return \`<span style="color: #00ff00;">$ uptime</span><br>Page loaded \${minutes} minutes ago\`;
});

// External API command (example)
addCommand('ip', 'show public IP', function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('commandOutput').innerHTML += 
                \`<br>Your IP: \${data.ip}\`;
        });
    return '<span style="color: #00ff00;">$ ip</span><br>Fetching IP address...';
});
\`\`\`

## Customization

### Colors
Change terminal colors by modifying CSS variables:

\`\`\`css
body {
    background-color: #0c0c0c;  /* Background */
    color: #00ff00;             /* Text color */
}
\`\`\`

### Font
The page uses system monospace fonts. To change:

\`\`\`css
body {
    font-family: 'Your-Font', 'Courier New', monospace;
}
\`\`\`

### Layout
Adjust column proportions:

\`\`\`css
.left-panel { flex: 1; }   /* Left side width */
.right-panel { flex: 1; }  /* Right side width */
\`\`\`

## Keyboard Shortcuts

- **Enter**: Execute command or search
- **Click anywhere**: Focus terminal input
- **Type anywhere**: Auto-focus terminal input

## Browser Compatibility

- ✅ Firefox (recommended)
- ✅ Chrome/Chromium
- ✅ Safari
- ✅ Edge

## Troubleshooting

### Bookmarks not loading
- Check that `bookmarks.json` is in the same folder as `index.html`
- Verify JSON syntax is valid
- Check browser console for errors

### Commands not working
- Ensure command names are lowercase
- Check for JavaScript errors in browser console
- Verify command function returns a string

### Styling issues
- Clear browser cache
- Check CSS syntax
- Verify file paths are correct

## Contributing

Feel free to:
- Add new built-in commands
- Improve the design
- Add new features
- Fix bugs

## License

Free to use and modify for personal use.
