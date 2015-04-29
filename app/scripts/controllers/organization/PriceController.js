(function(module) {
  mifosX.controllers = _.extend(module, {
	  PriceController: function(scope,routeParams, resourceFactory,location,route, $modal) {
        scope.prices = [];
        scope.planId=routeParams.id;
        
        scope.routeTo = function(priceId,planId){
            location.path('/viewprice/'+priceId+"/"+planId);
         };
         
        resourceFactory.priceResource.get({planId: routeParams.id} , function(data) {
            scope.prices = data.pricingData;
            if(scope.prices.length>0){
            scope.planName = scope.prices[0].planCode;
            }
        });
        
        scope.deletePrice = function (priceId,planId){
        	scope.priceId = priceId;
        	 $modal.open({
                 templateUrl: 'delete.html',
                 controller: Approve,
                 resolve:{}
             });
         };
         function Approve($scope, $modalInstance) {
       	  
             $scope.approve = function () {
                 resourceFactory.deletePriceResource.remove({priceId: scope.priceId} , {} , function() {
                     route.reload();
                 });
                 $modalInstance.close('delete');
             };
             $scope.cancel = function () {
                 $modalInstance.dismiss('cancel');
             };
         }
	  }      	
           
  });
  mifosX.ng.application.controller('PriceController', [
    '$scope', 
    '$routeParams',
    'ResourceFactory', 
    '$location',
    '$route',
    '$modal',
     mifosX.controllers.PriceController]).run(function($log) {
    $log.info("PriceController initialized");
  });
}(mifosX.controllers || {}));
