AddEventsController = function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,localStorageService,modal,dateFilter) {
		  
		  scope.vodEventScreen = true;
		  scope.eventDetailsPreview = false;
		  scope.vodEventRedirectToDalpay = false;
		  scope.paymentGatewayName = 'korta';
		  scope.formData = {};
		  scope.planData = {};
		  scope.addressData = {};
		  scope.mediaDetails = [];
		  
		  var selfcareUserData = {};
		  scope.totalAmount = 0;
		  
		  var clientData = {};
		  if(localStorageService.get("clientTotalData")){
			  clientData  = localStorageService.get("clientTotalData");
			  scope.clientId = clientData.id;
				  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType :clientData.categoryType},function(data){
					  scope.mediaDetails = data.mediaDetails;
				  });
		  }
		  /*scope.selectedEventsFun = function(id,eventName,price,quality,active){
			  console.log(active);
			  if(active == true){
				  scope.totalAmount += price;
				  scope.mediaDatas.push({'id':id,'eventPrice':price,'eventName':eventName,'quality':quality});
			  }
			  else{
				  scope.totalAmount -=price;
				  scope.mediaDatas = _.filter(scope.mediaDatas, function(item) {
                      return item.id != id;
                  });
			  }
		  };*/
		  scope.mediaDatas = [];
		  scope.selectedEventsFun = function(mediaData,active){
			  if(active == true){
				  scope.totalAmount += mediaData.price;
				  scope.mediaDatas.push(mediaData);
			  }
			  else{
				  scope.totalAmount -=mediaData.price;
				  for(var media in scope.mediaDatas){
					  if(mediaData.mediaId == scope.mediaDatas[media].mediaId && mediaData.quality ==scope.mediaDatas[media].quality&& mediaData.optType == scope.mediaDatas[media].optType){
						  scope.mediaDatas.splice(media,1);
					  }
				  }
			  }
			  console.log(scope.mediaDatas);
		  };
		  
		  /*var hostName = selfcareModels.selfcareAppUrl;
		  
		  scope.paymentGatewayFun  = function(paymentGatewayName){
	    	  scope.paymentGatewayName = paymentGatewayName;
	    	  
	    	  if(paymentGatewayName == 'dalpay'){
	    		  scope.URLForDalpay = selfcare.models.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.state+"&item1_desc="+scope.mediaDatas.length+" VOD Event/s&item1_price="+scope.totalAmount+"&user1="+scope.clientId+"&user2="+hostName+"&user3=eventdetailspreviewscreen"; 
	    	  }else if(paymentGatewayName == 'korta'){
	    		  var token = selfcareUserData.token;
	    		  if(token != null && token != ""){
	    			  scope.URLForDalpay = "#/kortatokenpayment/0/0";
	    		  }else{
	    			  scope.URLForDalpay = "#/kortaIntegration/0/0";
	    		  }
	    	  };
	      };*/
		  
		  /*var storageData			= localStorageService.get("storageData") ||"";
			var clientData 			= storageData.clientData;
			scope.clientId			= clientData.id;*/
	      
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
					  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/addingEvents"+scope.clientId+"/1/1";
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
	      
		  scope.checkOutFun = function(){
			  
			  if(scope.mediaDatas.length != 0){
				  scope.vodEventScreen = false;
				  scope.eventDetailsPreview = true;
				  pgFun();
				    //var host = window.location.hostname;
		    		//var portNo = window.location.port;
				  ///paymentprocess/:screenName/:priceDataId/:planId/:price
		    	  //location.path("/paymentprocess/addEventScreen/:priceDataId/:planId/:price");
				  //scope.paymentGatewayFun('korta');
				  /*scope.URLForDalpay = selfcare.models.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&num_items=1&item1_desc=VOD Event&item1_price="+scope.totalAmount+"&item1_qty=1&user1="+scope.clientId+"&user2="+hostName+"&user3=eventdetailspreviewscreen";*/
			  }
		  };
		  
		  scope.dalpayBtnFun = function(){
			  scope.vodEventRedirectToDalpay = true;
			  webStorage.add('eventData',scope.mediaDatas);
			  webStorage.add('hwSerialNumber',scope.formData.hwSerialNumber);
			  webStorage.add('VODTotalAmount',scope.totalAmount);
		  };
		  
		  scope.subscribeBtnFun = function(){
			  webStorage.add('eventData',scope.mediaDatas);
			  webStorage.add('hwSerialNumber',scope.formData.hwSerialNumber);
			  location.path("/eventdetailspreviewscreen");
		  };
		  
		  scope.subscribeBtnFun = function(){
			  webStorage.add('eventData',scope.mediaDatas);
			  webStorage.add('hwSerialNumber',scope.formData.hwSerialNumber);
			  location.path("/eventdetailspreviewscreen");
		  };
		  
		  scope.cancelBtnFun = function(){
			  scope.vodEventScreen = true;
			  scope.eventDetailsPreview = false;
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
