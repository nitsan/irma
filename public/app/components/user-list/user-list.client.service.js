/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('user-list')
    .factory('userListService', function() {

        var userListService = {
            getUsers: function(){
                return [
                    {name: "Nitsan Zohar", phone: "0522569766"},
                    {name: "Tsukit Kalif", phone: "0542097036"},
                    {name: "Liora Libhaber", phone: "0545604111"},
                    {name: "Igal Liberman",phone:  "0544316959"},
                    {name: "Shira Hoffer", phone: "0504225625"}
                ]
            }
        }

        return userListService;
    });
