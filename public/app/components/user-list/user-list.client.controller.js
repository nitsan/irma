/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('user-list')
    .controller('userListController', function(userListService) {
        this.users = userListService.getUsers;
    });
