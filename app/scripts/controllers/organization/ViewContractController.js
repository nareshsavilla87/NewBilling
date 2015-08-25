(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewContractController: function(scope, routeParams , location,resourceFactory ,PermissionService,$modal) {
        scope.contractperiod = [];
        scope.PermissionService = PermissionService;
        
        resourceFactory.contractResource.get({subscriptionId: routeParams.id} , function(data) {
            scope.contractPeriod = data;
           
        });

        scope.deleteContract = function (){
        	 $modal.open({
	                templateUrl: 'approve.html',
	                controller: approve,
	                resolve:{}
	            });
        };
        
    	function  approve($scope, $modalInstance) {
    		$scope.approve = function () {
            	resourceFactory.contractResource.remove({subscriptionId: routeParams.id} , {} , function() {
                  location.path('/contract');
            });
                $modalInstance.dismiss('delete');
         };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
          };
        }
    }
  });
  mifosX.ng.application.controller('ViewContractController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    'PermissionService',
    '$modal',
    mifosX.controllers.ViewContractController]).run(function($log) {
    $log.info("ViewContractController initialized");
  });
}(mifosX.controllers || {}));
