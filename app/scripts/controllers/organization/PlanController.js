(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.plans = [];
        scope.PermissionService = PermissionService;
        resourceFactory.planResource.query(function(data) {
            scope.plans= data;
        });
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
          
          scope.deleteplan=function(value){
        	  scope.planId=value;
              $modal.open({
                  templateUrl: 'deleteplan.html',
                  controller: Approve,
                  resolve:{}
              });
          };
         function Approve($scope, $modalInstance) {
        	  
              $scope.approve = function () {
                  scope.approveData = {};
                  resourceFactory.planResource.remove({planId:scope.planId},{},function(){
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
  mifosX.ng.application.controller('PlanController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     '$route', 
     mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
