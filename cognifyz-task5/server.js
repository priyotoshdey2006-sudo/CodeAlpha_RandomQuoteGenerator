const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Temporary server-side storage
let users = [
    {
        id: 1,
        name: "Priyotosh Dey",
        email: "priyotosh@example.com"
    }
];


// =========================
// FRONTEND
// =========================

app.get("/", (req, res) => {
    res.render("index");
});


// =========================
// REST API - READ
// =========================

// Get all users
app.get("/api/users", (req, res) => {
    res.json({
        success: true,
        users: users
    });
});


// Get single user
app.get("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    res.json({
        success: true,
        user: user
    });
});


// =========================
// REST API - CREATE
// =========================

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required."
        });
    }

    const newUser = {
        id: users.length > 0
            ? Math.max(...users.map(user => user.id)) + 1
            : 1,
        name: name.trim(),
        email: email.trim()
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: newUser
    });
});


// =========================
// REST API - UPDATE
// =========================

app.put("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required."
        });
    }

    user.name = name.trim();
    user.email = email.trim();

    res.json({
        success: true,
        message: "User updated successfully.",
        user: user
    });
});


// =========================
// REST API - DELETE
// =========================

app.delete("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const userExists = users.some(user => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    users = users.filter(user => user.id !== id);

    res.json({
        success: true,
        message: "User deleted successfully."
    });
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log(
        `Task 5 server running at http://localhost:${PORT}`
    );
});