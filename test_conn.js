        var data

        function test_conn()
        {   
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    lay.SetBackColor( "Black" );      
    bt_test='attend';
    stmp_test='fallita';
    bt = app.CreateBluetoothSerial(); 
    if(app.GetChargeType() != "AC" && datas['controllo_carica']=="true"){	    
	synthBall = app.CreateSynth( "VCA" );
    synthBall.SetWaveShape( "Square" );
    synthBall.SetVca( 1, 30, 0, 0 );
    synthBall.PlayTone( 960, 100 );	    
	alert('Attenzione!!, rilevato Caricabatteria Scollegato, \n '+
	'prego collegare cavo per garantire le prestazioni del sistema.  ')
	}
     if(datas["stampa_attivazione"]=="true"){address_print=datas["stampante_address"]
	if (!app.IsBluetoothEnabled()){app.SetBluetoothEnabled( true );		
	}
    bt.SetOnDisconnect( disconnected );
    bt.Listen( true );
    bt_test="connesso";connessione_stampante_test(address_print)
     }}

    function disconnected() {    
	alert( "Attenzione!! Stampante diconnessa","Bottom" );
	test_conn()}
    
     function connected(ok) {
	if (ok) {
		app.HideProgress();
		app.ShowPopup( "Stampante Connessa","Bottom" );
		bt.Listen( false );
	} else {
		app.HideProgress();	
		app.ShowPopup( "Connessione Fallita","Bottom" );
		bt.Listen( true );
	}
   }

    function load_devices() {
    var listaddress 
	var bt_list = app.GetPairedBtDevices();	
	var data = "";
 
    for(var i = 0; i < bt_list.length; i++) 
    {
        listaddress = bt_list[i].address.replace(/:/g,"-");
        console.log("---------------> "+listaddress)
        data += bt_list[i].name+":"+listaddress+":null";
              data += ",";
    }
    
    if(bt_list.length==0){
    alert("Attenzione!! Nessuna Stampante associata, seguire la procedura di accoppiamento e riprovare. Grazie.")
    app.SendIntent(null,null,"android.settings.BLUETOOTH_SETTINGS")
    lay.Destroy()
    var Ynd = app.CreateYesNoDialog("Connessione Stampante \n Scegli un\'opzione per continuare ");
    Ynd.SetButtonText("Senza Stampante", "Lista Stampanti");
    Ynd.SetOnTouch(yn_stampa);
    Ynd.Show();
    }    
    lst = app.CreateList( data, 1, 1, "WhiteGrad" );
    lst.SetTextColor1( "#ff555558");
    lst.SetTextColor2( "#ff555558" );
    lst.SetTextMargins( 0.04, 0, 0, 0 );
    lst.SetOnTouch( save_print );
    lay.AddChild( lst );    
    app.AddLayout( lay );	 
}

  
 
    function connessione_stampante_test(address_print) 
    {    
     app.ShowProgress("Connessione stampante in corso... Attendere Prego"  );
     time_search = setTimeout(stampa_stop_timer, 5000) 
     if(bt_test == "connesso"){  
    bt.Connect(address_print);    
    bt.SetOnConnect(bt_OnConnect)
      }else{alert("Attenzione!! BLUETOOTH non Attivato!!")}
      }



function bt_OnConnect(ok)
    {       
    if(ok){
        clearTimeout(time_search); 
        app.ShowPopup( "OK Connessione Stampante ","Bottom" );
     	  stmp_test  = "true";
         app.HideProgress();        
         lay.Hide()
         return('true')
    }
    
    }
  

function yn_stampa(risposta)
{
if(risposta == "Yes") {bypass_stampante()}
else{   
    txt_print=app.CreateText("Seleziona Stampante")
	txt_print.SetTextSize( 22 );
	txt_print.SetMargins(0.1,0.05,0.1,0)
	lay.AddChild( txt_print );    
    load_devices()}
}

function yn_bluetooth(risposta)
{
if(risposta == "Yes") {attiva_bt()}else{test_conn()}
}

function attiva_bt(){
app.SendIntent(null,null,"android.settings.BLUETOOTH_SETTINGS")
reset_bt()
}

function reset_bt(){
bt.Disconnect()
test_conn()
}

    function stampa_stop_timer(){
    app.HideProgress(); 
    bt.Disconnect()
    var Ynd = app.CreateYesNoDialog("Connessione Stampante \n Scegli un\'opzione per continuare ");
    Ynd.SetButtonText("Senza Stampante", "Lista Stampanti");
    Ynd.SetOnTouch(yn_stampa);
    Ynd.Show();    
    }


    function save_print(nome,address){
    var listaddress= address.replace(/-/g,":");
    db.ref("config/"+uid).update({"stampante_nome":nome,"stampante_address":listaddress})
    connessione_stampante_test(listaddress)
    }

    function bypass_stampante(){
    datas["stampa_attivazione"]="false"    
    db.ref("config/"+uid).update({"stampa_attivazione":"false"})
    lay.Hide()
    return('true')
    }