(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePartnerAgreementController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage,routeParams) {
		     
			  scope.formData = {};
			  scope.partnerId= routeParams.id;
			  scope.formData.startDate = dateFilter(new Date(),'dd MMMM yyyy');
			  scope.minDate=dateFilter(new Date(),'dd MMMM yyyy');
			 /* var dd=new Date();
			  scope.formData.endDate = dateFilter(dd.setDate(dd.getDate()+1),'dd MMMM yyyy');*/
			  scope.agreementTypes = [];
			  scope.sourceDatas = [];
			  scope.partnerSourceData = [];
			  scope.sourceData = [];
			      
			  resourceFactory.agreementTemplateResource.get(function(data) {
				  
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
														locale : $rootScope.locale.code,		
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
		            scope.formData.sourceData = scope.partnerSourceData;
			       resourceFactory.agreementResource.save({partnerId: routeParams.id},scope.formData,function(data){
			    	 location.path('/viewpartner/' +scope.partnerId);
		
			      });
	    };        
		 
		  }
	  });
	  mifosX.ng.application.controller('CreatePartnerAgreementController',
		['$scope', 
		 'ResourceFactory', 
		 '$location',
		 'dateFilter',
		 '$rootScope',
		 'webStorage',
		 '$routeParams', mifosX.controllers.CreatePartnerAgreementController]
	  ).run(function($log) {
	    $log.info("CreatePartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));