(function(selfcare_module) {
   selfcare.services = _.extend(selfcare_module, {
    SessionManager: function(scope,webStorage, httpService,RequestSender,location) {
      var EMPTY_SESSION = {user:null};

      this.clear = function() {
        webStorage.remove("selfcare_sessionData");
        webStorage.remove("clientTotalData");
        webStorage.remove('selfcareUserName');
        webStorage.remove('selfcareUserData');
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
  ]).run(function($log) {
    $log.info("SessionManager initialized");
  });
}(selfcare.services || {}));
