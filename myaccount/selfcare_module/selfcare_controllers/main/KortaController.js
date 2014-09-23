(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
	  KortaController: function(scope, RequestSender,routeParams, location, http, dateFilter,webStorage) {
		  
		  scope.formData = {}; 
		  var clientData = {};
		  var planFormData = {};
		  var additionalPlanFormData = {};
		  var renewalOrderFormData = {};
		  var eventData = [];
		  var routeParamsPlanId = routeParams.planId;
		  var routeParamsClientId = routeParams.clientId;
		  
		  if(webStorage.get('planFormData')){
			  planFormData = webStorage.get('planFormData');
			  console.log(planFormData);
			  scope.formData.fullName = planFormData.fullName;
			  scope.formData.address = planFormData.address;
			  scope.formData.emailId = planFormData.emailId;
			  scope.formData.zipcode = planFormData.zipcode;
			  scope.formData.city = planFormData.city;
			  scope.formData.country = planFormData.country;
			  scope.formData.mobileNo = planFormData.mobileNo;
			  scope.formData.amount = planFormData.planAmount;
			  scope.formData.description = scope.formData.address+","+scope.formData.city;
			  
		  }else if(webStorage.get('additionalPlanFormData')){
			  additionalPlanFormData = webStorage.get('additionalPlanFormData');
			  if(webStorage.get('selfcareUserData')){
				  clientData = webStorage.get('selfcareUserData');
				  
				  scope.formData.fullName = clientData.lastname;
				  scope.formData.address = clientData.addressNo;
				  scope.formData.emailId = clientData.email;
				  scope.formData.zipcode = clientData.zip;
				  scope.formData.city = clientData.city;
				  scope.formData.country = clientData.country;
				  scope.formData.mobileNo = clientData.phone;
				  scope.formData.description = scope.formData.address+","+scope.formData.city;
			  }
			  scope.formData.amount = additionalPlanFormData.planAmount;
			  console.log(additionalPlanFormData);
			  
		  }else if(webStorage.get("renewalOrderFormData")){
			  renewalOrderFormData = webStorage.get('renewalOrderFormData');
			  if(webStorage.get('selfcareUserData')){
				  clientData = webStorage.get('selfcareUserData');
				  
				  scope.formData.fullName = clientData.lastname;
				  scope.formData.address = clientData.addressNo;
				  scope.formData.emailId = clientData.email;
				  scope.formData.zipcode = clientData.zip;
				  scope.formData.city = clientData.city;
				  scope.formData.country = clientData.country;
				  scope.formData.mobileNo = clientData.phone;
				  scope.formData.description = scope.formData.address+","+scope.formData.city;
			  }
			  scope.formData.amount = renewalOrderFormData.planAmount;
			  console.log(renewalOrderFormData);
			  
		  }else if(webStorage.get("eventData")){
			  eventData = webStorage.get("eventData");
			 var  VODTotalAmount = webStorage.get('VODTotalAmount');
			 if(webStorage.get('selfcareUserData')){
				  clientData = webStorage.get('selfcareUserData');
				  
				  scope.formData.fullName = clientData.lastname;
				  scope.formData.address = clientData.addressNo;
				  scope.formData.emailId = clientData.email;
				  scope.formData.zipcode = clientData.zip;
				  scope.formData.city = clientData.city;
				  scope.formData.country = clientData.country;
				  scope.formData.mobileNo = clientData.phone;
				  scope.formData.description = scope.formData.address+","+scope.formData.city;
			  }
			  scope.formData.amount = VODTotalAmount;
			  console.log(webStorage.get("eventData"));
		  }
		  
		  
		  scope.currencydatas = [];
		  scope.doActionTypes = [
			                         {name:"STNOCAP"},
			                         {name:"RECURRING"},
			                         {name:"STORAGE"}
		                         ];
		  scope.formData.doAction = scope.doActionTypes[2].name;
		  scope.langs = [];
		  scope.langs = selfcare.models.Langs;
		  scope.formData.optlang = scope.langs[0].code;
		  
		  
		  //values getting form constants.js file
		  scope.kortaMerchantId = selfcare.models.kortaMerchantId;
		  scope.kortaTerminalId = selfcare.models.kortaTerminalId;
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaSecretCode = selfcare.models.kortaSecretCode;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		  
		  scope.formData.currency = 'ISK';
		  
		 /* RequestSender.currencyTemplateResource.get(function(data) {
	            scope.currencydatas = data.currencydata.currencyOptions;
	            		
	        });	*/	
		  
		  scope.submitFun = function(){
			  if(webStorage.get('planFormData')){
				  webStorage.remove('planFormData');
				  planFormData.kortaToken = scope.formData.token;
				  webStorage.add('planFormData',planFormData);
				  
			  }else if(webStorage.get('additionalPlanFormData')){
				  webStorage.remove('additionalPlanFormData');
				  additionalPlanFormData.kortaToken = scope.formData.token;
				  webStorage.add('additionalPlanFormData',additionalPlanFormData);
				  
			  }else if(webStorage.get('renewalOrderFormData')){
				  webStorage.remove('renewalOrderFormData');
				  renewalOrderFormData.kortaToken = scope.formData.token;
				  webStorage.add('renewalOrderFormData',renewalOrderFormData);
				  
			  }else if(webStorage.get('eventData')){
				  webStorage.remove('eventData');
				  eventData.push({'kortaToken': scope.formData.token});
				  webStorage.add('eventData',eventData);
			  }
			  var encryptString = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":0}';	
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  if(webStorage.get('planFormData')){
				  scope.downloadurl = selfcare.models.downloadUrl+""+scope.encryptedString+"&";
				  
			  }else if(webStorage.get('additionalPlanFormData')){
				  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParamsPlanId+"/"+routeParamsClientId+"?encryptedKey="+scope.encryptedString+"&";
				  
			  }else if(webStorage.get('renewalOrderFormData')){
				  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParamsPlanId+"/"+routeParamsClientId+"?encryptedKey="+scope.encryptedString+"&";
				  
			  }else if(webStorage.get('eventData')){
				  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParamsPlanId+"/"+routeParamsClientId+"?encryptedKey="+scope.encryptedString+"&";
			  }
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;			 
			  scope.formData.md5value=md5(md5data);
		  };
    }
  });
selfcare.ng.application.controller('KortaController', ['$scope', 'RequestSender','$routeParams', '$location', '$http', 'dateFilter','webStorage', selfcare.controllers.KortaController]).run(function($log) {
    $log.info("KortaController initialized");
  });
}(selfcare.controllers || {}));
