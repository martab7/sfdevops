@RestResource (urlMapping='/GeolocationAPI/*')
global with sharing class GeolocationService {
    @HttpGet global static List<Test_Geolocation__c> getLocations() {
        RestRequest req = RestContext.request;
        String brandCode = req.params.get('brandCode');
        
        if (req.params.containsKey('lat') && req.params.containsKey('long')) {
            Double latit = Double.valueOf(req.params.get('lat'));
            Double longit = Double.valueOf(req.params.get('long'));
        
            return [SELECT Name, Location__c, Concept_Code__c, Concept_Location_Code__c, Location_State_Code__c
                    FROM Test_Geolocation__c
                    WHERE Concept_Code__c = :brandCode
                    ORDER BY DISTANCE(Location__c, GEOLOCATION(:latit, :longit), 'mi')];
        } else {
            return [SELECT Name, Location__c, Concept_Code__c, Concept_Location_Code__c, Location_State_Code__c
                    FROM Test_Geolocation__c
                    WHERE Concept_Code__c = :brandCode];
        }
    }
}