(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewTemplateController: function(scope, routeParams , resourceFactory, location,$modal,PermissionService) {
    	
    	scope.PermissionService = PermissionService;
        resourceFactory.templateResource.getTemplateDetails({templateId: routeParams.id} , function(data) {
            scope.template = data;
            scope.text = data.text;
        });
        
        scope.deleteTemplate = function (){
            $modal.open({
                templateUrl: 'deletePopupForTemplate.html',
                controller: approve,
                resolve:{}
            });
        };
      function approve($scope, $modalInstance) {
            $scope.approve = function () {
                resourceFactory.templateResource.remove({templateId: routeParams.id}, {}, function(data) {
                    location.path('/templates');
                    // added dummy request param because Content-Type header gets removed
                    // if the request does not contain any data (a request body)
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
  });
  mifosX.ng.application.controller('ViewTemplateController', [
  '$scope', 
  '$routeParams',
  'ResourceFactory', 
  '$location',
  '$modal',
  'PermissionService',
  mifosX.controllers.ViewTemplateController
  ]).run(function($log) {
    $log.info("ViewTemplateController initialized");
  });
}(mifosX.controllers || {}));
