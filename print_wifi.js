//********************** STAMPA HEADER ORDINI ***********
    app.LoadScript("Acapo.js")
    var totale=0; 
    var aggiunte_prezzo=0
    var qta_prodotto=0
    var prezzo_prodotto=0
    var sub_totale_aggiunte=0
    var sub_totale_prodotti=0
    var costo_delivery=0
    var sconto=0
    var costo_pay=0
    var t=0
    //var print_step
    var qrcode_stampa
    var lat_stampa,lng_stampa
    var jip="Cassa"
    var id_ordine,tipo_ordine_reparto,data_ordine,data_stimata,data_lavorazione,delivery_costo
    var pagamento_tipo,pagamento_stato
    var nome_stampa,cognome_stampa,indirizzo_stampa,citta_stampa,cap_stampa,campanello_stampa,telefono_stampa
    var lat_stampa,lng_stampa,email_stampa,tavolo_stampa,ombrellone_stampa,note_stampa,note_stampa
    var stats
    var tipo_ordine=[]
    
    function read_header_print(id,type,pages){ 
    app.ShowProgress("Stampa in corso...");
    idP=id
    id_ordine=id
    stats=pages
    if(type=="dettaglio"){nodetype="dettaglio_ordini"}else{nodetype="dettaglio_storico"}    
    db.ref(nodetype+"/"+uid+"/"+id).once("value",
    function(doia_stampa){    
    var doia_stampa  = doia_stampa.val()   
    for(a in doia_stampa){      
if(a =="ordine_tipo"){
tipo_ordine=select_tipo("stampa",parseInt(doia_stampa["ordine_tipo"]))
tipo_ordine_reparto=ordine(doia_stampa["ordine_tipo"])
}
if(a == "data_ordine")      {data_ordine=doia_stampa['data_ordine']}
if(a == "data_stimata")     {data_stimata=doia_stampa['data_stimata']}
if(a == "data_lavorazione") {data_lavorazione=doia_stampa['data_lavorazione']
}
if(a == "delivery_costo")   {delivery_costo=Number(doia_stampa["delivery_costo"])} 
if(a=="pagamento_tipo") {pagamento_tipo=doia_stampa["pagamento_tipo"]}
if(a=="pagamento_stato"){pagamento_stato=doia_stampa["pagamento_stato"]}
if(a=="nome"){nome_stampa=doia_stampa["nome"]}
if(a=="cognome"){cognome_stampa=doia_stampa["cognome"]}
if(a=="indirizzo"){indirizzo_stampa=doia_stampa["indirizzo"]}    
if(a=="paese"){citta_stampa=doia_stampa["paese"]}
if(a=="cap"){cap_stampa=doia_stampa["cap"]}
if(a=="campanello"){campanello_stampa=doia_stampa["campanello"]}
if(a=="telefono"){telefono_stampa=doia_stampa["telefono"]}
if(a=="lat"){lat_stampa=doia_stampa["lat"]}
if(a=="lng"){lng_stampa=doia_stampa["lng"]}
if(a=="email"){email_stampa=doia_stampa['email']}
if(a=="tavolo"){tavolo_stampa=doia_stampa['tavolo']}
if(a=="ombrellone"){ombrellone_stampa=doia_stampa['ombrellone']}
if(doia_stampa["ordine_tipo"]=="1" && datas["stampa_qrcode"]=="true"){qrcode_stampa="true"}else{qrcode_stampa="false"}
if(a=="note"){note_stampa=doia_stampa["note"];}    
}

net.Connect(print_0[3],print_0[2])}) 
 } 
          

    function Stampa_ordine(steps){ 
	if( !net.IsConnected() ){ 
	app.ShowPopup( "Please connect Wifi-Printer" );
	return true
	}
	if(steps==2){
	if(tipo_ordine_reparto == print_1[4]){jip=print_1[0]}
    if(tipo_ordine_reparto == print_2[4]){jip=print_2[0]}
    if(tipo_ordine_reparto == print_3[4]){jip=print_3[0]}
    if(tipo_ordine_reparto == print_4[4]){jip=print_4[0]}
    if(tipo_ordine_reparto == print_5[4]){jip=print_5[0]}
	}
    
     dataprint = encoder
    .initialize().codepage('cp850')
    .size('normal')
    .align('center')
    .size('normal')
    .line('\u001D!\u0011'+'IdOrdine: #'+id_ordine)
    .line()
    .bold(true)
    .line('..'+tipo_ordine["tipo"])
    .bold(false)    
    .encode()
     net.SendBytes( dataprint );      
    if(tavolo_stampa!="***" && tavolo_stampa){
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line(" Tavolo: "+tavolo_stampa)
    .bold(false)
    .encode() 
     net.SendBytes( dataprint );     
    tavolo_stampa=""
    }
  
    if(ombrellone_stampa!="***" && ombrellone_stampa){
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("   Ombrellone: "+ombrellone_stampa)
    .bold(false)
    .encode()
     net.SendBytes( dataprint );     
    ombrellone_stampa=""
    }

    if(datas["stampa_solo_prodotti"]=="false"){     
     dataprint = encoder
    .initialize().codepage('cp850')
    .line()
    .line("    Ordinato  : "+data_ordine)
    .line("    InConsegna: "+data_stimata)
    .bold(true)
    .line()
    .align('center')
    .line("    #Consegnato: "+data_lavorazione)
    .bold(false)
    .line()
    .encode()
     net.SendBytes( dataprint );
    if(datas['stampa_pagamento']=="true"){
     dataprint = encoder
    .initialize()
    .bold(true)
    .line("   ----------------------------------------------")
    .align('center')
    .line("\u001D!\u0011 Stato Pagamento")
    .bold(false)
    .line()
    .align('left')
    .line("   "+pagamento_tipo).line()
    .line("   "+pagamento_stato)
    .line("\u001D!\0")
    .line("   ----------------------------------------------")
    .line()
    .encode() 
     net.SendBytes( dataprint );    
    }
    
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("   + \u001D!\u0011"+nome_stampa+"  "+cognome_stampa)
    .bold(false)
    .line("\u001D!\0")
    .line("   - "+indirizzo_stampa)
    .line("   - Citta: "+citta_stampa+"  Cap: "+cap_stampa)
    .encode() 
     net.SendBytes( dataprint );     
     if(campanello_stampa!="***" && campanello_stampa ){
    dataprint = encoder
    .initialize().codepage('cp850')
    .line("   - Campanello: "+campanello_stampa)
    .encode() 
     net.SendBytes( dataprint );     
    campanello_stampa=""
    }

    if(datas['stampa_email']=="true" && email_stampa!="***" && email_stampa ){
    dataprint = encoder
    .initialize().codepage('cp850')
    .size('small')
    .line("   - Email: "+email_stampa)
    .size('normal')
    .encode() 
     net.SendBytes( dataprint );     
    email_stampa=""
    }

    if(telefono_stampa!="" && telefono_stampa){
    dataprint = encoder
    .initialize()
    .line("   - Tel.: "+telefono_stampa)
    .encode() 
     net.SendBytes( dataprint );     
    telefono_stampa=""
    }

     if(note_stampa!="***" && note_stampa){
     note_stampa=Acapo(note_stampa,"note","80")
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line()
    .line("   Note:")
    .bold(false)
    dataprint = encoder
    .initialize()
    .encode() 
     net.SendBytes( dataprint );         
    for(var pr=0;pr<note_stampa.length;pr++){
    dataprint = encoder
    .initialize().codepage('cp850')  
    .line("   "+note_stampa[pr]) 
    .encode() 
     net.SendBytes( dataprint );    
    }
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)  
    .line("   ----------------------------------------------")
    .bold(false)  
    .encode() 
     net.SendBytes( dataprint );    
    note_stampa=""
    }}

    db.ref(nodetype+"/"+uid+"/"+idP+"/ordine").once("value",
    function(doia_ordine_stampa){ 
    doia_ordine_stampa = doia_ordine_stampa.val()
    control(doia_ordine_stampa)
    function control(doia_ordine_stampa){
    for(a in doia_ordine_stampa){
    if(typeof doia_ordine_stampa[a]  === 'object'){sal=doia_ordine_stampa[a]
    if(isNaN(a)){
    if(a == "aggiunte"){}else{
    categoria_prodotto = a;
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("   *** "+categoria_prodotto)
    .bold(false)
    .encode()    
     net.SendBytes( dataprint );     
    }}
    control(sal)
    }else{
    if(a == "aggiunte_nome" || a == "aggiunte_prezzo"){ 
    if(a == "aggiunte_nome"){aggiunte_nome=doia_ordine_stampa['aggiunte_nome']}
    if(a == "aggiunte_prezzo"){aggiunte_prezzo=Number(doia_ordine_stampa['aggiunte_prezzo'])  
    sub_totale_aggiunte = sub_totale_aggiunte + aggiunte_prezzo    
    if(aggiunte_nome !== ""){
    if(datas['stampa_prezzi']=="true"){        
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("   Aggiunta "+aggiunte_nome+"   1 x "+aggiunte_prezzo+"$")
    .bold(false)
    .encode()     
     net.SendBytes( dataprint );     
    }else{
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line(" Aggiunte "+aggiunte_nome)
    .bold(false)
    .encode()   
     net.SendBytes( dataprint );     
     }}}   
    }else{    
if(a == "titolo")     {titolo_prodotto=doia_ordine_stampa['titolo']}
if(a == "descrizione"){descrizione_prodotto=doia_ordine_stampa['descrizione']}
if(a == "qta")        {qta_prodotto=doia_ordine_stampa['qta']}
if(a == "prezzo")     {prezzo_prodotto=Number(doia_ordine_stampa['prezzo'])
sub_totale_prodotti = sub_totale_prodotti + (qta_prodotto * prezzo_prodotto)  
if(datas["stampa_prezzi"]=="true"){st_qta_prodotto=qta_prodotto;st_prezzo_prodotto=prezzo_prodotto;tt=" X "}else{st_qta_prodotto="";st_prezzo_prodotto="",tt=""} 
     dataprint = encoder
    .initialize().codepage('cp850')
    .line()
    .bold(true)
    .line("   "+titolo_prodotto+"   "+st_qta_prodotto+tt+st_prezzo_prodotto+"$" )
    .bold(false)
    .encode()
     net.SendBytes( dataprint );     
if(datas['stampa_descrizione']=="true"){
    descrizione_prodotto=Acapo(descrizione_prodotto,"descrizione_prodotto","80")
    for(var pr=0;pr<descrizione_prodotto.length;pr++){
     dataprint = encoder
    .initialize().codepage('cp850')  
    .line("   "+descrizione_prodotto[pr])
     net.SendBytes( dataprint );     
   }
descrizione_prodotto=""
    }}
}}}}

totale = delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale 
 sub_totale_prodotti=parseFloat(sub_totale_prodotti).toFixed(2)
 totale=parseFloat(totale).toFixed(2)
   if(datas['stampa_totali']=="true"){
    if(totale > 0){        
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("   ----------------------------------------------")
    .line("   Riepilogo Totali").line()
    .bold(false)
    .encode()
     net.SendBytes( dataprint );
    }
    
    if(sub_totale_prodotti>0)
    {    
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(false)
    .line("   Tot.Prodotti: "+sub_totale_prodotti+"$")
    .encode()
     net.SendBytes( dataprint );
    }
  
    if(sub_totale_aggiunte>0){   
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(false)
    .line("   Tot.Aggiunte: "+sub_totale_aggiunte+"$")
    .encode()
     net.SendBytes( dataprint );
      }
     if(delivery_costo>0){       
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(false)
    .line("   Delivery: "+delivery_costo+"$")
    .encode() 
     net.SendBytes( dataprint );     
      }
    if(sconto>0){ 
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(false)
    .line("   Sconto: "+sconto+"$")
    .encode() 
     net.SendBytes( dataprint );
      }
  if(costo_pay>0){ 
      dataprint = encoder
    .initialize().codepage('cp850')
    .bold(false)
    .line("   CostoPagamento: "+costo_pay+"$")
    .encode()
     net.SendBytes( dataprint );
      }
  if(totale>0){
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("\u001D!\u0011")
    .line("  #Totale: "+totale+"$")
    .line("\u001D!\0")
    .bold(false)
    .encode()
     net.SendBytes( dataprint );
    }}     
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line()
    .line("  Lavorazione: "+stats)
    .underline()
    .line()
    .bold(false)
    .encode()
    net.SendBytes( dataprint );  
    if(totale > 0){
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line().line().line().line().line()
    .bold(false)
    .cut('full')
    .encode()
     net.SendBytes( dataprint );  
    if(qrcode_stampa=="true"){
    coordinate=lat_stampa+","+lng_stampa
    coordinate="https://www.google.it/maps?q="+lat_stampa+","+lng_stampa  
    if(!campanello_stampa){campanello_stampa="..Mancante"}
    if(!telefono_stampa){telefono_stampa="..Mancante"}
     dataprint = encoder
    .initialize().codepage('cp850')
    .align('center')
    .line("\u001D!\u0011 Delivery  #"+id_ordine).line()
    .line("\u001D!\0")
    .line()
    .bold(true)
    .line("   Dettaglio Pagamento")
    .bold(false)
    .line("   "+pagamento_tipo)
    .line("   "+pagamento_stato)
    .qrcode(coordinate+'',1,8,'h')
    .line()
    .bold(true)
    .line("   Dettaglio Cliente")
    .bold(false)
    .line()
    .line("   Nome: "+nome_stampa+" "+cognome_stampa)
    .line("   Nome Campanello: "+campanello_stampa)
    .line("   Tel: "+telefono_stampa)
    .line("   "+indirizzo_stampa)
    .line("   "+citta_stampa+"   ("+cap_stampa+")")
    .line().line().line().line().line().line()
    .cut('full')
    .encode()      
     net.SendBytes( dataprint );}}                
    totale = delivery_costo = costo_pay = sconto = sub_totale_prodotti = sub_totale_aggiunte = 0})
    return(jip)}

    function net_OnConnect( connected )
    {
	if(connected) {	
	countp++    
	xd=Stampa_ordine(countp);
	if(xd && countp==1){ 
	app.ShowPopup( "1° Stampa OK" )
	app.HideProgress()
	setPrint_time=setInterval(select_print_wifi, 5000);	
	}
	if(xd && countp==2){ 
	app.ShowPopup( "2° Stampa OK" )
	app.HideProgress()
	clearInterval(setPrint_time);countp=0	
	}
	if(!xd){
	countp=0    	
	clearInterval(setPrint_time)	 
	}
    }else{
    countp=0
    synthBall = app.CreateSynth( "VCA" );
    synthBall.SetWaveShape( "Square" );
    synthBall.SetVca( 1, 30, 0, 0 );
    synthBall.PlayTone( 960, 100 );	
	clearInterval(setPrint_time)
	app.HideProgress()
    alert( "Attenzione!! Errore Connessione Stampante/i "+xd+" \n Controllare Configurazione.")	
}
}

    function select_print_wifi(){    
    if(tipo_ordine_reparto == print_1[4]){net.Connect(print_1[3],print_1[2])
    }else if(tipo_ordine_reparto == print_2[4]){net.Connect(print_2[3],print_2[2])
    }else if(tipo_ordine_reparto == print_3[4]){net.Connect(print_3[3],print_3[2])
    }else if(tipo_ordine_reparto == print_4[4]){net.Connect(print_4[3],print_4[2])
    }else if(tipo_ordine_reparto == print_5[4]){net.Connect(print_5[3],print_5[2])
    }else{countp=0;clearInterval(setPrint_time)}        
    }
 
    function net_OnConnect_test( connected )
    {    
	if(connected) {     	   
	 xd=print_test_wifi();
	if(xd=="OK_PRINT_TEST"){
	app.HideProgress()    
	clearTimeout(print_test_time);
	alert("Test Collegamento Stampante OK")
	}else{
	app.HideProgress()
	clearTimeout(print_test_time);
	synthBall = app.CreateSynth( "VCA" );
    synthBall.SetWaveShape( "Square" );
    synthBall.SetVca( 1, 30, 0, 0 );
    synthBall.PlayTone( 960, 100 );		
	alert("Attenzione!! Test Stampa non riuscito. \n Controllare le impostazioni di rete della stampante e riprovare")}
	}else{
	    app.HideProgress()
	    clearTimeout(print_test_time);
	    synthBall = app.CreateSynth( "VCA" );
    synthBall.SetWaveShape( "Square" );
    synthBall.SetVca( 1, 30, 0, 0 );
    synthBall.PlayTone( 960, 100 );		
	    alert("Attenzione!! Stampante Spenta o non Collegata correttamente.")}}

