function TweetsDAO(db){
	"use strict";

	if (false === (this instanceof TweetsDAO)){
		console.log('Warning: TweetsDAO constructor called without "new" operator');
	}

	var tweets = db.collection("BillsTweets");

	this.getTweets = function(num, skip, callback){
		"use strict";

		var skipInt = parseInt(skip);
		var numInt = parseInt(num);

		tweets.find().sort('date', -1).skip(skipInt).limit(numInt).toArray(function(err, items){
			if (err) return callback(err, null);
			callback(err, items);
		});
	}

	this.getTweetCount = function(callback){
		"use strict";

		tweets.find({}).count(function(err, result){
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	this.addTweet = function(tweet, callback){
		"use strict";

		tweets.insert(tweet, function(err, result){
			"use strict";
			if (err) return callback(err, null);

			return callback(null, result[0]);
		});
	}

	this.updateTweet = function(updatedTweet, callback){
		"use strict";

		tweets.update({_id:updatedTweet._id}, updatedTweet, function(err, result){
			if (err) return callback(err, null);
			
			callback(null, result);
		});
	}
}

module.exports.TweetsDAO = TweetsDAO;