EventsController = function(scope,RequestSender,localStorageService,location,paginatorService) {
		var totalVODSData =[];
		var retrivingVODSData = {};
		scope.VODSDatas = [];
		
		scope.getVODSData = function(offset, limit, callback) {
	  		retrivingVODSData.pageItems = [];
	  		var itrCount = 0;
	  		for (var i=offset;i<totalVODSData.length;i++) {
	  			itrCount += 1;
	  			retrivingVODSData.pageItems.push(totalVODSData[i]);
	  			if(itrCount==limit){
	  				break;
	  			}
	  		}
	  		callback(retrivingVODSData);
	  	};
		
		 var clientData= localStorageService.get('clientTotalData');
		  if(clientData){
			  scope.clientId = clientData.id;
			  RequestSender.eventOrderPriceTemplateResource.query({clientId:scope.clientId},function(data){
				  totalVODSData = data;
				  retrivingVODSData.totalFilteredRecords = totalVODSData.length;
				  scope.VODSDatas = paginatorService.paginate(scope.getVODSData, 4);
			  });
		  }
    };
    
selfcareApp.controller('EventsController', ['$scope',
                                            'RequestSender',
                                            'localStorageService',
                                            '$location',
                                            'PaginatorService',
                                             EventsController]);
