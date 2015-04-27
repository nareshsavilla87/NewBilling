TicketsController = function(scope,RequestSender,localStorageService) {
		  
		 var clientData= localStorageService.get('clientTotalData');
		  if(clientData){
			  scope.clientId = clientData.id;
			  scope.ticketsData = [];
			  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
				  scope.ticketsData = data;
			  });
		  }
    };
    
selfcareApp.controller('TicketsController', ['$scope',
                                             'RequestSender',
                                             'localStorageService',
                                             TicketsController]);
