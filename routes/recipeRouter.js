import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import 'dotenv/config';
import users from '../users.js';
import auth from '../auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

let recipeRouter = express.Router();

let mongoURL = "mongodb+srv://victorchen:zxiOL5793uXvn7Nz@cluster0.cmcjprd.mongodb.net/?retryWrites=true&w=majority";
let client = new MongoClient(mongoURL);
await client.connect();

let db = client.db("FryerFeed");

let posts = db.collection('posts');
//await posts.insertOne({a: 1, b: 1});

function checkLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
}

recipeRouter.get('/login', (req, res) => 
    res.sendFile('client/login.html', { root: __dirname })
);

recipeRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(users.addUser(username, password)) {
        res.redirect('/login');
    } else {
        res.redirect('/register');
    }
});

recipeRouter.get('/register', (req, res) =>
    res.sendFile('client/register.html', { root: __dirname })
);

recipeRouter.post(
    '/login',
    auth.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/login',
    })
);

recipeRouter.get(
    '/private',
    checkLoggedIn,
    (req, res) => {
        res.redirect('index.html');
    }
);

// endpoint to get the posts
recipeRouter.get("/posts", checkLoggedIn ,async (req, res) => {
    const posts = await db.collection("posts").find().toArray();
    console.log(posts);
    posts.sort((a, b) => b.createdAt - a.createdAt);
    res.setHeader("Content-Type", "application/json");
    res.send(posts);
});

// endpoint for new post
recipeRouter.post("/posts", checkLoggedIn, async (req, res) => {
    let inputs =  req.body;
    console.log(inputs);
    await posts.insertOne(inputs);
    res.status(200).send("success");
});

// endpoint for like button clicked
recipeRouter.put('/posts/:postId', async (req, res) => {
    let postId = req.params.postId;
    // let post = req.body;
    await posts.updateOne({ _id: new ObjectId(postId) }, { $inc: { likes: 1} });
    res.send('success');
});

// endpoint for delete button clicked
recipeRouter.delete('/posts/:postId', async (req, res) => {
    let postId = req.params.postId;
    await posts.deleteOne({ _id: new ObjectId(postId) });
    res.send("success");
}); 
  

export default recipeRouter;
