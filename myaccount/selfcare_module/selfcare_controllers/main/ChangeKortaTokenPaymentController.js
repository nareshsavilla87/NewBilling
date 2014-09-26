(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangeKortaTokenPaymentController: function(scope, RequestSender, location,webStorage) {
		  
		  var clientData = {};
		  scope.formData = {};
          clientData = webStorage.get('selfcareUserData');
		 
		  scope.formData.fullName = clientData.lastname;
		  scope.formData.address = clientData.addressNo;
		  scope.formData.emailId = clientData.email;
		  scope.formData.zipcode = clientData.zip;
		  scope.formData.city = clientData.city;
		  scope.formData.country = clientData.country;
		  scope.formData.mobileNo = clientData.phone;
		  scope.formData.description = scope.formData.address;
		  scope.formData.doAction = "STNOCAP";
		  scope.formData.amount = 100;
		  
		  var clientId = clientData.id;
		  scope.formData.terms = 'N';

		  //values getting form constants.js file
		  scope.kortaMerchantId = selfcare.models.kortaMerchantId;
		  scope.kortaTerminalId = selfcare.models.kortaTerminalId;
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaSecretCode = selfcare.models.kortaSecretCode;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		  scope.kortaPaymentMethod = selfcare.models.kortaPaymentMethod;
		  scope.kortaTokenValue = selfcare.models.kortaTokenValue;
		  
		  scope.formData.currency = 'ISK';  
		  
		  scope.randomFun = function() {
				var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
				var string_length = 13;
				
				var randomstring = 'TT';
				
				for (var i=0; i<string_length; i++) {
					var rnum = Math.floor(Math.random() * chars.length);
					randomstring += chars.substring(rnum,rnum+1);	
				}	
				scope.formData.token = randomstring;
				
			};
			
		  scope.randomFun();  
		  
		  scope.previousPage = function(){
	    	  window.history.go(-1);
	      };   
	      
	      scope.TermsAndCondition = function(data) {
				scope.formData.terms = data;
			};
			
	      
	      scope.submitFun = function(){
	    	  
			  webStorage.remove('selfcareUserData');
			    
              var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":'+clientId+ ',"'
              +scope.kortaPaymentMethod+'":"'+scope.formData.doAction + '","' +scope.kortaTokenValue + '":"'+ scope.formData.token +'"}';
			  
			  var encryptString = encodeURIComponent(encryptData);
			  
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  
			  scope.downloadurl = selfcare.models.downloadUrl+""+scope.encryptedString+"&";
			 		  
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;
			 
			  scope.formData.md5value=md5(md5data);		
 
		  };
		  
	  }
  });
  selfcare.ng.application.controller('ChangeKortaTokenPaymentController', ['$scope', 'RequestSender', '$location','webStorage', selfcare.controllers.ChangeKortaTokenPaymentController]).run(function($log) {
    $log.info("ChangeKortaTokenPaymentController initialized");
  });
}(selfcare.controllers || {}));
