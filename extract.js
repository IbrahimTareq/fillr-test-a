var curl = require("curl");
var jsdom = require("jsdom");

module.exports = {

    extract: function() {
        const url = "http://autofill.mozdev.org/autofilltest.html";

        curl.get(url, null, (err,res,body)=>{
            if(res.statusCode == 200){
                parseData(body);
            } else{
                console.log("error while fetching url");
            };
        });
    },

    parseData: function(html){
        const {JSDOM} = jsdom;
        const dom = new JSDOM(html);
        const $ = (require('jquery'))(dom.window);

        var obj = {};
        var keys = [];
        var values = [];

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

            //Country name is inside a select tag so it is being added manually
            if (label.toString().trim() === 'ZIP/Postal Code'){
                values.push("country");
            }
            values.push(input_name.toString().trim()); //Whitespace removed
        }

        keys.shift(); //Get rid of the first <tr> with link tags
        for(var i = 0; i < keys.length; i++) {
            obj[keys[i]] = keys[i] + " " + values[i];
        }

        return obj;
    }
}