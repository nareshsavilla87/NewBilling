(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPlanController: function(scope, routeParams , location,resourceFactory,$modal ,PermissionService) {
        scope.plan = [];
        scope.billRuleDatas = [];
        scope.PermissionService = PermissionService;
        
        resourceFactory.planResource.get({planId: routeParams.id} , function(data) {
            scope.plan = data;
            scope.billRuleDatas = data.billRuleDatas;
            
            for(var i in scope.billRuleDatas){
            	if(scope.billRuleDatas[i].id == scope.plan.billRule){
            		scope.plan.billRule=scope.billRuleDatas[i].billruleOptions;
            	}
            }
           
        });
        
        scope.deleteplan=function(){
            $modal.open({
                templateUrl: 'approve.html',
                controller: Approve,
                resolve:{}
            });
        };
        
         function Approve($scope, $modalInstance) {
            $scope.approve = function () {
                scope.approveData = {};
                resourceFactory.planResource.remove({planId:routeParams.id},{},function(){
                    location.path('/plans');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
    }
  });
  mifosX.ng.application.controller('ViewPlanController', [
    '$scope', 
    '$routeParams', 
    '$location',
    'ResourceFactory',
    '$modal',
    'PermissionService', 
    mifosX.controllers.ViewPlanController]).run(function($log) {
    $log.info("ViewPlanController initialized");
  });
}(mifosX.controllers || {}));
