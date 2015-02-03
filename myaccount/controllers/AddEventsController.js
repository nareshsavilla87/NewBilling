AddEventsController = function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,localStorageService,modal,dateFilter) {
		  
		  scope.vodEventScreen = true;
		  scope.eventDetailsPreview = false;
		  scope.formData = {};
		  scope.planData = {};
		  scope.addressData = {};
		  
		  var clientData = {};
		  if(localStorageService.get("clientTotalData")){
			  clientData  = localStorageService.get("clientTotalData");
			  scope.clientId = clientData.id;
			  scope.mediaDetails = [];
				  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType :clientData.categoryType},function(data){
					  scope.mediaDetails = data.mediaDetails;
				  });
		  }
		  scope.mediaDatas = [];scope.totalAmount = 0;
		  scope.selectedEventsFun = function(mediaData,active){
			  if(active == true){
				  scope.totalAmount += mediaData.price;
				  scope.mediaDatas.push(mediaData);
			  }
			  else{
				  scope.totalAmount -=mediaData.price;
				  for(var i in scope.mediaDatas){
					  if(scope.mediaDatas[i].mediaId == mediaData.mediaId && scope.mediaDatas[i].quality == mediaData.quality &&
                      	   scope.mediaDatas[i].optType == mediaData.optType && scope.mediaDatas[i].price == mediaData.price &&
                      	   scope.mediaDatas[i].eventId == mediaData.eventId && scope.mediaDatas[i].mediaTitle == mediaData.mediaTitle){
						  scope.mediaDatas.splice(i,1);
					  }
				  }
			  }
		  };
	      
	  function pgFun (){
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
	  }
	  
	  scope.checkOutFun = function(){
		  
		  if(scope.mediaDatas.length != 0){
			  scope.vodEventScreen = false;
			  scope.eventDetailsPreview = true;
			  pgFun();
			    
		  }
	  };
		  
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
					  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc=AddingEvents&item1_price="+scope.totalAmount+"" + 	  				
					  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/vod"+scope.clientId+"/1/1";
						break;
						
				case 'korta' :
					
				    var kortaStorageData = {clientData :clientData,planId:planId,planData : scope.planData,screenName :"addingEvents",paymentGatewayValues:paymentGatewayValues};	
				    var encodeURIComponentData = encodeURIComponent(JSON.stringify(kortaStorageData));
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
					
					var token = clientData.selfcare.token;		    		
					if(token != null && token != "") scope.paymentURL = "#/kortatokenintegration?key="+encryptedData;		    		 
					else scope.paymentURL = "#/kortaintegration?key="+encryptedData;	    		
					break;
						
				case 'paypal' :
					var query = {clientId :scope.clientId,eventId : scope.mediaDatas[0].eventId,
							optType : scope.mediaDatas[0].optType,formatType : scope.mediaDatas[0].quality,
 							deviceId : clientData.hwSerialNumber,returnUrl:hostName, screenName:"vod"};
				
					scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name=addingevents&amount="+scope.totalAmount+"" +	  	  				
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
					
					var nettellerData = {clientId:scope.clientId,currency:"EUR",total_amount:scope.planData.price,
										paytermCode:scope.planData.billingFrequency,planCode : planId,
										contractPeriod : scope.planData.contractId,locale:"en",source:'neteller',
										screenName:scope.screenName,orderId : orderId};
					
					var encodeURINetellerData = encodeURIComponent(JSON.stringify(nettellerData));
					var encryptedData = CryptoJS.AES.encrypt(encodeURINetellerData,encrytionKey).toString();
					scope.paymentURL = "#/neteller/"+priceDataId+"?key="+encryptedData;
					break;
					
				case 'internalPayment' :
					scope.paymentURL =  "#/internalpayment/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId+"/"+scope.planData.price;
					break;
					
				default :
							break;
				}
			    	  		 	
			  };
			  
		   scope.subscribeBtnFun =function(){
			   
			  	 scope.eventSavedOneByOneFun = function(val){
					 RequestSender.eventsResource.save(scope.eventFormData[val],function(data){
						 if(val == scope.eventFormData.length-1){
							 location.path('/services');
						 }else{
							 val += 1;
						 	scope.eventSavedOneByOneFun(val);
					 	 }
					 });
				 };
			 
				 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
				 scope.eventFormData = [];
				 for(var i in scope.mediaDatas) {
					 
						 scope.eventFormData[i] = {
							 							eventId 		: scope.mediaDatas[i].eventId,
							 							optType 		: scope.mediaDatas[i].optType,
							 							formatType 		: scope.mediaDatas[i].quality,
							 							clientId 		: scope.clientId,
							 							locale 			: 'en',
							 							eventBookedDate : reqDate,
							 							dateFormat 		: 'dd MMMM yyyy',
							 							deviceId 		: clientData.hwSerialNumber
						 							};
					 if(i == scope.mediaDatas.length-1){
						 scope.eventSavedOneByOneFun(0);
					 }
				 }
		    };
	    
		  scope.cancelBtnFun = function(){
			  scope.vodEventScreen = true;
			  scope.eventDetailsPreview = false;
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
    
selfcareApp.controller('AddEventsController', ['$scope',
                                               'RequestSender',
                                               '$rootScope',
                                               '$http',
                                               'AuthenticationService',
                                               'webStorage',
                                               'HttpService',
                                               'SessionManager',
                                               '$location',
                                               'localStorageService',
                                               '$modal',
                                               'dateFilter',
                                               AddEventsController]);
