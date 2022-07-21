import { BookModel, IBook } from "../models/book";

export class BookController {
  async create(bookData: Pick<IBook, "title">) {
    if (!bookData.title) return "missing required field title";
    const book = await BookModel.create(bookData);
    return { _id: book._id, title: book.title };
  }
}
