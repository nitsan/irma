'use strict';
angular.module('core')
    .factory('yesNoModalService', yesNoModalService);

/* @ngInject */
function yesNoModalService($uibModal) {
    let service = {
        createModal: createModal
    };

    return service;


    function createModal(title, bodyText) {
        return $uibModal.open({
            component: 'modalComponent',
            resolve: {
                title: function () {
                    return title;
                },
                bodyText: function () {
                    return bodyText;
                }
            }
        });
    }
}