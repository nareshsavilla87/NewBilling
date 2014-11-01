(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateVoucherPinController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
	    	
	        scope.pinCategoryDatas = [];
	        scope.pinTypeDatas = [];
	        scope.plandatas = [];
	        scope.start={};
	        scope.start.date = new Date();
	        scope.lengthValidationError = false;
	        
	        resourceFactory.voucherpinTemplateResource.get(function(data) {
	            scope.pinCategoryDatas = data.pinCategoryData;
	            //scope.pinTypeDatas = data.pinTypeData;
	            scope.pinTypeDatas.push({"value":"VALUE"},{"value":"PRODUCT"});
	            scope.formData = {
	            		
	            };
	        });
	        resourceFactory.orderTemplateResource.get({'planId': 0},function(data) {
	        	 
	            scope.planDatas = data.plandata;
	       });
	        scope.setPinValue = function(){
	        	this.formData.pinValue = null;
	        };
	        
	        scope.submit = function() {  
	        	
	        	 if(this.formData.beginWith.length < this.formData.length){	
	        		 scope.lengthValidationError = false;
	        		 this.formData.locale = $rootScope.locale.code;
		             this.formData.dateFormat = "dd MMMM yyyy";
		             var exipiryDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		             this.formData.expiryDate=exipiryDate;
		            resourceFactory.voucherpinResource.save(this.formData,function(data){
		            	location.path('/voucherpins');
		          });
	        	 
	        	 }else{
	        		 scope.lengthValidationError = true;
	        	 }
	        		 
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateVoucherPinController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateVoucherPinController]).run(function($log) {
	    $log.info("CreateVoucherPinController initialized");
	  });
	}(mifosX.controllers || {}));

