var util = require('util'),
MongoClient = require('mongodb').MongoClient;

var ranks = {};

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db){


if (err) throw err;

        db.collection('WordRanks').find().toArray(function(err, items){
                if (err) throw err;

                items.forEach(function(item){
                  ranks[item.Word] = item.Score;
                });
        });


	db.collection('BillsTweets').find().toArray(function(err, items){
		if (err) throw err;	
		items.forEach(function(data){
                        var replaceDate = new Date(data.created_at);
                        //calc sentiment
                        var positiveWords = [];
                        var negativeWords = [];
                        var unclassified = [];
                        var tweetSentiment = 0;
                        data.text.split(" ").forEach(function(word){
   				var cleanedWord = word.replace(/\W/g,'').toLowerCase();
//                              console.log(cleanedWord);
                                var wordRank = {};
                                if (cleanedWord in ranks){
                                        wordRank[cleanedWord] = ranks[cleanedWord];
                                        if (ranks[cleanedWord] > 0) {
                                           positiveWords.push(wordRank);
                                        }else if (ranks[cleanedWord] < 0){
                                           negativeWords.push(wordRank);
                                        }else{
                                           unclassified.push(wordRank);
                                        }
                                        tweetSentiment +=  ranks[word];
                                }else{
                                   wordRank[cleanedWord] = "na";
                                    unclassified.push(wordRank);
                                }
                        });

                        db.collection('BillsTweets').update({'_id':data._id},{$set:{'sentiment':tweetSentiment, 'date':replaceDate, 'postiveWords':positiveWords, 'negativeWords':negativeWords, 'unclassifiedWords':unclassified}},function(err, updated){
								if (err) throw err;
								console.log(updated.sentiment);
							});
	});
});
});

