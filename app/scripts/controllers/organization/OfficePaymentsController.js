(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficePaymentsController: function(scope,resourceFactory, routeParams, location,dateFilter,webStorage) {

        scope.formData = {};
        scope.officeId = routeParams.officeId;
        scope.officeName = webStorage.get("officeName");
        scope.start={};
        scope.start.date = new Date();
        
        resourceFactory.officePaymentsTemplateResource.getPayments(function(data){
        	scope.payments = data;
            scope.data = data.data;
          scope.paymentTypeData=function(value){
            	
            	for(var i=0;i<scope.data.length;i++){
            		
            		if(scope.data[i].id==value){
            			scope.paymentType=scope.data[i].mCodeValue;
            		}
            	}
            };
        });
        
        scope.submit = function() {

        	scope.flag = true;
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.paymentDate= paymentDate;
          console.log(this.formData);
          //var res1 = validator.validateZipCode(scope.formData.receiptNo);
        	  
          resourceFactory.officePaymentsResource.postPayments({officeId : routeParams.officeId}, this.formData, function(data){
            location.path('/viewoffice/'+routeParams.officeId);
          });
          };
    }
  });
  mifosX.ng.application.controller('OfficePaymentsController', ['$scope', 'ResourceFactory', '$routeParams', '$location','dateFilter','webStorage', mifosX.controllers.OfficePaymentsController]).run(function($log) {
    $log.info("OfficePaymentsController initialized");
  });
}(mifosX.controllers || {}));
