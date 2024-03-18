 var obj={}
 var off_obj={stampa_prezzi:"false",stampa_dettaglio:"false",stampa_totali:"false",stampa_pagamento:"false",stampa_email:"false"}
 var on_obj={stampa_prezzi:"true",stampa_dettaglio:"true",stampa_totali:"true",stampa_pagamento:"true",stampa_email:"true"}


 
 function menu_inarrivo(){
lst.RemoveAll()
layVert.RemoveChild(lst)
CreateListeners();
    }
    
 
    
    function resetTab(){
    app.SaveText("stsMuax","false" );
    app.SaveText("tpm","01" );
    app.ShowPopup( "Reset Store Success!!" );
    }
    
      function reset_layout(){    
app.SaveText("color_head","#3a3f43")
app.SaveText("color_footer","#3a3f43")
app.SaveText("on_button","#f79e05")
app.SaveText("off_button","#ffffff")
app.SaveText("icon_color","#3a3f43")
app.SaveText("text_color","#3a3f43")
app.SaveText("border_color","#f5bc02")
app.ShowPopup("Reset Layout Completato")
  }
    function menu_inconsegna(){ 
DBL.ExecuteSql("SELECT * FROM ordini where status = 'inconsegna'  ",[], row_inconsegna );
}

function row_inconsegna(results){

lary=results.rows.length;
console.log(' lunghezza -> '+lary);

 var dataview = "";
    for(var u=0;u<lary;u++){
    if(u>0){dataview += ",";}    
    
    var item = results.rows.item(u)
    
    dataview += "[fa-arrow-right] "+item.id_ordine+"  "+item.nome+"   "+item.cognome+":Pagamento "+item.tipo_pagamento+"  "+item.stato_pagamento+": "+status+": null";
}

lst.RemoveAll()
layVert.RemoveChild(lst)
read_list_inconsegna(dataview);

}

function menu_consegnato(){
DBL.ExecuteSql("SELECT * FROM ordini where status = 'consegnato'  ",[], row_consegnato );
}

function row_consegnato(results){

lary=results.rows.length;
console.log(' lunghezza -> '+lary);

 var dataview = "";
    for(var u=0;u<lary;u++){
    if(u>0){dataview += ",";}    
    
    var item = results.rows.item(u)
    
    dataview += "[fa-arrow-down] "+item.id_ordine+"  "+item.nome+"   "+item.cognome+":Pagamento "+item.tipo_pagamento+"  "+item.stato_pagamento+": "+status+": null";
}
lst.RemoveAll()
layVert.RemoveChild(lst)
read_list_consegnato(dataview);

}
    function menu_annullato(){ 
DBL.ExecuteSql("SELECT * FROM ordini where status = 'annullato'  ",[], row_annullato );
}

function row_annullato(results){

lary=results.rows.length;
console.log(' lunghezza -> '+lary);



 var dataview = "";
    for(var u=0;u<lary;u++){
    if(u>0){dataview += ",";}    
    
    var item = results.rows.item(u)
    dataview += "[fa-ban] "+item.id_ordine+"  "+item.nome+"   "+item.cognome+":Pagamento "+item.tipo_pagamento+"  "+item.stato_pagamento+": "+status+": null";
}

lst.RemoveAll()
layVert.RemoveChild(lst)
read_list_annullato(dataview);

}
 function CreateTheme()
{
    theme = app.CreateTheme( "Dark" );
    theme.SetDialogColor( "#ffffffff" );
    app.SetTheme( theme );
}
 
 function app_OnShowKeyBoard( shown )
{

}

function OnBack()
{    
   	
}

function gestione_ordine()
{
    
    
    lay_gestione = app.CreateLayout( "linear", "VCenter,FillXY" );
    dlgTxt = app.CreateDialog( "Lavorazione Ordine" );
    layDlg = app.CreateLayout( "linear", "vertical,fillxy,left" );
    layDlg.SetBackColor("#ffffff")
    layDlg.SetPadding( 0.02, 0, 0.02, 0.02 );
    dlgTxt.AddLayout( layDlg );
    var list = "[fa-check-square-o]  Conferma Ordine,,"+
    "[fa-exclamation-triangle]  Annulla Ordine,,"+
    "[fa-clock-o]   Invia Ritardo 15 Min,,"+
    "[fa-clock-o]  Invia Ritardo 30 Min,,"+
    "[fa-clock-o]  Invia Ritardo 40 Min,,"+
    "[fa-clock-o]  Invia Ritardo 50 Min,,"+
    "Esci";
    lstDlg = app.CreateList( list, 1, 1,"FontAwesome" );
    lstDlg.SetTextSize( 18 );
    lstDlg.SetPadding(0.2,0,0.2,0)
    lstDlg.SetTextColor( "#000000" );
    lstDlg.SetOnTouch( lst_gestione_OnTouch);
    layDlg.AddChild( lstDlg );
    dlgTxt.Show();
}


function lst_gestione_OnTouch(a1,a2,a3,a4 )
{
    
    dlgTxt.Hide();
    notifiche(a4)

}   
function ok_in_arrivo(INordini)
{    
    id_ordine=INordini[0][0];
    cognome=INordini[0][1];
    nome=INordini[0][2];
    tipo_pagamento=INordini[0][3];
    stato_pagamento=INordini[0][4];    
    lay.Hide();
    var del_view  = {view: 'read'};      
    db.ref(keystore_master+'/'+keystore_slave+'/'+id_ordine+'/ordini').update(del_view).then(OnSuccessSend).catch(OnFailedSend);
    DBL.ExecuteSql( "INSERT INTO ordini                      (id_ordine,   campanello,  data_ritiro,  cognome,     id_clienti,   indirizzo, nome,   note,  ordine_tipo, prezzo,   stato_pagamento,  tipo_pagamento,  status,     telefono,    email ,  tavolo,   ombrellone,   data_now,  coordinate,  prezzo_consegna)" +   
    " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",     [id_ordine, "campanello", "data_ritiro",cognome,   "id_clienti", "indirizzo",nome,"note","ordine_tipo","prezzo",stato_pagamento,tipo_pagamento,"inconsegna","telefono","email","tavolo","ombrellone", "data_now","coordinate","prezzo_consegna"], null, OnError );
}

function OnDrawer( side, state ){}
function OnMenu( name ){app.OpenDrawer();}
function r_data(){
    count_reset_data++
    app.ShowPopup( 'data '+count_reset_data );
    if(count_reset_data > 6){       
   var yesNo = app.CreateYesNoDialog( "Attenzione!! Stai cancellando la Keystore, vuoi procedere?" );
   yesNo.Show()
  yesNo.SetOnTouch( yesNo_data ); 
      }
}
      
