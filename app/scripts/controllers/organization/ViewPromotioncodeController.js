(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPromotioncodeController: function(scope, routeParams , location, resourceFactory, webStorage, $modal, PermissionService) {
		 
        scope.promotiondata = {};   
        scope.PermissionService =  PermissionService;
        resourceFactory.promotionResource.getPrmotioncodeDetails({promotioncodeId: routeParams.id} , function(data) {
            scope.promotiondata = data;                                                
        });

        scope.promotionTab=function(){
        	 webStorage.add("callingTab", {someString: "Promotioncode"});
        };
        
      scope.deletePromotion = function (){
    	    $modal.open({
    		  	templateUrl: 'approve.html',
              	controller: Approve,
              	resolve:{}
          	});
      };
      function Approve($scope, $modalInstance) {
    	  $scope.approve = function (act) {
    		  scope.approveData = {};
              resourceFactory.promotionResource.remove({promotioncodeId: routeParams.id} , {} , function(data) {
            	  webStorage.add("callingTab", {someString: "Promotioncode" });
                  location.path('/discounts');
              });
              $modalInstance.close('delete');
          };
          $scope.cancel = function () {
        	  $modalInstance.dismiss('cancel');
          };
      };
      
   }
    
  });
  mifosX.ng.application.controller('ViewPromotioncodeController', [
      '$scope', 
      '$routeParams', 
      '$location', 
      'ResourceFactory',
      'webStorage',
      '$modal',
      'PermissionService',
      mifosX.controllers.ViewPromotioncodeController
      ]).run(function($log) {
    	  $log.info("ViewPromotioncodeController initialized");
  });
}(mifosX.controllers || {}));