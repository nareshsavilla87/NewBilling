PaymentProcessController = function(scope,routeParams,RequestSender,localStorageService,location,modal){
	
	scope.screenName 		= routeParams.screenName;
	var priceDataId 		= routeParams.priceDataId;
	var planId 				= routeParams.planId;
	scope.price		 	 	= routeParams.price;
	var encrytionKey 		= selfcareModels.encriptionKey;
	
	
	var storageData			= localStorageService.get("storageData") ||"";
	var clientData 			= storageData.clientData;
	var totalOrdersData		= storageData.totalOrdersData;
	var orderId				= storageData.orderId;
	scope.clientId			= clientData.id;
	
		for(var i in totalOrdersData){
			if(totalOrdersData[i].planId == planId){
				for(var j in totalOrdersData[i].pricingData){
					if(totalOrdersData[i].pricingData[j].id == priceDataId){
						scope.planData = totalOrdersData[i].pricingData[j] || {};
						break;
					}
				}
			  break;
			}
		}
		
		if(localStorageService.get("clientTotalData")){
		  scope.paymentgatewayDatas = [];
		  RequestSender.paymentGatewayConfigResource.get(function(data) {
			  if(data.globalConfiguration){
				  for(var i in data.globalConfiguration){
					   if(data.globalConfiguration[i].enabled && data.globalConfiguration[i].name != 'is-paypal-for-ios'  
						   && data.globalConfiguration[i].name != 'is-paypal'){
						   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
					   }
				  }
				 scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?scope.paymentgatewayDatas[0].name :"";
				 scope.paymentGatewayFun(scope.paymentGatewayName);
			  }
		  });
		}
	
	var hostName = selfcareModels.selfcareAppUrl;
	  
	   scope.paymentGatewayFun  = function(paymentGatewayName){
			  scope.termsAndConditions = false;
			  var paymentGatewayValues = {};
			  for (var i in scope.paymentgatewayDatas){
				  if(scope.paymentgatewayDatas[i].name=='internalPayment'){
					  break;
				  } else if(scope.paymentgatewayDatas[i].name==paymentGatewayName){
					  paymentGatewayValues =  JSON.parse(scope.paymentgatewayDatas[i].value);
					  break;
				  }
				  
			  }
	     switch(paymentGatewayName){
	     
			case 'dalpay' :
					var url = paymentGatewayValues.url+'?mer_id='+paymentGatewayValues.merchantId+'&pageid='+paymentGatewayValues.pageId+'&item1_qty=1&num_items=1';
				scope.paymentURL =  url+"&cust_name="+clientData.displayName+"&cust_phone="+clientData.phone+"&cust_email="+clientData.email+"&cust_state="+clientData.state+""+				
				  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc="+scope.planData.planCode+"&item1_price="+scope.planData.price+"" + 	  				
				  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId;
					break;
					
			case 'korta' :
				
			    var kortaStorageData = {clientData :clientData,planId:planId,planData : scope.planData,screenName :scope.screenName,paymentGatewayValues:paymentGatewayValues};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(kortaStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				var token = clientData.selfcare.token;		    		
				if(token != null && token != "") scope.paymentURL = "#/kortatokenintegration?key="+encryptedData;		    		 
				else scope.paymentURL = "#/kortaintegration?key="+encryptedData;	    		
				break;
					
			case 'paypal' :
				var query = {clientId :scope.clientId,locale : "en",planCode : planId,contractPeriod : scope.planData.contractId,
							  paytermCode:scope.planData.billingFrequency,returnUrl:hostName, screenName:scope.screenName,orderId:orderId};
			
				scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name="+scope.planData.planCode+"&amount="+scope.planData.price+"" +	  	  				
				  	  "&custom="+JSON.stringify(query);
					break;
					
			case 'globalpay' :
				
				var globalpayStorageData = {clientData :clientData,planId:planId,screenName :scope.screenName,price :scope.planData.price,
											 priceId : scope.planData.id, globalpayMerchantId:paymentGatewayValues.merchantId};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(globalpayStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
				break;
			case 'neteller' :
				
				var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.planData.price,
									paytermCode:scope.planData.billingFrequency,planCode : planId,
									contractPeriod : scope.planData.contractId,screenName:scope.screenName,orderId : orderId};
				
				var encodeURINetellerData = encodeURIComponent(JSON.stringify(nettellerData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURINetellerData,encrytionKey).toString();
				scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
				break;
				
			case 'internalPayment' :
				scope.paymentURL =  "#/internalpayment/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId+"/"+scope.planData.price;
				break;
				
			default :
						break;
			}
		    	  		 	
		  };
	
	scope.finishBtnFun =function(){
  	  		  location.path("/orderbookingscreen/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId);
    };
    
    var TermsandConditionsController = function($scope,$modalInstance){
    	$scope.done = function(){
    		$modalInstance.dismiss('cancel');
    	};
    };
   
    scope.termsAndConditionsFun = function(){
		    modal.open({
				 templateUrl: 'termsandconditions.html',
				 controller: TermsandConditionsController,
				 resolve:{}
		    });
    };
    
};

selfcareApp.controller("PaymentProcessController",['$scope',
                                                   '$routeParams',
                                                   'RequestSender',
                                                   'localStorageService',
                                                   '$location',
                                                   '$modal',
                                                   PaymentProcessController]);