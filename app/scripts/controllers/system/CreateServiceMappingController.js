(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateServiceMappingController: function(scope, resourceFactory, location) {
        scope.serviceCodes = [];
        scope.statusDatas=[];
        scope.serviceParameters=[];
        scope.provisionSysDatas = [];
        
        resourceFactory.serviceMappingtemplateResource.getAllserviceMapping(function(data) {
           
        	scope.serviceCodes = data.serviceCodeData;
            scope.formData = data;
            scope.statusDatas=data.statusData;
            scope.serviceParameters=data.serviceParameters;
            scope.categories=data.categories;
            scope.subCategories=data.subCategories;
            scope.provisionSysDatas = data.provisionSysData;
        
        });
        
           scope.changeServiceType = function(serviceId){
        	   scope.serviceType;
        	for(var i in scope.serviceCodes){
        		
        		if(serviceId == scope.serviceCodes[i].id){
        			scope.serviceType=scope.serviceCodes[i].serviceType;
        		}
        	}

           };  
        scope.submit = function() {
        	
        	delete this.formData.serviceCodeData;
        	delete this.formData.statusData;
        	delete this.formData.serviceParameters;
        	delete this.formData.categories;
        	delete this.formData.provisionSysDatas;
        	delete this.formData.subCategories;
        	
            resourceFactory.serviceMappingResource.save(scope.formData,function(data){
            		location.path('/viewServiceMapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateServiceMappingController', [
    '$scope', 
    'ResourceFactory', 
    '$location', 
    mifosX.controllers.CreateServiceMappingController]).run(function($log) {
    $log.info("CreateServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
