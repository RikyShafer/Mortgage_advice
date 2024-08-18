const express = require("express")
const router = express.Router()
const {signup,login,deleteUser,getAllUsers,updateUser,getUserByName} = require("../controllers/user.controller");

router.post('/signup', signup);
router.post('/login', login);
router.delete('/:userId', deleteUser);
router.get('/', getAllUsers);
router.put('/:userId', updateUser);
router.get('/:name', getUserByName);

module.exports = router