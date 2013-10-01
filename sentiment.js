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

var ranks = {};

MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db){


if (err) throw err;

        db.collection('WordRanks').find().toArray(function(err, items){
                if (err) throw err;

                items.forEach(function(item){
                  ranks[item.Word] = item.Score;
                });
        });



        twit.stream("statuses/filter", {'track':['Buffalo Bills','Bills Football', 'Bills NFL','Buffalo NFL','Buffalo Football','BuffaloBills']}, function(stream){
                stream.on('data',function(data){
//                      console.log(JSON.stringify(data));

        //              var twitObj = JSON.parse(util.inspect(data));

                        data.date = new Date(data.created_at);

                        //calc sentiment
                        var positiveWords = [];
                        var negativeWords = [];
                        var unclassified = [];
                        var tweetSentiment = 0;
                        data.text.split(" ").forEach(function(word){
                                var cleanedWord = word.replace(/\W/g,'').toLowerCase();
//                              console.log(cleanedWord);
                                var wordRank = {}
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

                        data.sentiment = tweetSentiment;
                        data.postiveWords = positiveWords;
                        data.negativeWords = negativeWords;
                        data.unclassifiedWords = unclassified;
                        db.collection('BillsTweets').insert(data, function(err, inserted){
                                if (err) throw err;
                                var now = new Date();
                                console.log("Added Tweet:  "+ now);
                        });
                });
        });


});


