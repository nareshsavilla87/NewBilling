(function(module) {
	mifosX.controllers = _.extend(module, {
		PropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,$upload,$rootScope,API_VERSION) {
	
			scope.formData={};
			scope.propertyCodes = [];
			scope.PermissionService = PermissionService;
			resourceFactory.propertyCodeResource.query(function(data) {
				scope.propertyCodes = data;
			});
		
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
	    mifosX.controllers.PropertyController 
	    ]).run(function($log) {
	    	$log.info("PropertyController initialized");
	    });
}(mifosX.controllers || {}));








































