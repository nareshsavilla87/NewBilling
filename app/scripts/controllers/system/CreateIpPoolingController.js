(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateIpPoolingController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope) {
       
        scope.formData = {};
        scope.ipTypes=[];
        scope.ipAddressValidationErrorPattern = false;
        
        resourceFactory.ipPoolingTemplateResource.get(function(data) {
            
        	scope.ipTypes = data.codeValueDatas;
        	scope.formData.type = data.codeValueDatas[0].id;
                    
        });
        
        scope.ipValidate = function (newVal) {       
            if (
                newVal != '0.0.0.0' && newVal != '255.255.255.255' &&
                newVal.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/))
            {
            	scope.ipAddressValidationErrorPattern = false;
            } else {
                // Match attempt failed
            	scope.ipAddressValidationErrorPattern = true;
            }
        };
      
        scope.submit = function() {
			resourceFactory.ipPoolingResource.save(this.formData, function(data) {
				location.path('/ipPooling');
			});
		};
    }
  });
  mifosX.ng.application.controller('CreateIpPoolingController', [
     '$scope',
     'ResourceFactory', 
     '$location',
     '$http', 
     'dateFilter',
     'API_VERSION',
     '$rootScope', 
     mifosX.controllers.CreateIpPoolingController
     ]).run(function($log) {
    	 $log.info("CreateIpPoolingController initialized");
  });
}(mifosX.controllers || {}));
