(function(module) {
  mifosX.controllers = _.extend(module, {
	  TicketController: function(scope, resourceFactory,routeParams,location) {
	        scope.tickets = [];
	        
	        scope.routeTo = function(clientId,ticketId){
	        		location.path('/viewTicket/'+clientId+'/'+ticketId);
	        };
	        resourceFactory.ticketResource.getAll({clientId: routeParams.id},function(data) {	        
	            scope.tickets = data;
	            scope.clientId= routeParams.id;	  
	        });
	    }
  });
  mifosX.ng.application.controller('TicketController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.TicketController]).run(function($log) {
    $log.info("TicketController initialized");
  });
}(mifosX.controllers || {}));