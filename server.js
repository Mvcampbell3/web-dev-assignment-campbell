const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(PORT, () => console.log(`server is live on http://localhost:${PORT}`))