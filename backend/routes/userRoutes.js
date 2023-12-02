import express from "express";
const router = express.Router();
import { authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
   deleteUser,
  getUserById,
  updateUser,
  logoutUser, } from "../controllers/userController.js";
  import { protect, admin } from '../middleware/authMiddleware.js';
  
// protect will validate for cookies, it means request is coming from auth user
// admin - will allow only admin users to access this endpoint

router.route( '/').post(registerUser).
      get(getUsers);
router.post('/auth',authUser);
router.
     route('/profile').
     get(getUserProfile).
     put(updateUserProfile);

router.
     route('/:id').
     delete(deleteUser).
     get(getUserById).
     put(updateUser);

     router.post('/logout', logoutUser);

  export default router;
