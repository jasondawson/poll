(function() {

angular
	.module('polls')
	.controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl (mainService, userProfileRef, $timeout) {

	var vm = this;
	vm.profile = userProfileRef;
	vm.saveMessage = "Profile has been updated!";
	vm.showMessage = false;
	

	vm.updateProfile = function() {
		mainService.updateProfile(vm.profile)
			.then(function(response) {
				vm.profile = response;
				vm.showMessage = true;
				$timeout(function() {
					vm.showMessage = false;
				}, 3000)
			})
	}

}

})();