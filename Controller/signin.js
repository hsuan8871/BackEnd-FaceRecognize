const handleSignin = (req, res, db, bcrypt)=>{
/*
  bcrypt.compare("apple", '$2a$10$l1.lvq2Z6MsWofG4L0Sm0uneSlwjH53VDiDpQdVEu3KfW0E32IrKm', function(err, res) {
       //console.log('first guess',res)
  });
  bcrypt.compare("veggies", '$2a$10$l1.lvq2Z6MsWofG4L0Sm0uneSlwjH53VDiDpQdVEu3KfW0E32IrKm', function(err, res) {
       //console.log('second guess',res)
  });*/

  db.select('email','hash').from('login')
    .where ('email','=', req.body.email)
    .then(data =>{
      const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
      if (isValid){
        return db.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user =>{
          res.json(user[0])
        })
        .catch(err => res.status(400).json('Unable to get user'))
      }else{
        res.status(400).json('Wrong credentials')
      }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}



      module.exports = {
        handleSignin: handleSignin
      };
