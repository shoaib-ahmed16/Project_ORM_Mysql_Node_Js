const express =require('express');
const router =express.Router();
// const {view} =require('../controllers/user.controller');
const user_controller =require('../controllers/user.controller');

// go to user managment home page
router.get('/',user_controller.viewAll);
// TO search the User from nav bar
router.post('/',user_controller.find);
// Go to AddNew User page
router.get('/addUser',user_controller.formPage);
// AddNew User to User managment
router.post('/addUser',user_controller.addUser_Form);
// Go to update user page.
router.get('/editUser/:id',user_controller.edit);
// Update the user details
router.post('/editUser/:id',user_controller.updateUserDetails);
// Delete User record
router.get('/:id',user_controller.deleteUserRecord);
// router.get('/',user_controller);
router.get('/viewUser/:id',user_controller.viewUser)
module.exports=router;