(function(selfcare_module) {
  selfcare.models = _.extend(selfcare_module, {
    Role: function(data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
    }
  });
}(selfcare.models || {}));
