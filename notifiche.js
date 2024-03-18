//Gestisci premi un pulsante.

//var times;
var send_type=0
 var jdata={}
 var jdata_dettaglio={}
 

 


function notifiche(indata,tipo)
{ 
    
    //alert("NOTIFICHE.JS  tipo "+tipo)
    view("in_arrivo")
     
var url = datas['api_url'];
var path = datas['api_path'];   
var api_key = datas['api_key'];   

 var rid_lat,rid_lng;

jdata={
  "nome" : indata['nome'],
  "cognome" : indata['cognome'],
  "data_ordine" : indata['data_ordine'],
  "data_stimata" : indata['data_stimata'],
  "data_lavorazione":indata['data_lavorazione'],
  "notifica_ordine":indata['notifica_ordine'],
  "id_azienda":indata['id_azienda'],
  "status_ordine":indata['status_ordine'],
  "id_ordine" : indata['id_ordine'],
  "id_rider" : id_rider,
  "id_utente" : indata['id_utente'],
  "ordine_tipo" : indata['ordine_tipo'],
  "pagamento_tipo" : indata['pagamento_tipo'],
  "pagamento_stato" : indata['pagamento_stato'],
  "totale_ordine" : indata['totale_ordine'],
  "uid" : indata['uid'],
  "delivery_accept":"attend",
  "delivery_costo":indata['delivery_costo'],
  "distanza":"0",
  "update":"false"
   }

jdata_dettaglio=indata

//alert("uid "+indata['uid']+" tipo  "+tipo)  

//alert("data lav  "+indata["data_lavorazione"])

/*
0 Conferma Ordine
1 Annulla Ordine
2 Invia Ritardo 15 Min
3 Invia Ritardo 30 Min
4 Invia Ritardo 40 Min
5 Invia Ritardo 50 Min
*/



id_ordine = indata["id_ordine"]; //ordine id
id_utente = indata["id_utente"];
id_azienda = indata["id_azienda"];// keystore azienda

if(datas['notifica_sms'] == "true"){send_type="1"}
if(datas['notifica_email'] == "true"){send_type="2"}
if(datas['notifica_sms'] == "true" && datas['notifica_email'] == "true"){send_type="3"}

//console.log("send_type  "+send_type)


    switch(tipo){
    case "0": // IN LAVORAZIONE
    //alert(tipo) // 0 IN LAVORAZIONE
    times = setTimeout(http_stop_timer, 11000) 
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );    
    break
    
    case "10": // ANNULLATO 1
    //alert(tipo) // 1 annullato
    times = setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    //alert(params)
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "11": // ANNULLATO 2
    //alert(tipo) // 1 annullato
    times = setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    //alert(params)
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "12": // ANNULLATO 3
    //alert(tipo) // 1 annullato
    times = setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    //alert(params)
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "2": // RITARDO 20
  //alert(tipo) 2  ritardo 15
    times =setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
     app.HttpRequest( "GET", send_web, null, null, handleReply );
     app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "3": // RITARDO 30
  //alert(tipo) 3 ritardo 30
   times =setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    var send_web = url+path+params;    
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "4": // RITARDO 40
  //alert(tipo)  4 ritardo 40
    times =setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply );           
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    case "5": // RITARDO 50
  //alert(tipo) 5 ritardo 50 
    times =setTimeout(http_stop_timer, 11000)  
    var params = "keystore_slave=" + id_azienda + "&api_key=" + api_key + "&tipo="+tipo+"&id_clienti=" + id_utente+"&id_ordine="+id_ordine+"&send_type="+send_type;
    var send_web = url+path+params; 
    //alert("send_web  "+send_web)
    app.HttpRequest( "GET", send_web, null, null, handleReply)    
    app.ShowProgress( "Attendere Prego. Invio Messaggio in corso..." );
    break
    
    
     case "6": // IN CONSEGNA
  
  /*  
    db.ref("rider/"+uid+"/"+id_rider).once("value",function(rid){
    rid=rid.val()
    for(a in rid){        
    if(a=='lat'){lat1=rid['lat'];}
    if(a=='lng'){lng1=rid['lng'];}
    }
     
   gps_dist=getGPS_distanza(lat1,lng1,jdata_dettaglio.lat,jdata_dettaglio.lng)
   */
   
   //alert("1 dist->  "+gps_dist+"mt   idRider: "+id_rider)
 
 /*
 jdata.delivery=gps_dist
 jdata.distanza=gps_dist
 jdata_dettaglio.delivery=gps_dist
 jdata_dettaglio.distanza=gps_dist
 */
 
 jdata.delivery="attend"
 jdata.distanza="attend"
 jdata.lat=indata['lat']
 jdata.lng=indata['lng']
 jdata.distanza_google="0 m"
 
 
 jdata_dettaglio.delivery="attend"
 jdata_dettaglio.distanza="attend"
 jdata_dettaglio.distanza_google="0 m"
 
 
 jdata_dettaglio.id_rider=id_rider
 
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);
   db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(jdata_dettaglio).then(OnSuccessSend).catch(OnFailedSend);  
    
  //    })
      
    
     
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);        
        

    

         
    //db.ref("riders_in_consegna/"+uid+"/"+id_rider+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);
    //db.ref("dettaglio_riders_in_consegna/"+uid+"/"+id_rider+"/"+id_ordine).update(jdata_dettaglio).then(OnSuccessSend).catch(OnFailedSend);
    
    app.ShowPopup("OK")
    view("in_consegna")
    break
    
    case "7": //  CONSEGNATO STORICO        
    db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend); 
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend); 
    if(datas['view_storico']=="true"){
    db.ref("ordini_consegnato/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_storico/"+uid+"/"+id_ordine).update(jdata_dettaglio).then(OnSuccessSend).catch(OnFailedSend);
    }
    app.ShowPopup("OK")
   //mod 2023 
    view("in_arrivo")
   //view("consegnato") 
   //mod 2023
    break
     
    case "8": //  CONSEGNATO inarrivo  
    // alert("inarrivo_consegnato  ")
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend); 
    if(datas['view_storico']=="true"){
    db.ref("ordini_consegnato/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_storico/"+uid+"/"+id_ordine).update(jdata_dettaglio).then(OnSuccessSend).catch(OnFailedSend);
    }
    app.ShowPopup("OK")
   //mod 2023 
    view("in_arrivo")
   //view("consegnato") 
   //mod 2023
    break 
    }

                      

