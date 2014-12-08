(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ProfileController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams,paginatorService) {
		  
		  scope.clientData =[];
		  scope.ordersData = [];
		  scope.totalOrdersData = [];
		  scope.retrivingOrdersData = {};
		  
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
	  	   
		 if(clientTotalData){		  
			  scope.clientId = clientTotalData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  if(data.selfcare.token){
					  rootScope.iskortaTokenAvailable = true;
				  }
				  if(!scope.clientData.selfcare.authPin){
					  scope.clientData.selfcare.authPin = 'Not Available';
				  }
				  rootScope.selfcare_userName = data.displayName;
				  webStorage.add('selfcareUserName',data.displayName);
				  webStorage.add('selfcareUserData',data);
				  
				  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
					  scope.totalOrdersData = data.clientOrders;
					  scope.retrivingOrdersData.totalFilteredRecords = scope.totalOrdersData.length;
					  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 4);
				  });
			  });
		  }
		 
		 scope.routeToOrderView = function(orderid){
             location.path('/vieworder/'+orderid+'/'+scope.clientId);
		 };
    }
  });
  selfcare.ng.application.controller('ProfileController', [
                                                           '$scope',
                                                           'RequestSender',
                                                           '$rootScope',
                                                           '$http',
                                                           'AuthenticationService',
                                                           'webStorage',
                                                           'HttpService',
                                                           'SessionManager',
                                                           '$location',
                                                           '$routeParams', 
                                                           'PaginatorService', 
                                                           selfcare.controllers.ProfileController]).run(function($log) {
      $log.info("ProfileController initialized");
  });
}(selfcare.controllers || {}));
