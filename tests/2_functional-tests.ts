/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

import chaiHttp from "chai-http";
import chai from "chai";
const assert = chai.assert;
import server from "../src/server";
import { suite, test } from "mocha";

chai.use(chaiHttp);

let id1 = "";

suite("Functional Tests", () => {
  suite("Routing tests", () => {
    suite(
      "POST /api/books with title => create book object/expect book object",
      () => {
        test("Test POST /api/books with title", (done) => {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "book_title" })
            .then((res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, "book_title");
              assert.isOk(res.body._id);
              id1 = res.body._id;
              done();
            });
        });

        test("Test POST /api/books with no title given", (done) => {
          chai
            .request(server)
            .post("/api/books")
            .send({})
            .then((res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", () => {
      test("Test GET /api/books", (done) => {
        chai
          .request(server)
          .get("/api/books")
          .then((res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "commentcount");
            assert.property(res.body[0], "title");
            assert.property(res.body[0], "_id");
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", () => {
      test("Test GET /api/books/[id] with id not in db", (done) => {
        chai
          .request(server)
          .get("/api/books/62d94af87ecc0c5a670100a5")
          .then((res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", (done) => {
        chai
          .request(server)
          .get(`/api/books/${id1}`)
          .then((res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, "_id");
            assert.property(res.body, "title");
            assert.property(res.body, "comments");
            assert.isArray(res.body.comments);
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      () => {
        test("Test POST /api/books/[id] with comment", (done) => {
          chai
            .request(server)
            .post(`/api/books/${id1}`)
            .send({ comment: "best book" })
            .then((res) => {
              assert.equal(res.status, 200);
              assert.property(res.body, "_id");
              assert.property(res.body, "title");
              assert.property(res.body, "comments");
              assert.isArray(res.body.comments);
              assert.include(res.body.comments, "best book");
              done()
            });
        });

        test("Test POST /api/books/[id] without comment field", (done) => {
           chai
             .request(server)
             .post(`/api/books/${id1}`)
             .send({})
             .then((res) => {
               assert.equal(res.status, 200);
               assert.equal(res.body, "missing required field comment");
               done();
             });
        });

        test("Test POST /api/books/[id] with comment, id not in db", (done) => {
             chai
               .request(server)
               .post("/api/books/62d94af87ecc0c5a670100a5")
               .send({ comment: "best book" })
               .then((res) => {
                 assert.equal(res.status, 200);
                 assert.equal(res.body, "no book exists");
                 done();
               });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", () => {
      test("Test DELETE /api/books/[id] with valid id in db", (done) => {
        //done();
      });

      test("Test DELETE /api/books/[id] with  id not in db", (done) => {
        //done();
      });
    });
  });
});
