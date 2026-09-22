/* =========================
   QUOTES DATA
========================= */

const quotes = [
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    },

    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },

    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },

    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "Everything you can imagine is real.",
        author: "Pablo Picasso"
    },

    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },

    {
        text: "Act as if what you do makes a difference. It does.",
        author: "William James"
    },

    {
        text: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu"
    },

    {
        text: "The harder I work, the luckier I get.",
        author: "Samuel Goldwyn"
    },

    {
        text: "Stay hungry. Stay foolish.",
        author: "Steve Jobs"
    },

    {
        text: "Quality means doing it right when no one is looking.",
        author: "Henry Ford"
    },

    {
        text: "Your limitation—it's only your imagination.",
        author: "Unknown"
    },

    {
        text: "Push yourself, because no one else is going to do it for you.",
        author: "Unknown"
    },

    {
        text: "Small progress is still progress.",
        author: "Unknown"
    },

    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    }
];


/* =========================
   DOM ELEMENTS
========================= */

const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("authorText");

const newQuoteButton = document.getElementById("newQuoteButton");
const copyButton = document.getElementById("copyButton");

const themeButton = document.getElementById("themeButton");
const statusMessage = document.getElementById("statusMessage");


/* =========================
   RANDOM QUOTE
========================= */

let currentQuoteIndex = -1;

function generateQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(
            Math.random() * quotes.length
        );
    } while (
        randomIndex === currentQuoteIndex &&
        quotes.length > 1
    );

    currentQuoteIndex = randomIndex;

    const quote = quotes[randomIndex];

    quoteText.classList.remove("animate");

    // Restart animation
    void quoteText.offsetWidth;

    quoteText.classList.add("animate");

    quoteText.textContent = quote.text;

    authorText.textContent = quote.author;

    statusMessage.textContent = "";
}


/* =========================
   COPY QUOTE
========================= */

async function copyQuote() {

    const quote = quoteText.textContent;
    const author = authorText.textContent;

    const fullQuote = `"${quote}" — ${author}`;

    try {

        await navigator.clipboard.writeText(fullQuote);

        statusMessage.textContent =
            "✓ Quote copied to clipboard";

    } catch (error) {

        statusMessage.textContent =
            "Unable to copy the quote.";

    }
}


/* =========================
   DARK / LIGHT THEME
========================= */

function toggleTheme() {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    if (isLight) {

        themeButton.textContent = "☾";

        localStorage.setItem("theme", "light");

    } else {

        themeButton.textContent = "☀";

        localStorage.setItem("theme", "dark");
    }
}


/* =========================
   LOAD SAVED THEME
========================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        themeButton.textContent = "☾";
    }
}


/* =========================
   EVENT LISTENERS
========================= */

newQuoteButton.addEventListener(
    "click",
    generateQuote
);

copyButton.addEventListener(
    "click",
    copyQuote
);

themeButton.addEventListener(
    "click",
    toggleTheme
);


/* =========================
   INITIALIZE APP
========================= */

loadTheme();

generateQuote();