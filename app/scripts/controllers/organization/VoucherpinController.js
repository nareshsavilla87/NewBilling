(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,rootScope,API_VERSION,route,paginatorService,$modal) {
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
        	params.offset = offset;
        	params.limit = limit;
        	if(scope.searchData.pinType){
        		params.pinType = scope.searchData.pinType;
        	}
        	if(scope.searchData.batchName){
        		params.batchName = scope.searchData.batchName;
        	}
        	if(scope.searchData.status){
        		params.statusType = scope.searchData.status;
        	}
        	if(scope.searchData.sqlSearch){
        		params.sqlSearch = scope.searchData.sqlSearch;
        	}
			resourceFactory.voucherpinBatchWiseResource.get(params , callback);
		};
		scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		
		scope.onSelectVouchers = function(){
			scope.isVouchersBatchWise = "true";
		};
		
		scope.onSelectVoucherPins = function(){
			scope.isVouchersBatchWise = "false";
		};
		
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        });
        
		resourceFactory.voucherpinTemplateResource.get({isBatchTemplate:true},function(data) {
	        scope.batchNameDatas = data.voucherBatchData; 
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
        
        scope.clearFilters = function () {
             scope.searchData.batchName = null;
             scope.searchData.pinType = null;
             scope.searchData.status = null;
            document.getElementById('batchNameDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---Batch Name---";
            document.getElementById('pinTypeDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---PinType---";
            document.getElementById('status_chosen').childNodes[0].childNodes[0].innerHTML = "---Status---";
        
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
					console.log(scope.updateVoucherValues);
					console.log(id);
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
                console.log("delete()");
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
            	 $("#" + scope.voucherpinsBatchwise.currentPageItems[i].id).prop('checked', true);
            	 scope.updateVoucherValues.push({id:scope.voucherpinsBatchwise.currentPageItems[i].id});
             }
           } else {
        	   for(var i in scope.voucherpinsBatchwise.currentPageItems) {
              	 $("#" + scope.voucherpinsBatchwise.currentPageItems[i].id).prop('checked', false);
               }
        	  // scope.active = selectAll;
        	   scope.updateVoucherValues = [];
           }
           console.log(scope.updateVoucherValues);
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
	    		scope.updateVoucherValues.push({id:voucherpin.id});
	        	
	        } else {
	        	scope.updateVoucherValues = _.without(scope.updateVoucherValues, _.findWhere(scope.updateVoucherValues, {id:voucherpin.id}));
	        }
	    	console.log(scope.updateVoucherValues);
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
                                                            mifosX.controllers.VoucherpinController]).run(function($log) {
	  
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
