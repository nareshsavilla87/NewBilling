(function(module) {
  mifosX.controllers = _.extend(module, {
	  StatementDetailsController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.statements = {};
        scope.PermissionService = PermissionService;
        resourceFactory.statementdetails.query(function(data) {
            scope.statements = data;
        });
        scope.cancelstatement = function (batchid){
        	scope.statementId=batchid;
         	 $modal.open({
 	                templateUrl: 'cancelstatement.html',
 	                controller: approve,
 	                resolve:{}
 	        });
         }; 	
         function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
              	resourceFactory.statementdetails.update({batchid: scope.statementId} , {} , function() {
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
  mifosX.ng.application.controller('StatementDetailsController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     '$route',
     mifosX.controllers.StatementDetailsController]).run(function($log) {
    $log.info("StatementDetailsController initialized");
  });
}(mifosX.controllers || {}));
