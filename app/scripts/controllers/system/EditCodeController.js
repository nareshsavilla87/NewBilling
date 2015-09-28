(function(module) {
    mifosX.controllers = _.extend(module, {
        EditCodeController: function(scope, routeParams , resourceFactory, location,PermissionService, route ) {
            scope.codevalues = [];
            scope.newcodevalues = [];
            scope.newEle = undefined;
            scope.PermissionService = PermissionService;

            resourceFactory.codeResources.get({codeId: routeParams.id} , function(data) {
                scope.code = data;
                scope.codeId = data.id;
            });
            
            resourceFactory.codeValueResource.getAllCodeValues({codeId: routeParams.id} , function(data) {
                scope.codevalues = data;
            	for(var i in scope.codevalues){
					scope.codevalues[i].disable = true;				
			}
            });

            scope.addCv = function(){
                if(scope.newEle != undefined && scope.newEle.hasOwnProperty('name')) {
                    resourceFactory.codeValueResource.save({codeId: routeParams.id},this.newEle,function(data){
                        scope.stat=false;
                        location.path('/viewcode/'+routeParams.id);
                    });
                }

            };

            scope.deleteCv = function(id){
                      resourceFactory.codeValueResource.remove({codeId: routeParams.id,codevalueId: id},{},function(data){
                          scope.stat=false;
                          location.path('/viewcode/'+routeParams.id);                                   
                      });                         
            };
            scope.editCv = function(index,id){
            	$(".configParam"+id).removeAttr("disabled");
            	scope.codevalues[index].disable = false;
            }
            scope.cancelCv = function(index,id){
            	$(".configParam"+id).attr("disabled", "disabled");
            	scope.codevalues[index].disable = true;
            }
            scope.updateCv = function(index,id){
            	scope.codevalues[index].disable = undefined;
            	resourceFactory.codeValueResource.update({codeId: routeParams.id,codevalueId: id},scope.codevalues[index],function(data){
                    scope.stat=false;
                    location.path('/viewcode/'+routeParams.id);                                   
                });                         
      };
        }
   
    });
    mifosX.ng.application.controller('EditCodeController', [
	'$scope', 
	'$routeParams',
	'ResourceFactory',
	'$location',
	'PermissionService', 
	'$route', 
	mifosX.controllers.EditCodeController
	]).run(function($log) {  
		$log.info("EditCodeController initialized");
    });
}(mifosX.controllers || {}));
