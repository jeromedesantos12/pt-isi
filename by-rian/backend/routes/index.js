const bookRoutes = require("express").Router();
const {
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
} = require("../controller/booksController");
const { verifyToken, verifyRole2 } = require("../middleware/auth");
// const rateLimit = require('express-rate-limit')
// const limiter = rateLimit({
//     windowMs: 5 * 60000, // 5 minutes, 60000 = 1 minutes
//     max: 5 * 2, // 5x hit
//     message: 'too many request, wait a second!!!'
// });

// bookRoutes.use(limiter)

bookRoutes.get("/books", verifyToken, getAllBooks);
bookRoutes.get("/books/id/:id", verifyToken, verifyRole2, getBookById);
bookRoutes.post("/books/tambah", verifyToken, verifyRole2, addBooks);
bookRoutes.put("/books/ubah/:id", verifyToken, verifyRole2, updateBook);
bookRoutes.delete("/books/hapus/:id", verifyToken, verifyRole2, deleteBook);
bookRoutes.get("/books/search", verifyToken, searchBook);
// bookRoutes.get("/books/:id-:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
// bookRoutes.get("/books/:id.:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
bookRoutes.use("/", reqError);

module.exports = bookRoutes;
