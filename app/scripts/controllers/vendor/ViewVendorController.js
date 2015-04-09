(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewVendorController: function(scope, routeParams , resourceFactory ,location,$modal,PermissionService,route) {
        scope.vendorData = [];
        scope.PermissionService = PermissionService;
        scope.vendorRouteParamId = routeParams.id;
        
        resourceFactory.VendorLemplateResource.getTemplateDetails({vendorId: routeParams.id} , function(data) {
        	scope.vendorData = data;
        });
        
        resourceFactory.VendorAgreementDataResource.get({vendorId: routeParams.id} , function(data) {
        	scope.agreements = data;
        	for(var i=0; i<data.length; i++){
        		if(data[i].agreementStatus == "Signed"){
        			scope.idActiveAgreement = "Active";
        		}
        	}
        });
        
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
              		location.path('/vendormanagement');
              	});
              	$modalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
        }
        
    }
  });
  mifosX.ng.application.controller('ViewVendorController', ['$scope', '$routeParams','ResourceFactory', '$location','$modal','PermissionService','$route',mifosX.controllers.ViewVendorController]).run(function($log) {
    $log.info("ViewVendorController initialized");
  });
}(mifosX.controllers || {}));
