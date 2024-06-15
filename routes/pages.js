const express = require ("express"); 
const router = express.Router(); 

router.get('/Home', (req,res) => {
  res.render('index');
}); 

router.get('/about', (req,res) => {
  res.render('about');
}); 

router.get('/contact', (req,res) => {
  res.render('contact');
}); 

router.get('/forfait', (req,res) => {
  res.render('forfait');
}); 

router.get('/connexion', (req,res) => {
  res.render('login');
}); 

router.get('/registre', (req,res) => {
  res.render('registre');
}); 

router.get('/programme', (req,res) => {
  res.render('programme');
}); 

router.get('/dashboard', (req,res) => {
  res.render('dashboardcandidat');
}); 

router.get('/admin', (req,res) => {
  res.render('loginadmin');
}); 

router.get('/instricteur', (req,res) => {
  res.render('loginInstricteur');
}); 

router.get('/dashboardInstricteur', (req,res) => {
  res.render('dashboardinstricteur');
}); 


router.get('/dashboardadmin', (req,res) => {
  res.render('dashboardadmin');
}); 

router.get('/candidats', (req,res) => {
  res.render('./admin/candidat');
}); 

router.get('/vehicules', (req,res) => {
  res.render('./admin/Vehicule');
}); 

router.get('/Instructeurs', (req,res) => {
  res.render('./admin/Instructeur');
}); 

router.get('/Comptabilite', (req,res) => {
  res.render('./admin/comptabilité');
}); 

router.get('/Calendrieradmin', (req,res) => {
  res.render('./admin/calendar');
}); 

router.get('/admin/Calendriercandidat', (req,res) => {
  res.render('./admin/calendriercandidat');
});

router.get('/admin/Calendrierinstructeur', (req,res) => {
  res.render('./admin/calendrierinstructeur');
}); 

router.get('/ResetPassword', (req,res) => {
  res.render('forgotpassword');
}); 

router.get('/Paiement', (req,res) => {
  res.render('./candidat/paiement');
}); 

router.get('/calendrier', (req,res) => {
  res.render('./candidat/calendrier');
}); 

router.get('/profil', (req,res) => {
  res.render('./candidat/profil');
}); 

router.get('/progression', (req,res) => {
  res.render('./candidat/progress');
}); 

router.get('/setting', (req,res) => {
  res.render('./candidat/setting');
}); 

router.get('/calendrierInstricteur', (req,res) => {
  res.render('./instricteur/calendrierinstricteur');
}); 

router.get('/progressionInstricteur', (req,res) => {
  res.render('./instricteur/progressioncandidat');
}); 

module.exports = router ;