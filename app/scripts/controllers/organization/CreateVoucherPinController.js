(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateVoucherPinController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
	    	
	    	scope.formData = {};
	        scope.pinCategoryDatas = [];
	        scope.pinTypeDatas = [];
	        scope.plandatas = [];
	        scope.start={};
	        scope.start.date = dateFilter(new Date(),'dd MMMM yyyy');
	        scope.lengthValidationError = false;
	        scope.offices = [];
	        
	        resourceFactory.voucherpinTemplateResource.get(function(data) {
	            scope.pinCategoryDatas = data.pinCategoryData;
	            scope.pinTypeDatas.push({"value":"VALUE"},{"value":"PRODUCT"});
	            scope.offices = data.offices;
	            
	        });
	        
	        resourceFactory.orderTemplateResource.get({planId: 0},function(data) {
	            scope.planDatas = data.plandata;
	       });
	        
	        scope.setPinValue = function(){
	        	scope.formData.pinValue = null;
	        };
	        
	        scope.submit = function() {  
	        	
	         if(scope.formData.beginWith && scope.formData.length){
	        	 if(scope.formData.beginWith.length < scope.formData.length){	
	        		 scope.lengthValidationError = false;
	        		 scope.formData.locale = $rootScope.locale.code;
	        		 scope.formData.dateFormat = "dd MMMM yyyy";
		             var exipiryDate = dateFilter(scope.start.date,'dd MMMM yyyy');
		             scope.formData.expiryDate=exipiryDate;
		             
		            resourceFactory.voucherpinResource.save(scope.formData,function(data){
		            	location.path('/voucherpins');
		          });
	        	 
	        	 }else{
	        		 scope.lengthValidationError = true;
	        	 }
	          }
 
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateVoucherPinController', ['$scope', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.CreateVoucherPinController]).run(function($log) {
	    $log.info("CreateVoucherPinController initialized");
	  });
	}(mifosX.controllers || {}));

