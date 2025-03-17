const express = require('express');
const { getUsers, createUser, loginUser,getTotalUsers,getUserDetailsById,updateUser } = require('../controller/userController');
const upload = require('../middleI/multer'); // Import multer

const router = express.Router();

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/getTotalUsers', getTotalUsers);
router.get('/getbyIDusers/:id', getUserDetailsById);
router.put('/updateuser/:userId', upload.single('profilePic'), updateUser);

module.exports = router;
