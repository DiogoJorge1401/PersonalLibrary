/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

import { Application } from "express";
import { BookController } from '../controllers/bookController';

export default function (app: Application) {
  const bookController = new BookController()
  app
    .route("/api/books")
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    .post(async (req, res) => {
      let title = req.body.title;
      const result = await bookController.create({title})
      return res.json(result)
    })
    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    .delete(async (req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
}
