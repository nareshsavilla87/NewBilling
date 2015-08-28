(function(module) {
  mifosX.controllers = _.extend(module, {
    DataTableController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
    	scope.PermissionService = PermissionService;
    	
        resourceFactory.DataTablesResource.query(function(data) {
            scope.datatables = data;
        });
        
        scope.routeTo = function(tablename){
        			location.path('/viewdatatable/'+ tablename);
          };
          
          scope.deleteDataTable=function(datatableName){
        	  scope.dataTableName=datatableName;
              $modal.open({
                  templateUrl: 'deleteDataTable.html',
                  controller: Approve,
                  resolve:{}
              });
          };
         function Approve($scope, $modalInstance) {
        	  
              $scope.approve = function () {
                  scope.approveData = {};
                  resourceFactory.DataTablesResource.remove({datatablename:scope.dataTableName},{},function(){
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
  mifosX.ng.application.controller('DataTableController', [
    '$scope', 
    'ResourceFactory',
    '$location',
    'PermissionService',
    '$modal',
    '$route',
    mifosX.controllers.DataTableController
    ]).run(function($log) {
    $log.info("DataTableController initialized");
  });
}(mifosX.controllers || {}));
