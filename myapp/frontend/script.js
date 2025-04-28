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


async function deleteUser(userId) {
    if (!confirm('Sigur vrei să ștergi acest utilizator?')) return;
  
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      alert('Utilizator șters cu succes!');
      fetchUsers(); // Reîncarcă lista
    } else {
      alert('Eroare la ștergerea utilizatorului.');
    }
  }
  
  async function editUser(userId, currentName, currentEmail) {
    const newName = prompt('Introdu noul nume:', currentName);
    const newEmail = prompt('Introdu noul email:', currentEmail);
  
    if (!newName || !newEmail) return;
  
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });
  
    if (response.ok) {
      alert('Utilizator editat cu succes!');
      fetchUsers(); // Reîncarcă lista
    } else {
      alert('Eroare la editarea utilizatorului.');
    }
  }     


async function getUsers() {
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();

    const tableBody = document.querySelector('#users-table tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editează';
        editButton.addEventListener('click', () => {
            editUser(user.id, user.name, user.email);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Șterge';
        deleteButton.addEventListener('click', () => {
            deleteUser(user.id);
        });

        const buttonCell = document.createElement('td');
        buttonCell.appendChild(editButton);
        buttonCell.appendChild(deleteButton);

        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    });
}
getUsers(); // La încărcare, obține utilizatorii