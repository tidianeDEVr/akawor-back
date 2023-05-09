const express = require('express');
const app = express();
const db = require('./models')
const {user} = require('./models')

app.get('/select', (req, res) => {
    user.findAll().then((users)=>{
        res.send(users)
    })
})

app.get('/insert', (req, res) => {
    user.create({
        userFirstName: "Cheikh Tidiane",
        userLastName: "Ndiaye",
        userEmail: "godex@gmail.com",
        userPassword: "mycomplexxpassword",
        userPhoneNumber: 782141278,
        userBirthday: new Date(), 
    }).catch((err) => {
        if(err) console.log(err);
    })
    res.send('insert')
})

app.delete('/delete', (req, res) => {
    res.send('delete')
})

db.sequelize.sync().then((req)=>{
    app.listen(3001, ()=>{
        console.log('Akawor Back Running : 3001');
    })
})