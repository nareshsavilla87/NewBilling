(function(module) {
  mifosX.controllers = _.extend(module, {
    AccViewGLAccountContoller: function(scope, routeParams , location, resourceFactory, route,$modal,PermissionService) {
        scope.glaccountdata = [];
        scope.accountOptions = [];
        scope.PermissionService=PermissionService;
        
        resourceFactory.accountCoaResource.get({glAccountId: routeParams.id , template: 'true'} , function(data) {
           
           //to display parent name
            if(data.type.value == "ASSET") {
              scope.accountOptions = data.assetHeaderAccountOptions;
              for(var i=0; i<scope.accountOptions.length; i++) {
                if(scope.accountOptions[i].id == data.parentId) {
                  data.parentName = scope.accountOptions[i].name;
                }
              }
            } else if(data.type.value == "LIABILITY") {
                scope.accountOptions = data.liabilityHeaderAccountOptions;
                for(var i=0; i<scope.accountOptions.length; i++) {
                  if(scope.accountOptions[i].id == data.parentId) {
                    data.parentName = scope.accountOptions[i].name;
                  }
                }
            } else if(data.type.value == "EQUITY") {
                scope.accountOptions = data.equityHeaderAccountOptions;
                for(var i=0; i<scope.accountOptions.length; i++) {
                  if(scope.accountOptions[i].id == data.parentId) {
                    data.parentName = scope.accountOptions[i].name;
                  }
                }
            } else if(data.type.value == "INCOME") {
                scope.accountOptions = data.incomeHeaderAccountOptions;
                for(var i=0; i<scope.accountOptions.length; i++) {
                  if(scope.accountOptions[i].id == data.parentId) {
                    data.parentName = scope.accountOptions[i].name;
                  }
                }
            } else if(data.type.value == "EXPENSE") {
                scope.accountOptions = data.expenseHeaderAccountOptions;
                for(var i=0; i<scope.accountOptions.length; i++) {
                  if(scope.accountOptions[i].id == data.parentId) {
                    data.parentName = scope.accountOptions[i].name;
                  }
                }
            }  
            scope.glaccount = data;
        });
        
        scope.deleteGLAccount = function (){
            $modal.open({
                templateUrl: 'deleteglacc.html',
                controller: GlAccDeleteCtrl
            });
        };
        var GlAccDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.accountCoaResource.delete({glAccountId: routeParams.id} , {} , function(data) {
                    location.path('/accounting_coa');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        scope.changeState = function (disabled){
          resourceFactory.accountCoaResource.update({'glAccountId': routeParams.id},{disabled:!disabled},function(data){
            route.reload();
          });
        };
    }
  });
  mifosX.ng.application.controller('AccViewGLAccountContoller', ['$scope', '$routeParams', '$location', 'ResourceFactory', '$route','$modal','PermissionService', mifosX.controllers.AccViewGLAccountContoller]).run(function($log) {
    $log.info("AccViewGLAccountContoller initialized");
  });
}(mifosX.controllers || {}));
