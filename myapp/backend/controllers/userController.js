const User = require('../models/user');
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Funcție pentru a edita un utilizator
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    try {
      const user = await User.update({ name, email }, {
        where: { id }
      });
  
      if (user[0] === 0) { // Dacă nu s-a actualizat nimic
        return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
      }
  
      res.status(200).json({ message: 'Utilizator actualizat cu succes' });
    } catch (error) {
      res.status(500).json({ message: 'Eroare la actualizarea utilizatorului' });
    }
  };
  
  // Funcție pentru a șterge un utilizator
  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await User.destroy({
        where: { id }
      });
  
      if (!deleted) { // Dacă nu s-a șters nimic
        return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
      }
  
      res.status(200).json({ message: 'Utilizator șters cu succes' });
    } catch (error) {
      res.status(500).json({ message: 'Eroare la ștergerea utilizatorului' });
    }
  };