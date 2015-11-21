(function(module) {
	mifosX.controllers = _.extend(module, {
		EditTicketController : function(scope, webStorage, routeParams,
				resourceFactory, location, http, API_VERSION, $rootScope,
				$upload, dateFilter, $modal) {
			scope.formData = {};
			scope.data = {};
			scope.start = {};
			var locationOrigin = window.location.origin;
			var locationPathname = window.location.pathname;

			resourceFactory.editTicketResource.get({
				clientId : routeParams.clientId,
				id : routeParams.id
			}, function(data) {
				scope.formData = data;
				scope.statusTypes = data.statusType;

				resourceFactory.ticketResource.get({
					id : routeParams.id,
					clientId : routeParams.clientId
				}, function(data) {
					scope.ticket = data;
					scope.clientId = routeParams.clientId;
				});
				resourceFactory.commentHistoryResource.get({id : routeParams.id,historyParam:"comment"	}, 
						function(data) {
					scope.historyData = data.masterData;
					scope.problemDescription = data.problemDescription;
					angular.forEach(scope.historyData,function(val,key){
						scope.historyData[key].createdDate= dateFilter(new Date(val.createdDate),'dd/MM/yy');
						/*console.log(scope.historyData[key].createdDate);*/
					});
				});

				if (angular.uppercase(data.status) == 'CLOSED') {
					scope.statusTypes = [];
					scope.statusTypes.push({
						mCodeValue : "CLOSED"
					});
					scope.statusTypes.push({
						mCodeValue : "Open"
					});
				}

				scope.problemsDatas = data.problemsDatas;
				scope.priorityTypes = data.priorityType;
				scope.ticketissue = data.ticketissue;
				scope.description = data.description;
				scope.usersData = data.usersData;
				// scope.formData.status=14;
				scope.clientId = routeParams.clientId;
				scope.ticketId = routeParams.id;
				scope.data.ticketDate = dateFilter(new Date(data.ticketDate),'dd MMMM yyyy');
				var clientData = data.clientData;
				scope.displayName = clientData.displayName;
				scope.statusActive = clientData.statusActive;
				scope.hwSerialNumber = clientData.hwSerialNumber;
				scope.accountNo = clientData.accountNo;
				scope.officeName = clientData.officeName;
				scope.balanceAmount = clientData.balanceAmount;
				scope.currency = clientData.currency;
				scope.imagePresent = clientData.imagePresent;
				scope.categoryType = clientData.categoryType;
				scope.email = clientData.email;
				scope.phone = clientData.phone;
			});

			scope.reset123 = function() {
				webStorage.add("callingTab", {
					someString : "Tickets"
				});
			};
			scope.onFileSelect = function($files) {
				scope.file = $files[0];
			};
			
			scope.history = function() {

				$modal.open({
					templateUrl : 'history.html',
					controller : HistoryController,
					resolve : {}
				});
			};

			var HistoryController = function($scope, $modalInstance) {

				resourceFactory.ticketHistoryResource.get({
					id : routeParams.id
				}, function(data) {
					$scope.historyData = data.masterData;
					$scope.problemDescription = data.problemDescription;
					angular.forEach($scope.historyData,function(val,key){
						$scope.historyData[key].createdDate= dateFilter(new Date(val.createdDate),'dd/MM/yy');
						/*console.log($scope.historyData[key].createdDate);*/
					});
				});

				$scope.ok = function() {
					$modalInstance.dismiss('cancel');
				};

			};
			
			scope.comment = function() {

				$modal.open({
					templateUrl : 'comment.html',
					controller : CommentController,
					resolve : {}
				});
			};
			var CommentController = function($scope, $modalInstance) {

				$scope.formData={};
				$scope.formData.comments = scope.comments;
     	           $scope.submit = function () {
     	        	   scope.formData.comments = $scope.formData.comments;
     	        	   //only view comment code
     	        	   var assignedTo = "";
     	        	   for(var i in scope.usersData){
     	        		   if( scope.formData.userId == scope.usersData[i].id){
     	        			  assignedTo = scope.usersData[i].userName;
     	        		   }
     	        	   }
     	        	   scope.historyData.push({createdDate : dateFilter(new Date(scope.formData.ticketDate),'dd/MM/yy'),assignedTo:assignedTo,statusDescription:$scope.formData.comments});
     	        	 
     	        	   
     	        	   $modalInstance.dismiss('cancel');
                };
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			};
						
			scope.submit = function() {
				scope.formData.dateFormat = 'dd MMMM yyyy';
				this.data.assignedTo = this.formData.userId;
				/*var input = scope.formData.comments;
				if(angular.isUndefined(input) || input === null || input === '')
				{
					this.data.comments = 'undefined';
					}else{
						this.data.comments =input;
					}*/
				this.data.comments=this.formData.comments; 
				this.data.status = this.formData.status;
				this.data.ticketDate = dateFilter(scope.data.tickeDate,
						'dd MMMM yyyy');
				this.data.priority = this.formData.priority;
			/*	this.data.description = this.formData.description;*/
				this.data.issue = this.formData.issue;
				this.data.problemCode = this.formData.problemCode;
				this.data.ticketURL = locationOrigin + '' + locationPathname
						+ "#/viewTicket/" + scope.clientId + "/";
				$upload.upload(
						{
							url : $rootScope.hostUrl + API_VERSION
									+ '/clients/' + routeParams.clientId
									+ '/documents/' + routeParams.id
									+ '/attachment',
							data : scope.data,
							file : scope.file
						}).then(function(data) {
					if (!scope.$$phase) {
						scope.$apply();
					}
					location.path('/assignedtickets');
				});
				scope.reset123();
			};
		}
	});
	mifosX.ng.application.controller(
			'EditTicketController',
			[ '$scope', 'webStorage', '$routeParams', 'ResourceFactory',
					'$location', '$http', 'API_VERSION', '$rootScope',
					'$upload', 'dateFilter', '$modal',
					mifosX.controllers.EditTicketController ]).run(
			function($log) {
				$log.info("EditTicketController initialized");
			});

}(mifosX.controllers || {}));

