/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

const Reply = require("../models/Reply");
const Thread = require("../models/Thread");

chai.use(chaiHttp);

function checkThreadProps(threads) {
  assert.isArray(threads);
  assert.isAtMost(threads.length, 10);
  for (let thread of threads) {
    assert.property(thread, "_id");
    assert.property(thread, "created_on");
    assert.property(thread, "bumped_on");
    assert.property(thread, "replies");
    assert.property(thread, "text");
    assert.property(thread, "board");
    assert.notProperty(thread, "reported");
    assert.notProperty(thread, "delete_password");
    assert.isArray(thread.replies);
    for (let replies of thread.replies) {
      assert.property(replies, "_id");
      assert.property(replies, "created_on");
      assert.property(replies, "bumped_on");
      assert.property(replies, "text");
      assert.notProperty(replies, "reported");
      assert.notProperty(replies, "delete_password");
    }
  }
}

function checkReplyProps(thread) {
  assert.isObject(thread);
  assert.property(thread, "_id");
  assert.property(thread, "created_on");
  assert.property(thread, "bumped_on");
  assert.property(thread, "replies");
  assert.property(thread, "text");
  assert.property(thread, "board");
  assert.notProperty(thread, "reported");
  assert.notProperty(thread, "delete_password");
  assert.isArray(thread.replies);
  for (let replies of thread.replies) {
    assert.property(replies, "_id");
    assert.property(replies, "created_on");
    assert.property(replies, "bumped_on");
    assert.property(replies, "text");
    assert.notProperty(replies, "reported");
    assert.notProperty(replies, "delete_password");
  }
}

let testThreadId = "";
let testThreadPassword = "test";

let threadIdForReplies = "5e2e08dfa0798e046576cfa8";
let testReplyId = "";
let testReplyPassword = "reply";

suite("Functional Tests", function() {
  suite("API ROUTING FOR /api/threads/:board", function() {
    suite("POST", function() {
      test("All Fields Entered", function(done) {
        chai
          .request(server)
          .post("/api/threads/test")
          .send({
            text: "test1",
            delete_password: testThreadPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });

      test("Not All Fields Entered", function(done) {
        chai
          .request(server)
          .post("/api/threads/test")
          .send({
            text: "test2"
          })
          .end(function(err, res) {
            assert.equal(res.status, 500);
            done();
          });
      });
    });

    suite("GET", function() {
      test("Get All Threads", function(done) {
        chai
          .request(server)
          .get("/api/threads/test")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            checkThreadProps(res.body);
            testThreadId = res.body[0]._id;
            done();
          });
      });
    });

    suite("PUT", function() {
      test("Report thread, incorrect id", function(done) {
        chai
          .request(server)
          .put("/api/threads/test")
          .send({
            thread_id: "testThreadId"
          })
          .end(function(err, res) {
            assert.equal(res.text, "Failed to Report Thread");
            done();
          });
      });

      test("Report thread, correct id", function(done) {
        chai
          .request(server)
          .put("/api/threads/test")
          .send({
            thread_id: testThreadId
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Successfully Reported Thread");
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("Delete Thread, wrong password", function(done) {
        chai
          .request(server)
          .delete("/api/threads/test")
          .send({
            thread_id: testThreadId,
            delete_password: "incorrectPassword"
          })
          .end(function(err, res) {
            assert.equal(res.text, "Incorrect Password");
            done();
          });
      });

      test("Delete Thread, correct password", function(done) {
        chai
          .request(server)
          .delete("/api/threads/test")
          .send({
            thread_id: testThreadId,
            delete_password: testThreadPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Successfully Deleted Thread");
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/replies/:board", function() {
    suite("POST", function() {
      test("Post Reply, all fields entered", function(done) {
        chai
          .request(server)
          .post("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            text: "reply1",
            delete_password: testReplyPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });

      test("Post Reply, not all fields entered", function(done) {
        chai
          .request(server)
          .post("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            text: "reply2"
          })
          .end(function(err, res) {
            assert.equal(res.status, 500);
            done();
          });
      });
    });

    suite("GET", function() {
      test("Get All Replies for Single Thread", function(done) {
        chai
          .request(server)
          .get("/api/replies/test")
          .query({ thread_id: threadIdForReplies })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            checkReplyProps(res.body);
            testReplyId = res.body.replies[0]._id;
            done();
          });
      });
    });

    suite("PUT", function() {
      test("Report Reply, incorrect id", function(done) {
        chai
          .request(server)
          .put("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            reply_id: "incorrectId"
          })
          .end(function(err, res) {
            assert.equal(res.text, "Failed to Report Reply");
            done();
          });
      });

      test("Report Reply, correct id", function(done) {
        chai
          .request(server)
          .put("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            reply_id: testReplyId
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Successfully Reported Reply");
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("Delete Reply, incorrect password", function(done) {
        chai
          .request(server)
          .delete("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            reply_id: testReplyId,
            delete_password: "incorrectPassword"
          })
          .end(function(err, res) {
            assert.equal(res.text, "Incorrect Password");
            done();
          });
      });

      test("Delete Reply, correct password", function(done) {
        chai
          .request(server)
          .delete("/api/replies/test")
          .send({
            thread_id: threadIdForReplies,
            reply_id: testReplyId,
            delete_password: testReplyPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Successfully Deleted Reply");
            done();
          });
      });
    });
  });
});
