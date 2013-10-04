function Sentimentizer(wordRanks){
	"use strict";

	var wordRanks = wordRanks;

	this.getPositiveWords = function(tweet){
		"use strict";
		 var positiveWords = [];
		 var words = tweet.split(' ');
		 words.forEach(function(word){
		 	var cleanedWord =  word.replace(/\W/g,'').toLowerCase();
		 	if (wordRanks[cleanedWord]){
		 		if (wordRanks[cleanedWord] > 0){
		 			var positiveWordRank = {};
		 			positiveWordRank[cleanedWord] = wordRanks[cleanedWord];
		 			positiveWords.push(positiveWordRank);
		 		}
		 	}
		 });
		 return positiveWords;
	}

	this.getNegativeWords = function(tweet){
		"use strict";

		var negativeWords = [];
		var words = tweet.split(' ');

		words.forEach(function(word){
			var cleanedWord = word.replace(/\W/g,'').toLowerCase();
			if (wordRanks[cleanedWord]){
				if (wordRanks[cleanedWord] < 0){
					var negativeWordRank = {};
				    negativeWordRank[cleanedWord] = wordRanks[cleanedWord];
				    negativeWords.push(negativeWordRank);
				}
			}
		});
		return negativeWords;
	}

	this.getSentiment = function(tweet){
		"use strict";

		var negativeWords = [];
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