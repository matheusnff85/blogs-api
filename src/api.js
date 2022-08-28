const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const validateToken = require('./middlewares/validateToken');
// ...

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);
app.post('/user', userController.createUser);
app.get('/user', validateToken, userController.getAllUsers);
app.get('/user/:id', validateToken, userController.getOneUser);

app.post('/categories', validateToken, categoryController.createCategory);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
