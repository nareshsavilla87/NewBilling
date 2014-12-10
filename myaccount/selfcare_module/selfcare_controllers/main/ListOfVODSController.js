(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ListOfVODSController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams,paginatorService) {
		  scope.listOfVODSData = [];
		  var clientTotalData= webStorage.get('clientTotalData');
		  //scope.ordersData = orderData.clientOrdersData;
		  scope.totalOrdersData =[];
		  scope.retrivingOrdersData = {};
		  scope.ordersData = [];
		  
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
	  	   
		  if(clientTotalData){
			  RequestSender.eventOrderPriceTemplateResource.query({clientId:clientTotalData.clientId},function(data){
				  scope.listOfVODSData = data;
			  });
			  
			  RequestSender.getOrderResource.get({clientId:clientTotalData.clientId},function(data){
				  scope.totalOrdersData = data.clientOrders;
				  scope.retrivingOrdersData.totalFilteredRecords = scope.totalOrdersData.length;
				  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 4);
			  });
		  }
		  
		  
		  
		  scope.routeToOrderView = function(orderid){
	             location.path('/vieworder/'+orderid+'/'+scope.clientId);
	       };
    }
  });
  selfcare.ng.application.controller('ListOfVODSController', ['$scope','RequestSender','$rootScope','$http',
                                                              'AuthenticationService','webStorage','HttpService',
                                                              'SessionManager','$location','$routeParams',
                                                              'PaginatorService', selfcare.controllers.ListOfVODSController]).run(function($log) {
      $log.info("ListOfVODSController initialized");
  });
}(selfcare.controllers || {}));
