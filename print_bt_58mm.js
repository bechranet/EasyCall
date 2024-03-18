    function print_bluetooth_58(id,type,pages=""){           
    app.ShowPopup("Stampa in corso..","Bottom")    
      idP=id
        id_ordine=id
        stats=pages
    bt.SetDataMode( "Int" )  
    print_step=1
   if(type=="dettaglio"){nodetype="dettaglio_ordini"}
   if(type=="dettaglio_storico"){nodetype="dettaglio_storico"}
    
    db.ref(nodetype+"/"+uid+"/"+id).once("value",
    function(doia_stampa){    
    var doia_stampa  = doia_stampa.val()   
    for(a in doia_stampa){
if(a =="ordine_tipo"){
tipo_ordine=select_tipo("stampa",parseInt(doia_stampa["ordine_tipo"]))
tipo_ordine_reparto=ordine(doia_stampa["ordine_tipo"])
}
if(a=="data_ordine"){data_ordine=doia_stampa['data_ordine']}
if(a=="data_stimata"){data_stimata=doia_stampa['data_stimata']}
if(a=="data_lavorazione"){data_lavorazione=doia_stampa['data_lavorazione']}
if(a=="id_ordine"){id_ordine=doia_stampa["id_ordine"]
}
if(a=="delivery_costo"){delivery_costo=Number(doia_stampa["delivery_costo"])} 
if(a=="pagamento_tipo"){pagamento_tipo=doia_stampa["pagamento_tipo"]}
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
if(a=="note"){
note_stampa=doia_stampa["note"]
}    
}
if(doia_stampa["ordine_tipo"]=="1" && datas["stampa_qrcode"]=="true"){qrcode_stampa="true"}else{qrcode_stampa="false"}
if(print_step=="1"){
       dataprint = encoder
    .initialize().codepage('cp850')
    .size('normal')
    .align('center')
    .size('normal')
    .line('\u001D!\u0011'+'IdOrdine: #'+id_ordine)// doppia altezza e larghezza
    .line()
    .bold(true)
    .line('..'+tipo_ordine["tipo"])
    .bold(false)    
    .encode()
     bt.Write(dataprint)
     
        if(tavolo_stampa!="***" && tavolo_stampa){
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("Tavolo: "+tavolo_stampa)
    .bold(false)
    .encode()
    bt.Write(dataprint)
    tavolo_stampa=""
    }
     
   if(ombrellone_stampa!="***" && ombrellone_stampa){
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("Ombrellone: "+ombrellone_stampa)
    .bold(false)
    .encode()
    bt.Write(dataprint)
    ombrellone_stampa=""
    }
  

if(datas["stampa_solo_prodotti"]=="false"){     
     dataprint = encoder
    .initialize().codepage('cp850')
    .line()
    .line("Ordinato  : "+data_ordine)
    .line("InConsegna: "+data_stimata)
    .bold(true)
    .line()
    .align('center')
    .line("#Consegnato: "+data_lavorazione)
    .bold(false)
    .line()
    .encode()
     bt.Write(dataprint)


if(datas['stampa_pagamento']=="true"){
    dataprint = encoder
    .initialize()
    .bold(true)
    .line("------------------------------")
    .align('center')
    .line("\u001D!\u0011 Stato Pagamento")
    .bold(false)
    .line("\u001D!\0")
    .align('left')
    .line("   "+pagamento_tipo)
    .line("   "+pagamento_stato)
    .line()
    .line("------------------------------")
    .line()
    .encode()
     bt.Write(dataprint)
    }

    
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line(" "+nome_stampa+"  "+cognome_stampa)
    .bold(false)
    .line()
    .line(indirizzo_stampa)
    .line(citta_stampa)
    .line(cap_stampa)
    .encode()
     bt.Write(dataprint)
if(campanello_stampa!="***" && campanello_stampa ){
     dataprint = encoder
    .initialize().codepage('cp850')
    .line("Rif.: "+campanello_stampa)
    .encode()
     bt.Write(dataprint)
    campanello_stampa=""
}
if(datas['stampa_email']=="true" && email_stampa!="***" && email_stampa ){
   dataprint = encoder
    .initialize().codepage('cp850')
    .size('small')
    .line(email_stampa)
    .size('normal')
    .encode()
     bt.Write(dataprint)
    email_stampa=""
    }

if(telefono_stampa!="" && telefono_stampa){
     dataprint = encoder
    .initialize()
    //.bold(true)
    .line("Tel.: "+telefono_stampa)
    //.bold(false)
    .encode()
    bt.Write(dataprint)
    telefono_stampa=""
    }
if(note_stampa!="***" && note_stampa){
    note_stampa=Acapo(note_stampa,"note","58")
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line()
    .line(" Note:")
    .bold(false)
    dataprint = encoder
    .initialize()
    .encode()
    bt.Write(dataprint)
     for(var pr=0;pr<note_stampa.length;pr++){
    dataprint = encoder
    .initialize().codepage('cp850')  
    .line(note_stampa[pr]) 
    .encode()
    bt.Write(dataprint) 
    }
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)  
    .line("------------------------------")
    .bold(false)  
    .encode()
    bt.Write(dataprint)   
    }
     note_stampa=""
}
print_footer_58(id,delivery_costo,nodetype)
}
})
   
    }       
    
    
    function print_footer_58(id,delivery_costo,nodetype){  
    print_step=2
    db.ref(nodetype+"/"+uid+"/"+id+"/ordine").once("value",
    function(doia_ordine_stampa){       
    dataprint = encoder
    .initialize()        
    doia_ordine_stampa = doia_ordine_stampa.val()
    control(doia_ordine_stampa)
    function control(doia_ordine_stampa){
    for(a in doia_ordine_stampa){
    if(typeof doia_ordine_stampa[a]  === 'object'){sal=doia_ordine_stampa[a]
    if(isNaN(a)){
    if(a == "aggiunte"){}else{
    categoria_prodotto = a;    
     dataprint = encoder
    .initialize()
    .bold(true)
    //.line("------------------------------")
    .line("*** "+categoria_prodotto)
    .bold(false)
    .encode()
     bt.Write(dataprint)
    }}
    control(sal)}else{
    if(a == "aggiunte_nome" || a == "aggiunte_prezzo"){ 
    if(a == "aggiunte_nome"){aggiunte_nome=doia_ordine_stampa['aggiunte_nome']}
    if(a == "aggiunte_prezzo"){aggiunte_prezzo=Number(doia_ordine_stampa['aggiunte_prezzo'])  
    sub_totale_aggiunte = sub_totale_aggiunte + aggiunte_prezzo    
    if(aggiunte_nome !== ""){
    if(datas['stampa_prezzi']=="true"){      
      dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("Agg. "+aggiunte_nome)
    .bold(false)
    .line(aggiunte_prezzo+"$")
    .encode()
     bt.Write(dataprint)    
    }else{
    dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line("+ "+aggiunte_nome)
    .bold(false)
    .encode()
     bt.Write(dataprint)
        }
    }   
    }    
    }else{    
if(a == "titolo")     {titolo_prodotto=doia_ordine_stampa['titolo']}
if(a == "descrizione"){
    descrizione_prodotto=doia_ordine_stampa['descrizione']
    }
if(a == "qta")        {qta_prodotto=doia_ordine_stampa['qta']}
if(a == "prezzo")     {prezzo_prodotto=Number(doia_ordine_stampa['prezzo'])
sub_totale_prodotti = sub_totale_prodotti + (qta_prodotto * prezzo_prodotto)  
     dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line(">"+titolo_prodotto)
    .bold(false)
    .encode()
     bt.Write(dataprint)
     
if(datas['stampa_descrizione']=="true"){
     descrizione_prodotto=Acapo(descrizione_prodotto,"descrizione_prodotto","58")
    for(var pr=0;pr<descrizione_prodotto.length;pr++){
     dataprint = encoder
    .initialize().codepage('cp850')  
    .line(descrizione_prodotto[pr])
    .encode()
    bt.Write(dataprint)
}
     
    }

if(datas["stampa_prezzi"]=="true"){   
     dataprint = encoder
    .initialize()
    .bold(true)
    .line(qta_prodotto+" x "+prezzo_prodotto+"$")
    .bold(false)
    .line()
    .encode()
     bt.Write(dataprint)    
}else{
    dataprint = encoder
    .initialize()
    .bold(true)
    .line("qta: "+qta_prodotto)
    .bold(false)
    .line()
    .encode()
     bt.Write(dataprint)
    }
}
}}}}

totale = delivery_costo + costo_pay + sconto + sub_totale_prodotti + sub_totale_aggiunte + totale 

 sub_totale_prodotti=parseFloat(sub_totale_prodotti).toFixed(2)
 totale=parseFloat(totale).toFixed(2)

   if(datas['stampa_totali']=="true"){
    if(totale > 0){ 
     dataprint = encoder
    .initialize()
    .bold(true)
    .line("------------------------------")
    .bold(false)
    .encode()
     bt.Write(dataprint)
    }
    if(sub_totale_prodotti>0)
    {    
     dataprint = encoder
    .initialize()
    .bold(false)
    .line("Tot.Prodotti: "+sub_totale_prodotti+"$")
    .encode()
     bt.Write(dataprint)
    }
  
  if(sub_totale_aggiunte>0){       
      dataprint = encoder
    .initialize()
    .bold(false)
    .line("Tot.Aggiunte: "+sub_totale_aggiunte+"$")
    .encode()
     bt.Write(dataprint)
      }
  if(delivery_costo>0){      
     dataprint = encoder
    .initialize()
    .bold(false)
    .line("Delivery: "+delivery_costo+"$")
    .encode()
     bt.Write(dataprint) 
      }
  if(sconto>0){ 
      dataprint = encoder
    .initialize()
    .bold(false)
    .line("Sconto: "+sconto+"$")
    .encode()
     bt.Write(dataprint)
      }
  if(costo_pay>0){ 
      dataprint = encoder
    .initialize()
    .bold(false)
    .line("CostoPagamento: "+costo_pay+"$")
    .encode()
     bt.Write(dataprint)
      }
  if(totale>0){
     dataprint = encoder
    .initialize()
    .bold(true)
    .line("Totale: "+totale+"$")
    .bold(false)
    .encode()
     bt.Write(dataprint) 
    }
     }
     
      dataprint = encoder
    .initialize().codepage('cp850')
    .bold(true)
    .line()
    .line("  Lavorazione: "+stats)
    .underline()
    .line()
    .bold(false)
    .encode()
    bt.Write(dataprint) 
  if(totale > 0){
     dataprint = encoder
    .initialize()
    .bold(true)
    .line().line().line()
    .line("------------------------------")
    .bold(false)
    .cut('full')// taglio
    .encode()
     bt.Write(dataprint)  
                }
  totale = delivery_costo = costo_pay = sconto = sub_totale_prodotti = sub_totale_aggiunte = 0
})

if(qrcode_stampa=="true"){
    coordinate=lat_stampa+","+lng_stampa
    coordinate="https://www.google.it/maps?q="+lat_stampa+","+lng_stampa
    if(!campanello_stampa){campanello_stampa="..Mancante"}
    if(!telefono_stampa){telefono_stampa="..Mancante"}
     dataprint = encoder
    .initialize().codepage('cp850')
    .align('center')
    .line(" Delivery  #"+id_ordine)
    .line()
    .bold(true)
    .line("Dettaglio Pagamento")
    .bold(false)
    .line(" "+pagamento_tipo)
    .line(" "+pagamento_stato)
    .qrcode(coordinate+'',1,8,'h')
    .line()
    .bold(true)
    .line("Dettaglio Cliente")
    .bold(false)
    .line()
    .line("Nome: "+nome_stampa+" "+cognome_stampa)
    .line("Nome Campanello: "+campanello_stampa)
    .line("Tel: "+telefono_stampa)
    .line(" "+indirizzo_stampa)
    .line(" "+citta_stampa+"   ("+cap_stampa+")")
    .line().line().line().line().line().line()
    .cut('full')// taglio
    .encode()
     bt.Write( dataprint)     
    }
}