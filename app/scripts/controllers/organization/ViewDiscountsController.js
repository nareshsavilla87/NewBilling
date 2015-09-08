(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewDiscountsController: function(scope, routeParams, location, resourceFactory, PermissionService, $modal) {
	
        scope.discounting = [];   
        scope.PermissionService =  PermissionService; 
        
        resourceFactory.discountsResource.getDiscountDetails({discountId: routeParams.id} , function(data) {
            scope.discounting = data; 
            scope.discountDetailDatas=data.discountDetailDatas;
        });
        scope.deletemessage = function (){
            resourceFactory.discountResource.remove({discountId: routeParams.id} , {} , function(data) {
                  location.path('/discounts');
                  // added dummy request param because Content-Type header
					// gets removed
                  // if the request does not contain any data (a request body)
            });
         };
         
         /**
	      * Delete Discount
	      **/
	     scope.deleteDiscount = function (){
	    	 $modal.open({
	    		 templateUrl: 'deletePopupForDiscount.html',
	  	         controller: approve,
	  	         resolve:{}
	  	     });
	     };
	          
	     function  approve($scope, $modalInstance) {
	    	 $scope.approve = function () {
	    		 resourceFactory.discountResource.remove({discountId: routeParams.id} , {} , function() {
	    			 location.path('/discounts');
	             });
	             $modalInstance.dismiss('delete');
	      	 };
	         $scope.cancel = function () {
	        	 $modalInstance.dismiss('cancel');
	         };
	     }
	     
      }
  });
  mifosX.ng.application.controller('ViewDiscountsController', [
     '$scope',
     '$routeParams', 
     '$location',
     'ResourceFactory',
     'PermissionService',
     '$modal',
     mifosX.controllers.ViewDiscountsController
     ]).run(function($log) {
    	 $log.info("ViewDiscountsController initialized");
     });
}(mifosX.controllers || {}));