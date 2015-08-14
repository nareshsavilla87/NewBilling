ProfileController = function(scope,RequestSender,rootScope,location,paginatorService,localStorageService, API_VERSION,sessionManager,filter) {
		  
	  	 scope.getStatementsData = function(offset, limit, callback) {
			  RequestSender.statementResource.get({clientId: scope.clientId ,offset: offset, limit: limit} , function(data){
				  
				  angular.forEach(data.pageItems,function(val,key){
					  data.pageItems[key].billDate = filter('DateFormat')(val.billDate);
					  data.pageItems[key].dueDate = filter('DateFormat')(val.dueDate);
				  });
				  
				  callback(data);
			  });
	  	   };
		 if(rootScope.selfcare_sessionData){		  
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  sessionManager.configurationFun(function(data){
				  scope.clientData = data;
				  if(data.selfcare){
					  data.selfcare.token ? rootScope.iskortaTokenAvailable = true : rootScope.iskortaTokenAvailable = false;
					  !data.selfcare.authPin ? scope.clientData.selfcare.authPin = 'Not Available':null;
				  }
				  rootScope.selfcare_userName = data.displayName;
				  
				  scope.statementsData = [];
        	  	  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 2);
				  
				  if(rootScope.isConfigPassport){
					  RequestSender.clientIdentifiersResource.query({clientId:scope.clientId},function(identifiersdata){
						  angular.forEach(identifiersdata,function(val,key){
							  if(angular.lowercase(val.documentType['name']) == selfcareModels.isPassport){
								  scope.passport = val.documentKey;
							  }
						  });
					  });
				  }
				
			  });
		  }
		 
		 scope.fetchSearchStatements = function(offset, limit, callback) {
			  
	          RequestSender.statementResource.get({clientId: scope.clientId ,offset: offset, limit: limit,sqlSearch: scope.filterText} , function(data){
				  
				  angular.forEach(data.pageItems,function(val,key){
					  data.pageItems[key].billDate = filter('DateFormat')(val.billDate);
					  data.pageItems[key].dueDate = filter('DateFormat')(val.dueDate);
				  });
				  
				  callback(data);
			  });
	      };
	       
	       scope.searchStatements = function() {
	    	   scope.statementsData = [];
	    	   scope.statementsData = paginatorService.paginate(scope.fetchSearchStatements, 4);
	       };
	       
	       $('#searchStatements').keypress(function(e) {
		          if(e.which == 13) {
		              scope.searchStatements();
		          }
		 });
		 
	      scope.onlinePayment = function(){
	    	  localStorageService.remove("statementsPayData");
	    	  location.path('/prepaidpayment');
	      };
	       
		  scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+selfcareModels.tenantId);
	      };
	      scope.payment = function(amount){
	    	  localStorageService.add("statementsPayData",["invoicingPay",amount]);
	    	location.path('/prepaidpayment');  
	      };
		
    };
    
selfcareApp.controller('ProfileController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             '$location',
                                             'PaginatorService', 
                                             'localStorageService', 
                                             'API_VERSION', 
                                             'SessionManager', 
                                             '$filter', 
                                             ProfileController]);



//not used code
/*scope.getStatementsData123 = function(offset, limit, callback) {
	  
	  retrivingStatementsData.pageItems = [];
	  var itrCount = 0;
	  for (var i=offset;i<totalStatementsData.length;i++) {
		 itrCount += 1;
		 retrivingStatementsData.pageItems.push(totalStatementsData[i]);
		 if(itrCount==limit){
			 break;
		 }
    }
	  angular.forEach(retrivingStatementsData.pageItems,function(val,key){
		  retrivingStatementsData.pageItems[key].billDate = filter('DateFormat')(val.billDate);
		  retrivingStatementsData.pageItems[key].dueDate = filter('DateFormat')(val.dueDate);
	  });
	  callback(retrivingStatementsData);
   };*/
