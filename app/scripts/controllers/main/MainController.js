(function(module) {
  mifosX.controllers = _.extend(module, {
    MainController: function(scope, location, sessionManager,$modal, translate,keyboardManager,$rootScope,webStorage,PermissionService,localStorageService,$idle,resourceFactory,tmhDynamicLocale) {
      
    	/**
    	 * Logout the user if Idle
    	 * */
    	scope.domReady = true;
        scope.started = false;
        scope.$on('$idleTimeout', function () {
            scope.logout();
            $idle.unwatch();
            scope.started = false;
        });
       
        scope.start = function (session) {
            if (session) {
                $idle.watch();
                scope.started = true;
            }
        };
          
      scope.leftnav = false;
      
      var activity = {};
      var activityQueue = [];
      if (localStorageService.get('Location')) {
          var activityQueue = localStorageService.get('Location');
      }
      
      scope.$watch(function () {
          return location.path();
      }, function () {
          activity = location.path();
          activityQueue.push(activity);
          localStorageService.add('Location', activityQueue);
      });
      
      //adding account no and name to an recentClientarray
 	 var recentClient = {};
 	 var recentClientArray = [];
 	 if (localStorageService.get('recentClients')) {
 		 recentClientArray = localStorageService.get('recentClients');
      }
      scope.$watch(function () {
    	  var val = scope.clientAccountNo+""+scope.clientDisplayName;
          return val;
      }, function () {
    	  if(scope.clientAccountNo){
      		recentClient = {"accountNo":scope.clientAccountNo,"displayName" : scope.clientDisplayName};
      		recentClientArray.push(recentClient);
      		localStorageService.add('recentClients', recentClientArray);
    	  }
      });
      
    //adding account no and name to an recentClientarray
  	 var recentClient = {};
  	 var recentClientArray = [];
  	 if (localStorageService.get('recentClients')) {
  		 recentClientArray = localStorageService.get('recentClients');
       }
       scope.$watch(function () {
     	  var val = scope.clientAccountNo+""+scope.clientDisplayName;
           return val;
       }, function () {
     	  if(scope.clientAccountNo){
       		recentClient = {"accountNo":scope.clientAccountNo,"displayName" : scope.clientDisplayName};
       		recentClientArray.push(recentClient);
       		localStorageService.add('recentClients', recentClientArray);
     	  }
       });
      
      scope.$on("UserAuthenticationSuccessEvent", function(event, data) {
    	  
    	localStorageService.add("permissionsArray",data.permissions);
        scope.currentSession = sessionManager.get(data);

        scope.start(scope.currentSession);
        
        if(PermissionService.showMenu('REPORTING_SUPER_USER')){
            if(window.location.href.split("#")[1]=="/"){
             
            	location.path('/home').replace();
            }
        }
        scope.unreadMessage=data.unReadMessages;
      });
     
      scope.goBack = function(){
    	  window.history.go(-1);
      };
      
      scope.search = function(){
          location.path('/search/' + scope.search.query );
      };
      
      scope.updateLicense = function(){
    	  scope.errorStatus=[];scope.errorDetails=[];
    	  $modal.open({
    		  templateUrl: 'licensekey.html',
    		  controller: UpdateLicenseKeyController,
    		  resolve:{}
    	  });
      };
      
      var UpdateLicenseKeyController =function ($scope, $modalInstance) {
    	  $scope.subscriptiondatas = [];
    	  $scope.formData = {};
    	  
    		  resourceFactory.KeyInfoResource.get(function(data) {
    			  var keyInfoArray = [];
    			  angular.copy(data, keyInfoArray);
    			  $scope.kayinfo = keyInfoArray.join("");
    			 
    			  
    		  });
    	  $scope.updateKey = function(){
    		  $scope.flagOrderRenewal=true;
    		  var aa = {'key': $scope.formData.key};
    		  console.log(aa);
    		  
    		  resourceFactory.LicenseResource.save(aa,function(data){
    	             
    	            $modalInstance.close('delete');
    	            
    	        },function(renewalErrorData){
    	      	  $scope.flagOrderRenewal=false;
    	        	//$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
    	        });
    	  };
    	  $scope.cancelRenewal = function(){
    		  $modalInstance.dismiss('cancel');
    	  };
      };
      
      scope.logout = function() {
        var sessionData = webStorage.get('sessionData');
        resourceFactory.logoutResource.save({logout:'logout',id:sessionData.loginHistoryId},function(data){
                	location.path('/').replace();
                });
        scope.currentSession = sessionManager.clear();
        scope.clearCrendentials();
        scope.clearImage();
        
      };

      scope.PermissionService=PermissionService;
      /**
       * user specific locale by changing language
       * we will add 'Language' to localStorageService when user changed language only
       * otherwise its going to else condition(Incase user didn't change anything)
       * default is English 
       * */
      scope.langs = mifosX.models.Langs;
      if (localStorageService.get('Language')) {
          var temp = localStorageService.get('Language');
          for (var i in mifosX.models.Langs) {
              if (mifosX.models.Langs[i].code == temp.code) {
            	  $rootScope.optlang = mifosX.models.Langs[i];
            	  $rootScope.locale=mifosX.models.Langs[i];
                  tmhDynamicLocale.set(mifosX.models.Langs[i].code);
                  translate.uses($rootScope.optlang.code);
              }
          }
      } else {	
    	  $rootScope.optlang = scope.langs[0];
          $rootScope.locale=scope.langs[0];
          tmhDynamicLocale.set(scope.langs[0].code);
      }

      
      scope.isActive = function (route) {
          if(route == 'clients'){
              var temp = ['/clients','/groups','/centers'];
              for(var i in temp){
                  if(temp[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'acc'){
              var temp1 = ['/accounting','/freqposting','/accounting_coa','/journalentry','/accounts_closure','/Searchtransaction','/accounting_rules'];
              for(var i in temp1){
                  if(temp1[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'rep'){
              var temp2 = ['/reports/all','/reports/clients','/reports/loans','/reports/funds','/reports/accounting'];
              for(var i in temp2){
                  if(temp2[i]==location.path()){
                      return true;
                  }
              }
          }
          else if(route == 'admin'){
              var temp3 = ['/users/','/organization','/system','/products','/global'];
              for(var i in temp3){
                  if(temp3[i]==location.path()){
                      return true;
                  }
              }
          }
          else
          {
          var active = route === location.path();
          return active;
          }
      };

      keyboardManager.bind('ctrl+shift+c', function() {
          location.path('/createclient');
      });
      
      keyboardManager.bind('ctrl+shift+n', function() {
          location.path('/nav/offices');
      });
      
      keyboardManager.bind('ctrl+shift+r', function() {
          location.path('/reports/all');
      });
      
      keyboardManager.bind('ctrl+shift+u', function() {
          location.path('/importing');
      });
      
      keyboardManager.bind('alt+f', function() {
          location.path('/smartSearch');
      });
      
      keyboardManager.bind('ctrl+s', function() {
          document.getElementById('submit').click();
      });
      
      keyboardManager.bind('ctrl+r', function() {
          document.getElementById('run').click();
      });
      keyboardManager.bind('ctrl+shift+x', function() {
          document.getElementById('cancel').click();
      });
      keyboardManager.bind('ctrl+shift+p', function() {
    	  location.path('/createPlan');
      });
      keyboardManager.bind('ctrl+shift+s', function() {
    	  location.path('/createservice');
      });
      keyboardManager.bind('ctrl+shift+l', function() {
          document.getElementById('logout').click();
      });
      keyboardManager.bind('alt+x', function() {
          document.getElementById('search').focus();
      });
      
      keyboardManager.bind('alt+n', function() {
    	  location.path('/inventory');
      });
      
      keyboardManager.bind('ctrl+n', function() {
          document.getElementById('next').click();
      });
      keyboardManager.bind('ctrl+p', function() {
          document.getElementById('prev').click();
      });
      
      /**
       * This is for changing language
       * */
      scope.changeLang = function (lang) {
          translate.uses(lang.code);
          $rootScope.optlang = lang;
          $rootScope.locale=lang;
          localStorageService.add('Language', lang);
          tmhDynamicLocale.set(lang.code); 
      };

      sessionManager.restore(function(session) {
        scope.currentSession = session;
        scope.start(scope.currentSession);
      });
      
      scope.changePwd = function () {
          $modal.open({
              templateUrl: 'changepassword.html',
              controller: changepasswordCtrl
              
          });
      };
      
      function changepasswordCtrl($scope, $modalInstance) {
    	  $scope.formData = {};
    	  var sessionData = webStorage.get('sessionData') || "";
    	  var userId	= sessionData.userId;
          $scope.submit = function (staffId) {
              resourceFactory.userListResource.update({'userId': userId},$scope.formData,function(data){
            	  $modalInstance.close('delete');
              });
          };
          $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
          };
      };
    }
  });
  mifosX.ng.application.controller('MainController', [
    '$scope',
    '$location',
    'SessionManager',
    '$modal',
    '$translate',
    'keyboardManager',
    '$rootScope',
    'webStorage',
    'PermissionService',
    'localStorageService',
    '$idle',
    'ResourceFactory',
    'tmhDynamicLocale',
    mifosX.controllers.MainController
  ]);
}(mifosX.controllers || {}));
