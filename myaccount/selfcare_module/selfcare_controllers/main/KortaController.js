(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
	  KortaController: function(scope, RequestSender, location, http, dateFilter,webStorage) {
		  
		  scope.formData = {}; 
		  var planFormData = {};
		  planFormData = webStorage.get('planFormData');
		  console.log(planFormData);
		  
		  var name = planFormData.fullName;
			name = name.trim();				
			name = name.replace(/ /g, '');
			
		  scope.formData.fullName = name;
		  scope.formData.address = planFormData.address;
		  scope.formData.emailId = planFormData.emailId;
		  scope.formData.zipcode = planFormData.zipcode;
		  scope.formData.city = planFormData.city;
		  scope.formData.country = planFormData.country;
		  scope.formData.mobileNo = planFormData.mobileNo;
		  scope.formData.amount = planFormData.planAmount;
		  scope.formData.description = scope.formData.address+","+scope.formData.city;
		  //scope.formData.description = encodeURIComponent(scope.formData.address+","+scope.formData.city);
		  scope.formData.terms = 'N';
		  
		  scope.langs = [];
		  scope.langs = selfcare.models.Langs;
		  scope.formData.optlang = scope.langs[0].code;
		  
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
		  
		  scope.TermsAndCondition = function(data) {
				scope.formData.terms = data;
			};
			
		 scope.previousPage = function(){
	    	  window.history.go(-1);
	      };
			
		  scope.currencydatas = [];
		  scope.doActionTypes = [
			                         {name:"STNOCAP"},
			                         {name:"RECURRING"},
			                         {name:"STORAGE"}
		                         ];
		  scope.formData.doAction = scope.doActionTypes[2].name;
		  
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
	            		
		  
		  scope.submitFun = function(){
			  webStorage.remove('planFormData');
			  alert(scope.formData.token);
			  planFormData.kortaToken = CryptoJS.AES.encrypt(scope.formData.token, scope.kortaEncriptionKey).toString();
			  /*alert('name: '+scope.formData.fullName);
			  alert('address:'+scope.formData.address);
			  alert('email:'+scope.formData.emailId);
			  alert('zip: '+scope.formData.zipcode);
			  alert('city: '+scope.formData.city);
			  alert('country: '+scope.formData.country);
			  alert('phone: '+scope.formData.mobileNo);
			  alert('token: '+scope.formData.token);*/
			  webStorage.add('planFormData',planFormData);
			  var encryptData = '{"'+scope.kortaAmountField+'":'+scope.formData.amount+',"'+scope.kortaclientId+'":0}';
			  console.log(encryptData);
			  var encryptString = encodeURIComponent(encryptData);
			  console.log(encryptString);
			  scope.encryptedString = CryptoJS.AES.encrypt(encryptString, scope.kortaEncriptionKey).toString();
			  scope.downloadurl = selfcare.models.downloadUrl+""+scope.encryptedString+"&";
			  var md5data = scope.formData.amount+scope.formData.currency+scope.kortaMerchantId+scope.kortaTerminalId+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.formData.token + scope.kortaSecretCode +scope.kortaTestServer;	
			  scope.formData.md5value=md5(md5data);
			  console.log(scope.formData.md5value);
			  alert(scope.encryptedString);
		  };
    }
  });
selfcare.ng.application.controller('KortaController', ['$scope', 'RequestSender', '$location', '$http', 'dateFilter','webStorage', selfcare.controllers.KortaController]).run(function($log) {
    $log.info("KortaController initialized");
  });
}(selfcare.controllers || {}));
