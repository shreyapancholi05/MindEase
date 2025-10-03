

function clearInputContainer() {
    document.getElementById('inputContainer').innerHTML = '';
}

function createInputField(placeholder, callback) {
    const container = document.getElementById('inputContainer');
    clearInputContainer();
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'inputField';
    input.placeholder = placeholder;
    const button = document.createElement('button');
    button.id = 'submitInput';
    button.textContent = 'Submit';
    button.onclick = function () {
        if (input.value.trim() !== '') {
            callback(input.value.trim());
            clearInputContainer();
        }
    };
    container.appendChild(input);
    container.appendChild(button);
    input.focus();
}

function journalEntry() {
    createInputField("Write about how you're feeling today...", function (entry) {
        let saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
        saved.push({
            text: entry,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("journalEntries", JSON.stringify(saved));
        document.getElementById("output").innerText = "Entry saved ✅";
    });
}
function viewJournalHistory() {
    clearInputContainer();
    const output = document.getElementById("output");
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (saved.length === 0) {
        output.innerText = "No journal entries yet. Start writing today 🌱";
        return;
    }

    let html = "<h3>📖 Your Journal Entries:</h3><ul>";
    saved.forEach(entry => {
        html += `<li><b>${entry.date}:</b> ${entry.text}</li>`;
    });
    html += "</ul>";

    output.innerHTML = html;
}

const quotes = [
    "🌱 Your feelings are valid. Take it one step at a time.",
    "💡 Mental health is just as important as physical health.",
    "☀️ Every day is a fresh start — choose kindness for yourself.",
    "❤️ Self-care is not selfish, it’s essential.",
    "🌸 Healing is a journey, not a race.",
    "💪 You are stronger than you think."
];

function setRandomQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteText").innerText = quotes[random];
}

window.addEventListener("load", setRandomQuote);

function guidedMeditation() {
    clearInputContainer();
    document.getElementById('output').innerHTML = `
            <h3>Choose a Meditation Technique:</h3>
            <div class="meditation-options">
                <button onclick="showBreathingMeditation()">1. Mindful Breathing</button>
                <button onclick="showBodyScan()">2. Body Scan</button>
                <button onclick="showGuidedMeditation()">3. Guided Meditation</button>
                <button onclick="showMantraMeditation()">4. Mantra Meditation</button>
                <button onclick="showVisualization()">5. Visualization</button>
                <button onclick="showWalkingMeditation()">6. Walking Meditation</button>
            </div>
            <div id="meditationContent"></div>
        `;
}

function showBreathingMeditation() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Mindful Breathing</h4>
            <ol>
                <li>Sit comfortably and focus on your breath.</li>
                <li>Inhale deeply through your nose, hold for a second, and exhale slowly.</li>
                <li>If your mind wanders, gently bring your attention back to your breath.</li>
            </ol>
            <p>Begin your practice now. Close your eyes and focus on your breathing for 1-5 minutes.</p>
            <button onclick="startTimer(300)">Start 5 Minute Timer</button>
        `;
}

function showBodyScan() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Body Scan Meditation</h4>
            <ol>
                <li>Lie down or sit comfortably.</li>
                <li>Slowly shift your attention to different parts of your body, from head to toe.</li>
                <li>Notice any tension and consciously relax each area.</li>
            </ol>
            <p>Begin by bringing awareness to your toes and slowly moving up through your body.</p>
            <button onclick="startTimer(600)">Start 10 Minute Timer</button>
        `;
}

function showGuidedMeditation() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Guided Meditation</h4>
            <p>We recommend these free guided meditation resources:</p>
            <ul>
                <li><a href="https://www.headspace.com/" target="_blank">Headspace</a></li>
                <li><a href="https://www.calm.com/" target="_blank">Calm</a></li>
                <li><a href="https://insighttimer.com/" target="_blank">Insight Timer</a></li>
            </ul>
            <p>Or search for "guided meditation" on YouTube.</p>
        `;
}

function showMantraMeditation() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Mantra Meditation</h4>
            <ol>
                <li>Choose a calming word or phrase (e.g., "peace" or "om").</li>
                <li>Repeat it silently or aloud to focus your mind.</li>
                <li>When distracted, gently return to your mantra.</li>
            </ol>
            <div>
                <label for="mantraChoice">Choose a mantra:</label>
                <select id="mantraChoice">
                    <option value="peace">Peace</option>
                    <option value="om">Om</option>
                    <option value="love">Love</option>
                    <option value="calm">Calm</option>
                    <option value="custom">Your own word</option>
                </select>
                <input type="text" id="customMantra" placeholder="Enter your mantra" style="display:none;">
            </div>
            <button onclick="startMantraPractice()">Begin Mantra Practice</button>
        `;

    document.getElementById('mantraChoice').addEventListener('change', function () {
        const customInput = document.getElementById('customMantra');
        customInput.style.display = this.value === 'custom' ? 'block' : 'none';
    });
}

function startMantraPractice() {
    const choice = document.getElementById('mantraChoice').value;
    let mantra;

    if (choice === 'custom') {
        mantra = document.getElementById('customMantra').value.trim();
        if (!mantra) {
            alert('Please enter your custom mantra');
            return;
        }
    } else {
        mantra = document.getElementById('mantraChoice').options[document.getElementById('mantraChoice').selectedIndex].text;
    }

    document.getElementById('meditationContent').innerHTML = `
            <h4>Mantra Meditation in Progress</h4>
            <p>Repeat in your mind or aloud:</p>
            <div style="font-size: 2em; margin: 20px 0;">${mantra}</div>
            <p>Continue for 5-10 minutes. When your mind wanders, gently return to your mantra.</p>
            <button onclick="startTimer(300)">Start 5 Minute Timer</button>
        `;
}