function error_test_print(){
     app.HideProgress()
     synthBall = app.CreateSynth( "VCA" );
    synthBall.SetWaveShape( "Square" );
    synthBall.SetVca( 1, 30, 0, 0 );
    synthBall.PlayTone( 960, 100 );	
    alert("Test collegamento stampante non riuscito. \n Controllare \n 1) IP Rete \n 2) Porta \n 3) Alimentazione Stampante") 
    }

function print_test_wifi(){
   dataprint = encoder
    .initialize()
    .line()
    .line('Test Stampa..WIFI')
    .line()
    .align('center')
    .size('normal')
    .line('\u001D!\u0011'+'$Print Test #OK ')
    .line()
    .line('    à è ì ò ù $ ')
    .line().line().line().line().line()
    .cut("full")
    .encode()
    net.SendBytes( dataprint );   
    return "OK_PRINT_TEST"
}

 function ordine(name){
 order_name=datas['tipo_ordine'].split(",")
  if(name=="0"){return(order_name[1])}
  if(name=="1"){return(order_name[2])}
  if(name=="2"){return(order_name[3])}
  if(name=="3"){return(order_name[4])}
  if(name=="4"){return(order_name[5])}   
 }
 

  
    function test_printer(inp){
    app.ShowProgress( "Attendere Prego. Test stampa in corso..." ); 
    print_test_time=setTimeout(error_test_print, 3000) 
    if("0"==inp){porta_=edt02.GetText();ip_=edt03.GetText()}
    if("1"==inp){porta_=edt12.GetText();ip_=edt13.GetText()}
    if("2"==inp){porta_=edt22.GetText();ip_=edt23.GetText()}
    if("3"==inp){porta_=edt32.GetText();ip_=edt33.GetText()}
    if("4"==inp){porta_=edt42.GetText();ip_=edt43.GetText()}
    if("5"==inp){porta_=edt52.GetText();ip_=edt53.GetText()}  
    net.SetOnConnect( net_OnConnect_test);
    net.Connect(ip_,porta_ )
    }
    
     function sps(){
     dataprint = encoder
    .initialize()
    .size('normal')
    .align('center')
    .size('normal')
    .line('\u001D!\u0011'+'Test print ok')
    .line()
    .line()
    .line()
    .encode()
     net.SendBytes( dataprint );
        }
        
    function print_stop_timer(){   
    app.ShowPopup("Errore connessione stampante!! ")
    clearTimeout(print_times);  
    app.HideProgress()  
    }
    
    function webon(){web.Capture( app.GetSpecialFolder( "DCIM" )+"/appstream.png" );} 