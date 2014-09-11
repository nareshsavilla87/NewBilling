(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  VODEventsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location) {
		  
		  scope.vodEventScreen = true;
		  scope.eventDetailsPreview = false;
		  scope.vodEventRedirectToDalpay = false;
		  scope.formData = {};
		  scope.planData = {};
		  scope.addressData = {};
		  scope.mediaDetails = [];
		  scope.mediaDatas = [];
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  scope.formData  = clientDatas.clientData;
			  scope.planData = clientDatas.clientOrdersData;
			  scope.addressData  = clientDatas.addressData;
		  }
		  scope.totalAmount = 0;
		  
		  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType : scope.formData.categoryType},function(data){
			  scope.mediaDetails = data.mediaDetails;
		  });
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
			  console.log(active);
			  if(active == true){
				  scope.totalAmount += mediaData.price;
				  scope.mediaDatas.push(mediaData);
			  }
			  else{
				  scope.totalAmount -=mediaData.price;
				  for(var media in scope.mediaDatas){
					  if(mediaData.mediaId == scope.mediaDatas[media].mediaId && mediaData.quality ==scope.mediaDatas[media].quality){
						  scope.mediaDatas.splice(media,1);
					  }
				  }
			  }
		  };
		  scope.checkOutFun = function(){
			  
			  if(scope.mediaDatas.length != 0){
				  scope.vodEventScreen = false;
				  scope.eventDetailsPreview = true;
				  webStorage.add('form','eventbook');
				    //var host = window.location.hostname;
		    		//var portNo = window.location.port;
		    	  var hostName = selfcare.models.selfcareAppUrl;
				  scope.URLForDalpay = selfcare.models.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&num_items=1&item1_desc="+scope.planData.planCode+"&item1_price="+scope.totalAmount+"&item1_qty=1&user1="+clientDatas.clientId+"&user2="+hostName+"&user3=eventdetailspreviewscreen";
			  }
		  };
		  
		  scope.dalpayBtnFun = function(){
			  scope.vodEventRedirectToDalpay = true;
			  console.log(scope.mediaDatas);
			  webStorage.add('eventData',scope.mediaDatas);
		  };
		  
		  scope.cancelDalpayBtnFun = function(){
			  scope.vodEventScreen = true;
			  scope.eventDetailsPreview = false;
			  scope.vodEventRedirectToDalpay = false;
		  };
    }
  });
  selfcare.ng.application.controller('VODEventsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location', selfcare.controllers.VODEventsController]);
}(selfcare.controllers || {}));
