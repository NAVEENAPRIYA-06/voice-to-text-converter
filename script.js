const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const outputText = document.getElementById('text-output');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const statusText = document.getElementById('status');

// Initialize Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening even if user pauses
    recognition.interimResults = true; // Show results while speaking
    recognition.lang = 'en-US'; // Set language

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