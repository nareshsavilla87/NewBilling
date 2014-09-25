(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficeAdjustmentsController: function(scope, resourceFactory, routeParams, location,dateFilter,webStorage,$rootScope) {

        scope.formData = {};
        scope.officeId = routeParams.officeId;
        scope.officeName = webStorage.get("officeName");
        scope.start={};
        scope.start.date = new Date();
        
        resourceFactory.officeAdjustmentsTemplateResource.getAdjustments(function(data){
          scope.discountOptions = data.discountOptions;
          scope.data = data.data;
          scope.formData.adjustment_type = scope.discountOptions[0].discountType;
        });
        
        scope.submit = function() {
          this.formData.locale = $rootScope.locale.code;
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.adjustment_date = adjustmentDate;
         // this.formData.adjustment_type = "CREDIT";
          resourceFactory.officeAdjustmentsResource.postAdjustments({officeId : routeParams.officeId}, this.formData, function(data){
            location.path('/viewoffice/'+routeParams.officeId);
          });
        };

    }
  });
  mifosX.ng.application.controller('OfficeAdjustmentsController', ['$scope', 'ResourceFactory', '$routeParams', '$location','dateFilter','webStorage','$rootScope', mifosX.controllers.OfficeAdjustmentsController]).run(function($log) {
    $log.info("OfficeAdjustmentsController initialized");
  });
}(mifosX.controllers || {}));