function showVisualization() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Visualization Meditation</h4>
            <ol>
                <li>Close your eyes and imagine a peaceful scene, like a forest or the ocean.</li>
                <li>Engage your senses by picturing sights, sounds, and smells.</li>
                <li>Stay with this image for several minutes, exploring its details.</li>
            </ol>
            <p>Choose a visualization:</p>
            <button onclick="startVisualization('beach')">Beach Scene</button>
            <button onclick="startVisualization('forest')">Forest Scene</button>
            <button onclick="startVisualization('mountain')">Mountain Scene</button>
        `;
}

function startVisualization(scene) {
    let description = '';
    if (scene === 'beach') {
        description = `
                Imagine yourself on a beautiful beach. Feel the warm sand beneath you, 
                hear the waves gently rolling in, smell the salty ocean air. 
                Watch the sunlight sparkle on the water and feel a gentle breeze.
            `;
    } else if (scene === 'forest') {
        description = `
                Picture yourself in a peaceful forest. Notice the tall trees around you, 
                the dappled sunlight coming through the leaves. Hear birds singing softly 
                and the rustle of leaves in the wind. Smell the fresh, earthy forest air.
            `;
    } else {
        description = `
                Visualize yourself on a mountain top. See the breathtaking view of valleys below, 
                feel the crisp, clean air. Notice the quiet and stillness all around you, 
                with only the sound of wind gently blowing.
            `;
    }

    document.getElementById('meditationContent').innerHTML = `
            <h4>Visualization Meditation</h4>
            <p>${description}</p>
            <p>Close your eyes and maintain this visualization for several minutes.</p>
            <button onclick="startTimer(300)">Start 5 Minute Timer</button>
        `;
}

function showWalkingMeditation() {
    document.getElementById('meditationContent').innerHTML = `
            <h4>Walking Meditation</h4>
            <ol>
                <li>Walk slowly and focus on each step.</li>
                <li>Notice how your feet move and the sensations in your body.</li>
                <li>This is great if sitting meditation feels difficult.</li>
                <li>Pay attention to the lifting, moving, and placing of each foot.</li>
                <li>If your mind wanders, gently return to focusing on your steps.</li>
            </ol>
            <p>Find a quiet place where you can walk slowly back and forth for 5-10 minutes.</p>
            <button onclick="startTimer(300)">Start 5 Minute Timer</button>
        `;
}

function startTimer(seconds) {
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timerDisplay';
    timerDisplay.style.fontSize = '2em';
    timerDisplay.style.margin = '20px 0';

    const content = document.getElementById('meditationContent');
    content.appendChild(timerDisplay);

    let remaining = seconds;
    updateTimerDisplay();

    const timer = setInterval(() => {
        remaining--;
        updateTimerDisplay();

        if (remaining <= 0) {
            clearInterval(timer);
            timerDisplay.innerHTML = 'Time is up! Take a moment to notice how you feel.';
            const chime = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
            chime.play().catch(e => console.log('Audio play failed:', e));
        }
    }, 1000);

    function updateTimerDisplay() {
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        timerDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}


function moodTracker() {
    createInputField('How are you feeling today? (happy/sad/anxious/neutral)', function (mood) {
        mood = mood.toLowerCase();
        let output = "";
        if (mood === "happy") {
            output = "That's wonderful! You're doing great! Keep going!";
        } else if (mood === "sad" || mood === "anxious") {
            output = "I'm here for you. Try some deep breathing exercises.";
        } else if (mood === "neutral") {
            output = "Thanks for sharing. Here’s a tip: Go for a short walk to refresh your mind.";
        } else {
            output = "I'm not sure I understand, but I'm here to help!";
        }
        document.getElementById('output').innerText = output;
    });
}

function gratitudeJournal() {
    createInputField('List three things you\'re grateful for today:', function (gratitude) {
        document.getElementById('output').innerText = "Gratitude saved: " + gratitude;
    });
}

function openHelp() {
    window.open("https://www.pib.gov.in/pressreleaseshare.aspx?prid=1652240", "_blank");
}

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    clearInputContainer();
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('output').innerText = '';
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('gameStatus').innerText = "Your turn (X)";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || board[index] !== '') return;
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWin()) {
        document.getElementById('gameStatus').innerText = `${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }
    if (board.every(cell => cell !== '')) {
        document.getElementById('gameStatus').innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    document.getElementById('gameStatus').innerText = `Player ${currentPlayer}'s turn`;
    if (currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (!gameActive) return;
    let available = board.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
    let choice = available[Math.floor(Math.random() * available.length)];
    board[choice] = 'O';
    const cells = document.querySelectorAll('.cell');
    cells[choice].innerText = 'O';
    if (checkWin()) {
        document.getElementById('gameStatus').innerText = `O wins! (Computer)`;
        gameActive = false;
        return;
    }
    if (board.every(cell => cell !== '')) {
        document.getElementById('gameStatus').innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = 'X';
    document.getElementById('gameStatus').innerText = "Your turn (X)";
}

function checkWin() {
    return winningCombinations.some(combo => {
        return board[combo[0]] !== '' &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[1]] === board[combo[2]];
    });
}

function resetGame() {
    startGame();
}