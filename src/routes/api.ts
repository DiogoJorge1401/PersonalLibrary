/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

import { Application } from "express";
import { BookController } from "../controllers/bookController";

export default function (app: Application) {
  const bookController = new BookController();
  app
    .route("/api/books")
    .get(async (req, res) => {
      const result = await bookController.find();
      return res.json(result);
    })
    .post(async (req, res) => {
      let title = req.body.title;
      const result = await bookController.create({ title });
      return res.json(result);
    })
    .delete(async (req, res) => {
      const result = await bookController.delete()
      return res.json(result)
    });

  app
    .route("/api/books/:id")
    .get(async (req, res) => {
      let bookId = req.params.id;
      const result = await bookController.findById(bookId);
      return res.json(result);
    })
    .post(async (req, res) => {
      let bookId = req.params.id;
      let comment = req.body.comment;
      const result = await bookController.addComment(comment, bookId);
      return res.json(result);
    })
    .delete(async (req, res) => {
      let bookId = req.params.id;
      const result = await bookController.deleteById(bookId);
      return res.json(result);
    });
}
