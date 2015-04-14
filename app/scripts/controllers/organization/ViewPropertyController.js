(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewPropertyController: function(scope, routeParams, location, resourceFactory, PermissionService, $modal) {
		  
	        scope.PermissionService =  PermissionService; 
	        
	        resourceFactory.propertyCodeResource.get({propertyId: routeParams.id} , function(data) {
	            scope.property = data;                                                
	        });
	         
	         /**
		      * Delete Property
		      **/
		     scope.deleteProperty = function (){
		    	 $modal.open({
		    		 templateUrl: 'deletePopupForProperty.html',
		  	         controller: approve,
		  	         resolve:{}
		  	     });
		     };
		          
		     function  approve($scope, $modalInstance) {
		    	 $scope.approve = function () {
		    		 resourceFactory.propertyCodeResource.remove({propertyId: routeParams.id} , {} , function() {
		    			 $modalInstance.dismiss('delete');
		    			 location.path('/property');
		             });
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