/**
 * Created by Nitsan on 19/12/2016.
 */
angular.module('interviewers')
    .constant("interviewerSettings", {
        cols: [{
            field: "firstName",
            title: "First Name",
            filter: {
                firstName: "text"
            },
            sortable: "firstName",
            dataType: "text"
        }, {
            field: "lastName",
            title: "Last Name",
            filter: {
                lastName: "text"
            },
            sortable: "lastName",
            dataType: "text"
        }, {
            field: "title",
            title: "Job Title",
            filter: {
                title: "text"
            },
            sortable: "title",
            dataType: "title"
        }, {
            field: "email",
            title: "Email",
            filter: {
                email: "text"
            },
            sortable: "email",
            dataType: "email"
        }, {
            field: "phone",
            title: "Phone",
            dataType: "phone"
        },{
            field: "team",
            title: "Team",
            filter: {
                team: "text"
            },
            sortable: "team",
            dataType: "text"
        }, {
            field: "action",
            title: "",
            dataType: "command"
        }]
    });