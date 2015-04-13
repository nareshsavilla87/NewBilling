(function(module) {
	mifosX.controllers = _.extend(module, {
		PropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,$upload,$rootScope,API_VERSION,paginatorService) {
	
			scope.formData={};
			scope.propertyCodes = [];
			scope.PermissionService = PermissionService;
			
			scope.propertyDetailsFetchFunction = function(offset, limit, callback) {
				resourceFactory.propertyCodeResource.getAlldetails({offset: offset, limit: limit} , callback);
			};
			
			scope.propertyCodes = paginatorService.paginate(scope.propertyDetailsFetchFunction, 14);
			

		    scope.searchPropertyDetails123 = function(offset, limit, callback) {
		    	  resourceFactory.propertyCodeResource.getAlldetails({offset: offset, limit: limit,sqlSearch: scope.filterText } , callback); 
		     };
		  		
		    scope.searchPropertyDetails = function(filterText) {
		  			scope.propertyCodes = paginatorService.paginate(scope.searchPropertyDetails123, 14);
		  	};
		
			scope.routeToProperty = function(id) {
				location.path('/viewproperty/' + id);
			};
		  	
		  	
		    /**
	       	 * Upload property
	       	 * */
			
	         scope.uploadProperty = function (){
	          	 $modal.open({
	  	                templateUrl: 'uploadProperty.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	         };
	          
	      	function  approve($scope, $modalInstance) {
	      		
	      		 $scope.value=false;
	      		 $scope.onFileSelect = function($files) {
		             $scope.file = $files[0];
		             if($scope.file!=undefined){
		            	 $scope.value=true;
		             }
		           };
		            
		        $scope.downloadFile=function(){
		          window.open("csv/Property Master.csv");
		        } ;  
		           
	      		$scope.approve = function () {
	      			 $upload.upload({/*41.75.85.206:8080*/
	                     url: $rootScope.hostUrl+ API_VERSION +'/property/documents', 
	                     data: scope.formData,
	                     file: $scope.file
	                   }).then(function(data) {
	                     // to fix IE not refreshing the model
	                     if (!scope.$$phase) {
	                       scope.$apply();
	                     }
	                 	$modalInstance.dismiss('delete');
	                     route.reload();
	                   });
	              
	      		};
	            $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	            };
	        }
	      	
	      	
	        /**
		      * Delete Property
		      **/
		     scope.deleteProperty = function (id){
		    	 scope.propertyId=id;
		    	 $modal.open({
		    		 templateUrl: 'deletePopupForProperty.html',
		  	         controller: approve,
		  	         resolve:{}
		  	     });
		     };
		          
		     function  approve($scope, $modalInstance) {
		    	 $scope.approve = function () {
		    		 resourceFactory.propertyCodeResource.remove({propertyId: scope.propertyId} , {} , function(data) {
		    			 $modalInstance.dismiss('delete');
		    			  route.reload();
		             });
		      	 };
		         $scope.cancel = function () {
		        	 $modalInstance.dismiss('cancel');
		         };
		     }
		     
		     
		     
		   	var propertyhistoryController=function($scope,$modalInstance){

	    		$scope.searchHistory123 = function(offset, limit, callback) {
			    	  resourceFactory.propertyCodeResource.getAlldetails({otherResource:'history',offset: offset, limit: limit ,sqlSearch: scope.propertyCode } , callback); 
			     };
			  		
			     $scope.propertyhistory = paginatorService.paginate($scope.searchHistory123, 14);
			     
	    		$scope.accept = function(){
	    		 $modalInstance.close('delete');
	    		};
	        };
	    	
    	   scope.propertyHistoryPopup = function(propertyCode){
    		   scope.propertyCode = propertyCode;
               $modal.open({
                   templateUrl: 'propertyhistory.html',
                   controller: propertyhistoryController,
                   resolve:{}
               });
    	     };
		  }
	});
	mifosX.ng.application.controller('PropertyController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    '$upload',
	    '$rootScope',
	    'API_VERSION',
	    'PaginatorService',
	    mifosX.controllers.PropertyController 
	    ]).run(function($log) {
	    	$log.info("PropertyController initialized");
	    });
}(mifosX.controllers || {}));








































