(function(module) {
  mifosX.controllers = _.extend(module, {
    CreatePriceController: function(scope, routeParams, resourceFactory, location) {
        
    	scope.chargeDatas = [];
        scope.chargevariants = [];
        scope.discountdatas = [];
        scope.priceRegionDatas = [];
        scope.serviceDatas=[];
        
        resourceFactory.priceTemplateResource.get({planId: routeParams.id} , function(data) {
        	 scope.formData=data;
        	scope.chargeDatas = data.chargeData;
            scope.chargevariants = data.chargevariant;
            scope.discountdatas = data.discountdata;
            scope.priceRegionDatas = data.priceRegionData;
            scope.subscriptiondata = data.contractPeriods;
            scope.serviceDatas = data.serviceData;
            scope.serviceDatas.push({"id":0,"serviceCode":"none","serviceDescription":"None"});
            
            
        });
        scope.submit = function() {
             
        	 delete this.formData.serviceData;
        	 delete this.formData.chargeData;
        	 delete this.formData.discountdata;
        	 delete this.formData.planId;
        	 delete this.formData.chargeVariantId;
        	 delete this.formData.priceRegionData;
        	 delete this.formData.contractPeriods;
        	 this.formData.locale = 'en';
        	 resourceFactory.priceResource.save({'planId':routeParams.id},this.formData,function(data){
                 location.path('/viewprice/' + data.resourceId+'/'+routeParams.id);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.CreatePriceController]).run(function($log) {
    $log.info("CreatePriceController initialized");
  });
}(mifosX.controllers || {}));
