const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let books = [];
let nextId = 1;
app.get("/", (req, res)=>{
    res.render('index')
})

app.get('/books', (req, res) => {
  res.send(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(book => book.id == req.params.id);
    res.render("edit", {book});
  });

app.post('/books', (req, res) => {
  const book = { id: nextId++, ...req.body };
  books.push(book);
  res.send(book);
});

app.put('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id == req.params.id);
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.send(books[index]);
  } else {
    res.status(404).send({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id == req.params.id);
  if (index >= 0) {
    books.splice(index, 1);
    res.send({ message: 'Book deleted' });
  } else {
    res.status(404).send({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
