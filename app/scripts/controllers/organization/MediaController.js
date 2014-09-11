(function(module) {
  mifosX.controllers = _.extend(module, {
	  MediaController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
        scope.media = [];
        scope.fromMedia="MEDIA";
        scope.PermissionService = PermissionService;
        resourceFactory.mediaResource.getAllMedia(function(data) {
            scope.media= data;
        });
        scope.routeTo = function(mediaid){
            location.path('/viewmedia/'+ mediaid);
          };
          
        /**
  		 * popup for media Locations
  		 * */
          
  			scope.createMediaLocations= function(id){
  				scope.errorStatus=[];
  				scope.errorDetails=[];
  				scope.mediaId=id;
  				$modal.open({
  				  templateUrl: 'medialocation.html',
  				  controller:medialocationController ,
  				  resolve:{}
  				});
  			};
  				         
  			var medialocationController=function($scope,$modalInstance){
  				$scope.formData = {}; 
  				$scope.mediaLanguageDatas=[];
  				$scope.attributesFormData={};
  				$scope.mediaFormats=[];
  				$scope.mediaAssetLocations=[];
  				$scope.mediaLocationFormData={};
  				/**
  				 * retrieving data
  				 * */
  				resourceFactory.mediaTemplateResource.get(function(data) {
  	                $scope.mediaLanguageDatas = data.mediaLanguageData;
  	                $scope.mediaFormats=data.mediaFormat;
  	                $scope.attributesFormData.attributeType="Cast";
  	                $scope.formData = {
  	                };
  	            });
  				/**
  				 * adding locations
  				 * */
  				$scope.addMediaLocation = function () {
  		           if ($scope.mediaLocationFormData.languageId && $scope.mediaLocationFormData.location && $scope.mediaLocationFormData.formatType) {
  		                $scope.mediaAssetLocations.push({languageId:$scope.mediaLocationFormData.languageId, location:$scope.mediaLocationFormData.location, 
  		                	formatType:$scope.mediaLocationFormData.formatType});
  		              
  		                $scope.mediaLocationFormData.languageId = undefined;
  		                $scope.mediaLocationFormData.location = undefined;
  		                $scope.mediaLocationFormData.formatType = undefined;
  		                
  		          	}
  		        };
  		        /**
  				 * removing locations
  				 * */
  		        $scope.removeMediaLocation = function (index) {
  		        	$scope.mediaAssetLocations.splice(index,1);
                };
                /**
                 * Submit
                 * */
  				$scope.accept = function(){
  				  $scope.flag=true;
  				  $scope.formData.mediaDetailType="LOCATIONS";
  				  $scope.formData.mediaAssetLocations =new Array();
  				  if ($scope.mediaAssetLocations.length > 0) {
  	                
  	                 for (var i in $scope.mediaAssetLocations) {
  	                	
  	                   $scope.formData.mediaAssetLocations.push({languageId:$scope.mediaAssetLocations[i].languageId,formatType:$scope.mediaAssetLocations[i].formatType, 
  	                	   location:$scope.mediaAssetLocations[i].location});
  	                 };
  	               }
  				  
  				  
  				  resourceFactory.mediaLocationAttributesResource.save({'id': scope.mediaId},this.formData,function(data){ 
  				      route.reload();
  				      $modalInstance.close('delete');
  				  },function(errData){
  					  $scope.flag = false;
  				  });
  				  
  				  
  				};  
  				$scope.reject = function(){
  				    $modalInstance.dismiss('cancel');
  				};
  			};
  			
  			
  			/**
  	  		 * popup for media Attributes
  	  		 * */
  	          
  	  		scope.createMediaAttributes= function(id){
  	  				scope.errorStatus=[];
  	  				scope.errorDetails=[];
  	  				scope.mediaId=id;
  	  				$modal.open({
  	  				  templateUrl: 'mediaattribute.html',
  	  				  controller:mediaAttributeController ,
  	  				  resolve:{}
  	  				});
  	  			};
  	  				         
  	  			var mediaAttributeController=function($scope,$modalInstance){
  	  				$scope.formData = {}; 
  	  				$scope.mediaAttributes = [];
  	  				$scope.attributesFormData={};
  	  				$scope.mediaassetAttributes=[];
  	  				/**
  	  				 * retrieving data
  	  				 * */
  	  				resourceFactory.mediaTemplateResource.get(function(data) {
  	  	                $scope.mediaAttributes = data.mediaAttributes;
  	  	                $scope.attributesFormData.attributeType="Cast";
  	  	                $scope.formData = {
  	  	                };
  	  	            });
  	  				/**
  	  				 * adding Attributes
  	  				 * */
  	  					$scope.addMedia = function () {
  	  						if ($scope.attributesFormData.attributeName && $scope.attributesFormData.attributevalue 
  	  								&& $scope.attributesFormData.attributeNickname && $scope.attributesFormData.attributeImage) {
  	  									              $scope.mediaassetAttributes
  	  											.push({
  	  												attributeType : $scope.attributesFormData.attributeType,
  	  												attributeName : $scope.attributesFormData.attributeName,
  	  												attributevalue : $scope.attributesFormData.attributevalue,
  	  												attributeNickname : $scope.attributesFormData.attributeNickname,
  	  												attributeImage : $scope.attributesFormData.attributeImage
  	  											});
  	  						$scope.attributesFormData.attributeName = undefined;
  	  						$scope.attributesFormData.attributevalue = undefined;
  	  						$scope.attributesFormData.attributeNickname = undefined;
  	  						$scope.attributesFormData.attributeImage = undefined;
  	          	}
  	            };
  	  		        /**
  	  				 * removing Attributes
  	  				 * */
  	            
  	            		$scope.deleteMedia = function (index) {
  	            			$scope.mediaassetAttributes.splice(index,1);
  	            		};
  	            		
  	                /**
  	                 * Submit
  	                 * */
  	  				$scope.accept = function(){
  	  				  $scope.flag=true;
  	  				  $scope.formData.mediaDetailType="ATTRIBUTES";
  	  				  $scope.formData.mediaassetAttributes =new Array();
  	  				  
  	  				  if ($scope.mediaassetAttributes.length > 0) {
  	  	              
  	  					  for (var i in $scope.mediaassetAttributes) {
  	  						  $scope.formData.mediaassetAttributes
  	 							.push({
  	 									attributeType : $scope.mediaassetAttributes[i].attributeType,
  	 									attributeName : $scope.mediaassetAttributes[i].attributeName,
  	 									attributevalue : $scope.mediaassetAttributes[i].attributevalue,
  	 									attributeNickname : $scope.mediaassetAttributes[i].attributeNickname,
  	 									attributeImage : $scope.mediaassetAttributes[i].attributeImage
  	 								  });
  	  					  };
  	  				  }
  	  				  
  	  				  
  	  				  resourceFactory.mediaLocationAttributesResource.save({'id': scope.mediaId},this.formData,function(data){ 
  	  				      route.reload();
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
  mifosX.ng.application.controller('MediaController', ['$scope', 'ResourceFactory','$location','PermissionService','$modal','$route', mifosX.controllers.MediaController]).run(function($log) {
    $log.info("MediaController initialized");
  });
}(mifosX.controllers || {}));
