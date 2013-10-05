var util = require('util'),
WordRanksDAO = require('./wordRanks').WordRanksDAO,
TweetsDAO = require('./tweets').TweetsDAO,
Sentimentizer = require('./sentimentizer').Sentimentizer,
MongoClient = require('mongodb').MongoClient;

var ranks = {};

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db){
    if (err) throw err;

    console.log("Connect to DB");

    var wordRanks = new WordRanksDAO(db);
    var tweets = new TweetsDAO(db);
    wordRanks.getWordRanks(function(err, items){
         if (err) throw err; 

        items.forEach(function(item){
            console.log(item.Word);
            ranks[item.Word] = item.Score;
        });

        var sentizer = new Sentimentizer(ranks);

         //loop to not pull all tweets at once
         var count = 0;
         var updateCount = 0;
        tweets.getTweetsCursor(function(err, cursor){
                cursor.each(function(err, item){
                    count++;
                    if (item == null){
                        return;
                    }

                    console.log("Calculating Tweet: " + count);
                    var positiveWords = sentizer.getPositiveWords(item.text);
                    var negativeWords = sentizer.getNegativeWords(item.text);
                    var tweetSentiment = sentizer.getSentiment(item.text);

                    //add fields 
                    item.sentiment = tweetSentiment;
                    item.positiveWords = positiveWords;
                    item.negativeWords = negativeWords;
                    item.date = new Date(item.created_at);

                    //update tweet
                    tweets.updateTweet(item, function(err, result){
                        if (err) throw err;

                        updateCount++;
                        console.log("Updated Tweet: " + updateCount);
                    });
                });
            });
    });
});



