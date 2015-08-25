(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCurrencyDetailsController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService, $modal) {
		
        scope.viewcurrencydetails=[];
        scope.PermissionService = PermissionService;
        
        resourceFactory.currencyResource.get({id: routeParams.id} , function(data) {
            scope.viewcurrencydetails = data; 
            
        });
        
        /**
    	 * Delete currency details 
    	 * */
      scope.deleteCurrency = function (){
       	 $modal.open({
	                templateUrl: 'deleteCurrency.html',
	                controller: approve,
	                resolve:{}
	        });
       };
       
   	function  approve($scope, $modalInstance) {
   		$scope.approve = function () {
   			resourceFactory.currencyResource.remove({id: routeParams.id} , {} , function(data) {
   			 location.path('/currencydetails');
           });
           	 $modalInstance.dismiss('delete');
        };
           $scope.cancel = function () {
               $modalInstance.dismiss('cancel');
         };
       }     
    }
  });
  mifosX.ng.application.controller('ViewCurrencyDetailsController', [
   '$scope', 
   '$routeParams', 
   '$route', 
   '$location', 
   'ResourceFactory', 
   '$http',
   'PermissionService',
   '$modal',
   mifosX.controllers.ViewCurrencyDetailsController]).run(function($log) {
    $log.info("ViewCurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));