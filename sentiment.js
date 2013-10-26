var util = require('util'),
twitter = require('twitter'),
WordRanksDAO = require('./wordRanks').WordRanksDAO,
TweetsDAO = require('./tweets').TweetsDAO,
Sentimentizer = require('./sentimentizer').Sentimentizer,
MongoClient = require('mongodb').MongoClient,
nconf = require('nconf');

nconf.file('settings.json');

var connectionString = nconf.get('connectionString');
var conKey = nconf.get('consumer_key');
var consSec = nconf.get('consumer_secret');
var accTokenKey = nconf.get('access_token_key');
var accTokenSec = nconf.get('access_token_secret'); 

var twit = new twitter({
        consumer_key: conKey,
        consumer_secret: consSec,
        access_token_key: accTokenKey,
        access_token_secret: accTokenSec
        //callback: 'http://google.com'
        });

var trackQuery = {'track': ['Buffalo Bills',
                            'Bills Football', 
                            'Bills NFL',
                            'Buffalo NFL',
                            'Buffalo Football',
                            'BuffaloBills']};

var ranks = {};

MongoClient.connect(connectionString, function(err, db){
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


