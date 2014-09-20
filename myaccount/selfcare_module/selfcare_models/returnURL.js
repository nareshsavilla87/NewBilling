(function(selfcare_module) {
	//var hostName = window.location.host;
	//var portNo = window.location.port;
	//console.log(hostName);
	var locationOrigin = window.location.origin;
	console.log(locationOrigin);
	var locationPathname = window.location.pathname;
	console.log(locationPathname);
	 
   selfcare.models = _.extend(selfcare_module, {
	   //return URL form after clients success
	   //returnURL : "https://"+hostName+"/Clientapp/myaccount/index.html#/active",
	   //selfcareAppUrl : "https://"+hostName+"/Clientapp/myaccount/index.html"
	   returnURL : locationOrigin+"/Clientapp/myaccount/index.html#/active",
	   selfcareAppUrl : locationOrigin+"/Clientapp/myaccount/index.html",
	   downloadUrl : locationOrigin+"/Clientapp/myaccount/index.html#/kortasuccess?encryptedKey=",
	   additionalKortaUrl : locationOrigin+"/Clientapp/myaccount/index.html#/kortatokenpaymentsuccess",
		   
  });
}(selfcare.models || {}));
