let PojanForm = {
    init: ( config ) => {
        let self = PojanForm;

        self.signInForm = config.signInForm;
        self.signUpForm = config.signUpForm;
        self.createPostForm = config.createPostForm;
        self.applyPostForm = config.applyPostForm;
        self.profileForm = config.profileForm;

        self.elemFetchPost = config.fetchPostId;

        self.loaderElem = document.getElementById('loader');
        self.formError = document.getElementById('formError');

        self.btnSignUp = document.getElementById("btnSignUp");
        self.btnSignIn = document.getElementById("btnSignIn");
        self.btnCreatePost = document.getElementById("btnCreatePost");
        self.btnApplyPost = document.getElementById("btnApplyPost");
        self.btnProfile = document.getElementById("btnProfile");

        self.signInForm ? self.signInForm.addEventListener('submit', self.applySignIn) : false;  
        self.signUpForm ? self.signUpForm.addEventListener('submit', self.applySignUp) : false;  
        self.createPostForm ? self.createPostForm.addEventListener('submit', self.applyCreatePostForm) : false;  
        self.applyPostForm ? self.applyPostForm.addEventListener('submit', self.applyPost) : false;  
        self.profileForm ? self.profileForm.addEventListener('submit', self.applyProfile) : false;  

        if( self.elemFetchPost ) {
            self.elemFetchPost.forEach(element => {
                element.addEventListener('click', self.fetchPostData.bind(event, element));
            });
        }
    },

    fetchPostData: ( elem, e ) => {

        e.preventDefault();

        // Get post id from data attribute
        let dataid = elem.getAttribute('data-postid');

        // Request content for related post id
        fetch('/posts/fetch/' + dataid, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                // Return raw html
                return response.text();
            }
        }).then((result) => {
            let modal = document.getElementById('modal1');
            
            let instance = M.Modal.getInstance(modal);
            
            // Render html template to the modal window
            if( instance.isOpen ){
                modal.innerHTML = result;
            }
        }).catch( error => {
            alert('Could not etch requested content. Please try again!');
        }).finally(() => {

        });
    },

    applyProfile: async (e) => {
        let self = PojanForm;

        // console.log('Form fired Fired');

        e.preventDefault();
        
        // Disable the submit button
        self.disableBtn(self.btnProfile);

        // Show loader
        self.loader(true, self.profileForm);

        console.log('hello');

        // Get form data
        // let formData = new FormData(self.createPostForm);

        // // Create time stamp
        // let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // formData.append('created_at', date);
        // formData.append('updated_at', date);

        // Post form data
        // self.requests('/posts/create', formData,  null)
        // .then( response => {

        //     if (response.ok ) {
        //         return response.json();
        //     }
        
        //     throw new Error(response.statusText);

        // }).then( result => {
            
        //     // Disable the div error element if it is visible 
        //     if( self.formError){
        //         self.formError.classList.add('hide');
        //         self.formError.textContent = '';
        //     }
            
        //     // Display the success toast and redirect to signin page after 5 secs
        //     self.displayToast(result.message)
        //     .then( () => {
        //         self.createPostForm.reset();
        //         window.location = '/posts';
        //     });

        // }).catch( error => {

        //     // Throw error
        //     self.formError.classList.add('show');
        //     self.formError.textContent = error.message;

        // }).finally(() => {
        //     self.loader(false, self.createPostForm);
        //     self.enableBtn(self.btnCreatePost);
        // });
    },

    setTime: () => {
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0,19).replace('T', ' ');
    },
    
    applyPost: async (e) => {
        let self = PojanForm;

        // console.log('Form fired Fired');

        e.preventDefault();
        
        // Disable the submit button
        self.disableBtn(self.btnApplyPost);

        // Show loader
        self.loader(true, self.applyPostForm);

        // Get form data
        let formData = new FormData(self.applyPostForm);

        // Create time stamp
        formData.append('created_at', self.setTime());
        formData.append('updated_at', self.setTime());

        // Post form data
        self.requests('/posts/apply/create', formData,  null)
        .then( response => {

            if (response.ok ) {
                return response.json();
            }

            console.log(response);
            if( response.status === 500 ){
                throw new Error('Please make sure your file meets the requirements.');
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
            .then( (response ) => {
                self.applyPostForm.reset();
                window.location = result.redirectTo;
            });

        }).catch( error => {
            // Throw error
            self.formError.classList.add('show');
            self.formError.textContent = error.message;

        }).finally(() => {
            self.loader(false, self.applyPostForm);
            self.enableBtn(self.btnApplyPost);
        });
    },

    applyCreatePostForm: async (e) => {
        let self = PojanForm;

        e.preventDefault();
        
        // Disable the submit button
        self.disableBtn(self.btnCreatePost);

        // Show loader
        self.loader(true, self.createPostForm);

        // Get form data
        let formData = new FormData(self.createPostForm);

        // Create time stamp
        formData.append('created_at', self.setTime());
        formData.append('updated_at', self.setTime());

        // Post form data
        self.requests('/posts/create', formData,  null)
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
                self.createPostForm.reset();
                // window.location = '/posts';
            });

        }).catch( error => {

            // Throw error
            self.formError.classList.add('show');
            self.formError.textContent = error.message;

        }).finally(() => {
            self.loader(false, self.createPostForm);
            self.enableBtn(self.btnCreatePost);
        });
    },

    applySignIn: async ( e ) => {
        let self = PojanForm;
        e.preventDefault();

        // Disable the submit button
        self.disableBtn(self.btnSignIn);

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
            self.enableBtn(self.btnSignIn);
        });
    },
    
    applySignUp: async ( e ) => {
        let self = PojanForm;
        e.preventDefault();

        // Disable the submit button
        self.disableBtn(self.btnSignUp);

        // Show loader
        self.loader(true, self.signUpForm);
        
        // Get form data
        let formData = new FormData(self.signUpForm);

        // Create time stamp
        formData.append('created_at', self.setTime());
        formData.append('updated_at', self.setTime());

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
            self.enableBtn(self.btnSignUp);
        });
    },

    disableBtn: ( e ) => {
        e.setAttribute('disabled', 'disabled');
    },
    
    enableBtn: ( e ) => {
        e.removeAttribute('disabled');
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

