(function(module) {
  mifosX.controllers = _.extend(module, {
    LoginFormController: function(scope,webStorage,resourceFactory,authenticationService,$rootScope ) {
      scope.loginCredentials = {};
      scope.authenticationFailed = false;
      scope.configs = [];
     
      
      scope.login = function() {
        authenticationService.authenticateWithUsernamePassword(scope.loginCredentials);
        
      };
      $rootScope.clearCrendentials=function(){
    	  delete scope.loginCredentials.password;    
      };
      $('#pwd').keypress(function(e) {
          if(e.which == 13) {
              scope.login();
          }
        });
      scope.$on("UserAuthenticationFailureEvent", function(data) {
        scope.authenticationFailed = true;
      });
     
    }
  });
  mifosX.ng.application.controller('LoginFormController', ['$scope','webStorage','ResourceFactory', 'AuthenticationService','$rootScope', mifosX.controllers.LoginFormController]).run(function($log) {
    $log.info("LoginFormController initialized");
  });
}(mifosX.controllers || {}));
