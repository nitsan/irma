import * as angular from 'angular';

angular.module('core')
    .factory('yesNoModalService', yesNoModalService);

yesNoModalService.$inject= ['$uibModal'];

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