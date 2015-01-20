ChangePasswordController = function(scope,RequestSender,rootScope,localStorageService,sessionManager) {
		 
		  scope.pwdData = {};
		  scope.formData = {};
		  scope.retype_pwd_valid = false;
		  var clientData = localStorageService.get("clientTotalData");
		  if(clientData){
			  scope.email = clientData.email;
		  }
		  
		  scope.passwordCheck = function(){
			 if(scope.pwdData.newPassword && scope.pwdData.confirmPassword){
				 if(scope.pwdData.newPassword === scope.pwdData.confirmPassword){
					 scope.retype_pwd_valid = false;
				 }
				 else{
					 scope.retype_pwd_valid = true;
				 }
			 }
		  };
		  scope.submit = function(){
			  if(scope.retype_pwd_valid == false){
				  rootScope.infoMsgs  =[];
				  scope.formData.password = scope.pwdData.newPassword;
				  scope.formData.uniqueReference = scope.email;
				  RequestSender.changePwdResource.update(scope.formData,function(data){
					  rootScope.currentSession = sessionManager.clear();
					  rootScope.infoMsgs.push({
						  						'image' : './images/info-icon.png',
						  						'names' : [{'name' : 'title.password.changed'}]
					   });
				  });
			  }
		  };
		  
    };

 selfcareApp.controller('ChangePasswordController',['$scope',
                                                    'RequestSender',
                                                    '$rootScope',
                                                    'localStorageService',
						    'SessionManager',
                                                    ChangePasswordController]);
