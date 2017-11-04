module.exports.match = function(hash) {
    var patt = new RegExp("card expire date( day| month| year)$");
    var creditCardData = [];
    var res;

    Object.keys(hash).forEach(function(key) {
        res = patt.test(key);
        if(res == true){
            creditCardData.push(key);
        }
    });

    return creditCardData;
}