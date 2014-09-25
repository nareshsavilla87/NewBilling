(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTaxMappingController: function(scope, resourceFactory, routeParams,location,dateFilter,$rootScope) {
        scope.chargecodetaxs = [];
        scope.typetaxmapdatas = [];
        scope.priceRegionDatas = [];
        scope.start = {};
        scope.formData = {};
        scope.start.date = new Date();
        resourceFactory.taxmappingtemplateResource.getAlltaxmapping({'chargeCode':routeParams.chargeCode},function(data) {
          //  scope.chargecodetaxs = data.chargeCodeForTax;
            scope.typetaxmapdatas = data.taxMapData;
            scope.priceRegionDatas = data.priceRegionData;
            scope.formData=data;
        });
        
                
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
        	
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.startDate = reqDate;
            delete this.formData.typetaxmapdata;
            delete this.formData.priceRegionData;
            delete this.formData.taxMapData;
            resourceFactory.getTaxmappingResource.save({'taxId':routeParams.chargeCode},this.formData,function(data){
            		location.path('/viewtaxmapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateTaxMappingController', ['$scope', 'ResourceFactory','$routeParams','$location','dateFilter','$rootScope', mifosX.controllers.CreateTaxMappingController]).run(function($log) {
    $log.info("CreateTaxMappingController initialized");
  });
}(mifosX.controllers || {}));
