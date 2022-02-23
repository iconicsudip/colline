setInterval(check,1000);
function check(){
    if(document.getElementById("off_on").checked){
        var z = '<p>test satu dua tiga</p>'; // is a string 
        document.body.appendChild(z);        
        window.localStorage.setItem("checked","true");
    }else{
        console.log("k");
    }
}