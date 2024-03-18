    mp3 = app.CreateMediaPlayer();
    if(datas['tipo_suoneria']){mp3.SetFile("sound/"+datas['tipo_suoneria']+".mp3");}

    
      function messaggi_notifica(tipo_ordine){    
   if(datas['notifica_vocale'] == "true"){
    app.TextToSpeech( "Call pianificata!! premere invio, per avviare la chiamata.", 1.0, 1.0 );   
     }    
}

   function start_beep(){
   if(datas['notifica_audio'] == "true"){
   mp3.Play();
   }
   } 
  
  function test_voce(){       
    app.TextToSpeech( "Buon lavoro, da ,Citta'coupon.", 1.0, 1.0 );   
  }