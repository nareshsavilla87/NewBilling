(function(selfcare_module) {
   selfcare.controllers = _.extend(selfcare_module, {
	   SelfCareMainController: function(scope, translate,webStorage,sessionManager,RequestSender,authenticationService,location,modal) {
		   
		   scope.currentSession = {};
		   scope.isSignInProcess = false;
		   scope.isRegistrationSuccess = false;
		   scope.isRegistrationFailure = false;
		   scope.emptyCredentials = false;
		   scope.isChangePassword = false;
		   scope.selfcare_userName = "";
		   
	 //authentication onSuccess this event called  
	   scope.$on("UserAuthenticationSuccessEvent", function(event, data,formData) {
		   scope.currentSession = sessionManager.get(data,formData);
	    });
	   
	  //calling this method every time if session is exit or not
	   sessionManager.restore(function(session) {
	        scope.currentSession = session;
	        scope.isRegistrationSuccess = false;
	        scope.isRegistrationFailure = false;
	        scope.signInProcessLoading = false;
	        scope.isChangePassword = false;
	        
	    });
	   
		   
       //getting languages form model Lang.js 
	   scope.langs = selfcare.models.Langs;
        scope.optlang = scope.langs[0];
        
       //set the language code when change the language 
        scope.changeLang = function (lang) {
            translate.uses(lang.code);
            scope.optlang = lang;
        };
       
       //set the default values for the sign in and sign up buttons  
        scope.signUpFormView = false;
        scope.signInFormView = true;
       
      //sign up button fun start 
      scope.signUpBtnFun = function(){
    	  
    	  scope.isChangePassword = false;
    	  scope.emptySignUpCredentials = false;
    	  scope.signUpFormView=scope.signInFormView;
    	  scope.signInFormView=!scope.signUpFormView;
    	  scope.template="selfcare_module/views/clients/signupform.html"; 
    	  scope.authenticationFailed = false;
    	  scope.emptyCredentials = false;
    	  scope.isRegistrationSuccess = false;
		   scope.isRegistrationFailure = false;
      };
      //sign up button fun end
      
      //sign In button fun start
      scope.signInBtnFun = function(){
    	  scope.signInFormView=scope.signUpFormView;
    	  scope.signUpFormView=!scope.signInFormView;
    	  scope.isRegistrationSuccess = false;
		   scope.isRegistrationFailure = false;
      };
      //sign up button fun end
      
      scope.signout = function(){
    	  scope.currentSession = sessionManager.clear();
    	  scope.signInProcessLoading = false;
    	  location.path('/').replace;
      };
      
      var ClientActivePopupController = function($scope,$modalInstance){
			
			$scope.reject = function(){
				$modalInstance.close('delete');
			};
		};
		 scope.activetedClientPopup = function(){
			 modal.open({
				 templateUrl: 'clientactivepopup.html',
				 controller: ClientActivePopupController,
				 resolve:{}
	 			});
		 };
		 
		 var ForgotPwdPopupSuccessController = function($scope,$modalInstance){
				
				$scope.done = function(){
					$modalInstance.close('delete');
				};
			};
			
		 //isActive Function 
		 scope.isActive = function (route) {
			
			 var active = route === location.path();
			 	return active;
	      };

	//forgot password popup controller
		 var ForgotPwdPopupController = function($scope,$modalInstance){
			 $scope.isProcessing = false;
			 $scope.emailData = {};
			 
			 scope.forgotPwdPopupcontrolling = function(formData){
				 
				 RequestSender.forgotPwdResource.save(formData,function(successData){
					 webStorage.remove("selfcare_sessionData");
		        	 scope.currentSession= {user :null};
		        	 $modalInstance.close('delete');
		        	 modal.open({
						 templateUrl: 'forgotpwdpopupsuccess.html',
						 controller: ForgotPwdPopupSuccessController,
						 resolve:{}
			 			});
					 
				 },function(errorData){
					 $scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
					 $scope.isProcessing = false;
					 webStorage.remove("selfcare_sessionData");
		        	 scope.currentSession= {user :null};
				 });
			 };
			 
			 $scope.accept = function(email){
				 $scope.isProcessing = true;
				 $scope.stmError = null;
				 authenticationService.authenticateWithUsernamePassword({'uniqueReference':$scope.emailData.email});
			 };
			 
			 $scope.reject = function(){
					$modalInstance.dismiss('cancel');
			 };
			 
			};
		 
		 //for forgot password popup
		 scope.forgotPwdPopup = function(){
			 scope.isChangePassword = false;
			 modal.open({
				 templateUrl: 'forgotpwdpopup.html',
				 controller: ForgotPwdPopupController,
				 resolve:{}
	 			});
		 };
		 
    }
  });
   selfcare.ng.application.controller('SelfCareMainController', ['$rootScope','$translate','webStorage','SessionManager','RequestSender','AuthenticationService','$location','$modal',selfcare.controllers.SelfCareMainController
  ]).run(function($log) {
      $log.info("SelfCareMainController initialized");
  });
}(selfcare.controllers || {}));
