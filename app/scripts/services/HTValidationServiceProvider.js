(function(module) {
  mifosX.services = _.extend(module, {
    HTValidationService: function(scope, httpService) {
      
    
    	scope.regXForMobileNumber = /^[0-9]{9,10}$/;
    	scope.regXForZipCode = /^[0-9]{6,6}$/;
    	scope.regXForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    	
    this.validateEmail = function(emailData){ 
    	
    	
    	if(emailData == undefined || emailData.trim() == ""){
    		return false;
    	}else{ 
    		return scope.regXForEmail.test(emailData); 
    	}    	
    };
    
    this.validateZipCode = function(zipCodeData){ 
    	
		if(zipCodeData == undefined || zipCodeData.toString().trim() == ""){
	 		return false;
	 	}else{ 
	 		return scope.regXForZipCode.test(zipCodeData); 
	 	}  
    };
    
    this.regXForMobileNumber = function(numberData){ 
    	
    	if(numberData == undefined || numberData.toString().trim() == ""){
    		return false;
    	}else{ 
    		return scope.regXForMobileNumber.test(numberData); 
    	}    	
    };
    
    	
    	

    }
  });
  mifosX.ng.services.service('HTValidationService', ['$rootScope', 'HttpService', mifosX.services.HTValidationService]).run(function($log) {
    $log.info("HTValidationService initialized");
  });
}(mifosX.services || {}));
