          
    var app_id =datas['app_id']
    var api_key = datas['api_key']
    var url_keystore=datas['api_url']
    var path_keystore=datas['api_path_keystore']
    var app_id_status=datas['app_id_status']
    var storico = datas['view_storico']
    var reset = datas["app_id_status"]
    var debug = datas["00_debug"]
    var multipla_id=app.LoadText( "idMua" );
    var num_multipla = app.LoadText( "tpm");
    var multi_save={}

    



if(dispositivo=="Unico"){
var up_margine="0.00"
var larghezza_campi="0.35"
}
if(dispositivo=="Tablet"){
var up_margine="0.00"
var larghezza_campi="0.35"
}


function keystore_view(){
app.CloseDrawer( "Left" );  
    keystore_m = app.CreateLayout( "linear" ); 
    keystore_m.SetSize( 1, 1 );          
  	keystore_m.SetBackColor( "black" ); 
    view_storico =  app.CreateCheckBox( "Storico", larghezza_campi, 0.05 );
    view_storico.SetChecked(storico);
    view_storico.SetMargins( 0, up_margine, 0, 0 );
    view_storico.SetOnTouch( function(){onoff_("view_storico")});
    keystore_m.AddChild( view_storico);
    reset_keys =  app.CreateCheckBox( "KeyStore Status", larghezza_campi, 0.05 );
    reset_keys.SetChecked(reset);
    reset_keys.SetMargins( 0, up_margine, 0, 0 );
    reset_keys.SetOnTouch( function(){onoff_("app_id_status")});
    keystore_m.AddChild( reset_keys);
    app.AddLayout(keystore_m);
    sms_service =  app.CreateCheckBox( "Attiva SMS Service",larghezza_campi, 0.05 );
    sms_service.SetChecked(datas["sms_service"]);
    sms_service.SetMargins( 0,up_margine, 0, 0 );
    sms_service.SetOnTouch( function(){onoff_("sms_service")});
    keystore_m.AddChild( sms_service );
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    keystore_m.AddChild( txt_linea );
    keystore = sup.CreateTextEdit(app_id,-1, null, "floating" );
    keystore.SetHint( "KEYSTORE" ); // Float label.
    keystore.SetTextSize(12)
    keystore.SetColor( "#FAFAFA" );
    keystore_m.AddChild( keystore );
    btn = app.CreateButton("Salva",-1,0.04 );
    btn.SetTextSize(10)
    btn.SetMargins( 0, up_margine, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch( function(){kaystore_save(keystore) });
    keystore_m.AddChild( btn );
    if(datas["multipla_config"]=="true"){
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    keystore_m.AddChild( txt_linea );  
    chk_multipla = app.CreateCheckBox( "On/Off Multipla" );
    chk_multipla.SetOnTouch( attiva_multipla );
    chk_multipla.SetChecked(stsMua)
    keystore_m.AddChild( chk_multipla );    
    grid_id_mua = sup.CreateGridLayout();
    grid_id_mua.SetColCount( 2 );
    txt = app.CreateText( "IDapp Dispositivo : "+ app.GetDeviceId());
    txt.SetTextSize( 15 );
    txt.SetTextColor("#fcba03")
    keystore_m.AddChild( txt );   
    if(stsMua == "false"){ 
    var colMua ="#f54242"
     }else{var colMua="#22ff22"}
    multipla_id = sup.CreateTextEdit(multipla_id, 0.5, null, "floating" );
    multipla_id.SetHint( "IDapp Clone" ); 
    multipla_id.SetTextColor(colMua );
    grid_id_mua.AddChild( multipla_id );
    keystore_m.AddChild( grid_id_mua );
    btn = app.CreateButton("Salva IDapp Clone",-1,0.05 );
    btn.SetTextSize(10)
    btn.SetMargins( 0.04, up_margine, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch( function(){multipla_id_save(multipla_id) });
    grid_id_mua.AddChild( btn );
    keystore_m.AddChild( grid_id_mua );
    grid_mua = sup.CreateGridLayout();
    grid_mua.SetColCount( 3 ); 
    spin_multipla = app.CreateSpinner(datas['multipla_list'], -1 );
    spin_multipla.SelectItem(num_mua)
    spin_multipla.SetMargins(0,0,0.02,0)
    spin_multipla.SetTextSize(14)
    grid_mua.AddChild( spin_multipla );   
    multiplaName = sup.CreateTextEdit(datas['multipla_nome_'+num_mua], -1, null, "floating" );
    multiplaName.SetHint( "Nome Reparto" ); 
    multiplaName.SetColor( "#FAFAFA" );
    grid_mua.AddChild( multiplaName );
    btn_mua = app.CreateButton("Salva Reparto",-1,0.05 );
    btn_mua.SetTextSize(10)
    btn_mua.SetMargins( 0.04, up_margine, 0, 0 );
    btn_mua.SetBackColor('#666666');
    btn_mua.SetOnTouch(multipla_save);
    grid_mua.AddChild( btn_mua )
    keystore_m.AddChild( grid_mua );     
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    keystore_m.AddChild( txt_linea );
    }
    btn = app.CreateButton("Chiudi",-1, 0.05 );
    btn.SetTextSize(10)
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(chiudi_keystore);
    keystore_m.AddChild( btn );
   
  	}
  	
  	
  	
  	   function chiudi_keystore(){app.Exit( );}
  	   
  	   
var num_mua= app.LoadText( "tpm","01" );
var num_mur= app.LoadText( "tpr","Master" );


        function  attiva_multipla(ismultipla){
        if(ismultipla==true){
        app.SaveText( "stsMuax", "true" );
        db.ref("config/"+uid).update({"multipla":"true"}).then(OnSuccessSend).catch(OnFailedSend); 
        }else{
        app.SaveText("stsMuax","false");
        db.ref("config/"+uid).update({"multipla":"false"}).then(OnSuccessSend).catch(OnFailedSend); 
        }
        app.ShowPopup("Status Multipla salvato!!")
        }

        function multipla_id_save(multipla_id){
        multipla_id=multipla_id.GetText()
        if(multipla_id.length>0){
        app.SaveText( "idMua", multipla_id );
        app.ShowPopup("ID Multipla Salvato")
        }else{ 
        app.ShowPopup("ID Multipla Cancellato")
        app.SaveText("idMua","" );
        }
        }



    function multipla_save(){
        
    multiplaName= multiplaName.GetText()
    spin_multipla=spin_multipla.GetText()
    multi_save["multipla_nome_"+spin_multipla]= multiplaName  
    app.SaveText( "tpm", spin_multipla);           
    db.ref("config/"+uid).update(multi_save).then(OnSuccessSend).catch(OnFailedSend); 
    alert("Per rendere effettive le modifiche il dispositivo sarà riavviato.","Memorizzazione Reparto")
    app.Exit()
    }
    
  
    function kaystore_save(keystore)
    {  
    var keystore=keystore.GetText()    
     idapp = {app_id:keystore,app_id_status:"true"};
     db.ref("config/"+uid).update(idapp).then(OnSuccessSend).catch(OnFailedSend); 
    times_keystore = setTimeout(http_stop_timer_keystore, 11000) 
    var params_keystore = "api_key=" + api_key + "&keystore=" + keystore + "&uid="+uid;    
    var send_web = url_keystore+path_keystore+params_keystore;
    app.HttpRequest( "GET", send_web, null, null, handleReply_keystore );           
    app.ShowProgress( "Attendere Salvataggio in corso..." ); 
     } 

    function handleReply_keystore(error,reply){
    clearTimeout(times_keystore);
    alert(reply)
    app.Exit()
    }

    function http_stop_timer_keystore(){alert("Error CloudAppstream")
    app.HideProgress()  
    }