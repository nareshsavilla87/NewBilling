RenewalOrderController = function(scope,RequestSender,routeParams,localStorageService,rootScope) {
		  
	scope.clientId = routeParams.clientId || "";
	var planId	   = routeParams.planId || "";
	var orderId	   = routeParams.orderId || "";
  	scope.planselectionTab = true;
  	
  scope.singlePlanPricingDatas = function(singlePlanData,isPlanActive){
	  var isActive = isPlanActive;
	  if(isActive == true){
		  scope.planId = singlePlanData.planId;
		  scope.selectedPlanId = singlePlanData.planId;
		  scope.pricingDatas = singlePlanData.pricingData || [];
	  }
	  else{
		  scope.pricingDatas = [];
		  scope.selectedPlanId = "";
	  }
	  
  };
  
  scope.isSelectedPlan = function(planId){
		return planId === scope.selectedPlanId;
	};
	
  if(rootScope.selfcare_sessionData){
	RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
	  var clientData = data || {};
	  var totalOrdersData = [];
	  RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
		  totalOrdersData = data;
		  
		  scope.plansData = [];
		  scope.clientOrdersData = [];
		  for(var j in totalOrdersData){
			  console.log(totalOrdersData[j].planId+"------"+planId);
				if((totalOrdersData[j].planId == planId) && (totalOrdersData[j].isPrepaid == 'Y')){
					scope.plansData.push(totalOrdersData[j]); 
					scope.singlePlanPricingDatas(scope.plansData[0],true);
					localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:orderId});
					break;
				}
			  }
	  });
   });
  }
  		
};

selfcareApp.controller('RenewalOrderController',['$scope',
                                                'RequestSender',
                                                '$routeParams',
                                                'localStorageService',
                                                '$rootScope',
                                                RenewalOrderController]);


