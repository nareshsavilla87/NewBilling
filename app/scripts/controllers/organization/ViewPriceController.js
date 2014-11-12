(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPriceController: function(scope, routeParams , location,resourceFactory,PermissionService,$modal) {
		  
        scope.chargevariants = [];
        scope.planId=routeParams.planId;
        scope.PermissionService = PermissionService;
        
        resourceFactory.getPriceResource.get({priceId: routeParams.id} , function(data) {
            scope.chargevariants = data.chargevariant;
            scope.serviceDatas =data.serviceData;
            scope.chargeDatas=data.chargeData;
            scope.priceRegionDatas=data.priceRegionData;
            scope.formData=data;
           
        });
        scope.deletePrice = function (){
        	 $modal.open({
                 templateUrl: 'delete.html',
                 controller: Approve,
                 resolve:{}
             });
         };
         function Approve($scope, $modalInstance) {
       	  
             $scope.approve = function () {
                 resourceFactory.deletePriceResource.remove({priceId: routeParams.id} , {} , function() {
                	  location.path('/prices/'+routeParams.planId);
                 });
                 $modalInstance.close('delete');
             };
             $scope.cancel = function () {
                 $modalInstance.dismiss('cancel');
             };
         }
    }
  });
  mifosX.ng.application.controller('ViewPriceController', [
   '$scope', 
   '$routeParams', 
   '$location',
   'ResourceFactory',
   'PermissionService',
   '$modal',
   mifosX.controllers.ViewPriceController]).run(function($log) {
    $log.info("ViewPriceController initialized");
  });
}(mifosX.controllers || {}));
