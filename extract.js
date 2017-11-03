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

	    var table_rows = $("tr");
	    var inputs = $("input");

	    for(var i = 0; i < table_rows.length; i++){
	        var label = $(table_rows[i]).children('td').html();
	        var input_name = String($(inputs[i]).attr('name')); //Convert to string
        
	        console.log(label);
	        console.log(input_name);
	    }
	}
}
