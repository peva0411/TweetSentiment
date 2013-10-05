var util = require('util'),
twitter = require('twitter'),
WordRanksDAO = require('./wordRanks').WordRanksDAO,
TweetsDAO = require('./tweets').TweetsDAO,
Sentimentizer = require('./sentimentizer').Sentimentizer,
MongoClient = require('mongodb').MongoClient;


var twit = new twitter({
        consumer_key: 'YGzVLUlyPqlIzcYH7vB7hw',
        consumer_secret: 'nMKAMqDTzVUl4bOShLRs0GCAkaCVBPYgwlDp6PH6A',
        access_token_key: '99572455-Sx0eXZADLcrSi39TIguB8MS9auoBBLmXrkPSbcCY',
        access_token_secret: 'C4WTCEcuptiVN0wAIt7DqvklATz6VYtlWn4vwUAqmJI'
        //callback: 'http://google.com'
        });

var trackQuery = {'track': ['Buffalo Bills',
                            'Bills Football', 
                            'Bills NFL',
                            'Buffalo NFL',
                            'Buffalo Football',
                            'BuffaloBills']};

var ranks = {};

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db){
    if (err) throw err;

    //get word ranks 
    var wordRanks = new WordRanksDAO(db);
    var tweets = new TweetsDAO(db);
    wordRanks.getWordRanks(function(err, items){
        if (err) throw err; 

        items.forEach(function(item){
            ranks[item.Word] = item.Score;
        });

        var sentizer = new Sentimentizer(ranks);

        twit.stream("statuses/filter", trackQuery, function(stream){
            console.log('listening for tweets');

            stream.on('data',function(data){
                    //calc sentiment
                    var positiveWords = sentizer.getPositiveWords(data.text);
                    var negativeWords = sentizer.getNegativeWords(data.text);
                    var tweetSentiment = sentizer.getSentiment(data.text);

                    //Add fields
                    data.sentiment = tweetSentiment;
                    data.positiveWords = positiveWords;
                    data.negativeWords = negativeWords;
                    data.date = new Date(data.created_at);

                    //add tweet
                    tweets.addTweet(data, function(err, result){
                        if (err) throw err;
                        console.log("Added Tweet: " + new Date());
                    });

            });
        });

    });

    
});


