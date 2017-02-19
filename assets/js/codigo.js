function setInputDate(_id,sum){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1, 
        y = hoy.getFullYear(),
        data;

    if(d < 10){
        d = "0"+d+sum;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+d;
    console.log(data);
    _dat.min=data;
    _dat.max= (y+1)+"-"+m+"-"+d;
    _dat.value = data;
};

function updateInputDate(){
    var _dat = document.querySelector("#dateDefault2");
    var _dat1 = document.querySelector("#dateDefault");
    data = _dat1.value;
    console.log(data);
    _dat.value = data;
    _dat.min=data;
};



setInputDate("#dateDefault",0);
setInputDate("#dateDefault2",1);
