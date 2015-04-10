(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewPropertyController: function(scope, routeParams, location, resourceFactory, PermissionService, $modal) {
		  
	        scope.PermissionService =  PermissionService; 
	        
	        resourceFactory.propertyCodeResource.get({propertyId: routeParams.id} , function(data) {
	            scope.property = data;                                                
	        });
	        scope.deletemessage = function (){
	            resourceFactory.propertyCodeResource.remove({propertyId: routeParams.id} , {} , function(data) {
	                  location.path('/discounts');
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
	  mifosX.ng.application.controller('ViewPropertyController', [
	     '$scope',
	     '$routeParams', 
	     '$location',
	     'ResourceFactory',
	     'PermissionService',
	     '$modal',
	     mifosX.controllers.ViewPropertyController
	     ]).run(function($log) {
	    	 $log.info("ViewPropertyController initialized");
	     });
	}(mifosX.controllers || {}));