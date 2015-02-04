var country,state,city,pinCode,street,street2;
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function getLocation() {
document.getElementById("messageBox").style.visibility="hidden";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
window.onload=getLocation;

function showPosition(position) {
	//document.getElementById('locationinfo').hide();
	document.getElementById('lat').value = position.coords.latitude;
	document.getElementById('long').value = position.coords.longitude;
	var latlon = position.coords.latitude + "," + position.coords.longitude;
	var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    
	document.getElementById("mapholder").innerHTML = "<div id='mapinner'><div class='loctext'>Are you on this location</div><img src='"+img_url+"'><div class='cls' onclick='closemapwin()'>X</div><div class='geobtns'><input class='geobtn1' type='button' value='Get to my store' onclick='getLocationDetails()'></button><input class='geobtn2' type='button' value='No Thanks' onclick='closemapwin()'></button></div></div>";
	
	document.getElementById('mapinner').style.visibility="hidden";
//hide();
latitude1=document.getElementById("lat").value;
longitude1=document.getElementById("long").value;

var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+
        latitude1+","+longitude1+"&sensor=true";
    var xhr = createCORSRequest('POST', url);
           if (!xhr) {
             alert('CORS not supported');
           }
         
           xhr.onload = function() {
        
            var data =JSON.parse(xhr.responseText);
            
            if(data.results.length>0)
            {
            
            var locationDetails=data.results[0].formatted_address;
            var  value=locationDetails.split(",");
              //alert(value);
            count=value.length;
			street=value[count-4];
			street2=value[count-5];
			address=street+","+street2;
            country=value[count-1];
            state=value[count-2];
            city=value[count-3];
            pin=city.split(" ");
            pinCode=pin[pin.length-1];
              //alert(pinCode);
            city=city.replace(pinCode,' ');
              locationall=address+","+pinCode+","+city+","+country;
            document.getElementById('location').value=locationall;
               pinCode = pinCode.replace(/^\s+|\s+$/g,'');
			document.getElementById('pin').value=pinCode;
              country = country.replace(/^\s+|\s+$/g,'');
			document.getElementById('country').value=country;
              city = city.replace(/^\s+|\s+$/g,'');
			document.getElementById('city').value=city;
              state = state.replace(/^\s+|\s+$/g,'');
            document.getElementById('state').value=state;
			}
            else
            {
             document.getElementById("messageBox").style.visibility="visible";
             document.getElementById("message").innerHTML=
               "Please try again in some time";
            }
            
           };

           xhr.onerror = function() {
               sweetAlert('Woops, there was an error making the request.');
               
           };
        xhr.send();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function closemapwin(){

	document.getElementById("mapinner").style.visibility="hidden";
	document.getElementById("locinfocontain").style.display="none";

}

function getlocval(){
var pincod = document.getElementById('pin').value;
var getcity = document.getElementById('city').value;
  
  //alert(getcity);
  
  ///var newcity = getcity.trim();
  
  if(pincod == '08001' || getcity == '08001'){
	window.location.href = 'http://toyourdoor24.com/pages/08001-local-stores';
	}
else if(pincod == '08002' || getcity == '08002'){
	window.location.href = 'http://toyourdoor24.com/pages/08002-local-stores';
	}
else if(pincod == '08003' || getcity == '08003'){
	window.location.href = 'http://toyourdoor24.com/pages/08003-local-stores';
	}
	else{
		sweetAlert('There has no store in that area');
	}
}
