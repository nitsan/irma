/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('candidateEditorService', function ($http) {
        var images = [
            'https://media.licdn.com/media/p/4/005/040/1b3/01e38c0.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/094/1fc/1a4ebe2.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/117/318/3e5b8e7.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAZVAAAAJGRhZjhhNzZiLWJhZTMtNDZmNy04NTc0LTE5YmU3Y2QxOGZjOQ.jpg',
            'https://media.licdn.com/media/p/1/000/05f/03a/1a7e9ac.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAWZAAAAJDlhODQwZTk5LWRlOTAtNDlmOS05NWRlLWUyOGM1OGE2ZTgxNg.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/04e/022/31ba728.jpg'
        ];

        var candidateEditorService = {
            getCandidate: function (candidateId) {
                return $http.get(`/api/candidate/${candidateId}`)
                    .then(function (response) {
                        return response.data;
                    });
            },
            saveCandidate: function (candidate) {
                return candidate.candidateId ? this.updateCandidate(candidate) : this.createCandidate(candidate)
            },
            createCandidate: function (candidate) {
                candidate.img = images[Math.floor((Math.random() * images.length))]; //todo replace this
                return $http.post('/api/candidate', {candidate: candidate})
                    .then(function (response) {
                        return response.data;
                    });
            },
            updateCandidate: function (candidate) {
                return $http.put('/api/candidate', {candidate: candidate})
                    .then(function (response) {
                        return response.data;
                    });
            }
        };

        return candidateEditorService;
    });
