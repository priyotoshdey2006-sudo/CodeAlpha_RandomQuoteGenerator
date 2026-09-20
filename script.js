const quotes = [

    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },

    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
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
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },

    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    }

];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuoteBtn");

let lastQuoteIndex = -1;


function showRandomQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    }
    while (randomIndex === lastQuoteIndex && quotes.length > 1);

    lastQuoteIndex = randomIndex;

    const selectedQuote = quotes[randomIndex];

    quoteElement.textContent = selectedQuote.text;

    authorElement.textContent = `— ${selectedQuote.author}`;

}


newQuoteButton.addEventListener("click", showRandomQuote);


showRandomQuote();