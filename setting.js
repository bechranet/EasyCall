
    var hight_text=14;
    var pad_text_stampa=""
    var multi_save_reparto={}
    sup = app.CreateSupport();
	layMain = app.CreateLayout( "Linear", "Horizontal" );
	layMain.SetBackground( "/Res/drawable/android" );	
	CreateDrawer();
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );

    function CreateDrawer()
    {
    drawerWidth = 1;
    drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" );
    drawerScroll.SetBackColor( "White" );
    layDrawer = app.CreateLayout( "Linear", "Left" );
    drawerScroll.AddChild( layDrawer );
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetBackColor('#ffffff');
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawer.AddChild( layDrawerTop );
	var img = app.CreateImage( "Img/logas.png", 0.22 );
	img.SetPosition( drawerWidth*0.16, 0.05);
	img.SetOnLongTouch(contkey);
	layDrawerTop.AddChild( img );
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
    var listItems = ""+
    "Azienda:[fa-tag],"+
    "Aggiornamenti:[fa-flag],"+
    "Stampante:[fa-print],"+
    "Notifiche:[fa-bullhorn],"+
    "Sistema:[fa-archive],"+
    "Utility:[fa-cogs],"+
    "Home:[fa-home],"+
    "Esci:[fa-eject]"    
    lstMenu1 = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenu1.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenu1.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenu1 );   
}


