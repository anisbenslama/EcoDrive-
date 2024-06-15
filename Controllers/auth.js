const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// Create MySQL connection pool
const db = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.registre = async (req, res) => {
  console.log(req.body);

  const { prenom, nom, email, password, passwordConfirm } = req.body;

  // Check if any of the required fields are null
  if (!prenom || !nom || !email || !password || !passwordConfirm) {
    return res.render('registre', {
      message: 'Veuillez remplir tous les champs'
    });
  }

  // Check if passwords match
  if (password !== passwordConfirm) {
    return res.render('registre', {
      message: 'Les mots de passe ne correspondent pas'
    });
  }

  let hashedPassword = await bcrypt.hash(password, 8);
   console.log(hashedPassword); 

  // Check if email already exists
  db.query('SELECT email FROM candidat WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.render('registre', {
        message: 'Une erreur s\'est produite lors de l\'enregistrement. Veuillez réessayer plus tard.'
      });
    }

    if (results.length > 0) {
      return res.render('registre', {
        message: 'Cette adresse email existe déjà'
      });
    } else {
      // Proceed with registration
      db.query('INSERT INTO candidat (prenom, nom, email, password) VALUES (?, ?, ?, ?)', [prenom, nom, email, password], (error, results) => {
        if (error) {
          console.log(error);
          return res.render('registre', {
            message: 'Une erreur s\'est produite lors de l\'enregistrement. Veuillez réessayer plus tard.'
          });
        } else {
          console.log(results);
          return res.render('registre', {
            message: 'Candidat enregistré avec succès'
          });
        }
      });
    }
  });

  
}



