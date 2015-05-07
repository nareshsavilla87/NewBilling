	  SignInFormController = function(scope,webStorage,localStorageService,RequestSender,authenticationService,rootScope,location,localStorageService,SessionManager) {
		  
		  scope.loginCredentials = {};
		  scope.isProcessing  = false;
	      
	      scope.login = function() {
	    	  
	    	  rootScope.signupErrorMsgs = [];rootScope.loginErrorMsgs = [];rootScope.infoMsgs = [];
	    	  
	    	  if(scope.loginCredentials.username && scope.loginCredentials.password){
	    		  
	    		  authenticationService.authenticateWithUsernamePassword(function(data){
	    			  
	    			  scope.isProcessing = true;
	    			  RequestSender.loginUser.save(scope.loginCredentials,function(successData){
	    				  localStorageService.add("selfcare_sessionData", {clientId: successData.clientId, userId : data.userId,
	    					  												authenticationKey: data.base64EncodedAuthenticationKey});
	    				  rootScope.currentSession= {user :successData.clientData.displayName||"abc"};
	    				  scope.loginCredentials = {};rootScope.signUpCredentials = {};
	            		  rootScope.signupErrorMsgs  =[];rootScope.loginErrorMsgs  =[];rootScope.infoMsgs  =[];
	        	    	  scope.isProcessing  = false;
	        	    	  rootScope.isRegClientProcess = false;
	        	    	  //adding web tv url
	        	    	  rootScope.webtvURL = selfcareModels.webtvURL+"?id="+successData.clientId;
	        			  localStorageService.add("selfcareAppUrl",selfcareModels.selfcareAppUrl);
	        			  localStorageService.add("loginHistoryId", successData.loginHistoryId);
	            		  location.path('/profile');
	            	  },function(errorData){
	            		  //rootScope.loginErrorMsgs.push({'name' : 'error.login.failed'});
	            		  if(errorData.data.userMessageGlobalisationCode == "error.msg.not.authenticated"){
		            	  		rootScope.loginErrorMsgs.push({'name' : 'error.login.failed'});
		            	  	  }else{
		            	  		rootScope.loginErrorMsgs.push({'name' : errorData.data.errors[0].userMessageGlobalisationCode});
		            	  	  }
	            		  scope.isProcessing = false;
	            	  });
	    		  });
	    	  }else {
	    		  rootScope.loginErrorMsgs.push({'name' : 'title.fill.alldetails'});
	    	  }
	        
	      };
	      
	      $('#pwd').keypress(function(e) {
	          if(e.which == 13) {
	              scope.login();
	          }
	        });
	      
		  
    };
  selfcareApp.controller('SignInFormController', [ '$scope',
                                                   'webStorage',
                                                   'localStorageService',
                                                   'RequestSender',
                                                   'AuthenticationService',
                                                   '$rootScope', 
                                                   '$location', 
                                                   'localStorageService', 
                                                   'SessionManager', 
                                                   SignInFormController]);
