const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controller/register');
const signin = require('./Controller/signin');
const id = require('./Controller/id');
const image = require('./Controller/image');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kankichiryotsu',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data =>{
  //console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send(database.users);
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req,res) => {id.handleid(req,res,db,bcrypt)})

app.put('/image',(req,res) => {image.handleimage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res,db)})



// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});



app.listen(3000,()=>{
  console.log('app is running on port 3000');
})


/*
  / --> res = this is working!
  /signin --> POST = success/fail
  /register --? POST = user
  /profile/:userID --> GET = user
  /image --> PUT --> user

*/
