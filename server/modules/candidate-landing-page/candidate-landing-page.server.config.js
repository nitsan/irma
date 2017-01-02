/**
 * Created by Nitsan on 01/01/2017.
 */
'use strict';

module.exports = {
    TEMPLATE_DEFAULT: {
        template: `<h4>Hello {{candidate.displayName}}</h4>
         <p>Your interview has been scheduled for {{candidate.date}} with {{interviewees}}.</p>
         <p>We are located at {{workAddress}} St. on the 1st floor Netanya- Poleg Industry area.</p>
         <p>Note that the entrance to the office is on the right side of the building- behind the "Vertigo" furniture store.</p>
         <p>Please park in one of the nearby parking lots (there is big one next to us). You are welcome to visit our website to learn more about the company and our product: <a href="http://www.startapp.com">www.startapp.com</a>. <a href="https://www.youtube.com/watch?v=mhz6nEui7Zs">https://www.youtube.com/watch?v=mhz6nEui7Zs</a></p> 
         <p>If you have any questions, please let me know.</p>
         <p>Please confirm receiving this mail.</p>
         <p>Good luck,</p>
         <br>
         <p>{{user.displayName}} / {{user.title}}</p>
         <p>M: {{user.mobilePhone}}  / T: {{user.officePhone}}</p>`
    },
    TEMPLATE_MAP: {
        '{{candidate.displayName}}': 'candidate.displayName',
        '{{candidate.date}}': 'moment(candidate.date).format("dddd, MMMM Do YYYY, H:mm")',
        '{{interviewees}}': 'buildIntervieweesString(interviewees)',
        '{{workAddress}}': 'candidateTemplate.address.address',
        '{{user.displayName}}': 'user.displayName',
        '{{user.title}}': 'user.title',
        '{{user.mobilePhone}}': 'user.phone.mobile',
        '{{user.officePhone}}': 'user.phone.office',
    }
};