function yesNo_data( result ){if( result=="Yes" ) {reset_data()} else{}} 
      
      
      
function r_db(){
    count_reset_db++
    app.ShowPopup(' db '+ count_reset_db );
    if(count_reset_db > 6){ 
       var yesNo = app.CreateYesNoDialog( "Attenzione!! Stai cancellando il Database, vuoi procedere?" );
   yesNo.Show()
  yesNo.SetOnTouch( yesNo_db );            
}
}

 function yesNo_db( result ){if( result=="Yes" ) {reset_db()} else{}} 

   function ok_consegnato(id_ordine){lay.Hide();
   view = {view:"consegnato"};
   db.ref(keystore_master+'/'+keystore_slave+'/'+id_ordine+'/ordini').update(view).then(OnSuccessSend).catch(OnFailedSend);   
   DBL.ExecuteSql("UPDATE ordini SET status = 'consegnato'  WHERE id_ordine = '"+id_ordine+"' "); //update
   menu_inconsegna();
     }
   
           function edt_OnChange_1(dataview) {
    var searchText = txt_head.GetText();
    var lst2 = dataview.filter(function(item) {     
     return item.startsWith("[fa-eye] "+searchText); 
       });
     lst.SetList( lst2 )}
     
            function edt_OnChange_2(dataview) {
    var searchText = txt_head.GetText();
    var lst2 = dataview.filter(function(item) {     
     return item.startsWith("[fa-eye] "+searchText); 
       });
       lst.SetList( lst2 )}
     
          function edt_OnChange_3(dataview) {
    var searchText = txt_head.GetText();
    var lst2 = dataview.filter(function(item) {     
     return item.startsWith("[fa-eye] "+searchText); 
       });
       lst.SetList( lst2 )}
       
        function edt_OnChange_4(dataview) {
    var searchText = txt_head.GetText();
    var lst2 = dataview.filter(function(item) {     
     return item.startsWith("[fa-ban] "+searchText); 
       });
       lst.SetList( lst2 )}
     
     function btnLocal_OnTouch()
{
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );
    	web = app.CreateWebView( 1, 1 );

	lay.AddChild( web );
	web.LoadUrl( "settings.html" );
	app.AddLayout( lay );
}
  
    
    


function img_OnTouchDown( ev )
{
    
}






  

    function c_s_t() 
    {    
     app.ShowProgress("Connessione stampante in corso... Attendere Prego"  );
     if(bt_test == "connesso"){
    bt.Connect("BlueTooth Printer",0);       
  if(bt.SetOnConnect()){ 
  return "true"
  }else{ 
  return "false" 
  }
  }
  }
      

















function attiva_sms()  
{
   //var pitch = 1.0, speed = 1.0;
    //app.Alert( "Checked = " + isChecked );
    
    if(datas['sms'] == 'false' ){
    //app.Alert("true if");
    valore ="true";
	app.TextToSpeech( "Notifica SMS Attivata", 1.0, 1.0 );
  
    }
    if(datas['sms'] == 'true'){
    //app.Alert("false if");
    valore= "false";
    app.TextToSpeech( "Notifica SMS Disattivata", 1.0, 1.0 );
  
        }
    
    tipo  = "sms";
    key = "";
    DBL.ExecuteSql("UPDATE datatab SET valore = '"+valore+"'  WHERE tipo = '"+tipo+"' and key = '"+key+"'  "); //update
  value_read();
   slide_menu.Animate("SlideToLeft")
}


//Richiamato quando lutente cambia la selezione.
function spin_OnChange( item )
{
   // app.ShowPopup( "Item = " + item );
}

function set_voce_speed( value )
{
    speed = value;
    //app.SetVolume( stream, datas['voce','volume'] )
	app.TextToSpeech( "Configurazione velocità", datas['voce_tono'], speed );
    tipo  = "voce_speed";
    key = "";
    DBL.ExecuteSql("UPDATE datatab SET valore = '"+value+"'  WHERE tipo = '"+tipo+"' and key = '"+key+"'  "); //update

}
function set_voce_pitch( value )
{
    pitch = value;
    //app.SetVolume( stream, datas['voce','volume'] )
	app.TextToSpeech( "Configurazione tono", pitch, datas['voce_speed'] );
    tipo  = "voce_tono";
    key = "";
    DBL.ExecuteSql("UPDATE datatab SET valore = '"+value+"'  WHERE tipo = '"+tipo+"' and key = '"+key+"'  "); //update


}  
function set_voce_volume( value )
{
    level = value;
    app.SetVolume( stream, level )
	app.TextToSpeech( "Configurazione volume", datas['voce_tono'], datas['voce_speed'] );
	 tipo  = "voce_volume";
    key = "";
    DBL.ExecuteSql("UPDATE datatab SET valore = '"+value+"'  WHERE tipo = '"+tipo+"' and key = '"+key+"'  "); //update

}  

/*
function k_master(key_master,key_slave)
    { 
    
    if(key_slave.GetText() == "12345678" || key_slave.GetText() == "" ){key_slave = key_master}   
    
    keymaster_writecrypt = crypt.Encrypt(key_master.GetText(),cry)
   // alert('key master_crypt  :  '+keymaster_writecrypt)    
    app.WriteFile( path_data +"km.txt", keymaster_writecrypt );     
        
    
     keyslave_writecrypt = crypt.Encrypt(key_slave.GetText(),cry) 
 //    alert('key slave_crypt  :  '+keyslave_writecrypt)
     app.WriteFile( path_data +"ks.txt", keyslave_writecrypt );
     
     
     
       app.ShowPopup( "Keystore salvato con successo!! ");
       keystore_master=key_master.GetText();
       keystore_slave=key_slave.GetText(); 
         //
       
       app.RemoveLayout(keystore_m)
       //slide_menu.Animate("SlideToLeft"); 
       CreateListeners();
      //startup()
 
     } 
  */   



    
    function reset_data(){
        app.DeleteFolder('/sdcard/datastream/data')
        app.Exit()
        }
            function reset_db(){
        app.DeleteFolder('/sdcard/datastream/db')
        app.Exit()
        
        }
    
    
     
      function save_azienda(nome_azienda)
    {     
    tipo  = "nome_azienda";
    key = "";
    value= nome_azienda.GetText();
    DBL.ExecuteSql("UPDATE datatab SET valore = '"+value+"'  WHERE tipo = '"+tipo+"' and key = '"+key+"'  "); //update
     value_read();
     
     UserBanner = value.toUpperCase()
    app.WriteFile( path_data + "UserBanner.txt", UserBanner);
  alert("Questa modifica necessita la chiusura dell'applicazione!!")
        app.Exit()

    app.ShowPopup("Nome Aziena Aggiornato"  );
    
     } 
     
           
         
   
   function edit_nome_stampante(st_name)
{f
    
    app.WriteFile( path_data + "sn.txt", st_name.GetText());
    //app.ShowPopup('Dati Salvati')
    alert("Questa modifica necessita la chiusura dell'applicazione!!")
    bt.Disconnect();
    app.Exit()
    
}  
     
