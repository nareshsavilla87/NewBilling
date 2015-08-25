(function(module) {
  mifosX.controllers = _.extend(module, {
	  ContractController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.contracts = [];
        scope.PermissionService = PermissionService;
        resourceFactory.contractResource.query(function(data) {
            scope.contracts = data;
        });
        scope.routeTo = function(id){
            location.path('/viewContract/'+ id);
          };
         /**
      	 * Delete contrcat period 
      	 * */
        scope.deleteContract = function (id){
        	scope.contractId=id;
         	 $modal.open({
 	                templateUrl: 'contract.html',
 	                controller: approve,
 	                resolve:{}
 	        });
         };
         
     	function  approve($scope, $modalInstance) {
     		$scope.approve = function () {
             	resourceFactory.contractResource.remove({subscriptionId: scope.contractId} , {} , function() {
                   route.reload();
             });
             	 $modalInstance.dismiss('delete');
          };
             $scope.cancel = function () {
                 $modalInstance.dismiss('cancel');
           };
         }   
    }
  });
  mifosX.ng.application.controller('ContractController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     '$route',
     mifosX.controllers.ContractController]).run(function($log) {
    $log.info("ContractController initialized");
  });
}(mifosX.controllers || {}));
