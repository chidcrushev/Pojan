let PojanForm = {
    init: ( config ) => {
        let self = PojanForm;
       
        self.signInForm = config.signInForm;
        self.signUpForm = config.signUpForm;

        self.loaderElem = document.getElementById('loader');
        self.formError = document.getElementById('formError');

        self.signInForm ? self.signInForm.addEventListener('submit', self.applySignIn) : false;  
        self.signUpForm ? self.signUpForm.addEventListener('submit', self.applySignUp) : false;  
    },

    applySignIn: async ( e ) => {
        let self = PojanForm;
        e.preventDefault();

        // Disable the submit button
        self.disableBtn(e);

        // Show loader
        self.loader(true, self.signInForm);
    
        // Get form data
        let formDataString = new URLSearchParams(new FormData(self.signInForm)).toString();

        // Post form data
        self.requests('/signin', null,  formDataString)
        .then( response => {

            if (response.ok ) {
                return response.json();
            }
        
            throw new Error(response.statusText);

        }).then( result => {
            
            // Disable the div error element if it is visible 
            if( self.formError){
                self.formError.classList.add('hide');
                self.formError.textContent = '';
            }
            
            // Display the success toast and redirect to signin page after 5 secs
            self.displayToast(result.message)
            .then( () => {
                self.signInForm.reset();
                window.location = '/posts';
            });

        }).catch( error => {

            // Throw error
            self.formError.classList.add('show');
            self.formError.textContent = error.message;

        }).finally(() => {
            self.loader(false, self.signInForm);
            self.enableBtn(e);
        });
    },
    
    applySignUp: async ( e ) => {
        let self = PojanForm;
        e.preventDefault();

        // Disable the submit button
        self.disableBtn(e);

        // Show loader
        self.loader(true, self.signUpForm);
        
        // Get form data
        let formData = new FormData(self.signUpForm);

        // Create time stamp
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        formData.append('created_at', date);
        formData.append('updated_at', date);

        // Remove the extra password data
        formData.delete('confirm_password');

        // Post form data
        self.requests('/signup', formData)
        .then( response => {

            if (response.ok ) {
                return response.json();
            }
        
            throw new Error(response.statusText);

        }).then( result => {
            
            // Disable the div error element if it is visible 
            if( self.formError){
                self.formError.classList.add('hide');
                self.formError.textContent = '';
            }
            
            // Display the success toast and redirect to signin page after 5 secs
            self.displayToast(result.message)
            .then( () => {
                self.signUpForm.reset();
                // self.delay(4000).then(() => {
                    window.location = '/signin';
                // });
            });

        }).catch( error => {
            
            // Throw error
            self.formError.classList.add('show');
            self.formError.textContent = error.message;

        }).finally(() => {
            self.loader(false, self.signUpForm);
            self.enableBtn(e);
        });
    },

    disableBtn: ( e ) => {
        let btn = document.getElementById(e.target.action.id);
        btn.setAttribute('disabled', 'disabled');
    },
    
    enableBtn: ( e ) => {
        let btn = document.getElementById(e.target.action.id);
        btn.removeAttribute('disabled');
    },
   
    loader: ( bool, form ) => {
        let self = PojanForm;
        if(bool){
            self.loaderElem.style.display = 'block';
            form.classList.add('uses-loader');
        } else {
            self.loaderElem.style.display = 'none';
            form.classList.remove('uses-loader');
        }
    },

    displayToast: async (message) => {
        return await M.toast({
            html: message, 
            classes: 'rounded',
            completeCallback: async () => {
                await M.toast({html: 'Redirecting you to sign in page'});
            }
        });
    },

    delay: (ms) => {
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(ms), ms);
        });
    },


    requests: async (url, formData, formDataString) => {

        let requestParams = {};

        let withHeaders = {
            method: 'POST',
            headers: {
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            body : ''
        };

        let withoutHeaders = {
            method: 'POST',
            body : ''
        };

        if( formData ){
            withoutHeaders.body = formData;
            requestParams = withoutHeaders;
        }

        if( formDataString ){
            withHeaders.body = formDataString;
            requestParams = withHeaders;
        }

        return await fetch(url, requestParams);
    }
};

