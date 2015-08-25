(function(module) {
  mifosX.controllers = _.extend(module, {
	  ClientInvoiceController: function(scope, routeParams, location, resourceFactory,dateFilter,$rootScope) {
		
		  	scope.formData = {};
 		    scope.start = {};
	        scope.start.date = new Date();
	        
	        /*resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
			  scope.clientId=routeParams.id;
			  
			  scope.formData = {};
      		});*/
		  
	        $modal.open({
                templateUrl: 'approve.html',
                controller: Approve,
                resolve:{}
            });
	        
	        
	        var Approve = function ($scope, $modalInstance) {
                $scope.approve = function (act) {
                    scope.approveData = {};
                /*resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
                        location.path('/inventory');

                });*/
                    $modalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
	        
	        scope.cancel=function() {
	          location.path('/viewclient/' + routeParams.id);
	        };
	        scope.submit=function() {  
	        	
	        	this.formData.locale = $rootScope.locale.code;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.dateFormat = 'dd MMMM yyyy';
	            this.formData.systemDate=reqDate;
	            resourceFactory.clientInvoiceResource.save({'clientId': routeParams.id},this.formData,function(data){
	            	 location.path('/viewclient/' +routeParams.id);
	              
	            });
	          };
    }
  });
  mifosX.ng.application.controller('ClientInvoiceController', ['$scope', '$routeParams',  '$location', 'ResourceFactory', 'dateFilter','$rootScope', mifosX.controllers.ClientInvoiceController]).run(function($log) {
    $log.info("ClientInvoiceController initialized");
  });
}(mifosX.controllers || {}));