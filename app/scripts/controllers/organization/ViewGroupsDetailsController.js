(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewGroupsDetailsController: function(scope, resourceFactory,$modal,route,PaginatorService,location,routeParams) {
		scope.groupDetails  = [];
		
		scope.group=routeParams.groupName;
		
		 	scope.search123 = function(offset, limit, callback) {
	          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText,groupName: routeParams.groupName} , callback); 
	         };
	       
	       scope.search = function(filterText) {
	        scope.groupDetails = PaginatorService.paginate(scope.search123, 14);
	       };
	  		
	  		scope.routeTo = function(id){
	             location.path('/viewclient/'+ id);
	        };
	        
		scope.groupDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.clientResource.getAllClients({offset: offset, limit: limit,groupName: routeParams.groupName} , callback);
		};
		
		scope.groupDetails =PaginatorService.paginate(scope.groupDetailsFetchFunction, 14);
		  
	  }
  });
  mifosX.ng.application.controller('ViewGroupsDetailsController', [
                                                                   '$scope', 
                                                                   'ResourceFactory',
                                                                   '$modal',
                                                                   '$route',
                                                                   'PaginatorService',
                                                                   '$location',
                                                                   '$routeParams',
                                                                   mifosX.controllers.ViewGroupsDetailsController]).run(function($log) {
                                                                	   
    $log.info("ViewGroupsDetailsController initialized");
  });
}(mifosX.controllers || {}));