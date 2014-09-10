(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  PaymentsController: function(scope,RequestSender,webStorage,location,routeParams,paginatorService) {
		  scope.paymentsData = [];
		  var paymentsData= webStorage.get('clientTotalData');
		 // scope.paymentsData = paymentsData.paymentsData;
		  scope.getPayments = function(offset, limit, callback) {
			  RequestSender.paymentsResource.get({clientId: paymentsData.clientId ,offset: offset, limit: limit,type:'PAYMENT'} , callback);
	  		};
	  		
	  		if(paymentsData){
	  			scope.paymentsData = paginatorService.paginate(scope.getPayments, 14);
	  		}
		 /* RequestSender.paymentsResource.get({clientId: paymentsData.clientId,type:'PAYMENT' } , function(data){
			  scope.paymentsData = data;
		  });*/
    }
  });
  selfcare.ng.application.controller('PaymentsController', ['$scope','RequestSender','webStorage','$location','$routeParams','PaginatorService', selfcare.controllers.PaymentsController]);
}(selfcare.controllers || {}));
