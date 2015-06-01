PaypalRecurringController = function(scope,RequestSender,location,localStorageService,routeParams,$timeout) {
 
		var screenName 		= routeParams.screenName||"";
		var clientId 		= routeParams.clientId||"";
		var planId 			= routeParams.planId||"";
		var priceId 		= routeParams.priceId||"";
		scope.price 		= routeParams.price||"";
		scope.emailId 		= routeParams.emailId||"";
		var contractId 		= routeParams.contractId||"";
		var selfcareAppUrl	= selfcareModels.selfcareAppUrl;
		
		scope.returnURL 	= selfcareAppUrl+"#/paypalrecurringsuccess/"+screenName+"/"+clientId+"/"+planId+"/"+priceId;
		
		var chargeCodeData = "";var orderId = null;var billingFrequency =null;
		localStorageService.get("chargeCodeData") ? (chargeCodeData = localStorageService.get("chargeCodeData").data,
													orderId = localStorageService.get("chargeCodeData").orderId,
													billingFrequency = localStorageService.get("chargeCodeData").billingFrequency):"";
			console.log(orderId);
		scope.period		= chargeCodeData.chargeDuration;
		scope.time			= chargeCodeData.chargeType[0];
		
		if(screenName == "changeorder"){
			scope.customValue   = { clientId:clientId,planId:planId,paytermCode:billingFrequency,
					contractPeriod:contractId,orderId:orderId};
		}else if(screenName == "renewalorder"){
			scope.customValue   = {clientId:clientId,planId:planId,paytermCode:billingFrequency,
						renewalPeriod:contractId,orderId:orderId,priceId:priceId};
		}else{
			scope.customValue   = { clientId:clientId,planId:planId,paytermCode:billingFrequency,contractPeriod:contractId};
		}
		
		var contractType = 0;
		var chargeType = 0;
		console.log("contractType**************>"+angular.lowercase(chargeCodeData.contractType));
		console.log("chargeType**************>"+angular.lowercase(chargeCodeData.chargeType));
    			switch (angular.lowercase(chargeCodeData.contractType)) {
							case "month(s)":
								contractType = 30;
								break;
							case "day(s)":
								contractType = 1;
								break;
							case "week(s)":
								contractType = 7;
								break;
							case "year(s)":
								contractType = 365;
								break;
							default:
								break;
					};
				switch (angular.lowercase(chargeCodeData.chargeType)) {
							case "month(s)":
								chargeType = 30;
								break;
							case "day(s)":
								chargeType = 1;
								break;
							case "week(s)":
								chargeType = 7;
								break;
							case "year(s)":
								chargeType = 365;
								break;
							default:
								break;
						};
						console.log("contractType-->"+contractType);
						console.log("contractDuration-->"+chargeCodeData.contractDuration);
						console.log("chargeType-->"+chargeType);
						console.log("chargeDuration-->"+chargeCodeData.chargeDuration);
				/*var srt =  Math.round(billFrequencyCode/(durationType*chargeCodeData.chargeDuration));*/
			scope.srt = (chargeCodeData.contractDuration * contractType) / (chargeType * chargeCodeData.chargeDuration);
			
			$timeout(function() {
				  $("#submitPaypalRecurringBtn").click();
			    }, 1000);
        	
        	        	
        };
        
selfcareApp.controller('PaypalRecurringController', ['$scope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  '$timeout',
                                                  PaypalRecurringController]);

