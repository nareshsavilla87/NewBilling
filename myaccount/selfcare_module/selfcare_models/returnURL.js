(function(selfcare_module) {

	var locationOrigin = window.location.origin;
	var locationPathname = window.location.pathname;
	 
   selfcare.models = _.extend(selfcare_module, {
	   
	   returnURL : locationOrigin+locationPathname+"#/active",
	   selfcareAppUrl : locationOrigin+locationPathname,
	   additionalKortaUrl : locationOrigin+locationPathname+"#/kortatokenpaymentsuccess",
		   
  });
}(selfcare.models || {}));
