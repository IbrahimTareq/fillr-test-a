module.exports.match = function(hash) {
	var patt = new RegExp("Ecom_Payment_Card_(Name|Type|Number|Verification|ExpDate_Day|ExpDate_Month|ExpDate_Year|Protocol)$");
    var creditCardData = [];
    var res;

    Object.keys(hash).forEach(function(key) {
        res = patt.test(hash[key]);
        if(res == true){
            creditCardData.push(hash[key]);
        }
    });

    return creditCardData;
}