function btn7_OnTouch(){app.Alert('STAMPA')}
//function btn8_OnTouch(){lay.Hide();}

//******************************************************************

function chiudi_pg()
{
  // app.ShowPopup( "Button" );
  // value_read();
   slide_menu.Animate("SlideToLeft")
    
}

function open_menu(){app.OpenDrawer();}
function close_menu(){slide_menu.Animate("SlideToLeft");}
function return_menu(){slide_menu.Animate("SlideToLeft");app.OpenDrawer();}   
function chiudi_doppio_lay(){slide_menu.Animate("SlideToLeft");slide_menu_2.Animate("SlideToLeft");app.OpenDrawer();}


function save(data_save,key_data){
console.log(' key  '+key_data)
console.log(' data '+data_save.GetText())
data_save=data_save.GetText()

if(key_data=="2_nome_azienda"){saving ={"2_nome_azienda":data_save};}
if(key_data=="stampante_nome"){saving ={"stampante_nome":data_save};}
if(key_data=="web_sms")       {saving ={"web_sms":data_save};}
if(key_data=="id_rider")       {saving ={"id_rider":data_save};
app.SaveText("id_rider_",data_save)
id_rider=app.LoadText("id_rider_")
}
if(key_data=="nickname")       {saving ={"nickname":data_save};}

db.ref("config/"+uid).update(saving)
alert("Questa modifica necessita la chiusura dell'applicazione!!")
bt.Disconnect();
app.Exit()
}    


function save_rider(data_save,key_data){
console.log(' key  '+key_data)
console.log(' data '+data_save.GetText())
data_save=data_save.GetText()

if(key_data=="2_nome_azienda"){saving ={"2_nome_azienda":data_save};}
if(key_data=="stampante_nome"){saving ={"stampante_nome":data_save};}
if(key_data=="web_sms")       {saving ={"web_sms":data_save};}
if(key_data=="id_rider")       {saving ={"id_rider":data_save};
app.SaveText("id_rider_",data_save)
id_rider=app.LoadText("id_rider_")
}
if(key_data=="nickname")       {saving ={"nickname":data_save};}

db.ref("rider/"+uid+"/"+idAPP+"/"+id_rider).update(saving)
db.ref("config/"+uid).update(saving)
alert("Questa modifica necessita la chiusura dell'applicazione!!")
bt.Disconnect();
app.Exit()
}   

     function onoff_(textx)  
    {  
       // alert(textx)
    if(textx == "stampa_solo_prodotti"){
    if(datas[textx]== "false"){
    obj[textx]= "true"   
    db.ref("config/"+uid).update(obj)
    db.ref("config/"+uid).update(off_obj)
    }else{
    obj[textx]= "false"
    db.ref("config/"+uid).update(obj)
    db.ref("config/"+uid).update(on_obj)
    } 
    alert("Questa modifica necessita la chiusura dell'applicazione!!")
    bt.Disconnect();
    app.Exit()
    }else{              
    if(datas[textx]== "false"){
    obj[textx]= "true"
    db.ref("config/"+uid).update(obj)
    }else{
    obj[textx]= "false"
    db.ref("config/"+uid).update(obj)
    }
    alert("Questa modifica necessita la chiusura dell'applicazione!!")
    bt.Disconnect();
    app.Exit()
    }
 }

    
    
    function play()
{
   
    app.ShowPopup( "Play "+datas['tipo_suoneria'] );
    mp3.SetFile("sound/"+datas['tipo_suoneria']+".mp3");
    mp3.Play()
    //mp3.Stop()
   
}
    
    function sound_check(sound_check)  
{
  
   datas['tipo_suoneria']=sound_check
   db.ref("config/"+uid).update({"tipo_suoneria":datas['tipo_suoneria']})
  // app.ShowPopup("Operazione Salvata")
   
}

function select_sezione_stampante_bluetooth(mm_stampante){
    mm_stampante=mm_stampante.GetText()
   //alert(mm_stampante)
   datas['stampa_larghezza']=mm_stampante
   db.ref("config/"+uid).update({"stampa_larghezza":datas['stampa_larghezza']})
    app.SaveText( "stampa_mm", mm_stampante );
     alert("Questa modifica necessita la chiusura dell'applicazione!!")
     bt.Disconnect();
  app.Exit()
   //app.ShowPopup("Operazione Salvata")
    
    
}

    function dimensioni_footer(footer,padding,icon_px)  
{
     footer=footer.GetText();
     padding=padding.GetText()   
     icon_px=icon_px.GetText()
    app.SaveNumber( "footer_altezza", footer );
      app.SaveNumber( "footer_padding", padding );
    app.SaveNumber("altezza_icone_ordini",icon_px )
    //db.ref("config/"+uid).update({"tipo_dispositivo_footer_altezza":footer,"tipo_dispositivo_footer_padding":padding})
       
  alert("Questa modifica necessita la chiusura dell'applicazione!!")
  app.Exit()
   
}

    function app_layout(app_layout)  
{
  
   datas['app_layout']=app_layout
   db.ref("config/"+uid).update({"app_layout":datas['app_layout']})
  // app.ShowPopup("Operazione Salvata")
   
}

