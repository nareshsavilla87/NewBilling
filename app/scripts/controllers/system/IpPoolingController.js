(function(module) {
  mifosX.controllers = _.extend(module, {
	  IpPoolingController: function(scope,route,routeParams,location, resourceFactory, paginatorService,$modal) {
		  
		  scope.ippoolingdatas = {};
		  scope.formData=[];
		  scope.formData.source='all';
		  scope.ipPoolingAllData = function(offset, limit, callback) {
	 			 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit} , callback);
		  };
		  
		  scope.ippoolingdatas = paginatorService.paginate(scope.ipPoolingAllData, 14);
		  
		  scope.routeTo = function(id,status){
	        	if(id != 0){
	            location.path('/viewclient/'+ parseInt(id));
	        	}else{
	        		if(status == "F")
	        		 location.path('/createclient');		
	        	}
	      };
	          
	      scope.changeSourceData = function(offset, limit, callback) {
	        	if(scope.formData.source =='all' ){
						 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit} , callback);
	        	}else{
					 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit, 
						 status: scope.formData.source  } , callback);
		        };
	      };
	      scope.changeSource=function(source){
				
				// resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,source:source} , callback);
	    	  scope.ippoolingdatas  = paginatorService.paginate(scope.changeSourceData, 14);
	      };
	      
	      scope.searchIpPoolData = function(offset, limit, callback) { 
	    	  if(scope.formData.source =='all' ){
		    	      resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,sqlSearch: scope.filterText} , callback);
	    	  }else{
	    		  resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,status: scope.formData.source, sqlSearch: scope.filterText}, callback);
	    		  
	    	  }
		  };
		  		
		  scope.searchIpPool = function(filterText) {
			  console.log("ippool");
		  			scope.ippoolingdatas = paginatorService.paginate(scope.searchIpPoolData, 14);
		  };    
		  		
		  		// popup
		  		scope.edit= function(){
			      	  scope.errorStatus=[];
			      	  scope.errorDetails=[];
			        	  $modal.open({
			                templateUrl: 'updatedescription.html',
			                controller:updateDescriptionController ,
			                resolve:{}
			            });
			        	
			        };
			   
			        var updateDescriptionController = function($scope,$modalInstance){
				      	  
			        	$scope.formData = {}; 
			            $scope.statusData=[];
			            $scope.updateData={};
			          
			         	$scope.accept = function(){
			         		$scope.flag=true;
			         		
			            	this.updateData.ipAndSubnet=this.formData.ip+"/"+this.formData.subNet;
			         		resourceFactory.ipPoolingResource.update(this.updateData,function(data){ 
			                  route.reload();
			                 // location.path('/paymentGateway');
			                        $modalInstance.close('delete');
			                    },function(errData){
			                  $scope.flag = false;
			                   });
			         	};  
			    		$scope.reject = function(){
			    			$modalInstance.dismiss('cancel');
			    		};
			        };
			        
		  }
  });
  mifosX.ng.application.controller('IpPoolingController', [
     '$scope',
     '$route',
     '$routeParams',
     '$location',
     'ResourceFactory',
     'PaginatorService',
     '$modal',
     mifosX.controllers.IpPoolingController
     ]).run(function($log) {
    	 $log.info("IpPoolingController initialized");
  });
}(mifosX.controllers || {}));