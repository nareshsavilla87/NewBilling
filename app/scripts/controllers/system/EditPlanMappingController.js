(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPlanMappingController: function(scope, routeParams, resourceFactory, location) {
		  
		  scope.planCodes = [];
	      scope.statusDatas = [];
          scope.formChangeData = {};
          scope.planMappingId=routeParams.id;
          
         resourceFactory.planMappingResource.getPlanMapping({planMappingId: routeParams.id, template:'true'} , function(data) {
            scope.formData=data;
            scope.planCodes = data.planCodeData;
            scope.statusDatas=data.status;
        });
         
        scope.submit = function() {	
               
        	scope.formChangeData.planId = scope.formData.planId;
        	scope.formChangeData.planIdentification = scope.formData.planIdentification;
        	scope.formChangeData.status = scope.formData.planStatus;
            resourceFactory.planMappingResource.update({planMappingId: routeParams.id},scope.formChangeData,function(data){
             location.path('/viewplanmapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanMappingController', [
    '$scope', 
    '$routeParams', 
    'ResourceFactory', 
    '$location',
    mifosX.controllers.EditPlanMappingController]).run(function($log) {
    $log.info("EditPlanMappingController initialized");
  });
}(mifosX.controllers || {}));
