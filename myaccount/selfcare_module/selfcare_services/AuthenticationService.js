(function(selfcare_module) {
   selfcare.services = _.extend(selfcare_module, {
    AuthenticationService: function(scope, httpService,webStorage) {
    	
    	scope.singUpFormData= {};
    //authentication success function
    	var onSuccess = function(data){
    			scope.$broadcast("UserAuthenticationSuccessEvent", data,scope.singUpFormData);
    			webStorage.add("userData",data);
    			console.log("success");
    	};
    	var onFailure = function(data){
    	
    		console.log("failure");
    	};
    	
      var apiVer = '/obsplatform/api/v1';
    
      this.authenticateWithUsernamePassword = function(formData) {
    	  scope.singUpFormData = formData;
	        httpService.post(apiVer + "/authentication?username="+selfcare.models.obs_username+"&password="+selfcare.models.obs_password)
	          .success(onSuccess)
	          .error(onFailure);
      };
    }
  });
   selfcare.ng.services.service('AuthenticationService', ['$rootScope', 'HttpService','webStorage', selfcare.services.AuthenticationService]);
}(selfcare.services || {}));


