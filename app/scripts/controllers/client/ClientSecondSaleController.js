(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ClientSecondSaleController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.id;
			  scope.formData = {};
			  scope.unitsValue = "";
			  scope.walletConfig = webStorage.get('is-wallet-enable');
			  var clientData = webStorage.get('clientData');
			  scope.hwSerialNumber=clientData.hwSerialNumber;
			    scope.displayName=clientData.displayName;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.hwSerialNumber=clientData.hwSerialNumber;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
			    scope.categoryType=clientData.categoryType;
		        scope.email=clientData.email;
		        scope.phone=clientData.phone;
		        if(scope.imagePresent){
		        scope.image=clientData.image;
		        }
		        scope.itemId=null;
		        scope.data={};
		        scope.maxDate = new Date();
		        //scope.formData.chargeCode="NONE";
		        scope.truefalse = true;
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: routeParams.id}, function(data) {
	            
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.formData.discountId = scope.discountMasterDatas[0].id;
	            scope.onetimesales=data;
	            scope.date= {};
	            scope.date.saleDate = new Date();
	            scope.officesDatas=data.officesData;
	            for(var i=0;i<scope.officesDatas.length;i++){
	            	if(scope.officesDatas[i].id==1){
	            		scope.formData.officeId=scope.officesDatas[i].id;
	            	}
	            }
	        });
	        
	        scope.itemData=function(itemId,officeId){
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId,clientId:clientData.clientId}, function(data) {
	        		
	        		scope.formData=data;
	        		scope.unitsValue = data.units;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].id;
	        		scope.formData.officeId=officeId;
	        		scope.formData.chargeCode="NONE";
	        		scope.truefalse = false;
		        });	
	        };
	        
	        scope.itemDataQuantity=function(quantity,itemId,officeId,units){
	        	this.data.unitPrice=this.formData.unitPrice;
	        	this.data.locale=$rootScope.locale.code;
	        	this.data.quantity=quantity;
	        	this.data.units = units;
	        	resourceFactory.oneTimeSaleQuantityResource.get({itemId:itemId},this.data, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.quantity=quantity;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].id;
	        		scope.formData.officeId=officeId;
	        		//scope.formData.chargeCode="NONE";
		        });	
	        };
	        scope.totalPriceCal=function(quantity,totalPrice){
	        	var amount=totalPrice/quantity;
	        	scope.formData.unitPrice=amount;
	        };

	        scope.getData = function(query){
	        	return http.get($rootScope.hostUrl+ API_VERSION+'/itemdetails/'+scope.formData.itemId+'/'+scope.formData.officeId, {

	        	      params: {
	        	    	  query: query
	        	      }
	        	    }).then(function(res){
	        	    	itemDetails = [];

	        	      for(var i in res.data.serialNumbers){
	        	    	  itemDetails.push(res.data.serialNumbers[i]);

	        	    	  if(i==7){
	        	    		  break;
	        	    	  }

	        	      }
	        	      return itemDetails;
	            });
            };
	        
            scope.getNumber = function(num) {
	        	
            	 if(num){
	             return new Array(parseInt(num));
            	 }else{
            		 return new Array(0);
            	 }
	        	
	         };
	         
	         
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Sale" });
	           };
	        scope.submit = function() {  
	        	scope.flag = true;
	        	 this.formData.locale = $rootScope.locale.code;
	             this.formData.dateFormat = "dd MMMM yyyy";
	             this.formData.chargeCode="NONE";
	             this.formData.saleType = "SECONDSALE";
	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	             this.formData.saleDate=actDate;
	             delete this.formData.discountMasterDatas;   
	             delete this.formData.warranty;
	             delete this.formData.itemDatas;
	             delete this.formData.units;
	             delete this.formData.itemCode;
	             delete this.formData.id;
	             delete this.chargesData;
	             
	             if(scope.unitsValue == 'PIECES'){
	            	 var temp1 = new Array();
			        	
			        	$("input[name='serialNumber']").each(function(){
			        		var temp = {};
			    			temp["serialNumber"] = $(this).val();
			    			temp["orderId"] = routeParams.id;
			    			temp["clientId"] = routeParams.id;
			    			temp["status"] = "allocated";
			    			temp["itemMasterId"] = scope.formData.itemId;
			    			temp["isNewHw"]="Y";
			    			temp1.push(temp);
			        	});
			        
			            this.formData.serialNumber=temp1;
	             }
		            delete this.formData.serials;
		            delete this.formData.chargesData;
	            resourceFactory.oneTimeSaleResource.save({clientId:routeParams.id,devicesaleTpye:'SECONDSALE'},this.formData,function(data){
	            	 location.path('/viewclient/' + routeParams.id);
	          },function(errData){
	        	  scope.flag = false;
	          });
	            webStorage.add("callingTab", {someString: "Sale" });
	            
	        	
	   
	            
	        
	        };
	    }
	  });
	  mifosX.ng.application.controller('ClientSecondSaleController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter','$rootScope','API_VERSION','$http', mifosX.controllers.ClientSecondSaleController]).run(function($log) {
        $log.info("ClientSecondSaleController initialized");
    });
}(mifosX.controllers || {}));