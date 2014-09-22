(function(module) {
  mifosX.controllers = _.extend(module, {
	  PayInvoiceController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator,route,$modal,$rootScope,$locale) {

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
         
         scope.invoiceDatas = [];
         scope.showInvoiceDetails=false;
         scope.selectAccount = false;
         scope.selectInvoice = false;
         angular.copy('is', $locale);
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
        });
        resourceFactory.payInvoiceTemplateResource.getPayInvoices({invoiceId : routeParams.id},function(data){
        		scope.invoiceDatas = data;
        	});
        scope.selectedAccount = function(){
        	$("#amountPaid").removeAttr("readonly");
        	delete this.formData.amountPaid;

        	scope.showInvoiceDetails == false ? scope.showInvoiceDetails = false : scope.showInvoiceDetails = false;
        	scope.selectAccount = true; 
        	scope.selectInvoice = false;  
        };
        scope.selectedInvoice = function(){
        	delete this.formData.amountPaid;
        	$("#amountPaid").attr("readonly","readonly");
        	delete this.formData.amount;
        	scope.selectInvoice = true; 
        	scope.selectAccount = false; 
        };
        scope.amountField = function(amount,dueAmount){
        	scope.formData.amountPaid = amount;
        	if(amount > dueAmount){
        		$modal.open({
       			 templateUrl: 'alert.html',
       			 controller: alertController,
       			 resolve:{}
       		 });
        		 scope.formData.amountPaid = dueAmount;
         		scope.formData.amount=dueAmount;
        }
        	
        	
        };
        var alertController = function ($scope, $modalInstance) {
        	  $scope.approve = function () {
        		  $modalInstance.close('delete');
              };
          };
        scope.seletedRecord = function(id){
        	delete this.formData.amount;
        	delete this.formData.amountPaid;
        	scope.value = id;
        	scope.invoiceId = id;
        };
        
        scope.submitAccount = function() {

            this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = "dd MMMM yyyy";
        	var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.paymentDate= paymentDate;
            delete this.formData.amount;
            delete this.formData.invoiceId;
            var res1 = validator.validateZipCode(scope.formData.receiptNo);
            resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
              location.path('/viewclient/'+routeParams.id);
          	  //route.reload();
            });
         };
            
        scope.submitInvoice = function() {

          this.formData.locale = $rootScope.locale.code;
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.paymentDate= paymentDate;
          var res1 = validator.validateZipCode(scope.formData.receiptNo);
          this.formData.invoiceId =	 scope.invoiceId ; 
          delete this.formData.amount;
          resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
        	  //route.reload();
        	  location.path('/viewclient/'+routeParams.id);
          });
        };
    }
  });
  mifosX.ng.application.controller('PayInvoiceController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService','$route','$modal','$rootScope','$locale', mifosX.controllers.PayInvoiceController]).run(function($log) {
    $log.info("PayInvoiceController initialized");
  });
}(mifosX.controllers || {}));
