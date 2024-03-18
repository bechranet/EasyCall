"use strict"
 function db_init(config){
        var ff="false" 
        for(a in config){                
        if(typeof config[a] === "object"){
        var config_2=config[a];var default_config_2=default_config[a]
        for(var a1 in config_2){    
        if(config_2[a1]){
        if(!default_config_2[a1]){
        db.ref("config/"+uid+"/webpage/"+a1).remove()
        ff="true"
        }}}
        }else{ 
        if(!default_config[a]){
        db.ref("config/"+uid+"/"+a).remove()
        ff="true"
        }}}
        if(ff=="true"){app.ShowPopup("Cancellazione dati obsoleti!! RESTART..");app.Exit() }
        remoteKey = Object.keys(config); 
	    d=0
	    for(a in default_config){	    
	     if(a===remoteKey[d]){ 
	     d++
	     }else{ 
	     DBobj1[a]=default_config[a]
	     db.ref("config/"+uid).update(DBobj1)
	     DBupgrade="true";
	     }
	    if(typeof config[remoteKey[d]]==="object"){
	     remote_webpage=Object.keys(config[remoteKey[d]]);
	    }
	    if(typeof default_config[a]==="object"){  
	    d1=0	 
	   local_webpage=default_config[a] 
	   for(a1 in local_webpage){	      
	   if(a1===remote_webpage[d1]){
	   d1++
	   }else{
	   DBobj2[a]=default_config[a]
	   DBupgrade="true";
	   db.ref("config/"+uid).update(DBobj2)
	    }
	     }
          }
           }	 
           for(a in config){
           if(typeof config[a] === "object"){   
           var config_web=config[a];var default_config_web=default_value_config[a]
           for(var a1 in config_web){
           if(default_config_web[a1]){
           if(config_web[a1] != default_config_web[a1] ){
           DBupgrade="true";
           DBobj3[a1]=default_config_web[a1]
           db.ref("config/"+uid+"/webpage").update(DBobj3)
           }
           }
           }
           }else{
               if(default_value_config[a]){            
               if(config[a] != default_value_config[a] ){
               DBupgrade="true";
               DBobj4[a]=default_value_config[a]
               db.ref("config/"+uid+"/webpage").update(DBobj4)
               }
               }
               }
           
           }
       if(DBupgrade=="true"){
       return "true"
       }else{
       return "false"
           }
        }     
