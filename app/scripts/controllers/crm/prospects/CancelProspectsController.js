(function(module) {
  mifosX.controllers = _.extend(module, {
	  CancelProspectsController: function(scope, resourceFactory, location, routeParams) {
        
		  scope.statusRemarkDatas = [];
		  scope.prospectsData={};

        resourceFactory.prospectCancelResource.getProspects({prospectId : routeParams.id}, function(data) {
        	//alert(routeParams.id);
            scope.statusRemarkDatas = data.statusRemarkData;
            scope.prospectsData.id=routeParams.id;
            scope.formData = {
            		
            };   
        });
        
        scope.submit = function() {
        	
          resourceFactory.prospectDeleteResource.update({deleteProspectId: routeParams.id}, this.formData,function(data){
            location.path('/leads');
          });
        };
    }
  });
  mifosX.ng.application.controller('CancelProspectsController', ['$scope', 'ResourceFactory', '$location', '$routeParams', mifosX.controllers.CancelProspectsController]).run(function($log) {
    $log.info("CancelProspectsController initialized");
  });
}(mifosX.controllers || {}));
