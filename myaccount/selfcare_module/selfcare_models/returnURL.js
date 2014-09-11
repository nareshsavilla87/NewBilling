(function(selfcare_module) {
	//var hostName = window.location.host;
	//var portNo = window.location.port;
	//console.log(hostName);
	var locationOrigin = window.location.origin;
	console.log(locationOrigin);
	//var locationPathname = window.location.pathname;
	 
   selfcare.models = _.extend(selfcare_module, {
	   //return URL form after clients success
	   //returnURL : "https://"+hostName+"/Clientapp/myaccount/index.html#/active",
	   //selfcareAppUrl : "https://"+hostName+"/Clientapp/myaccount/index.html"
	   returnURL : locationOrigin+"/Clientapp/myaccount/index.html#/active",
	   selfcareAppUrl : locationOrigin+"/Clientapp/myaccount/index.html"
		   
  });
}(selfcare.models || {}));
