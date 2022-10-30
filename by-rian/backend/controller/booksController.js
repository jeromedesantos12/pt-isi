const { Book, ObjectId } = require("../models/books");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // res.setHeader("authrization", req.token);
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const searchBook = async (req, res) => {
  try {
    if (!req.query.namaBuku) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await Book.find({
      namaBuku: { $regex: req.query.namaBuku, $options: "i" },
    });
    // if (result.length === 0) {
    //   throw new Error("nama buku tidak ada");
    // }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    res.status(200).json({
      book,
      message: "buku ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      // message: err.message,
      message: "id not found",
    });
  }
};

const addBooks = async (req, res) => {
  const books = new Book({
    namaBuku: req.body.namaBuku,
    penerbit: req.body.penerbit,
    pengarang: req.body.pengarang,
  });
  try {
    const duplikat = await Book.findOne({ namaBuku: books.namaBuku });
    if (duplikat) {
      throw new Error("nama buku sudah ada");
    }
    const addBook = await books.save();
    res.status(201).json({ addBook, message: "berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    // console.log(req.params);
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    const duplikat = await Book.findOne({ namaBuku: req.body.namaBuku });
    // console.log(duplikat.namaBuku);
    console.log({
      book: book.namaBuku,
      body: req.body.namaBuku,
      duplikat,
    });
    if (book.namaBuku !== req.body.namaBuku && duplikat) {
      throw new Error("nama buku sudah ada");
    }
    // const { id } = req.params;
    // console.log(id);
    const bookUpdated = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          namaBuku: req.body.namaBuku,
          penerbit: req.body.penerbit,
          pengarang: req.body.pengarang,
        },
      }
    );
    res
      .status(200)
      .json({ bookUpdated, message: "Data Buku Berhasil Di Ubah" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const updateBook = async (req, res) => {
//   try{
//     const bookUpdated = await Book.findByIdAndUpdate(req.params.id, {
//       namaBuku: req.body.namaBuku,
//       penerbit: req.body.penerbit,
//       pengarang: req.body.pengarang
//     })
//     //   {_id: req.params.id},
//     //   {$set: {
//     //       namaBuku: req.body.namaBuku,
//     //       penerbit: req.body.penerbit,
//     //       pengarang: req.body.pengarang,
//     //     }
//     //   }
//     // )
//     res.status(200).json(bookUpdated)
//   }catch(err){
//     res.status(400).json({message: err.message})
//   }
// }

const deleteBook = async (req, res) => {
  try {
    const delBook = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(delBook);
  } catch (err) {
    // res.status(404).json({message: err.message})
    res.status(404).json({ message: "id not found" });
  }
};

const reqError = (req, res) => {
  res
    .status(400)
    .json({ status: 400, message: "cannot request with this end point" });
};

// const apiBook = (req, res) => {
//     res.json(books);
// }

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
};
