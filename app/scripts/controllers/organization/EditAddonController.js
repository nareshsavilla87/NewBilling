(function(module) {
  mifosX.controllers = _.extend(module, {
    EditAddonController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope,$modal) {
    	
    	scope.addonId = routeParams.id;
    	scope.formData = {};
        scope.addonsPrices = [];
        scope.chargeCodeDatas=[];
        scope.planDatas = [];
        scope.priceRegionData=[];
        scope.servicedatas=[];
        scope.categoryDatas=[];
        scope.serviceIds =[];
        resourceFactory.addonsResource.get({addonId: scope.addonId, template: 'true'} , function(data) {
            scope.formData = {
            		            id                      : data.id,
            					planCode 				: data.planCode,
            					chargeCode 				: data.chargeCode,
            					priceRegion 		    : data.priceRegion
            				
            				  };
            
            scope.addonsPrices = data.addonsPrices;
            scope.chargeCodeDatas = data.chargeCodeDatas;
            scope.planDatas = data.planDatas;
            scope.priceRegionData = data.priceRegionData;
            scope.servicedatas = data.servicedatas;
            
             checkPrice = function(id){
            	 var price = null;
            	 for(var i in scope.addonsPrices){
            		 if(scope.addonsPrices[i].serviceId == id){
            			 price = scope.addonsPrices[i].price;	
            			 break;
            		 }
                 }
            	return price;
             };
            scope.addonServices=[];
            
            for(var i in scope.servicedatas){
            	var price =checkPrice(scope.servicedatas[i].id);
            	
            	if(price != null){
            		 scope.serviceIds.push(scope.servicedatas[i].id);
					  scope.addonServices.push({
						  "serviceId":scope.servicedatas[i].id,
						  "price":price,
						  "serviceCode":scope.servicedatas[i].serviceCode,
						  "active":"Y",
						  "category":scope.servicedatas[i].category,
						  "locale":"en"
					  });
            		
            	}else{
            		 scope.addonServices.push({
						  "serviceId":scope.servicedatas[i].id,
						  "serviceCode":scope.servicedatas[i].serviceCode,
						  "category":scope.servicedatas[i].category,
						  "locale":"en"
					  });
            	}
            }
            
          
            
            for(var i in scope.planDatas){
            	
            	if(scope.planDatas[i].planCode == data.planCode){
            		scope.formData.planId = scope.planDatas[i].id;
            	}
            }
            
          /*  scope.addonServices =_.uniq(scope.addonServices,function(item,key,id){
            	alert(ite)
	             return (item.serviceId && item.price !=null);
	         });*/
            
            
            for(var i in scope.priceRegionData){
            	if(scope.priceRegionData[i].priceregionCode == data.priceRegion){
            		scope.formData.priceRegionId = scope.priceRegionData[i].id;
            	}
            }
            
            if(scope.servicedatas.length==0){
				  scope.noChannels = true;
			  }
			  else{
				  scope.noChannels = false;
			  }
			  
			  for(var i in scope.servicedatas){
				  if(scope.servicedatas[i].category){
					  scope.categoryDatas.push({
					  							  'category':scope.servicedatas[i].category,
							  				  });
				  }
			  }
			  scope.categoryDatas =_.uniq(scope.categoryDatas,function(item,key,id){
		             return item.category;
		         });
			
        });
        
    	
        scope.isSelected = function(id,isActive){
        	
			  if(isActive =="Y"){
				  scope.serviceIds.push(id);
			  }else{
				  //$("#"+scope.serviceIds[id]).val() = null;
				  scope.serviceIds =  scope.serviceIds.filter(function( obj ) {
					    return obj != id;
					});
			  }
			  
		  };
		  
        scope.submit = function() {
			scope.addons=[];
			  for(var i in scope.serviceIds){
				  scope.addons.push({
					  "serviceId":scope.serviceIds[i],
					  "price":$("#"+scope.serviceIds[i]).val(),
					  "locale":"en"
				  });
			  }
			  
			  this.formData.addons=scope.addons;
			  delete this.formData.id;
			  delete this.formData.planCode;
			  delete this.formData.priceRegion;
			  scope.addons=[];
	          scope.addonServices=[];
			  resourceFactory.addonsResource.update({'addonId':scope.addonId},this.formData,function(data){
				  location.path('/viewaddon/' +scope.addonId);
               });
		  };
		  
		  scope.deleteAddon=function(){
              $modal.open({
                  templateUrl: 'deleteaddon.html',
                  controller: Approve,
                  resolve:{}
              });
          };
         function Approve($scope, $modalInstance) {
              $scope.approve = function () {
                  resourceFactory.addonsResource.remove({addonId:scope.addonId},{},function(){
                    location.path('/addons');
                  });
                  $modalInstance.close('delete');
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          }
		  
		  
    }
  });
  mifosX.ng.application.controller('EditAddonController', [
   '$scope', 
   '$routeParams', 
   'ResourceFactory', 
   'dateFilter',
   '$location',
   '$rootScope',
   '$modal',
   mifosX.controllers.EditAddonController]).run(function($log) {
    $log.info("EditAddonController initialized");
  });
}(mifosX.controllers || {}));
