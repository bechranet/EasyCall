//********************************************  MULTI DISPOSITIVO

    var riepilogo_asporto,riepilogo_costo_asporto,riepilogo_domicilio,riepilogo_costo_domicilio;
    var riepilogo_altavolo,riepilogo_costo_altavolo,riepilogo_prodotti,riepilogo_costo_prodotti;
    var riepilogo_ombrellone,riepilogo_costo_ombrellone,riepilogo_costo_totale;
    var riepilogo_delivery,riepilogo_costo_delivery,riepilogo_annullato,riepilogo_costo_annullato;
    var is_status_in_consegna,is_status_in_arrivo;
    var ll,r,data_print_wifi;
    var tempo_max_avvio_call,TIME_CHECK;
    

        
app.Script( "QRCode.js",true);
 
app.LoadScript("db_init.js")

 

    sns = app.CreateSensor( "Light" );
    sns.SetOnChange( sns_OnChange );
    sns.Start(); 
    sns.PrevLvl = 0;
    //app.SetScreenBrightness( 6429 * 0.00066 );
 
    function OnStart()
    {
    app.PreventWifiSleep ()  
    app.SetOrientation( "Portrait" );  
    app.PreventScreenLock( true );  
    app.PreventScreenLock(!0)   
    app.EnableBackKey( false );
    app.GetSpecialFolder("Firebase")
 
 
 var splash = app.CreateLayout("Linear", "VCenter,FillXY");
  splash.SetBackColor("#ffffff");
  var img = app.CreateImage("Img/logas.png", 1, -1);
  img.SetOnLongTouch(resetTab);
  splash.AddChild(img);
  app.AddLayout(splash);
  
  
  function goerror(error){      
  app.ShowPopup( "Error Connection!!" );
  var r = confirm("Attenzione!! Connessione Internet assente \n  premere OK per uscire  \n  Annullare per Attendere")
  if(r == true){app.Exit()}else{
  app.ShowProgress( "Connessione DataCloud  in corso..Attendere Prego");
  setTimeout( "app.HideProgress()", 7000 );
  } 
  }
  
  
      
      
      
 var firebaseConfig = JSON.parse(app.ReadFile("set.json"));

/*
     var firebaseConfig = {
    apiKey: "AIzaSyDXJ8lzFyfbDRPg7hyq4w2BM_Yo4UvF_go",
    authDomain: "cloudmex.firebaseapp.com",
    databaseURL: "https://cloudmex.firebaseio.com",
    projectId: "cloudmex",
    storageBucket: "cloudmex.appspot.com",
    messagingSenderId: "875422928506",
    appId: "1:875422928506:web:95f9c63d2f17b23989b5c3"
  };

    */


   //firebaseConfig = JSON.parse(firebaseConfig)
   
  
           
   app.Script("Firebase/app.js",true);
   app.Script("Firebase/database.js",true);
   app.Script("Firebase/auth.js",true);

 
   
  
   
   
   firebase.initializeApp(firebaseConfig);
   


   
  
  
  db = firebase.database();
  auth = firebase.auth();
  db.goOffline();   //funzione di comando per inserire il db online o offline 
  ConnectFFT();
  CreateListeners(); 
  
  function restart(){
//app.Alert('restart')
auth.onAuthStateChanged(OnAuth);
  //On connect/disconnect.
  db.ref(".info/connected").on("value", OnConnectionChange);
     }


function Connect(){
 //app.Alert('connect')
 auth.signInWithEmailAndPassword(idAPP+"@visualcode.cloud", encryptedId).catch(function (e){});

}



function CreateListeners(){   
    //console.log('go listner*********************************")
//app.Alert( "keystore :  " +keystore_master+"   "+keystore_slave);
  auth.onAuthStateChanged(OnAuth);
  //On connect/disconnect.
  db.ref(".info/connected").on("value", OnConnectionChange);
  }
 
  function ConnectFFT(){    
   // app.Alert('ConnectFFT')    
  auth.createUserWithEmailAndPassword(idAPP+"@visualcode.cloud", encryptedId).then(OnAuth)
  .catch(error => {
     if(error.code=='auth/email-already-in-use')
          Connect();
       else if(error.code=='auth/invalid-email')
          console.log(`Email address is invalid.`);
        else if(error.code=='auth/operation-not-allowed')
          console.log(`Error during sign up.`);
        else if(error.code=='auth/weak-password')
          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
        else
        //alert(error.code)
          console.log(error.code);
  });
}

function OnAuth(user){
  //  console.log('go auth********************************************************')
 //app.Alert( "onauth   "+user.uid );

if (user && uid === user.uid) {
    return;
  }

 db.ref('ordini_in_arrivo/'+uid).off();

  if(user!=null){
//  app.Alert( "user ok : "+user.id );
  uid = auth.currentUser.uid;
    db.goOnline();         
    
    app.HideProgress()
    app.RemoveLayout( splash );
    app.DestroyLayout( splash );
    
    //****************************************** update uid per tabella master ********
    //app.HttpRequest( "GET","https://dalm596ei.visualcode.cloud/update_uid.php?uid="+uid+"&api_key=8vfhHKD75dk", null, null, handleReply_master ); 
    //****************************************** update uid per tabella master ********
    
// *************** controllo versione app e valore punti***************************
    db.ref("comm").once("value",
    function(comm){
    comm=comm.val()
    for(a in comm){ 
        
   if(a=='valore_punti'){
   valore_punti=comm['valore_punti'];
   valore_punti_ordini_tavolo=comm['valore_punti_ordini_tavolo'];
   tempo_max_avvio_call=comm['tempo_max_avvio_call'];
   //alert(valore_punti)
   }
        
 if(comm['version'] < versione_app){
 	var aggiorna =	app.CreateYesNoDialog( "Attenzione!! Quest'APP ha bbisogno di un aggiornamento,vuoi procedere?" );
		aggiorna.SetOnTouch( function( reply ) {
			if( reply == "Yes" ) {
			dwn();
				//app.ShowPopup( 'aggiorno' );
				}
				else{ app.ShowPopup( 'Aggiornamento Rimandato' );}
		} );
		aggiorna.Show();
} 
}
 })
// *************** controllo versione app ***************************
    

// *************** DB-CONFIGURAZIONI **************************
    db.ref("config/"+uid).once("value",
    function(config){
    config = config.val()  
    if(config==null){
    db.ref("config/"+uid).update(default_config)
    alert("E' stato eseguito un aggiornamento del MASTER-DataBase, per rendere le modifiche esecutive questa applicazione sarà riavviata!!") 
    app.Exit()
    }else{upgradeStatus=db_init(config)
    if(upgradeStatus=="true"){
    alert("E' stato eseguito un aggiornamento del UPGRADE-DataBase, per rendere le modifiche esecutive questa applicazione sarà riavviata!!") 
    app.Exit()
    }
    
    
    }  
    for(a in config){    
    
    /*
    //CANCELLA CAMPI OBSOLETI DB    
    if(!default_config[a]){
    db.ref("config/"+uid+"/"+a).remove()
    }    
    //CANCELLA CAMPI OBSOLETI DB
   */
   
    // crea tab credito
     db.ref("credito/"+uid).once("value",
    function(credito){
    credito = credito.val()
    if(credito==null){
    db.ref("credito/"+uid).update(default_credito)
    alert("E' stato eseguito un aggiornamento del ADD-DataBase, per rendere le modifiche esecutive questa applicazione sarà riavviata!!") 
    app.Exit()
    }else{/*future upgrade tab credito*/} 
    for(as in credito){
    if(as=="punti"){creditoPunti=credito["punti"]}
    if(as=="sms"){creditoSms=credito["sms"]}
    }    
    })
    // crea tab credito
    
    
 // *************** DB-CONFIGURAZIONI **************************   
    
    datas[a]=config[a]

     if(a == "1_color_header"){
    app.SaveText("color_head",config["1_color_header"])
    $("#color_banner_up").css("background-color",config["1_color_header"])
    }
    
     /* 
   if(a=="2_nome_azienda"){ 
   document.getElementById("nome_azienda").innerHTML = config['2_nome_azienda'];
   }
   */
    
    if(a == "3_color_footer"){ 
   app.SaveText("color_footer",config["3_color_footer"])
   $("#footer").html(footer_in_arrivo)
   $("#footer").show()
   $("#footer_color").css("background-color",config["3_color_footer"])
   //$("#footer_color").css("border-style","solid")
   //$("#footer_color").css("border-color","#000000")
    }
    
    if(a == "4_on_button"){
    app.SaveText("on_button",config["4_on_button"])
    }
    
    if(a == "5_off_button"){
    app.SaveText("off_button",config["5_off_button"])
    }
    
    if(a == "6_icon_color"){
    app.SaveText("icon_color",config["6_icon_color"])
    }
    
    if(a == "7_text_color"){
    app.SaveText("text_color",config["7_text_color"])
    }
    
    if(a == "8_border_color"){
    app.SaveText("boder_color",config["8_border_color"])
    }
    
   
    
    
    if(a == "1x_tipo_dispositivo"){}
   
  // *************** controllo TIPO USER ***************************
   if(a=="2x_tipo_user"){ 
   tipo_user=config['2x_tipo_user'];  
   if(tipo_user =="premium"){document.getElementById("punti_azienda").innerHTML = "<strong>EASYCALL</strong>";}
   else{document.getElementById("punti_azienda").innerHTML = "<strong>"+creditoPunti+"</strong> Punti";}
   //console.log("****************************  2")
   }
// **************** controllo TIPO USER  ***************************
    
   
   
    
   
    
   if(a == "0_start"){
     //  console.log("****************************  0")
   app.HideProgressBar();
   $("#color_banner_up").show()
   $("#xmain").show()
   //app.LoadScript('test_conn.js');
   
   app.LoadScript( 'setting.js' );
   app.LoadScript( 'messaggi_notifica.js');
   app.LoadScript( 'keystore.js');
   app.LoadScript("notifiche.js" );
   //app.LoadScript("print_new.js")
    
    aggiornami = {api_id:idAPP,app_version:versione_app,online: moment().format("DD/MM/YYYY HH:mm")};
    db.ref("config/"+uid).update(aggiornami).then(OnSuccessSend).catch(OnFailedSend);      
    }
  
  
  
    if(a=="00_debug") {
        if(datas['00_debug']=="false" ){
            app.SetOnError(goerror)
        }else{app.ShowPopup("Debug Mode");}
    }
    
    
     if(a == "00_footer_button_tools"){   
         footer_button_tools=config["00_footer_button_tools"]
        if(footer_button_tools == "true"){    
           // console.log(" ****************************  button ")
        app.SetScreenMode( "Full");app.SetScreenMode( "Game" )
        }
        }
     
     if(a=="00_status") {
         if(datas['00_status']=="false" ){
             alert("Dispositivo: "+idAPP+" non autorizzato!! \n contattare il nostro servizio tecnico \n per ulteriori dettagli. Grazie")          
             app.Exit()
             }
     }
     
     
    // WIFI PRINTER ************************************************
     if(a=="print_tipo_connessione") {
         print_tipo_connessione=config["print_tipo_connessione"]
        console.log("print_tipo_connessione : "+print_tipo_connessione)
          if(print_tipo_connessione == "wifi"){       
    net = app.CreateNetClient( "TCP,Raw" );  
	net.SetOnConnect( net_OnConnect);
	} 
     }
   
   if(a=="print_wifi_00") { print_0=datas['print_wifi_00'].split(",")}
     if(a=="print_wifi_01") { print_1=datas['print_wifi_01'].split(",")}
       if(a=="print_wifi_02") { print_2=datas['print_wifi_02'].split(",")}
           if(a=="print_wifi_03") { print_3=datas['print_wifi_03'].split(",")}
               if(a=="print_wifi_04") { print_4=datas['print_wifi_04'].split(",")}
                   if(a=="print_wifi_05") { print_5=datas['print_wifi_05'].split(",")}
                      if(a=="print_wifi_qta"){
                        if(datas['print_wifi_qta'] <2){prt=1}else{prt=2}
                      }
    // WIFI PRINTER ************************************************ 
     
    
     
     
     if(a=="webpage") {
      //  console.log("  ************  web page "+config[a])
        webpage = config[a]
        for(page in webpage){
       // console.log("**********  page : "+page+"  url: "+webpage[page])
        data_page[page]=webpage[page];
    
        }
    }
    
    
//if(a=="tipo_dispositivo_footer_altezza") {app.SaveNumber( "footer_altezza", datas['tipo_dispositivo_footer_altezza'] );}
//if(a=="tipo_dispositivo_footer_padding") {app.SaveNumber( "footer_padding", datas['tipo_dispositivo_footer_padding'] );}
        
             }//********
             
             
             

    
    test_conn()
    
    
      })  
      
      
  
   if(test_conn){


   //for(f in result){alert(f+"   "+result[f])}
  
      if(dispositivo=="Tablet"){     
      db.ref("config/"+uid).update({"tipo_dispositivo":dispositivo,"tipo_dispositivo_height":height_hw,"tipo_dispositivo_width":width_hw})
      }else{
      dispositivo="Unico"
      db.ref("config/"+uid).update({"tipo_dispositivo":dispositivo,"tipo_dispositivo_height":height_hw,"tipo_dispositivo_width":width_hw})
      }
   

   
   
//**********************************************************************    
//********************** CONTROLLO CREDITO *****************************
//**********************************************************************
    db.ref("credito")
	.child(uid)
	.on("value",function(credito){    
    var credito  = credito.val()  
    for(a in credito){       
    if(a =="punti"){
        if(tipo_user !="premium"){
        document.getElementById("punti_azienda").innerHTML = "<strong>"+credito["punti"]+"</strong> Punti";
        //app.ShowPopup(" credito: "+crd[a])
        creditoPunti=credito["punti"];
         }   
         }  
    if(a =="sms"){ 
        //document.getElementById("punti_azienda").innerHTML = "<strong>"+credito["sms"]+"</strong> Punti";
        //app.ShowPopup(" credito: "+crd[a])
        creditoSms=credito["sms"];
    }
    }
    })
//**********************************************************************    
//********************** CONTROLLO CREDITO *****************************
//**********************************************************************

//**********************************************************************    
//********************** CONTROLLO RIDERS ******************************
//**********************************************************************
   
 //  alert("uid:"+uidU+"    idAPP:"+idAPPU+"    id_rider:"+id_rider)
   
	db.ref("rider/"+uidU+"/"+idAPPU+"/"+id_rider).once("value",
    function(rider){    
    rider = rider.val()   
    for(a in rider){       
   rider_data[a]=rider[a]
   //alert(rider_data[a])  
       }
        })
//**********************************************************************    
//********************** CONTROLLO RIDERS ******************************
//**********************************************************************


//*************ORDINI ANNULLATO******************************

    db.ref("ordini_annullato/"+uid).orderByChild('id_ordine').on("child_added",
    function(oa,id){    
    oa = oa.val()   
  //  alert("  start oc "+oc)
    for(a in oa){       
    if(a  == "id_ordine"){ 
   
    tipo=select_tipo("ordini_annullato",parseInt(oa["ordine_tipo"]))  
    
    var pass="no"
        if(stsMua=="false"){pass="yes"}
        if(stsMua=="true"){
        if(num_mur=="Master"){pass="yes"}      
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// ASPORTO
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// DOMICILIO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// TAVOLO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRODOTTI}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// OMBRELLONE}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRENOTAZIONE}
        }
        
        if(pass=="yes"){ 
     
   
   // alert("  oc -> "+oic['id_ordine'])
$("#rx_annullato").prepend('<tr id="'+oa['id_ordine']+'" '+
'onclick="dettaglio_storico(this.id,4)">'+
'<td>'+
'<div class="col" style="padding-top: 0px;'+
'border-style: '+border_style+
';margin-bottom: -20px;">'+
'<h4 style="color: rgb(0,123,255);border-style: none;'+
'border-color: rgba(1,164,225,0);text-align: center;">'+
'<button id="notyr-'+oa['id_ordine']+ '"; class="btn btn-primary" '+
'type="button" style="font-size: 12px;color: rgb(1,1,1);'+
'background-color: rgb(255,255,255);border-width: 1px;'+
'border-color: rgb(7,7,7);box-shadow: 0px 0px 7px rgb(62,140,228);">'+

'<i class="fa fa-check" style="font-size: 12px;"></i>&nbsp;ID Ordine&nbsp;'+
'<strong>'+oa["id_ordine"]+'&nbsp; </strong>del &nbsp;<strong>'+oa["data_ordine"]+'</strong></button></h4>'+
'<h4 class="text-body" style="font-size: 12px;text-align: center;">'+oa["nome"]+' '+oa["cognome"]+'</h4>'+
'<p class="text-center" style="font-size: 12px;'+
'background-color: rgba(0,0,0,0);'+tipo["style_oia"]+
'padding-left: 0px;padding-top: 0px;'+
'margin-bottom: 0px;margin-top: 0px;">'+

'<img width="'+iconpx+'" height=" '+iconpx+' " src='+tipo["tipo"]+'><strong>  ANNULLATO</strong></p>'+

//'<strong>ANNULLATO '+tipo['tipo']+'</strong></p>'+

'<p style="font-size: 12px;margin-bottom: 0px;margin-top: 0px;'+
'text-align: center;padding-top: 0px;">Tot. Importo <strong>'+oa['totale_ordine']+'</strong>€</p>'+

//'</div>'+
'</div></div>'+
'</td></tr>')
  }// IF SELECT ORDER 
   }
    }
  })  

//*************ORDINI CONSEGNATI******************************

    db.ref("ordini_consegnato/"+uid).orderByChild('id_ordine').on("child_added",
    function(oc,id){    
    oc = oc.val()   
  //alert("  start oc "+oc)
    for(a in oc){       
    if(a  == "id_ordine"){ 
   
   tipo=select_tipo("ordini_consegnato",parseInt(oc["ordine_tipo"]))  
   
    var pass="no"
        if(stsMua=="false"){pass="yes"}
        if(stsMua=="true"){
        if(num_mur=="Master"){pass="yes"}      
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// ASPORTO
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// DOMICILIO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// TAVOLO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRODOTTI}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// OMBRELLONE}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRENOTAZIONE}
        }
        
        if(pass=="yes"){ 
   
   // alert("  oc -> "+oic['id_ordine'])
$("#rx_consegnato").prepend('<tr id="'+oc['id_ordine']+'" '+
'onclick="dettaglio_storico(this.id,3)">'+
'<td>'+
'<div class="col" style="padding-top: 0px;'+
'border-style: '+border_style+
';margin-bottom: -20px;">'+
'<h4 style="color: rgb(0,123,255);border-style: none;'+
'border-color: rgba(1,164,225,0);text-align: center;">'+
'<button id="notyr-'+oc['id_ordine']+ '"; class="btn btn-primary" '+
'type="button" style="font-size: 10px;color: rgb(1,1,1);'+
'background-color: rgb(255,255,255);border-width: 1px;'+
'border-color: rgb(7,7,7);box-shadow: 0px 0px 7px rgb(62,140,228);">'+

'<i class="fa fa-check" style="font-size: 12px;"></i>&nbsp;ID Ordine&nbsp;'+
'<strong>'+oc["id_ordine"]+'&nbsp; </strong>del &nbsp;<strong>'+oc["data_lavorazione"]+'</strong></button></h4>'+
'<h4 class="text-body" style="font-size: 12px;text-align: center;">'+oc["nome"]+' '+oc["cognome"]+'</h4>'+
'<p class="text-center" style="font-size: 12px;'+
'background-color: rgba(0,0,0,0);'+tipo["style_oia"]+
'padding-left: 0px;padding-top: 0px;'+
'margin-bottom: 0px;margin-top: 0px;">'+

'<img width="'+iconpx+'" height=" '+iconpx+' "  src='+tipo["tipo"]+'><strong>  CONSEGNATO</strong></p>'+


//'<strong>CONSEGNATO '+tipo['tipo']+'</strong></p>'+

'<p style="font-size: 12px;margin-bottom: 0px;margin-top: 0px;'+
'text-align: center;padding-top: 0px;">Tot. Importo <strong>'+oc['totale_ordine']+'</strong>€</p>'+

//'<h4 style="text-align:center">Monitor Consegna</h4>'+
//'<div id="delivery-'+oc["id_ordine"]+'"; class="slidecontainer">'+
//'<input disabled type="range" min="1" max="100" value="'+oc['delivery']+'" class="slider" >'+
//'<p>Distanza: <span id="distanza-'+oc["id_ordine"]+'";>'+oc['delivery']+'%</span></p>'+


'</div></div>'+
'</td></tr>')
    
  }// IF SELECT ORDER
    }
      }
  })  




//************** ORDINI IN CONSEGNA *****************************

    db.ref("ordini_in_consegna/"+uid).orderByChild('id_ordine').on("child_added",
    function(oic,id){    
    oic = oic.val()   
  //  alert("  start oic "+oic)
    for(a in oic){       
    if(a  == "id_ordine"){ 
   
     tipo=select_tipo("ordine_in_consegna",parseInt(oic["ordine_tipo"]))  
 
     
  
     
     
     // console.log("***********************   t_percorso : "+t_percorso)
     
      // app.ShowPopup("t_percorso: "+t_percorso)
      
   
        var pass="no"
        if(stsMua=="false"){pass="yes"}
        if(stsMua=="true"){
        if(num_mur=="Master"){pass="yes"}      
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// ASPORTO
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// DOMICILIO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// TAVOLO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRODOTTI}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// OMBRELLONE}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRENOTAZIONE}
        }
        
        if(pass=="yes"){ // IF SELECT ORDER
        
        //alert("   data  "+oic['delivery']+"   "+oic["id_ordine"])
        
    t_distanza = oic['distanza']
 
    t_percorso_start=getGPS_distanza(datas["lat_base"],datas["lng_base"],oic['lat'],oic['lng'])
    
    t_percorso=getGPS_distanza(oic['lat_rider'],oic['lng_rider'],oic['lat'],oic['lng'])
     
    t_percorso_reale=((t_distanza/1000) * t_percorso)/(t_percorso_start/1000)
    t_percorso_reale=parseFloat(t_percorso_reale).toFixed(0)
    
    t_percorso_reale =- t_percorso_reale
    //t_percorso =-            t_percorso;
    t_distanza =-             t_distanza
    
     // alert("0) inarrivo* attesa risposta rider: "+oic['delivery_accept']+"   t_percorso : "+t_percorso   )
   
    if(oic['delivery_accept'] == "attend"){
        // alert("1) inarrivo* attesa risposta rider: "+oic['delivery_accept']+"   t_percorso : "+t_percorso   )
       distanzaKM="In attesa di risposta..";
       misura="";
       //t_percorso_reale=t_distanza
    }else{
       distanzaKM=oic['distanza_google'];
      // alert("2) inarrivo* attesa risposta rider: "+oic['delivery_accept']+"   t_percorso : "+t_percorso   )
         }
            
         
    if(isNaN(t_percorso) && oic['delivery_accept'] == "ok"){
    distanzaKM="In attesa posizione Rider..";
    misura=""; 
    //   t_percorso_reale=t_distanza
    //alert("1) inarrivo* attesa posizione rider: "+oic['delivery_accept']+"   t_percorso : "+t_percorso   )
    }
   
   
   
   
   //app.ShowPopup("#1:  P:"+t_percorso+"  D:"+t_distanza)

$("#rx_in_consegna").prepend('<tr id="'+oic['id_ordine']+'" '+
'onclick="dettaglio_ordini(this.id,2,0)">'+
'<td>'+
'<div class="col" style="padding-top: 0px;'+
'border-style: '+border_style+
';margin-bottom: -20px;">'+

'<h1 style="color: rgb(0,123,255);border-style: none;'+
'border-color: rgba(1,164,225,0);text-align: center;">'+
'<button id="notyr-'+oic['id_ordine']+ '"; class="btn btn-primary" '+

'type="button" style="font-size: 10px;color: rgb(1,1,1);'+
'background-color: rgb(255,164,48);border-width: 1px;'+
'border-color: rgb(7,7,7);box-shadow: 0px 0px 7px rgb(62,140,228);">'+
'<i class="fa fa-check" style="font-size: 12px;"></i>&nbsp;ID Ordine&nbsp;'+
'<strong>'+oic["id_ordine"]+'&nbsp; </strong>del &nbsp;<strong>'+oic["data_lavorazione"]+'</strong></button></h4>'+


'<h4 class="text-body" style="font-size: 14px;text-align: center;">'+oic["nome"]+' '+oic["cognome"]+'</h4>'+

'<p id="status-'+oic["id_ordine"]+'";  class="text-center" style="font-size: 12px;'+
'background-color: rgba(0,0,0,0);'+tipo["style_oia"]+
'padding-left: 0px;padding-top: 0px;'+
'margin-bottom: 0px;margin-top: 0px;">'+

'<img width="'+iconpx+'" height=" '+iconpx+' "  src='+tipo["tipo"]+'><strong> Ordine in  CONSEGNA</strong></p>'+


//'<strong>IN CONSEGNA '+tipo['tipo']+'</strong></p>'+

'<p style="font-size: 12px;margin-bottom: 0px;margin-top: 0px;'+
'text-align: center;padding-top: 0px;">Tot. Importo <strong>'+oic['totale_ordine']+'</strong>€</p>'+

//'<h4 style="text-align:center">Monitor Consegna</h4>'+
'<div id="delivery-'+oic["id_ordine"]+'"; class="slidecontainer">'+
'<p id="distanza-'+oic["id_ordine"]+'";>'+distanzaKM+

'<input disabled type="range" min="'+t_distanza+'"  max="0" value="'+t_percorso_reale+'" class="slider" ></p>'+

//'<input disabled type="range" min="-5000"  max="0" value="8" class="slider" >'+

'</div></div>'+

'</td></tr>')

    //console.log("-->> ordine: "+oic['id_ordine']+"  distanza: "+oic['distanza'])
   
   // alert(" in arrivo******* t_percorso_reale:"+t_percorso_reale)
 
         
    

  
    if(t_percorso_reale > distanza_notifica && oic['delivery_accept']=="ok"){
         $("#notyr-"+oic['id_ordine']).addClass("pulse animated infinite")
    $("#notyr-"+oic['id_ordine']).css("background-color","#3ded11")
    
      //  alert(" distanza_notifica notifica:"+t_percorso_reale)
    }else{
        // alert(" +400 notifica:"+t_percorso_reale)
    $("#notyr-"+oic['id_ordine']).css("background-color","#fcdb03")
   
       
        }


    
  }// IF SELECT ORDER
    }
      }
 
  })  
  
//************** ORDINI IN CONSEGNA RIMUOVI********************** 
  
   db.ref("ordini_in_consegna/"+uid).on("child_removed",
    function(data,id){    
    val = data.val()   
   // console.log("id *******"+id)
    for(a in val){
    //console.log(" row : "+a+" : "+val[a])//key
    if(a  == "id_ordine"){
    //app.ShowPopup( "remove" );
     $("#"+val['id_ordine']).remove();
    }}
    })

//*************ORDINI IN CONSEGNA DELIVERY***********************

    db.ref("ordini_in_consegna/"+uid).orderByChild('id_ordine').on("child_changed",
    function(oic,id){    
    oic = oic.val()   
  //alert("  start oic "+oic)
    for(a in oic){       
   //if(a  == "id_ordine"){ 
    if(a =="delivery"){
    //console.log('delivery : '+oic['delivery']+'   id order : '+oic['id_ordine']+'   tag : '+a)
    
    //t_percorso=oic['distanza']-oic['delivery']   
  
    var status_noty=oic['status_notifica']
    t_distanza = oic["distanza"]
    
    t_percorso_start=getGPS_distanza(datas["lat_base"],datas["lng_base"],oic['lat'],oic['lng'])
    t_percorso=getGPS_distanza(oic['lat_rider'],oic['lng_rider'],oic['lat'],oic['lng'])
    t_percorso_reale=((t_distanza/1000) * t_percorso)/(t_percorso_start/1000)
    t_percorso_reale=parseFloat(t_percorso_reale).toFixed(0)
    
    //alert("1-DELIVERY********* percorso: "+t_percorso_reale+"    status_noty: "+status_noty+"    distanza: "+t_distanza)
    
    t_percorso_reale =- t_percorso_reale
    t_distanza =- t_distanza
    
    //alert("check-DELIVERY*********> distanza_notifica: "+distanza_notifica+"   percorso: "+t_percorso_reale+"    status_noty: "+status_noty+"    distanza: "+t_distanza)
     
    if(t_percorso_reale > distanza_notifica && !status_noty){ // percorso notifica rider in arrivo
    
    // alert("delivery******* distanza_notifica notifica:"+t_percorso_reale)
   
    //app.ShowPopup( "Notifica in corso. Attendere Prego.." );   
    
    $("#notyr-"+oic['id_ordine']).addClass("pulse animated infinite")
    $("#notyr-"+oic['id_ordine']).css("background-color","#3ded11")
 
    
    url="https://dalm596ei.visualcode.cloud"
    path="/delivery/notify-rider.php?"
    api_key="8vfhHKD75dk"
    tipo="300" 
    id_clienti="78sdv%gsd$DFgh"
    id_utente="rider"
    send_type="3"   //1=sms  2=email 3=tutto
    id_ordine=oic['id_ordine']
    messaggio="Preparati!! il tuo ordine a domicilio  in arrivo, tra pochi minuti siamo a casa tua. Grazie"
    times = setTimeout(http_stop_timer, 11000) 
    var params = "api_key=" + api_key + "&id_clienti=" + id_clienti + "&id_utente=" +id_utente+ "&tipo="+tipo+"&send_type="+send_type+"&id_ordine="+id_ordine;  
    //alert(params)
    var send_web = url+path+params;  
    //alert("send_web  "+send_web)
    //app.ShowPopup("distanza di avviso cliente!!")
    app.HttpRequest( "get", send_web, null, null, res_noty )
    
    }// invio messaggio sono in arrivo!!
  
  
    //alert("0) delivery* t_percorso: "+t_percorso+"    oic['delivery_accept']: "+oic['delivery_accept'])
  
    if(isNaN(t_percorso) && oic['delivery_accept'] == "ok"){
    distanzaKM="In attesa posizione Rider..";
    misura="";
    //t_percorso_reale=0;     
    
    //alert("1) DELIVERY*   t_percorso: "+t_percorso+"    oic['delivery_accept']: "+oic['delivery_accept'])
    }else{
       distanzaKM=oic['distanza_google'];
      //  alert("2) DELIVERY*   t_percorso: "+t_percorso+"    oic['delivery_accept']: "+oic['delivery_accept'])
    
         }
             
      }
       
      }
      
  
    
    
    $("#delivery-"+oic['id_ordine']).html( '<p>'+distanzaKM+
    '<input disabled type="range" min="'+t_distanza+'"  max="0"  value="'+t_percorso_reale+'" class="slider" ></p>') 
 
      


  })  




//***************** ORDINI IN ARRIVO **************************    
    db.ref("ordini_in_arrivo/"+uid).orderByChild('id_ordine').on("child_added",
    function(oia,id){    
    oia = oia.val()   
    //alert(" start oia "+oia)
    for(a in oia){     
          
    if(a  == "id_ordine"){ 
        
       
        TIME_CHECK=oia['data_ordine']
        
    //console.log("id_ordine  "+oia['id_ordine']+"   data_lavorazione "+oia['data_lavorazione']);    
    //array_ordini_in_arrivo.push({"id_ordine":oia['id_ordine'],"data_lavorazione":oia['data_lavorazione']});  
    //data_lavorazione=oia['data_ordine']
    
    data_lavorazione = moment(TIME_CHECK,'DD-MM-YYYY HH:mm') 
    data_adesso  = moment() 
    tempo_residuo=(data_lavorazione.diff(data_adesso, 'minutes')+tempo_max_avvio_call)    
    if(tempo_residuo<0){tempo_residuo=0}
    //app.Alert(" tempo_residuo : "+tempo_residuo)
    
        
    var valore_time='<i class="fa fa-hand-o-right" '+
    'style="font-size: 22px;"></i> '+
    'DaConsegnare entro il \n '+oia['data_lavorazione']
    
    
    if(oia['notifica_ordine'] == "attend"){
    notifica++;
      
    tipo=select_tipo('ordine_in_arrivo_read',parseInt(oia["ordine_tipo"])) 
        
        //alert("codice tipo:  "+tipo["codice_tipo"]+"tipo:  "+tipo["tipo"])
        
      //num_mur  variabile di selezione del tipo ordine coming soon
        var pass="no"
        if(stsMua=="false"){pass="yes"}
        if(stsMua=="true"){
        if(num_mur=="Master"){pass="yes"}      
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// ASPORTO
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// DOMICILIO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// TAVOLO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRODOTTI}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// OMBRELLONE}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRENOTAZIONE}
        }
        
        if(pass=="yes"){ 
            
   
     //console.log("---SEND ATTEND------------   "+oia["ordine_tipo"])
     //tipo=select_tipo('ordine_in_arrivo_read',parseInt(oia["ordine_tipo"])) 
     //console.log("---ATTEND------------   "+tipo_attend['tipo'])
   
    tipo_ordine_vocale=vocale_tipo(parseInt(oia["ordine_tipo"]))
    messaggi_notifica(tipo_ordine_vocale) //********************
    
    if(notifica==0){
    $("#counter-msg").hide()
    }else{
    $("#counter-msg").show()
    $("#counter-msg").text(notifica) 
    
      // BEEP ALARM
      clearInterval(beep_timer);
      beep_timer=0;
      beep_timer = setInterval(start_beep,5000);
      // BEEP ALARM
      
      
    }
    
    
     //if(datas['stampa_automatica']=="true"){console.log("print******************* "+oia['id_ordine'])}
    //alert("+++++++ "+datas['print_tipo_connessione'])

    
    if(tipo_user=="premium")
    {
    if(print_tipo_connessione=="wifi" && datas['stampa_automatica']=="true"){   
    read_header_print(oia['id_ordine'],"dettaglio","InArrivo")
    //net.Connect(print_0[3],print_0[2])
    }
    if(print_tipo_connessione=="bluetooth" && datas['stampa_automatica']=="true" ){print_bluetooth(oia['id_ordine'],"dettaglio","InArrivo")}
    }
    
    if(tipo_user != "premium" && creditoPunti>0 && notifica <= 5)
    {
    if(print_tipo_connessione=="wifi" && datas['stampa_automatica']=="true"){
    net.Connect(print_0[3],print_0[2])
    read_header_print(oia['id_ordine'],"dettaglio","InArrivo")
    if(print_tipo_connessione=="bluetooth" && datas['stampa_automatica']=="true" ){print_bluetooth(oia['id_ordine'],"dettaglio")}
    }
    }
     
   if(oia['delivery_costo']){
   oia['totale_ordine']=parseFloat(oia['totale_ordine'])+parseFloat(oia['delivery_costo'])
   }
   
   a  = moment(oia["data_stimata"],'DD-MM-YYYY HH:mm')
   b  = moment(oia["data_lavorazione"],'DD-MM-YYYY HH:mm')
  // console.log(" diff minuti : "+b.diff(a, 'minutes'))
   ritardo_=b.diff(a, 'minutes')
   
   //if(ritardo_ > 0 ){ritardo_="Ritardo di "+b.diff(a, 'minutes')+" minuti"}else{ritardo_=""}


if(datas["app_layout"]=="Large"){   
    
//*************************** ATTEND *******************************************
//*************************** ATTEND *******************************************
//*************************** ATTEND *******************************************

oia['totale_ordine']=parseFloat(oia['totale_ordine']).toFixed(2)
var view_ordine_in_arrivo='<tr id="'+oia['id_ordine']+'" onclick="dettaglio_ordini(this.id,1,1)">'+
'<td>'+ 
'<div class="col" style="text-align:center;padding-top: 160px;'+
'border-style: '+border_style+
';margin-bottom: -20px;">'+

'<button id="noty-'+oia['id_ordine']+ 
'" class="btn btn-primary pulse" '+
'type="button" style="font-size: 12px;color: #000000;margin-bottom: 5px;'+
'background-color: #e89607;border-width: 1px;'+
'border-color: rgb(7,7,7);box-shadow: 0px 0px 7px rgb(62,140,228);">'+

'<img width="'+iconpx+'" height="'+iconpx+'"  src='+tipo["tipo"]+'>'+

//'<strong>'+tipo["tipo"]+'</strong>'+


'&nbsp;&nbsp;'+
//'<strong>'+oia[ "id_ordine"]+'</strong>'+
'&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+oia["nome"]+' '+oia["cognome"]+'</strong>'+
'</button>'+

    '<div id="status_lavorazione_view-'+oia['id_ordine']+'"> '+ 
    '<p class="text-center" style="font-size: 12px;'+
    'background-color:'+oia["status_lavorazione_style"]+';color:#ffffff;'+
    'padding-left: 0px;padding-top: 0px;'+
    'margin-bottom: 0px;margin-top: 0px;">'+
    
    //'<span>'+oia["status_lavorazione"]+'  '+ritardo_+'</span><br>'+
  '<br>'+
  '<span><strong>&nbsp;Call Time: &nbsp; </strong>'+oia["data_ordine"]+'</span>'+
  '<br><br>'+
    //'<span>&nbsp;&nbsp;<strong>InConsegna: &nbsp;</strong>'+oia["data_lavorazione"]+'</span>'+
  //'&nbsp<i class="'+oia["status_lavorazione_icona"]+'" style="font-size: 12px;"></i>'+
  '</p>'+
  '</div>'+

'<div id="tempo_residuo-'+oia["id_ordine"]+'"; class="row" style="margin-top: 5px;">'+
'<div class="col" style="height: 18px;padding-right: 0px;padding-left: 0px;">'+
'<div class="slidecontainer">'+
'<input id="slider_range" disabled type="range" min="1" max="'+tempo_max_avvio_call+'" '+
'value="'+tempo_residuo+'" class="slider"></div>'+
'</div>'+
'<p id="tempo_residuo" style="color:#0a81a8;";>'+tempo_residuo+'Min</p>'+
'</div>'+


//'<p style="font-size: 16px;margin-bottom: 5px;margin-top: -20px;'+
//'text-align: center;padding-top: 0px;color:#09a5ed">Tot. Importo <strong>'+oia['totale_ordine']+'</strong>€'+
//'<span id="pagamento-'+oia['id_ordine']+'">&nbsp;&nbsp;&nbsp;&nbsp;Pagamento: <strong>'+oia['pagamento_stato']+'</strong></span>'+
//'</p>'+

'</td></tr>'
}

    
    if(datas["tipo_visualizzazione"]=="false")
    {
    $("#rx_in_arrivo").prepend(view_ordine_in_arrivo)
//    $("#time_delivery-"+oia['id_ordine']).text(oia['status_lavorazione']+" \n "+oia['data_lavorazione'])
    }else
    {
    $("#rx_in_arrivo").append(view_ordine_in_arrivo)
  //  $("#time_delivery-"+oia['id_ordine']).text(oia['status_lavorazione']+" \n "+oia['data_lavorazione'])
    }
    
    $("#noty-"+oia['id_ordine']).addClass("pulse animated infinite")    
  
        // })
     
     
     
    } // select pass
     
     
    }// attend
    
   //*************************** ATTEND *******************************************
   //*************************** ATTEND *******************************************
   //*************************** ATTEND *******************************************
  
   
   //*************************** READ   *******************************************
   //*************************** READ   *******************************************
   //*************************** READ   *******************************************
   
   if(oia['notifica_ordine'] == "read"){
 
   tipo=select_tipo('ordine_in_arrivo_read',parseInt(oia["ordine_tipo"]))
 
 //alert(tipo["tipo"])
 
    //alert("stsMua  "+stsMua)
    
        // Seltipo  variabile di selezione del tipo ordine coming soon
        var pass="no"
        if(stsMua=="false"){pass="yes"}
        
        if(stsMua=="true"){
        if(num_mur=="Master"){pass="yes"} 
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// ASPORTO
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// DOMICILIO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// TAVOLO}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRODOTTI}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// OMBRELLONE}
        if(tipo["codice_tipo"]==num_mur){pass="yes";}// PRENOTAZIONE}
        }
        
        if(pass=="yes"){

//console.log("---SEND-READ-----------   "+oia["ordine_tipo"]+" ID "+oia["id_ordine"])
//tipo=select_tipo('ordine_in_arrivo_read',parseInt(oia["ordine_tipo"]))
//console.log("---READ------------   "+tipo_read['tipo'])
           
if(notifica==0){$("#counter-msg").hide()}


if(oia['delivery_costo']){
   oia['totale_ordine']=parseFloat(oia['totale_ordine'])+parseFloat(oia['delivery_costo'])
   }

   a  = moment(oia["data_stimata"],'DD-MM-YYYY HH:mm')
   b  = moment(oia["data_lavorazione"],'DD-MM-YYYY HH:mm')
   ritardo_=b.diff(a, 'minutes')
    
    // if(ritardo_ > 0 ){ritardo_="+"+b.diff(a, 'minutes')+"min"}else{ritardo_=""}
    

//************************ READ ************************************************
//************************ READ ************************************************
//************************ READ ************************************************

if(datas["app_layout"]=="Large"){


    
    oia['totale_ordine']=parseFloat(oia['totale_ordine']).toFixed(2)
var view_ordine_in_arrivo_read='<tr id="'+oia['id_ordine']+'" onclick="dettaglio_ordini(this.id,1,0)">'+
'<td>'+ 
//'<div class="row"'+
'<div class="col" style="text-align:center;padding-top:10px;'+
'border-style: '+border_style+
';margin-bottom: -20px;">'+


'<button id="noty-'+oia['id_ordine']+ 
'" class="btn btn-primary pulse" '+
'type="button" style="font-size: 12px;color: #000000;margin-bottom: 5px;'+
'background-color: #ffffff;border-width: 1px;'+
'border-color: rgb(7,7,7);box-shadow: 0px 0px 7px rgb(62,140,228);">'+

'<img width="'+iconpx+'" height="'+iconpx+'"   src='+tipo["tipo"]+'>'+

//'<strong>'+tipo["tipo"]+'</strong>'+

'&nbsp;&nbsp;<strong>'+oia[ "id_ordine"]+'</strong>'+
'&nbsp;&nbsp;&nbsp;&nbsp;'+oia["nome"]+' '+oia["cognome"]+' '+
'</button>'+

'<div id="status_lavorazione_view-'+oia['id_ordine']+'"> '+ 
    '<p class="text-center" style="font-size: 12px;'+
    'background-color:'+oia["status_lavorazione_style"]+';color:#ffffff;'+
    'padding-left: 0px;padding-top: 0px;'+
    'margin-bottom: 0px;margin-top: 0px;">'+
    '<span>'+oia["status_lavorazione"]+'  '+ritardo_+'</span><br>'+
    '<span><strong>&nbsp;Ordinato: &nbsp; </strong>'+oia["data_stimata"]+'</span>'+
    '<span>&nbsp;&nbsp;<strong>InConsegna: &nbsp;</strong>'+oia["data_lavorazione"]+'</span>'+
  //'&nbsp<i class="'+oia["status_lavorazione_icona"]+'" style="font-size: 12px;"></i>'+
    '</p>'+
'</div>'+

'<div id="tempo_residuo-'+oia["id_ordine"]+'"; class="row" style="margin-top: 5px;">'+
'<div class="col" style="height: 18px;padding-right: 0px;padding-left: 0px;">'+
'<div class="slidecontainer">'+
'<input disabled type="range" min="1" max="100" '+
'value="'+tempo_residuo+'" class="slider"></div>'+
'</div>'+
'<p style="color:#0a81a8;";>'+tempo_residuo+'Min</p>'+
'</div>'+


//'<p style="font-size: 15px;margin-bottom: 10px;margin-top: -20px;'+
//'text-align: center;padding-top: 0px;color:#09a5ed">Tot. Importo <strong>'+oia['totale_ordine']+'</strong>€'+
//'<span id="pagamento-'+oia['id_ordine']+'"><br>&nbsp;&nbsp;&nbsp;&nbsp;Pagamento: <strong>'+oia['pagamento_stato']+'</strong></span>'+
'</p>'+

//'</div>'+

'</td></tr>'
}
//************************ READ ************************************************
//************************ READ ************************************************
//************************ READ ************************************************


if(datas["tipo_visualizzazione"]=="false"){
    $("#rx_in_arrivo").prepend(view_ordine_in_arrivo_read)
   // $("#time_delivery-"+oia['id_ordine']).text(oia['status_lavorazione']+" \n "+oia['data_lavorazione'])
}
    else{
    $("#rx_in_arrivo").append(view_ordine_in_arrivo_read)
//    $("#time_delivery-"+oia['id_ordine']).text(oia['status_lavorazione']+" \n "+oia['data_lavorazione'])
    }
    


//$("#noty-"+oia['id_ordine']).removeClass("pulse animated infinite") 
    
    } // select pass
    
        } // Read
    
   }}
       
         
      })  
 
  
  //****************************************************************************
  //****************** ORDINI IN ARRIVO REMOVED ********************************
  //****************************************************************************
  
    db.ref("ordini_in_arrivo/"+uid).on("child_removed",
    function(data,id){    
    val = data.val()   
   // console.log("id *******"+id)
    for(a in val){
    //console.log(" row : "+a+" : "+val[a])//key
    if(a  == "id_ordine"){
    //app.ShowPopup( "remove" );
     $("#"+val['id_ordine']).remove();
    
    //alert("remove "+val['id_ordine'])//************************
    
    }}
    })
    
  

  //****************************************************************************
  //******************* AGGIORNA ORDINI IN ARRIVO ******************************
  //****************************************************************************
  
    
    db.ref("ordini_in_arrivo/"+uid).on("child_changed",
    function(oia_changed){
       // if(all){console.log("scritto**********************")}
    oia_changed = oia_changed.val()   
   // app.ShowPopup(' change : '+val)
    for(a in oia_changed){
  
   // if(a  == "id_ordine"){ 
      //app.ShowPopup(' change a : '+a)        
    
    
    
    
    if(oia_changed["update"] == "notifica" && a == "notifica_ordine"  ){
    notifica = notifica-1     
  //  console.log("notifica_ordine ************  "+a+"   "+oia_changed["id_ordine"]+"  "+notifica)
    }else{if(notifica==0){
    $("#counter-msg").hide()}
    }
    
    if(notifica==0){$("#counter-msg").hide();clearInterval(beep_timer);beep_timer=0;}
    
    //alert('notifychangeRead************************************')
    $("#counter-msg").text(notifica)
   
  
  // array_ordini_in_arrivo.push({"id_ordine":oia_changed['id_ordine'],"data_lavorazione":oia_changed['data_lavorazione']});
  
   
    
     for(aa in array_ordini_in_arrivo){
     //console.log(" Array1 "+aa+"  "+array_ordini_in_arrivo[aa])
     arr1=array_ordini_in_arrivo[aa]
     for(ab in arr1){
     if(oia_changed["id_ordine"]==arr1["id_ordine"])     
    // console.log(" raay update aa "+aa+"  ab  "+ab+"  "+arr1["data_lavorazione"]+"   "+oia_changed["id_ordine"])   
     arr1["data_lavorazione"]=oia_changed["data_lavorazione"]
     }}
     
     time()
    
    //alert('changed')
    //console.log("status_lavorazione  "+oia_changed["status_lavorazione"]+"  data_lavorazione  "+oia_changed["data_lavorazione"])
    
   
      a  = moment(oia_changed["data_stimata"],'DD-MM-YYYY HH:mm')
      b  = moment(oia_changed["data_lavorazione"],'DD-MM-YYYY HH:mm')
    //console.log(" diff minuti : "+b.diff(a, 'minutes'))
      ritardo_=b.diff(a, 'minutes')
      if(ritardo_ > 0 ){ritardo_="<strong>+"+b.diff(a, 'minutes')+"</strong>"}else{ritardo_=""}

   //alert("test")
   
     //***************************************************************
     if(datas["app_layout"]=="Large"){      
     $("#status_lavorazione_view-"+oia_changed['id_ordine']).html('<p class="text-center" style="font-size: 12px;'+
    'background-color:'+oia_changed["status_lavorazione_style"]+';color:#ffffff;'+
    'padding-left: 0px;padding-top: 0px;'+
    'margin-bottom: 0px;margin-top: 0px;">'+
    '<span>'+oia_changed["status_lavorazione"]+'  '+ritardo_+'</span><br>'+
    '<span><strong>&nbsp;Ordinato: &nbsp; </strong>'+oia_changed["data_stimata"]+'</span>'+
    '<span>&nbsp;&nbsp;<strong>InConsegna: &nbsp;</strong>'+oia_changed["data_lavorazione"]+'</span>'+
  //'&nbsp<i class="'+oia["status_lavorazione_icona"]+'" style="font-size: 12px;"></i>'+
    '</p>')  
     $("#pagamento-"+oia_changed['id_ordine']).html('&nbsp;&nbsp;&nbsp;&nbsp;Pagamento: <strong>'+oia_changed['pagamento_stato']+'</strong>')     
     }
     //****************************************************************
     
     if(datas["app_layout"]=="Compact"){
     $("#status_lavorazione_view-compact-a-"+oia_changed['id_ordine']).html('<span class="d-md-flex pulse animated infinite" style="font-size: 14px;color: #e80707;font-weight: bold;">'+ritardo_+'</span>')
     $("#status_lavorazione_view-compact-b-"+oia_changed['id_ordine']).html('<div class="col-sm-12 d-sm-flex align-items-sm-center" style="text-align: left;font-size: 20px;padding-right: 0px;padding-left: 3px;">'+
    '<span style="font-size: 14px;">Richiesto</span>'+
    '<span style="color: rgb(33,37,41);'+
    'font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+oia_changed["data_stimata"]+'</span>'+
    '</div>')
     $("#status_lavorazione_view-compact-c-"+oia_changed['id_ordine']).html('<div class="col d-sm-flex align-items-sm-center" style="text-align: left;'+
    'font-size: 20px;color: #ffffff;padding-right: 0px;padding-left: 3px;">'+
    '<span style="text-align: left;color: #ffffff;padding-right: 10px;'+
    'font-size: 14px;font-weight: bold;">Consegna</span>'+
    '<span style="font-size: 14px;">'+oia_changed["data_lavorazione"]+'<br></span>'+
    '</div>')  
     $("#status_lavorazione_view-compact-c-"+oia_changed['id_ordine']).css("background-color",oia_changed["status_lavorazione_style"])
     $("#status_lavorazione_view-compact-d-"+oia_changed['id_ordine']).html(oia_changed["pagamento_stato"])
     }
   //*****************************************************************
     
    $("#noty-"+oia_changed['id_ordine']).removeClass("pulse animated infinite") 
    $("#noty-"+oia_changed['id_ordine']).css("background-color","rgb(255,255,255)") 
    
     //****************************************************************************
     //****************************************************************************
     //****************************************************************************
  
    
    
    
    //***********
    //***********
    
    
     // }  if idordine
        }
    })     
     
   }else{}

  
    } else {
  //app.Alert( "db offline" );
  
  db.goOffline();
  }
  

}
 
function OnConnectionChange(snap){
  connected = snap.val();
  //app.Alert('status : '+status); 
  if(connected){
 app.HideProgressBar();
     // web.LoadHtml(online ); 
   $("#status").html(online)

  //app.ShowPopup( "ok conn");

 if(uid && !listened){
  //Here we could listen also personal data
  //by calling db.ref("userspath/"+uid).on("value", callback);
  //because the uid is unick to each user.
  listened = true;
  }
   //  alert( "ko alert" );
  
  }else{
 // app.ShowPopup( "ko conn" );  
  

 $("#status").html(offline)
 
 
  // app.ShowPopup( "offline Connection status: "+(connected?"Online":"Offline") );
	 }
  
} 
 
 
    }

  





