let allUsers = [];


// =========================
// LOAD USERS
// =========================

async function loadUsers() {

    try {

        const response = await fetch("/api/users");

        const data = await response.json();

        if (!data.success) {
            showMessage("Unable to load users.", "error");
            return;
        }

        allUsers = data.users;

        displayUsers(allUsers);

    } catch (error) {

        console.error(error);

        showMessage(
            "Server connection failed.",
            "error"
        );
    }
}


// =========================
// DISPLAY USERS
// =========================

function displayUsers(users) {

    const usersList =
        document.getElementById("usersList");

    if (users.length === 0) {

        usersList.innerHTML = `
            <p class="empty">
                No users found.
            </p>
        `;

        return;
    }


    usersList.innerHTML = users.map(user => {

        return `
            <div class="user-card">

                <div class="user-info">

                    <h4>
                        ${escapeHTML(user.name)}
                    </h4>

                    <p>
                        ${escapeHTML(user.email)}
                    </p>

                    <p>
                        User ID: ${user.id}
                    </p>

                </div>


                <div class="user-actions">

                    <button
                        class="edit-btn"
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

    }).join("");
}


// =========================
// CREATE USER
// =========================

document
    .getElementById("userForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();


        if (!name || !email) {

            showMessage(
                "Please enter name and email.",
                "error"
            );

            return;
        }


        try {

            const response = await fetch(
                "/api/users",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                showMessage(
                    data.message,
                    "error"
                );

                return;
            }


            showMessage(
                data.message,
                "success"
            );


            document
                .getElementById("userForm")
                .reset();


            loadUsers();

        } catch (error) {

            console.error(error);

            showMessage(
                "Unable to create user.",
                "error"
            );
        }

    });


// =========================
// UPDATE USER
// =========================

async function editUser(id) {

    const user =
        allUsers.find(user => user.id === id);


    if (!user) {
        return;
    }


    const newName =
        prompt("Enter new name:", user.name);


    if (newName === null) {
        return;
    }


    const newEmail =
        prompt("Enter new email:", user.email);


    if (newEmail === null) {
        return;
    }


    if (!newName.trim() || !newEmail.trim()) {

        showMessage(
            "Name and email cannot be empty.",
            "error"
        );

        return;
    }


    try {

        const response = await fetch(
            `/api/users/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: newName.trim(),
                    email: newEmail.trim()
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            showMessage(
                data.message,
                "error"
            );

            return;
        }


        showMessage(
            data.message,
            "success"
        );


        loadUsers();

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to update user.",
            "error"
        );
    }
}


// =========================
// DELETE USER
// =========================

async function deleteUser(id) {

    const confirmed =
        confirm("Are you sure you want to delete this user?");


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `/api/users/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            showMessage(
                data.message,
                "error"
            );

            return;
        }


        showMessage(
            data.message,
            "success"
        );


        loadUsers();

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to delete user.",
            "error"
        );
    }
}


// =========================
// SEARCH USERS
// =========================

function searchUsers() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredUsers =
        allUsers.filter(user => {

            return (
                user.name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search)
            );

        });


    displayUsers(filteredUsers);
}


// =========================
// MESSAGE
// =========================

function showMessage(message, type) {

    const messageBox =
        document.getElementById("message");


    messageBox.innerHTML = `
        <div class="${type}-message">
            ${escapeHTML(message)}
        </div>
    `;


    setTimeout(() => {

        messageBox.innerHTML = "";

    }, 3000);
}


// =========================
// SCROLL TO USERS
// =========================

function scrollToUsers() {

    document
        .getElementById("users")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =========================
// BASIC HTML ESCAPING
// =========================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================
// INITIAL LOAD
// =========================

loadUsers();