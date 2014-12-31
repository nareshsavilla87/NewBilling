VODEventsController = function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location) {
		  
		  scope.vodEventScreen = true;
		  scope.eventDetailsPreview = false;
		  scope.vodEventRedirectToDalpay = false;
		  scope.paymentGatewayName = 'korta';
		  scope.formData = {};
		  scope.planData = {};
		  scope.addressData = {};
		  scope.mediaDetails = [];
		  scope.mediaDatas = [];
		  var selfcareUserData = {};
		  
		  scope.totalAmount = 0;
		  
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  RequestSender.clientResource.get({clientId: clientDatas.clientId} , function(data) {
				  scope.formData = data;
				  scope.planData = clientDatas.clientOrdersData;
				  scope.addressData  = clientDatas.addressData;
				  selfcareUserData = data.selfcare;
				  scope.clientId = data.id;
				  
				  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType : scope.formData.categoryType},function(data){
					  scope.mediaDetails = data.mediaDetails;
				  });
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
		  };
		  
		  var hostName = selfcareModels.selfcareAppUrl;
		  
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
	      };
	      
		  scope.checkOutFun = function(){
			  
			  if(scope.mediaDatas.length != 0){
				  scope.vodEventScreen = false;
				  scope.eventDetailsPreview = true;
				  webStorage.add('form','eventbook');
				    //var host = window.location.hostname;
		    		//var portNo = window.location.port;
		    	  
				  scope.paymentGatewayFun('korta');
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
		  
		  scope.cancelDalpayBtnFun = function(){
			  scope.vodEventScreen = true;
			  scope.eventDetailsPreview = false;
			  scope.vodEventRedirectToDalpay = false;
		  };
    };
    
selfcareApp.controller('VODEventsController', ['$scope',
                                               'RequestSender',
                                               '$rootScope',
                                               '$http',
                                               'AuthenticationService',
                                               'webStorage',
                                               'HttpService',
                                               'SessionManager',
                                               '$location',
                                               VODEventsController]);
