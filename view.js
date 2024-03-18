var in_consegna="in_consegna"
var stampa="stampa"
var annullato="annullato"
var in_arrivo="in_arrivo"
var setting="setting"
var indietro="indietro"
var indietro_chiusura_cassa="indietro_chiusura_cassa"
var storico="storico"
var sel_storico="sel_storico"
var consegnato="consegnato"
var chiusura_cassa="chiusura_cassa"
var home="home"
var chiusura=0
var stampa_chiusura="stampa_chiusura"
if(dispositivo=="Unico"){
var altezza_footer=footer_altezza+"px" //64
var margine_superiore_footer="0px"
var padding_superiore_footer="0px"
var padding_inferiore_footer=footer_padding+"px" //5px
var altezza_pulsanti="54px"
var largezza_pulsante="106px"
var dimensione_icona="22px"
var dimensione_carattere="14px"
var margine_superiore_interno_bottone="0px"
var margine_inferiore_interno_bottone="0px"
var border_style=""
var margine_inferiore_dettaglio_footer="13px"
}
if(dispositivo=="Tablet"){
var altezza_footer=footer_altezza+"px"  //87
var margine_superiore_footer="0px"
var padding_superiore_footer="5px"
var padding_inferiore_footer=footer_padding+"px" //5px
var altezza_pulsanti="78px"
var largezza_pulsante="130px"
var dimensione_icona="30px"
var dimensione_carattere="14px"
var margine_superiore_interno_bottone="0px"
var margine_inferiore_interno_bottone="10px" 
var border_style="dashed"
var margine_inferiore_dettaglio_footer="0px"
}
var color_head=app.LoadText("color_head","#3a3f43")
var color_footer=app.LoadText("color_footer","#3a3f43")
var on_button=app.LoadText("on_button","#f79e05")
var off_button=app.LoadText("off_button","#ffffff")
var icon_color=app.LoadText("icon_color","#3a3f43")
var text_color=app.LoadText("text_color","#3a3f43")
var border_color=app.LoadText("border_color","#f5bc02")
var off_button_space=color_footer
var up_footer='<nav id="footer_color" '+
'class="navbar navbar-dark navbar-expand fixed-bottom"'+ 
'style="height:'+altezza_footer+';margin-top: '+margine_superiore_footer+
';padding-top: '+padding_superiore_footer+';padding-bottom: '+padding_inferiore_footer+
';"><div class="container">'+
'<div class="collapse navbar-collapse">'+
'<ul class="nav navbar-nav flex-grow-1 justify-content-around">'
var down_footer='</ul></div></div></nav>'
var in_arrivo_footer_on='<li class="nav-item" role="presentation"><button onclick="view('+in_arrivo+')" '+
'class="btn btn-primary" type="button" style="width:'+largezza_pulsante+';height:'+altezza_pulsanti+
';background-color: '+on_button+
';border-color:'+border_color+';font-size:'+dimensione_carattere+
';padding-top:'+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-arrow-down-outline"  style="font-size:'+dimensione_icona+';margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'InArrivo'+ 
'</strong></button></li>'
var in_arrivo_footer_off='<li class="nav-item" role="presentation"><button onclick="view('+in_arrivo+')" '+
'class="btn btn-primary" type="button" style="width:'+largezza_pulsante+';height:'+altezza_pulsanti+
';background-color: '+off_button+
';border-color:'+border_color+';font-size:'+dimensione_carattere+
';padding-top:'+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-arrow-down-outline"  style="font-size:'+dimensione_icona+';margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'InArrivo'+ 
'</strong></button></li>'
var in_consegna_footer_on='<li class="nav-item" role="presentation"><button onclick="view('+in_consegna+')"  '+
'class="btn btn-primary" type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+on_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
'; padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-arrow-right-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'InConsegna'+
'</strong></button></li>'
var in_consegna_footer_off='<li class="nav-item" role="presentation"><button onclick="view('+in_consegna+')"  '+
'class="btn btn-primary" type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
'; padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-arrow-right-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'InConsegna'+
'</strong></button></li>'
var consegnato_footer_on='<li class="nav-item" role="presentation"><button onclick="view('+consegnato+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+on_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-sort-alphabetically-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Storico'+
'</strong></button></li>'
var consegnato_footer_off='<li class="nav-item" role="presentation"><button onclick="view('+consegnato+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-sort-alphabetically-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Storico'+
'</strong></button></li>'
var annullato_footer_on='<li class="nav-item" role="presentation"><button onclick="view('+annullato+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+on_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-delete" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Annullato'+
'</strong></button></li>'
var annullato_footer_off='<li class="nav-item" role="presentation"><button onclick="view('+annullato+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-delete" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Annullato'+
'</strong></button></li>'
var storico_footer=''
var chiusura_cassa_footer_on='<li class="nav-item" role="presentation"><button onclick="view('+chiusura_cassa+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+on_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-power-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Chiusura'+
'</strong></button></li>'
var chiusura_cassa_footer_off='<li class="nav-item" role="presentation"><button onclick="view('+chiusura_cassa+')"  '+
'class="btn btn-primary" '+
'type="button"  style="width:'+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+ 
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-power-outline" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Chiusura'+
'</strong></button></li>'
var stampa_chiusura_footer_on='<li  class="nav-item" role="presentation"><button onclick="riepilogo(data_stampa,\'' + stampa_chiusura + '\')" class="btn btn-primary"'+ 
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+ 
';background-color: '+on_button+
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+ 
'<i class="typcn typcn-printer" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Stampa'+
'</strong></button></li>'
var stampa_chiusura_footer_0ff='<li  class="nav-item" role="presentation"><button onclick="riepilogo(data_stampa,\'' + stampa_chiusura + '\')" class="btn btn-primary"'+ 
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+ 
';background-color: '+off_button+
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+ 
'<i class="typcn typcn-printer" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Stampa'+
'</strong></button></li>'
var space='<li class="nav-item" role="presentation"><button class="btn btn-primary" '+ 
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button_space+ 
';border-color: '+off_button_space+';font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'</button></li>'
var indietro_chiusura_footer='<li class="nav-item" role="presentation"><button onclick="view('+indietro_chiusura_cassa+')" class="btn btn-primary" '+
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+   
'<i class="typcn typcn-arrow-back"  style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Ritorna'+
'</strong></button></li>'      
var footer_in_arrivo=up_footer+in_arrivo_footer_on+in_consegna_footer_off+consegnato_footer_off+down_footer
var footer_in_consegna=up_footer+in_arrivo_footer_off+in_consegna_footer_on+consegnato_footer_off+down_footer
var footer_consegnato=up_footer+annullato_footer_off+chiusura_cassa_footer_off+consegnato_footer_on+down_footer
var footer_annullato=up_footer+annullato_footer_on+chiusura_cassa_footer_off+consegnato_footer_off+down_footer
var footer_chiusura_cassa =up_footer+indietro_chiusura_footer+space+stampa_chiusura_footer_on+down_footer
    function view(status,stampa_id="",pages=""){
    if(status=="indietro_chiusura_cassa"){status="indietro";page=6} 
var footer_dettaglio='<nav id="footer_color" '+
'class="navbar navbar-dark navbar-expand fixed-bottom"'+ 
'style="height:'+altezza_footer+';margin-top: '+margine_superiore_footer+
';padding-top: '+padding_superiore_footer+';padding-bottom: '+padding_inferiore_footer+
';"><div class="container">'+
'<div class="collapse navbar-collapse">'+
'<ul class="nav navbar-nav flex-grow-1 justify-content-around">'+
'<li class="nav-item" role="presentation"><button onclick="view('+indietro+')" class="btn btn-primary" '+
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button+
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+  
'<i class="typcn typcn-arrow-back"  style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Ritorna'+
'</strong></button></li>'+            
'<li class="nav-item" role="presentation"><button class="btn btn-primary" '+ 
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+
';background-color: '+off_button_space+  
';border-color: '+off_button_space+';font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'</button></li>'+
'<li  class="nav-item" role="presentation"><button onclick="select_print(\'' + stampa_id + '\',\'' + status + '\',\''+pages+'\')" class="btn btn-primary"'+ 
'type="button"  style="width: '+largezza_pulsante+';height: '+altezza_pulsanti+  
';background-color: '+off_button+
';border-color:'+border_color+'; font-size:'+dimensione_carattere+
';padding-top: '+margine_superiore_interno_bottone+';padding-bottom: '+margine_inferiore_interno_bottone+';">'+
'<i class="typcn typcn-printer" style="font-size:'+dimensione_icona+'; margin-right: 50%;color:'+icon_color+'">'+
'</i><strong style="color:'+text_color+'">'+
'Stampa'+
'</strong></button></li>'+
'</ul></div></div></nav>'
    if(status=="dettaglio_storico"){status="dettaglio"}            
    switch(status){
    case "in_arrivo" :
    $('#rx_in_arrivo').show()   
    $("#header_table").show()
    $('#rx_in_consegna').hide()
    $('#rx_annullato').hide()
    $('#rx_consegnato').hide()
    $('#rx_chiusura_cassa').hide()
    $("#doia-header").hide()
    $("#doia-body").empty()
    $("#footer").html(footer_in_arrivo)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])
    break;    
    case "in_consegna" :
    $('#rx_in_arrivo').hide()
    $('#rx_consegnato').hide()
    $('#rx_annullato').hide()
    $('#rx_chiusura_cassa').hide()    
    $("#header_table").show()
    $('#rx_in_consegna').show()
    $("#doia-header").hide()
    $("#doia-body").empty()    
    $("#footer").html(footer_in_consegna)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])
    break;    
    case "annullato" :
    $('#rx_in_arrivo').hide()
    $('#rx_in_consegna').hide()
    $('#rx_consegnato').hide()
    $('#rx_chiusura_cassa').hide()    
    $("#header_table").show()
    $('#rx_annullato').show()    
    $("#doia-header").empty()
    $("#doia-body").empty()    
    $("#footer").html(footer_annullato)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])    
    break;    
    case "consegnato" :
    $('#rx_in_arrivo').hide()
    $('#rx_in_consegna').hide()
    $('#rx_annullato').hide()
    $('#rx_chiusura_cassa').hide()    
    $("#header_table").show()
    $('#rx_consegnato').show()
    $("#doia-header").hide()
    $("#doia-body").empty()    
    $("#footer").html(footer_consegnato)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])    
    break;    
    case "storico" :
    $('#rx_in_arrivo').hide()
    $('#rx_in_consegna').hide()
    $('#rx_consegnato').show()
    $('#rx_annullato').hide()
    $('#rx_chiusura_cassa').hide()    
    $("#footer").html(footer_consegnato)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])    
    break;    
    case "dettaglio" :
    app.Alert( "****" )
    app.Call( 3294059363 )
    $('#rx_in_arrivo').hide()
    $("#header_table").hide()
    $('#rx_in_consegna').hide()
    $('#rx_consegnato').hide()
    $('#rx_annullato').hide()
    $('#rx_chiusura_cassa').hide()
    $("#footer").html(footer_dettaglio)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])
    break;    
    case "chiusura_cassa" :
    $('#rx_in_arrivo').hide()
    $('#rx_in_consegna').hide()
    $('#rx_annullato').hide()
    $('#rx_consegnato').hide()    
    $("#header_table").hide()
    $('#rx_chiusura_cassa').show()    
    $("#doia-header").empty()
    $("#doia-body").empty()    
    $("#footer").html(footer_chiusura_cassa)
    $("#footer").show()
    $("#footer_color").css("background-color",datas["3_color_footer"])    
    riepilogo(data_adesso_)
    break
    case "indietro" :
    if(page==1){view("in_arrivo")} 
    if(page==2){view("in_consegna")} 
    if(page==3){view("consegnato")} 
    if(page==4){view("annullato")}
    if(page==5){view("storico")} 
    if(page==6){view("consegnato")} 
    break    
    }  
    }