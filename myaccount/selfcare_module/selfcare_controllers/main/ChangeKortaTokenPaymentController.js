(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangeKortaTokenPaymentController: function(scope, RequestSender, location,webStorage) {
		  
		  //changes
		var  clientData = {};
		scope.formData = {};
          clientData = webStorage.get('selfcareUserData');
		  alert(clientData);
		  var name = clientData.lastname;
		  name = name.trim();				
		  name = name.replace(/ /g, '');
			alert(name);
		  scope.formData.fullName = name;
		  scope.formData.address = clientData.addressNo;
		  scope.formData.emailId = clientData.email;
		  scope.formData.zipcode = clientData.zip;
		  scope.formData.city = clientData.city;
		  scope.formData.country = clientData.country;
		  scope.formData.mobileNo = clientData.phone;
		  scope.formData.description = scope.formData.address+","+scope.formData.city;
		  //scope.formData.description = "AshokReddy";
		  scope.formData.doAction = "STNOCAP";
		  scope.formData.amount = 100;
		  
		  scope.langs = [];
		  scope.langs = selfcare.models.Langs;
		  scope.formData.optlang = scope.langs[0].code;
		  
		  var clientId = clientData.id;

		  //values getting form constants.js file
		  scope.kortaMerchantId = selfcare.models.kortaMerchantId;
		  scope.kortaTerminalId = selfcare.models.kortaTerminalId;
		  scope.kortaEncriptionKey = selfcare.models.kortaEncriptionKey;
		  scope.kortaSecretCode = selfcare.models.kortaSecretCode;
		  scope.kortaTestServer = selfcare.models.kortaTestServer;
		  scope.kortaAmountField = selfcare.models.kortaAmountField;
		  scope.kortaclientId = selfcare.models.kortaclientId;
		  
		  scope.formData.currency = 'ISK';  
		  scope.displaycurrency = '[ISK]';
		  
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
	      
	      
	      
	      scope.submitFun = function(){
			  webStorage.remove('selfcareUserData');
			  
			  alert('name: '+scope.formData.fullName);
			  alert('address:'+scope.formData.address);
			  alert('email:'+scope.formData.emailId);
			  alert('zip: '+scope.formData.zipcode);
			  alert('city: '+scope.formData.city);
			  alert('country: '+scope.formData.country);
			  alert('phone: '+scope.formData.mobileNo);
			  alert('token: '+scope.formData.token);
			  
			  var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":'+clientId+ '}';
			  alert(encryptData);
			  var encryptString = encodeURIComponent(encryptData);
			  alert('encryptString:'+scope.kortaEncriptionKey);
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  alert('aes Encryption:'+scope.encryptedString);
			  scope.downloadurl = selfcare.models.downloadUrl+""+scope.encryptedString+"&";
			  alert(scope.downloadurl);
			  
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;
			 // var md5data = 100+'ISK'+'8185318'+'26460'+'AshokReddy'+"/"+'STNOCAP'+"//"+scope.formData.token + 'aXVspr9GY4rEwwUGKI75jDerw7iRhkw388h23fVA' +'TEST';
			 // var md5data = 100+'ISK'+'8185318'+'26460'+scope.formData.description+"/"+'STNOCAP'+"//"+scope.formData.token + 'aXVspr9GY4rEwwUGKI75jDerw7iRhkw388h23fVA' +'TEST';
			  alert('md5data:'+md5data);
			  scope.formData.md5value=md5(md5data);
			  console.log(scope.formData.md5value);
			  alert(scope.formData.md5value);
			 
		  };
		  
	  }
  });
  selfcare.ng.application.controller('ChangeKortaTokenPaymentController', ['$scope', 'RequestSender', '$location','webStorage', selfcare.controllers.ChangeKortaTokenPaymentController]).run(function($log) {
    $log.info("ChangeKortaTokenPaymentController initialized");
  });
}(selfcare.controllers || {}));
