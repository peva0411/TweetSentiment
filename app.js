var util = require('util'),
 twitter = require('twitter'),
 MongoClient = require('mongodb').MongoClient;

var twit = new twitter({
	consumer_key: 'YGzVLUlyPqlIzcYH7vB7hw',
	consumer_secret: 'nMKAMqDTzVUl4bOShLRs0GCAkaCVBPYgwlDp6PH6A',
	access_token_key: '99572455-Sx0eXZADLcrSi39TIguB8MS9auoBBLmXrkPSbcCY',
	access_token_secret: 'C4WTCEcuptiVN0wAIt7DqvklATz6VYtlWn4vwUAqmJI'
	//callback: 'http://google.com'
	});

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db){

	twit.stream("statuses/filter", {'track':['Buffalo Bills','Bills Football', 'Bills NFL','Buffalo NFL','Buffalo Football','BuffaloBills']}, function(stream){
		stream.on('data',function(data){
//			console.log(JSON.stringify(data));
		
	//		var twitObj = JSON.parse(util.inspect(data));
	
			db.collection('BillsTweets').insert(data, function(err, inserted){
				if (err) throw err;
				var now = new Date();
				console.log("Added Tweet:  "+ now);
			});
		});
	}); 


});

	
//twit.verifyCredentials(function(data){
//	console.log(util.inspect(data));		
//});
//var token = "";
//var tokenSecret = "";
//
//twit.getRequestToken(function(error, requestToken, requestTokenSecret, results){
//			if (error){
//				console.log("error oauthrequest token: " + JSON.stringify(error));
//			}else{
//	                   token = requestToken;
//		           tokenSecret = requestTokenSecret;	                   
//			}
//		});
//
//twit.search('nodejs', function(data){
//	console.log(util.inspect(data));
//});


