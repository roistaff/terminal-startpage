// ===== CUSTOM COMMANDS FOR TERMINAL STARTUP PAGE =====
// Add your custom commands here!

// ===== CORE COMMANDS =====
const commands = {
  neofetch: {
    description: "show system info",
    execute: () => {
      showNeofetch()
      return '<span style="color: #00ff00;">$ neofetch</span>'
    },
  },

  clear: {
    description: "clear terminal",
    execute: () => {
      hideNeofetch()
      return ""
    },
  },

  help: {
    description: "show available commands",
    execute: () => {
      let helpText = '<span style="color: #00ff00;">$ help</span><br>Available commands:<br>'
      for (const [cmd, info] of Object.entries(commands)) {
        // Skip aliases in help display
        if (typeof info === "object" && info.description) {
          helpText += `• ${cmd} - ${info.description}<br>`
        }
      }
      helpText += "• anything else - search Google"
      return helpText
    },
  },

  date: {
    description: "show current date and time",
    execute: () => {
      const now = new Date()
      return `<span style="color: #00ff00;">$ date</span><br>${now.toString()}`
    },
  },

  time: {
    description: "show current time",
    execute: () => `<span style="color: #00ff00;">$ time</span><br>${new Date().toLocaleTimeString()}`,
  },

  calc: {
    description: "simple calculator (usage: calc 2+2)",
    execute: () =>
      `<span style="color: #00ff00;">$ calc</span><br>Usage: Type your calculation after 'calc' (e.g., calc 2+2)<br><span style="color: #666;">Note: For security, use a proper calculator implementation</span>`,
  },

  ping: {
    description: "check if online",
    execute: () => {
      const status = navigator.onLine ? "Online" : "Offline"
      const color = navigator.onLine ? "#00ff00" : "#ff0000"
      return `<span style="color: #00ff00;">$ ping</span><br><span style="color: ${color};">${status}</span>`
    },
  },
}

// ===== EASY COMMAND ADDITION FUNCTION =====
function addCommand(name, description, executeFunction) {
  commands[name] = {
    description: description,
    execute: executeFunction,
  }
}

// ===== EXAMPLE: HOW TO ADD YOUR OWN COMMANDS =====
// Uncomment and modify this example:

/*
// Simple text command
addCommand('hello', 'say hello', function() {
    return '<span style="color: #00ff00;">$ hello</span><br>Hello, World!';
});
*/

// ===== EXPORT FOR MAIN SCRIPT =====
// This makes the commands available to the main HTML file
if (typeof module !== "undefined" && module.exports) {
  module.exports = { commands, addCommand }
}

// Mock functions to resolve the errors
function showNeofetch() {
  // Implementation for showNeofetch
}

function hideNeofetch() {
  // Implementation for hideNeofetch
}
