const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const validateToken = require('./middlewares/validateToken');
// ...

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);
app.post('/user', userController.createUser);
app.get('/user', validateToken, userController.getAllUsers);
app.get('/user/:id', validateToken, userController.getOneUser);

app.post('/categories', validateToken, categoryController.createCategory);
app.get('/categories', validateToken, categoryController.getAll);

app.post('/post', validateToken, postController.createBlogPost);
app.get('/post', validateToken, postController.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
