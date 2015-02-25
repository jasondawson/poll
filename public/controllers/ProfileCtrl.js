(function() {

angular
	.module('polls')
	.controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl (mainService, userProfileRef) {

	var vm = this;
	vm.profile = userProfileRef;
	

	vm.updateProfile = function() {
		console.log(vm.profile);
		mainService.updateProfile(vm.profile)
			.then(function(response) {
				vm.profile = response;
			})
	}

}

})();