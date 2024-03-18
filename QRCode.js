app.Script("qrcode.min.js",true);

// UTF-8 Support.
!function(qrcode) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
}(qrcode);

const QRCode = {};

// Add text
QRCode.SetText = function( txt ) {
    this.qr.addData( txt ); // add text to qr
    this.qr.make(); // draw qr
    // QR quality and margin
    var url = this.qr.createDataURL( 7, 10 );
    this.img.SetPixelData( url );
 
   
};

// New instance
QRCode.Init = function( imgObj ) {
    this.img = imgObj;
    // Level and error ....
    this.qr = qrcode( 4, "L" );
};

// Save sdcard
QRCode.Save = function( path ) {
    this.img.Save( path );
    app.ScanFile( path ); // Say the gallery this is new image
};