(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressTreeviewController: function(scope, resourceFactory,$modal,route,PermissionService) {
     
      var idToNodeMap = {};

       scope.PermissionService = PermissionService;
        var str = "new";

        
        scope.elementSelect = function(id,nodeName,nodeCode){
        	scope.nodeId = id;
        	scope.nodeName = nodeName;
        	scope.nodeCode = nodeCode;
        	scope.elementId = id.split("-");
        };
        scope.addCountry = function(){
        	
      	  $modal.open({
                templateUrl : 'addCountry.html',
                controller : addCountryController,
                resolve : {}
            });
        };
        scope.editCountry = function(){
        	
        	  $modal.open({
                  templateUrl: 'editCountry.html',
                  controller: editCountryController,
                  resolve:{}
              });
          };
          scope.deleteCountry = function(){
        	  var stateCount = 0;
        	  for (var i in scope.stateObject){
        		  if(scope.nodeId == scope.stateObject[i].parentId){
        			  stateCount++;
        			  break;
        		  }
        	 	}
        		 if(stateCount)
        			 $modal.open({
        				 templateUrl: 'countryAlert.html',
        				 controller: countryAlertController,
        				 resolve:{}
        			 });
        		 else
        			 $modal.open({
        				 templateUrl: 'deleteCountry.html',
        				 controller: deleteCountryController,
        				 resolve:{}
        			 });
        	
          };
        scope.addState = function(){
        	  $modal.open({
                  templateUrl: 'addState.html',
                  controller: addStateController,
                  resolve:{}
              });
          };
          scope.editState = function(){
          	
        	  $modal.open({
                  templateUrl: 'editState.html',
                  controller: editStateController,
                  resolve:{}
              });
          };
          scope.deleteState = function(){
            	
        	  var cityCount = 0;
        	  for (var i in scope.cityObject){
        		  if(scope.nodeId == scope.cityObject[i].parentId){
        			  cityCount++;
        			  break;
        		  }
        	 	}
        	  if(cityCount)
        		  $modal.open({
        			  templateUrl: 'stateAlert.html',
        			  controller: stateAlertController,
        			  resolve:{}
        		  });
        	  else
        		  $modal.open({
        			  templateUrl: 'deleteState.html',
        			  controller: deleteStateController,
        			  resolve:{}
        		  });
          };
          scope.addCity = function(){
        	  $modal.open({
                  templateUrl: 'addCity.html',
                  controller: addCityController,
                  resolve:{}
              });
          };
          scope.editCity = function(){
            	
        	  $modal.open({
                  templateUrl: 'editCity.html',
                  controller: editCityController,
                  resolve:{}
              });
          };
          scope.deleteCity = function(){
          	
        	  $modal.open({
                  templateUrl: 'deleteCity.html',
                  controller: deleteCityController,
                  resolve:{}
              });
          };
          
          
          var addCountryController = function ($scope, $modalInstance) {
        	  	$scope.formData = {};
        	  $scope.submit = function () {
        		  
        		  resourceFactory.addCountryResource.get($scope.formData,function(data){
        			  $modalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
          var editCountryController = function ($scope, $modalInstance) {
        	  		
        	  		$scope.formData={};
        	  		$scope.formData.entityCode = scope.nodeCode;
	 				$scope.formData.entityName = scope.nodeName;
        	  $scope.submit = function () {
        		  	
        		  var countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.update({id:countryId},$scope.formData,function(data){
        			  $modalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
          var deleteCountryController = function ($scope, $modalInstance) {
        	  	
        	  $scope.approveDeleteCountry = function () {
        		  $scope.countryId=scope.elementId[1];
        		  resourceFactory.editCountryResource.remove({id:$scope.countryId},{},function(data){
        			  $modalInstance.close('delete');
        			  route.reload();
        	        },function(errData){
		          });
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
          
          var countryAlertController = function ($scope, $modalInstance) {
        	  $scope.countryName = scope.nodeName;
        	  $scope.approve = function () {
        		  $modalInstance.close('delete');
              };
          };
          
          var addStateController = function ($scope, $modalInstance) {
        	  $scope.formData = {};
        	  $scope.nodeName=scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  $scope.formData.parentEntityId = scope.elementId[1];
	        		  resourceFactory.addStateResource.get($scope.formData,function(data){
	        			  $modalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	          };
	       var editStateController = function ($scope, $modalInstance) {
	    	   		
	    	   		$scope.formData={};
    	 			$scope.formData.entityCode = scope.nodeCode;
    	 			$scope.formData.entityName = scope.nodeName;
	        	  $scope.submit = function () {
	        		  
	        		  var stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.update({id:stateId},$scope.formData,function(data){
	        			  $modalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	        };
	        var deleteStateController = function ($scope, $modalInstance) {
	        	  $scope.approveDeleteState = function () {
	        		  $scope.stateId=scope.elementId[1];
	        		  resourceFactory.editStateResource.remove({id:$scope.stateId},{},function(data){
	        			  $modalInstance.close('delete');
	        			  route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	        };
	        var stateAlertController = function ($scope, $modalInstance) {
	        	  $scope.stateName = scope.nodeName;
	        	  $scope.approve = function () {
	        		  $modalInstance.close('delete');
	              };
	          };

	        var addCityController = function ($scope, $modalInstance) {
	        	 $scope.formData = {};
	        	  $scope.nodeName=scope.nodeName;
		        	  $scope.submit = function (newCode,newName) {
		        		  
		        		  $scope.formData.parentEntityId = scope.elementId[1];
		        		  resourceFactory.addCityResource.get($scope.formData,function(data){
		        			  $modalInstance.close('delete');
		        			  route.reload();
		        	        },function(errData){
				          });
		              };
		              $scope.cancel = function () {
		                  $modalInstance.dismiss('cancel');
		              };
		      };
		     var editCityController = function ($scope, $modalInstance) {
		    	   		
		    	   		$scope.formData={};
 		    	 			$scope.formData.entityCode = scope.nodeCode;
		    	 			$scope.formData.entityName = scope.nodeName;
			        	  $scope.submit = function () {
			        		  
			        		  var cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.update({id:cityId},$scope.formData,function(data){
			        			  $modalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $modalInstance.dismiss('cancel');
			              };
			   };
			   var deleteCityController = function ($scope, $modalInstance) {
			        	  $scope.approveDeleteCity = function () {
			        		  $scope.cityId=scope.elementId[1];
			        		  resourceFactory.editCityResource.remove({id:$scope.cityId},{},function(data){
			        			  $modalInstance.close('delete');
			        			  route.reload();
			        	        },function(errData){
					          });
			              };
			              $scope.cancel = function () {
			                  $modalInstance.dismiss('cancel');
			              };
			   };
	         
        resourceFactory.addressResource.getAllAddresses(function(data){
        	        	
        	 scope.stateObject=[];
        	 scope.cityObject=[];
        	 scope.countryObject=[];
          for(var i in data.pageItems){
        	  scope.countryObject.push({id:"A-"+data.pageItems[i].countryId,code:data.pageItems[i].countryCode,name:data.pageItems[i].countryName,children:[]});
        	  
        	  if(data.pageItems[i].stateId!=0)
        		  scope.stateObject.push({id:"B-"+data.pageItems[i].stateId,code:data.pageItems[i].stateCode,name:data.pageItems[i].stateName,parentId:"A-"+data.pageItems[i].countryId,children:[]});
        	  if(data.pageItems[i].cityId!=0)
        		  scope.cityObject.push({id:"C-"+data.pageItems[i].cityId,code:data.pageItems[i].cityCode,name:data.pageItems[i].cityName,parentId:"B-"+data.pageItems[i].stateId,children:[]});
          }
          
          scope.rootArray=[];
         scope.stateObject=_.uniq(scope.stateObject,function(item,key,id){
              return item.id;
          });
         scope.countryObject=_.uniq(scope.countryObject,function(item,key,id){
             return item.id;
         });
         scope.cityObject=_.uniq(scope.cityObject,function(item,key,id){
             return item.id;
         });
        /* console.log(scope.countryObject);
         console.log("----------------------");
         console.log(scope.stateObject);
         console.log("----------------------");
         console.log(scope.cityObject);*/
          for(var i in scope.countryObject){ 
        	  
            scope.rootArray.push(scope.countryObject[i]);
          }
                   
          for(var i in scope.stateObject){
        	  
        	  scope.rootArray.push(scope.stateObject[i]);
           }
          for(var i in scope.cityObject){ 
              scope.rootArray.push(scope.cityObject[i]);
           }
          
             for(var i in scope.rootArray){
            	
                 idToNodeMap[scope.rootArray[i].id] = scope.rootArray[i];
             }
             
             function sortByParentId(a, b){
                 return a.parentId - b.parentId;
             }
             data.pageItems.sort(sortByParentId);
             var glAccountsArray = scope.rootArray;
            
             var root = [];
            for(var i = 0; i < glAccountsArray.length; i++) {
            	 var currentObj = glAccountsArray[i];
                 if(currentObj.children){
                     currentObj.collapsed = "true";
                 }

               if(typeof currentObj.parentId === "undefined") {
                     root.push(currentObj);        
               } else {
            	   
                     parentNode = idToNodeMap[currentObj.parentId];
                     parentNode.children.push(currentObj);
               };
             }
            scope.treedata = root;
        });
        
        
     }
  });
  mifosX.ng.application.controller('AddressTreeviewController', ['$scope', 'ResourceFactory','$modal','$route','PermissionService', mifosX.controllers.AddressTreeviewController]).run(function($log) {
    $log.info("AddressTreeviewController initialized");
  });
}(mifosX.controllers || {}));
