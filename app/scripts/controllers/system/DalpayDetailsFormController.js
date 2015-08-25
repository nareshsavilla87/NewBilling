(function(module) {
	mifosX.controllers = _.extend(module, {
		DalpayDetailsFormController : function(scope,webStorage, routeParams , location, resourceFactory,dateFilter) {
			scope.clientId = routeParams.clientId;
            scope.formData = {};
            scope.formEncryptedData = {};
            scope.cardTypeDatas = ['MASTERCARD','VISA','DISCOVERY','AMERICAN EXPRESS','OTHERS'];
            var key = mifosX.models.encrptionKey;
            
            scope.reset123 = function(){
            	webStorage.add("callingTab", {someString: "documents" });
            };
            var errors = []; 
            scope.selectCardType = function(number){
              if(number){
            	var cardNumber = number.replace(/ +/g, "");
            	var masterCard = cardNumber.match(/^5[1-5][0-9]{5,}$/);
            	var visaCard = cardNumber.match(/^4[0-9]{6,}$/);
            	var discoveryCard = cardNumber.match(/^6(?:011|5[0-9]{2})[0-9]{3,}$/);
            	var americanExpressCard = cardNumber.match(/^3[47][0-9]{5,}$/);
            	if(masterCard) scope.formData.cardType = 'MASTERCARD';
            	else if(visaCard) scope.formData.cardType = 'VISA';
            	else if(discoveryCard) scope.formData.cardType = 'DISCOVERY';
            	else if(americanExpressCard) scope.formData.cardType = 'AMERICAN EXPRESS';
            	else  scope.formData.cardType = 'OTHERS';
              }
              else{
            	  delete scope.formData.cardType;
              }
            };
            scope.cradNumberErrorHide = function(){
            	 scope.cardNumberDigit = false;
            	 scope.cardNumberValid = false;
            	 errors = []; 
            };
            scope.cardExpireErrorHide = function(){
           	     scope.patternMatch = false;
           	     scope.cardExpire = false;
           	     errors = []; 
           };
           
           scope.cardCvvNoErrorHide = function(){
           	scope.cardCvvNoDigit = false;
           	errors = []; 
           };
            
            var cardExpireDate = function(dateVal){
            	  var now=new Date();
				  var nowMonth = now.getMonth()+1;var nowYear = now.getFullYear();
				  var inputDate = (dateVal).split("/");
				  var inputMonth = parseInt(inputDate[0]);var inputYear = parseInt(inputDate[1]);
				  if(inputMonth<=nowMonth ){
					  if(inputYear<=nowYear) return true;
					  else  return false;
				  }else if(inputMonth>nowMonth){
					  if(inputYear<nowYear) return true;
					  else  return false;
				  }
            };
            var cardNumberValid = function(value){
            	
            	// accept only digits and dashes
            	if (/[^0-9-]+/.test(value))
            		return false;
            	var nCheck = 0,nDigit = 0,bEven = false;
            	
            	value = value.replace(/\D/g, "");

            	for (n = value.length - 1; n >= 0; n--) {
            		var cDigit = value.charAt(n);
            		var nDigit = parseInt(cDigit, 10);
            		if (bEven) {
            			if ((nDigit *= 2) > 9) nDigit -= 9;
            		}
            		nCheck += nDigit;
            		bEven = !bEven;
            	}
            	return (nCheck % 10) == 0;
            };
          
			  scope.submit = function () {
				  
				  var cardNumber = $('#cardNumber').val();
				  if(cardNumber){
					  cardNumber = cardNumber.replace(/ +/g, "");
					  var digitMatch=cardNumber.match(/^\d+$/);
					  if (!digitMatch){
						 scope.cardNumberDigit = true;
						 errors.push({"cardNumberDigit":'true'});
					  }else if(!cardNumberValid(cardNumber)){
						  scope.cardNumberValid = true;
						  errors.push({"cardNumberValid":'true'});
					  }
				  }
				  
				  var cardExpiryDate = $('#cardExpiryDate').val();
				  if(cardExpiryDate){
					  var match=$('#cardExpiryDate').val().match(/^\s*(0?[1-9]|1[0-2])\/(\d{4})\s*$/);
					  if (!match){
						  scope.patternMatch = true;
						  errors.push({"patternMatch":'true'});
					  }else if(cardExpireDate(cardExpiryDate)){
						  scope.cardExpire = true;
						  errors.push({"cardExpire":'true'});
					  }
				  }
				  
				  var cardCvvNo = $('#cardCvvNo').val();
				  if(cardCvvNo){
					  var match = $('#cardCvvNo').val().match(/^(?!0+$)\d{1,19}$/);
					  if(!match){
						  scope.cardCvvNoDigit = true;
						  errors.push({"cardCvvNoDigit":'true'});
					  }
				  }
				  if(errors.length == 0){
				    this.formEncryptedData.type="CreditCard";
					this.formEncryptedData.cardType = scope.formData.cardType;
				    this.formEncryptedData.name = this.formData.name;
				    if(scope.formData.cvvNumber)
				    this.formEncryptedData.cvvNumber = CryptoJS.AES.encrypt(scope.formData.cvvNumber, key).toString();
				    this.formEncryptedData.cardNumber = CryptoJS.AES.encrypt(this.formData.cardNumber, key).toString();
				    this.formEncryptedData.cardExpiryDate = CryptoJS.AES.encrypt(this.formData.cardExpiryDate, key).toString();			        
	                resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
	                    location.path('/viewclient/' + data.clientId);
	                });
	                webStorage.add("callingTab", {someString: "documents" });
				  }
			  };
	      }
	});
	 mifosX.ng.application.controller('DalpayDetailsFormController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter', mifosX.controllers.DalpayDetailsFormController]).run(function($log) {
	        $log.info("DalpayDetailsFormController initialized");
	    });
}(mifosX.controllers || {}));