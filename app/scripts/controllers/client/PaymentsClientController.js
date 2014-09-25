(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentsClientController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator,$rootScope) {

        scope.formData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
	    scope.displayName=clientData.displayName;
	    scope.statusActive=clientData.statusActive;
	    scope.hwSerialNumber=clientData.hwSerialNumber;
	    scope.accountNo=clientData.accountNo;
	    scope.officeName=clientData.officeName;
	    scope.balanceAmount=clientData.balanceAmount;
	    scope.currency=clientData.currency;
	    scope.imagePresent=clientData.imagePresent;
	    scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        //scope.datass = {};
        scope.start={};
         scope.start.date = new Date();
         scope.maxDate= scope.start.date;

        resourceFactory.paymentsTemplateResource.getPayments(function(data){
        	scope.payments = data;
            scope.data = data.data;
          scope.paymentTypeData=function(value){
            	
            	for(var i=0;i<scope.data.length;i++){
            		
            		if(scope.data[i].id==value){
            			scope.paymentType=scope.data[i].mCodeValue;
            		}
            	}
            };
        //  scope.formData.destinationOfficeId = scope.offices[0].id;  
        });

        scope.dbClick = function(){
        	return false;
        };
        
        scope.submit = function() {

        	scope.flag = true;
          this.formData.locale = $rootScope.locale.code;
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.paymentDate= paymentDate;
          var res1 = validator.validateZipCode(scope.formData.receiptNo);
        	  
          resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          },function(errData){
        	  scope.flag = false;
          });
          };
    }
  });
  mifosX.ng.application.controller('PaymentsClientController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService','$rootScope', mifosX.controllers.PaymentsClientController]).run(function($log) {
    $log.info("PaymentsClientController initialized");
  });
}(mifosX.controllers || {}));
