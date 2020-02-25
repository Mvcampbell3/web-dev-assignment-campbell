const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(PORT, () => console.log(`server is live on http://localhost:${PORT}`))