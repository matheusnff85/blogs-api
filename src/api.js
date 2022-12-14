const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const validateToken = require('./middlewares/validateToken');
// ...

const app = express();

app.use(express.json());

app.get('/post/search', validateToken, postController.getByQuery);
app.post('/login', userController.userLogin);
app.post('/user', userController.createUser);
app.get('/user', validateToken, userController.getAllUsers);
app.get('/user/:id', validateToken, userController.getOneUser);
app.delete('/user/me', validateToken, userController.deleteUser);

app.post('/categories', validateToken, categoryController.createCategory);
app.get('/categories', validateToken, categoryController.getAll);

app.post('/post', validateToken, postController.createBlogPost);
app.get('/post', validateToken, postController.getAll);
app.get('/post/:id', validateToken, postController.getOne);
app.put('/post/:id', validateToken, postController.updatePost);
app.delete('/post/:id', validateToken, postController.deletePost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
