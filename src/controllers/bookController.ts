import { BookModel, IBook } from "../models/book";

export class BookController {
  async create(bookData: Pick<IBook, "title">) {
    if (!bookData.title) return "missing required field title";
    const book = await BookModel.create(bookData);
    return { _id: book._id, title: book.title };
  }
  async find() {
    const result = await BookModel.find().select({
      comments: false,
      __v: false,
    });

    return result.map(({ _id, title, commentcount }) => ({
      _id,
      title,
      commentcount,
    }));
  }
}
