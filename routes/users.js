var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const upload = require('../middleware/upload')
const  verifyToken  = require('../middleware/verifyToken');


router.post('/signUp',upload.single('profilePic'), controllers.userController.signUp)
router.post('/login', controllers.userController.login)
router.post('/logout', verifyToken.verifyToken, controllers.userController.logout)
router.get("/mail", controllers.sendMail.sendMail);

module.exports = router;