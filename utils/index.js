function random1(){
    return Math.floor(Math.random()*20);
}
function gougu(a,b){
    return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}
module.exports.R=random1;
exports.G=gougu;
exports.PI=Math.PI;