document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Utilizator adăugat cu succes!');
        getUsers(); // Actualizează lista de utilizatori
    } else {
        alert('Eroare la adăugarea utilizatorului!');
    }
});

async function getUsers() {
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();

    const tableBody = document.querySelector('#users-table tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;
        tableBody.appendChild(row);
    });
}

getUsers(); // La încărcare, obține utilizatorii
