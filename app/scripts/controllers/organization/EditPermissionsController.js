(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPermissionsController: function(scope, routeParams, location, resourceFactory) {
      scope.permissions = [];
      scope.groupings = [];
      scope.formData = {};
      var tempPermissionUIData = [];
      resourceFactory.rolePermissionResource.get({roleId:routeParams.id}, function(data) {
        scope.role = data;

        var currentGrouping = "";
        for (var i in data.permissionUsageData) {
          if (data.permissionUsageData[i].grouping != currentGrouping)
          {
            currentGrouping = data.permissionUsageData[i].grouping;
            scope.groupings.push(currentGrouping);
            var newEntry = { permissions: [] };
            tempPermissionUIData[currentGrouping] = newEntry;
          }
          var temp = { code:data.permissionUsageData[i].code};
          scope.formData[data.permissionUsageData[i].code] = data.permissionUsageData[i].selected;
          tempPermissionUIData[currentGrouping].permissions.push(temp);
        }
        scope.showPermissions = function (grouping) {
          if (scope.previousGrouping) {
            tempPermissionUIData[scope.previousGrouping] = scope.permissions;
          }
          scope.permissions = tempPermissionUIData[grouping];
          scope.previousGrouping = grouping;
        };
        //by default show special permissions
        scope.showPermissions('special');

        scope.permissionName = function (name) {
          name = name || "";
          //replace '_' with ' '
          name = name.replace(/_/g, " ");
          //for reorts replace read with view
          if (scope.previousGrouping == 'report') {name = name.replace(/READ/g, "View");}
          return name;
        };

        scope.formatName = function (string) {
          if (string.indexOf('portfolio_') > -1) {
            string = string.replace("portfolio_", "");
          }
          if (string.indexOf('transaction_') > -1) {
            var temp = string.split("_");
            string = temp[1]+" "+temp[0].charAt(0).toUpperCase() + temp[0].slice(1)+"s";
          }
          string = string.charAt(0).toUpperCase() + string.slice(1);
          return string;
        };
      });
      
      scope.submit = function() {
        var permissionData = {};
      /*For Accounting permissions and inventory mrn and billingmaster MEDIAASSET,region,PLANMAPPING,EVENTACTIONMAP 
        and billing RANDAMGENERATOR,BILLINGMESSAGE and ordering PROVISIONINGSYSTEM 
        if(this.formData.CREATE_ACCOUNTINGRULE||this.formData.CREATE_GLACCOUNT||
        		this.formData.CREATE_GLCLOSURE||this.formData.CREATE_JOURNALENTRY||
        		this.formData.CREATE_MRN||this.formData.CREATE_MEDIAASSET||
        		this.formData.CREATE_REGION||this.formData.CREATE_RANDAMGENERATOR||
        		this.formData.CREATE_BILLINGMESSAGE||this.formData.CREATE_PLANMAPPING||
        		this.formData.CREATE_PROVISIONINGSYSTEM||this.formData.CREATE_EVENTACTIONMAP||
        		this.formData.CREATE_PAYMENT||this.formData.CREATE_CREDITDISTRIBUTION||
        		this.formData.CREATE_INVOICE||this.formData.CREATE_EVENTORDER)
        	this.formData.ALL_FUNCTIONS_READ = true;
        	
        //In Authorisation permissions
        if(this.formData.CREATE_USER)
        	this.formData.READ_USER = true;
        //In organization permissions
        if(this.formData.CREATE_OFFICE)
        	this.formData.READ_OFFICE = true;
        if(this.formData.CREATE_STAFF)
        	this.formData.READ_STAFF = true;
        //for Inventory permissions
        if(this.formData.CREATE_INVENTORY)
        	this.formData.READ_INVENTORY = true;
        if(this.formData.CREATE_ITEM)
        	this.formData.READ_ITEM = true;
        	 //for configuration permissions
        if(this.formData.CREATE_REPORT)
        	this.formData.READ_REPORT = true;
        
        //for billing master permissions
        if(this.formData.CREATE_CONTRACT)
        	this.formData.READ_CONTRACT = true;
        
        if(this.formData.CREATE_COUNTRYCURRENCY)
        	this.formData.READ_COUNTRYCURRENCY = true;
       
        if(this.formData.CREATE_SERVICE)
        	this.formData.READ_SERVICE = true;
        
        if(this.formData.CREATE_PLAN)
        	this.formData.READ_PLAN = true;
        	
        	if(this.formData.CREATE_ORDER)
        	this.formData.READ_ORDER = true;
        if(this.formData.CREATE_ADJUSTMENT)
        	this.formData.READ_ADJUSTMENT = true;
        if(this.formData.CREATE_BILLMASTER)
        	this.formData.READ_BILLMASTER = true;
        if(this.formData.CREATE_ONETIMESALE)
        	this.formData.READ_ONETIMESALE = true;
        	*/
        
        //for prospects permissions
        if(this.formData.CREATE_PROSPECT)
        	this.formData.READ_PROSPECT = this.formData.READ_ADDRESS = true;
        
        if(this.formData.EDIT_PROSPECT)
        	this.formData.READ_ADDRESS = true;
        
        if(this.formData.CONVERT_PROSPECT)
        	this.formData.CREATE_CLIENT = true;
        
       
        
        //for portfolio permissions
        if(this.formData.CREATE_CLIENT)
        	this.formData.READ_ADDRESS = this.formData.READ_CLIENT = true;
        
        //for odering permissions
        if(this.formData.ACTIVATIONPROCESS_ACTIVATE)
        	this.formData.READ_ADDRESS = this.formData.READ_ALLOCATION =this.formData.READ_ORDER =
        		this.formData.READ_ONETIMESALE =this.formData.READ_CLIENT= true;
        
        permissionData.permissions = this.formData;
        resourceFactory.rolePermissionResource.update({roleId:routeParams.id},permissionData,function(data){
          location.path('/admin/viewrole/' + data.resourceId);
        });
      };
    }
  });
  mifosX.ng.application.controller('EditPermissionsController', ['$scope', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.EditPermissionsController]).run(function($log) {
    $log.info("EditPermissionsController initialized"); 
  });
}(mifosX.controllers || {}));
