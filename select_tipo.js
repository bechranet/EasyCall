    function select_tipo(tipo,valore){
    switch(valore){
    case 0:
    valore_ordine_tipo["style_doia"] = ";background-color:#4dbe3b;"
    valore_ordine_tipo["style_oia"] = ';color: #09db41;'// verde  
    if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "da ASPORTO"}else{
    valore_ordine_tipo["tipo"]  = asporto
    valore_ordine_tipo["codice_tipo"]  = "Asporto"
    }
    return(valore_ordine_tipo)
    break    
    case 1:       
    valore_ordine_tipo["style_doia"] = ";background-color:#03b6fc;"
    valore_ordine_tipo["style_oia"] = ';color: #1c9abd;'// azzurro  
    if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "a DOMICILIO"}else{
    valore_ordine_tipo["tipo"]  = domicilio
    valore_ordine_tipo["codice_tipo"]  = "Domicilio"
    }
    return(valore_ordine_tipo)
    break    
    case 2: 
    valore_ordine_tipo["style_doia"] = ";background-color:#fc8403;"
    valore_ordine_tipo["style_oia"] = ';color: #d4aa13;'  // arancio
    if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "al TAVOLO"}else{    
    valore_ordine_tipo["tipo"]  = tavolo
    valore_ordine_tipo["codice_tipo"]  = "Tavolo"
    }
    return(valore_ordine_tipo)
    break           
    case 3: 
    valore_ordine_tipo["style_doia"] = ";background-color:#c90c22;"
    valore_ordine_tipo["style_oia"] = ';color: #2d13d4;' // blu
    if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "PRODOTTI"}else{
    valore_ordine_tipo["tipo"]  = prodotti
    valore_ordine_tipo["codice_tipo"]  = "Prodotti"
    }
    return(valore_ordine_tipo)
    break    
    case 4: 
    valore_ordine_tipo["style_doia"] = ";background-color:#c90c22;"
    valore_ordine_tipo["style_oia"] = ';color: #d4135d;'
      if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "OMBRELLONE"}else{
    valore_ordine_tipo["tipo"]  = ombrellone
    valore_ordine_tipo["codice_tipo"]  = "Ombrellone"
    }
    return(valore_ordine_tipo)
    break  
    case 5: 
    valore_ordine_tipo["style_doia"] = ";background-color:#c90c22;"
    valore_ordine_tipo["style_oia"] = ';color: #13d436;' // prenotazione
          if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "PRENOTAZIONE"}else{
    valore_ordine_tipo["tipo"]  = prenotazione
    valore_ordine_tipo["codice_tipo"]  = "Prenotazione"
    }
    return(valore_ordine_tipo)
    break    
    case 6: 
    valore_ordine_tipo["style_doia"] = ";background-color:#c90c22;"
    valore_ordine_tipo["style_oia"] = ';color: #13d436;' // prenotazione
      if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "ERROR"}else{
    valore_ordine_tipo["tipo"]  = error
    valore_ordine_tipo["codice_tipo"]  = "error"
    }
    return(valore_ordine_tipo)
    break
     case 100: 
    valore_ordine_tipo["style_doia"] = ";background-color:#c90c22;"
    valore_ordine_tipo["style_oia"] = ';color: #13d436;' // prenotazione
      if(tipo=="stampa"){valore_ordine_tipo["tipo"]  = "CALL"}else{
    valore_ordine_tipo["tipo"]  = call
    valore_ordine_tipo["codice_tipo"]  = "Call"
    }
    return(valore_ordine_tipo)
    break
    }}

    function vocale_tipo(valore){
    switch(valore){
    case 0:
    return("da ASPORTO")     
    case 1:       
    return("a DOMICILIO")    
    case 2: 
    return("al TAVOLO")           
    case 3: 
    return("PRODOTTI")    
    case 4: 
    return("ALL'OMBRELLONE")    
    case 5: 
    return("A PRENOTAZIONE")    
    case 6: 
    return("ERROR")
    case 100: 
    return("CALL")
      }}