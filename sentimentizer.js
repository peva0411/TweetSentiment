function Sentimentizer(wordRanks){
	"use strict";

	var wordRanks = wordRanks;

	var positiveSelector = function(score){
		return score > 0;
	}

	var negativeSelector = function(score){
		return score < 0;
	}

	this.getPositiveWords = function(tweet){
		"use strict";
		 return getWords(tweet, positiveSelector);
	}

	this.getNegativeWords = function(tweet){
		"use strict";

		return getWords(tweet, negativeSelector);
	}

	function cleanWord(word){
		return word.replace(/\W/g,'').toLowerCase();
	}

	function splitTweet(tweet){
		return tweet.split(' ');
	}

	var getWords = function(tweet, selector){
		"use strict";
		 var selectedWords = [];
		 var words = splitTweet(tweet);

		 words.forEach(function(word){
		 	var cleanedWord = cleanWord(word);
		 	if (wordRanks[cleanedWord]){
		 		if (selector(wordRanks[cleanedWord])){
		 			var wordRank = {};
		 			wordRank[cleanedWord] = wordRanks[cleanedWord];
		 			selectedWords.push(wordRank);
		 		}
		 	}
		 });
		 
		 return selectedWords;
	}

	this.getSentiment = function(tweet){
		"use strict";

		var words = tweet.split(' ');
		var sentiment = 0;
		words.forEach(function(word){
			
			var cleanedWord = word.replace(/\W/g,'').toLowerCase();
			if (wordRanks[cleanedWord]){
					sentiment += wordRanks[cleanedWord];
			}
		});
		return sentiment;
	}
}

module.exports.Sentimentizer = Sentimentizer;