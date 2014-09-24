(function(module) {
	mifosX.controllers = _.extend(module,{
		EditEventController : function(scope,routeParams,resourceFactory,dateFilter, location) {
							scope.eventStatus = [];
							scope.chargeData = [];
							scope.availableServices = [];
							scope.allowed = [];
							scope.restricted = [];										
							scope.selectedServices = [];
							scope.formData = {};							
							scope.date = {};
							resourceFactory.eventEditResource.get({eventId: routeParams.id} , function(data) {								
                                scope.formData=data;                            
                                //scope.formData.allowCancellation=false;
								scope.eventStatus = data.statusData;
								scope.chargeData = data.chargeData;
								scope.selectedServices=data.selectedMedia;
								scope.availableServices = data.mediaAsset;
								if(data.allowCancellation == 'true'){
									scope.formData.allowCancellation=true;
								}
								
								for ( var i in data.selectedMedia) {	
									 //alert('var i in data.selectedMedia'+data.selectedMedia[i].mediaId);
									for ( var j in data.mediaAsset) {	
										 //alert('var j in data.mediaAsset'+data.mediaAsset[j].mediaId);
										if (data.mediaAsset[j].mediaId == data.selectedMedia[i].mediaId) {																		
											scope.availableServices.splice(j, 1);
										}
									}
								}
								scope.restricted=data.selectedMedia;
								scope.eventCategeorydatas = data.eventCategeorydata;
								
								 var actDate = dateFilter(data.eventStartDate,'dd MMMM yyyy');
						            scope.date.startDate = new Date(actDate);
						            
						            var endDate = dateFilter(data.eventEndDate,'dd MMMM yyyy');
						            scope.date.endDate = new Date(endDate );
						            
						            var eventValidity = dateFilter(data.eventValidity,'dd MMMM yyyy');
						            scope.date.eventValidity = new Date(eventValidity );
							});
							
							
							

							scope.restrict = function() {								
								for ( var i in this.allowed) {		
									 //alert('var i in this.allowed in restrick'+this.allowed[i]));
									for ( var j in scope.availableServices) {	
										// alert('var j scope.availableServices'+scope.availableServices[j].mediaId);
										if (scope.availableServices[j].mediaId == this.allowed[i]) {	
											
											var temp = {};
											temp.mediaId = this.allowed[i];
											temp.mediaTitle = scope.availableServices[j].mediaTitle;								
											scope.selectedServices.push(temp);
											scope.availableServices.splice(j, 1);
										}
									}
								}
							};
							scope.allow = function() {
								for ( var i in this.restricted) {
									 
									for ( var j in scope.selectedServices) {
										 
										if (scope.selectedServices[j].mediaId == this.restricted[i]) {
											
											var temp = {};
											temp.mediaId = this.restricted[i];
											temp.mediaTitle = scope.selectedServices[j].mediaTitle;									
											scope.availableServices.push(temp);
											scope.selectedServices.splice(j, 1);
										}
									}
								}
							};

							scope.submit = function() {
								
								this.formData.locale = 'en';
								this.formData.dateFormat = 'dd MMMM yyyy';
								
								this.formData.status=this.formData.statusId;
								this.formData.eventStartDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');
								this.formData.eventEndDate = dateFilter(scope.date.endDate,'dd MMMM yyyy');
								this.formData.eventValidity = dateFilter(scope.date.eventValidity,'dd MMMM yyyy');
								
								delete this.formData.id;
								delete this.formData.statusData;
								delete this.formData.chargeData;
								delete this.formData.mediaAsset;
								delete this.formData.optType;
								delete this.formData.selectedMedia;
								delete this.formData.statusId;
								delete this.formData.eventCategeorydata;
								
								var temp = [];
								for ( var i in scope.selectedServices) {
									temp[i] = scope.selectedServices[i].mediaId;
								}
								this.formData.mediaData = temp;
								resourceFactory.eventEditResource.update({eventId: routeParams.id},
										this.formData, function(data) {
											location.path('/viewEvent/'
													+ data.resourceId);
										});
							};
						}
					});
	mifosX.ng.application.controller('EditEventController', ['$scope', '$routeParams', 'ResourceFactory','dateFilter', '$location', mifosX.controllers.EditEventController]).run(function($log) {
	    $log.info("EditEventController initialized");
	  });
	
}(mifosX.controllers || {}));