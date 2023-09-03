const link=(number,text)=>{
url='https://wa.me/'+encodeURIComponent(number)+'?text='+encodeURIComponent(text)
return url

}

module.exports =link;
