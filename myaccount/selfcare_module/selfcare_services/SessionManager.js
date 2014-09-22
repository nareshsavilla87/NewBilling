(function(selfcare_module) {
   selfcare.services = _.extend(selfcare_module, {
    SessionManager: function(scope,webStorage, httpService,RequestSender,location) {
      var EMPTY_SESSION = {user:null};

      this.get = function(data,formData) {
          webStorage.add("selfcare_sessionData", {userId: data.userId, authenticationKey: data.base64EncodedAuthenticationKey});
          httpService.setAuthorization(data.base64EncodedAuthenticationKey);
          if(formData.userName){
	          RequestSender.registrationResource.save(formData,function(successData){
	        	  scope.registrationPopUp("success");
	        	  webStorage.remove("selfcare_sessionData");
	        	  scope.currentSession= {user :null};
		          },function(errorData){
		        	  scope.registrationPopUp("failure");
		        	  webStorage.remove("selfcare_sessionData");
		        	  scope.currentSession= {user :null};
		          });
          }/*else if(formData.verificationKey){
        	  RequestSender.registrationResource.update(formData,function(successData) {
        		  scope.activationPopup("success");
        		  scope.currentSession= {user :'selfcare'};
	          },function(errorData){
	        	  scope.activationPopup("failure");
	        	  scope.currentSession= {user :'sefcare'};
	          });
          }*/else if(formData.username){
        	  RequestSender.loginUser.save(formData,function(successData){
        		  scope.currentSession= {user :'selfcare'};
        		  scope.authenticationFailed = false;
        		  webStorage.add("clientTotalData", successData);
        		  scope.isSignInProcess = true;
        		  scope.signInProcessLoading = false;
        		  delete scope.loginCredentials.username;
        		  delete scope.loginCredentials.password;
        		  location.path('/profile');
        	  },function(errorData){
        		  webStorage.remove("selfcare_sessionData");
        		  scope.currentSession= {user:null};
        		  scope.$broadcast("UserAuthenticationFailureEvent", data);
        	  });
          }else if(formData.uniqueReference){
        	  scope.forgotPwdPopupcontrolling(formData);
          }
        };

      this.clear = function() {
        webStorage.remove("selfcare_sessionData");
        webStorage.remove("clientData");
        webStorage.remove("clientTotalData");
        webStorage.remove('selfcareUserName');
        httpService.cancelAuthorization();
        return scope.currentSession= {user:null};
      };

        this.restore = function(handler) {
            var selfcare_sessionData = webStorage.get('selfcare_sessionData');
            if (selfcare_sessionData !== null) {
              httpService.setAuthorization(selfcare_sessionData.authenticationKey);
              RequestSender.userResource.get({userId: selfcare_sessionData.userId}, function(userData) {
            	  var clientData = webStorage.get("clientTotalData");
            	  if(clientData){
            		  scope.selfcare_userName = webStorage.get('selfcareUserName');
            		  scope.isSignInProcess = true;
            		  if(location.path()){
            			  location.path(location.path());
            		  }
            		  else{
            			  location.path('/profile');
            		  }
            	  }
                handler({user: 'selfcare'});
              });
            } else {
            	scope.isSignInProcess = false;
              handler(EMPTY_SESSION);
            }
        };
    }
  });
   selfcare.ng.services.service('SessionManager', [
	'$rootScope',
    'webStorage',
    'HttpService',
    'RequestSender',
    '$location',
    selfcare.services.SessionManager
  ]);
}(selfcare.services || {}));
