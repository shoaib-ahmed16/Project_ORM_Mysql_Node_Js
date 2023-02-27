const mysql =require('mysql');

// Connection details of my sql
const pool =mysql.createPool({
connectionLimit :100,
host            :process.env.DB_HOST,
user             :process.env.DB_User_Name,
password         :process.env.DB_password,
database         :process.env.DB_Name,
port             :process.env.DB_port

})
// View All Users
const viewAll =(req,res)=>{
 pool.getConnection((err,connection) =>{
  if(err) throw err;
  //user the connection 
  connection.query('SELECT * FROM users where status ="active"',(err,rows)=>{
   // when done with the connection, release it 
   connection.release();
   if(!err)
   {
    res.render('home',{rows});
   }else
   {
    res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
};

// Find/Search user
 const find =(req,res)=>{
 pool.getConnection((err,connection) =>{
  if(err) throw err;
   let searchItem =req.body.search;
   // console.log(searchItem);
  //user the connection 
  connection.query('SELECT * FROM users WHERE First_Name LIKE ? OR Last_Name LIKE ?',['%'+searchItem+'%','%'+searchItem+'%'],(err,rows)=>{
   // when done with the connection, release it 
   connection.release();
   if(!err)
   {
    res.render('home',{rows});
   }else
   {
   res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

const addUser_Form=(req,res)=>{
 pool.getConnection((err,connection) =>{
  if(err) throw err;
   // let form ={
   //  First_Name: req.body.First_Name,
   //  Last_Name: req.body.Last_Name,
   //  email: req.body.email,
   //  phone: req.body.phone,
   //  comments: req.body.comments
   //  // status: 'active'
   // };
   const {First_Name,Last_Name,email,phone,comments} =req.body;
  // connection.query('INSERT INTO users(First_Name,Last_Name,email,phone,comments) values(?,?,?,?,?)',[form.First_Name,form.Last_Name,form.email,form.phone,form.comments],(err,rows)=>{
   connection.query('INSERT INTO users SET First_Name =?,Last_Name =?,email=?,phone=?,comments=?',[First_Name,Last_Name,email,phone,comments],(err,rows)=>{
   // when done with the connection, release it 
   connection.release();
   if(!err)
   {
    res.render('add-user',{alert: "Hurry !User added successfully."});
   }else
   {
    res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

const formPage =(req,res)=>{
  res.render('add-user');
}

// EDIT USER PAGE 
const edit =(req,res)=>{
 pool.getConnection((err,connection) =>{
  if(err) throw err;
  //user the connection 
  connection.query('SELECT * FROM users where id =?',[req.params.id],(err,rows)=>{
   // when done with the connection, release it 
   connection.release();
   if(!err)
   {
     res.render('user-edit',{rows});
   }else
   {
    res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

// Update User Details
const updateUserDetails =(req,res)=>{
pool.getConnection((err,connection) =>{
  if(err) throw err;
   console.log('Connected as ID'+connection.threadId);
   
   const {First_Name,Last_Name,email,phone,comments} =req.body;
   connection.query('UPDATE users SET First_Name =?,Last_Name =?,email=?,phone=?,comments=? where id =?',[First_Name,Last_Name,email,phone,comments,req.params.id],(err,rows)=>{
   // when done with the connection, release it 
   connection.release();
   if(!err)
   {
    pool.getConnection((err,connection) =>{
     if(err) throw err;
      //user the connection 
      connection.query('SELECT * FROM users where id =?',[req.params.id],(err,rows)=>{
       // when done with the connection, release it 
      connection.release();
      if(!err)
      {
       res.render('user-edit',{rows,alert:`Hurray ! ${First_Name} ${Last_Name} details updated Successfully...`});
      }else
      {
       res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
      }
     })
    })
   }else
   {
    res.render('user-edit',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

//Delete record of user
const deleteUserRecord =(req,res)=>{
 // Delete permanent record of User.

 // pool.getConnection((err,connection) =>{
 //  if(err) throw err;
 //  connection.query('DELETE FROM users where id =?',[req.params.id],(err,rows)=>{
 //   connection.release();
 //   if(!err)
 //   {
 //    // res.render('home');
 //     res.redirect('/');
 //   }else
 //   {
 //    res.render('home',{alert:`Unkown server error ! Sorry request not completed.`});
 //   }
 //  })
 // })

 // Not deleting instead we hide the User details to display on the screen.
 pool.getConnection((err,connection) =>{
  if(err) throw err;
  connection.query('UPDATE users SET status =? where id =?',['remove',req.params.id],(err,rows)=>{
   connection.release();
   if(!err)
   {
    // res.render('home');
     res.redirect('/');
   }else
   {
    res.render('home',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

const viewUser =(req,res)=>{
  // res.render('view-user');
pool.getConnection((err,connection) =>{
  if(err) throw err;
  connection.query('SELECT * FROM users WHERE id =?',[req.params.id],(err,rows)=>{
   connection.release();
   if(!err)
   {
    res.render('view-user',{rows});
   }else
   {
    res.render('view-user',{alert:`Unkown server error ! Sorry request not completed.`});
   }
  })
 })
}

module.exports ={viewAll,find,addUser_Form,formPage,edit,updateUserDetails,deleteUserRecord,viewUser};
