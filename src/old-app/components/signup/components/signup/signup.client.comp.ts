/**
 * Created by Nitsan on 26/12/2016.
 */
angular
    .module('signup')
    .component('signUp', {
        controller: signUpCtrl,
        templateUrl: './signup.client.html'
    });

signUpCtrl.$inject= ['signUpService', 'toastr', '$state'];

function signUpCtrl(signUpService, toastr, $state) {
    let $ctrl = this;
    $ctrl.signUp = signUp;

    this.$onInit = () => {
        $ctrl.user = {};
    };

    function signUp() {
        let isValid = $ctrl.signUpForm.$valid;
        if (isValid) {
            signUpService.signUpUser($ctrl.user)
                .then(response => {
                    let user = response.data;
                    console.log("user: ", user);
                    toastr.success("Sign up successfully", "Sign Up");
                    $state.go('candidateList');
                })
                .catch(response => {
                    toastr.error(`Cannot sign up user" ${response.data.err}`, "Sign Up");
                });
        } else {
            toastr.error("Cannot sign up user", "Sign Up");
        }
    }
}