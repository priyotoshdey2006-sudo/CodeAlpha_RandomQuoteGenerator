const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        message: null,
        name: null,
        email: null
    });
});

// Handle form submission
app.post("/submit", (req, res) => {

    const { name, email } = req.body;

    res.render("index", {
        message: "Form submitted successfully!",
        name: name,
        email: email
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});