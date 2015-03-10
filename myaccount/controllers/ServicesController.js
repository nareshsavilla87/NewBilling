ServicesController = function(scope,RequestSender,localStorageService,location,paginatorService) {
		  
		  var totalOrdersData =[];
		  var retrivingOrdersData = {};
		  scope.ordersData = [];
		  
		  var totalVODSData =[];
		  var retrivingVODSData = {};
		  scope.VODSDatas = [];
		  
		  	scope.getOrdersData = function(offset, limit, callback) {
			  retrivingOrdersData.pageItems = [];
				  var itrCount = 0;
				  for (var i=offset;i<totalOrdersData.length;i++) {
					 itrCount += 1;
					 retrivingOrdersData.pageItems.push(totalOrdersData[i]);
					 if(itrCount==limit){
						 break;
					 }
			      }
				  callback(retrivingOrdersData);
		  	};
		  	
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
			  
			  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
				  totalOrdersData = data.clientOrders;
				  retrivingOrdersData.totalFilteredRecords = totalOrdersData.length;
				  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 4);
				  
				  RequestSender.eventOrderPriceTemplateResource.query({clientId:scope.clientId},function(data){
					  totalVODSData = data;
					  retrivingVODSData.totalFilteredRecords = totalVODSData.length;
					  scope.VODSDatas = paginatorService.paginate(scope.getVODSData, 4);
				  });
			  });
		  }
		  
		  scope.routeToOrderView = function(orderid){
	             location.path('/vieworder/'+orderid+'/'+scope.clientId);
	       };
    };

selfcareApp.controller('ServicesController', ['$scope',
                                              'RequestSender',
                                              'localStorageService',
                                              '$location',
                                              'PaginatorService',
                                              ServicesController]);
