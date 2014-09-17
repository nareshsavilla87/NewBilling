(function(selfcare_module) {
   selfcare.models = _.extend(selfcare_module, {
	   //return URL form after clients success
	   dalpayURL : "https://secure.dalpay.is/cgi-bin/order2/processorder1.pl?mer_id=999148&pageid=1&item1_qty=1&user2=" +
	   		"https://localhost:5560//Clientapp/myaccount/index.html&num_items=1"
  });
}(selfcare.models || {}));