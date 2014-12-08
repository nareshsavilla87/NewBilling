(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
	  KortaController: function(scope, RequestSender,routeParams, location, http, dateFilter,webStorage,localStorageService) {
		  
		  scope.formData = {}; 
		  var clientData = {};
		  var additionalFormData = {};
		  var eventData = [];
		  var routeParamsPlanId = routeParams.planId;
		  var routeParamsClientId = routeParams.clientId;
		  
		//values getting form constants.js file
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		  scope.kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
		  scope.kortaTokenValue = selfcare.models.kortaTokenValue;
		  
		  clientData = webStorage.get('selfcareUserData') || "";
		  
		  scope.clientId = clientData.id;
		  scope.formData.fullName = clientData.lastname;
		  scope.formData.address = clientData.addressNo;
		  scope.formData.emailId = clientData.email;
		  scope.formData.zipcode = clientData.zip;
		  scope.formData.city = clientData.city;
		  scope.formData.country = clientData.country;
		  scope.formData.mobileNo = clientData.phone;
		  
		  additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || webStorage.get("eventData") || "";
		  scope.formData.amount = additionalFormData.planAmount;
		  scope.formData.description = additionalFormData.planName;
		  scope.kortaMerchantId = additionalFormData.value.merchantId;
		  scope.kortaTerminalId = additionalFormData.value.terminalId;
		  scope.formData.terms = 'N';
		  
		  var randomFun = function() {
				var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
				var string_length = 13;
				var randomstring = 'TT';
				
				for (var i=0; i<string_length; i++) {
					var rnum = Math.floor(Math.random() * chars.length);
					randomstring += chars.substring(rnum,rnum+1);	
				}	
				scope.formData.token = randomstring;
				scope.token = CryptoJS.AES.encrypt(scope.formData.token, scope.kortaEncriptionKey).toString();
				
			};randomFun();
		  
		 scope.TermsAndCondition = function(data) {
				scope.formData.terms = data;
		 };
		 
		  scope.formData.doAction = "STORAGE";
		  
		  var temp = localStorageService.get('Language')||"";
		   
		  scope.formData.optlang = temp.code || selfcare.models.locale;
		  
		  scope.formData.currency = selfcare.models.kortaCurrencyType;
		  
		  scope.submitFun = function(){
			  if(webStorage.get('additionalPlanFormData')){
				  additionalFormData.kortaToken = scope.token;
				  webStorage.add('additionalPlanFormData',additionalFormData);
				  
			  }else if(webStorage.get('renewalOrderFormData')){
				  additionalFormData.kortaToken = scope.token;
				  webStorage.add('renewalOrderFormData',additionalFormData);
				  
			  }else if(webStorage.get('eventData')){
				  eventData.push({'kortaToken': scope.token});
				  webStorage.add('eventData',eventData);
			  }
			  
			  var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+
			  						',"'+scope.kortaPaymentMethod+'":"'+scope.formData.doAction+'","'+scope.kortaTokenValue+'":"'+scope.token+
			  								'","'+scope.kortaclientId+'":'+scope.clientId+'}';
			  
			  var encryptString = encodeURIComponent(encryptData);
			  
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  
			  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParamsPlanId+"/"+routeParamsClientId+"?encryptedKey="+scope.encryptedString+"&";
			  
			  if(scope.kortaTestServer == 'TEST'){
				  scope.md5data = scope.formData.amount + scope.formData.currency + scope.kortaMerchantId
				  + scope.kortaTerminalId + scope.formData.description + "/" + scope.formData.doAction + "//" 
				  +scope.formData.token + additionalFormData.value.secretCode +scope.kortaTestServer;
			  }else if(scope.kortaTestServer == 'LIVE'){
				  scope.md5data = scope.formData.amount + scope.formData.currency + scope.kortaMerchantId
				  + scope.kortaTerminalId + scope.formData.description + "/" + scope.formData.doAction + "//" 
				  +scope.formData.token + additionalFormData.value.secretCode;
			  }else{
				  alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
				  location.path('/profile');
			  }
<<<<<<< HEAD
			 
			  scope.formData.description = encodeURIComponent(scope.formData.description);
			  
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;			 
			   
			  scope.formData.md5value=md5(md5data);
			  console.log(scope.formData.md5value);
=======
			  scope.formData.md5value=md5(scope.md5data);
>>>>>>> upstream/master
		  };
    }
  });
selfcare.ng.application.controller('KortaController', [
                                                       '$scope', 
                                                       'RequestSender',
                                                       '$routeParams', 
                                                       '$location', 
                                                       '$http', 
                                                       'dateFilter',
                                                       'webStorage', 
                                                       'localStorageService', 
                                                       selfcare.controllers.KortaController]).run(function($log) {
    $log.info("KortaController initialized");
  });
}(selfcare.controllers || {}));
