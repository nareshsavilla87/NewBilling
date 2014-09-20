(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
	  KortaController: function(scope, RequestSender, location, http, dateFilter,webStorage) {
		  
		  scope.formData = {}; 
		  var planFormData = {};
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
		  
		  RequestSender.currencyTemplateResource.get(function(data) {
	            scope.currencydatas = data.currencydata.currencyOptions;
	            scope.formData.currency = 'ISK';
	            		
	        });		
		  
		  scope.submitFun = function(){
			  webStorage.remove('planFormData');
			  planFormData.kortaToken = scope.formData.token;
			  webStorage.add('planFormData',planFormData);
			  var encryptString = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":0}';	
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  scope.downloadurl = selfcare.models.downloadUrl+""+scope.encryptedString+"&";
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;			 
			  scope.formData.md5value=md5(md5data);
		  };
    }
  });
selfcare.ng.application.controller('KortaController', ['$scope', 'RequestSender', '$location', '$http', 'dateFilter','webStorage', selfcare.controllers.KortaController]).run(function($log) {
    $log.info("KortaController initialized");
  });
}(selfcare.controllers || {}));
