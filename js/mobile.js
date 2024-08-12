
function toggleMenu(){
    let el=document.getElementById("main_menu")   ;
    console.log("toggle",el.style.display);
    let isOn=(el.style.display!="block")?false:true;
    if(isOn){
        el.style.display="none";
    } else{
        el.style.display="block";
    }
}

