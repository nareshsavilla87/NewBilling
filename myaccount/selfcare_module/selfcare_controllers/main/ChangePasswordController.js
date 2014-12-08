(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ChangePasswordController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		 
		  //getting main page url from returnURL.js file
		  var selfcareMainPageURL = selfcare.models.selfcareMainPageURL;
		  
		  scope.pwdData = {};
		  scope.formData = {};
		  scope.retype_pwd_valid = false;
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  scope.email = clientDatas.clientData.email;
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
					  rootScope.isChangePassword = true;
					  rootScope.currentSession = sessionManager.clear();
					  rootScope.infoMsgs.push({
						  						'image' : 'info-icon.png',
						  						'names' : [{'name' : 'title.password.changed'}]
					   });
					  location.replace(selfcareMainPageURL);
				  });
			  }
		  };
		  
    }
  });
  selfcare.ng.application.controller('ChangePasswordController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.ChangePasswordController]).run(function($log) {
      $log.info("ChangePasswordController initialized");
  });
}(selfcare.controllers || {}));
