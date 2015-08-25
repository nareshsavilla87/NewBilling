(function(module) {
    mifosX.controllers = _.extend(module, {
        ViewAccountingClosureController: function(scope, resourceFactory, location, routeParams,$modal,PermissionService) {
            scope.accountClosure = {};
            scope.choice = 0;
            scope.PermissionService=PermissionService;
            resourceFactory.accountingClosureResource.getView({accId:routeParams.id}, function(data){
                scope.accountClosure = data;
            });
            scope.deleteAcc = function () {
                $modal.open({
                    templateUrl: 'deleteacc.html',
                    controller: AccDeleteCtrl
                });
            };
            var AccDeleteCtrl = function ($scope, $modalInstance) {
                $scope.delete = function () {
                    resourceFactory.accountingClosureResource.delete({accId:routeParams.id},{}, function(data){
                        location.path('/accounts_closure');
                    });
                    $modalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        }
    });
    mifosX.ng.application.controller('ViewAccountingClosureController', ['$scope', 'ResourceFactory', '$location','$routeParams','$modal','PermissionService', mifosX.controllers.ViewAccountingClosureController]).run(function($log) {
        $log.info("ViewAccountingClosureController initialized");
    });
}(mifosX.controllers || {}));
