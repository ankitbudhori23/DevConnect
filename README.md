const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// require('dotenv').config();
const app = express();
const App = require('./client/src/App');
// Connect to Database
connectDB();
const router = express.Router()

// Initialize Middleware
app.use(express.json({ strict: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve Static assets in production

// if (process.env.NODE_ENV === 'production') {

  app.get('*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
      // <StaticRouter location={req.url} context={context}>
        <App />
      // </StaticRouter>
    );

    const indexFile = path.resolve('./client/build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });

  });

  router.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
  )

  app.use(router)

app.use(express.static('./client/build'))

// }

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
