(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssignedTicketController: function(scope,webStorage, routeParams, location,$modal, resourceFactory, paginatorService,PermissionService) {
       
		scope.openTickets = [];
        
        scope.routeToticket = function(id){
        	if(PermissionService.showMenu('READ_CLIENT'))
        		location.path('/viewclient/'+id);
        	webStorage.add("callingTab", {someString: "Tickets" });
        };
        
        scope.tabActive = function(){
      	   webStorage.add("callingTab", {someString: "Tickets" });
         };
        
        /**
         * functions
         * */
        scope.getOpenTickets = function () {
        	
    		scope.openTickets = paginatorService.paginate(scope.openTicketFetchFunction, 14);
        };
    
        scope.getclosedTickets = function () {
        
        	scope.openTickets = paginatorService.paginate(scope.closedTicketFetchFunction, 14);
        };
    
        scope.getWorkingTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.workingTicketFetchFunction, 14);
        };
      
        scope.getOverDueTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.overDueTicketFetchFunction, 14);
        };
        
        scope.getAssignedTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.assignedTicketFetchFunction, 14);
        };
        
        
        /**
         * change query parameters here
         * statusType: 'Your Status type' do here if any changes needed to status type
         * */
        
        scope.openTicketFetchFunction = function(offset, limit, callback) {
        	
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OPEN'} , callback);
		};
		
		scope.closedTicketFetchFunction = function(offset, limit, callback) {
			
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'CLOSED'} , callback);
		};
		
		scope.workingTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'WORKING'} , callback);
		};
		
		scope.overDueTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OVERDUE'} , callback);
		};
		
		scope.assignedTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'ASSIGNED'} , callback);
		};
		
		
		/**
		 * search function
		 * */
		scope.searchTickets = function(filterText) {
	  			scope.openTickets = paginatorService.paginate(scope.searchTickets123, 14);
	    };
        scope.searchTickets123 = function(offset, limit, callback) {
	    	  resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	    };
	    
    }
  });
  mifosX.ng.application.controller('AssignedTicketController', ['$scope','webStorage', '$routeParams', '$location','$modal', 'ResourceFactory','PaginatorService','PermissionService', mifosX.controllers.AssignedTicketController]).run(function($log) {
    $log.info("AssignedTicketController initialized");
  });
}(mifosX.controllers || {}));


	
