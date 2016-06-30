/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('createCandidateService', function(fireBaseService, toastr) {
        var count = 0;
        var images = [
            'https://media.licdn.com/media/p/4/005/040/1b3/01e38c0.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/094/1fc/1a4ebe2.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/117/318/3e5b8e7.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAZVAAAAJGRhZjhhNzZiLWJhZTMtNDZmNy04NTc0LTE5YmU3Y2QxOGZjOQ.jpg',
            'https://media.licdn.com/media/p/1/000/05f/03a/1a7e9ac.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAWZAAAAJDlhODQwZTk5LWRlOTAtNDlmOS05NWRlLWUyOGM1OGE2ZTgxNg.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/04e/022/31ba728.jpg',
            'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAK8AAAAJDAwOWFhYjE4LTZhZmQtNDE4Yi05N2Y5LWUxMTNhMjA1NTk3MQ.jpg'
        ];

        var candidate = null;

        var createCandidateService = {
            initCandidate: function(){
                candidate = {
                    firstName:null,
                    lastName: null,
                    candidatePhone: null,
                    candidateEmail: null,
                    interviewerName: null,
                    team: null,
                    date: null
                };
            },
            getCandidate: function(){
                return candidate;
            },
            setCandidate: function(newCandidate){
                candidate = newCandidate;
            },
            createCandidate: function(candidate) {
                //candidate.img = images[Math.floor((Math.random() * 7) + 1)];
                candidate.img = images[count++ % 7]; //todo replace this
                fireBaseService.saveCandidate(candidate).then(function(){
                    toastr.success('Candidate "' + candidate.firstName + ' ' + candidate.lastName + '" was save successfully', "Save");
                });
            }
        };

        createCandidateService.initCandidate();

        return createCandidateService;
    });
