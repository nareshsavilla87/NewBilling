(function(module) {
  mifosX.controllers = _.extend(module, {
	  DisbursementsController: function(scope, resourceFactory,location,paginatorService,$modal,routeParams,route,PermissionService) {

      scope.patnerDisbursementData = [];
      scope.searchData = {};
      scope.sourceDatas = [];
      scope.patnerDatas = [];
        
      scope.disbursementsFetchFunction = function(offset, limit, callback) {
    	      	var params = {};
    	      	params.offset = offset;
    	      	params.limit = limit;
    	      	if(scope.searchData.partnerType && scope.searchData.partnerType != 'ALL'){
    	      		params.partnerType = scope.searchData.partnerType;
    	      	}
    	      	if(scope.searchData.sourceType && scope.searchData.sourceType != 'ALL'){
    	      		params.sourceType = scope.searchData.sourceType;
    	      	}
    			resourceFactory.patnerDisbursementResource.get(params , callback);
    	};
      scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
      
      scope.totalSource = [];
      scope.totalPartners = [];
      resourceFactory.patnerDisbursementTemplateResource.get(function(data) {
    	  scope.totalSource.push({id:0,mCodeValue : "ALL"});
    	  for(var i in data.sourceData) scope.totalSource.push(data.sourceData[i]);
    	  scope.sourceDatas = scope.totalSource;
    	  scope.totalPartners.push({id:0,partnerName : "ALL"});
    	  for(var i in data.patnerData) scope.totalPartners.push(data.patnerData[i]);
    	  scope.patnerDatas = scope.totalPartners;
    	  	
	    });
      
      scope.search = function(){
			scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);
      };
      
      scope.clearFilters = function () {
          scope.searchData.sourceType = null;
          scope.searchData.partnerType = null;
         document.getElementById('sourceDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---Source Type---";
         document.getElementById('patnerDatas_chosen').childNodes[0].childNodes[0].innerHTML = "---Partner Type---";
     
      };
    
     }
  });
  mifosX.ng.application.controller('DisbursementsController', ['$scope', 'ResourceFactory','$location','PaginatorService','$modal','$routeParams','$route','PermissionService', mifosX.controllers.DisbursementsController]).run(function($log) {
    $log.info("DisbursementsController initialized");
  });
}(mifosX.controllers || {}));
