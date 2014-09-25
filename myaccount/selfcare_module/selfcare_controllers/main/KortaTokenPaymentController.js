(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		KortaTokenPaymentController: function(scope, RequestSender,routeParams, location, http, dateFilter,webStorage) {
		  
		  scope.formData = {}; 
		  var additionalPlanFormData = {};
		  var renewalOrderFormData = {};
		  var clientData = {};
		  
		  //values getting form constants.js file
		  scope.kortaMerchantId = selfcare.models.kortaMerchantId;
		  scope.kortaTerminalId = selfcare.models.kortaTerminalId;
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaSecretCode = selfcare.models.kortaSecretCode;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		 
		  
		  if(webStorage.get('additionalPlanFormData')){
			  additionalPlanFormData = webStorage.get('additionalPlanFormData');
			  scope.formData.amount = additionalPlanFormData.planAmount;
			  console.log(additionalPlanFormData);
		  }else if(webStorage.get("renewalOrderFormData")){
			  renewalOrderFormData = webStorage.get('renewalOrderFormData');
			  scope.formData.amount = renewalOrderFormData.planAmount;
			  console.log(renewalOrderFormData);
		  }else if(webStorage.get("eventData")){
			 var  VODTotalAmount = webStorage.get('VODTotalAmount');
			  scope.formData.amount = VODTotalAmount;
			  console.log(webStorage.get("eventData"));
		  }
		  
		  clientData = webStorage.get('selfcareUserData');
		  
		  var name = clientData.lastname;
		  name = name.replace(" ","");	
		  
		  scope.formData.fullName = name;
		  scope.formData.address = clientData.addressNo;
		  scope.formData.emailId = clientData.email;
		  scope.formData.zipcode = clientData.zip;
		  scope.formData.city = clientData.city;
		  scope.formData.country = clientData.country;
		  scope.formData.mobileNo = clientData.phone;
		  scope.formData.description = scope.formData.address+","+scope.formData.city;
		  scope.formData.token = CryptoJS.AES.decrypt(clientData.selfcare.token, scope.kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
		  var clientId = clientData.id;
		  
		  scope.formData.terms = 'N';
		  
		  scope.TermsAndCondition = function(data) {
				scope.formData.terms = data;
		   };
		   
		   scope.previousPage = function(){
		    	  window.history.go(-1);
		    };
		  
		  //scope.langs = [];
		 // scope.langs = selfcare.models.Langs;
		 // scope.formData.optlang = scope.langs[0].code;
		  scope.formData.optlang = 'en';
		  
		  scope.formData.currency = 'ISK';
		  
		  //scope.currencydatas = [];
		 /* RequestSender.currencyTemplateResource.get(function(data) {
	            scope.currencydatas = data.currencydata.currencyOptions;
	            		
	        });	*/	
		  
		  scope.previousPage = function(){
	    	  window.history.go(-1);
	      };
	      
		  
		  scope.submitFun = function(){
			  //  110.00ISK818531826460AshokReddy//1/thor0009xxxxxxxxsecretcodexxxxxxxxxxxxx
			  
			  var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":'+clientId+'}';
			  var encryptString = encodeURIComponent(encryptData);
			  
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParams.planId+"/"+routeParams.clientId+"?encryptedKey="+scope.encryptedString+"&";
			  
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"//1"+"/"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;			 
			  scope.formData.md5value=md5(md5data);
		  };
    }
  });
selfcare.ng.application.controller('KortaTokenPaymentController', ['$scope', 'RequestSender','$routeParams', '$location', '$http', 'dateFilter','webStorage', selfcare.controllers.KortaTokenPaymentController]).run(function($log) {
    $log.info("KortaTokenPaymentController initialized");
  });
}(selfcare.controllers || {}));
