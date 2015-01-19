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
        
      //export Batch 
		scope.exportBatch = function(value){
			scope.isProcessedValue = value;
			$modal.open({
				templateUrl: 'downloadBatchData.html',
				controller: DownloadBatchDataController,
				resolve:{}
			});
		};
		var DownloadBatchDataController = function($scope, $modalInstance){
			
				$scope.batchDatas = {};
				$scope.isProcessedValue = scope.isProcessedValue;
				
				resourceFactory.voucherpinBatchTemplateResource.query({isProcessed:$scope.isProcessedValue},function(data) {
					$scope.batchDatas = data;
			    });
				
				$scope.accept = function(id){
					if($scope.isProcessedValue == 'true'){
						scope.downloadFile(id);
					}else{
						scope.processFile(id);
					}
					$modalInstance.close('delete');
				};
		
				$scope.reject = function(){
					$modalInstance.dismiss('cancel');
				};
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
