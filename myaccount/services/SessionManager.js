selfcareApp.service("SessionManager",['$rootScope','webStorage','HttpService','RequestSender','$location','localStorageService',
                                      			function(scope,webStorage, httpService,RequestSender,location,localStorageService){
	
      var EMPTY_SESSION = {user:null};

      this.clear = function() {
    	localStorageService.remove("selfcare_sessionData");
        webStorage.remove("clientTotalData");
        webStorage.remove('selfcareUserName');
        webStorage.remove('selfcareUserData');
        localStorageService.remove('localLang');
        localStorageService.remove('selfcareAppUrl');
        httpService.cancelAuthorization();
        scope.isLandingPage= false;
		location.path('/').replace();
        return scope.currentSession= {user:null};
      };

        this.restore = function(handler) {
            var selfcare_sessionData = localStorageService.get('selfcare_sessionData');
            if (selfcare_sessionData !== null) {
              httpService.setAuthorization(selfcare_sessionData.authenticationKey);
              RequestSender.userResource.get({userId: selfcare_sessionData.userId}, function(userData) {
            	  var clientData = webStorage.get("clientTotalData");
            	  if(clientData){
            		  scope.selfcare_userName = webStorage.get('selfcareUserName');
            		  if(location.path() == "/")location.path('/profile');
            		  else if(location.path())location.path(location.path());
            		  else location.path('/profile');
            	  }
                handler({user: 'selfcare'});
              });
            } else {
              handler(EMPTY_SESSION);
            }
        };
}]);