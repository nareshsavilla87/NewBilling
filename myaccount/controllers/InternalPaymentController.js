InternalPaymentController = function(scope, routeParams, location, localStorageService,$timeout,RequestSender) {
	
	scope.formData = {};
	scope.isValueVoucher = false;
	scope.formData.clientId = routeParams.clientId;
	scope.screenName = routeParams.screenName;
	alert(scope.screenName);
	scope.clientId = routeParams.clientId;
	var planId = routeParams.planId || '';
	var priceId = routeParams.priceId || '';
	scope.formData.Amount = routeParams.amount;
	
	scope.pinNoValidationFun = function(id){
		 if(id){
			 RequestSender.VoucherResource.query({pinNumber:id},function(data){
				 scope.voucherArray = data;
				 if(scope.voucherArray.length===1){
					 //alert(scope.voucherArray.length);
					 scope.pinType =  scope.voucherArray[0].pinType;
					 scope.pinValue = scope.voucherArray[0].pinValue;
					 //alert(scope.pinType);
					 if(scope.pinType === 'VALUE'){
						 scope.errorStatus='';
						 if(scope.pinValue === scope.formData.Amount){
							 scope.isValueVoucher = true;
						 }else{
							 scope.isValueVoucher = false;
							 scope.errorStatus = "VoucherPin Value Greatethan or Equal to Plan Amount";
						 }
						 
					 }else{
						 scope.isValueVoucher = false;
						 alert("Please Go to Redemption Option");
					 }
				 }else{
					 scope.isValueVoucher = false;
					 scope.formData.pinNumber='';
					 scope.errorStatus = "Invalid Voucher Pin:"+id;
				 }
				 
			 });
		 }
	 };
	 
	 scope.submit = function(){
		 if(scope.isValueVoucher){
			 
			 RequestSender.redemptionResource.save(scope.formData,function(data){
				 localStorageService.add("paymentgatewayresponse", data);
				 alert(2);
				 if(scope.screenName === 'payment' || scope.screenName == 'payment'){
					 alert(scope.screenName);
					 location.path('/paymentgatewayresponse/'+scope.clientId);
				 }else{	
					 var pathUrl = "/orderbookingscreen/"+scope.screenName+"/"+scope.formData.clientId+"/"+planId+"/"+priceId;
					 location.path(pathUrl);
					
				 }
	          });
		 }
	 };
};
    
selfcareApp.controller('InternalPaymentController', ['$scope', 
                                                '$routeParams', 
                                                '$location', 
                                                'localStorageService', 
                                                '$timeout', 
                                                'RequestSender',
                                                InternalPaymentController]);
