var express = require('express'); 
var router = express.Router(); 

// Récupérer tous les enregistrements
router.get('/vehicules', (req, res) => {
  connection.query('SELECT * FROM vehicule', (error, results, fields) => {
      if (error) {
          console.error('Erreur lors de l\'exécution de la requête : ' + error.stack);
          res.status(500).send('Erreur lors de la récupération des données');
          return;
      }
      res.json(results);
  });
});

module.exports = router ;