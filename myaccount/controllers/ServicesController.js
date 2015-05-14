ServicesController = function(scope,RequestSender,localStorageService,location,paginatorService,$modal) {
		  
		  	scope.getOrdersData = function(offset, limit, callback) {
			  retrivingOrdersData.pageItems = [];
				  var itrCount = 0;
				  for (var i=offset;i<clientOrdersData.length;i++) {
					 itrCount += 1;
					 retrivingOrdersData.pageItems.push(clientOrdersData[i]);
					 if(itrCount==limit){
						 break;
					 }
			      }
				  callback(retrivingOrdersData);
		  	};
		  	
		  	var clientOrdersData =[]; var retrivingOrdersData = {};scope.ordersData = [];
		  	var completeOrdersData = [];
	  	  var clientData= localStorageService.get('clientTotalData');
	  	  function initialFunCall(){
	  		scope.screenName = "additionalorders";
		    if(clientData){
			  scope.clientId = clientData.id;
			  
			  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
				  clientOrdersData = data.clientOrders;
				  retrivingOrdersData.totalFilteredRecords = clientOrdersData.length;
				  scope.ordersData = paginatorService.paginate(scope.getOrdersData, 3);
				  
				  //new code for new ui
				  var totalOrdersData = []; 
				  RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
					  completeOrdersData = data;
					  totalOrdersData = completeOrdersData;
					  scope.plansData = [];
						  for(var i in clientOrdersData ){
							  totalOrdersData = _.filter(totalOrdersData, function(item) {
			                      return item.planCode != clientOrdersData[i].planCode;
			                  });
						  }
						  for(var j in totalOrdersData){
							if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
						  }
						  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData});
				  });
			  });
		    }
	  	  }initialFunCall();
		  
	 scope.packageSelectionFun = function(selectedPriceId,selectedOrderId,orderStatus){
		 scope.selectedPriceId = selectedPriceId;
		 scope.selectedOrderId = selectedOrderId;
		 if(angular.lowercase(orderStatus) == 'active'){
			 scope.screenName = "changeorder";var totalOrdersData = []; 
			 totalOrdersData = completeOrdersData;
			  for(var i in totalOrdersData){
				  for(var j in clientOrdersData){
					  
					  if(totalOrdersData[i].planId == clientOrdersData[j].pdid){
						  totalOrdersData[i].pricingData = _.filter(totalOrdersData[i].pricingData, function(item) {
							  return (item.planCode != clientOrdersData[j].planCode) &&
							  		  (item.duration != clientOrdersData[j].contractPeriod) &&
							  		  (item.price != clientOrdersData[j].price);
						  });
					  }
				  }
			  }
			  scope.plansData = [];
			  for(var j in totalOrdersData){
				if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
			  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedPriceId});
	 	}
		if(angular.lowercase(orderStatus) == 'disconnected'){
			scope.screenName = "renewalorder";var totalOrdersData = []; 
			totalOrdersData = completeOrdersData;
				  scope.plansData = [];
				  for(var j in totalOrdersData){
						if((totalOrdersData[j].planId == scope.selectedOrderId) && (totalOrdersData[j].isPrepaid == 'Y')){
							scope.plansData.push(totalOrdersData[j]); 
							break;
						}
					  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedPriceId});
		  }
	  };
	  
	  scope.revertRadioBtnFun = function(){
		  scope.selectedPriceId = '';
		  initialFunCall();
	  };
	       
       scope.durationSelectionFun = function(priceData,planId){
    	   scope.planId 	= planId;		scope.billingFrequency 	= priceData.billingFrequency;
    	   scope.priceId 	= priceData.id;	scope.price 			= priceData.price;
       };
	       
	      
	  scope.checkingRecurringStatus = function(planData){
		  if(scope.planId && scope.billingFrequency && scope.priceId && scope.price){
			RequestSender.recurringStatusCheckingResource.get({planId:scope.planId,billFrequency:scope.billingFrequency},function(data){
				if(scope.billingFrequency == data.billFrequencyCode && scope.price == data.price){
					if(scope.screenName == "additionalorders")localStorageService.add("chargeCodeData",{data:data});
					if(scope.screenName == "changeorder" || scope.screenName == "renewalorder")localStorageService.add("chargeCodeData",{data:data,orderId:scope.selectedPriceId});
					location.path( '/paymentprocess/'+scope.screenName+'/'+scope.priceId+'/'+scope.planId+'/'+scope.price);
				}
			});
		  }
			
		};
		
	 scope.viewOrder = function(orderId){
      	  $modal.open({
                templateUrl: 'vieworder.html',
                controller: vieworderPopupController,
                resolve:{
                	orderId : function(){
                		return orderId;
                	}
                }
            });
     };
    function vieworderPopupController($scope, $modalInstance,orderId) {
   	  
    	RequestSender.getSingleOrderResource.get({orderId: orderId},function(data){
    		$scope.orderData=data.orderData;
    		$scope.orderPricingDatas = data.orderPriceData;
			  if(data.orderData.isPrepaid == 'Y'){
				  $scope.orderData.isPrepaid="Pre Paid";
	            }else{
	            	$scope.orderData.isPrepaid="Post Paid";
	            }
		  });
   	  $scope.close = function () {$modalInstance.close('delete');};
         
     };
	       
 };

selfcareApp.controller('ServicesController', ['$scope',
                                              'RequestSender',
                                              'localStorageService',
                                              '$location',
                                              'PaginatorService',
                                              '$modal',
                                              ServicesController]);
