(function(module) {
  mifosX.controllers = _.extend(module, {
    OfficesController: function(scope, resourceFactory,location,PermissionService,webStorage,paginatorService,$modal,routeParams) {

		    scope.offices = [];
			scope.isTreeView = false;

			var idToNodeMap = {};

			scope.PermissionService = PermissionService;
			scope.sourceDatas = [];
		    scope.patnerDatas = [];
      

		  var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "Partners") {
					scope.PartnersTab = true;
					webStorage.remove('callingTab');
				}
			}
      
			   scope.routeTo = function(id) {
				location.path('/viewoffice/' + id);
			};
			

			      scope.deepCopy = function(obj) {
				if (Object.prototype.toString.call(obj) === '[object Array]') {
					var out = [], i = 0, len = obj.length;
					for (; i < len; i++) {
						out[i] = arguments.callee(obj[i]);
					}
					return out;
				}
				if (typeof obj === 'object') {
					var out = {}, i = 0;
					for (i in obj) {
						out[i] = arguments.callee(obj[i]);
					}
					return out;
				}
				return obj;
			};

			   scope.getOffices = function() {
				resourceFactory.officeResource.getAllOffices(function(data) {
					scope.offices = scope.deepCopy(data);
					for ( var i in data) {
						data[i].children = [];
						idToNodeMap[data[i].id] = data[i];
					}
					function sortByParentId(a, b) {

						return a.parentId - b.parentId;
					}
					data.sort(sortByParentId);

					var root = [];
					for ( var i = 0; i < data.length; i++) {
						var currentObj = data[i];
						if (currentObj.children) {
							currentObj.collapsed = "true";
						}
						if (typeof currentObj.parentId === "undefined") {
							root.push(currentObj);
						} else {
							parentNode = idToNodeMap[currentObj.parentId];
							parentNode.children.push(currentObj);
						}
					}
					scope.treedata = root;
				});

			};  
     
			 scope.getPartners = function() {
				 scope.isTreeView = false;
				 resourceFactory.partnerResource.query(function(data) {
					 scope.partners =data;
				 });
			};
			
			 scope.routeToPartner = function(id,officeId) {
				
					location.path('/viewpartner/' + id + '/' +officeId);
				};
				
				
		scope.getPartnerDisbursements = function(){
			
				 scope.patnerDisbursementData = [];
			      scope.searchData = {};
			        
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
		   };
				
    }
  });
  mifosX.ng.application.controller('OfficesController', ['$scope', 'ResourceFactory','$location',
    'PermissionService','webStorage', 'PaginatorService','$modal','$routeParams',
     mifosX.controllers.OfficesController]).run(function($log) {
    $log.info("OfficesController initialized");
  });
}(mifosX.controllers || {}));
