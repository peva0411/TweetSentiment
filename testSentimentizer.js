var assert = require('assert');
var Sentimentizer = require('./sentimentizer').Sentimentizer;

var words = {
	'great':4,
	'bad':-3,
	'super':5,
	'negative':-1,
	'foo':5
};



var tweetMessage = "Great bad super negative bar";

var sent = new Sentimentizer(words);

describe('Sentimentizer', function(){
	describe("getPositiveWords()", function(){
		it('should return great, super, if passed the test string', function(){
			var positiveWords = sent.getPositiveWords('Great bad super negative bar');

			assert.equal(4, positiveWords[0].score);
		})
	})

	describe("getSentiment()", function(){
		it('should return 5 when passed: Great bad super negative bar', function(){
			var sentiment = sent.getSentiment('Great bad super negative bar');

			assert.equal(5, sentiment);
		})
	})

	describe("getSentiment()", function(){
		it('should return 5 when passed: EJ Manuel injury: Doug Marrone not upset about Manuel staying inbounds: In case you somehow missed it... http://t.co/O34XdzU7Ke #BILLS #NFL', function(){
			var words = {'upset':-2, 'injury':-2, 'missed':-2};
			var sent = new Sentimentizer(words);
			var sentiment = sent.getSentiment('EJ Manuel Injury: Doug Marrone not Upset about Manuel staying inbounds: In case you somehow missed it... http://t.co/O34XdzU7Ke #BILLS #NFL');
			assert.equal(-6, sentiment);
		})
	})

	describe("getSentiment()", function(){
		it("should return 7 when passed: RT @thurmanthomas: Very classy young man..RT @underwaterandy: @buffalobills @thurmanthomas I wish Drew Brees wasn't so damn classy.", function(){
		var words = {'classy':3, 'wish':1};
		var sent = new Sentimentizer(words);
		var sentiment = sent.getSentiment('RT @thurmanthomas: Very classy young man..RT @underwaterandy: @buffalobills @thurmanthomas I wish Drew Brees wasn\'t so damn classy.');
		assert.equal(7, sentiment);
		})
	})

})


