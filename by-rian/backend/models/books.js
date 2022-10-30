const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// membuat schema

const Book = mongoose.model("Book", {
  namaBuku: {
    type: String,
    required: true,
  },
  penerbit: {
    type: String,
    required: true,
  },
  pengarang: {
    type: String,
    required: true,
  },
});

module.exports = { Book, ObjectId };
