function geo(LON,LAT)
{   
     app.SendIntent("com.google.android.apps.maps",null,"android.intent.action.VIEW","android.intent.category.DEFAULT","geo:0,0?q=" +LON+","+LAT);       
}
