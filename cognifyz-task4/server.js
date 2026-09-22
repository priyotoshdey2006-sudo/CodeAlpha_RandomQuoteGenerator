const express = require("express");

const app = express();
const PORT = 3000;

// EJS template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static("public"));


// =========================
// HOME PAGE
// =========================

app.get("/", (req, res) => {
    res.render("index");
});


// =========================
// REGISTER
// =========================

app.post("/register", (req, res) => {

    const {
        name,
        email,
        password,
        confirmPassword,
        terms
    } = req.body;


    // Name validation
    if (!name || name.trim().length < 3) {
        return res.status(400).send(
            "Invalid name. Name must contain at least 3 characters."
        );
    }


    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send(
            "Invalid email address."
        );
    }


    // Password validation
    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!strongPassword.test(password)) {
        return res.status(400).send(
            "Password must contain 6+ characters, uppercase, lowercase, number and special character."
        );
    }


    // Confirm password
    if (password !== confirmPassword) {
        return res.status(400).send(
            "Passwords do not match."
        );
    }


    // Terms and conditions
    if (!terms) {
        return res.status(400).send(
            "You must accept the terms and conditions."
        );
    }


    // Successful registration
    res.send(`
        <div style="
            font-family: Arial;
            text-align: center;
            margin-top: 100px;
        ">

            <h1>Registration Successful!</h1>

            <p>Welcome, ${name}.</p>

            <p>Your account has been successfully created.</p>

            <a href="/">
                Back to Registration
            </a>

        </div>
    `);
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log(
        `Task 4 server running at http://localhost:${PORT}`
    );
}); 