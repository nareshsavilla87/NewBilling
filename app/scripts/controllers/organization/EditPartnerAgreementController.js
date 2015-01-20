(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPartnerAgreementController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage,routeParams) {
		     
			  scope.formData = {};
			  scope.agreementId= routeParams.id;
			  scope.partnerId= routeParams.partnerId;
			  scope.minDate=dateFilter(new Date(),'dd MMMM yyyy');
			  scope.agreementTypes = [];
			  scope.sourceDatas = [];
			  scope.partnerSourceData = [];
			  scope.exitSourceData = [];
			  scope.sourceData = []; 
			  scope.removeData = [];
			  scope.formData.newSourceData = [];
		        	 resourceFactory.agreementResource.query({agreementId: routeParams.id,anotherResource:'details',template : 'true'} , function(data) {
		        	    scope.agreements = data;
		        	    for(var i=0; i< scope.agreements.length; i++){
		        	    if(scope.agreements[i].id)	{
		        	    	scope.formData.agreementStatus=  scope.agreements[i].agreementStatus;
		        	        var  actDate = dateFilter(scope.agreements[i].startDate,'dd MMMM yyyy');
		        	        var  actDate1 = dateFilter(scope.agreements[i].endDate,'dd MMMM yyyy');
		        	     	scope.formData.startDate=new Date(actDate);
		        	     	scope.formData.endDate=new Date(actDate1);
							scope.exitSourceData.push({
							  source :scope.agreements[i].source,
							  shareType : scope.agreements[i].shareType,
							  shareAmount : scope.agreements[i].shareAmount,
							  detailId : scope.agreements[i].detailId,
						  });
					    }else{
							    scope.agreementTypes =scope.agreements[i].agreementTypes;
							    scope.sourceDatas = scope.agreements[i].sourceData;
								scope.shareTypes = scope.agreements[i].shareTypes;
							}
		        	    
		        	    }
		        	    for(var i in scope.exitSourceData ){
		        	    for (var j in scope.sourceDatas){
	            			if(scope.exitSourceData[i].source == scope.sourceDatas[j].mCodeValue){
	            				scope.exitSourceData[i].source = scope.sourceDatas[j].id;
	            			}
		        	     }
		        	   }
		        	 });
			  
			  scope.partnersTab=function(){
		        	webStorage.add("callingTab", {someString: "Partners" });
		        };
				  
				  scope.addSourceCategories = function(){

					  scope.exitSourceData.push({
						  source : scope.sourceData.source,
						  shareType : scope.sourceData.shareType,
						  shareAmount : scope.sourceData.shareAmount,
						  locale : $rootScope.locale.code
						  
					  });
			        };	  
				  
			        scope.removeSourceCategories = function(detailId,index){
			        	alert(index);
			        	console.log(detailId);
			        	if(detailId){
			        		scope.removeData.push(scope.exitSourceData[index]);
			        		scope.exitSourceData.splice(index,1);
			        	}else{
			        	scope.exitSourceData.splice(index,1);	
			        	scope.partnerSourceData.splice(index,1);
			        	
			        }
			        	
			        };  
			        
			 
			        
		   
			  scope.submit =function(){
				  
					scope.formData.locale = $rootScope.locale.code;
				    scope.formData.dateFormat = 'dd MMMM yyyy';
				    var startDate = dateFilter(scope.formData.startDate, 'dd MMMM yyyy');
				    var endDate = dateFilter(scope.formData.endDate, 'dd MMMM yyyy');
			        scope.formData.startDate = startDate;
			        scope.formData.endDate = endDate || "";
			        console.log(scope.exitSourceData);
		        	console.log(scope.partnerSourceData);
		        	console.log(scope.removeData);
		        	for(var i in  scope.exitSourceData){
		        		if(!scope.exitSourceData[i].detailId){
		        			 scope.formData.newSourceData.push(scope.exitSourceData[i]);
		        			 delete scope.exitSourceData[i]; 
		        		}
		        	}
		            
		            scope.formData.sourceData = scope.exitSourceData;
		            scope.formData.removeSourceData = scope.removeData;
			       resourceFactory.agreementResource.update({agreementId: routeParams.id},scope.formData,function(data){
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