(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,rootScope,API_VERSION,route,paginatorService,$modal,$http) {
        scope.voucherpins = [];
        scope.voucherpinsBatchwise = [];
        scope.batchNameDatas = {};
        scope.pinTypeDatas = [];
        scope.searchData = {};
        scope.PermissionService = PermissionService;
        scope.isVouchersBatchWise = "false";
        scope.updateVoucherValues = [];
        scope.voucherpin = {};
        
        scope.voucherPinFetchFunction = function(offset, limit, callback) {
        	var params = {};
        	params.voucherId = scope.voucherId;
        	params.offset = offset;
        	params.limit = limit;
        	
        	if(scope.searchData.status){
        		params.statusType = scope.searchData.status;
        	}
        	if(scope.searchData.sqlSearch){
        		params.sqlSearch = scope.searchData.sqlSearch;
        	}
        	scope.activeall = 'false';
        	resourceFactory.voucherpinsByIdResource.get(params , callback);
		};
		
		scope.onSelectVouchers = function(voucherId){
			delete scope.searchData.status;
			scope.voucherId = voucherId;
			scope.isVouchersBatchWise = "true";
			scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		};
		
		scope.onSelectVoucherPins = function(){
			scope.isVouchersBatchWise = "false";
		};
		
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        });
        
         scope.downloadFile = function (id){
        	window.open(rootScope.hostUrl+ API_VERSION +'/vouchers/'+id+'?tenantIdentifier=default');
        };
        
        scope.processFile = function(id){
         if(!rootScope.voucherPinProcess){
        	rootScope.dynamicVar = id;
        	rootScope.voucherPinProcess = true;
        	resourceFactory.voucherpinResource.save({voucherId:id},function(data) {
        		rootScope.dynamicVar = 0;
        		rootScope.voucherPinProcess = false;
        		route.reload();
            },function(errorData){
            	rootScope.dynamicVar = 0;
            	rootScope.voucherPinProcess = false;
            });
         };
        };
        
		scope.search = function(){
			scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		};
        
      //update Vouchers 
		scope.updateVouchers = function(){
			$modal.open({
				templateUrl: 'updateVouchers.html',
				controller: UpdateVouchersController,
				resolve:{}
			});
		};
		var UpdateVouchersController = function($scope, $modalInstance){
			
				$scope.batchDatas = {};
		
				/*resourceFactory.voucherpinBatchTemplateResource.query({isProcessed:$scope.isProcessedValue},function(data) {
					$scope.batchDatas = data;
			    });*/
				
				$scope.accept = function(id){
					var jsonData = {voucherIds : scope.updateVoucherValues, status : id};
					resourceFactory.voucherpinResource.update({voucherId : scope.voucherId},jsonData,function(data) {
						scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
			        });
					$modalInstance.close('delete');
				};
		
				$scope.reject = function(){
					$modalInstance.dismiss('cancel');
				};
		};	
		
		scope.deleteVouchers=function(){
            $modal.open({
                templateUrl: 'deletevouchers.html',
                controller: Approve,
                resolve:{}
            });
        };
       function Approve($scope, $modalInstance) {
      	  
            $scope.approve = function () {
                scope.approveData = {};
                var jsonData = {voucherIds : scope.updateVoucherValues};
                $http.post(rootScope.hostUrl+ API_VERSION +'/vouchers/'+scope.voucherId, jsonData).
                  success(function(data) {
                	  scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
                  });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
       
       scope.selectAll = function(selectAll) {
         
           scope.updateVoucherValues = [];
           
           if(selectAll == 'true') {
             for(var i in scope.voucherpinsBatchwise.currentPageItems) {
            	 if(scope.voucherpinsBatchwise.currentPageItems[i].status != 'USED'){
            		 $("#" + scope.voucherpinsBatchwise.currentPageItems[i].id).prop('checked', true);
            		 scope.updateVoucherValues.push(scope.voucherpinsBatchwise.currentPageItems[i].id);
            	 }
             }
           } else {
        	   for(var i in scope.voucherpinsBatchwise.currentPageItems) {
        		   if(scope.voucherpinsBatchwise.currentPageItems[i].status != 'USED'){
        			   $("#" + scope.voucherpinsBatchwise.currentPageItems[i].id).prop('checked', false);
        		   }
               }
        	  // scope.active = selectAll;
        	   scope.updateVoucherValues = [];
           }
         };
		
		/*scope.checkAll = function () {
			scope.updateVoucherValues = [];
	        angular.forEach(scope.voucherpinsBatchwise.currentPageItems, function (voucherpin) {
	        	if(scope.selectedAll){
	        		scope.selectedAll = true;
	        		scope.updateVoucherValues.push({id:voucherpin.id});
	        	}else{
	        		scope.selectedAll = false;
	        		scope.updateVoucherValues = [];
	        	}
	        	voucherpin.Selected = scope.selectedAll;
	        	
	        });
	        console.log(scope.updateVoucherValues);
	    };*/
	    
	    scope.checkSingle = function (voucherpin, active) {
	    	if(active == 'true') {
	    		scope.updateVoucherValues.push(voucherpin.id);
	        	
	        } else {
	        	scope.updateVoucherValues = _.without(scope.updateVoucherValues, _.findWhere(scope.updateVoucherValues, voucherpin.id));
	        }
	    };

        
    }
  
  });
  mifosX.ng.application.controller('VoucherpinController', [
                                                            '$scope', 
                                                            'ResourceFactory',
                                                            'PermissionService',
                                                            '$rootScope',
                                                            'API_VERSION',
                                                            '$route',
                                                            'PaginatorService',
                                                            '$modal',
                                                            '$http',
                                                            mifosX.controllers.VoucherpinController]).run(function($log) {
	  
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