function contkey(){
    //alert(datas["00_debug"])
if(datas['00_debug']=="true"){cc=0}else{cc=6}    
countouch++
//app.ShowPopup( countouch );6
if(countouch > cc){ keystore_view()}else{}
}
    
   
    function annulla_slide(){
         slide_menu.Animate("SlideToLeft"); 
         }
         
   
         function print_test(){
    
 app.ShowPopup('Test stampante in corso.. Prego verificare esito stampa');
      bt.SetDataMode( "Text" )  
  
    
    bt.Write('********************************\n');
    bt.Write('**********  APPSTREAM  *********\n');
    bt.Write('********************************\n');
    bt.Write('********  STAMPA TEST OK  ***** \n');
    bt.Write('********************************\n');
    bt.Write('********************************\n');
    bt.Write('********************************\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
    bt.Write('\n');
  
   
}


    function ricarica_sms(){
  //Crea un layout con oggetti verticalmente centrati.
	lay_web_sms = app.CreateLayout( "linear", "VCenter,FillXY" );	
	//Crea un controllo web.
	web = app.CreateWebView( 1,0.95,"ignoreErrors" )
	//web = app.CreateWebView( 1, 1 );
	web.SetOnProgress( web_OnProgess );
	lay_web_sms.AddChild( web );	
	b6 = app.CreateButton( "<i>Chiudi<i>", 0.7, -1, "Custom,HTML" );
    b6.SetStyle( "#22aa22", "#22aa22", 20, "#228822", 2, 0 );
    b6.SetOnTouch( chiudi_websms );
    lay_web_sms.AddChild( b6 );
    
	
	app.AddLayout( lay_web_sms );
	app.ShowProgress("Loading...");
	web.LoadUrl(datas["web_sms"]);
	
  
}

  function chiudi_websms(){
      lay_web_sms.Hide()
  }

 function chiudi_webpage(){
      lay_web_page.Hide()
  }

//Mostra il progresso di caricamento della pagina.
function web_OnProgess( progress )
{
	app.Debug( "progress = " + progress );
	if( progress==100 ) app.HideProgress();
}

function dwn(){
    app.ShowPopup('Dowload in cosrso. Attendere Prego...')
//    web_app = app.CreateAdView();
//    web_app.SetOnDownload("https://cittacoupon.it/apk-doien856we/AppStream.zip");
    app.DownloadFile('https://cittacoupon.it/apk-doien856we/AppStream.zip')
    //app.CreateDownloader()
    app.Exit()
}

  function urlpage(titolo){
    
// alert(" titolo:   "+titolo)
   for(rr in data_page){
   if(titolo==rr){
   url=data_page[rr]    
    }}
    
    
    var res = url.split("******");
   //alert("  res[0]:  "+res[0]+"    res[1]:   "+res[1]) 
    if(res.length > 1){
    url=res[0]+datas["app_id"]+res[1]
    //console.log("url  : "+url)
    //alert("url  : "+url)    
    }
    //alert("download   : "+url) 
  
  //Crea un layout con oggetti verticalmente centrati.
	lay_web_page = app.CreateLayout( "linear", "VCenter,FillXY" );	
	web_page = app.CreateWebView( 1,0.95,"ignoreErrors" )
	web_page.SetOnProgress( web_OnProgess );
	lay_web_page.AddChild( web_page );	

	b6=app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    b6.SetTextSize(14)
    b6.SetTextColor("#000000")
    b6.SetOnTouch( chiudi_webpage );

    lay_web_page.AddChild( b6 );
        
	app.AddLayout( lay_web_page );
	app.ShowProgress("Loading...");
	web_page.LoadUrl(url);    
    }
    
    function encode_formatta_data_html(datahtml){
    
    datain=datahtml.split("/")
    datareturn=datain[2]+"-"+datain[1]+"-"+datain[0]
    data_stampa=datahtml
    return datareturn
    
    }

    function reset_screen(){app.SetScreenMode( "Game" )}
    
    
    function cambia_chiusura_data(data,datahtml){
        console.log("data : "+data)
    datain=datahtml.split("-")
    datasearch=datain[2]+"/"+datain[1]+"/"+datain[0]
    data_stampa=datasearch
    riepilogo(datasearch)    
    }

    function screen_reset(){
        if(footer_button_tools=="false"){
        app.SetScreenMode( "Game" )
        }
    }

   function c19(){       
    var packageName = "it.ministerodellasalute.verificaC19"
    var className = "it.ministerodellasalute.verificaC19.ui.SplashScreenActivity";
    var action = "android.intent.action.VIEW";
    var type ="text/plain" 
    app.SendIntent( packageName,className, action,"","",type); 
    }
//********************************************************************

  function select_print(id,type,pages){        
    if(print_tipo_connessione=="bluetooth"){
    print_bluetooth(id,type,pages)
    }else{
       // alert("id: "+id+"  type: "+type+"  page: "+pages)
        read_header_print(id,type,pages)
        }            
    }



//********************************************************************

 function start_setting_wifi_printer(){    
     
 layWIFI = app.CreateLayout( "linear", "FillXY" );
 sup = app.CreateSupport();
 
  app.ShowProgressBar( "Setting Stampanti wifi, attendere prego...", 0 );
    setTimeout( "Update(10)", 1000 );
    setTimeout( "Update(30)", 2000 );
    setTimeout( "Update(40)", 3000 );
    setTimeout( "Update(60)", 4000 );
    setTimeout( "Update(100)", 5000 );
    setTimeout( "Hide()", 6000 );
    
    datas['tipo_ordine']=datas['tipo_ordine'].split(",")

 if(datas['print_wifi_qta']=="1"){Page0()}
 if(datas['print_wifi_qta']=="2"){Page0();Page1()}
 if(datas['print_wifi_qta']=="3"){Page0();Page1();Page2()}
 if(datas['print_wifi_qta']=="4"){Page0();Page1();Page2();Page3()}
 if(datas['print_wifi_qta']=="5"){Page0();Page1();Page2();Page3();Page4()}
 if(datas['print_wifi_qta']=="6"){Page0();Page1();Page2();Page3();Page4();Page5()}

 pv = sup.CreatePageViewer();
 
 if(datas['print_wifi_qta']=="1"){pv.AddPages(lay0)}
 if(datas['print_wifi_qta']=="2"){pv.AddPages(lay0,lay1)}
 if(datas['print_wifi_qta']=="3"){pv.AddPages(lay0,lay1,lay2)}
 if(datas['print_wifi_qta']=="4"){pv.AddPages(lay0,lay1,lay2,lay3)}
 if(datas['print_wifi_qta']=="5"){pv.AddPages(lay0,lay1,lay2,lay3,lay4)}
 if(datas['print_wifi_qta']=="6"){pv.AddPages(lay0,lay1,lay2,lay3,lay4,lay5)}
  
 //pv.SetOnChange( pv_OnChange );

 layWIFI.AddChild( pv );

 //Add layout to app.
 app.AddLayout( layWIFI );
 }


var listcat=",Tutto,Pizze,Primi,Secondi,Bar,Sfizi"

function return_menu_setting(){
lay_setting.Animate("SlideToLeft");
//app.OpenDrawer();
//app.CloseDrawer( "Left" );
} 
 

function update_tipo_ordine_0(item){tipo_ordine_select_0[4]=item}//  CASSA

function update_tipo_ordine_1(item){tipo_ordine_select_1[4]=item}
function update_tipo_ordine_2(item){tipo_ordine_select_2[4]=item}
function update_tipo_ordine_3(item){tipo_ordine_select_3[4]=item}
function update_tipo_ordine_4(item){tipo_ordine_select_4[4]=item}
function update_tipo_ordine_5(item){tipo_ordine_select_5[4]=item}

function update_categorie_0(item){tipo_ordine_select_0[5]=item}
function update_categorie_1(item){tipo_ordine_select_1[5]=item}
function update_categorie_2(item){tipo_ordine_select_2[5]=item}
function update_categorie_3(item){tipo_ordine_select_3[5]=item}
function update_categorie_4(item){tipo_ordine_select_4[5]=item}
function update_categorie_5(item){tipo_ordine_select_5[5]=item}

function update_autoprint_0(){
if(tipo_ordine_select_0[6]=="false"){tipo_ordine_select_0[6]="true"}else{tipo_ordine_select_0[6]="false"}
print_wifi_save("0")
}
function update_autoprint_1(){
if(tipo_ordine_select_1[6]=="false"){tipo_ordine_select_1[6]="true"}else{tipo_ordine_select_1[6]="false"}
print_wifi_save("1")
}
function update_autoprint_2(){
if(tipo_ordine_select_2[6]=="false"){tipo_ordine_select_2[6]="true"}else{tipo_ordine_select_2[6]="false"}
print_wifi_save("2")
}
function update_autoprint_3(){
if(tipo_ordine_select_3[6]=="false"){tipo_ordine_select_3[6]="true"}else{tipo_ordine_select_3[6]="false"}
print_wifi_save("3")
}
function update_autoprint_4(){
if(tipo_ordine_select_4[6]=="false"){tipo_ordine_select_4[6]="true"}else{tipo_ordine_select_4[6]="false"}
print_wifi_save("4")
}
function update_autoprint_5(){
if(tipo_ordine_select_5[6]=="false"){tipo_ordine_select_5[6]="true"}else{tipo_ordine_select_5[6]="false"}
print_wifi_save("5")
}
function update_autoprint_6(){
if(tipo_ordine_select_6[6]=="false"){tipo_ordine_select_6[6]="true"}else{tipo_ordine_select_6[6]="false"}
print_wifi_save("6")
}

 function pv_OnChange( pos )
 {
  app.ShowPopup( "Page Index: "+pos, "short,bottom" );
 }
 
  function Page0()
 {
   tipo_ordine_select_0=datas['print_wifi_00'].split(",") 
   
 lay0 = app.CreateLayout( "Linear" );
 lay0.SetBackColor( color.BLACK );
 
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );

 txt = app.CreateText( "Wifi Printer #CASSA" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay0.AddChild( txt );
 
 txt = app.CreateText("Totale Stampanti Sistema ( "+datas['print_wifi_qta']+" )" );
 txt.SetTextColor( "#059c2d" );
 txt.SetTextSize( 18, "sp" );
 lay0.AddChild( txt );
 
    /*
    edt00 = sup.CreateTextEdit(tipo_ordine_select_0[0], 0.5, null, "floating" );
    edt00.SetHint( "Reparto" ); // Float label.
    edt00.SetColor( "#FAFAFA" );
    lay0.AddChild( edt00 );
    */
    
    
    edt01 = sup.CreateTextEdit(tipo_ordine_select_0[1], 0.5, null, "floating" );
    edt01.SetHint( "Nome Stampante" ); // Float label.
    edt01.SetColor( "#FAFAFA" );
    lay0.AddChild( edt01 );
    
    edt02 = sup.CreateTextEdit(tipo_ordine_select_0[2], 0.5, null, "floating" );
    edt02.SetHint( "Porta" ); // Float label.
    edt02.SetColor( "#FAFAFA" );
    lay0.AddChild( edt02 );
    
    edt03 = sup.CreateTextEdit(tipo_ordine_select_0[3], 0.5, null, "floating" );
    edt03.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt03.SetColor( "#FAFAFA" );
    
    grid.AddChild( edt03 );
    
    btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("0")} );
    grid.AddChild( btn );
    
    lay0.AddChild( grid );
    
    /*
    autoprint_check = app.CreateCheckBox("Stampa Automatica Ordini");
    autoprint_check.SetChecked( tipo_ordine_select_0[6] );
    autoprint_check.SetOnTouch(function(){update_autoprint_0()}  );
    autoprint_check.SetTextColor( "#347aeb" );
    lay0.AddChild(autoprint_check );
    */
    
    
    //lay0.AddChild( grid );
    
    /*
    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_0[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_0);
    grid.AddChild( tipo_ordine );
    lay0.AddChild( grid );
    
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_0[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_0);
    grid.AddChild( categorie );
    lay0.AddChild( grid );
    */
    
    
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("0")});
    lay0.AddChild( btn );

     btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay0.AddChild( btn );
 }

 function Page1()
 {
 tipo_ordine_select_1=datas['print_wifi_01'].split(",")
   
   
 lay1 = app.CreateLayout( "Linear" );
 lay1.SetBackColor( color.BLACK );
 
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );

 txt = app.CreateText( "Wifi Printer #1" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay1.AddChild( txt );
 

    edt10 = sup.CreateTextEdit(tipo_ordine_select_1[0], 0.5, null, "floating" );
    edt10.SetHint( "Reparto" ); // Float label.
    edt10.SetColor( "#FAFAFA" );
    lay1.AddChild( edt10 );

    edt11 = sup.CreateTextEdit(tipo_ordine_select_1[1], 0.5, null, "floating" );
    edt11.SetHint( "Nome Stampante" ); // Float label.
    edt11.SetColor( "#FAFAFA" );
    lay1.AddChild( edt11 );
    
    edt12 = sup.CreateTextEdit(tipo_ordine_select_1[2], 0.5, null, "floating" );
    edt12.SetHint( "Porta" ); // Float label.
    edt12.SetColor( "#FAFAFA" );
    lay1.AddChild( edt12 );
    
    edt13 = sup.CreateTextEdit(tipo_ordine_select_1[3], 0.5, null, "floating" );
    edt13.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt13.SetColor( "#FAFAFA" );
    grid.AddChild( edt13 );

    
     btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("1")} );
    grid.AddChild( btn );
    lay1.AddChild( grid );
    
    /*
    autoprint_check = app.CreateCheckBox("Stampa Automatica Ordini");
    autoprint_check.SetChecked( tipo_ordine_select_1[6] );
    autoprint_check.SetOnTouch(function(){update_autoprint_1()}  );
     autoprint_check.SetTextColor( "#347aeb" );
    lay1.AddChild(autoprint_check );
    */ 

    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_1[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_1);
    grid.AddChild( tipo_ordine );
    lay1.AddChild( grid );
    
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_1[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_1);
    grid.AddChild( categorie );
    lay1.AddChild( grid );
    
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("1")});
    lay1.AddChild( btn );

    btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay1.AddChild( btn );


 }

 function Page2()
 {
 
  tipo_ordine_select_2=datas['print_wifi_02'].split(",")
   
   
 lay2 = app.CreateLayout( "Linear" );
 lay2.SetBackColor( color.BLACK );
 
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );

 txt = app.CreateText( "Wifi Printer #2" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay2.AddChild( txt );
 

    edt20 = sup.CreateTextEdit(tipo_ordine_select_2[0], 0.5, null, "floating" );
    edt20.SetHint( "Reparto" ); // Float label.
    edt20.SetColor( "#FAFAFA" );
    lay2.AddChild( edt20 );

    edt21 = sup.CreateTextEdit(tipo_ordine_select_2[1], 0.5, null, "floating" );
    edt21.SetHint( "Nome Stampante" ); // Float label.
    edt21.SetColor( "#FAFAFA" );
    lay2.AddChild( edt21 );
    
    edt22 = sup.CreateTextEdit(tipo_ordine_select_2[2], 0.5, null, "floating" );
    edt22.SetHint( "Porta" ); // Float label.
    edt22.SetColor( "#FAFAFA" );
    lay2.AddChild( edt22 );
    
    edt23 = sup.CreateTextEdit(tipo_ordine_select_2[3], 0.5, null, "floating" );
    edt23.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt23.SetColor( "#FAFAFA" );
    grid.AddChild( edt23 );
 
    
    btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("2")} );
    grid.AddChild( btn );
    lay2.AddChild( grid );
    
    /*
    autoprint_check = app.CreateCheckBox("Stampa Automatica Ordini");
    autoprint_check.SetChecked( tipo_ordine_select_2[6] );
    autoprint_check.SetOnTouch(function(){update_autoprint_2()}  );
    autoprint_check.SetTextColor( "#347aeb" );
    lay2.AddChild(autoprint_check );
    */
 
    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_2[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_2);
    grid.AddChild( tipo_ordine );
    lay2.AddChild( grid );
    
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_2[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_2);
    grid.AddChild( categorie );
    lay2.AddChild( grid );
    
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("2")});
    lay2.AddChild( btn );

 btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay2.AddChild( btn );


 }

 function Page3()
 {
  tipo_ordine_select_3=datas['print_wifi_03'].split(",")
   
   
 lay3 = app.CreateLayout( "Linear" );
 lay3.SetBackColor( color.BLACK );
 
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );

 txt = app.CreateText( "Wifi Printer #3" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay3.AddChild( txt );
 

    edt30 = sup.CreateTextEdit(tipo_ordine_select_3[0], 0.5, null, "floating" );
    edt30.SetHint( "Reparto" ); // Float label.
    edt30.SetColor( "#FAFAFA" );
    lay3.AddChild( edt30 );

    edt31 = sup.CreateTextEdit(tipo_ordine_select_3[1], 0.5, null, "floating" );
    edt31.SetHint( "Nome Stampante" ); // Float label.
    edt31.SetColor( "#FAFAFA" );
    lay3.AddChild( edt31 );
    
    edt32 = sup.CreateTextEdit(tipo_ordine_select_3[2], 0.5, null, "floating" );
    edt32.SetHint( "Porta" ); // Float label.
    edt32.SetColor( "#FAFAFA" );
    lay3.AddChild( edt32 );
    
    edt33 = sup.CreateTextEdit(tipo_ordine_select_3[3], 0.5, null, "floating" );
    edt33.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt33.SetColor( "#FAFAFA" );
    grid.AddChild( edt33 );

    
    btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("3")} );
    grid.AddChild( btn );
    lay3.AddChild( grid );
    
    /*
    autoprint_check = app.CreateCheckBox("Stampa Automatica Ordini");
    autoprint_check.SetChecked( tipo_ordine_select_3[6] );
    autoprint_check.SetOnTouch(function(){update_autoprint_3()}  );
    autoprint_check.SetTextColor( "#347aeb" );
    lay3.AddChild(autoprint_check );
    */
    
    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_3[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_3);
    grid.AddChild( tipo_ordine );
    lay3.AddChild( grid );
    
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_3[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_3);
    grid.AddChild( categorie );
    lay3.AddChild( grid );
    
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("3")});
    lay3.AddChild( btn );
    
    btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay3.AddChild( btn );
 }

 function Page4()
 {
  tipo_ordine_select_4=datas['print_wifi_04'].split(",")
   
   
 lay4 = app.CreateLayout( "Linear" );
 lay4.SetBackColor( color.BLACK );
 
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );

 txt = app.CreateText( "Wifi Printer #4" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay4.AddChild( txt );
 

    edt40 = sup.CreateTextEdit(tipo_ordine_select_4[0], 0.5, null, "floating" );
    edt40.SetHint( "Reparto" ); // Float label.
    edt40.SetColor( "#FAFAFA" );
    lay4.AddChild( edt40 );

    edt41 = sup.CreateTextEdit(tipo_ordine_select_4[1], 0.5, null, "floating" );
    edt41.SetHint( "Nome Stampante" ); // Float label.
    edt41.SetColor( "#FAFAFA" );
    lay4.AddChild( edt41 );
    
    edt42 = sup.CreateTextEdit(tipo_ordine_select_4[2], 0.5, null, "floating" );
    edt42.SetHint( "Porta" ); // Float label.
    edt42.SetColor( "#FAFAFA" );
    lay4.AddChild( edt42 );
    
    edt43 = sup.CreateTextEdit(tipo_ordine_select_4[3], 0.5, null, "floating" );
    edt43.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt43.SetColor( "#FAFAFA" );
    grid.AddChild( edt43 );
 
    
     btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("4")} );
    grid.AddChild( btn );
    lay4.AddChild( grid );
    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_4[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_4);
    grid.AddChild( tipo_ordine );
    lay4.AddChild( grid );
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_4[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_4);
    grid.AddChild( categorie );
    lay4.AddChild( grid );
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("4")});
    lay4.AddChild( btn );
    btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay4.AddChild( btn );
 }

 function Page5()
 {
  tipo_ordine_select_5=datas['print_wifi_05'].split(",")   
 lay5 = app.CreateLayout( "Linear" );
 lay5.SetBackColor( color.BLACK );
  grid = sup.CreateGridLayout();
  grid.SetColCount( 2 );
 txt = app.CreateText( "Wifi Printer #5" );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetTextSize( 25, "sp" );
 lay5.AddChild( txt );
    edt50 = sup.CreateTextEdit(tipo_ordine_select_5[0], 0.5, null, "floating" );
    edt50.SetHint( "Reparto" ); // Float label.
    edt50.SetColor( "#FAFAFA" );
    lay5.AddChild( edt50 );
    edt51 = sup.CreateTextEdit(tipo_ordine_select_5[1], 0.5, null, "floating" );
    edt51.SetHint( "Nome Stampante" ); // Float label.
    edt51.SetColor( "#FAFAFA" );
    lay5.AddChild( edt51 );    
    edt52 = sup.CreateTextEdit(tipo_ordine_select_5[2], 0.5, null, "floating" );
    edt52.SetHint( "Porta" ); // Float label.
    edt52.SetColor( "#FAFAFA" );
    lay5.AddChild( edt52 );    
    edt53 = sup.CreateTextEdit(tipo_ordine_select_5[3], 0.5, null, "floating" );
    edt53.SetHint( "IP Stampante 00.00.00.00" ); // Float label.
    edt53.SetColor( "#FAFAFA" );
    grid.AddChild( edt53 );
    btn = app.CreateButton( "Test", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetMargins(0.05,0,0,0)
    btn.SetOnTouch( function(){test_printer("5")} );
    grid.AddChild( btn );
    lay5.AddChild( grid );
    txt = app.CreateText( "Tipo Ordine: ",0.3);
    txt.SetMargins(0,0.05,0,0)
    grid.AddChild(txt);
    tipo_ordine = app.CreateSpinner(datas['tipo_ordine'], 0.3 );
    tipo_ordine.SelectItem(tipo_ordine_select_5[4])
    tipo_ordine.SetMargins(-0.25,0.05,0,0)
    tipo_ordine.SetOnChange(update_tipo_ordine_5);
    grid.AddChild( tipo_ordine );
    lay5.AddChild( grid );
    txt = app.CreateText( "Categorie: ",0.3);
    grid.AddChild( txt );
    categorie = app.CreateSpinner(listcat, 0.3 );
    categorie.SelectItem(tipo_ordine_select_5[5])
    categorie.SetMargins(-0.25,0,0,0)
    categorie.SetOnChange(update_categorie_5);
    grid.AddChild( categorie );
    lay5.AddChild( grid );
    btn = app.CreateButton( "Save", 0.2, 0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(function(){print_wifi_save("5")});
    lay5.AddChild( btn );    
    btn = app.CreateButton( "Esci", 0.2,0.05, "custom" );
    btn.SetStyle( "#FAFAFA", "#FAFAFA", 5, "", 0, 5 );
    btn.SetMargins(0,0.1,0,0)
    btn.SetTextColor( "#777777" );
    btn.SetTextSize( 16, "sp" );
    btn.SetOnTouch(wifi_uscita);
    lay5.AddChild( btn );
 }


 function wifi_uscita()
 {
  app.Exit();
 }
 
function setting_printer(inp){
lay_setting = app.CreateLayout( "Linear" );
lay_setting.SetBackColor( color.BLACK );
if(inp=="04"){
getip_sett=edt04.GetText()
web = app.CreateWebView( 1, 0.9 );	
lay_setting.AddChild( web );
web.LoadUrl( "http://"+getip_sett );
    btn = app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu_setting);
    lay_setting.AddChild( btn );
}
if(inp=="14"){
getip_sett=edt14.GetText()
web = app.CreateWebView( 1, 0.9 );	
lay_setting.AddChild( web );
web.LoadUrl( "http://"+getip_sett );
btn = app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu_setting);
    lay_setting.AddChild( btn );
}
if(inp=="24"){
getip_sett=edt24.GetText()
web = app.CreateWebView( 1, 0.9 );	
lay_setting.AddChild( web );
web.LoadUrl( "http://"+getip_sett );
btn = app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu_setting);
    lay_setting.AddChild( btn );
}
if(inp=="34"){
getip_sett=edt34.GetText()
web = app.CreateWebView( 1, 0.9 );	
lay_setting.AddChild( web );
web.LoadUrl( "http://"+getip_sett );
btn = app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu_setting);
    lay_setting.AddChild( btn );
}
if(inp=="44"){
getip_sett=edt44.GetText()
web = app.CreateWebView( 1, 0.9 );	
lay_setting.AddChild( web );
web.LoadUrl( "http://"+getip_sett );
btn = app.CreateButton( "Chiudi",  1, 0.05, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu_setting);
    lay_setting.AddChild( btn );
}
app.AddLayout(lay_setting );

}
 
 
function print_wifi_save(inp)
{     

if(inp=="0"){  // CASSA
db.ref("config/"+uid).update({"print_wifi_00":"Master,"+edt01.GetText()+","+edt02.GetText()+","+edt03.GetText()+",,,"+tipo_ordine_select_0[6]})
app.ShowPopup("Salvataggio Effettuato")
}
if(inp=="1"){
if(tipo_ordine_select_1[4] == tipo_ordine_select_2[4] || tipo_ordine_select_1[4] == tipo_ordine_select_3[4] || tipo_ordine_select_1[4] == tipo_ordine_select_4[4] || tipo_ordine_select_1[4] == tipo_ordine_select_5[4])
{
alert("Attenzione!! Tipo Ordine ( "+tipo_ordine_select_1[4]+" ) gia' assegnato.")
}else{    
db.ref("config/"+uid).update({"print_wifi_01":edt10.GetText()+","+edt11.GetText()+","+edt12.GetText()+","+edt13.GetText()+","+tipo_ordine_select_1[4]+","+tipo_ordine_select_1[5]+","+tipo_ordine_select_1[6]})
app.ShowPopup("Salvataggio Effettuato")
}
}
if(inp=="2"){    
if(tipo_ordine_select_2[4] == tipo_ordine_select_1[4] || tipo_ordine_select_2[4] == tipo_ordine_select_3[4] || tipo_ordine_select_2[4] == tipo_ordine_select_4[4] || tipo_ordine_select_2[4] == tipo_ordine_select_5[4])
{    
alert("Attenzione!! Tipo Ordine ( "+tipo_ordine_select_2[4]+" ) gia' assegnato.")
}else{
db.ref("config/"+uid).update({"print_wifi_02":edt20.GetText()+","+edt21.GetText()+","+edt22.GetText()+","+edt23.GetText()+","+tipo_ordine_select_2[4]+","+tipo_ordine_select_2[5]+","+tipo_ordine_select_2[6]})
app.ShowPopup("Salvataggio Effettuato")
}
}
if(inp=="3"){
if(tipo_ordine_select_3[4] == tipo_ordine_select_1[4] || tipo_ordine_select_3[4] == tipo_ordine_select_2[4] || tipo_ordine_select_3[4] == tipo_ordine_select_4[4] || tipo_ordine_select_3[4] == tipo_ordine_select_5[4])
{
alert("Attenzione!! Tipo Ordine ( "+tipo_ordine_select_3[4]+" ) gia' assegnato.")
}else{
db.ref("config/"+uid).update({"print_wifi_03":edt30.GetText()+","+edt31.GetText()+","+edt32.GetText()+","+edt33.GetText()+","+tipo_ordine_select_3[4]+","+tipo_ordine_select_3[5]+","+tipo_ordine_select_3[6]})
app.ShowPopup("Salvataggio Effettuato")
}
}
if(inp=="4"){
if(tipo_ordine_select_4[4] == tipo_ordine_select_1[4] || tipo_ordine_select_4[4] == tipo_ordine_select_2[4] || tipo_ordine_select_4[4] == tipo_ordine_select_3[4] || tipo_ordine_select_4[4] == tipo_ordine_select_5[4])
{
alert("Attenzione!! Tipo Ordine ( "+tipo_ordine_select_4[4]+" ) gia' assegnato.")
}else{
db.ref("config/"+uid).update({"print_wifi_04":edt40.GetText()+","+edt41.GetText()+","+edt42.GetText()+","+edt43.GetText()+","+tipo_ordine_select_4[4]+","+tipo_ordine_select_4[5]+","+tipo_ordine_select_4[6]})
app.ShowPopup("Salvataggio Effettuato")     
}
}
if(inp=="5"){
if(tipo_ordine_select_5[4] == tipo_ordine_select_1[4] || tipo_ordine_select_5[4] == tipo_ordine_select_2[4] || tipo_ordine_select_5[4] == tipo_ordine_select_3[4] || tipo_ordine_select_5[4] == tipo_ordine_select_4[4])
{
alert("Attenzione!! Tipo Ordine ( "+tipo_ordine_select_5[4]+" ) gia' assegnato.")
}else{
db.ref("config/"+uid).update({"print_wifi_05":edt50.GetText()+","+edt51.GetText()+","+edt52.GetText()+","+edt53.GetText()+","+tipo_ordine_select_5[4]+","+tipo_ordine_select_5[5]+","+tipo_ordine_select_5[6]})
app.ShowPopup("Salvataggio Effettuato")       
}
}
}
function Update( progress )
{
    app.UpdateProgressBar( progress );
}
function Hide()
{
    app.HideProgressBar();
} 