function lstMenu_OnTouch( title, body, type, index )
{
    app.CloseDrawer( "Left" );
    if( this==lstMenu1 ) lstMenu1.SelectItemByIndex(-1);
    else lstMenu1.SelectItemByIndex(-1);
    this.SelectItemByIndex( index, true );
    switch(index) {
    case 0:     
    slide_menu = app.CreateLayout( "linear", "VCenter,FillXY" ); 
    slide_menu.SetSize( 1, 1 );          
  	slide_menu.SetBackColor( "black" );   
    if(stsMua=="true"){
    txt = app.CreateText( "Applicazione Multipla");
    txt.SetTextSize( 16 );
    txt.SetTextColor("#fcba03")
    txt.SetMargins(0.1,0,0.1,0)
    slide_menu.AddChild( txt );    
    txt = app.CreateText( "Gestione Ordini");
    txt.SetTextSize( 18);
    txt.SetTextColor("#fcba03")
    txt.SetMargins(0,0.02,0,0.02)
    slide_menu.AddChild( txt );    
    txt = app.CreateText( num_mur);
    txt.SetTextSize( 22 );
    txt.SetTextColor("#0fd676")
    txt.SetMargins(0,0.0,0,0.0)
    slide_menu.AddChild( txt );
    }    
    if(stsMua!="true"){    
    txt = app.CreateText( "VisualCode Tecnology");
    txt.SetTextSize( 16 );
    txt.SetTextColor("#fcba03")
    txt.SetMargins(0.1,0,0.1,0)
    slide_menu.AddChild( txt )     
    }
  
  	
  	nome_azienda = app.CreateTextEdit(datas["2_nome_azienda"], -1, -1 );
    nome_azienda.SetTextSize( 18 );
    nome_azienda.SetMargins( 0, 0, 0, 0 );
    slide_menu.AddChild( nome_azienda );
  	
  	txt = app.CreateText( "Versione  : "+versione_app);
    txt.SetTextSize( 10);
    txt.SetMargins(0,0,0,0)
    txt.SetOnLongTouch(r_data );
    slide_menu.AddChild( txt );
    btn = app.CreateButton( "Save", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0.05 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch( function(){save(nome_azienda,'2_nome_azienda') });
    slide_menu.AddChild( btn );
    btn = app.CreateButton( "Gestione Rider", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0.4 );
    btn.SetBackColor('#32a850');
    btn.SetOnTouch( function(){riders_() });
    slide_menu.AddChild( btn ); 
    
    
    function dlg_OnTouch( item ){app.ShowPopup( item );}

    
    function riders_(){
    slide_menu_2 = app.CreateLayout( "Linear", "Vertical,FillXY" ); 
    slide_menu_2.SetSize( 1, 1 );          
  	slide_menu_2.SetBackColor( "black" ); 
  	txt = app.CreateText( "Registrazione Rider");
    txt.SetTextSize( 20 );
    txt.SetMargins(0,0.03,0,0.03)
    txt.SetOnLongTouch(r_data );
    slide_menu_2.AddChild( txt );    
    asp = app.GetDisplayWidth() / app.GetDisplayHeight();
    prev = app.CreateImage( null, 0.5, asp * 0.5 );
    slide_menu_2.AddChild( prev );
    QRCode.Init( prev );
    QRCode.SetText( uid );
    txt = app.CreateTextEdit( uid );
    txt.SetTextSize( 12 );
    txt.SetMargins(0,0.03,0,0.05)
    slide_menu_2.AddChild( txt );
    txt = app.CreateText( "Coordinate Negozio");
    txt.SetTextSize( 20 );
    txt.SetMargins(0,0.03,0,0.03)
    txt.SetOnLongTouch(r_data );
    slide_menu_2.AddChild( txt );
    txt = app.CreateText( "LATITUDINE Negozio");
    txt.SetTextSize( 10 );
    txt.SetMargins(0,0.0,0,0.0)
    txt.SetOnLongTouch(r_data );
    slide_menu_2.AddChild( txt ); 
    txt_lat_base = app.CreateTextEdit(datas["lat_base"]  );
    txt_lat_base.SetTextSize( 12 );
    txt_lat_base.SetMargins(0,0.0,0,0.03)
    slide_menu_2.AddChild( txt_lat_base );    
    txt = app.CreateText( "LONGITUDINE Negozio");
    txt.SetTextSize( 10 );
    txt.SetMargins(0,0.0,0,0.0)
    txt.SetOnLongTouch(r_data );
    slide_menu_2.AddChild( txt );    
    txt_lng_base = app.CreateTextEdit(datas["lng_base"]  );
    txt_lng_base.SetTextSize( 12 );
    txt_lng_base.SetMargins(0,0,0,0.05)
    slide_menu_2.AddChild( txt_lng_base );
    btn = app.CreateButton( "Chiudi", -1 );
    btn.SetMargins( 0, 0.10, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(chiudi_doppio_lay);
    slide_menu_2.AddChild( btn ); 	
  	app.AddLayout( slide_menu_2 );
    }
    btn = app.CreateButton( "Chiudi", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(close_menu);
    slide_menu.AddChild( btn );    
    app.AddLayout( slide_menu );
    break;
  
    case 1:
    slide_menu = app.CreateLayout( "linear", "VCenter,FillXY" ); 
    slide_menu.SetSize( 1, 1 );          
  	slide_menu.SetBackColor( "black" ); 
  	txt = app.CreateText( "Aggiornamento EASYCALL");
    txt.SetTextSize( 22 );
    slide_menu.AddChild( txt );
    btn = app.CreateButton( "Avvia", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(dwn);
    slide_menu.AddChild( btn );
    btn = app.CreateButton( "Chiudi", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(return_menu);
    slide_menu.AddChild( btn );    
    app.AddLayout( slide_menu );    
    break;    
    case 2:
    slide_menu = app.CreateLayout( "linear", "Vertical" ); 
    slide_menu.SetSize( 1, 1 );          
  	slide_menu.SetBackColor( "black" ); 
    txt_voce = app.CreateText( "Gestione Stampante "+datas['print_tipo_connessione'] );
    txt_voce.SetMargins(0.02,0.10,0,0.02)
    txt_voce.SetTextSize( hight_text );
    slide_menu.AddChild( txt_voce );
    if(datas['print_tipo_connessione']=="bluetooth"){      
    tgl_stampa_attivazione = app.CreateCheckBox( "Attiva Stampante", 0.8 );
    tgl_stampa_attivazione.SetChecked(datas['stampa_attivazione']);
    tgl_stampa_attivazione.SetMargins( 0, 0.0, 0, 0 );
    tgl_stampa_attivazione.SetTextSize( hight_text );
    tgl_stampa_attivazione.SetOnTouch( function(){onoff_("stampa_attivazione")});
    slide_menu.AddChild( tgl_stampa_attivazione);          
    }
    tgl_stampa_automatica = app.CreateCheckBox( "Stampa Automatica ordini", 0.8 );
    tgl_stampa_automatica.SetChecked(datas['stampa_automatica']);
    tgl_stampa_automatica.SetMargins( 0, 0.0, 0, 0 );
    tgl_stampa_automatica.SetTextSize( hight_text );
    tgl_stampa_automatica.SetOnTouch( function(){
    onoff_("stampa_automatica")
    });
    slide_menu.AddChild( tgl_stampa_automatica );          
    tgl_attiva_stampa_lavorazione = app.CreateCheckBox( "Stampa su Lavorazione", 0.8 );
    tgl_attiva_stampa_lavorazione.SetChecked(datas['stampa_lavorazione']);
    tgl_attiva_stampa_lavorazione.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_lavorazione.SetTextSize( hight_text );
    tgl_attiva_stampa_lavorazione.SetOnTouch( function(){onoff_("stampa_lavorazione")});
    slide_menu.AddChild( tgl_attiva_stampa_lavorazione );     
    tgl_attiva_stampa_lavorazione_ordini_annullati = app.CreateCheckBox( "Stampa su Lavorazione Ordini Annullati", 0.8 );
    tgl_attiva_stampa_lavorazione_ordini_annullati.SetChecked(datas['stampa_lavorazione_ordini_annullati']);
    tgl_attiva_stampa_lavorazione_ordini_annullati.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_lavorazione_ordini_annullati.SetTextSize( hight_text );
    tgl_attiva_stampa_lavorazione_ordini_annullati.SetOnTouch( function(){onoff_("stampa_lavorazione_ordini_annullati")});
    slide_menu.AddChild( tgl_attiva_stampa_lavorazione_ordini_annullati ); 
    tgl_attiva_stampa_solo_prodotti = app.CreateCheckBox( "Stampa solo Prodotti", 0.8 );
    tgl_attiva_stampa_solo_prodotti.SetChecked(datas['stampa_solo_prodotti']);
    tgl_attiva_stampa_solo_prodotti.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_solo_prodotti.SetTextSize( hight_text );
    tgl_attiva_stampa_solo_prodotti.SetOnTouch( function(){onoff_("stampa_solo_prodotti")});
    slide_menu.AddChild( tgl_attiva_stampa_solo_prodotti );
    tgl_attiva_stampa_qrcode = app.CreateCheckBox( "Stampa QRCode", 0.8 );
    tgl_attiva_stampa_qrcode.SetChecked(datas['stampa_qrcode']);
    tgl_attiva_stampa_qrcode.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_qrcode.SetTextSize( hight_text );
    tgl_attiva_stampa_qrcode.SetOnTouch( function(){onoff_("stampa_qrcode")});
    slide_menu.AddChild( tgl_attiva_stampa_qrcode );
    if(datas['stampa_solo_prodotti']=="false"){
    tgl_attiva_stampa_dettaglio = app.CreateCheckBox( "Stampa Descrizione Prodotto", 0.8 );
    tgl_attiva_stampa_dettaglio.SetChecked(datas['stampa_descrizione']);
    tgl_attiva_stampa_dettaglio.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_dettaglio.SetTextSize( hight_text );
    tgl_attiva_stampa_dettaglio.SetOnTouch( function(){onoff_("stampa_descrizione")});
    slide_menu.AddChild( tgl_attiva_stampa_dettaglio );
    tgl_attiva_stampa_pagamento = app.CreateCheckBox( "Stampa Pagamento scontrino", 0.8 );
    tgl_attiva_stampa_pagamento.SetChecked(datas['stampa_pagamento']);
    tgl_attiva_stampa_pagamento.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_pagamento.SetTextSize( hight_text );
    tgl_attiva_stampa_pagamento.SetOnTouch( function(){onoff_("stampa_pagamento")});
    slide_menu.AddChild( tgl_attiva_stampa_pagamento );
    tgl_attiva_stampa_email = app.CreateCheckBox( "Stampa Email scontrino", 0.8 );
    tgl_attiva_stampa_email.SetChecked(datas['stampa_email']);
    tgl_attiva_stampa_email.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_email.SetTextSize( hight_text );
    tgl_attiva_stampa_email.SetOnTouch( function(){onoff_("stampa_email")});
    slide_menu.AddChild( tgl_attiva_stampa_email );
    tgl_attiva_stampa_prezzi = app.CreateCheckBox( "Stampa Prezzi scontrino", 0.8 );
    tgl_attiva_stampa_prezzi.SetChecked(datas['stampa_prezzi']);
    tgl_attiva_stampa_prezzi.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_prezzi.SetTextSize( hight_text );
    tgl_attiva_stampa_prezzi.SetOnTouch( function(){onoff_("stampa_prezzi")});
    slide_menu.AddChild( tgl_attiva_stampa_prezzi );
    tgl_attiva_stampa_totali = app.CreateCheckBox( "Stampa Totali scontrino", 0.8 );
    tgl_attiva_stampa_totali.SetChecked(datas['stampa_totali']);
    tgl_attiva_stampa_totali.SetMargins( 0, 0.0, 0, 0 );
    tgl_attiva_stampa_totali.SetTextSize( hight_text );
    tgl_attiva_stampa_totali.SetOnTouch( function(){onoff_("stampa_totali")});
    slide_menu.AddChild( tgl_attiva_stampa_totali );
   }
    grid_print = sup.CreateGridLayout();
    grid_print.SetColCount( 2 );
    txt = app.CreateText( "Larghezza Stampante: ",0.3);
    txt.SetTextSize( hight_text );
    grid_print.AddChild( txt );
    sel_tipo_print = app.CreateSpinner("58,80", 0.3 );
    sel_tipo_print.SelectItem(datas["stampa_larghezza"])
    sel_tipo_print.SetMargins(0,0,0,0)
    sel_tipo_print.SetTextSize( hight_text );
    grid_print.AddChild( sel_tipo_print );
    slide_menu.AddChild( grid_print );
    save_print_mm = app.CreateButton( "Salva Larghezza Stampa", 0.3 );
    save_print_mm.SetMargins( 0, 0.02, 0, 0 );
    save_print_mm.SetBackColor('#666666');
    save_print_mm.SetOnTouch( function(){select_sezione_stampante_bluetooth(sel_tipo_print)});
    slide_menu.AddChild( save_print_mm );
    if(datas['print_tipo_connessione']=="bluetooth"){
    btn_test = app.CreateButton( "Test Stampa", 0.3 );
    btn_test.SetMargins( 0, 0.02, 0, 0 );
    btn_test.SetTextSize( hight_text );
    btn_test.SetBackColor('#666666');
    btn_test.SetOnTouch(print_test);
    slide_menu.AddChild( btn_test );
    }else{     
    btn_test = app.CreateButton( "Setting Wifi Printer", 0.3 );
    btn_test.SetMargins( 0, 0.02, 0, 0 );
    btn_test.SetTextSize( hight_text );
    btn_test.SetBackColor('#666666');
    btn_test.SetOnTouch(start_setting_wifi_printer);   
    slide_menu.AddChild( btn_test );            
    }    
    btn = app.CreateButton( "Chiudi", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn_test.SetTextSize( hight_text );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(return_menu);
    slide_menu.AddChild( btn );    
    app.AddLayout( slide_menu );
    break;      
    case 3:
    slide_menu = app.CreateLayout( "linear", "Vertical" ); 
    slide_menu.SetSize( 1, 1 );          
  	slide_menu.SetBackColor( "black" ); 
    txt_voce = app.CreateText( "Gestione Notifiche" );
    txt_voce.SetTextSize( 22 );
    slide_menu.AddChild( txt_voce );
    tgl_attiva_voce = app.CreateCheckBox( "Notifica Vocale", 0.8 );
    tgl_attiva_voce.SetChecked(datas['notifica_vocale']);
    tgl_attiva_voce.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_voce.SetOnTouch( function(){onoff_("notifica_vocale")});
    slide_menu.AddChild( tgl_attiva_voce );    
    play_voce = app.CreateButton( "Test notifica Voce" );
    play_voce.SetOnTouch(test_voce);
    slide_menu.AddChild(play_voce)
    tgl_attiva_beep = app.CreateCheckBox( "Notifica Audio", 0.8 );
    tgl_attiva_beep.SetChecked(datas['notifica_audio']);
    tgl_attiva_beep.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_beep.SetOnTouch( function(){onoff_("notifica_audio")});
    slide_menu.AddChild( tgl_attiva_beep );
    spin_mp3 = app.CreateSpinner("Milano,Roma,Napoli,Venezia,Firenze", 0.4 );
    spin_mp3.SelectItem(datas['tipo_suoneria'])
    spin_mp3.SetOnChange( sound_check );
    slide_menu.AddChild( spin_mp3 );    
    mp3 = app.CreateMediaPlayer();
    mp3.SetFile("sound/"+datas['tipo_suoneria']+".mp3");
    play_mp3 = app.CreateButton( "Ascolta Suoneria" );
    play_mp3.SetOnTouch(play);
    slide_menu.AddChild(play_mp3)
    txt_notifiche_bar = app.CreateText( "_____________________" );
    txt_notifiche_bar.SetTextSize( 22 );
    slide_menu.AddChild( txt_notifiche_bar);  
    txt_notifiche_out = app.CreateText( "Gestione Notifiche in Uscita" );
    txt_notifiche_out.SetTextSize( 22 );
    txt_notifiche_out.SetPosition( 0 );
    slide_menu.AddChild( txt_notifiche_out);  
    tgl_attiva_email = app.CreateCheckBox( "Notifica EMAIL", 0.8 );
    tgl_attiva_email.SetChecked(datas['notifica_email']);
    tgl_attiva_email.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_email.SetOnTouch( function(){onoff_("notifica_email")});
    slide_menu.AddChild( tgl_attiva_email );
    if(datas["sms_service"]=="true"){
    tgl_attiva_sms = app.CreateCheckBox( "Notifica SMS", 0.8 );
    tgl_attiva_sms.SetChecked(datas['notifica_sms']);
    tgl_attiva_sms.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_sms.SetOnTouch( function(){onoff_("notifica_sms")});
    slide_menu.AddChild( tgl_attiva_sms );
    var text = "Hai <big><b>"+creditoSms+"</b></big> notifiche HQ";
    txtCredito = app.CreateText(text, 0.6, -1, "Html" );
    txtCredito.SetTextSize( 12 );
    txtCredito.SetTextColor("#4ca832")
    txtCredito.SetTextShadow( 20, 5,10, "#000000" );
    slide_menu.AddChild( txtCredito );    
    }
    btn = app.CreateButton( "Chiudi", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(return_menu);
    slide_menu.AddChild( btn );    
    app.AddLayout( slide_menu );
    break;      
    case 4:
    slide_menu = app.CreateLayout("Linear", "Vertical"); 
    slide_menu.SetSize( 1, 1 );          
  	slide_menu.SetBackColor( "black" );      
    txt_system = app.CreateText( "Gestione Sistema" );
    txt_system.SetTextSize( 22 );
    slide_menu.AddChild( txt_system );     
    tgl_attiva_test_carica = app.CreateCheckBox( "Test all\'avvio controllo Ricarica", 0.8 );
    tgl_attiva_test_carica.SetChecked(datas['controllo_carica']);
    tgl_attiva_test_carica.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_test_carica.SetOnTouch( function(){onoff_("controllo_carica")});
    slide_menu.AddChild( tgl_attiva_test_carica );    
    tgl_attiva_tipo_visual = app.CreateCheckBox( "Tipo Visual.Ordini \n On(Dis) \n Off(Asc)", 0.8 );
    tgl_attiva_tipo_visual.SetChecked(datas['tipo_visualizzazione']);
    tgl_attiva_tipo_visual.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_tipo_visual.SetOnTouch( function(){onoff_("tipo_visualizzazione")});
    slide_menu.AddChild( tgl_attiva_tipo_visual );
    tgl_attiva_tipo_footer_tools = app.CreateCheckBox( "Schermo Intero", 0.8 );
    tgl_attiva_tipo_footer_tools.SetChecked(datas['00_footer_button_tools']);
    tgl_attiva_tipo_footer_tools.SetMargins( 0, 0.02, 0, 0 );
    tgl_attiva_tipo_footer_tools.SetOnTouch( function(){onoff_("00_footer_button_tools")});
    slide_menu.AddChild( tgl_attiva_tipo_footer_tools );    
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    slide_menu.AddChild( txt_linea );    
    txt = app.CreateText( "Configurazione Layout APP" );
    txt_linea.SetTextSize( 12 );
    txt.SetTextColor("#fcba03")
    slide_menu.AddChild( txt );
    txt_icon_px = sup.CreateTextEdit(iconpx,-1, null, "floating" );
    txt_icon_px.SetHint( "Pixel Icone Ordini" ); // Float label.
    txt_icon_px.SetTextSize( 12 );
    txt_icon_px.SetColor( "#FAFAFA" );
    slide_menu.AddChild( txt_icon_px );
    txt_footer_altezza = sup.CreateTextEdit(footer_altezza,-1, null, "floating" );
    txt_footer_altezza.SetHint( "Altezza Footer" ); // Float label.
    txt_footer_altezza.SetTextSize( 12 );
    txt_footer_altezza.SetColor( "#FAFAFA" );
    slide_menu.AddChild( txt_footer_altezza ); 
    txt_footer_padding = sup.CreateTextEdit(footer_padding,-1, null, "floating" );
    txt_footer_padding.SetHint( "Padding Footer" ); // Float label.
    txt_footer_padding.SetTextSize(12)
    txt_footer_padding.SetColor( "#FAFAFA" );
    slide_menu.AddChild( txt_footer_padding );
    reset_footer = app.CreateButton("Reset Layout",-1,0.04  );
    reset_footer.SetMargins( 0, 0.01, 0, 0.01 );
    reset_footer.SetTextSize(10)
    reset_footer.SetBackColor('#666666');
    reset_footer.SetOnTouch(reset_layout);
    slide_menu.AddChild( reset_footer );
    salva_footer = app.CreateButton("Salva",-1,0.04  );
    salva_footer.SetMargins( 0, up_margine, 0, 0 );
    salva_footer.SetTextSize(10)
    salva_footer.SetBackColor('#666666');
    salva_footer.SetOnTouch( function(){dimensioni_footer(txt_footer_altezza,txt_footer_padding,txt_icon_px) });
    slide_menu.AddChild( salva_footer );    
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    slide_menu.AddChild( txt_linea );
    if(datas["multipla_config"]=="true"){
  	txt = app.CreateText( "Setting Multipla" );
    txt_linea.SetTextSize( 12 );
    txt.SetTextColor("#fcba03")
    slide_menu.AddChild( txt );      
  	grid_azienda = sup.CreateGridLayout();
    grid_azienda.SetColCount( 3 );  	    	       	    	       
  	repato_titolo = app.CreateText("Reparto: ", -1, -1 );
    repato_titolo.SetTextSize( 12 );
    repato_titolo.SetMargins( 0, 0.02, 0, 0 );
    grid_azienda.AddChild(repato_titolo)    
  	num_azienda = app.CreateText(num_mua, -1, -1 );
    num_azienda.SetTextSize( 14 );
    num_azienda.SetTextColor("#4290f5")
    num_azienda.SetMargins( 0.02, 0.02, 0, 0 );
    grid_azienda.AddChild(num_azienda)     	       	    	       
    reparto_azienda = app.CreateText(datas["multipla_nome_"+num_mua], -1, -1 );
    reparto_azienda.SetTextSize( 14 );
    reparto_azienda.SetTextColor("#4290f5")
    reparto_azienda.SetMargins( 0.02, 0.02, 0, 0 );
    grid_azienda.AddChild(reparto_azienda)   
    slide_menu.AddChild( grid_azienda );    
    spin_multiplaReparto = app.CreateSpinner(datas['tipo_ordine'], -1 );
    spin_multiplaReparto.SelectItem(num_mur)
    spin_multiplaReparto.SetMargins(0,0,0.02,0)
    spin_multiplaReparto.SetTextSize(14)
    slide_menu.AddChild( spin_multiplaReparto );
    btn_mua = app.CreateButton("Salva Reparto",-1,0.05 );
    btn_mua.SetTextSize(10)
    btn_mua.SetMargins( 0.04, up_margine, 0, 0 );
    btn_mua.SetBackColor('#666666');
    btn_mua.SetOnTouch(multipla_tipo_save);
    slide_menu.AddChild( btn_mua );    
    txt_linea = app.CreateText( "--------------------------------------------------------------------------------" );
    txt_linea.SetTextSize( 12 );
    slide_menu.AddChild( txt_linea );    
   }
    btn = app.CreateButton( "Chiudi", 0.3 );
    btn.SetMargins( 0, 0.02, 0, 0 );
    btn.SetBackColor('#666666');
    btn.SetOnTouch(return_menu);
    slide_menu.AddChild( btn );    
    app.AddLayout( slide_menu );
    break;  
    case 5: //********************* UTILITY ************************************
  	slide_menu = app.CreateLayout( "Linear", "Vertical" );
    btn = app.CreateButton( "Utility",1,0.05,"Gray");
    btn.SetTextColor('#000000')
    btn.SetBackColor('#ffffff');
    btn.SetTextSize(14)
    btn.SetOnTouch(reset_screen)
    slide_menu.AddChild( btn );
  	lst = app.CreateList( "",1,0.9,"Html");
    lst.SetBackColor ("#ffffff");
    lst.SetTextColor1("#000000");
    lst.SetPadding( 0, 0.1, 0, 0 );
    lst.SetOnTouch( urlpage );
	for(pd in data_page){lst.AddItem(pd);}
    slide_menu.AddChild( lst );
    btn = app.CreateButton( "Chiudi",  1, -1, "Gray" );
    btn.SetMargins( 0, 0, 0, 0 );
    btn.SetTextColor('#000000')
    btn.SetTextSize(15)
    btn.SetOnTouch(return_menu);
    slide_menu.AddChild( btn );
    app.AddLayout( slide_menu );
    break;  
    case 6:
     app.CloseDrawer( "Left" );
    break;    
    case 8:
     app.CloseDrawer( "Left" );
    break;
    case 7:
    bt.Disconnect();
    app.Exit( );
    break;      
    }}   

   function multipla_tipo_save(){    
    spin_multiplaReparto=spin_multiplaReparto.GetText()
    app.SaveText( "tpr", spin_multiplaReparto);
    multi_save_reparto["multipla_reparto_"+num_mua]= spin_multiplaReparto  
    db.ref("config/"+uid).update(multi_save_reparto).then(OnSuccessSend).catch(OnFailedSend); 
    alert("Per rendere effettive le modifiche il dispositivo sarà riavviato.","Memorizzazione Reparto")
    app.Exit()
    }