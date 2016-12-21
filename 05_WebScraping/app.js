var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){


     url = 'http://www.transfermarkt.co.uk/statistik/transferrekordehistorie';


    request(url, function(error, response, html){

     

        if(!error){
            

            var $ = cheerio.load(html);


            var place, player, fee;
            var json = { place : "", player : "", fee : ""};

              $('.spielprofil_tooltip').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                player = data.text();

           // Once we have our title, we'll store it to the our json object.

                json.player = player;
        })

           		$('.odd').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                place = data.children.first.text();

           // Once we have our title, we'll store it to the our json object.

                json.place = place;

                fee = data.children.last.text();

                json.fee = fee;
        })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;



app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;