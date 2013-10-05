function WordRanksDAO(db){
	"use strict";

	if (false === (this instanceof WordRanksDAO)){
		console.log("Warning: WordRanksDAO constructor called without 'new' operator");
	}

	var wordRanks = db.collection("WordRanks");

	this.getWordRanks = function(callback){
		"use strict";

		wordRanks.find().toArray(function(err, items){
			if (err) return callback(err, null);

			return callback(null, items);
		});
	}
}

module.exports.WordRanksDAO = WordRanksDAO;