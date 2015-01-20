(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPartnerAgreementController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage,routeParams) {
		     
			  scope.formData = {};
			  scope.agreementId= routeParams.id;
			  scope.formData.startDate = dateFilter(new Date(),'dd MMMM yyyy');
			  scope.minDate=dateFilter(new Date(),'dd MMMM yyyy');
			  scope.agreementTypes = [];
			  scope.sourceDatas = [];
			  scope.partnerSourceData = [];
			  scope.sourceData = [];   	
		        	 resourceFactory.agreementEditResource.query({agreementId: routeParams.id,template : 'true'} , function(data) {
		        	    scope.agreements = data;
		        	    scope.agreementTypes =data.agreementTypes;
					    scope.sourceDatas = data.sourceData;
						scope.shareTypes = data.shareTypes;
		        	 });
			  
			  scope.partnersTab=function(){
		        	webStorage.add("callingTab", {someString: "Partners" });
		        };
				  
				  scope.addSourceCategories = function(){
					 
			        	scope.partnerSourceData.push({
								
														source : scope.sourceData.source,
														shareType : scope.sourceData.shareType,
														shareAmount : scope.sourceData.shareAmount,
														status : scope.sourceData.status,
														locale : $rootScope.locale.code
														
													});
			        	
			        	scope.sourceData.source = undefined;
			        	scope.sourceData.shareType = undefined;
			        	scope.sourceData.shareAmount = undefined;
			        	scope.sourceData.status = undefined;
						
			        };	  
				  
			        scope.removeSourceCategories = function(index){	
			        	scope.partnerSourceData.splice(index,1);
			        };  
		   
			  scope.submit =function(){
				  
					scope.formData.locale = $rootScope.locale.code;
				    scope.formData.dateFormat = 'dd MMMM yyyy';
				    var startDate = dateFilter(scope.formData.startDate, 'dd MMMM yyyy');
				    var endDate = dateFilter(scope.formData.endDate, 'dd MMMM yyyy');
			        scope.formData.startDate = startDate;
			        scope.formData.endDate = endDate || "";
		            scope.formData.newSourceData = scope.partnerSourceData;
			       resourceFactory.agreementResource.save({partnerId: routeParams.id},scope.formData,function(data){
			    	 location.path('/viewpartner/' +scope.partnerId);
		
			      });
	    };        
		 
		  }
	  });
	  mifosX.ng.application.controller('EditPartnerAgreementController',
		['$scope', 
		 'ResourceFactory', 
		 '$location',
		 'dateFilter',
		 '$rootScope',
		 'webStorage',
		 '$routeParams', mifosX.controllers.EditPartnerAgreementController]
	  ).run(function($log) {
	    $log.info("EditPartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));