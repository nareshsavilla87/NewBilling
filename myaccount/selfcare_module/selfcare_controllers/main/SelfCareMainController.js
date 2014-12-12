(function(selfcare_module) {
   selfcare.controllers = _.extend(selfcare_module, {
	   SelfCareMainController: function(scope, translate,sessionManager,RequestSender,
			   						authenticationService,location,modal,localStorageService,tmhDynamicLocale) {
		   
		   scope.domReady = true;
		   scope.isSignInProcess = false;
		   scope.selfcare_userName = "";
		   scope.iskortaTokenAvailable = false;
		   var urlAfterHash = window.location.hash;
		   if((urlAfterHash.match('/active') == '/active')||(urlAfterHash.match('/additionalorderspreviewscreen') == '/additionalorderspreviewscreen')
			||(urlAfterHash.match('/renewalorderpreviewscreen') == '/renewalorderpreviewscreen')||(urlAfterHash.match('/eventdetailspreviewscreen') == '/eventdetailspreviewscreen')
			||(urlAfterHash.match('/kortatokenpaymentsuccess') == '/kortatokenpaymentsuccess')||(urlAfterHash.match('/kortasuccess') == '/kortasuccess')){
			   scope.isActiveScreenPage= true;
			   
		   }else{
			   scope.isActiveScreenPage= false;
		   }
		   
		   
	   //setting the date format
	   scope.setDf = function () {
		   localStorageService.get('dateformat') ? scope.df = scope.dateformat = localStorageService.get('dateformat') 
				   								 : (localStorageService.add('dateformat', 'dd MMMM yyyy'),
				   									scope.df = scope.dateformat = 'dd MMMM yyyy');
       };scope.setDf();
		   
       //getting languages form model Lang.js 
	   scope.langs = selfcare.models.Langs;
	   
	   if(localStorageService.get('Language')){
		   
		   for ( var i in scope.langs) {
			   if(scope.langs[i].code == localStorageService.get('Language')){
				   scope.optlang = scope.langs[i];
				   tmhDynamicLocale.set(scope.optlang.code);
				   translate.uses(scope.optlang.code);
				   break;
			   };
		   };
		   
	   }else{
		   scope.optlang = scope.langs[0];
	   }
	   
       //set the language code when change the language 
        scope.changeLang = function (lang) {
            localStorageService.add('Language', lang.code);
            scope.optlang = lang;
            tmhDynamicLocale.set(lang.code);
            translate.uses(lang.code);
        };
		 
		 var ForgotPwdPopupSuccessController = function($scope,$modalInstance){
				
				$scope.done = function(){
					$modalInstance.close('delete');
				};
			};
			
	//forgot password popup controller
		 var ForgotPwdPopupController = function($scope,$modalInstance){
			 
			 $scope.isProcessing = false;
			 $scope.emailData = {};
			 
			 $scope.accept = function(email){
				 
				 $scope.formData = {'uniqueReference':$scope.emailData.email};
				 authenticationService.authenticateWithUsernamePassword(function(data){
				 
					 $scope.isProcessing = true;
					 $scope.stmError = null;
					 RequestSender.forgotPwdResource.update($scope.formData,function(successData){
						 
						 $scope.isProcessing = false;
						 $modalInstance.close('delete');
						 modal.open({
							 templateUrl: 'forgotpwdpopupsuccess.html',
							 controller: ForgotPwdPopupSuccessController,
							 resolve:{}
						 });
						 
					 },function(errorData){
						 $scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
						 $scope.isProcessing = false;
					 });
					 
				 });
			};
			
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		 };
		 
		 //for forgot password popup
		 scope.forgotPwdPopup = function(){
			 modal.open({
				 templateUrl: 'forgotpwdpopup.html',
				 controller: ForgotPwdPopupController,
				 resolve:{}
	 			});
		 };
		 
		//isActive Function 
		 scope.isActive = function (route) {
			
			 var active = route === location.path();
			 	return active;
	      };
		 
		//calling this method every time if session is exit or not
		   sessionManager.restore(function(session) {
		        scope.currentSession = session;
		    });
		   
		   scope.signout = function(){
		    	  scope.currentSession = sessionManager.clear();
		    	  location.path('/').replace;
		      };
		 
    }
  });
   selfcare.ng.application.controller('SelfCareMainController', [
                                                                 '$rootScope',
                                                                 '$translate',
                                                                 'SessionManager',
                                                                 'RequestSender',
                                                                 'AuthenticationService',
                                                                 '$location',
                                                                 '$modal',
                                                                 'localStorageService',
                                                                 'tmhDynamicLocale',
                                                                 selfcare.controllers.SelfCareMainController
  ]).run(function($log) {
  });
}(selfcare.controllers || {}));
