(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditServiceMappingController: function(scope, routeParams, resourceFactory, location) {
        scope.serviceCodes = [];
        scope.statusDatas=[];

         resourceFactory.serviceMappingResource.get({serviceMappingId: routeParams.id, template: 'true'} , function(data) {
            scope.serviceCodes = data.serviceCodeData;
            scope.statusDatas=data.statusData;
            scope.formData=data;
            scope.serviceMappingId=routeParams.id;
            scope.categories=data.categories;
            scope.subCategories=data.subCategories;
        });
        
        scope.submit = function() {	
               scope.formData.serviceId=this.formData.id;
               delete this.formData.serviceCodeData;
               delete this.formData.serviceCode;
               delete this.formData.id;
               delete this.formData.statusData;
               delete this.formData.categories;
               delete this.formData.subCategories;
               resourceFactory.serviceMappingResource.update({'serviceMappingId': routeParams.id},scope.formData,function(data){
               location.path('/viewServiceMapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditServiceMappingController', [
   '$scope', 
   '$routeParams', 
   'ResourceFactory', 
   '$location', 
    mifosX.controllers.EditServiceMappingController]).run(function($log) {
    $log.info("EditServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
