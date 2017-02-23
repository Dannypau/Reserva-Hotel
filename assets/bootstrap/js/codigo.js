function setInputDate(_id,sum){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1,
        y = hoy.getFullYear(),
        data;

    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+(d+sum);
    console.log(data);
    _dat.min=data;
    _dat.max= (y+1)+"-"+m+"-"+d;
    _dat.value = data;
};

function updateInputDate(){
    var _dat = document.querySelector("#dateDefault2");
    var _dat1 = document.querySelector("#dateDefault");
    var hoy = new Date(_dat1.value),
        d = hoy.getDate(),
        m = hoy.getMonth()+1,
        y = hoy.getFullYear(),
        data;
    console.log(hoy);
    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+(d+2);
    if(_dat1.value > _dat.value){
    console.log(data);
    _dat.value = data;
        }
    _dat.min=data;
};
/*
function handleChange(checkbox) {
    var
    var label="total"+checkbox.id.substr(8);
    if(checkbox.checked == true){
        total=total+Number(document.getElementById(label).innerHTML);
    }else{
        total=total-Number(document.getElementById(label).innerHTML);
   }
    console.log(total);
}
*/

function handleChange(checkbox) {
    var fechaFin = new Date(document.getElementById("fechaFin").innerHTML);
    var fechaInicio =new Date(document.getElementById("fechaInicio").innerHTML);
    
    var diferenciaDias= Math.floor((fechaFin - fechaInicio)/(1000*60*60*24));
    console.log(diferenciaDias);
    if(checkbox.checked == true){
        document.getElementById("total").innerHTML=Number(document.getElementById("total").innerHTML)+(diferenciaDias*10*Number(document.getElementById("numeroHuespedes").innerHTML));
    }else{
        document.getElementById("total").innerHTML=Number(document.getElementById("total").innerHTML)-(diferenciaDias*10*Number(document.getElementById("numeroHuespedes").innerHTML));
   }
}
setInputDate("#dateDefault",0);
setInputDate("#dateDefault2",1);
