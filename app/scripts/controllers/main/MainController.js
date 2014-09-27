(function(module) {
  mifosX.controllers = _.extend(module, {
    MainController: function(scope, location, sessionManager, translate,keyboardManager,$rootScope,webStorage,PermissionService,localStorageService,$idle,resourceFactory,tmhDynamicLocale) {
      
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
      
      scope.$on("UserAuthenticationSuccessEvent", function(event, data) {
    	  
    	localStorageService.add("permissionsArray",data.permissions);
        scope.currentSession = sessionManager.get(data);

        scope.start(scope.currentSession);
        if(PermissionService.showMenu('REPORTING_SUPER_USER'))
        location.path('/home').replace();
        scope.unreadMessage=data.unReadMessages;
      });
     
      scope.goBack = function(){
    	  window.history.go(-1);
      };
      
      scope.search = function(){
          location.path('/search/' + scope.search.query );
      };
      
      scope.logout = function() {
        var sessionData = webStorage.get('sessionData');
        resourceFactory.logoutResource.save({logout:'logout',id:sessionData.loginHistoryId},function(data){
                	location.path('/').replace();
                });
        scope.currentSession = sessionManager.clear();
        scope.clearCrendentials();
        
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
              }
          }
      } else {	
    	  $rootScope.optlang = scope.langs[0];
          $rootScope.locale=scope.langs[0];
          tmhDynamicLocale.set(scope.langs[0].code);
      }
      translate.uses($rootScope.optlang.code);

      
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
    }
  });
  mifosX.ng.application.controller('MainController', [
    '$scope',
    '$location',
    'SessionManager',
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
