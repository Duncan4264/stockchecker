const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("5 function get request tests", function() {
        test("Viewing one stock: GET request to /api/stock-prices/", function(done) { 
            chai
            .request(server)
            .get('/api/stock-prices/')
            .query({stock: "GOOG"})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "GOOG");
                assert.exists(res.body.stockData.price, "GOOG has a price");
                done();
            });
        });
        test("Viewing one stock and liking it, GET REQUEST to /api/stock-prices", function (done) {
            chai
            .request(server)
            .get('/api/stock-prices/')
            .query({stock: "TSLA", like: true})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "TSLA");
                assert.exists(res.body.stockData.price, "TSLA has a price");
                assert.exists(res.body.stockData.likes, "TSLA Likes: " + res.body.stockData.likes);
                done();
            });
        });
        test("Viewing one stock and liking it again, GET REQUEST to /api/stock-prices", function (done) {
            chai
            .request(server)
            .get('/api/stock-prices/')
            .query({stock: "TSLA", like: true})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "TSLA");
                assert.exists(res.body.stockData.likes, "TSLA Likes: " + res.body.stockData.likes);
                done();
            });
        });
        test("Viewing two stocks with a git request to /api/stock-prices/", function (done) {
            chai
            .request(server)
            .get('/api/stock-prices/')
            .set("content-type", "application/json")
            .query({ stock: ['TSLA', 'GOOG'] })
            .end(function (err, res) {
                console.log("1")
                console.log(res.body.stockData);
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, "TSLA");
                assert.equal(res.body.stockData[1].stock, "GOOG");
                assert.exists(res.body.stockData[0].stock, "TSLA has a price");
                assert.exists(res.body.stockData[1].stock, "GOOG has a price");
                done();
                });
             });
        test("Viewing two stocks and liking them, GET REQUEST to /api/stock-prices/", function (done) {
            chai.
            request(server)
            .get('/api/stock-prices/')
            .set("content-type", "application/json")
            .query({ stock: ['TSLA', 'GOOG'], like: true})
            .end(function (err, res) {

                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, "TSLA");
                assert.equal(res.body.stockData[1].stock, "GOOG");
                assert.exists(res.body.stockData[0].price, "TSLA has a price");
                assert.exists(res.body.stockData[1].price, "GOOG has a price");
                assert.exists(res.body.stockData[0].rel_likes, "GOOG has a rel_likes" + res.body.stockData[0].rel_likes);
                assert.exists(res.body.stockData[1].rel_likes, "TSLA has a rel_likes: " + res.body.stockData[1].rel_likes);
                done();
                });
                }).timeout(10000);     
    })
});
