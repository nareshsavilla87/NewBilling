	 
	var locationOrigin = window.location.origin;
	var locationPathname = window.location.pathname;
	
	
	Langs = [{"name" : "English" , "code" : "en"},
            {"name" : "íslenska", "code":"is"}];
	
	 
   selfcareModels =  {
	   
	   obs_username 				: "selfcare",
	   obs_password 				: "selfcare",
	   returnURL 					: locationOrigin+locationPathname+"#/active",
	   selfcareAppUrl 				: locationOrigin+locationPathname,
	   additionalKortaUrl 			: locationOrigin+locationPathname+"#/kortasuccess",
	   encriptionKey 				: "Hugo Technologys",
	   kortaServer 					: "TEST",//or LIVE
	   kortaAmountField 			: "amount",
	   kortaclientId  				: 'clientId',
	   kortaPaymentMethod			: "PaymentMethodType",
	   kortaTokenValue				: "kortaToken",
	   kortaCurrencyType    		: "ISK",
	   locale   					: "en",
	   registerPlan		    		: "register-plan",
	   registrationRequiresDevice	: "registration-requires-device",
	   deviceAgrementType			: "device-agrement-type",
	   globalPayCurrencyType		: "NGN",
	   netellerCurrencyType			: "EUR",
	   
	   webtvURL						: locationOrigin+"/webtv/index.html#/",
		   
   	};
