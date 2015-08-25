(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyDetailsController: function(scope, resourceFactory,location,PermissionService,route, $modal) {
        scope.currencydetails = [];
        scope.PermissionService = PermissionService;
        resourceFactory.currencyResource.query(function(data) {
            scope.currencydetails = data;
        }); 
        
        scope.routeTo = function(id){
            location.path('/viewcurrencydetails/'+ id);
          };
        
          /**
        	 * Delete currency details 
        	 * */
          scope.deleteCurrency = function (id){
          	scope.currencyId=id;
           	 $modal.open({
   	                templateUrl: 'deleteCurrency.html',
   	                controller: approve,
   	                resolve:{}
   	        });
           };
           
       	function  approve($scope, $modalInstance) {
       		$scope.approve = function () {
       			resourceFactory.currencyResource.remove({id: scope.currencyId} , {} , function(data) {
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
  mifosX.ng.application.controller('CurrencyDetailsController', [
    '$scope', 
    'ResourceFactory',
    '$location',
    'PermissionService',
    '$route',
    '$modal',
    mifosX.controllers.CurrencyDetailsController]).run(function($log) {
    $log.info("CurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));
