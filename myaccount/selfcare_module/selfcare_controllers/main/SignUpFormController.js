(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignUpFormController: function(scope,RequestSender,modal,HttpService,webStorage,authenticationService,rootScope,sessionManager) {

		  scope.signUpCredentials = {};
		  
		  //set the default values
		  scope.isProcessing  = false;
		  rootScope.emptySignUpCredentials  = false;
		  
		  //adding returnUrl to signUpCredentials form model returnURL.js
     	 scope.returnUrl = selfcare.models.returnURL; 
		  
		 //Success pop-up Controller definition
		  var SuccessPopupController = function($scope,$modalInstance){
  			
  			$scope.mailId = scope.signUpCredentials.userName;
  			
  			
  			$scope.reject = function(){
  				$modalInstance.close('delete');
  			};
  		};
  		
		var AlreadyExistPopupController = function($scope,$modalInstance){
		  			
		  			$scope.mailId = scope.signUpCredentials.userName;
		  			
		  			
		  			$scope.reject = function(){
		  				$modalInstance.close('delete');
		  			};
		  };
		  
		  //submit functionality
          scope.submitEmail = function(){
        	  webStorage.remove("clientTotalData");
        	  if(scope.signUpCredentials.userName){
        		  rootScope.emptySignUpCredentials  = false;
	        	  scope.isProcessing  = true;
	        	  rootScope.isRegistrationSuccess = false;
	        	  rootScope.isRegistrationFailure = false;
	        	  scope.signUpCredentials.returnUrl = scope.returnUrl+"/"+scope.signUpCredentials.userName+"/";
	        	  
	        	  authenticationService.authenticateWithUsernamePassword(scope.signUpCredentials);
	        	  
	        	  rootScope.registrationPopUp = function(registationData){
	        		  
	        		  if(registationData == "success"){
			        		  scope.isProcessing  = false;
			        		  rootScope.isRegistrationSuccess = true;
				        		 /*modal.open({
						        			 templateUrl: 'successpopup.html',
						        			 controller: SuccessPopupController,
						        			 resolve:{}
				        		 			});*/
	        		  }
	        		  else{
	        			  scope.isProcessing  = false;
	        			  rootScope.isRegistrationFailure = true;
	        			  /*modal.open({
			        			 templateUrl: 'alredyexistpopup.html',
			        			 controller: AlreadyExistPopupController,
			        			 resolve:{}
	     		 			});*/
	        		  }
	        	  };
        	  }else{
        		  rootScope.emptySignUpCredentials  = true;
        	  }
        	  
          };
          
          $('#emailId').keypress(function(e) {
              if(e.which == 13) {
                  scope.submitEmail();
              }
           });
    }
  });
  selfcare.ng.application.controller('SignUpFormController', ['$scope','RequestSender','$modal','HttpService','webStorage','AuthenticationService','$rootScope','SessionManager', selfcare.controllers.SignUpFormController]);
}(selfcare.controllers || {}));
