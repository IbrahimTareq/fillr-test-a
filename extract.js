const curl = require("curl");
const jsdom = require("jsdom");

module.exports.extract = function(window) {
  
	curl.get(url, null, (err,res,body)=>{
	    if(res.statusCode == 200){
	        parseData(body);
	    } else{
	        console.log("Error while fetching url");
	    };
	});

	function parseData(html){
	    const {JSDOM} = jsdom;
	    const dom = new JSDOM(html);
	    const $ = (require('jquery'))(dom.window);

	    //var obj = {};
    	var keys = [];

	    var table_rows = $("tr");
	    var inputs = $("input");

	    for(var i = 0; i < table_rows.length; i++){
	        var label = $(table_rows[i]).children('td').html();
	        var input_name = String($(inputs[i]).attr('name')); //Convert to string
	        var patt = new RegExp("^\\s*(<.*)>$"); //Checks initial trailing space and <> tags
	        var res = patt.test(label);

	        //If the item is a valid label and is not an HTML tag
	        if(res == false){
	            keys.push(label.toString().trim()); //Whitespace removed
	        }

	        keys.shift(); //Get rid of the first <tr> with link tags
		    for(var i = 0; i < keys.length; i++) {
		        console.log(keys[i]);
		    }
	    }
	}
}
