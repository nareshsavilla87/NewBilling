(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ServicesController: function(scope,RequestSender,webStorage,location,paginatorService) {
		  
		  scope.totalOrdersData =[];
		  scope.retrivingOrdersData = {};
		  scope.ordersData = [];
		  
		  scope.totalVODSData =[];
		  scope.retrivingVODSData = {};
		  scope.VODSDatas = [];
		  
		  var clientTotalData= webStorage.get('clientTotalData');
		  
		  	scope.getOrdersData = function(offset, limit, callback) {
			  scope.retrivingOrdersData.pageItems = [];
				  var itrCount = 0;
				  for (var i=offset;i<scope.totalOrdersData.length;i++) {
					 itrCount += 1;
					 scope.retrivingOrdersData.pageItems.push(scope.totalOrdersData[i]);
					 if(itrCount==limit){
						 break;
					 }
			      }
				  callback(scope.retrivingOrdersData);
		  	};
		  	
		  	scope.getVODSData = function(offset, limit, callback) {
		  		scope.retrivingVODSData.pageItems = [];
		  		var itrCount = 0;
		  		for (var i=offset;i<scope.totalVODSData.length;i++) {
		  			itrCount += 1;
		  			scope.retrivingVODSData.pageItems.push(scope.totalVODSData[i]);
		  			if(itrCount==limit){
		  				break;
		  			}
		  		}
		  		callback(scope.retrivingVODSData);
		  	};
	  	   
		  if(clientTotalData){
			  
			  RequestSender.getOrderResource.get({clientId:clientTotalData.clientId},function(data){
				  scope.totalOrdersData = data.clientOrders;
				  scope.retrivingOrdersData.totalFilteredRecords = scope.totalOrdersData.length;
				  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 4);
				  
				  RequestSender.eventOrderPriceTemplateResource.query({clientId:clientTotalData.clientId},function(data){
					  scope.totalVODSData = data;
					  scope.retrivingVODSData.totalFilteredRecords = scope.totalVODSData.length;
					  scope.VODSDatas = paginatorService.paginate(scope.getVODSData, 4);
				  });
			  });
		  }
		  
		  scope.routeToOrderView = function(orderid){
	             location.path('/vieworder/'+orderid+'/'+scope.clientId);
	       };
    }
  });
  selfcare.ng.application.controller('ServicesController', [
                                                           '$scope',
                                                           'RequestSender',
                                                           'webStorage',
                                                           '$location',
                                                           'PaginatorService',
                                                           selfcare.controllers.ServicesController]).run(function($log) {
      $log.info("ServicesController initialized");
  });
}(selfcare.controllers || {}));
