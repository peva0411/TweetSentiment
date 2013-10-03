function Sentimentizer(wordRanks, tweet){
	"use strict";

	var wordRanks = wordRanks;
	var tweet = tweet;

	this.getPositiveWords = function(){
		"use strict";
		 var positiveWords = [];
		 var words = tweet.split(' ');
		 words.forEach(function(word){
		 	var cleanedWord =  word.replace(/\W/g,'').toLowerCase();
		 	if (wordRanks[cleanedWord]){
		 		if (wordRanks[cleanedWord] > 0){
		 			var positiveWordRank = {};
		 			positiveWordRank[cleanedWord] = wordRanks[cleanedWord];
		 			console.log(positiveWordRank);
		 			positiveWords.push(positiveWordRank);
		 		}
		 	}
		 });
		 return positiveWords;
	}

	this.getNegativeWords = function(){
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

	this.getSentiment = function(){
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