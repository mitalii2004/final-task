var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const upload = require('../middleware/upload')


router.post('/signUp',upload.single('profilePic'), controllers.userController.signUp)
router.post('/login', controllers.userController.login)
router.get("/mail", controllers.sendMail.sendMail);

module.exports = router;