PrepaidPaymentController = function(scope,routeParams,RequestSender,localStorageService,location,modal){
	
	
	//getting Payment Gateway names form constans.js
	var  kortaPG			=	paymentGatewayNames.korta || "";
	var  dalpayPG			=	paymentGatewayNames.dalpay || "";
	var  globalpayPG		=	paymentGatewayNames.globalpay || "";
	var  paypalPG			=	paymentGatewayNames.paypal || "";
	var  netellerPG			=	paymentGatewayNames.neteller || "";
	var  internalPaymentPG	=	paymentGatewayNames.internalPayment || "";
	var  two_checkoutPG		=	paymentGatewayNames.two_checkout || "";
	var  interswitchPG		=	paymentGatewayNames.interswitch || "";
	
	//getting locale value
	 var temp 				= localStorageService.get('localeLang')||"";
	 scope.optlang 			= temp || selfcareModels.locale;
	
	var clientData			= localStorageService.get("clientTotalData");
	scope.clientId			= clientData.id;
	scope.planData			= {};
	var encrytionKey 		= selfcareModels.encriptionKey;
	scope.amountEmpty 		= true;
	scope.isRedirecting 	= false;
	
	  scope.paymentgatewayDatas = [];
	  RequestSender.paymentGatewayConfigResource.get(function(data) {
		  if(data.globalConfiguration){
			  for(var i in data.globalConfiguration){
				   if(data.globalConfiguration[i].enabled && data.globalConfiguration[i].name != 'is-paypal-for-ios'  
					   && data.globalConfiguration[i].name != 'is-paypal'){
					   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
				   }
			  }
			  scope.paymentgatewayDatas.length==0 ?scope.paymentGatewayName="" : "";
		  }
	  });
	
	var hostName = selfcareModels.selfcareAppUrl;
	
	//this function calls when comeout from amount field
	scope.amountFieldFun = function(amount){
		if(amount){
			if(amount<=0 || isNaN(amount)){
				scope.amountEmpty = true;
				delete scope.planData.price;
				delete scope.planData.planCode;
				delete scope.planData.id;
				delete scope.amount;
				if(amount <=0)alert("Amount Must be Greater than Zero");
				if(isNaN(amount))alert("Please enter digits only");
			}else{
				scope.amountEmpty 		= false;
				scope.planData.price 	= amount;
				scope.planData.planCode = 'Pay';
				scope.planData.id 		= 0;
				scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?scope.paymentgatewayDatas[0].name :"";
				scope.paymentGatewayFun(scope.paymentGatewayName);
			}
		}else{
			scope.amountEmpty 		= true;
			delete scope.planData.price;delete scope.planData.planCode;delete scope.planData.id;delete scope.amount;
			if(amount==0) alert("Amount Must be Greater than Zero");
		}
	};
	
	//this fun call when user select a particular PW 
	scope.paymentGatewayFun  = function(paymentGatewayName){
		localStorageService.remove("N_PaypalData");
			  scope.paymentGatewayName = paymentGatewayName;
			  scope.termsAndConditions = false;
			  var paymentGatewayValues = {};
			  for (var i in scope.paymentgatewayDatas){
			    if(scope.paymentgatewayDatas[i].name==paymentGatewayName && scope.paymentgatewayDatas[i].name !='internalPayment'){
				  paymentGatewayValues =  JSON.parse(scope.paymentgatewayDatas[i].value);
				  break;
			    }
				  
			  }
	     switch(paymentGatewayName){
	     
			case dalpayPG :
					var url = paymentGatewayValues.url+'?mer_id='+paymentGatewayValues.merchantId+'&pageid='+paymentGatewayValues.pageId+'&item1_qty=1&num_items=1';
				scope.paymentURL =  url+"&cust_name="+clientData.displayName+"&cust_phone="+clientData.phone+"&cust_email="+clientData.email+"&cust_state="+clientData.state+""+				
				  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc="+scope.planData.planCode+"&item1_price="+scope.planData.price+"" + 	  				
				  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/payment/"+scope.clientId+"/"+0+"/"+0;
					break;
					
			case kortaPG :
				
			    var kortaStorageData = {clientData :clientData,planId:0,planData : scope.planData,screenName :'payment',paymentGatewayValues:paymentGatewayValues};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(kortaStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				var token = clientData.selfcare.token;		    		
				if(token != null && token != "") scope.paymentURL = "#/kortatokenintegration?key="+encryptedData;		    		 
				else scope.paymentURL = "#/kortaintegration?key="+encryptedData;	    		
				break;
					
			case paypalPG :
				/*var query = {clientId :scope.clientId,returnUrl:hostName,screenName :'payment'};*/
				var query = hostName;
				localStorageService.add("N_PaypalData",{clientId:scope.clientId,screenName :'payment'});
				scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name="+scope.planData.planCode+"&amount="+scope.planData.price+"" +	  	  				
				  	  "&custom="+query;
					break;
					
			case globalpayPG :
				var globalpayStorageData = {clientData :clientData,planId:0,screenName :'payment',price :scope.planData.price,
											 priceId : 0, globalpayMerchantId:paymentGatewayValues.merchantId};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(globalpayStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
				break;
				
			case netellerPG :
				var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.planData.price,screenName:'payment'};
				var encodeURINetellerData = encodeURIComponent(JSON.stringify(nettellerData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURINetellerData,encrytionKey).toString();
				scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
				break;
				
			case internalPaymentPG :
				scope.paymentURL =  "#/internalpayment/"+'payment'+"/"+scope.clientId+"/"+0+"/"+0+"/"+scope.planData.price;
				break;
				
			case two_checkoutPG :
				localStorageService.add("twoCheckoutStorageData",{screenName:"payment",clientId:scope.clientId,
				 											planId:0,priceId:0});
				var zipCode = clientData.zip || clientData.city || "";
				scope.paymentURL =  "https://sandbox.2checkout.com/checkout/purchase?sid="+paymentGatewayValues+"&mode=2CO&li_0_type=product&li_0_name=invoice&li_0_price="+scope.planData.price
									+"&card_holder_name="+clientData.displayName+"&street_address="+clientData.addressNo+"&city="+clientData.city+"&state="+clientData.state+"&zip="+zipCode
									+"&country="+clientData.country+"&email="+clientData.email+"&quantity=1";
				
				break;
				
			case interswitchPG :
				
				scope.paymentURL =  "#/interswitchintegration/"+'payment'+"/"+scope.clientId+"/"+0+"/"+0+"/"+scope.planData.price+"/"+paymentGatewayValues.productId+"/"+paymentGatewayValues.payItemId;
				
				break;
					
			default : break;
			}
		    	  		 	
		  };
    
    var TermsandConditionsController = function($scope,$modalInstance){
    	var termsAndConditions = "termsAndConditions_"+scope.optlang+"_locale";
    	if(scope.optlang){
    		(scope.paymentGatewayName == kortaPG)?
    			$scope.termsAndConditionsText = korta[termsAndConditions] 	 		: (scope.paymentGatewayName == dalpayPG)?
    			$scope.termsAndConditionsText = dalpay[termsAndConditions] 	 		: (scope.paymentGatewayName == globalpayPG)?
    			$scope.termsAndConditionsText = globalpay[termsAndConditions] 		: (scope.paymentGatewayName == paypalPG)?
    			$scope.termsAndConditionsText = paypal[termsAndConditions] 	 		: (scope.paymentGatewayName == netellerPG)?
    			$scope.termsAndConditionsText = neteller[termsAndConditions] 	 	: (scope.paymentGatewayName == internalPaymentPG)?
    		    $scope.termsAndConditionsText = internalPayment[termsAndConditions] : (scope.paymentGatewayName == two_checkoutPG)?
    			$scope.termsAndConditionsText = two_checkout[termsAndConditions]	: (scope.paymentGatewayName == interswitchPG)?
    			$scope.termsAndConditionsText = interswitch[termsAndConditions]		: $scope.termsAndConditionsText = selectOnePaymentGatewayText[scope.optlang];
    	}
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

selfcareApp.controller("PrepaidPaymentController",['$scope',
                                                   '$routeParams',
                                                   'RequestSender',
                                                   'localStorageService',
                                                   '$location',
                                                   '$modal',
                                                   PrepaidPaymentController]);