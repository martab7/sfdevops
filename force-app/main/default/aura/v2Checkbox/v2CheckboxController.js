({
    onInit: function (component, event, helper){ 
        document.addEventListener("grecaptchaVerified", function(e) {
            component.set('v.recaptchaResponse', e.detail.response);
            let myButton = component.find("myButton");
            myButton.set('v.disabled', false);
        });
        
        document.addEventListener("grecaptchaExpired", function() {
            let myButton = component.find("myButton");
            myButton.set('v.disabled', true);
        }); 
    },
    onRender: function (component, event, helper){ 
        document.dispatchEvent(new CustomEvent("grecaptchaRender", { "detail" : { element: 'recaptchaCheckbox'} }));
    },
    doSubmit: function (component, event, helper){
        var action = component.get("c.insertRecord");
        action.setParams({
            record: null, //TODO: map UI fields to sobject
            recaptchaResponse: component.get('v.recaptchaResponse')
        });
        
        action.setCallback(this, function(response) {
            document.dispatchEvent(new Event("grecaptchaReset"));
            let myButton = component.find("myButton");
            myButton.set('v.disabled', true);
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                alert(result);
            } else {
                var errors = response.getError();
                if (errors) {
                    console.log(errors[0]);
                }
            }
        });
        
        $A.enqueueAction(action);
    }
})