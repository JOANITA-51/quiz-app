const express = require('express');
// const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = require('./config/db');
const User = require('./models/user');
const routerUser = require('./routes/user');
try {
    dbConnect()
} catch (error) {
    console.log(error)
}

const app = express();
const port = process.env.PORT || 3002;
//middle ware used to intercept our calls
app.use(express.json());

app.get('/', (req,res)=>{ //get(tells the app to pick information) takes in two parameters i.e. the path and the call back ..req is to pick information
    res.send('Hello world!')// respond with this text
});

app.use('/users', routerUser);

app.post('/login', async (req, res) => {
    res.json({'message':'under development'})
});


app.post('/register', async (req,res)=>{
    const {username, password} = req.body
    try {

    //Register logic
     const user = new User({username, password});
    await user.save()
    console.log(req.body)
    if(user !== null){
        res.json({
            'result':'success',
            'message':'Register Successful',
            'user': user
        })
    }
    return res.json({
        'result':'failure',
        'message':'Register failed'
    });
        
    } catch (error) {
        console.log(error)
        return res.json({
            "result":"failure",
            "message":"Maybe the username is already taken",
            "Description":" Register failed"
        })
    }


})

app.delete('/users/:id', (req,res) =>{
    const {id}= req.params
    let ids = id.split(',')
    console.log (typeof ids);
    let str = ' '
    let deletedCount = 0
    ids.forEach(id => {
        deletedCount++;
        str += `${id}`
    });
    
    res.json({
        'result':'success',
        'total_items_deleted': deletedCount,
        'deleted_items':str
    })
})

app.put('/users', (req,res)=>{
    console.log(req.body)
    res.send('Update User')
})

app.patch('/users/:id', (req, res)=>{
    const {id} = req.params;
    
    let user = {
        'id':12,
        'username':'Reyes',
        'gender':'Female',
        'email':'reyes@gmail.com'

    }
    console.log('Old user',user)
    const {username} = req.body;
     if (user.id = id){
        user.username = username;
        res.send(`Updated ${id} to ${username}`)
     } else {
         res.send(`User ${id} not found`)
     }
   
})
app.listen(port, ()=>{
    console.log(`API working on localhost ${port}`)
})

