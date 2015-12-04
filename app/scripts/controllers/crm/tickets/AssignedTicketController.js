(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssignedTicketController: function(scope,webStorage, routeParams, location,$modal, resourceFactory, paginatorService,PermissionService,dateFilter) {
		
		scope.openTickets = [];
		scope.allDatas = [];
		scope.pageNo = 1;
		scope.totalPages = 1;
        scope.routeToticket = function(id,ticketid){
        	
        	if(PermissionService.showMenu('READ_TICKET'))
        		location.path('/editTicket/'+id+'/'+ticketid);
        	webStorage.add("callingTab", {someString: "Tickets" });
        };
        
        scope.tabActive = function(){
      	   webStorage.add("callingTab", {someString: "Tickets" });
         };
        
        /**
         * functions
         * */
         scope.getAllTickets = function () {
         	
     		scope.openTickets = paginatorService.paginate(scope.allTicketFetchFunction, 14);
         };
         scope.getOpenTickets = function () {
        	
    		scope.openTickets = paginatorService.paginate(scope.openTicketFetchFunction, 14);
        };
        
        scope.getFixedTickets = function () {
        	
    		scope.openTickets = paginatorService.paginate(scope.fixedTicketFetchFunction, 14);
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
        
        scope.allTicketFetchFunction = function(offset, limit, callback) {
        	
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
		};
        scope.openTicketFetchFunction = function(offset, limit, callback) {
        	
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OPEN'} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
		};
		
        scope.workingTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'WORKING'} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
		};
		
        scope.testingTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'TESTING'} , callback);
		};
		
        scope.fixedTicketFetchFunction = function(offset, limit, callback) {
        	
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'FIXED'} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
		};
		
		scope.closedTicketFetchFunction = function(offset, limit, callback) {
			
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'CLOSED'} , function(data){
					scope.totalTickets = data.totalFilteredRecords;
					for(var k in data.pageItems){
						data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
					}
		        	scope.allDatas = data.pageItems;
		     		if(scope.totalTickets%15 == 0)	
		        		scope.totalPages = scope.totalTickets/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
		     		callback(data);
				});
		};
		
		
		scope.overDueTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OVERDUE'} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
		};
		
		scope.assignedTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'ASSIGNED'} , function(data){
				scope.totalTickets = data.totalFilteredRecords;
				for(var k in data.pageItems){
					data.pageItems[k].ticketDate = dateFilter(new Date(data.pageItems[k].ticketDate),'dd/MM/yy');
				}
	        	scope.allDatas = data.pageItems;
	     		if(scope.totalTickets%15 == 0)	
	        		scope.totalPages = scope.totalTickets/15;
	        	else
	        		scope.totalPages = Math.floor(scope.totalTickets/15)+1;
	     		callback(data);
			});
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
  mifosX.ng.application.controller('AssignedTicketController', ['$scope','webStorage', '$routeParams', '$location','$modal', 'ResourceFactory','PaginatorService','PermissionService','dateFilter', mifosX.controllers.AssignedTicketController]).run(function($log) {
    $log.info("AssignedTicketController initialized");
  });
}(mifosX.controllers || {}));


	
