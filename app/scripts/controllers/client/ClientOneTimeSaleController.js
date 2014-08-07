(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ClientOneTimeSaleController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.id;
			  scope.formData = {};
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
		        scope.itemId=null;
	          scope.data={};
	          scope.maxDate = new Date();
	          scope.truefalse = true;
	          
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: routeParams.id}, function(data) {
	            
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
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
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		scope.formData.officeId=officeId;
	        		scope.truefalse = false;
		        });	
	        };
	        
	        scope.itemDataQuantity=function(quantity,itemId,officeId){
	        	this.data.unitPrice=this.formData.unitPrice;
	        	this.data.locale="en";
	        	this.data.quantity=quantity;
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.quantity=quantity;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		scope.formData.officeId=officeId;
		        });	
	        };
	        
	       
	        scope.getData = function(query){
/*	        	if(query.length>0){
	        		
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData.itemId,query: query}, function(data) { 	        	
	     	            scope.itemDetails = data.serials;
	     	        }); 
	        	}else{
	            	
	        	}*/
	        	return http.get($rootScope.hostUrl+ API_VERSION+'/itemdetails/'+scope.formData.itemId+'/'+scope.formData.officeId, {
	        	      params: {
	        	    	  query: query
	        	      }
	        	    }).then(function(res){
	        	    	itemDetails = [];
	        	      for(var i in res.data.serials){
	        	    	  itemDetails.push(res.data.serials[i]);
	        	    	  if(i == 7)
	        	    		  break;
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
	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             this.formData.saleType = "FirstSale";
	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	             this.formData.saleDate=actDate;
	             delete this.formData.discountMasterDatas;   
	             delete this.formData.warranty;
	             delete this.formData.itemDatas;
	             delete this.formData.units;
	             delete this.formData.itemCode;
	             delete this.formData.id;
	             
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
		            delete this.formData.serials;
	            resourceFactory.oneTimeSaleResource.save({clientId:routeParams.id},this.formData,function(data){
	            	 location.path('/viewclient/' + routeParams.id);
	          },function(errData){
	        	  scope.flag = false;
	          });
	            webStorage.add("callingTab", {someString: "Sale" });
	            
	        	
	           
	         /*   resourceFactory.allocateHardwareResource.save(this.formData,function(data){
	            	//temp1 = undefined; 
	            	location.path('/viewclient/' + routeParams.clientId);
	            });
	           // temp1 = undefined;
	            console.log("asjhj");*/
	            
	        
	        };
	    }
	  });
	  mifosX.ng.application.controller('ClientOneTimeSaleController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter','$rootScope','API_VERSION','$http', mifosX.controllers.ClientOneTimeSaleController]).run(function($log) {
        $log.info("ClientOneTimeSaleController initialized");
    });
}(mifosX.controllers || {}));