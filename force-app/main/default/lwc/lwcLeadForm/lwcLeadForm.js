import { LightningElement } from 'lwc';
import subscribeHeader from '@salesforce/resourceUrl/subscribeHeader';
import createNewLead from '@salesforce/apex/LeadController.createNewLead';

export default class LwcLeadForm extends LightningElement {
    imageURL = subscribeHeader;
    firstName;
    lastName;
    email;
    company;
    isOptedIn = true;
    flowCompleted = true;
    isError = false;
    isSuccess = false;
    allowSubmit;

    // handleCaptchaReceived(event) {
    //     console.log('received message from child');
    //     console.log('childMessage', JSON.stringify(event.detail));
    //     if(event.detail.data === true){
    //         this.allowSubmit = true;
    //     }
    // }

    handleSubmit() {
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.email);
        console.log(this.company);
        console.log(this.isOptedIn);
        this.flowCompleted = false;
        createNewLead({firstName: this.firstName, lastName: this.lastName, email: this.email, company: this.company, optIn: this.isOptedIn})
        .then(result => {
            console.log('success');
            console.log(result);

            this.flowCompleted = true;

            if (result) {
                this.isSuccess = true;
            } else {
                this.isError = true;
            }

        })
        .catch(error => {
            console.log(error);
        });
        
    }

    handleInputChange(event) {
        let name = event.target.name;
        this[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }
}