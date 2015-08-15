StatementsController = function(scope,RequestSender,location,API_VERSION,paginatorService,rootScope,filter,localStorageService) {
		  
		  
		  scope.getStatementsData = function(offset, limit, callback) {
			  RequestSender.statementResource.get({clientId: scope.clientId ,offset: offset, limit: limit} , function(data){
				  
				  angular.forEach(data.pageItems,function(val,key){
					  data.pageItems[key].billDate = filter('DateFormat')(val.billDate);
					  data.pageItems[key].dueDate = filter('DateFormat')(val.dueDate);
				  });
				  
				  callback(data);
			  });
	  	   };
		  
		  scope.getPaymentsData = function(offset, limit, callback) {
			  RequestSender.paymentsResource.get({clientId: scope.clientId ,offset: offset, limit: limit,type:'PAYMENT'} , function(data){
				  
				  angular.forEach(data.pageItems,function(val,key){
					  data.pageItems[key].transDate = filter('DateFormat')(val.transDate);
				  });
				  
				  callback(data);
			  });
	  	   };
	  		
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
                  
				  scope.statementsData = [];
				  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 4);
				  
				  scope.paymentsData = [];
        	  	  scope.paymentsData = paginatorService.paginate(scope.getPaymentsData, 4);
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
	       
	       scope.fetchSearchPayments = function(offset, limit, callback) {
				  
	    	   RequestSender.paymentsResource.get({clientId: scope.clientId ,offset: offset, limit: limit,type:'PAYMENT',sqlSearch: scope.filterText1} , function(data){
					  
					  angular.forEach(data.pageItems,function(val,key){
						  data.pageItems[key].transDate = filter('DateFormat')(val.transDate);
					  });
					  
					  callback(data);
				  });
		      };
		       
		       scope.searchPayments = function() {
		    	   scope.paymentsData = [];
		    	   scope.paymentsData = paginatorService.paginate(scope.fetchSearchPayments, 4);
		       };
		       
		    $('#searchStatements').keypress(function(e) {
			          if(e.which == 13) {
			              scope.searchStatements();
			          }
			 });
		    $('#searchPayments').keypress(function(e) {
		    	if(e.which == 13) {
		    		scope.searchPayments();
		    	}
		    });
		    
		  scope.routeTostatement = function(statementid){
	             location.path('/viewstatement/'+statementid);
	      };
	      scope.downloadFile = function (statementId){
	           window.open(API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+selfcareModels.tenantId);
	      };
	      scope.payment = function(amount){
	    	  localStorageService.add("statementsPayData",["invoicingPay",amount]);
	    	location.path('/prepaidpayment');  
	      };
          
    };
    
selfcareApp.controller('StatementsController', ['$scope',
                                                'RequestSender',
                                                '$location',
                                                'API_VERSION', 
                                                'PaginatorService', 
                                                '$rootScope', 
                                                '$filter', 
                                                'localStorageService', 
                                                StatementsController]);
