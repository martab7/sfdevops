public without sharing class LeadController {
    @AuraEnabled
    public static Boolean createNewLead(String firstName, String lastName, String email, String company, Boolean optIn) {
        Map<String, Object> params = new Map<String, Object>();
        params.put('varCampaign', 'SFMC');
        params.put('varCompany', company);
        params.put('varEmail', email);
        params.put('varFirstName', firstName);
        params.put('varLastName', lastName);
        params.put('varOptIn', optIn);
        params.put('varSource', 'Web');
        // Flow.Interview.Create_New_Lead flow1 = new Flow.Interview.Create_New_Lead(params);
        // flow1.start();

        // Boolean returnValue = (Boolean) flow1.getVariableValue('varIsSuccessful');
        Boolean returnValue = true;
        System.debug(returnValue);
        return returnValue;
        // Lead newLead = new Lead();
        // newLead.FirstName = firstName;
        // newLead.LastName = lastName;
        // newLead.Email = email;
        // newLead.Company = company;
        // newLead.HasOptedOutOfEmail = false;
        // insert newLead;
    }
}