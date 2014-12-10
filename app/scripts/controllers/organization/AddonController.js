(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddonController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.addons = [];
        scope.PermissionService = PermissionService;
        resourceFactory.addonsResource.query(function(data) {
            scope.addons= data;
        });
        scope.routeTo = function(id){
            location.path('/viewaddon/'+ id);
          };
          
          scope.deleteAddon=function(value){
        	  scope.addonId=value;
              $modal.open({
                  templateUrl: 'deleteaddon.html',
                  controller: Approve,
                  resolve:{}
              });
          };
         function Approve($scope, $modalInstance) {
        	  
              $scope.approve = function () {
                  scope.approveData = {};
                  resourceFactory.addonsResource.remove({addonId:scope.addonId},{},function(){
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
  mifosX.ng.application.controller('AddonController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$modal',
     '$route', 
     mifosX.controllers.AddonController]).run(function($log) {
    $log.info("AddonController initialized");
  });
}(mifosX.controllers || {}));
