(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ListOfVODSController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.listOfVODSData = [];
		  var clientTotalData= webStorage.get('clientTotalData');
		  //scope.ordersData = orderData.clientOrdersData;
		  if(clientTotalData){
			  RequestSender.eventOrderPriceTemplateResource.query({clientId:clientTotalData.clientId},function(data){
				  scope.listOfVODSData = data
			  });
		  }
		  
		  scope.routeToOrderView = function(orderid){
	             location.path('/vieworder/'+orderid+'/'+scope.clientId);
	       };
    }
  });
  selfcare.ng.application.controller('ListOfVODSController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.ListOfVODSController]);
}(selfcare.controllers || {}));
