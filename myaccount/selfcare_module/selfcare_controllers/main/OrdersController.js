(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  OrdersController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.ordersData = [];
		  var clientTotalData= webStorage.get('clientTotalData');
		  //scope.ordersData = orderData.clientOrdersData;
		  if(clientTotalData){
			  RequestSender.getOrderResource.get({clientId:clientTotalData.clientId},function(data){
				  scope.clientId = data.clientId;
				  scope.ordersData = data.clientOrders;
			  });
		  }
		  
		  scope.routeToOrderView = function(orderid){
	             location.path('/vieworder/'+orderid+'/'+scope.clientId);
	       };
    }
  });
  selfcare.ng.application.controller('OrdersController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.OrdersController]);
}(selfcare.controllers || {}));
