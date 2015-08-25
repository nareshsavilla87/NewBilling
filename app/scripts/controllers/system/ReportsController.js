(function(module) {
  mifosX.controllers = _.extend(module, {
    ReportsController: function(scope, resourceFactory,location,$modal,PermissionService,PaginatorService) {
        scope.reports = [];
        scope.PermissionService = PermissionService;
        
        scope.search123 = function(offset, limit, callback) {
            resourceFactory.reportsResource.getReport({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
           };
         
         scope.search = function(filterText) {
        	 scope.reports = PaginatorService.paginate(scope.search123, 14);
         };
         
        scope.fetchReports = function(offset, limit, callback) {
        	resourceFactory.reportsResource.getReport({offset: offset, limit: limit} , callback);
        };
        
        scope.deletereport = function (reportId){
        	scope.reportId=reportId;
            $modal.open({
                templateUrl: 'deletenoncorereport.html',
                controller: NoncoreReportDeleteCtrl
            });
        };
        
        var NoncoreReportDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.reportsResource.delete({id:scope.reportId} , {} , function(data) {
                    location.path('/reports');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
        scope.reports = PaginatorService.paginate(scope.fetchReports, 14);
        
        scope.routeToreport = function(id){
        	//alert(id);
        	location.path('/system/viewreport/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('ReportsController', ['$scope', 'ResourceFactory','$location','$modal','PermissionService','PaginatorService', mifosX.controllers.ReportsController]).run(function($log) {
    $log.info("ReportsController initialized");
  });
}(mifosX.controllers || {}));