// 100 errore di sistema email
// 101 errore di sistema sms
// 102 errore di sistema sms + email 
// 103 sms numero non valido
// 104 credito insufficiente sms
// 203 errore sms + di sistema email
// 204 credito sms + di sistema email

function handleReply(error,reply)
{
   console.log(" **** HEAD FUNCTION ricevi ****** ERROR : "+error+"       reply : "+reply)
   //console.log(" **** reply : "+typeof reply)
   //alert("**********  func reply "+reply)
   
   clearTimeout(times); 
    if( error == "true" ){
    app.HideProgress()
    alert("Errore invio, prego riprovare.")
     }
    else{
        if(      
           reply == "0" || 
           reply == "2" || 
           reply == "3" || 
           reply == "4" || 
           reply == "5" || 
           reply == "6" ||
           reply == "7" ||
           reply == "10" ||
           reply == "11" ||
           reply == "12" ||
           reply == "100" ||
           reply == "101" ||
           reply == "102" ||
           reply == "103" ||
           reply == "104" ||
           reply == "105" ||
           reply == "error"){
    console.log("**************** return_reply: "+reply)  
  //  alert("  consol ok  ********** "+reply)
               }
           else{
               
    //console.log("**************** error feed "+reply)  
    //alert("  consol error  ********** "+reply)           
               reply="error"}
    
   
               
    switch(reply){       
    
    case "0": // IN LAVORAZIONE
    indata["data_stimata"]=(moment(indata["data_lavorazione"], 'DD/MM/YYYY HH:mm').add(0,"minutes").format('DD/MM/YYYY  HH:mm'))    
    status_ritardo_0={"update":"update","status_ordine":"0","data_lavorazione":indata["data_lavorazione"],"status_lavorazione":"Ordine in Lavorazione!","status_lavorazione_style":"#0c960e","status_lavorazione_icona":"fa fa-thumbs-o-up"}        
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_ritardo_0).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_ritardo_0).then(OnSuccessSend).catch(OnFailedSend);    
    app.HideProgress()
    alert("Notifica Lavorazione inviata!!")
    if(datas["stampa_lavorazione"]=="true"){   
        if(print_tipo_connessione=="wifi"){read_header_print(indata['id_ordine'],"dettaglio","InPreparazione..")}       
        if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio","InPreparazione..")}       
        }   
    view("in_arrivo")
    break
    
    case "10":  // ANNULLATO 1    
    //alert("ordini_in_arrivo :   uid: "+uid+"   id_ordine: "+id_ordine)
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("ordini_annullato/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_storico/"+uid+"/"+id_ordine).update(indata).then(OnSuccessSend).catch(OnFailedSend);
    app.HideProgress()
    alert("Notifica Ordine Annullato inviata con successo!! Causale 1#")
    if(datas["stampa_lavorazione"]=="true" && datas["stampa_lavorazione_ordini_annullati"]=="true" ){
         //print_header(indata["id_ordine"],"dettaglio_storico")
         if(print_tipo_connessione=="wifi"){read_header_print(oia['id_ordine'],"dettaglio_storico","Annullato")}
        if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio_storico","Annullato")}
        }
     view("annullato")
    break
    
     case "11":  // ANNULLATO 2   
    //alert("ordini_in_arrivo :   uid: "+uid+"   id_ordine: "+id_ordine)
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("ordini_annullato/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_storico/"+uid+"/"+id_ordine).update(indata).then(OnSuccessSend).catch(OnFailedSend);
    app.HideProgress()
    alert("Notifica Ordine Annullato inviata con successo!! Causale 2#")
    if(datas["stampa_lavorazione"]=="true" && datas["stampa_lavorazione_ordini_annullati"]=="true" ){
        //print_header(indata["id_ordine"],"dettaglio_storico")
        if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio_storico","Annullato")}
        if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio_storico","Annullato")}
        }
     view("annullato")
    break
    
     case "12":  // ANNULLATO 3   
    //alert("ordini_in_arrivo :   uid: "+uid+"   id_ordine: "+id_ordine)
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);
    db.ref("ordini_annullato/"+uid+"/"+id_ordine).update(jdata).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_storico/"+uid+"/"+id_ordine).update(indata).then(OnSuccessSend).catch(OnFailedSend);
    app.HideProgress()
    alert("Notifica Ordine Annullato inviata con successo!! Causale 3#")
    if(datas["stampa_lavorazione"]=="true" && datas["stampa_lavorazione_ordini_annullati"]=="true" ){
        //print_header(indata["id_ordine"],"dettaglio_storico")
        if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio_storico","Annullato")}
        if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio_storico","Annullato")}
        }
     view("annullato")
    break
    
    case "2": // RITARDO 15
    //alert("data   15 "+indata["data_lavorazione"]+"   "+id_ordine)
    indata["data_lavorazione"]=(moment(indata["data_lavorazione"], 'DD/MM/YYYY HH:mm').add(15,"minutes").format('DD/MM/YYYY  HH:mm'))
    status_ritardo_15={"update":"update","status_ordine":"2","data_lavorazione":indata["data_lavorazione"],"status_lavorazione":"Notifica-15min","status_lavorazione_style":"#e0b60b","status_lavorazione_icona":"fa fa-thumbs-o-down"}    
     db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_ritardo_15).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_ritardo_15).then(OnSuccessSend).catch(OnFailedSend);    
    app.HideProgress()
    alert("Notifica Ritardo 15min inviata con successo!!")
    if(datas["stampa_lavorazione"]=="true"){
       // print_header(indata["id_ordine"],"dettaglio")
        if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio","InRitardo")}
        if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio","InRitardo")}
        }
     view("in_arrivo")
    break
    
    case "3":  // RITARDO 30
    indata["data_lavorazione"]=(moment(indata["data_lavorazione"], 'DD/MM/YYYY HH:mm').add(30,"minutes").format('DD/MM/YYYY  HH:mm'))
    status_ritardo_30={"update":"update","status_ordine":"3","data_lavorazione":indata["data_lavorazione"],"status_lavorazione":"Notifica-30min","status_lavorazione_style":"#e0b60b","status_lavorazione_icona":"fa fa-thumbs-o-down"}    
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_ritardo_30).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_ritardo_30).then(OnSuccessSend).catch(OnFailedSend);        
    app.HideProgress()
    alert("Notifica Ritardo 30min inviata con successo!!")
    if(datas["stampa_lavorazione"]=="true"){
    //print_header(indata["id_ordine"],"dettaglio")
    if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio","InRitardo")}
    if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio","InRitardo")}
        }
     view("in_arrivo")
    break
    
    case "4": // RITARDO 40
    indata["data_lavorazione"]=(moment(indata["data_lavorazione"], 'DD/MM/YYYY HH:mm').add(40,"minutes").format('DD/MM/YYYY  HH:mm'))
    status_ritardo_40={"update":"update","status_ordine":"4","data_lavorazione":indata["data_lavorazione"],"status_lavorazione":"Notifica-40min","status_lavorazione_style":"#e0b60b","status_lavorazione_icona":"fa-thumbs-o-down"}    
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_ritardo_40).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_ritardo_40).then(OnSuccessSend).catch(OnFailedSend);        
    app.HideProgress()
    alert("Notifica Ritardo 40min inviata con successo!!")
    if(datas["stampa_lavorazione"]=="true"){
    //print_header(indata["id_ordine"],"dettaglio")
    if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio","InRitardo")}
    if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio","InRitardo")}
    }
     view("in_arrivo")
    break
    
    case "5":  // RITARDO 50
    indata["data_lavorazione"]=(moment(indata["data_lavorazione"], 'DD/MM/YYYY HH:mm').add(50,"minutes").format('DD/MM/YYYY  HH:mm'))
    status_ritardo_50={"update":"update","status_ordine":"5","data_lavorazione":indata["data_lavorazione"],"status_lavorazione":"Notifica-50min","status_lavorazione_style":"#e0b60b","status_lavorazione_icona":"fa fa-thumbs-o-down"}    
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_ritardo_50).then(OnSuccessSend).catch(OnFailedSend);    
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_ritardo_50).then(OnSuccessSend).catch(OnFailedSend);    
    app.HideProgress()
    alert("Notifica Ritardo 50min inviata con successo!!")
    if(datas["stampa_lavorazione"]=="true"){
    //print_header(indata["id_ordine"],"dettaglio")
    if(print_tipo_connessione=="wifi"){read_header_print(indata["id_ordine"],"dettaglio","InRitardo")}
    if(print_tipo_connessione=="bluetooth"){print_bluetooth(indata["id_ordine"],"dettaglio","InRitardo")}
    }
     view("in_arrivo")
    break
    
    /*
   case "6":  // IN CONSEGNA                 
  
   break
    
    
     case "7":  // CONSEGNATO                 
   
   break
   */
   
 
   
   //************************  GESTIONE ERRORI **************************
   case "100":  // errore invio email sistem                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("Attenzione!! EMAIL non inviata. Contattare il centro assistenza CittaCoupon.")
   view("in_arrivo")
   break
   
   case "101":  // errore invio sms sistem                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("Attenzione!! SMS non inviato. Contattare il centro assistenza CittaCoupon.")
   view("in_arrivo")
   break
   
   case "102":  // sms numero non valido                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("Attenzione!! Errore invio Email e Sms. Contattare il centro assistenza CittaCoupon.")
    view("in_arrivo")
   break
   
   case "103":  // sms numero non valido                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("Attenzione!! SMS non inviato, numero non valido")
    view("in_arrivo")
   break
    
   case "104":  // sms credito insufficiente                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("Attenzione!! Credito SMS insufficiente , effettuare una una ricarica, grazie.")
   view("in_arrivo")
   break
   
     case "105":  // sms credito insufficiente                 
   //db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).remove().then(OnSuccessSend).catch(OnFailedSend);    
   app.HideProgress()
   alert("errore invio per caratteri >160")
   view("in_arrivo")
   break
  
    case "error":          
    status_error={"update":"update","status_ordine":"102","status_lavorazione":"Errore Notifica!! Riprova","status_lavorazione_style":"#fc4103","status_lavorazione_icona":"fa fa-warning"}
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update(status_error).then(OnSuccessSend).catch(OnFailedSend); 
    db.ref("dettaglio_ordini/"+uid+"/"+id_ordine).update(status_error).then(OnSuccessSend).catch(OnFailedSend);  
    app.HideProgress()
    alert("Errore invio!! Prego riprovare. #001")
    view("in_arrivo")
    break
  
 }//switch   

  
    }// else
}// if

}// function notifiche
    
   
    
    function http_stop_timer(){       
    db.ref("ordini_in_arrivo/"+uid+"/"+id_ordine).update({"status_ordine":"102"}).then(OnSuccessSend).catch(OnFailedSend);   
    app.HideProgress()
    //lay.Hide();  
    }
   
    function OnSuccessSend(){};
    function OnFailedSend(){};