
function Acapo(testo,tipo,mm)
{  
var f_stry = []
var a=0;
var b=0;
if(mm==80){mm=48}else{mm=32}
if(tipo=="note"){chars=" ";chars1=" "}else{chars="-";chars1=" * "}
    testo  = testo.split(chars)    
    var lun_array = testo.length
    for(a=0; a < lun_array; a++){                                        
    if(!f_stry[b]){f_stry[b]=""}        
    test=f_stry[b]+testo[a]+chars1 
    if(test.length  <=  mm ){              
    if(!f_stry[b]){f_stry[b]=""}
    f_stry[b] = f_stry[b]+chars1+testo[a]      
    }else{           
    b++           
    if(!f_stry[b]){f_stry[b]=""}                 
    f_stry[b] = f_stry[b]+testo[a]     
    } 
    }   
    for(a=0;a < f_stry.length;a++){
    if(a==0){f_stry[a]=f_stry[a].slice(2);}
            }    
    return f_stry;
 
   }
    