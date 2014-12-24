(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		KortaTokenPaymentController: function(scope, RequestSender,routeParams, location, http, dateFilter,webStorage,localStorageService) {
		  
		  scope.formData = {}; 
		  var additionalPlanFormData = {};
		  var additionalFormData = {};
		  var renewalOrderFormData = {};
		  var clientData = {};

		  //values getting form constants.js file
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		  scope.kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
		  scope.kortaTokenValue = selfcare.models.kortaTokenValue;
		  
		  additionalFormData = webStorage.get('additionalPlanFormData') || webStorage.get("renewalOrderFormData") || "";
		  scope.formData.amount = additionalFormData.planAmount;
		  scope.formData.description = additionalFormData.planName;
		  scope.kortaMerchantId = additionalFormData.value.merchantId;
		  scope.kortaTerminalId = additionalFormData.value.terminalId;
		 
		  if(webStorage.get("eventData")){
			 var  VODTotalAmount = webStorage.get('VODTotalAmount');
			  scope.formData.amount = VODTotalAmount;
		  }
		  clientData = webStorage.get('selfcareUserData') || "";
		   scope.clientId = clientData.id;
		  
		  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
			  clientData = data;
			  var token = clientData.selfcare.token;
			  var name = clientData.lastname;
			  name = name.replace(" ","");	
			  
			  scope.formData.fullName = name;
			  scope.formData.address = clientData.addressNo;
			  scope.formData.emailId = clientData.email;
			  scope.formData.zipcode = clientData.zip;
			  scope.formData.city = clientData.city;
			  scope.formData.country = clientData.country;
			  scope.formData.mobileNo = clientData.phone;
			  scope.formData.token = CryptoJS.AES.decrypt(token, scope.kortaEncriptionKey).toString(CryptoJS.enc.Utf8);
		  });
		  
		  scope.formData.terms = 'N'; 
		  scope.doAction = 'RECCURING'; 
		  
		  scope.TermsAndCondition = function(data) {
				scope.formData.terms = data;
		   };
		  
		    var temp = localStorageService.get('Language')||"";
			   
			scope.formData.optlang = temp.code || selfcare.models.locale;
		  
			scope.formData.currency = selfcare.models.kortaCurrencyType;
		  
		  scope.submitFun = function(){
			  
			  
			  var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+
				',"'+scope.kortaPaymentMethod+'":"'+scope.doAction+'","'+scope.kortaTokenValue+'":"'+scope.formData.token+
						'","'+scope.kortaclientId+'":'+scope.clientId+'}';
			  var encryptString = encodeURIComponent(encryptData);
			  
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  
			  scope.downloadurl = selfcare.models.additionalKortaUrl+"/"+routeParams.planId+"/"+routeParams.clientId+"?encryptedKey="+scope.encryptedString+"&";
			  

			  if(scope.kortaTestServer == 'TEST'){
				  scope.md5data = scope.formData.amount + scope.formData.currency + scope.kortaMerchantId
				  + scope.kortaTerminalId + scope.formData.description + "//1/" 
				  +scope.formData.token + additionalFormData.value.secretCode +scope.kortaTestServer;
			  }else if(scope.kortaTestServer == 'LIVE'){
				  scope.md5data = scope.formData.amount + scope.formData.currency + scope.kortaMerchantId
				  + scope.kortaTerminalId + scope.formData.description + "//1/" 
				  +scope.formData.token + additionalFormData.value.secretCode;
			  }else{
				  alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'");
				  location.path('/profile');
			  }
			  scope.formData.md5value=md5(scope.md5data);

		  };
    }
  });
selfcare.ng.application.controller('KortaTokenPaymentController', [
                                                                   '$scope', 
                                                                   'RequestSender',
                                                                   '$routeParams', 
                                                                   '$location', 
                                                                   '$http', 
                                                                   'dateFilter',
                                                                   'webStorage', 
                                                                   'localStorageService', 
                                                                   selfcare.controllers.KortaTokenPaymentController]).run(function($log) {
    $log.info("KortaTokenPaymentController initialized");
  });
}(selfcare.controllers || {}));
