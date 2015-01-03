TicketsController = function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.ticketsData = [];
		  var ticketsData= webStorage.get('clientTotalData');
		  if(ticketsData){
			  scope.clientId = ticketsData.clientId;
			  scope.ticketsData = ticketsData.ticketMastersData;
			  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
				  scope.ticketsData = data;
			  });
		  }
    };
    
selfcareApp.controller('TicketsController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             '$http',
                                             'AuthenticationService',
                                             'webStorage',
                                             'HttpService',
                                             'SessionManager',
                                             '$location',
                                             '$routeParams',
                                             TicketsController]);
