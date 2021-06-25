const router = require("express").Router()

const Book = require('./../models/Book.model')

/* GET home page */
router.get("/", (req, res, next) => res.render("index"))

// Books list
router.get('/libros/listado', (req, res) => {

  Book
    .find()
    .select('title')
    .then(books => res.render('books/books-list', { books }))
    .catch(err => console.log(err))
})


// Book details
router.get('/libros/detalles/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/book-details', book))
    .catch(err => console.log(err))
})






// New book form: render
router.get('/libros/crear', (req, res) => res.render('books/create-book'))

// New book form: manage
router.post('/libros/crear', (req, res) => {

  const { title, author, description, rating } = req.body

  Book
    .create({ title, author, description, rating })
    .then(() => res.redirect('/libros/listado'))
    .catch(err => console.log(err))
})






// Edit book form: render
router.get('/libros/editar', (req, res) => {

  const { book_id } = req.query

  Book
    .findById(book_id)
    .then(theBook => res.render('books/edit-book', theBook))
    .catch(err => console.log(err))
})


// Edit book form: manage
router.post('/libros/editar', (req, res) => {

  const { book_id } = req.query
  const { title, author, description, rating } = req.body

  Book
    .findByIdAndUpdate(book_id, { title, author, description, rating })
    .then(() => res.redirect('/libros/listado'))
    .catch(err => console.log(err))
})

module.exports = router