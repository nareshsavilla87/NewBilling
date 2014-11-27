(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		GlobalPaySuccessController: function(scope, rootScope,RequestSender, location, http, dateFilter,webStorage,httpService) {
 
    		scope.formData = {};
    		scope.formData.transactionId = location.search().txnref;
    		scope.formData.source = 'globalpay';
    		
    		RequestSender.globalPayResource.update(scope.formData, function(data){
    			location.path('/payments');
    		});
    		
		}
    });
	selfcare.ng.application.controller('GlobalPaySuccessController', ['$scope', '$rootScope','RequestSender', '$location', '$http', 'dateFilter','webStorage','HttpService', selfcare.controllers.GlobalPaySuccessController]).run(function($log) {
		$log.info("GlobalPaySuccessController initialized");
    });
}(selfcare.controllers || {}));

