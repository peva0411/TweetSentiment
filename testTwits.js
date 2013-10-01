var twitter = require("twitter"),
    util = require("util");

var twit = new twitter({
	consumer_key: 'YGzVLUlyPqlIzcYH7vB7hw',
	consumer_secret: 'nMKAMqDTzVUl4bOShLRs0GCAkaCVBPYgwlDp6PH6A',
	access_token_key: '99572455-Sx0eXZADLcrSi39TIguB8MS9auoBBLmXrkPSbcCY',
	access_token_secret: 'C4WTCEcuptiVN0wAIt7DqvklATz6VYtlWn4vwUAqmJI'
	//callback: 'http://google.com'
	});

twit.stream("statuses/sample", function(stream){
	stream.on('data', function(chunk){
		console.log(JSON.stringify(chunk));
	});	
});
//var message = "";
//var tweetSeparator = '\r\n';
//
//	twit.stream("statuses/sample", function(stream){
//		stream.on('data',function(chunk){
//			//console.log(util.inspect(data));
////			console.log(chunk);
//			message += chunk;
//			var tweetSeparatorIndex = message.indexOf(tweetSeparator);
//			console.log(tweetSeparatorIndex);
//			var didFindTweet = tweetSeparatorIndex != -1;			
//			
//			if (didFindTweet){
//				console.log("Found Tweet");
//				var tweet = message.slice(0, tweetSeparatorIndex);
//				//save tweet here
//				var twitObj = JSON.parse(tweet);
//				console.log(twitObj);
//			}			
//			message = message.slice(tweetSeparatorIndex + 1);
//	
//			//db.collection('BillsTweets').insert(twitObj, function(err, data){
//			//	if (err) throw err;
//			//	console.log("Added Tweet");
//			//});
//		});
//	}); 
