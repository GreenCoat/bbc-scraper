var express = require("express");
var mongo = require("mongojs");

var cheerio = require("cheerio");
var request = require("request");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongo(databaseUrl, collections);
db.on("error", function(err){
	console.log("Database Error:", err);
});

app.get("/", function(req, res){
	res.send("Hello World");
});

app.get("/all", function(req, res){
	db.scrapedData.find({}, function(err, found){
	if(err) return err;
	res.json(found);
	});
});

app.get("/scrape", function(req, res){
	request("https://www.bbc.com/earth/world", function(err, res, html){
	
		var $ = cheerio.load(html);

		$("").each(function(i, element){
			db.scrapedData.insert({

			}, function(err, inserted){
				if(err) return err;
				console.log(inserted);
			});
		});
	});

	res.send("Scrape Complete"); 
});

app.listen(8000, function(){
	console.log("App running");
});