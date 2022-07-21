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

  async findById(_id: string) {
    let result = "no book exists";
    try {
      const book = await BookModel.findById(_id).select({ __v: false });
      if (!book) return result;
      return book;
    } catch (error) {
      return result;
    }
  }

  async addComment(comment: string, _id: string) {
    if (!comment) return "missing required field comment";
    const result = "no book exists";
    try {
      const book = await BookModel.findByIdAndUpdate(
        _id,
        { $push: { comments: comment } },
        { new: true }
      ).select({ __v: false });
      if (!book) return result;
      return book;
    } catch (error) {
      return result;
    }
  }
}