function handleReply_master(error){  
    console.log(" **** HEAD FUNCTION ricevi ****** ERROR : "+error)
    if( error == "true" ){app.ShowPopup("err master update!!")}
    else{app.ShowPopup("OK master update!!")}     
    }
    
    
function getGPS_distanza(start_lat,start_lng,end_lat,end_lng) {
  if (start_lat == end_lat && start_lng == end_lng) {
    return 0;
  }
  const radlat1 = (Math.PI * start_lat) / 180;
  const radlat2 = (Math.PI * end_lat) / 180;
  const theta = start_lng - end_lng;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km
  dist= dist*1000
  dist=parseFloat(dist).toFixed(0) 
  return dist;
}    
function initMap() { 
  const service = new google.maps.DistanceMatrixService();
  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };
  const request = {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };
 JSON.stringify(request,null,2);
  service.getDistanceMatrix(request).then((response) => {
    document.getElementById("response").innerText = JSON.stringify(
      response,
      null,
      2
    );
    const originList = response.originAddresses;
    const destinationList = response.destinationAddresses;
    deleteMarkers(markersArray);
    const showGeocodedAddressOnMap = (asDestination) => {
      const handler = ({ results }) => {
        map.fitBounds(bounds.extend(results[0].geometry.location));
        markersArray.push(
          new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            label: asDestination ? "D" : "O",
          })
        );
      };
      return handler;
    };
    for (let i = 0; i < originList.length; i++) {
      const results = response.rows[i].elements;
      geocoder
        .geocode({ address: originList[i] })
        .then(showGeocodedAddressOnMap(false));
      for (let j = 0; j < results.length; j++) {
        geocoder
          .geocode({ address: destinationList[j] })
          .then(showGeocodedAddressOnMap(true));
      }
    }
  });
}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

