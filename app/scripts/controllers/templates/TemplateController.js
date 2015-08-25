(function(module) {
  mifosX.controllers = _.extend(module, {
    TemplateController: function(scope, resourceFactory,PermissionService,location,route,$modal) {
    	
    	scope.PermissionService = PermissionService;
        resourceFactory.templateResource.get(function(data) {
            scope.templates = data;
        });
        
        scope.routeTo=function(id){
        	location.path('/viewtemplate/' +id);
        };
        
        /**
       	 * Delete Template
       	 * */
         scope.deleteTemplate = function (id){
         	scope.templateId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForTemplate.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
              	resourceFactory.templateResource.remove({templateId: scope.templateId} , {} , function() {
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
  mifosX.ng.application.controller('TemplateController', [
    '$scope', 
    'ResourceFactory',
    'PermissionService',
    '$location',
    '$route','$modal',
    mifosX.controllers.TemplateController
    ]).run(function($log) {
    $log.info("TemplateController initialized");
  });
}(mifosX.controllers || {}));
