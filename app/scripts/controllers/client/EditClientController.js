(function(module) {
  mifosX.controllers = _.extend(module, {
    EditClientController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter,API_VERSION,$rootScope,$upload,$parse) {
        scope.offices = [];
        scope.date = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        scope.formData=[];
        scope.entryType;
        if(scope.imagePresent){
        scope.image=clientData.image;
        }
        
        resourceFactory.clientResource.get({clientId: routeParams.id, template: 'true'} , function(data) {
            scope.offices = data.officeOptions;
            scope.staffs = data.staffOptions; 
            scope.officeId = data.officeId;
	   // scope.clientCategory=data.categoryType;
            scope.formData.entryType = data.entryType;
            scope.entryType=data.entryType;
            scope.formData.groupName=data.groupName;
            scope.groupNameDatas=data.groupNameDatas;
            scope.groupNameDatas=data.groupNameDatas;
          /*  var filePath = data.imageKey;
            scope.fileName=filePath.split("/").pop();
            $("#file").on('trigger',function(evt) {
    			var files = [],fileList, i;
    			files[0]=new File([""],scope.fileName);
    			fileList = evt.target.files;
    			console.log(evt.target.files);
    			if (fileList != null) {
    				for (i = 0; i < fileList.length; i++) {	
    					files.push(fileList.item(i));
    				}
    			}*/
    			
    		});
        	
        for(var i=0;i<scope.groupNameDatas.length;i++){
	    	if(scope.groupNameDatas[i].groupName==data.groupName){
	    		scope.groupName=scope.groupNameDatas[i].groupName;
	    		scope.groupId=scope.groupNameDatas[i].id;
	    	}
	    }
        
	    scope.clientCategoryDatas=data.clientCategoryDatas;

	    for(var i=0;i<scope.clientCategoryDatas.length;i++){
	    	if(scope.clientCategoryDatas[i].categoryType==data.categoryType){
	    		scope.clientCategory=scope.clientCategoryDatas[i].id;
	    	}
	    }

            scope.formData = {
              firstname : data.firstname,
              lastname : data.lastname,
              middlename : data.middlename,
              active : data.active,
              accountNo : data.accountNo, 
              staffId : data.staffId,
              email:data.email,
              phone:data.phone,
              externalId:data.externalId,
              homePhoneNumber:data.homePhoneNumber
            };
            var actDate = dateFilter(data.activationDate,'dd MMMM yyyy');
            scope.date.activationDate = new Date(actDate);
            if(data.active){
                scope.choice = 1;
            }

       

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        
        };
        
        scope.submit = function() {
	     this.formData.officeId=scope.officeId;
             this.formData.clientCategory=scope.clientCategory;
             this.formData.groupId=scope.groupId;
             this.formData.locale = $rootScope.locale.code;
             this.formData.dateFormat = 'dd MMMM yyyy';
             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
             resourceFactory.clientResource.update({'clientId': routeParams.id},this.formData,function(data){
            	
              if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  location.path('/viewclient/'+data.resourceId);
                });
              } else{
                location.path('/viewclient/' + data.resourceId);
              }
          });
        };
    }
  });
  mifosX.ng.application.controller('EditClientController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter','API_VERSION','$rootScope','$upload','$parse', mifosX.controllers.EditClientController]).run(function($log) {
    $log.info("EditClientController initialized");
  });
}(mifosX.controllers || {}));