function posizione_rider(rider_order){
  db.ref("ordini_in_consegna/"+uid+"/"+rider_order).once("value",
    function(rider){    
    rider = rider.val()   
    for(a in rider){       
   if(a  == "lat_rider"){ 
    rider_lat=rider[a]   
      }
    if(a  == "lng_rider"){ 
    rider_lng=rider[a]   
      }      
  } 
geo(rider_lat,rider_lng)
 })         
}   
    function ris_dist_google(error,distanza_google){    
     gdata={}
     gdata_dettaglio={}
     app.HideProgress();  
     google_time=moment().format("DD/MM/YYYY HH:mm:ss")
     array_distanza=distanza_google.split(" ") 
     if(array_distanza[1]=="km" || array_distanza[1]=="Km" ){
     distanza=array_distanza[0]*1000}else{
     distanza=array_distanza[0]}
     gdata.delivery_accept="ok"
     gdata.distanza_google=distanza_google
     gdata.distanza=distanza
     gdata.delivery=distanza
     gdata.distanza_google_time=google_time
     gdata_dettaglio.delivery_accept="ok"
     gdata_dettaglio.distanza_google=distanza_google
     gdata_dettaglio.distanza=distanza
     gdata_dettaglio.delivery=distanza
     gdata_dettaglio.distanza_google_time=google_time                
     db.ref("ordini_in_consegna/"+uid+"/"+Fid_ordine).update(gdata).then(OnSuccessSend).catch(OnFailedSend);
     db.ref("dettaglio_ordini/"+uid+"/"+Fid_ordine).update(gdata_dettaglio).then(OnSuccessSend).catch(OnFailedSend);
     dettaglio_ordini(Fid_ordine,FdataPage,Fsend_type)       
     }       
    function OnSuccessSend(){};
    function OnFailedSend(){};
    function premium_page(){
    alert("ComingSoon..")   
    }
 