var default_config=
{
  "00_debug" : "false",
  "00_footer_button_tools" : "false",
  "00_status" : "true",
  "0_start" : "start",
  "1_color_header" : "#3a3f43",
  "2_nome_azienda" : "AppStream",
  "2x_tipo_user" : "premium",
  "3_color_footer" : "#3a3f43",
  "4_on_button" : "#f79e05",
  "5_off_button" : "#ffffff",
  "6_icon_color" : "#3a3f43",
  "7_text_color" : "#3a3f43",
  "8_border_color" : "#f5bc02",
  "api_id" : "xxxxxx",
  "api_key" : "8vfhHKD75dk",
  "api_path"   : "/delivery/notify.php?",
  "api_path_keystore" : "/update_uid.php?",
  "api_url" : "https://dalm596ei.cittacoupon.it",
  "app_id" : "xxxxxx",
  "app_id_status" : "true",
  "app_layout" : "Large",
  "app_version" : "XXX",
  "controllo_carica" : "false",
  "id_rider":"00000000",
  "lat_base":"000000",
  "lng_base":"000000",
  "multipla" : "false",
  "multipla_config" : "false",
  "multipla_list":"01,02,03,04,05,06",
  "multipla_nome_01":"Cassa",
  "multipla_nome_02":"Bar",
  "multipla_nome_03":"Pizzeria",
  "multipla_nome_04":"Cucina",
  "multipla_nome_05":"Sala",
  "multipla_nome_06":"Spiaggia",
  "multipla_reparto_01":"0",
  "multipla_reparto_02":"0",
  "multipla_reparto_03":"0",
  "multipla_reparto_04":"0",
  "multipla_reparto_05":"0",
  "multipla_reparto_06":"0",
  "notifica_audio" : "true",
  "notifica_email" : "true",
  "notifica_push" : "false",
  "notifica_sms" : "true",
  "notifica_vocale" : "true",
  "notifica_voce_volume" : "0.5",
  "online" : "01/01/0000 00:00",  
  "print_tipo_connessione":"bluetooth",
  "print_wifi_00":"Master,Cassa,,,Tutto,Tutto,false", 
  "print_wifi_01":",,,,,,",
  "print_wifi_02":",,,,,,",
  "print_wifi_03":",,,,,,",
  "print_wifi_04":",,,,,,",
  "print_wifi_05":",,,,,,",
  "print_wifi_qta":"0",
  "sms_service" : "true",
  "stampa_attivazione" : "false",
  "stampa_automatica" : "false",
  "stampa_descrizione" : "true",
  "stampa_email" : "false",
  "stampa_larghezza" : "80mm",
  "stampa_lavorazione" : "true",
  "stampa_lavorazione_ordini_annullati" : "false",
  "stampa_pagamento" : "true",
  "stampa_prezzi" : "true",
  "stampa_qrcode" : "true",
  "stampa_solo_prodotti" : "false",
  "stampa_start_test" : "false",
  "stampa_totali" : "true",
  "stampante_address" : "00:00:00:00:00:00",
  "stampante_nome" : "BlueTooth Printer",
  "tipo_dispositivo" : "Tablet",
  "tipo_dispositivo_footer_altezza" : "95",
  "tipo_dispositivo_footer_padding" : "5",
  "tipo_dispositivo_height" : "xxxxxx",
  "tipo_dispositivo_width" : "xxxxxx",
  "tipo_ordine":"Master,Asporto,Domicilio,Tavolo,Prodotti,Ombrellone",
  "tipo_suoneria" : "Napoli",
  "tipo_visualizzazione" : "false",
  "view_storico" : "true",
  "web_sms" : "http://u90980.smstools.it/user/orderInit.ic",
  "webpage" : {
    "Acquista Punti-SMS" : "https://www.cittacoupon.it/utenti-aziende/14tablet_page47/******/compra-sms.html",
    "Apri-Chiudi Negozio" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/orari_chiusura.html",
    "Manuale Istruzioni" : "https://www.cittacoupon.it/manuali/appstream/tablet/index.html",
    "OnOff Aggiunte" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/aggiunte_database.html",
    "OnOff Prodotti" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/prodotti_database.html",
    "Storico Ordini" : "https://www.cittacoupon.it/utenti-delivery/14tablet_page47/******/storico-ordini.html"
  }
  
}
var default_value_config=
{
  "api_key" : "8vfhHKD75dk",
  "api_path" : "/delivery/notify.php?",
  "api_path_keystore" : "/update_uid.php?",
  "api_url" : "https://dalm596ei.cittacoupon.it",
  "web_sms" : "http://u90980.smstools.it/user/orderInit.ic",
  "webpage" : {
    "Acquista Punti-SMS" : "https://www.cittacoupon.it/utenti-aziende/14tablet_page47/******/compra-sms.html",
    "Apri-Chiudi Negozio" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/orari_chiusura.html",
    "Manuale Istruzioni" : "https://www.cittacoupon.it/manuali/appstream/tablet/index.html",
    "OnOff Aggiunte" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/aggiunte_database.html",
    "OnOff Prodotti" : "https://dalm596ei.cittacoupon.it/delivery/14tablet_page47/******/prodotti_database.html",
    "Storico Ordini" : "https://www.cittacoupon.it/utenti-delivery/14tablet_page47/******/storico-ordini.html"
  },
  "z_aggiungi_campo1":"xxxx",
  "z_aggiungi_campo2":"xxxx"
  
}


  var default_credito={
      "sms":"0",
      "valore":"0",
      "punti":"0"      
    }
  var ff="false"
       function obsolete_data_cancel(config){
        for(a in config){                
        if(typeof config[a] === "object"){
        var config_2=config[a];var default_config_2=default_config[a]
        for(var a1 in config_2){    
        if(config_2[a1]){
        if(!default_config_2[a1]){
        db.ref("config/"+uid+"/webpage/"+a1).remove()
        ff="true"
        }}}
        }else{ 
        if(!default_config[a]){
        db.ref("config/"+uid+"/"+a).remove()
        ff="true"
        }}}
        if(ff=="true"){app.ShowPopup("Cancellazione dati obsoleti!! RESTART..");app.Exit() }
       }