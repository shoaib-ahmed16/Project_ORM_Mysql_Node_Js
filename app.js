const express =require('express');
const exphbs =require('express-handlebars');
const bodyParser =require('body-parser');
const mysql=require('mysql');
require('dotenv').config(); 
const app =express();
const port =process.env.PORT||4000;
//Parsing middleware   
//Parse application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({extended:false})); 
//  Parse application/Json
app.use(bodyParser.json()); 
 // Static files 
app.use(express.static('public')); 
// Templating Engine
app.engine('hbs',exphbs.engine({extname: '.hbs' }));
app.set('view engine','hbs');
//Connection pool
const pool =mysql.createPool({
connectionLimit :100,
host            :process.env.DB_HOST,
user             :process.env.DB_User_Name,
password         :process.env.DB_password,
database         :process.env.DB_Name,
port             :process.env.DB_port

})

// Connect to DB
pool.getConnection((err,connection)=>
{
 if(err) throw err; 
/* {
 Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
Solution : -->
   1. npm install mysql2; you will not get any error ;
   2. run this  2 queries in mysql cmd
      ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
      flush privileges;
  Reason of error : --> This is because caching_sha2_password is introduced in MySQL 8.0, but the Node.js version is not implemented yet.
 }
 */
 console.log('Connected as ID'+connection.threadId);
})
const route =require('./server/routes/user');
app.use('/',route);
app.listen(port,()=>{
 console.log(`Listening on port: ${port}`)
})

