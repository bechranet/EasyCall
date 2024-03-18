 
    setInterval(time, 60000)    
    function time(){ 
   
   /*
    for(aa in array_ordini_in_arrivo){     
    arr1=array_ordini_in_arrivo[aa]
    for(ab in arr1){
    }
    dl=arr1["data_lavorazione"] 
    dl = moment(dl,'DD/MM/YYYY HH:mm')
    da  = moment()
    tr=(dl.diff(da, 'minutes')+1)
    console.log("tr -> "+tr+"    "+xxx_test
    
    */
    
    /*
    
    for(aa in array_ordini_in_arrivo){     
    arr1=array_ordini_in_arrivo[aa]
    for(ab in arr1){
    }
    dl=arr1["data_lavorazione"] 
    dl = moment(dl,'DD/MM/YYYY HH:mm')
    da  = moment()
    tr=(dl.diff(da, 'minutes')+tempo_max_avvio_call)
    console.log("tr -> "+tr+"  call   "+tempo_max_avvio_call)
    if(tr<1){console.log("  TEMPO SCADUTO!!   ")     
    }else{
    $('#slider_range').val(tr);
    $('#tempo_residuo').text(tr+"Min");
    console.log("tr -> "+tr)
    }
     }
     
    */
   
   
    dl = moment(TIME_CHECK,'DD/MM/YYYY HH:mm')
    da  = moment()
    tr=(dl.diff(da, 'minutes')+tempo_max_avvio_call)
    console.log("tr : "+tr+"  /  tempo_max_avvio_call : "+tempo_max_avvio_call+" /  TIME_CHECK : "+TIME_CHECK)
    if(tr<0){console.log("  TEMPO SCADUTO!!   ")     
    }else{
    $('#slider_range').val(tr);
    $('#tempo_residuo').text(tr+"Min");
    console.log("tr -> "+tr)
    }
     
     
     
     
     
     
       }   
  
  
   function very_time(very_time_stimata,very_time_lavorazione){
   very_time_adesso=moment()
   very_time_lavorazione=moment(very_time_lavorazione,'DD/MM/YYYY HH:mm')   
   very_tr=very_time_lavorazione.diff(very_time_adesso, 'minutes')
   return very_tr
   }    
    