const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const outputText = document.getElementById('text-output');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const statusText = document.getElementById('status');
const downloadBtn = document.getElementById('download-btn');
// Initialize Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening even if user pauses
    recognition.interimResults = true; // Show results while speaking

const languageSelect = document.getElementById('language');

// Initialize with default
recognition.lang = 'en-US'; 

// Add this event listener to change language dynamically
languageSelect.addEventListener('change', () => {
    recognition.lang = languageSelect.value;
    statusText.innerText = "Language set to " + languageSelect.options[languageSelect.selectedIndex].text;
});

// ... rest of your code ...

    // Start Recording
    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        statusText.innerText = "Listening...";
        statusText.style.color = "green";
    });

    // Stop Recording
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        statusText.innerText = "Microphone is off";
        statusText.style.color = "#888";
    });

    // Handle Results
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        outputText.value = transcript;
    };

    // Error Handling
    recognition.onerror = (event) => {
        statusText.innerText = "Error occurred: " + event.error;
        stopBtn.click();
    };

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        alert("Text copied to clipboard!");
    });

    // Clear Text
    clearBtn.addEventListener('click', () => {
        outputText.value = "";
    });
}
downloadBtn.addEventListener('click', () => {
    const text = outputText.value;
    
    // Check if empty
    if(!text) {
        alert("There is no text to download!");
        return;
    }

    // Create a Blob (a file-like object of immutable raw data)
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a hidden link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voice-note.txt'; // The filename
    document.body.appendChild(a);
    a.click(); // Simulate a click
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Toggle the class
    body.classList.toggle('dark-mode');

    // Change the button text
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.innerText = "☀️ Light Mode";
    } else {
        themeToggleBtn.innerText = "🌙 Dark Mode";
    }
});