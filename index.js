const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));

app.use(express.json());

let books = [];
let id = 1;

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Titre et auteur requis' });
  const book = { id: id++, title, author };
  books.push(book);
  res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});


app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Livre non trouvé' });
  books.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:3000`);
});