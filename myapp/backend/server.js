const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');  // Importăm path pentru a lucra cu căile fișierelor

const app = express();




// Middleware pentru a permite Express să servească fișierele statice din folderul frontend
app.use(express.static(path.join(__dirname, '../frontend')));  // Aici servim fișierele statice

// Middleware pentru a parsarea cererilor JSON (pentru rutele API)
app.use(bodyParser.json());

// Rute API pentru gestionarea utilizatorilor
app.use('/api', userRoutes);

// Conectare la baza de date și pornirea serverului
sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
    });
});
