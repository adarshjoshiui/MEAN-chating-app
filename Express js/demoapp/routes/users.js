var express = require('express');
var router = express.Router();

var response = [];
let registeredUsers = [
  {
    name: "Adarsh Joshi",
    userName: "ajoshi",
    password: "Welcome@123",
    isOnline: false
  },
  {
    name: "Revathi  Chenna",
    userName: "rChenna",
    password: "Welcome@123",
    isOnline: false
  }
]
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/*POST login user*/
router.post('/login', function (req, res, next) {
  // res.send({msg:'ok'})
  //get all user and compiare with req
  response = [];
  registeredUsers.forEach(user => {
    if (req.body.email === user.userName && req.body.pwd === user.password) {
      user.isOnline = true
      response.push({
        massage: 'Ok',
      })
    }
  });
  res.send(response);
 
});

/*GET all online users */ 
router.get('/getOnlineUsers',(req, res, next)=> {
  response =[];
  let onlineUsersArr = [];
  registeredUsers.forEach(user=>{
    if(user.isOnline ===true) {
      onlineUsersArr.push({
        name:user.name
      })
    }
  })
  response = onlineUsersArr;
  res.send(onlineUsersArr);
})

module.exports = router;
