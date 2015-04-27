(function(module) {
  mifosX.controllers = _.extend(module, {
	  VendorController: function(scope, resourceFactory,PermissionService,location,route,$modal) {
    	
    	scope.PermissionService = PermissionService;
        resourceFactory.VendorLemplateResource.get(function(data) {
            scope.vendorDatas = data;
        });
        
        scope.routeTo=function(id){
        	location.path('/viewvendormanagement/' +id);
        };
        
        /**
       	 * Delete Vendor
       	 * */
         scope.deleteVendor = function (id){
         	scope.vendorId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForVendor.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
              	resourceFactory.VendorLemplateResource.remove({vendorId: scope.vendorId} , {} , function(data) {
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
  mifosX.ng.application.controller('VendorController', [
    '$scope', 
    'ResourceFactory',
    'PermissionService',
    '$location',
    '$route','$modal',
    mifosX.controllers.VendorController
    ]).run(function($log) {
    $log.info("VendorController initialized");
  });
}(mifosX.controllers || {}));
