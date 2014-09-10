(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.plans = [];
        scope.PermissionService = PermissionService;
        resourceFactory.planResource.getAllPlans(function(data) {
            scope.plans= data;
        });
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
          
          scope.deleteplan=function(value){
        	  scope.planId=value;
              $modal.open({
                  templateUrl: 'approve.html',
                  controller: Approve,
                  resolve:{}
              });
          };
          var Approve = function ($scope, $modalInstance) {
        	  
              $scope.approve = function (act) {
                  scope.approveData = {};
                  resourceFactory.planResource.delete({'planId':scope.planId},{},function(data){
                      location.path('/plans');
                      route.reload();
                  });
                  $modalInstance.close('delete');
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
    }
  });
  mifosX.ng.application.controller('PlanController', ['$scope', 'ResourceFactory','$location','PermissionService','$modal','$route', mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
