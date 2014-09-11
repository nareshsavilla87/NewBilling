(function(selfcare_module) {
  selfcare.models = _.extend(selfcare_module, {
    roleMap: {
      1: "superuser",
      2: "branchmanager",
      3: "funder"
    }
  });
}(selfcare.models || {}));
