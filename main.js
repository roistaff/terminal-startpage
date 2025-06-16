// ===== MAIN TERMINAL FUNCTIONALITY =====

const startTime = Date.now()

// ===== LOAD BOOKMARKS FROM JSON =====
async function loadBookmarks() {
  try {
    const response = await fetch("bookmarks.json")
    const data = await response.json()
    return data.bookmarks
  } catch (error) {
    return [
      { name: "reddit.com", url: "https://reddit.com" },
      { name: "youtube.com", url: "https://youtube.com" },
      { name: "github.com", url: "https://github.com" },
    ]
  }
}

// ===== COMMANDS LOADED FROM commands.js =====
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
} // Define commands object

// ===== RENDER BOOKMARKS =====
async function renderBookmarks() {
  const bookmarksList = document.getElementById("bookmarksList")
  bookmarksList.innerHTML = '<div class="loading-message">Loading bookmarks...</div>'

  const bookmarksData = await loadBookmarks()
  bookmarksList.innerHTML = ""

  bookmarksData.forEach((bookmark) => {
    const link = document.createElement("a")
    link.href = bookmark.url
    link.className = "link-item"
    link.textContent = bookmark.name
    bookmarksList.appendChild(link)
  })
}

// ===== COMMAND HANDLER =====
async function handleTerminalCommand(event) {
  if (event.key === "Enter") {
    const input = event.target
    const command = input.value.trim().toLowerCase()
    const output = document.getElementById("commandOutput")

    if (commands[command]) {
      try {
        const result = await commands[command].execute()
        output.innerHTML = result
      } catch (error) {
        output.innerHTML = `<span style="color: #ff0000;">Error executing command: ${command}</span>`
      }
    } else if (command) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(command)}`
    }

    input.value = ""
    updateVirtualCursor()
  }
}

// ===== SYSTEM FUNCTIONS =====
function showNeofetch() {
  const neofetch = document.getElementById("neofetchDisplay")
  neofetch.classList.add("show")
  updateSystemInfo()
}

function hideNeofetch() {
  const neofetch = document.getElementById("neofetchDisplay")
  neofetch.classList.remove("show")
}

function updateSystemInfo() {
  const osInfo = document.getElementById("osInfo")
  const platform = navigator.platform
  if (platform.includes("Win")) osInfo.textContent = "Windows"
  else if (platform.includes("Mac")) osInfo.textContent = "macOS"
  else if (platform.includes("Linux")) osInfo.textContent = "Linux"
  else osInfo.textContent = platform

  const browserInfo = document.getElementById("browserInfo")
  const userAgent = navigator.userAgent
  if (userAgent.includes("Firefox")) {
    const version = userAgent.match(/Firefox\/(\d+)/)
    browserInfo.textContent = `Firefox ${version ? version[1] : ""}`
  } else if (userAgent.includes("Chrome")) {
    browserInfo.textContent = "Chrome"
  } else if (userAgent.includes("Safari")) {
    browserInfo.textContent = "Safari"
  }

  const resolution = document.getElementById("resolution")
  resolution.textContent = `${screen.width}x${screen.height}`

  // Update online status
  const onlineStatus = document.getElementById("onlineStatus")
  onlineStatus.textContent = navigator.onLine ? "Online" : "Offline"
  onlineStatus.style.color = navigator.onLine ? "#ffffff" : "#ff0000"
}

// ===== VIRTUAL CURSOR =====
function updateVirtualCursor() {
  const input = document.getElementById("terminalInput")
  const cursor = document.getElementById("virtualCursor")

  const tempSpan = document.createElement("span")
  tempSpan.style.font = window.getComputedStyle(input).font
  tempSpan.style.visibility = "hidden"
  tempSpan.style.position = "absolute"
  tempSpan.style.whiteSpace = "pre"

  const textBeforeCursor = input.value.substring(0, input.selectionStart)
  tempSpan.textContent = textBeforeCursor

  document.body.appendChild(tempSpan)
  const textWidth = tempSpan.offsetWidth
  document.body.removeChild(tempSpan)

  cursor.style.left = textWidth + "px"

  if (input.value === "" && input.placeholder) {
    cursor.style.opacity = "0.3"
  } else {
    cursor.style.opacity = "1"
  }
}

// ===== EVENT LISTENERS =====
document.addEventListener("click", () => {
  document.getElementById("terminalInput").focus()
})

document.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
    document.getElementById("terminalInput").focus()
  }
})

// ===== INPUT EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  const terminalInput = document.getElementById("terminalInput")

  terminalInput.addEventListener("keypress", handleTerminalCommand)
  terminalInput.addEventListener("input", updateVirtualCursor)
  terminalInput.addEventListener("keyup", updateVirtualCursor)
  terminalInput.addEventListener("keydown", updateVirtualCursor)
  terminalInput.addEventListener("focus", updateVirtualCursor)
  terminalInput.addEventListener("blur", updateVirtualCursor)
})

// ===== INITIALIZATION =====
window.addEventListener("load", async () => {
  await renderBookmarks()
  updateVirtualCursor()
})

// ===== SYSTEM INFO UPDATE INTERVAL =====
setInterval(() => {
  if (document.getElementById("neofetchDisplay").classList.contains("show")) {
    updateSystemInfo()
  }
}, 60000)
