(function(module) {
	mifosX.controllers = _.extend(module, {
		RadiusController : function(scope, location,  $modal, route, webStorage,resourceFactory) {
		
		scope.nasDatas =[];	
		scope.radServices =[];
		scope.value = [];
		
		var callingTab = webStorage.get('callingTab', null);
		if (callingTab == null) {
			callingTab = "";
		} else {
			scope.displayTab = callingTab.someString;
			if (scope.displayTab == "radService") {
				scope.radServiceTab = true;
				webStorage.remove('callingTab');
			}
		}
		
		scope.getNas = function() {
			resourceFactory.nasResource.query(function(data) {
				scope.nasDatas = data;
			});
		};
		
		scope.getRadService = function() {
			resourceFactory.radServiceResource.query({attribute:'Mikrotik-Rate-Limit'},function(data) {
				scope.radServices = data;
				scope.value = [];
				for(var i=0;i<scope.radServices.length;i++){
					if(scope.radServices[i].value){
						scope.value[i]=scope.radServices[i].value.split('/');
						var lengthPin = scope.value[i].length;
						if(lengthPin > 1){
							scope.radServices[i].upRate = scope.value[i][0];
							scope.radServices[i].downRate = scope.value[i][1];
						}
					}
				};
			});
		};
		
	    /**
       	 * Delete Nas
       	 * */
         scope.deleteNas = function (id){
         	scope.nasId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForNas.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
      			console.log(scope.nasId);
              	resourceFactory.nasResource.remove({nasId: scope.nasId} , {} , function() {
                    route.reload();
              	});
              	$modalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
        }
      	
      	
        /**
       	 * Delete radService
       	 * */
         scope.deleteRadService = function (id){
         	scope.radServiceId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForRadService.html',
  	                controller: remove,
  	                resolve:{}
  	        });
         };
          
      	function  remove($scope, $modalInstance) {
      		$scope.remove = function () {
              	resourceFactory.radServiceResource.remove({radServiceId: scope.radServiceId} , {} , function() {
              		webStorage.add("callingTab", {someString: "radService"});
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
	mifosX.ng.application.controller('RadiusController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    mifosX.controllers.RadiusController 
	    ]).run(function($log) {
	    	$log.info("RadiusController initialized");
	    });
}(mifosX.controllers || {}));








































