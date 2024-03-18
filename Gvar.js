"use strict"

app.LoadPlugin("Moment")
app.LoadPlugin("bacstack")
app.LoadPlugin("Support")

 
var height_hw = app.GetDisplayHeight();
var width_hw = app.GetDisplayWidth();
var tablet = app.IsTablet()
if(tablet==true){var dispositivo="Tablet"}else{var dispositivo="Unico"}
var footer_altezza = app.LoadNumber( "footer_altezza",95);
var footer_padding = app.LoadNumber( "footer_padding",5 );
var iconpx=app.LoadNumber("altezza_icone_ordini",30 )
var versione_app="1.0.0"
var stsMua=app.LoadText("stsMuax","false")
if(stsMua == "true"){
app.ShowPopup("*Multipla Enabled*" );
var idAPP= app.LoadText( "idMua",app.GetDeviceId() );
}else{
var idAPP = app.GetDeviceId();
}
var id_rider=app.LoadText("id_rider_","00000000")
var cry = "11qqww22";
var riderx="yhfdTfjg6Tdu"
var crypt = app.CreateCrypt();
var encryptedId = crypt.Encrypt( idAPP, cry);
var idAPPX= crypt.Encrypt( idAPP, riderx)
var idAPPU="0000000000000000"
var uidU="tvOM9Zqxvzcfa5J8nhmseFbxTM62"
var uid;
var key_status = [];
var listened=false;
var notifica=0;
var colorMsg;
var datas=[];// configurazione systema
var valore_ordine_tipo=[];
var beep_timer;
var countouch=0
var usercom
var page,page_name
var color_banner_up,color_banner_down
var cont=0
var firebase_db
var q=0;
var valore_time
var array_ordini_in_arrivo = [];
var tipo=[]
var data_page=[]
var btn=[]
var tipo_user;
var creditoSms;
var creditoPunti;
var default_config;
var DBupgrade="false";
var upgradeStatus="false;"
var num_mua= app.LoadText( "tpm","01" );
var num_mur= app.LoadText( "tpr","Master" );
var print_ip,print_porta,print_tipo_connessione;
var print_0=[],print_1=[],print_2=[],print_3=[],print_4=[],print_5=[];
var pr,prt
var setPrint_time,print_test_time
var xd=[],dd=[]
var mm_stampa=app.LoadText("stampa_mm","80")
var a1,d,d1,remoteKey,local_webpage,remote_webpage
var DBobj1={}
var DBobj2={}
var DBobj3={}
var DBobj4={}
var main_box_width="50px"
var db_delete="false"
var keyd=[]
var valore_punti;
var footer_button_tools;
var time_adesso_=moment().format('DD/MM/YYYY HH:mm')
var data_adesso_=moment().format('DD/MM/YYYY')
var data_stampa
var encoder = new EscPosEncoder().codepage('cp850');
var idP,xd
var countp=0
var rider_data=[]
var tipo_ordine_select_0=[]
var tipo_ordine_select_1=[]
var tipo_ordine_select_2=[]
var tipo_ordine_select_3=[]
var tipo_ordine_select_4=[]
var tipo_ordine_select_5=[]
var lat_base,lng_base
var distanza_notifica="-600"
var toggle_body = "";
var toggle_details = '<p><center>'+
  '<button class="btn btn-primary" type="button" data-toggle="collapse" '+
  'data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">'+
  'Dettaglio Ordine'+
  '</button>'+
  '</p></center>'+
  '<div class="collapse" id="collapseExample">'+
  '<div id="toggle-body" class="card card-body">'+toggle_body+'</div>'+
  '</div>';