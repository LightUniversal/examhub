import express from 'express';
import { registerUser, loginUser, addRemoveFriend, getUserProfile, getUserFriends, logUserOut, getUser, getUsers } from '../Controllers/userController.js';
import { shield, Admin } from "../middlewares/verify.js"

const router = express.Router();

// Register User
router.route("/").get((req, res) => {
    res.send({
        message:"Running perfectly..."
    })
})
router.route("/userId").get(getUser);
router.route("/").post(registerUser);
router.route("/").get(getUsers)
router.post('/login', loginUser);
router.post('/logout',  logUserOut);
router.route('/').put( addRemoveFriend);
// router.route('/').put(shield, getUserProfile);
router.route('/profile/:id').get(shield, getUser);

export default router;