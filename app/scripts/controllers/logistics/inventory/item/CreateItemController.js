(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateItemController: function(scope,webStorage, resourceFactory, location) {
    	 scope.itemClassDatas = [];
         scope.unitDatas = [];
         scope.chargesDatas = [];
         scope.formData = [];
        resourceFactory.itemTemplateResource.get(function(data) {
        	scope.itemClassDatas = data.itemClassData;
            scope.unitDatas = data.unitData;
            scope.chargesDatas = data.chargesData;
            scope.formData = {
            		itemClassData : scope.itemClassDatas[0].id,
                    unitData : scope.unitDatas[0].id,
                    chargesData : scope.chargesDatas[0].id,
                    };
        });
        
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "items" });
	       };
                
        scope.submit = function() {
        	delete this.formData.unitData;
        	delete this.formData.chargesData;
        	delete this.formData.itemClassData;
        	this.formData.locale = 'en';
            resourceFactory.itemResource.save(this.formData,function(data){
            location.path('/viewitem/'+data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateItemController', ['$scope','webStorage', 'ResourceFactory', '$location', mifosX.controllers.CreateItemController]).run(function($log) {
    $log.info("CreateItemController initialized");
  });
}(mifosX.controllers || {}));
