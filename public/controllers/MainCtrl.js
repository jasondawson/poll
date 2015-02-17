(function() {

angular
	.module('polls')
	.controller('MainCtrl', MainCtrl);

function MainCtrl () {

	var main = this;
	main.test = "Hello Maino";
}

})();