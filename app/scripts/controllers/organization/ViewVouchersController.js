(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewVouchersController: function(scope,routeParams, resourceFactory,PermissionService,rootScope,API_VERSION,route,paginatorService,$modal,$http) {
       
        scope.PermissionService = PermissionService;
        scope.updateVoucherValues = [];
        scope.voucherpin = {};
        scope.voucherId = routeParams.voucherId;
        
        scope.searchData = {};
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
		
		scope.voucherpinsBatchwise = [];
		scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		
		scope.onSelectVouchers = function(voucherId){
			delete scope.searchData.status;
			scope.voucherId = voucherId;
			scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		};
		
		scope.search = function(){
			scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
		};
		
		scope.cancelVoucher= function(id){
            scope.id=id;
        	  $modal.open({
                  templateUrl: 'CancelVoucher.html',
                  controller: CancelVoucherController,
                  resolve:{}
              });
          };
          
          var CancelVoucherController = function ($scope, $modalInstance) {

	          	resourceFactory.cancelVoucherTemplateResource.get(function(data) {
	                 $scope.reasondatas = data.reasondatas;
	                 
	              });
	          	
	        	  $scope.approve = function (value) {
	        		  $scope.flagEditQuality=true;
	        			  this.formData = {"cancelReason":value};
	        			  resourceFactory.CancelvoucherpinResource.update({voucherId : scope.id},this.formData,function(data) {
	  						scope.voucherpinsBatchwise = paginatorService.paginate(scope.voucherPinFetchFunction, 14);
	  			        });
	        		
	              };
	              $scope.cancelQuality = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	              
	              
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
						scope.updateVoucherValues =[];
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
                $http.post(rootScope.hostUrl+ API_VERSION +'/vouchers/delete/'+scope.voucherId, jsonData).
                  success(function(data) {
                	  scope.updateVoucherValues = [];
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
        	   scope.updateVoucherValues = [];
           }
         };
		
	    scope.checkSingle = function (voucherpin, active) {
	    	if(active == 'true') {
	    		scope.updateVoucherValues.push(voucherpin.id);
	        	
	        } else {
        	      for(var i in scope.updateVoucherValues) {
        	          if(scope.updateVoucherValues[i] === voucherpin.id) {
        	        	  scope.updateVoucherValues.splice(i, 1);
        	          }
        	      }
	        }
	    };

        
    }
  
  });
  mifosX.ng.application.controller('ViewVouchersController', [
                                                            '$scope', 
                                                            '$routeParams', 
                                                            'ResourceFactory',
                                                            'PermissionService',
                                                            '$rootScope',
                                                            'API_VERSION',
                                                            '$route',
                                                            'PaginatorService',
                                                            '$modal',
                                                            '$http',
                                                            mifosX.controllers.ViewVouchersController]).run(function($log) {
	  
    $log.info("ViewVouchersController initialized");
  });
}(mifosX.controllers || {}));
