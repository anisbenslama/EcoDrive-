const express = require("express");
const bodyParser = require('body-parser'); 
const bcrypt = require('bcryptjs'); 
const app = express();
const exphbs = require('express-handlebars');
const path = require("path");
const mysql = require("mysql"); 
const dotenv = require('dotenv'); 
const multer = require('multer');
const fs = require('fs');
app.use(express.json());  

app.use(bodyParser.urlencoded({extended: true})); 

// configuration base de donnée avec environement 
dotenv.config({ path: './.env'})
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE 
});

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL est connecté avec succés")
  }
})


// installation express-Handlebars
app.use(express.static('public'))
app.engine(
  ".hbs",
  exphbs.engine({ extname: ".hbs", }),
);
app.set('view engine', 'hbs');

//addition image folder 
app.use("/images", express.static(path.join(__dirname, "/public/img")));

//addition js file  
app.use("/js", express.static(path.join(__dirname, "/public/js")));

// Routes 
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth')); 
app.use('/vehicules',require('./routes/vehicule')); 

// Parse URL encoded bodies (as sent by html forms)
app.use(express.urlencoded({extended: false})); 
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

// connexion page login admin 
app.post("/instricteur", function (req,res)  {
  var email = req.body.email ; 
  var password = req.body.password ;
  db.query("SELECT * FROM instructeur WHERE email = ? and password = ? ",[email,password], function(error, results,fields){
    if (results.length > 0) {
      res.redirect("/dashboardInstricteur");
    } else {
      res.redirect("/instricteur"); 
    }
    res.end();
  })
})

//lorsque login Instricteur est succés 

app.get("/dashboardInstricteur", function(req,res) {
  res.sendFile(__dirname + "/dashboardInstricteur")
})

// connexion page login admin 
app.post("/admin", function (req,res)  {
  var email = req.body.email ; 
  var password = req.body.password ;
  db.query("SELECT * FROM admin WHERE email = ? and password = ? ",[email,password], function(error, results,fields){
    if (results.length > 0) {
      res.redirect("/dashboardadmin");
    } else {
      res.redirect("/admin"); 
    }
    res.end();
  })
})

//lorsque login admin est succés 

app.get("/dashboardadmin", function(req,res) {
  res.sendFile(__dirname + "/dashboardadmin")
})

// connexion page login candidat 
app.post("/connexion", function (req,res)  {
  var email = req.body.email ; 
  var password = req.body.password ;
  db.query("SELECT * FROM candidat WHERE email = ? and password = ? ",[email,password], function(error, results,fields){
    if (results.length > 0) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/connexion"); 
    }
    res.end();
  })
})

//lorsque login candidat est succés 

app.get("/dashboard", function(req,res) {
  res.sendFile(__dirname + "/dashboard")
})


// Route to fetch data
app.get('/instructeurs', (req, res) => {
  // Query to retrieve data from table
  connection.query('SELECT * FROM instructeur', (err, results) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.json(results); // Send JSON response with fetched data
  });
});

// Route pour réinitialiser le mot de passe
app.post('/ResetPassword', (req, res) => {
  const { email } = req.body;
  // Vérifier si l'email existe dans la base de données
  db.query('SELECT * FROM candidat WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }
    // Générer un nouveau mot de passe sécurisé
    const newPassword = Math.random().toString(36).substring(7);
    // Hasher le nouveau mot de passe
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) throw err;
      // Mettre à jour le mot de passe dans la base de données
      db.query('UPDATE candidat SET password = ? WHERE email = ?', [hash, email], (err, results) => {
        if (err) throw err;
        console.log('Password reset successfully');
        // Vous pouvez envoyer le nouveau mot de passe par e-mail ici
        res.status(200).json({ message: "Password reset successfully", newPassword });
      });
    });
  });
});

// Endpoint pour récupérer les informations du profil
app.get('/profil', (req, res) => {
  const userId = req.query.id;

  const query = 'SELECT * FROM candidat WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Endpoint pour mettre à jour les informations du profil
app.post('/profil', (req, res) => {
  const { id, firstName, lastName, email, phone } = req.body;

  const query = 'UPDATE candidat SET prenom = ?, nom = ?, email = ?, phone = ? WHERE id = ?';
  connection.query(query, [prenom, nom, email, phone, id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});
// Route pour obtenir les nouveaux candidats
app.get('/api/candidates/new', (req, res) => {
  let sql = 'SELECT prenom, nom FROM candidat ORDER BY id DESC LIMIT 6';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Route pour récupérer les données des candidats
app.get('/candidats', (req, res) => {
  // Requête SQL pour sélectionner les données des candidats
  const sql = 'SELECT id, prenom, nom FROM candidats';

  // Exécuter la requête SQL
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des candidats :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des candidats' });
      return;
    }
    res.json(result); // Renvoyer les données des candidats au format JSON
  });
});

// Route pour récupérer le nombre de candidats
app.get('/api/candidates/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM candidat';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Route pour récupérer et afficher les données du tableau
app.get('/vehicules', (req, res) => {
  connection.query('SELECT * FROM vehicule', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur lors de la récupération des données');
      return;
    }
    res.render('vehicules', { vehicules: results });
  });
});

// Fetch profile data
app.get('/profile', (req, res) => {
  const userId = req.query.id; // Assume the user ID 
  const sql = 'SELECT prenom, nom, email FROM candidat WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result[0]);
  });
});

// Route pour récupérer les candidats
app.get('/candidat', (req, res) => {
  const query = 'SELECT * FROM candidat';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des candidats:', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('profileImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Update profile route
app.post('/profile/update', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      const { prenom, nom, email } = req.body;
      const profileImage = req.file ? req.file.filename : null;

      const sql = "UPDATE candidat SET prenom = ?, nom = ?, email = ?, profileImage = ? WHERE id = ?";
      db.query(sql, [prenom, nom, email, profileImage, req.body.id], (err, result) => {
        if (err) throw err;
        res.send('Profile updated successfully');
      });
    }
  });
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// Route pour supprimer un candidat
app.delete('/candidats/:id', (req, res) => {
  const id = req.params.id;
  // Requête SQL pour supprimer le candidat de la base de données
  const sql = `DELETE FROM candidat WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du candidat :', err);
      res.status(500).json({ error: 'Erreur lors de la suppression du candidat' });
      return;
    }
    res.status(200).json({ message: 'Candidat supprimé avec succès' });
  });
});

//listening on port using Node js 
app.listen(3000, () => {
  console.log('Server is listening on port:', 3000);
});