//**********************************************************************    
//********************** DETTAGLIO ORDINI ******************************
//**********************************************************************
    
    function dettaglio_ordini(id,dataPage,send_type){

   //alert("id: "+id+" datapage: "+dataPage+"  sendtype: "+send_type)
   //alert("dettaglio tavolo: "+tavolo)

var r=false
//if(creditoPunti<valore_punti){
    if(creditoPunti<valore_punti && tipo_user != "premium" && send_type==1){
  $.confirm({title: '<strong>Credito Insufficiente!!</strong>',content: 'per continuare ad usufruire del servizio effettua subito una ricarica',
    buttons: {
        Ricarica: function () {
            
           urlpage('Acquista Punti-SMS')
            
            return true;
            
        },Annulla: function(){return true}}})
        
}

    //if(creditoPunti >= valore_punti){
        if(creditoPunti >= valore_punti || tipo_user == "premium" || send_type != 1){

    page=dataPage 
   
    
    
    if(page==1){page_name="Ordine"}
    if(page==2){page_name="InConsegna"}
    if(page==3){page_name="Consegnato"}
    if(page==4){page_name="Annullato"}
    if(page==5){page_name="Storico"}
    

            
    var totale=0; 
    var aggiunte_prezzo=0
    var qta_prodotto=0
    var prezzo_prodotto=0
    var sub_totale_aggiunte=0
    var sub_totale_prodotti=0
    
    var sconto=0
    var costo_pay=0
    
    var stx=0
    
    db.ref("dettaglio_ordini").child("/"+uid+"/"+id).on("value",
    function(doia){ 
        
    stx++    
    if(stx==1){ //**********************   
        
    var doia  = doia.val()   
   
    view("dettaglio",id,page_name)
    
    for(a in doia){     
        
    if(a =="ordine_tipo"){
        
       // alert(" ordine tipo lettira firebase "+parseInt(doia["ordine_tipo"]))
        
        tipo=select_tipo("tipo_dettaglio_ordini",parseInt(doia["ordine_tipo"]))
        
        //alert("tipo: "+tipo["tipo"]+"  codice_tipo: "+tipo["codice_tipo"])
        
        }
   
    
    if(a=="delivery_costo"){
       // alert("delivery_costo  "+doia["delivery_costo"])
        delivery_costo=Number(doia["delivery_costo"])
    }
    
   //console.log("------------------------>  "+a)
  
 var header_dettaglio ='<div class="col-sm-6 col-lg-4" '+
 'style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;margin-bottom:0px;'+
'padding-bottom: 2%;border-style: none;">'+
'<div class="block-heading" style="padding-top: 0%;'+
'padding-bottom: 0%;padding-right: 0px;'+
'border-style: '+border_style+ 
'margin-top: 0%;margin-bottom: 1%;height: 100%;">'+

'<div class="block-heading" style="padding-top: 0px;padding-bottom: 0px;'+
'padding-right: 0px;margin-top: 1%;border-style:solid;'+
'border-color: rgba(33,37,41,0);'+
'height: 100%;width: 100%;margin-bottom: 1%;">'+


'<div id="modal-open-1">'+
'<div  class="modal fade" role="dialog" tabindex="-1"'+ 
'id="modal-1" aria-labelledby="modal-label-1">'+
'<div class="modal-dialog" role="document">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<h4 class="modal-title">Lavorazione Ordine</h4><button type="button" '+
'class="close" data-dismiss="modal" aria-label="Esci">'+
'<span aria-hidden="true"></span></button></div>'+
'<div class="modal-body">'

if(doia["ordine_tipo"] != "1" ){
header_dettaglio+='<button id="1" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#fcec03;width:300px;'+
'height:50px;margin-bottom: 6%;border-color:#000000"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-cart-arrow-down"></i>'+'Ordine in Preparazione'+'</button>'+
'<br>'

header_dettaglio+='<button id="3" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#36ab16;width:300px;height:120px;margin-bottom: 8%;"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-check-circle"></i>Ordine Consegnato</button>'+
'<br><br><br><br>'
}

if(doia["ordine_tipo"] == "1" ){
header_dettaglio+='<button id="2" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#00a7f5;width:300px;height:80px;margin-bottom: 8%;"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-car"></i>Delivery Start</button>'+
'<br>'
}


header_dettaglio+='<button id="0" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#fc8403;width:300px;'+
'hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-exclamation-triangle"></i>'+'Gestione Imprevisti!!'+'</button>'+
'<br><br>'+

'</div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" '+
'style="background-color:rgb(44,41,42);color:#ffffff" type="button">Esci</button></div>'+
'</div></div></div>'+


'<div id="modal-open-2">'+
'<div  class="modal fade" role="dialog" tabindex="-1"'+ 
'id="modal-4" aria-labelledby="modal-label-1">'+
'<div class="modal-dialog" role="document">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<h4 class="modal-title">Gestione Imprevisti</h4><button type="button" '+
'class="close" data-dismiss="modal" aria-label="Esci">'+
'<span aria-hidden="true"></span></button></div>'+
'<div class="modal-body">'+

'<button id="30" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#fcec03;width:300px;'+
'hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-hourglass"></i>'+'Gestione Ritardi'+'</button>'+
'<br>'+

'<button id="31" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#00a7f5;width:300px;hight:30px;margin-bottom: 2%;"data-toggle="popover" '+
'title="" data-content=""><i class="fa fa-times"></i>Annulla Ordini</button>'+
'<br>'+

'</div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" '+
'style="background-color:rgb(44,41,42);color:#ffffff" type="button">Esci</button></div>'+
'</div></div></div>'+

'<div id="modal-open-3">'+
'<div  class="modal fade" role="dialog" tabindex="-1"'+ 
'id="modal-5" aria-labelledby="modal-label-1">'+
'<div class="modal-dialog" role="document">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<h4 class="modal-title">Gestione Ritardi</h4><button type="button" '+
'class="close" data-dismiss="modal" aria-label="Esci">'+
'<span aria-hidden="true"></span></button></div>'+
'<div class="modal-body">'+

'<button id="40" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#dbc412;width:300px;hight:30px;margin-bottom: 2%;"data-toggle="popover" '+
'title="" data-content="">Ritardo +15 Minuti </button>'+

'<button id="41" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#db8712;width:300px;hight:30px;margin-bottom: 2%;"data-toggle="popover" '+
'title="" data-content="">Ritardo +30 Minuti </button>'+

'<button id="42" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#db5512;width:300px;hight:30px;margin-bottom: 2%;"data-toggle="popover" '+
'title="" data-content="">Ritardo +40 Minuti </button>'+

'<button id="43" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#e30f67;width:300px;hight:30px;margin-bottom: 2%;"data-toggle="popover" '+
'title="" data-content="">Ritardo +50 Minuti </button>'+
'<br><br>'+


'</div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" '+
'style="background-color:rgb(44,41,42);color:#ffffff" type="button">Esci</button></div>'+
'</div></div></div>'


/*
header_dettaglio+='<div id="modal-open-4">'+
'<div  class="modal fade" role="dialog" tabindex="-1"'+ 
'id="modal-2" aria-labelledby="modal-label-2">'+
'<div class="modal-dialog" role="document">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<h4 class="modal-title">Lavorazione Consegna</h4><button type="button" '+
'class="close" data-dismiss="modal" aria-label="Esci">'+
'<span aria-hidden="true"></span></button></div>'+
'<div class="modal-body">'+
'<button id="10" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#27ba3b;width:300px;hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content="">'+'Consegnato'+'</button>'+
'</div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" '+
'style="background-color:rgb(44,41,42);color:#ffffff" type="button">Esci</button></div>'+
'</div></div></div>'
*/

header_dettaglio+='<div id="modal-open-5">'+
'<div  class="modal fade" role="dialog" tabindex="-1"'+ 
'id="modal-3" aria-labelledby="modal-label-3">'+
'<div class="modal-dialog" role="document">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<h4 class="modal-title">Causale Annullamento</h4><button type="button" '+
'class="close" data-dismiss="modal" aria-label="Esci">'+
'<span aria-hidden="true"></span></button></div>'+
'<div class="modal-body">'+

'<button id="20" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#d6b629;font-size:14px;width:300px;hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content="">'+'<strong>Causale 1)</strong><br>Ordine Annullato!! Prodotto/i non più disponibile/i'+'</button>'+

'<button id="21" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#d6c829;font-size:14px;width:300px;hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content="">'+'<strong>Causale 2)</strong><br>Ordine Annullato!! Fuori zona di consegna'+'</button>'+

'<button id="22" type="button" '+
'class="btn btn-lg" style="color:#000000;background-color:#c8d629;font-size:14px;width:300px;hight:30px;margin-bottom: 2%;border-color:#000000"data-toggle="popover" '+
'title="" data-content="">'+'<strong>Causale 3)</strong><br>Ordine Annullato!! Insenso traffico, ritardo eccessivo'+'</button>'+

'</div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" '+
'style="background-color:rgb(44,41,42);color:#ffffff" type="button">Esci</button></div>'+
'</div></div></div>'+



'<button id="lavorazione_ordine" type="button" class="btn btn-primary" '+
'data-toggle="modal" data-target="#modal-1" '+
'order-color: #3b99e0;"><i class="icon ion-android-restaurant flash animated infinite"'+ 
'style="font-size: 22px;"></i><strong>Lavorazione Ordine</strong></button>'+


'<button id="consegnato" type="button" class="btn btn-primary" '+
'data-toggle="modal" data-target="#modal-2" '+
'order-color: #3b99e0;">'+
//'<i class="icon ion-android-restaurant flash animated infinite" style="font-size: 22px;"></i>
'<strong>In Consegna..</strong></button>'+

'</div>'+

'<div class="block-heading" style="padding-top: 0px;'+
'padding-bottom: 0px;padding-right: 0px;margin-top: 1%; '+
'border-style: solid;border-color: rgba(33,37,41,0);height: 100%;width: 100%;'+
'margin-bottom: 1%;">'+

/*
'<p style="background-color: rgba(0,0,0,0);text-align: center;'+
'padding-left: 0px;color: rgb(228,65,29);height: 100%;border-style: none;font-size: 14px;">'+
'<strong><em>&nbsp;</em></strong><i class="icon ion-clock" '+
'style="font-size: 17px;"></i><em>&nbsp;'+doia['status_lavorazione']+'&nbsp;</em><strong><br>'+
'<em>'+doia['data_stimata']+'</em></strong></p>'+
*/

/*'<p style="padding-left: 150px;"  id="qrcode"></p>'+*/

'</div>'+

'<p><strong>Id Order: '+doia["id_ordine"]+'</strong></p>'+
'<p>Consegna stimata : '+doia["data_lavorazione"]+'</p>'+
'<p>Pagamento: <strong>'+doia["pagamento_tipo"]+'</strong></br>Status:  <strong>'+doia["pagamento_stato"]+'</strong></p>'+

'<p style="font-size:28px'+tipo["style_oia"]+'">'

if(doia["ordine_tipo"] == "1" ){
    //if(doia["delivery_accept"]=="ok"){
header_dettaglio+='<img onclick="posizione_rider('+doia["id_ordine"]+')" src="Img/map.png" style="width:35px;height:35px">'
//}
}

header_dettaglio+='<img  width="'+iconpx+'" height=" '+iconpx+' " src='+tipo["tipo"]+'></p>'

//'<strong>testt--> '+iconpx+'  '+tipo["tipo"]+'</strong></p>'+

'<h2 class="text-info">'+doia["nome"]+'  '+doia["cognome"]+'</h2>'

header_dettaglio+='<p>'
if(doia["indirizzo"]!="***"){
    header_dettaglio+=doia["indirizzo"]+'&nbsp;&nbsp;'}
if(doia["cap"]!="***"){
    header_dettaglio+=doia["cap"]+'&nbsp;'}
if(doia["paese"]!="***"){
    header_dettaglio+=doia["paese"]+'&nbsp;'}
header_dettaglio+='</p>'


if( doia["campanello"] != "***" && doia["campanello"] ){
  header_dettaglio+='<p>Nome Citofono : '+doia["campanello"]+'</p>'
    }
if(doia["tavolo"] != "***"  && doia["tavolo"]){
  header_dettaglio+='<p>Tavolo : '+doia["tavolo"]+'</p>'
    }
if(doia["ombrellone"] != "***" &&  doia["ombrellone"]){
  header_dettaglio+='<p>Ombrellone : <strong>'+doia["ombrellone"]+'</strong></p>'
    }
if(doia["telefono"] != "***"){
  header_dettaglio+='<p>Tel : '+doia["telefono"]+'</p>'
    }
if(doia["email"] != "***"){
 header_dettaglio+='<p>Email: '+doia["email"]+'</p>'
    }
if(doia["ordine_tipo"]=="1"){
    header_dettaglio+='<button id="google_map" type="button" class="btn" '+
'color: #34a8eb;">'+
'<img  src="Img/map.png" style="width:35px;height:35px">'+
'<strong>Vedi Destinazione</strong></button>'
    }

header_dettaglio+='<p style="text-align:center;background-color: #23a9f7;'+
'padding-left: 8px;margin-bottom: 5px;'+
'font-size: 14px;color:#ffffff">Tipo Pagamento : &nbsp;'+doia["pagamento_tipo"]+
'</p>'

if(doia['note']!="***"){
header_dettaglio+='<p style="background-color: #fcda00;text-align: center;'+
'padding-left: 8px;margin-bottom: 0px;'+
'font-size: 14px;">Note:&nbsp;'+doia["note"]+
'</p>'+
'</div></div>'}

     

    $("#doia-header").html(header_dettaglio)
        
    if(page > 1){
        //alert("1-page: "+page)
        $("#lavorazione_ordine").hide()
        $("#consegnato").show()
        //$("#google_map").hide()
        }else{  //alert("2-page: "+page)
       
if(a=="notifica_ordine" && doia['notifica_ordine']=="attend" ){

    
//***************** scala credito ******************************
if(doia["ordine_tipo"]== "2"){db.ref("credito/"+uid).update({"punti":creditoPunti-valore_punti_ordini_tavolo})}
if(doia["ordine_tipo"]!= "2"){db.ref("credito/"+uid).update({"punti":creditoPunti-valore_punti})}
//***************** scala credito ******************************


//console.log("******************gooo  id: "+doia['id_ordine']+"  noty:  "+doia['notifica_ordine']); 
db.ref("ordini_in_arrivo/"+uid+"/"+id).update({"update":"notifica","notifica_ordine":"read"})
db.ref("dettaglio_ordini/"+uid+"/"+id).update({"notifica_ordine":"read"})
                               }
       
        $("#lavorazione_ordine").show();
        //if(doia["ordine_tipo"]=="1"){$("#google_map").show()}else{$("#google_map").hide()}
        $("#consegnato").hide()
        }
    
        $("#doia-header").show()
 
/* 
  var qrcode = new QRCode("qrcode", {
    text: 'http://www.google.com/maps/place/'+doia["Lat"]+','+doia["Lng"],
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
*/ 
    
// menu lavorazione ****************************
//menu imprevisti
$('#0').click(function(){
$('#modal-1').modal('hide');
$('#modal-4').modal('show');   
})

// Ordine in Preparazione  
$('#1').click(function(){
var id = $(this).prop('id');
var r = confirm("Ordine in Preparazione..")
if(r == true){
$('#modal-1').modal('hide');
notifiche(doia,"0")
}
else{}    
})

// ordine in CONSEGNA
$('#2').click(function(){
var id = $(this).prop('id');
var r = confirm("Inviare Ordine in Consegna?")
if(r == true){
$('#modal-1').modal('hide');
notifiche(doia,"6")
}
else{}  
})

// menu pagina CONSEGNATO
$('#10').click(function(){
var id = $(this).prop('id');
var r = confirm("Consegnare Ordine?")
if(r == true){ //alert("7")
$('#modal-2').modal('hide');
notifiche(doia,"7")
}
else{}  
})
// menu consegnato *****************************

// ordine CONSEGNATO
$('#3').click(function(){
var id = $(this).prop('id');
var r = confirm("Consegnare Ordine?")
if(r == true){ //alert("8")
$('#modal-1').modal('hide');
notifiche(doia,"8")
}
else{}  
})
// menu lavorazione ****************************

// menu consegnato *****************************



// menu imprevisti *****************************
// gestione ritardi
$('#30').click(function(){
$('#modal-4').modal('hide');
$('#modal-5').modal('show');  
})

// annullamento ordini
$('#31').click(function(){
$('#modal-4').modal('hide');
$('#modal-3').modal('show');  
})
// menu imprevisti *****************************


// causali annulla ordini ******************************
// annulla
$('#20').click(function(){
    $('#modal-3').modal('hide');
var id = $(this).prop('id');
var r = confirm("Stai inviando annullamento con Causale 1\n Vuoi Procedere?")
if(r == true){
$('#modal-4').modal('hide');
notifiche(doia,"10")
//*if(datas["stampa_lavorazione"]=="true"){print_header(doia["id_ordine"])}
}
else{}    
})
$('#21').click(function(){
    $('#modal-3').modal('hide');
var id = $(this).prop('id');
var r = confirm("Stai inviando annullamento con Causale 2\n Vuoi Procedere?")
if(r == true){
$('#modal-4').modal('hide');
notifiche(doia,"11")
//*if(datas["stampa_lavorazione"]=="true"){print_header(doia["id_ordine"])}
}
else{}    
})
$('#22').click(function(){
    $('#modal-3').modal('hide');
var id = $(this).prop('id');
var r = confirm("Stai inviando annullamento con Causale 3\n Vuoi Procedere?")
if(r == true){
$('#modal-4').modal('hide');
notifiche(doia,"12")
//*if(datas["stampa_lavorazione"]=="true"){print_header(doia["id_ordine"])}
}
else{}    
})
// causali annulla ordini ******************************


// gestione ritardi ordini *****************************
// in ritardo 15
$('#40').click(function(){
var id = $(this).prop('id');
var r = confirm("Conferma Ritardo 15min")
if(r == true){
//                                                                                      $('#modal-1').modal('hide');
$('#modal-5').modal('hide');
notifiche(doia,"2");
}
else{}  
}) 


// in ritardo 30
$('#41').click(function(){
var id = $(this).prop('id');
var r = confirm("Conferma Ritardo 30min")
if(r == true){
$('#modal-5').modal('hide');
notifiche(doia,"3")
}
else{}    }) 
 
// in ritardo 40
$('#42').click(function(){
var id = $(this).prop('id');
var r = confirm("Conferma Ritardo 40min")
if(r == true){
$('#modal-5').modal('hide');
notifiche(doia,"4")
}
else{}  })

// in ritardo 50
$('#43').click(function(){
var id = $(this).prop('id');
var r = confirm("Conferma Ritardo 50min")
if(r == true){
$('#modal-5').modal('hide');
notifiche(doia,"5")
}
else{}  
})
// gestione ritardi ordini *****************************

// GOOGLEMAP
$('#google_map').click(function(){
//alert("ok"+doia['lat']+"   "+doia['lng'])
geo(doia['lat'],doia['lng'])
})   

}

dettaglio_ordini_footer(id,dataPage,delivery_costo);

}else{}//**************************

})



}

}


    
    function dettaglio_ordini_footer(id,dataPage,delivery_costo){
    db.ref("dettaglio_ordini/"+uid+"/"+id+"/ordine").on("value",
    function(doia_ordine){    
    doia_ordine = doia_ordine.val()
    control(doia_ordine)
    function control(doia_ordine){
    for(a in doia_ordine){
    a=a.toString(16)
    if(typeof doia_ordine[a]  === 'object'){sal=doia_ordine[a]
    //console.log(' VALORE A ------->>  '+typeof a)
    if(isNaN(a)){
   // console.log("SONO UN NUMERO**********************   "+a)    
    if(a == "aggiunte"){    
    //console.log(' +nodo '+a)//nodo
    //console.log("----------------NODO---------------------------")//nodo
/*
console.log("***************************** UNO **************************************")    
console.log('**********************PRODOTTI**STAMPA**********************************')    
console.log(" titolo : "+titolo_prodotto)
console.log(" descrizione : "+descrizione_prodotto)
console.log(" qta : "+qta_prodotto)
console.log(" prezzo : "+prezzo_prodotto)
console.log('************************************************************************')
console.log("***************************** UNO **************************************")
*/

var v_prodotto = '<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize"'+
'style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;'+
'margin-bottom: 12px;margin-top: 4px;'+
'font-size: 20px;color: #f95a00;"><strong>'+titolo_prodotto+'</strong>'+
'</div></div></div>'+
'<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;font-size:18px">'+descrizione_prodotto+'</p>'+
'</div></div></div>'+
'<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;">'+qta_prodotto+' x '+prezzo_prodotto+'€  = <strong>' +qta_prodotto*prezzo_prodotto+'€</strong></p>'+
'</div></div></div>'  

 $("#doia-body").append(v_prodotto)      
 $("#doia-body").show()
    
    
   // console.log("NODO -> "+a+"   "+cont++)//nodo
    
    }else{
//console.log("----------------CATEGORIE---------------------------")//nodo
//console.log(a)//nodo
 var categoria_prodotto = a;
 
 var v_categorie ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;margin-bottom:0px;'+
'padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col">'+
'<h3 class="text-capitalize" style="font-size: 20px;'+
'border-style: none;border-top: 1px none rgb(0,0,0);'+
'border-right-width:0px;border-right-color: rgb(251,253,255);'+
'border-bottom: 1px none rgb(0,0,0);border-left-color: rgb(255,255,255);'+
'color:rgb(59,153,224);text-align: center;box-shadow: 0px 0px 9px;'+
'padding: 6px;padding-bottom: 6px;"><i class="fa fa-star-o">'+
'</i><strong>&nbsp;'+categoria_prodotto+'</strong></h3>'+
'</div></div></div>'
   
$("#doia-body").append(v_categorie)
    
    
    }
    } //ISNANN
    control(sal)}else{
 
 //**************************AGGIUNTE STAMPA*********************************************
   //console.log("key : "+a+" valore : "+doia_ordine[a])//key
    if(a == "aggiunte_nome" || a == "aggiunte_prezzo"){ 
   //console.log("aggiunte : "+a+"  "+doia_ordine[a])//key

   if(a == "aggiunte_nome"){aggiunte_nome=doia_ordine['aggiunte_nome']
   //console.log("aggiunteNOME -> "+"   "+aggiunte_nome+"    "+cont++)
   }
   if(a == "aggiunte_prezzo" && doia_ordine['aggiunte_prezzo'] !=""){aggiunte_prezzo=Number(doia_ordine['aggiunte_prezzo'])  
   //console.log("aggiuntePREZZO -> "+"   "+aggiunte_prezzo+"  "+cont++)
    
     sub_totale_aggiunte = sub_totale_aggiunte + aggiunte_prezzo 
     //sub_totale_aggiunte = parseFloat(sub_totale_aggiunte + aggiunte_prezzo).toFixed(2) 
     
     
    // console.log(" sub_totale_aggiunte "+sub_totale_aggiunte)
   
   var v_aggiunte = '<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: rgba(35,210,19,0.15);">'+  
'<strong>+ '+aggiunte_nome+'</strong>  Prezzo : <strong>'+aggiunte_prezzo+'€</strong></strong></p>'+
'</div></div></div>'
   
   $("#doia-body").append(v_aggiunte) 
   
   }  
    

 //**************************PRODOTTI ARRAY*********************************************    
    }else{
    //console.log("-------------    PRODOTTI ------------------------------")//nodo
    //console.log(" a : "+a+"  "+doia_ordine[a])    


if(a == "titolo")     {titolo_prodotto=doia_ordine['titolo']}
if(a == "descrizione"){descrizione_prodotto=doia_ordine['descrizione']}
if(a == "qta")        {qta_prodotto=doia_ordine['qta']}
if(a == "prezzo")     {prezzo_prodotto=Number(doia_ordine['prezzo'])

/***************************************************************************************/
 sub_totale_prodotti = sub_totale_prodotti + (qta_prodotto * prezzo_prodotto) 
 //sub_totale_prodotti=parseFloat(sub_totale_prodotti).toFixed(2)
 //sub_totale_prodotti = sub_totale_prodotti + (qta_prodotto * prezzo_prodotto).toFixed(2) 

/***************************************************************************************/
}
    
//console.log(" sub_totale "+sub_totale)

}
 }
  }
   }
       
//alert(delivery_costo)//*******************************************


/***************************************************************************************/
  totale = delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale 
//totale = parseFloat(delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale).toFixed(2) 
  //totale = (delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale).toFixed(2)
/***************************************************************************************/


 sub_totale_prodotti=parseFloat(sub_totale_prodotti).toFixed(2)
 totale=parseFloat(totale).toFixed(2)


 var v_totale ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: '+margine_inferiore_dettaglio_footer+
';padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f09711;">Totale Ordine : <strong>'+totale+'€</strong></p>'+
'</div></div></div>'



var v_sub_totale_prodotti ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f7b552;">Totale Prodotti : <strong>'+sub_totale_prodotti+'€</strong></p>'+
'</div></div></div>'

var v_sub_totale_aggiunte ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f5b85d;">Totale Aggiunte : <strong>'+sub_totale_aggiunte+'€</strong></p>'+
'</div></div></div>'

var v_delivery ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #fac16b;">Delivery : <strong>'+delivery_costo+'€</strong></p>'+
'</div></div></div>'

var v_sconto ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f7c67c;">Sconto : <strong>'+sconto+'€</strong></p>'+
'</div></div></div>'

var v_costo_pay ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #facd89;">CostoPagamento : <strong>'+costo_pay+'€</strong></p>'+
'</div></div></div>'



  if(sub_totale_prodotti>0){$("#doia-body").append(v_sub_totale_prodotti)}
  if(sub_totale_aggiunte>0){$("#doia-body").append(v_sub_totale_aggiunte)}
  if(delivery_costo>0){$("#doia-body").append(v_delivery)}
  if(sconto>0){$("#doia-body").append(v_sconto)}
  if(costo_pay>0){$("#doia-body").append(v_costo_pay)}
  if(totale>0){$("#doia-body").append(v_totale)}        
         
    $("#doia-body").show()

  totale = delivery_costo = costo_pay = sconto = sub_totale_prodotti = sub_totale_aggiunte = 0 

     })
     

    
    }

    //*************************************************************************************
   //********************** DETTAGLIO STORICO *********************************************
   //**************************************************************************************
    function dettaglio_storico(id,dataPage){
      
        
    page=dataPage 
   
  // alert("STORICO DETTAGLIO id:  "+id+"  dataPage:  "+dataPage)
    
    
    if(page==1){page_name="Ordine"}
    if(page==2){page_name="InConsegna"}
    if(page==3){page_name="Consegnato"}
    if(page==4){page_name="Annullato"}
    if(page==5){page_name="Storico"}
    
    //view("dettaglio")
            
    var totale=0; 
    var aggiunte_prezzo=0
    var qta_prodotto=0
    var prezzo_prodotto=0
    var sub_totale_aggiunte=0
    var sub_totale_prodotti=0
    var delivery_costo=0
    var sconto=0
    var costo_pay=0

    //db.ref("ordini_in_arrivo/"+uid+"/"+id).update({"notifica_ordine":"read"})
        
   // app.ShowPopup("dettaglio "+id+"  page "+dataPage)
    
    db.ref("dettaglio_storico").child("/"+uid+"/"+id).on("value",
    function(dos){    
    var dos  = dos.val()  
    view("dettaglio_storico",id,page_name)
    for(a in dos){         
    if(a =="ordine_tipo"){
        
        tipo=select_tipo("dettaglio_ordine_storico",parseInt(dos["ordine_tipo"]))
        
        }
    
    if(a=="delivery_costo"){
        // alert("storico delivery_costo  "+dos["delivery_costo"])
        delivery_costo=Number(dos["delivery_costo"])
    }
  
  
  
 var header_dettaglio ='<div class="col-sm-6 col-lg-4" '+
 'style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;margin-bottom:0px;'+
'padding-bottom: 0%;border-style: none;">'+
'<div class="block-heading" style="padding-top: 0%;'+
'padding-bottom: 2%;padding-right: 0px;'+
'border-style: '+border_style+
';margin-top: 0%;margin-bottom: 1%;height: 100%;">'+

'<div class="block-heading" style="padding-top: 0px;padding-bottom: 0px;'+
'padding-right: 0px;margin-top: 1%;border-style:solid;'+
'border-color: rgba(33,37,41,0);'+
'height: 100%;width: 100%;margin-bottom: 1%;">'+


'<button id="lavorazione_ordine" type="button" class="btn btn-primary" '+
'data-toggle="modal" data-target="#modal-1" '+
'order-color: #3b99e0;"><i class="icon ion-android-restaurant"'+ 
'style="font-size: 22px;"></i><strong>Storico Ordine</strong></button>'+


'</div>'+
'<div class="block-heading" style="padding-top: 0px;'+
'padding-bottom: 0px;padding-right: 0px;margin-top: 1%; '+
'border-style: solid;border-color: rgba(33,37,41,0);height: 100%;width: 100%;'+
'margin-bottom: 1%;">'+
'<p><strong>Id Order: '+dos["id_ordine"]+'</strong></p>'+
'<p style="background-color:#ffffff;text-align: center;'+
'padding-left: 0px;color: rgb(228,65,29);height: 100%;border-style: none;font-size: 14px;">'+
'<strong><em>&nbsp;</em></strong><i class="icon ion-clock" '+
'style="font-size: 17px;"></i><em>&nbsp;Data Ordine:&nbsp;&nbsp;</em><strong>'+
'<em>'+dos['data_ordine']+'</em></strong></p>'+
'<p style="background-color: rgba(0,0,0,0);text-align: center;'+
'padding-left: 0px;color: rgb(228,65,29);height: 100%;border-style: none;font-size: 14px;">'+
'<strong><em>&nbsp;</em></strong><i class="icon ion-clock" '+
'style="font-size: 17px;"></i><em>&nbsp;DataConsegna: &nbsp;&nbsp;</em><strong>'+
'<em>'+dos['data_stimata']+'</em></strong></p>'+ 
'<p>Pagamento: <strong>'+dos["pagamento_tipo"]+'</strong><br>Status:  <strong>'+dos["pagamento_stato"]+'</strong></p>'+
'</div>'+
'<p style="font-size:28px'+tipo["style_oia"]+'">'+

'<img width="40px" height="40px" src='+tipo["tipo"]+'><strong>'+page_name+'</strong></p>'+

//'<strong>'+page_name+'  '+tipo["tipo"]+'</strong></p>'+


'<h2 class="text-info">'+dos["nome"]+'  '+dos["cognome"]+'</h2>'+
'<p>'+dos["indirizzo"]+'&nbsp;&nbsp;'+dos["cap"]+'&nbsp;'+
dos["paese"]+'&nbsp;</p>'


header_dettaglio+='<p>'
if(dos["indirizzo"]!="***"){
    header_dettaglio+=dos["indirizzo"]+'&nbsp;&nbsp;'}
if(dos["cap"]!="***"){
    header_dettaglio+=dos["cap"]+'&nbsp;'}
if(dos["paese"]!="***"){
    header_dettaglio+=dos["paese"]+'&nbsp;'}
header_dettaglio+='</p>'


if( dos["campanello"] != "***" && dos["campanello"] ){
  header_dettaglio+='<p>Nome Citofono : '+dos["campanello"]+'</p>'
    }
if(dos["tavolo"] != "***"  && dos["tavolo"]){
  header_dettaglio+='<p>Tavolo : '+dos["tavolo"]+'</p>'
    }
if(dos["ombrellone"] != "***" &&  dos["ombrellone"]){
  header_dettaglio+='<p>Ombrellone : <strong>'+dos["ombrellone"]+'</strong></p>'
    }
if(dos["telefono"] != "***"){
  header_dettaglio+='<p>Tel : '+dos["telefono"]+'</p>'
    }
if(dos["email"] != "***"){
 header_dettaglio+='<p>Email: '+dos["email"]+'</p>'
    }
if(dos["ordine_tipo"]=="1"){
    header_dettaglio+='<button type="button" class="btn" '+
'color: #34a8eb;"><img  src="Img/map.png" '+
'style="width:35px;height:35px">'+
'<strong>Vedi Mappa</strong></button>'
    }

header_dettaglio+='<p style="text-align:center;background-color: #23a9f7;'+
'padding-left: 8px;margin-bottom: 5px;'+
'font-size: 14px;color:#ffffff">Tipo Pagamento : &nbsp;'+dos["pagamento_tipo"]+
'</p>'

if(dos['note']!="***"){
header_dettaglio+='<p style="background-color: #fcda00;text-align: center;'+
'padding-left: 8px;margin-bottom: 0px;'+
'font-size: 14px;">Note:&nbsp;'+dos["note"]+
'</p>'+
'</div></div>'}


    $("#doia-header").html(header_dettaglio)
    
    $("#doia-header").show()
    
                
    } 
    dettaglio_ordini_storico_footer(id,dataPage,delivery_costo);
})
   
    }

    function dettaglio_ordini_storico_footer(id,dataPage,delivery_costo){
    db.ref("dettaglio_storico").child("/"+uid+"/"+id+"/ordine").on("value",
    function(dos_ordine){    
    dos_ordine = dos_ordine.val()
    control(dos_ordine)
    function control(dos_ordine){
    for(a in dos_ordine){
    a=a.toString(16)
    if(typeof dos_ordine[a]  === 'object'){sal=dos_ordine[a]
    if(isNaN(a)){
    if(a == "aggiunte"){    
        

var v_prodotto = '<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize"'+
'style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;'+
'margin-bottom: 12px;margin-top: 4px;'+
'font-size: 20px;color: #f95a00;"><strong>'+titolo_prodotto+'</strong>'+
'</div></div></div>'+
'<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;font-size:18px">'+descrizione_prodotto+'</p>'+
'</div></div></div>'+
'<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: #3c99e02e;">'+qta_prodotto+' x '+prezzo_prodotto+'€  = <strong>' +qta_prodotto*prezzo_prodotto+'€</strong></p>'+
'</div></div></div>' 

 $("#doia-body").append(v_prodotto)      
 $("#doia-body").show()
    
    
    //console.log("NODO -> "+a+"   "+cont++)//nodo
    
    }else{
    
    //console.log("----------------CATEGORIE---------------------------")//nodo
    //console.log(a)//nodo
 
 var categoria_prodotto = a;
 
 var v_categorie ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;margin-bottom:0px;'+
'padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col">'+
'<h3 class="text-capitalize" style="font-size: 20px;'+
'border-style: none;border-top: 1px none rgb(0,0,0);'+
'border-right-width:0px;border-right-color: rgb(251,253,255);'+
'border-bottom: 1px none rgb(0,0,0);border-left-color: rgb(255,255,255);'+
'color:rgb(59,153,224);text-align: center;box-shadow: 0px 0px 9px;'+
'padding: 6px;padding-bottom: 6px;"><i class="fa fa-star-o">'+
'</i><strong>&nbsp;'+categoria_prodotto+'</strong></h3>'+
'</div></div></div>'
   
$("#doia-body").append(v_categorie)
    
    
    }
    }
    control(sal)}else{
 
  //**************************AGGIUNTE STAMPA*********************************************
   //console.log("key : "+a+" valore : "+doia_ordine[a])//key
    if(a == "aggiunte_nome" || a == "aggiunte_prezzo"){ 
   //console.log("aggiunte : "+a+"  "+doia_ordine[a])//key

   if(a == "aggiunte_nome"){aggiunte_nome=dos_ordine['aggiunte_nome']
   //console.log("aggiunteNOME -> "+"   "+aggiunte_nome+"    "+cont++)
   }
   if(a == "aggiunte_prezzo" && dos_ordine['aggiunte_prezzo'] !=""){aggiunte_prezzo=Number(dos_ordine['aggiunte_prezzo'])  
   //console.log("aggiuntePREZZO -> "+"   "+aggiunte_prezzo+"  "+cont++)
    
     //sub_totale_aggiunte = sub_totale_aggiunte + aggiunte_prezzo 
     sub_totale_aggiunte = sub_totale_aggiunte + aggiunte_prezzo 
     
    // console.log(" sub_totale_aggiunte "+sub_totale_aggiunte)
   
   var v_aggiunte = '<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 8px;margin-top: 8px;'+
'text-align: center;background-color: rgba(35,210,19,0.15);">'+  
'<strong>+ '+aggiunte_nome+'</strong>  Prezzo : <strong>'+aggiunte_prezzo+'€</strong></strong></p>'+
'</div></div></div>'
   
   $("#doia-body").append(v_aggiunte) 
   
   }  
    

 //**************************PRODOTTI ARRAY*********************************************    
    }else{
    //console.log("-------------    PRODOTTI ------------------------------")//nodo
    //console.log(" a : "+a+"  "+doia_ordine[a])    


if(a == "titolo")     {titolo_prodotto=dos_ordine['titolo']}
if(a == "descrizione"){descrizione_prodotto=dos_ordine['descrizione']}
if(a == "qta")        {qta_prodotto=dos_ordine['qta']}
if(a == "prezzo")     {prezzo_prodotto=Number(dos_ordine['prezzo'])

sub_totale_prodotti = sub_totale_prodotti + (qta_prodotto * prezzo_prodotto)
}
  
//console.log(" sub_totale "+sub_totale)

}
 }
  }
   }

totale = delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale

 sub_totale_prodotti=parseFloat(sub_totale_prodotti).toFixed(2)
 totale=parseFloat(totale).toFixed(2)

//console.log('******************* totale : '+totale)

 var v_totale ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f09711;">Totale Ordine : <strong>'+totale+'€</strong></p>'+
'</div></div></div>'

var v_sub_totale_prodotti ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f7b552;">Totale Prodotti : <strong>'+sub_totale_prodotti+'€</strong></p>'+
'</div></div></div>'

var v_sub_totale_aggiunte ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f5b85d;">Totale Aggiunte : <strong>'+sub_totale_aggiunte+'€</strong></p>'+
'</div></div></div>'

var v_delivery ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #fac16b;">Delivery : <strong>'+delivery_costo+'€</strong></p>'+
'</div></div></div>'

var v_sconto ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #f7c67c;">Sconto : <strong>'+sconto+'€</strong></p>'+
'</div></div></div>'

var v_costo_pay ='<div class="col-sm-6 col-lg-4" style="width: 100%;max-width: 100%;'+
'margin-top: 0;height: 100%;max-height: 100%;'+
'margin-bottom: 0px;padding-bottom: 0%;border-style: none;">'+
'<div class="row justify-content-center">'+
'<div class="col" style="border-color: rgb(72,156,225);">'+
'<p class="text-capitalize" style="margin-bottom: 1px;margin-top: 1px;'+
'text-align: center;background-color: #facd89;">CostoPagamento : <strong>'+costo_pay+'€</strong></p>'+
'</div></div></div>'
    
    
  if(sub_totale_prodotti>0){$("#doia-body").append(v_sub_totale_prodotti)}
  if(sub_totale_aggiunte>0){$("#doia-body").append(v_sub_totale_aggiunte)}
  if(delivery_costo>0){$("#doia-body").append(v_delivery)}
  if(sconto>0){$("#doia-body").append(v_sconto)}
  if(costo_pay>0){$("#doia-body").append(v_costo_pay)}
  if(totale>0){$("#doia-body").append(v_totale)}        
  
  $("#doia-body").show()

     })
     
    totale = delivery_costo = costo_pay = sconto = sub_totale_prodotti = sub_totale_aggiunte = 0 
    
    }
   
   function riepilogo(dataf,type){
     //  app.SetScreenMode( "Game" )
   
    //0-asporto  1-domicilio  2-al tavolo  3-prodotti  4-ombrellone
    //alert(dataf+"  "+type)
   
   // *********************************************************************
   // ****************RIEPILOGO ORDINI CONSEGNATO *************************
   // *********************************************************************
   
     data_print_wifi=dataf
     riepilogo_asporto=0,riepilogo_costo_asporto=0;
     riepilogo_domicilio=0,riepilogo_costo_domicilio=0;
     riepilogo_altavolo=0,riepilogo_costo_altavolo=0;
     riepilogo_prodotti=0,riepilogo_costo_prodotti=0;
     riepilogo_ombrellone=0,riepilogo_costo_ombrellone=0;
     riepilogo_costo_totale=0
    
     riepilogo_delivery=0,riepilogo_costo_delivery=0;
     riepilogo_annullato=0,riepilogo_costo_annullato=0;
     is_status_in_consegna,is_status_in_arrivo
     ll=0
     r=false
   
   
    //dataf="07/01/2021"
    
    //CHIUSURA ORDINI IN CONSEGNA************************************
    db.ref("ordini_in_consegna").child(uid)
   .once("value",function(status_in_consegna){ 
    status_in_consegna = status_in_consegna.val()
    if(status_in_consegna){is_status_in_consegna=Object.keys(status_in_consegna).length}else{is_status_in_consegna=0}
    //console.log(" array : "+is_status_in_consegna)
   
   //  alert("***2 "+is_status_in_consegna)

        if(is_status_in_consegna>0){
        
    $.confirm({title: '<strong>Ordini in Consegna</strong>',content: 'Ho trovato <br><strong>'+is_status_in_consegna+' ordini da chiudere.</strong><br>Chiudere tutto?',
    buttons: {
        SI: function () {    
    //var r = confirm("Attenzione!! Risulta "+is_status_in_consegna+" ordini da consegnare. \n Consegnare Tutti?")
    for(sc in status_in_consegna){ 
        keyd[ll]=sc;
    db.ref("ordini_consegnato/"+uid).update(status_in_consegna).then(OnSuccessSend).catch(OnFailedSend);
    db.ref("ordini_in_consegna/"+uid+"/"+sc).remove().then(OnSuccessSend).catch(OnFailedSend); 
    //console.log(" 1 storico update ************** id ordine: "+"    ->  "+sc)
    ll++
    view("chiusura_cassa")
    }
    upgrade_dettagli_in_consegna()
    },NO: function(){}
           }
       });
    
    } 
    })
    
    function upgrade_dettagli_in_consegna(){ 
        //app.ShowPopup("slave")
    ll=0 
     db.ref("dettaglio_ordini").child(uid)
     .once("value",function(status_dettaglio_storico){
     status_dettaglio_storico = status_dettaglio_storico.val()
     for(so in status_dettaglio_storico){    
     if(keyd[ll]==so){ 
     console.log("2 storico update ************** id ordine: "+so+"      ") 
     db.ref("dettaglio_storico/"+uid+"/"+so).update(status_dettaglio_storico[so]).then(OnSuccessSend).catch(OnFailedSend);
     db.ref("dettaglio_ordini/"+uid+"/"+so).remove().then(OnSuccessSend).catch(OnFailedSend); 
     ll++
     }
     }
     })
    }
    //CHIUSURA ORDINI IN CONSEGNA************************************
     
    //CHIUSURA ORDINI IN ARRIVO************************************
    db.ref("ordini_in_arrivo").child(uid)
   .once("value",function(status_in_arrivo){ 
    status_in_arrivo = status_in_arrivo.val()
    
    
    if(status_in_arrivo){is_status_in_arrivo=Object.keys(status_in_arrivo).length}else{is_status_in_arrivo=0}
    //console.log(" array : "+is_status_in_arrivo)

    //  alert("*** 1  "+is_status_in_arrivo)     
    
            if(is_status_in_arrivo>0){
        
   
        
    $.confirm({title: '<strong>Ordini in Arrivo</strong>',content: 'Ho trovato <br><strong>'+is_status_in_arrivo+' ordini da chiudere.</strong><br> Chiudere tutto?',
    buttons: {
        SI: function () {    
    //var r = confirm("Attenzione!! Risulta "+is_status_in_consegna+" ordini da consegnare. \n Consegnare Tutti?")
    for(sc in status_in_arrivo){ 
        keyd[ll]=sc;
    db.ref("ordini_consegnato/"+uid).update(status_in_arrivo).then(OnSuccessSend).catch(OnFailedSend);
    db.ref("ordini_in_arrivo/"+uid+"/"+sc).remove().then(OnSuccessSend).catch(OnFailedSend); 
    //console.log(" 1 storico update ************** id ordine: "+"    ->  "+sc)
    ll++
    view("chiusura_cassa")
    }
    upgrade_dettagli_in_arrivo()
    },NO: function(){}
           }
       });
    
    } 
    })
    
    function upgrade_dettagli_in_arrivo(){ 
        //app.ShowPopup("slave")
    ll=0 
     db.ref("dettaglio_ordini").child(uid)
     .once("value",function(status_dettaglio_storico){
     status_dettaglio_storico = status_dettaglio_storico.val()
     for(so in status_dettaglio_storico){    
     if(keyd[ll]==so){ 
    // console.log("2 storico update ************** id ordine: "+so+"      ") 
     db.ref("dettaglio_storico/"+uid+"/"+so).update(status_dettaglio_storico[so]).then(OnSuccessSend).catch(OnFailedSend);
     db.ref("dettaglio_ordini/"+uid+"/"+so).remove().then(OnSuccessSend).catch(OnFailedSend); 
     ll++
     }
     }
     })
    }
   //CHIUSURA ORDINI IN ARRIVO ************************************ 
     
    
    
    
    
    
    
    
    
    //controllo status consegna
    db.ref("ordini_consegnato")
   .child(uid)
   .orderByChild('data_ordine') 
   .startAt(dataf+" 00:00:00")
   .endAt(dataf+" 23:59:59")
   //.equalTo("07/01/2021")
   .once("value",function(view_chiusura){    
    view_chiusura = view_chiusura.val()
   // alert(view_chiusura)
    for(dd in view_chiusura){
   // console.log("----->         "+dd)
    var view_chiusura_1=view_chiusura[dd]    
    for(dd1 in view_chiusura_1){  
    if(dd1=="ordine_tipo"){
       
    //console.log("------   "+view_chiusura_1[dd1])   
    if(view_chiusura_1[dd1]=="0"){
    riepilogo_asporto++;
    riepilogo_costo_asporto+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_costo_totale+=Number(view_chiusura_1["totale_ordine"])
   
    }
    if(view_chiusura_1[dd1]=="1"){
    riepilogo_domicilio++;
    riepilogo_costo_domicilio+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_costo_totale+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_delivery++;
    riepilogo_costo_delivery+=Number(view_chiusura_1["delivery_costo"])
    riepilogo_costo_totale+=Number(view_chiusura_1["delivery_costo"])
    }
    if(view_chiusura_1[dd1]=="2"){
    riepilogo_altavolo++;
    riepilogo_costo_altavolo+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_costo_totale+=Number(view_chiusura_1["totale_ordine"])
    }
    if(view_chiusura_1[dd1]=="3"){
    riepilogo_prodotti++;
    riepilogo_costo_prodotti+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_costo_totale+=Number(view_chiusura_1["totale_ordine"])
    }
    if(view_chiusura_1[dd1]=="4"){
    riepilogo_ombrellone++;
    riepilogo_costo_ombrellone+=Number(view_chiusura_1["totale_ordine"])
    riepilogo_costo_totale+=Number(view_chiusura_1["totale_ordine"])
    }
    
    }
    
        
        }
         }
         
         
            riepilogo_costo_asporto =    parseFloat(riepilogo_costo_asporto).toFixed(2)
            riepilogo_costo_domicilio =  parseFloat(riepilogo_costo_domicilio).toFixed(2)
            riepilogo_costo_altavolo =   parseFloat(riepilogo_costo_altavolo).toFixed(2)
            riepilogo_costo_prodotti =   parseFloat(riepilogo_costo_prodotti).toFixed(2)
            riepilogo_costo_ombrellone = parseFloat(riepilogo_costo_ombrellone).toFixed(2)
            riepilogo_costo_delivery =   parseFloat(riepilogo_costo_delivery).toFixed(2)
            riepilogo_costo_altavolo =   parseFloat(riepilogo_costo_altavolo).toFixed(2)
         
         if(type=="stampa_chiusura"){
             
             if(print_tipo_connessione=="bluetooth"){
             
             bt.SetDataMode( "Text" )
                     
          //  alert("riepilogo_costo_asporto  "+riepilogo_costo_asporto)
        
         bt.Write("Chiusura Cassa del "+dataf+"\n")
         bt.Write("------------------------------\n")
         bt.Write(" Qta    Transazione    Importo\n")
         bt.Write("------------------------------\n")
         if(riepilogo_asporto >0){
         bt.Write("  "+   riepilogo_asporto+"      Asporto      "+riepilogo_costo_asporto+"E\n")
         }
         if(riepilogo_domicilio >0){
         bt.Write("  "+ riepilogo_domicilio+"      Domicilio    "+riepilogo_costo_domicilio+"E\n")
         }
         if(riepilogo_altavolo >0){
         bt.Write("  "+  riepilogo_altavolo+"      AlTavolo     "+riepilogo_costo_altavolo+"E\n")
         }
         if(riepilogo_prodotti >0){ 
         bt.Write("  "+  riepilogo_prodotti+"      Prodotti     "+riepilogo_costo_prodotti+"E\n")
         }
         if(riepilogo_ombrellone >0){
         bt.Write("  "+riepilogo_ombrellone+"      Ombrellone   "+riepilogo_costo_ombrellone+"E\n")
         }
         if(riepilogo_delivery >0){
         bt.Write("  "+  riepilogo_delivery+"      Servizi      "+riepilogo_costo_delivery+"E\n")
         }
             
             }// bluetooth
        
        if(type=="stampa_chiusura"){
        if(print_tipo_connessione=="wifi"){
        net.SetOnConnect( net_OnConnect_chiusura)
         
            
    
        }  // wifi
        }// stampa_chiusura wifi
         
             
         } // chiusura head    
         
         
 /*   
    console.log("ASPORTO   * "+riepilogo_asporto+" costo: "+riepilogo_costo_asporto+"€")
    console.log("DOMICILIO * "+riepilogo_domicilio+" costo: "+riepilogo_costo_domicilio+"€")
    console.log("ALTAVOLO  * "+riepilogo_altavolo+" costo: "+riepilogo_costo_altavolo+"€")
    console.log("PRODOTTI  * "+riepilogo_prodotti+" costo: "+riepilogo_costo_prodotti+"€")
    console.log("OBRELLONE * "+riepilogo_ombrellone+" costo: "+riepilogo_costo_ombrellone+"€")
    console.log("Costo SERVIZI * "+riepilogo_delivery+" costo: "+riepilogo_costo_delivery+"€")
    console.log("TOTALE * "+riepilogo_costo_totale+"€")
*/
    
   })// RIEPILOGO ORDINI CONSEGNATO *****************************************
   
   
    // RIEPILOGO ORDINI ANNULLATI *****************************************
    
    db.ref("ordini_annullato")
   .child(uid)
   .orderByChild('data_ordine') 
   .startAt(dataf+" 00:00:00")
   .endAt(dataf+" 23:59:59")
   //.equalTo("07/01/2021")
   .once("value",function(view_chiusura_annullato){ 
   
    view_chiusura_annullato = view_chiusura_annullato.val()
    //alert(view_chiusura_annullato+"   "+dataf)
    for(dd in view_chiusura_annullato){
   // console.log("----->         "+dd)
    var view_chiusura_annullato_1=view_chiusura_annullato[dd]    
    for(dd1 in view_chiusura_annullato_1){  
    
    //console.log("------   "+view_chiusura_annullato_1[dd1])
    
    if(dd1=="totale_ordine"){riepilogo_annullato++;riepilogo_costo_annullato+=Number(view_chiusura_annullato_1["totale_ordine"])}

        
        }
         } // end for
         
    //console.log("Ordini Annullati   * "+riepilogo_annullato+" costo: "+riepilogo_costo_annullato+"€")
    riepilogo_costo_annullato = parseFloat(riepilogo_costo_annullato).toFixed(2)
    riepilogo_costo_totale =    parseFloat(riepilogo_costo_totale).toFixed(2)
    
    if(type=="stampa_chiusura"){
        if(print_tipo_connessione=="bluetooth"){
        
    if(riepilogo_annullato >0){
    bt.Write("  "+riepilogo_annullato+"       Annullati   "+riepilogo_costo_annullato+"E\n")
    }riepilogo_costo_totale
    if(riepilogo_costo_totale >0){
    bt.Write("\n")    
    bt.Write("            Totale     "+riepilogo_costo_totale+"E\n")
    bt.Write("\n\n\n\n\n")
    }
    
        }// bluetooth

    if(type=="stampa_chiusura"){
    if(print_tipo_connessione=="wifi"){
    
    net.Connect(print_0[3],print_0[2])
    
    
    
    }  // wifi
     }// stampa_chiusura wifi



    }// chiusura footer
       
   })
   
   // RIEPILOGO ORDINI ANNULLATI *****************************************
  var table_view="" 
    
    datain=encode_formatta_data_html(dataf)
    
var header_view='<div class="container">'+
'<h4>Chiusura CASSA del <strong>'+dataf+'</strong></h4>'+
'<p style="font-size:12px;">Cambia data chiusura <input type="date" value="'+datain+'" onchange="cambia_chiusura_data(1,this.value)" id="chiusura_cassa" name="Data  chiusura"></p>'+            
'<table class="table">'+
'<thead>'+
'<tr>'+
'<th>Q.tà</th>'+
'<th>Transazione</th>'+
'<th>Importo</th>'+
'</tr>'+
'</thead>'+
'<tbody>'

 table_view+= header_view

var asporto_view='<tr>'+
'<td>'+riepilogo_asporto+'</td>'+
'<td>ASPORTO</td>'+
'<td>'+riepilogo_costo_asporto+'€</td>'+
'</tr>'
if(riepilogo_asporto>0){table_view+=asporto_view}

var domicilio_view='<tr>'+
'<td>'+riepilogo_domicilio+'</td>'+
'<td>DOMICILIO</td>'+
'<td>'+riepilogo_costo_domicilio+'€</td>'+
'</tr>'
if(riepilogo_domicilio>0){table_view+=domicilio_view}
var altavolo_view='<tr>'+
'<td>'+riepilogo_altavolo+'</td>'+
'<td>AL TAVOLO</td>'+
'<td>'+riepilogo_costo_altavolo+'€</td>'+
'</tr>'
if(riepilogo_altavolo>0){table_view+=altavolo_view}

var prodotti_view='<tr>'+
'<td>'+riepilogo_prodotti+'</td>'+
'<td>PRODOTTI</td>'+
'<td>'+riepilogo_costo_prodotti+'€</td>'+
'</tr>'
if(riepilogo_prodotti>0){table_view+=prodotti_view}

var ombrellone_view = '<tr>'+
'<td>'+riepilogo_ombrellone+'</td>'+
'<td>OMBRELLONE</td>'+
'<td>'+riepilogo_costo_ombrellone+'€</td>'+
'</tr>'
if(riepilogo_ombrellone>0){table_view+=ombrellone_view}

var delivery_view= '<tr>'+
'<td>'+riepilogo_delivery+'</td>'+
'<td>SERVIZI</td>'+
'<td>'+riepilogo_costo_delivery+'€</td>'+
'</tr>'
if(riepilogo_delivery>0){table_view+=delivery_view}

var annullato_view= '<tr>'+
'<td>'+riepilogo_annullato+'</td>'+
'<td style="color:red"><strong>ORDINI ANNULLATI</strong></td>'+
'<td style="color:red"><strong>'+riepilogo_costo_annullato+'€</strong></td>'+
'</tr>'

if(riepilogo_annullato>0){table_view+=annullato_view}

var totale_view= '<tr>'+
'<td></td>'+
'<td style="color:green"><strong>TOTALE</strong></td>'+
'<td style="color:green"><strong>'+riepilogo_costo_totale+'€</strong></td>'+
'</tr>'

if(riepilogo_costo_totale>0){table_view+=totale_view}

var footer_view= '</tbody>'+
'</table>'+
'</div>'

table_view+=footer_view
$("#rx_chiusura_cassa").html(table_view)
  
  }
  
  
    function net_OnConnect_chiusura(x){
    if(x){
    app.ShowPopup("Stampa in Corso..")
    close_print()
    }else{alert("Stampante OffLine  ")}     
     }
     
 
  
   function sns_OnChange( lux )
{
    
    /*

    {
         
        sns.PrevLvl = lux;      
        app.SetScreenBrightness( lux * 0.00066 );
    }
    */
}

         function close_print(){
         //alert("dataprint "+data_print_wifi)
    
         dataprint = encoder.initialize()        
         .line("            Chiusura Cassa del "+data_print_wifi)
         .line("------------------------------")
         .line("    Qta    Transazione    Importo")
         .line("------------------------------")
         //if(riepilogo_asporto >0){
         .line("     "+   riepilogo_asporto+"      Asporto      "+riepilogo_costo_asporto+"$")
         //}
         //if(riepilogo_domicilio >0){
         .line("     "+ riepilogo_domicilio+"      Domicilio    "+riepilogo_costo_domicilio+"$")
         //}
         //if(riepilogo_altavolo >0){
         .line("     "+  riepilogo_altavolo+"      AlTavolo     "+riepilogo_costo_altavolo+"$")
         //}
         //if(riepilogo_prodotti >0){ 
         .line("     "+  riepilogo_prodotti+"      Prodotti     "+riepilogo_costo_prodotti+"$")
         //}
         //if(riepilogo_ombrellone >0){
         .line("     "+riepilogo_ombrellone+"      Ombrellone   "+riepilogo_costo_ombrellone+"$")
         //}
         //if(riepilogo_delivery >0){
         .line("     "+  riepilogo_delivery+"      Servizi      "+riepilogo_costo_delivery+"$")
         .encode()    
         net.SendBytes( dataprint );     

        
                 
         if(riepilogo_annullato >0){
         dataprint = encoder.initialize()
         .line("  "+riepilogo_annullato+"       Annullati   "+riepilogo_costo_annullato+"$")
         .encode()    
         net.SendBytes( dataprint );     
         }
         //riepilogo_costo_totale
         if(riepilogo_costo_totale >0){
         dataprint = encoder.initialize()
        .line()    
        .line("            Totale     "+riepilogo_costo_totale+"$")
        .encode()    
         net.SendBytes( dataprint );
         }
         dataprint = encoder.initialize()
         .line().line().line().line().line().line()
        .cut('full')// taglio
        .encode()    
         net.SendBytes( dataprint );
   
        
         net.SetOnConnect(net_OnConnect); 
    
}

  function res_noty(error,reply){
   
   //alert("funnc: "+reply)
   
    clearTimeout(times);
    
    if( error == "true" ){
    app.HideProgress()
    alert("Errore invio, prego riprovare.")
     }
    else{
        if(      
           reply == "300" ||
           reply == "100" ||
           reply == "101" ||
           reply == "102" ||
           reply == "103" ||
           reply == "104" ||
           reply == "105" ||
           reply == "error"
           ){console.log("reply: "+reply)}
           else{
               
    //console.log("**************** error feed "+reply)  
    //alert("  consol error  ********** "+reply)           
               reply="error"}
    }
     
    switch(reply){ 
   
   
   case "300":    
   //app.HideProgress()
   //app.ShowPopup("Notifica delivery in arrivo  inviata.")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"ok-300"}).then(OnSuccessSend).catch(OnFailedSend);   
   break
     
   //************************  GESTIONE ERRORI *********************************
   case "100":  // errore invio email sistem                 
   //app.HideProgress()
   alert("Attenzione!! EMAIL non inviata. Contattare il centro assistenza visualcode.cloud.")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-100"}).then(OnSuccessSend).catch(OnFailedSend);
   break
   
   case "101":  // sms errore generico invio                  
   //app.HideProgress()
   alert("Attenzione!! errore invio SMS #000. Contattare il centro assistenza visualcode.cloud.")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-101"}).then(OnSuccessSend).catch(OnFailedSend);
   break
   
   case "102":  //  errore completo sms + email                 
   //app.HideProgress()
   alert("Attenzione!! Errore invio Email e Sms. Contattare il centro assistenza visualcode.cloud.")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-102"}).then(OnSuccessSend).catch(OnFailedSend);
   break
   
   case "103":  // sms numero non valido                
   //app.HideProgress()
   alert("Attenzione!! SMS non inviato, numero non valido")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-103"}).then(OnSuccessSend).catch(OnFailedSend);
   break
   
   case "104":  // sms  credito insufficiente                
   //app.HideProgress()
   alert("Attenzione!! Credito SMS insufficiente , effettuare una una ricarica. Grazie.")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-104"}).then(OnSuccessSend).catch(OnFailedSend);

   break
    
   case "105":  // sms caratteri messaggio >160                 
   //app.HideProgress("errore invio per caratteri >160")
   alert("errore invio per caratteri >160")
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error-105"}).then(OnSuccessSend).catch(OnFailedSend);
   break
  
   case "error":         
   //app.HideProgress()
   db.ref("ordini_in_consegna/"+uid+"/"+id_ordine).update({"status_notifica":"error #001"}).then(OnSuccessSend).catch(OnFailedSend);
   alert("Errore invio!! Prego riprovare. #001")
   break
    }
}