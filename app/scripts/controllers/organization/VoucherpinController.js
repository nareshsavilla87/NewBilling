(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,rootScope,API_VERSION,route,paginatorService,$modal) {
        scope.voucherpins = [];
        scope.PermissionService = PermissionService;
       
        scope.voucherPinFetchFunction = function(offset, limit, callback) {
			resourceFactory.voucherpinResource.get({offset: offset, limit: limit} , callback);
		};
		
		scope.voucherpins = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
      /*  resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        });*/
        
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
