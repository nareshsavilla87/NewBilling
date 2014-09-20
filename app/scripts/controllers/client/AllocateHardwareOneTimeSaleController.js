(function(module) {
	  mifosX.controllers = _.extend(module, {
		  AllocateHardwareOneTimeSaleController: function(scope, webStorage,routeParams , location, resourceFactory,$rootScope,API_VERSION,http) {
			  scope.formData = {};
			  scope.clientId=routeParams.clientId;
			  var clientData = webStorage.get('clientData');
			  scope.hwSerialNumber=clientData.hwSerialNumber;
	            scope.displayName=clientData.displayName;
	            scope.statusActive=clientData.statusActive;
	            scope.accountNo=clientData.accountNo;
	            scope.officeName=clientData.officeName;
	            scope.balanceAmount=clientData.balanceAmount;
	            scope.currency=clientData.currency;
	            scope.imagePresent=clientData.imagePresent;
	            scope.categoryType=clientData.categoryType;
	            scope.email=clientData.email;
	            scope.phone=clientData.phone;
	            scope.officeId = clientData.officeId;
	            resourceFactory.allocateHardwareDetails.getItemDetails({oneTimeSaleId: routeParams.id, officeId:scope.officeId}, function(data) {
	            	 	          scope.formData=data;
	            });
	        
	        scope.getData = function(query){
	        	  /*resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:  scope.formData.itemMasterId,query: query}, function(data) {
	        		  scope.itemDetails  = data.serials;
	     	        }); */
	        	 return http.get($rootScope.hostUrl+ API_VERSION+'/itemdetails/'+scope.formData.itemMasterId+'/'+scope.officeId, {
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
	             return new Array(num);   
	         };
	         
	        scope.submit = function() {  
	        	var temp1 = new Array();
	        	
	        	$("input[name='serialNumber']").each(function(){
	        		var temp = {};
	    			temp["serialNumber"] = $(this).val();
	    			temp["orderId"] = routeParams.id;
	    			temp["clientId"] = routeParams.clientId;
	    			temp["status"] = "allocated";
	    			temp["itemMasterId"] = scope.formData.itemMasterId;
	    			temp["isNewHw"]="Y";
	    			temp1.push(temp);
	        	});
	        	
	            this.formData.serialNumber=temp1;
	            delete this.formData.serials;
	           
	            resourceFactory.allocateHardwareResource.save(this.formData,function(data){
	            	//temp1 = undefined; 
	            	location.path('/viewclient/' + routeParams.clientId);
	            });
	           // temp1 = undefined;
	        };
	    }
	  });
	  mifosX.ng.application.controller('AllocateHardwareOneTimeSaleController', ['$scope', 'webStorage','$routeParams', '$location', 'ResourceFactory','$rootScope','API_VERSION','$http', mifosX.controllers.AllocateHardwareOneTimeSaleController]).run(function($log) {
        $log.info("AllocateHardwareOneTimeSaleController initialized");
    });
}(mifosX.controllers || {}));

//alert('submit');
/*alert(this.formData.serialNumber);
alert(this.formData.quantity);
alert(this.formData.itemMasterId);
*/	            

/*   var temp = {};//"orderId","clientId","itemMasterId","serialNumber","allocationDate","status"

var temp1=new Array();

var i=1;*/

/*for(;i<=this.formData.quantity;i++){
	
	temp["serialNumber"] =this.formData.itemDetail;
	temp["orderId"] = routeParams.id;
	temp["clientId"] = routeParams.clientId;
	temp["status"] = "allocated";
	temp["itemMasterId"] = this.formData.itemMasterId;
	temp1.push(temp);
	
	
}*/
//"orderId","clientId","itemMasterId","serialNumber","allocationDate","status"
/*
alert("working");
*/

/*$(".control-group").children("div").each(function(){
	console.info($(this).text()+'\n');
});
*/

/*$("div.control-group").each(function(){
	console.log($(this).child("div").text());
});
$(this).find('option:selected').text();
alert("working");
*//*
*    		
            var temp1=new Array();
	        scope.selectItem = function(itemDetail){

	        	var temp = {};
    			temp["serialNumber"] =itemDetail;
    			temp["orderId"] = routeParams.id;
    			temp["clientId"] = routeParams.clientId;
    			temp["status"] = "allocated";
    			temp["itemMasterId"] = this.formData.itemMasterId;
    			temp1.push(temp);
    			// scope.formData.serial=itemDetail;
	        };

**/
