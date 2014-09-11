(function(selfcare_module) {
  selfcare.models = _.extend(selfcare_module, {
    LoggedInUser: function(data) {
      this.name = data.username;
      
      this.getHomePageIdentifier = function() {
        var role = _.first(data.selectedRoles || data.roles);
        return selfcare.models.roleMap[role.id];
      };
    }
  });
}(selfcare.models || {}));
