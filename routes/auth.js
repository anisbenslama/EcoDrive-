const express = require ("express"); 
const router = express.Router(); 
const authController = require('../Controllers/auth');
router.post('/registre', authController.registre)


module.exports = router ; 