const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Get all books
app.get('/api/books', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

// Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, isbn, publication_year, genre } = req.body;
  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'Title, author, and ISBN are required' });
  }
  try {
    const newBook = await prisma.book.create({
      data: { title, author, isbn, publication_year, genre }
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book', details: err.message });
  }
});

// Get a single book
app.get('/api/books/:id', async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
    const { title, author, isbn, publication_year, genre } = req.body;
    console.log('Received update request:', req.body);
  
    try {
      const updated = await prisma.book.update({
        where: { id: parseInt(req.params.id) },
        data: { title, author, isbn, publication_year, genre }
      });
      res.json(updated);
    } catch (err) {
      console.error('Error during update:', err);
      res.status(404).json({ error: 'Book not found or update failed' });
    }
  });
  

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
