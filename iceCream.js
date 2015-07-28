var net = require("net");
var fs = require("fs");
var port = 2000;



var server = net.createServer(function(connection){

	connection.write("welcome to Sung's ice cream shoppe!\nwhat flavor would you like?");

	connection.on("data", function(data){

		//take inputted data, make into a string, and then split 
		//into an array
		var newString = data.toString();
		var newArray = newString.split(" ");
		console.log(newArray);
		//read in current ice cream data and parse
		var currentMenu = fs.readFileSync("./data.json", "utf8");
		// console.log(currentMenu);
		var parsed = JSON.parse(currentMenu);
		//pick a flavor
		for (var i = 0; i < parsed.length; i++){

			//set current flavor match to a variable
			var currentFlavor = parsed[i].flavor;
			console.log(newArray[0]);

			if (newArray[0] === currentFlavor){
				console.log("found the flavor");
				var currentScoops = parsed[i].scoops;
					if (currentScoops > 0) {
						currentScoops = currentScoops - 1;
					} else {
						connection.write("I'm sorry, we are all out of that flavor :(")
					}

			} else {
				connection.write("I'm sorry, we don't carry that flavor.")
			}
		}
		connection.write("would you like a cup or cone?");



		// connection.write("what toppings would you like?");



	});

});

server.listen(port, function(){
	console.log("this server is connected");
});