(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreditDistributionController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator,route,$modal) {

        scope.formData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
	    scope.displayName=clientData.displayName;
	    scope.hwSerialNumber=clientData.hwSerialNumber;
	    scope.statusActive=clientData.statusActive;
	    scope.accountNo=clientData.accountNo;
	    scope.officeName=clientData.officeName;
	    scope.balanceAmount=clientData.balanceAmount;
	    scope.currency=clientData.currency;
	    scope.imagePresent=clientData.imagePresent;
	    scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        
        scope.showPaymentsDetails = false;
        scope.showInvoiceDetails = false;
        scope.invoiceDatas = [];
        scope.paymentDatas = [];
        
        var selectedAvailAmount = [];
        var prevAvailAmountArray =[];
        var paymentAmount;
        var paymentId;
        var paymentIndex=0;
        var payAvailAmount = 0;
        scope.creditdistributions = [];
        
       resourceFactory.creditDistributionTemplateResource.get({clientId : routeParams.id},function(data){
    		scope.invoiceDatas = data.invoiceDatas;
    		scope.paymentDatas = data.paymentDatas;
    	});
        
        scope.showPayments = function(){
        	scope.showPaymentsDetails = ! scope.showPaymentsDetails;
        	scope.showInvoiceDetails = false;
        	
        };
        
        scope.seletedPayment = function(id,amount,availableAmount,index){
        	$('.unCheck').prop('checked',false);
        	scope.creditdistributions = [];
        	scope.showInvoices = true;
        	scope.showInvoiceDetails=false; 
        	selectedAvailAmount.push({availAmount : availableAmount,index : index});
           if(selectedAvailAmount.length-1){
        	   var prevIndex = selectedAvailAmount[selectedAvailAmount.length-2].index;
        	   var preAvailAmount = selectedAvailAmount[selectedAvailAmount.length-2].availAmount;
        	   scope.paymentDatas[prevIndex].availAmount = preAvailAmount;
           }
           if(selectedAvailAmount.length == 3)
        	   selectedAvailAmount.shift();
          
        	paymentId = id;
        	paymentAmount = amount;
        	payAvailAmount = availableAmount;
        	paymentIndex=index;
        	prevAvailAmountArray = [];
        };
        
        scope.selectedInvoices = function(invoiceId,amount,active,index){
        	
        	if(active == true){
        		if(scope.paymentDatas[paymentIndex].availAmount == 0){
        			$('#'+invoiceId).prop('checked',false);
        			
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}else if(amount >= payAvailAmount){
        			prevAvailAmountArray.push({id : invoiceId,amount : scope.paymentDatas[paymentIndex].availAmount});
            		console.log(prevAvailAmountArray);
        			paymentAmount = scope.paymentDatas[paymentIndex].availAmount;
        			scope.paymentDatas[paymentIndex].availAmount =0;
        		    scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : paymentAmount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : "en"
						
        				});
        			}
        		else{
        			prevAvailAmountArray.push({id : invoiceId,amount : amount});
            		console.log(prevAvailAmountArray);
            		scope.paymentDatas[paymentIndex].availAmount -=amount;
        			
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : amount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : "en"
						
        				});
        		}
        		if(scope.paymentDatas[paymentIndex].availAmount != 0)
        			payAvailAmount -= amount;
        	}
        	else{
        		  for(var i in prevAvailAmountArray){
        			  if(prevAvailAmountArray[i].id==invoiceId){
        				  
        				  if(scope.paymentDatas[paymentIndex].availAmount == 0)
          					payAvailAmount = prevAvailAmountArray[i].amount;
          				  else
          					  payAvailAmount += prevAvailAmountArray[i].amount;
        				  
        				  scope.paymentDatas[paymentIndex].availAmount +=prevAvailAmountArray[i].amount;
        				  break;
        			  }
        		  }
        		  prevAvailAmountArray = _.filter(prevAvailAmountArray, function(item) {
                      return item.id != invoiceId;
                  });
        		  console.log(prevAvailAmountArray);
        		scope.creditdistributions = _.filter(scope.creditdistributions, function(item) {
                    return item.invoiceId != invoiceId;
               });
        	}
        };
        var alertController = function ($scope, $modalInstance) {
      	  $scope.approve = function () {
      		  $modalInstance.close('delete');
            };
        };
        scope.submit = function(){
        	scope.avialableAmount = scope.paymentDatas[paymentIndex].availAmount; 
        	scope.formData.avialableAmount = scope.avialableAmount;
        	scope.formData.paymentId = paymentId;
        	scope.formData.locale= "en",
        	scope.formData.creditdistributions = scope.creditdistributions;
        	scope.avialableAmount=null;
        	resourceFactory.creditDistributionResource.save({clientId : routeParams.id},scope.formData,function(data){
        		location.path('/viewclient/'+routeParams.id);
        	});
        };
	  }
  });
  mifosX.ng.application.controller('CreditDistributionController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService','$route','$modal', mifosX.controllers.CreditDistributionController]).run(function($log) {
    $log.info("CreditDistributionController initialized");
  });
}(mifosX.controllers || {}));