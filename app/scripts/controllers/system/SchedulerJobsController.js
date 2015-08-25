(function(module) {
  mifosX.controllers = _.extend(module, {
    SchedulerJobsController: function(scope, resourceFactory, route,location,$modal,PermissionService,$rootScope) {
      var jobIdArray = [];
      var jobNameArray = [];
      scope.PermissionService = PermissionService;
      scope.formData={};
      resourceFactory.jobsResource.get(function(data) {
          scope.jobs = data;
      });
     
      scope.routeTo = function(jobid){
          location.path('/viewschedulerjob/'+ jobid);
        };

      resourceFactory.schedulerResource.get(function(data) {
          scope.schedulerstatus = data.active == true ? 'Active' :'Standby';
      });

      scope.selectAll = function(selectAll) {
        scope.active = selectAll;
        if(selectAll == 'true') {
          for(var i in scope.jobs) {
            jobIdArray.push(scope.jobs[i].jobId);
            
          }
        } else {
          for(var i in scope.jobs) {
            jobIdArray = _.without(jobIdArray,scope.jobs[i].jobId);
          }
        }
      }

      scope.selectAll =function(job){
    	
    	  this.formData.displayName=job.name;
    	  this.formData.cronExpression=job.cronExpression;
    	  this.formData.active=job.active;

          resourceFactory.jobsResource.update({jobId:job.jobId}, this.formData, function(data){
            location.path('/jobs/');
          });
        
    	  
      };
      scope.runJobSelected = function(job, active) {
        if(active == 'true') {
        	if(job.displayName == "Messanger"){
        		jobNameArray.push(job.jobId);
        	
        	}
          jobIdArray.push(job.jobId);
        } else {
          jobIdArray = _.without(jobIdArray,job.jobId);
        }
      }

      scope.runSelectedJobs = function() {
    	  scope.sentForExecution = [];
    	  var jobidd;
          for(var i in jobIdArray) {
            for(var j in scope.jobs) {
            	
              if(scope.jobs[j].jobId == jobIdArray[i]) {
            	 
            	 
                scope.sentForExecution.push(scope.jobs[j].displayName);
            	 
              }
            }
          }
          for(var i in jobIdArray) {
        	           if(jobNameArray[i] == jobIdArray[i]){
        	            		  jobidd=scope.jobs[j].jobId;
        	            		  $modal.open(
        	                			  {
        	                          templateUrl: 'approve1.html',
        	                          controller: Approve,
        	                          resolve:{
        	                        	  name:function(){
        	                        		return jobIdArray[i];
        	                        	  }
        	                          }
        	                      });
        	            		 
        	           }else{
        	    	resourceFactory.jobsResource.save({jobId: jobIdArray[i], command : 'executeJob'}, {}, function(data){
            });
        	           }
          }
      }

      scope.suspendJobs = function() {
        resourceFactory.schedulerResource.save({command : 'stop'}, {}, function(data) {
          route.reload();
        });
      }

      scope.activeJobs = function() {
        resourceFactory.schedulerResource.save({command : 'start'}, {}, function(data) {
          route.reload();
        });
      }

      scope.refresh = function() {
        route.reload();
      }
      
      var Approve = function($scope,$modalInstance,name){
    	
    	var a=name;
    
    	
    	$scope.jobParams=[];
    	$scope.reportDatas=[];
    	$scope.billingMessageDatas=[];
    	 
    	  resourceFactory.jobsparameters.get({jobId : a}, function(data) {
    		  $scope.reportDatas = data.queryData;
    		  $scope.billingMessageDatas=data.billingMessageDatas;
    	       
    	      });
			$scope.accept = function(date){
				$scope.flagapprove=true;
			        	this.formData.jobName="Messanger";
			        	this.formData.dateFormat="dd MMMM yyyy";
			        	this.formData.locale=$rootScope.locale.code;
			            resourceFactory.jobsparameters.update({jobId:a}, this.formData, function(data){
			            	$modalInstance.dismiss('delete');
			              },function(errData){
			            	  $scope.flagapprove=false;
			        	  $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			        	  
			        	  
			          });
			            resourceFactory.jobsResource.save({jobId: a, command : 'executeJob'}, {}, function(data){
	                      });    
			};
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		};
    }
  });
  mifosX.ng.application.controller('SchedulerJobsController', ['$scope', 'ResourceFactory', '$route', '$location','$modal','PermissionService','$rootScope', mifosX.controllers.SchedulerJobsController]).run(function($log) {
    $log.info("SchedulerJobsController initialized");
  });
}(mifosX.controllers || {}));
