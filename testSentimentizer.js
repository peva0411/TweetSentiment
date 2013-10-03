// var assert = require('assert');
// var Sentimentizer = require('./sentimentizer').Sentimentizer;

// var words = {
// 	'great':4,
// 	'bad':-3,
// 	'super':5,
// 	'negative':-1,
// 	'foo':5
// };

// var tweetMessage = "Great bad super negative bar";

// var sent = new Sentimentizer(words, tweetMessage);

// var positiveWords = sent.getPositiveWords();

// var negativeWords = sent.getNegativeWords();

// var sentiment = sent.getSentiment();

// describe('Sentimentizer', function(){
// 	describe("getPositiveWords()", function(){
// 		it('should return great, super, if passed the test string', function(){
// 			var positiveWords = sent.getPositiveWords();

// 			positiveWords.indexOf(0).should.equal('great');
// 		})
// 	})
// })

var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})