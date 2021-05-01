
//making the Intersecting observer for the appear on scroll
    //creating the options
        const appearOnScrollOptions = {
            root: null,
            rootMargin: '0px',
            threshold: .38
        };
    //creating the object
        const appearOnScrollObserver = new IntersectionObserver(appearOnScroll, appearOnScrollOptions);

//making the Intersection Observer for the slidein elements
    //creating the options
        const slideinOptions = {
            root: null,
            rootMargin: '0px',
            threshold: .35
        }
    //creating the object
        const slideinObserver = new IntersectionObserver(slidein, slideinOptions);

//creating the media query variable for the nav
    const navMediaQuery = window.matchMedia('(max-width: 850px)');
//creating a media query for the slide in animations
    const slideinMediaQuery = window.matchMedia('(min-width: 800px)');

homeSection();
chooseNavBar(navMediaQuery);
servicesSection();
aboutSection();
projectsSection();
contactSection();
footer();

//adding the media query event listener
    navMediaQuery.addListener(chooseNavBar);
//functions for the home section
    function homeSection(){
        //section element 
            let homeSection = document.createElement('section');
            homeSection.id = 'homeSection';
            document.getElementById('Wrapper').appendChild(homeSection);
            getQuoteButton();
    }
    function getQuoteButton(){
        let button = document.createElement('button');
        button.textContent = 'Free Quote';
        button.id = 'getQuoteButton';
        button.addEventListener('click', function(e){
            console.log(`use the scrollTop, scrollLeft, and scrollTo() props and method`);
            let contact = document.getElementById('contactSection');
           // window.scrollTo(0, 1175);
           //auto scrolls to the contact section
           window.scrollTo(0,contact.getBoundingClientRect().y);
        });
        document.getElementById('homeSection').appendChild(button);
    }
//functions for the services section
    function servicesSection(){
        let servicesSection = document.createElement('section');
        servicesSection.id = 'servicesSection';
        document.getElementById('Wrapper').appendChild(servicesSection);
        //header 
            servicesSection.appendChild(servicesSectionHeader());
        //container that makes the services section a grid
            servicesSection.appendChild(servicesSectionContainer());

    }
    //services header
        function servicesSectionHeader(){
            let header = document.createElement('h1');
            header.textContent = "Services";
            return header;
        }
    // services section container that is a grid
        function servicesSectionContainer(){
            let container = document.createElement('div');
            container.id = 'servicesSectionContainer';
            container.appendChild(servicesGridContainer());
            container.appendChild(servicesSectionPAndImgContainer());
            return container;
        }
    //services grid container
        function servicesGridContainer(){
            let container = document.createElement('div');
            container.id = 'servicesGridContainer';
            container.appendChild(servicesLandscaping());
            container.appendChild(servicesHardscaping());
            return container;
        }
        //div that holds the landscaping services
            function servicesLandscaping(){
                let container = document.createElement('div');
                container.setAttribute('class', 'servicesBox');
                container.classList.add('appearElement');
                //Header
                    let header = document.createElement('h3');
                    header.textContent = "Landscaping";
                container.appendChild(header);
                container.appendChild(landscapingUl());
                appearOnScrollObserver.observe(container);
                return container;
            }
            //makes the landscaping services list
                function landscapingUl(){
                    let ul = document.createElement('ul');
                    let services = ['Designs', 'New Installation', 'Mulching', 'Tree planting', 'Maintenance', 'Shrub planting', 'Leaf cleanup', 'Topsoil','Fertilization','Irrigation Systems'];
                    for(let elm of services){
                        let li = document.createElement('li');
                        li.textContent = `${elm}`;
                        ul.appendChild(li);
                    }
                    return ul;
                }
        //div that holds the harscaping services
            function servicesHardscaping(){
                let container = document.createElement('div');
                container.setAttribute('class', 'servicesBox');
                container.classList.add('appearElement');
                //header
                    let h3 =document.createElement('h3');
                    h3.textContent = 'Hardscaping';
                container.appendChild(h3);
                container.appendChild(hardscapingUl());
                appearOnScrollObserver.observe(container);
                return container
            }
            //ul that holds the hardscapeing services
                function hardscapingUl(){
                    let ul = document.createElement('ul');
                    let services = ['Stone or Concrete Walkways', 'Decks', 'Retaining walls', 'Patios', 'Potting containers', 'Landscape lighting', 'Pavillions', 'Fences', 'Wooden gazebos', 'Wooden arbors'];
                    for(let elm of services){
                        let li = document.createElement('li');
                        li.textContent = `${elm}`;
                        ul.appendChild(li);
                    }
                    return ul;
                }
        // container to hold the p and img
            function servicesSectionPAndImgContainer(){
                let container = document.createElement('div');
                container.id = 'servicesSectionPAndImgContainer';
                container.appendChild(servicesP());
                container.appendChild(servicesImg());
                container.classList.add('slideinRightOriginal');
                slideinObserver.observe(container);
                return container;
            }
        //img for the services section
            function servicesImg(){
                let img =document.createElement('img');
                img.src = 'https://drscdn.500px.org/photo/220920477/m%3D900/v2?sig=151cdf5d5571cdbb83a55d4b9f9c3325a6371a84c5bcedc62c8900d9942f4b71';
                return img;
            }
        //paragraph in services
            function servicesP(){
                let p = document.createElement('p');
                p.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at diam nunc. Vestibulum tempor mi id erat euismod, sed ultricies velit mattis. Praesent mollis ultricies condimentum. Phasellus ut ipsum blandit, consectetur felis id, bibendum nibh. Maecenas aliquam ut velit non euismod. Phasellus et elit velit.';
                return p;
            }
        
    // function that sets up the about section
        function aboutSection(){
            //section that makes up the aboutsection
                let section = document.createElement('section');
                section.id = 'aboutSection';
                //appending the header
                    section.appendChild(aboutHeader());
                //appending the container that holds the 3 columns of information
                    section.appendChild(aboutInformationContainer());

                document.getElementById('Wrapper').appendChild(section);
        }
        // makes the header for the about section
            function aboutHeader(){
                let h1 = document.createElement('h1');
                h1.textContent = 'About';
                return h1;
            }
        //makes the grid div that holds the three columns of information
            function aboutInformationContainer(){
                let container = document.createElement('div');
                container.id = 'aboutInformationContainer';
                //appending the who we are section
                    container.appendChild(aboutWhoWeAre());
                //appending the The Process section
                    container.appendChild(aboutTheProcess());
                //appending the Our Mission section
                    container.appendChild(aboutOurMission());
                return container;
            }
            //makes the who we are container
                function aboutWhoWeAre(){
                    let container = document.createElement('div');
                    container.classList.add('aboutInformationContainerDivs');
                    container.appendChild(aboutWhoWeAreHeader());
                    container.appendChild(aboutWhoWeAreText());
                    container.appendChild(aboutWhoWeAreImg());
                    return container;
                }
                //makes the header for aboutWhoWeAre
                    function aboutWhoWeAreHeader(){
                        let h2 = document.createElement('h2');
                        h2.classList.add('aboutH2');
                        h2.textContent = 'Who We Are';
                        return h2;
                    }
                //makes the text for aboutWhoWeAre
                    function aboutWhoWeAreText(){
                        let p = document.createElement('p');
                        p.textContent = 'Proin lorem metus, gravida a vehicula at, feugiat at lacus. Fusce suscipit molestie libero nec tristique. Vivamus varius mauris venenatis ipsum lobortis sagittis. Mauris vestibulum magna viverra nisl dignissim, accumsan posuere ipsum placerat. Praesent ornare enim posuere urna luctus mattis. Mauris nec lobortis nisl, sed viverra mauris. Proin mi libero, porta non leo et, efficitur elementum enim. Quisque elementum elit sit amet viverra venenatis. Suspendisse viverra neque turpis, nec aliquam nunc bibendum quis. Cras condimentum vel libero vitae iaculis. Mauris purus lectus, laoreet vitae dapibus et, pretium sed ante. Nunc lacinia tristique pretium. Proin nec consectetur tellus. Maecenas vel gravida dui. Nam nec vulputate dui. ';
                        p.classList.add('aboutInformationP');
                        p.classList.add('appearElement');
                        appearOnScrollObserver.observe(p);
                        return p;
                    }
                //makes the img gor aboutWhoWeAre
                    function aboutWhoWeAreImg(){
                        let img = document.createElement('img');
                        img.src = 'whoWeAre.svg';
                        img.classList.add('aboutInformationImg');
                        img.classList.add('slideinLeftOriginal');
                        slideinObserver.observe(img);
                        return img;
                    }
            //makes the container for the the process section
                function aboutTheProcess(){
                    let container = document.createElement('div');
                    container.classList.add('aboutInformationContainerDivs');
                    container.appendChild(aboutTheProcessHeader());
                    container.appendChild(aboutTheProcessText());
                    container.appendChild(aboutTheProcessImg());
                    return container;
                }
                //makes the header
                    function aboutTheProcessHeader(){
                        let h2 = document.createElement('h2');
                        h2.classList.add('aboutH2');
                        h2.textContent = 'The Process';
                        return h2;
                    }
                //makes the text
                    function aboutTheProcessText(){
                        let p = document.createElement('p');
                        p.classList.add('aboutInformationP');
                        p.textContent = 'Suspendisse fringilla lacinia ante eu luctus. Pellentesque efficitur lacus nec fermentum tristique. Fusce tincidunt molestie sapien id consequat. Nunc scelerisque at lectus vitae sodales. Vestibulum vitae pharetra ante, a ornare ex. Vivamus mi enim, placerat in placerat at, volutpat lacinia lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ';
                        p.classList.add('appearElement');
                        appearOnScrollObserver.observe(p);
                        return p;
                    }
                //makes the img
                    function aboutTheProcessImg(){
                        let img = document.createElement('img');
                        img.src = 'theProcess.svg';
                        img.classList.add('aboutInformationImg');
                        img.classList.add('appearElement');
                        appearOnScrollObserver.observe(img);
                        return img;
                    }
            //makes the container for the our mission section
                function aboutOurMission(){
                    let container = document.createElement('div');
                    container.classList.add('aboutInformationContainerDivs');
                    container.appendChild(aboutOurMissionHeader());
                    container.appendChild(aboutOurMissionText());
                    container.appendChild(aboutOurMissionImg());
                    return container;
                }
                //makes the header
                    function aboutOurMissionHeader(){
                        let h2 = document.createElement('h2');
                        h2.classList.add('aboutH2');
                        h2.textContent = 'Our Mission';
                        return h2;
                    }
                //makes the text
                    function aboutOurMissionText(){
                        let p = document.createElement('p');
                        p.classList.add('aboutInformationP');
                        p.textContent = 'Sed id nisl scelerisque, tincidunt lorem eu, elementum magna. Sed venenatis tempor dui, sed vulputate velit consectetur a. Quisque sollicitudin ullamcorper tellus ut elementum. Mauris vel ornare purus. Integer id est at justo auctor lobortis sit amet eget tellus. Aenean dapibus risus sit amet quam ultricies ornare. Cras ultrices, sem laoreet suscipit convallis, nisi massa faucibus ipsum, quis vulputate nibh est eget tortor. Vestibulum eget mi sed est tincidunt luctus eget sit amet nulla. Etiam aliquam aliquam quam nec sagittis. Sed id rhoncus metus. ';
                        p.classList.add('appearElement');
                        appearOnScrollObserver.observe(p);
                        return p;
                    }
                //makes the img
                    function aboutOurMissionImg(){
                        let img = document.createElement('img');
                        img.src = 'ourMission.svg';
                        img.classList.add('aboutInformationImg');
                        img.classList.add('slideinRightOriginal');
                        slideinObserver.observe(img);
                        return img;
                    }

    //function that creates the projects Section
        function projectsSection(){
            let section = document.createElement('section');
            section.id = 'projectsSection';
            //h2 that is the header
                section.appendChild(projectsHeader());
            //div that holds all the images
                section.appendChild(projectsSectionContainer());

            document.getElementById('Wrapper').appendChild(section);
        }
        //creates the header
            function projectsHeader(){
                let h2 = document.createElement('h2');
                h2.textContent = 'Our Work';
                return h2;
            }
        //creates div that holds all the images
            function projectsSectionContainer(){
                let container = document.createElement('div');
                container.id = 'projectsSectionContainer';
                let imagesSrc = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg','7.jpg','8.jpg','9.jpg'];
                for(let elm of imagesSrc){
                    let img = document.createElement('img');
                    img.src = `ImageCollage/${elm}`;
                    container.appendChild(img);
                }
                return container;
            }
    //function that sets up the contact section
        function contactSection(){
            let section = document.createElement('section');
            section.id = 'contactSection';
            section.appendChild(contactSectionContainer());
            section.appendChild(contactFormSubmitButton());

            document.getElementById('Wrapper').appendChild(section);
        }
        //flex container for the contact section
            function contactSectionContainer(){
                let container = document.createElement('div');
                container.id = 'contactSectionContainer';
                container.appendChild(contactInfo());
                container.appendChild(contactFormContainer());
                return container;
            }
            //div that holds the contact info
                function contactInfo(){
                    let container = document.createElement('div');
                    container.id = 'contactInfoContainer';
                    container.appendChild(contactHeader());
                    container.appendChild(contactDescription());
                    container.appendChild(contactAddressHeader());
                    container.appendChild(contactAddress());
                    container.appendChild(contactPhone());
                    container.appendChild(contactFax());
                    return container;
                }
                //makes the header for the contact section
                    function contactHeader(){
                        let h2 = document.createElement('h2');
                        h2.textContent = 'Contact';
                        return h2;
                    }
                //makes header for the address
                    function contactAddressHeader(){
                        let h4 = document.createElement('h4');
                        h4.textContent = 'Address:';
                        return h4;
                    }
                //makes the address
                    function contactAddress(){
                        let p = document.createElement('p');
                        let tim = `435 Street Road, Newton PA, 19790-005`;
                        p.textContent = tim;
                        return p;
                    }
                //makes the phone number
                    function contactPhone(){
                        let phone = document.createElement('p');
                        phone.innerHTML = '<span class="contactHeader">Phone:</span> 215-800-8932';
                        return phone;
                    }
                //makes the fax number
                    function contactFax(){
                        let fax = document.createElement('p');
                        fax.innerHTML = '<span class="contactHeader">Fax:</span> 23-576-9908';
                        return fax;
                    }
                //makes the contact description
                    function contactDescription(){
                        let p = document.createElement('p');
                        p.classList.add('contactDescription');
                        p.textContent = 'Please fill out the form with your proper information so we can get an accurate description of what you need, and we will get back to you as soon as possible';
                        return p;
                    }
            //div that holds the contact form
                function contactFormContainer(){
                    let container = document.createElement('div');
                    container.id = 'contactFormContainer';
                    container.appendChild(contactForm());
                    return container;
                }
                //makes the form
                    function contactForm(){
                        let form = document.createElement('form');
                        form.appendChild(nameLabel());
                        form.appendChild(nameInput());
                        form.appendChild(emailLabel());
                        form.appendChild(emailInput());
                        form.appendChild(messageLabel());
                        form.appendChild(messageInput());
                        return form;
                    }
                    //makes the name label
                        function nameLabel(){
                            let nameLabel = document.createElement('label');
                            nameLabel.textContent = "Name:";
                            nameLabel.for = 'nameInput';
                            return nameLabel;
                        }
                    //makes the  name input
                        function nameInput(){
                            let nameInput = document.createElement('input');
                            nameInput.type = 'text';
                            nameInput.id = 'nameInput';
                            return nameInput;
                        }
                    //makes the email label
                        function emailLabel(){
                            let emailLabel = document.createElement('label');
                            emailLabel.textContent = 'Email:';
                            emailLabel.for = 'emailInput';
                            return emailLabel;
                        }
                    //makes the email input
                        function emailInput(){
                            let emailInput = document.createElement('input');
                            emailInput.type = 'email';
                            emailInput.id = 'emailInput';
                            return emailInput;
                        }
                    //makes the message label
                        function messageLabel(){
                            let messageLabel = document.createElement('label');
                            messageLabel.textContent = 'Message:';
                            messageLabel.for = 'messageInput';
                            return messageLabel;
                        }
                    //makes the message text box
                        function messageInput(){
                            let messageInput = document.createElement('textarea');
                            messageInput.id = 'messageInput';
                            return messageInput;
                        }
                //submit button
                    function contactFormSubmitButton(){
                        let btn = document.createElement('button');
                        btn.type = 'submit';
                        btn.textContent = 'Submit';
                        return btn;
                    }
    //function that makes the footer
        function footer(){
            let footerContainer = document.createElement('footer');
            footerContainer.id = 'footer';
            footerContainer.appendChild(copyrightP());
            footerContainer.appendChild(creditP());
            document.getElementById('Wrapper').appendChild(footerContainer);
        }
        //makes the copyright paragraph
            function copyrightP(){
                let p = document.createElement('p');
                p.id = 'copyrightP';
                p.innerHTML = `Copyright - <span class="footerCompany">GBR Landscaping</span>. 2021. All Rights Reserved.`;
                return p;
            }
        //makes my company name
            function creditP(){
                let p = document.createElement('p');
                p.innerHTML = `Designed by - <span class="footerCompany">Triple G Develops</span>`;
                p.id = 'creditP';
                return p;
            }

    //function that chooses the correct nav bar based on the width
        function chooseNavBar(e){
                if(e.matches){
                    console.log('smaller');
                    if(old = document.querySelector('nav')){
                        document.getElementById('Wrapper').replaceChild(alternateNav(), old);
                    }else{
                        document.getElementById('Wrapper').appendChild(alternateNav());
                    }
                }else{
                    console.log('bigger');
                    if(old = document.querySelector('nav')){
                        document.getElementById('Wrapper').replaceChild(navBar(), old);
                    }else{
                        document.getElementById('Wrapper').appendChild(navBar());
                    }
                   // let old = document.querySelector('nav');

                   // navBar();
                }
            
        }

    //function that creates the nav bar
        function navBar(){
            //creating the elements
                //nav bar
                    let nav = document.createElement('nav');
                    nav.id = 'originalNav';
                    //appending the flex items
                        nav.appendChild(navLogoContainer());
                        nav.appendChild(navListContainer());

                return nav;
        }
        //makes the div that holds the logo
            function navLogoContainer(){
                //div container to hold the div
                    let logoContainerDiv = document.createElement('div');
                    logoContainerDiv.id = 'navLogoContainer';
                    logoContainerDiv.appendChild(navLogo());
                    return logoContainerDiv;
            }
            //makes the logo
                function navLogo(){
                    let logoImg = document.createElement('img');
                    logoImg.src = "logos/logo.png";
                    return logoImg;
                }
        //makes the div that holds the list
            function navListContainer(){
                //div container to hold the list of links
                    let listContainerDiv = document.createElement('div');
                    listContainerDiv.id = 'navListContainer';
                        // creating the link elements for the links on the nav
                            let homeA = document.createElement('a');
                            let servicesA = document.createElement('a');
                            let aboutA = document.createElement('a');
                            let projectsA = document.createElement('a');
                            let contactA = document.createElement('a');
                        //adding the link to the links
                                homeA.href = '#homeSection';
                                servicesA.href = '#servicesSection';
                                aboutA.href = '#aboutSection';
                                projectsA.href = '#projectsSection';
                                contactA.href = '#contactSection';
                        //addng text to the li's
                                homeA.textContent = 'Home';
                                servicesA.textContent = 'Services';
                                aboutA.textContent = 'About';
                                projectsA.textContent = 'Projects';
                                contactA.textContent = 'Contact';
                        //appending the elements
                        listContainerDiv.appendChild(homeA);
                        listContainerDiv.appendChild(servicesA);
                        listContainerDiv.appendChild(aboutA);
                        listContainerDiv.appendChild(projectsA);
                        listContainerDiv.appendChild(contactA);

                    return listContainerDiv;
            }
//function for the alternative navbar max-width: 850px
    function alternateNav(){
        let nav = document.createElement('nav');
        nav.id = 'alternateNav';
        nav.appendChild(navContainer());

        return nav;
    }
    //makes the container in the nav that has all the elements
        function navContainer(){
            let container =document.createElement('div');
            container.id = 'alternateNavContainer';
            container.appendChild(alternateNavLogoContainer());
            container.appendChild(alternateNavHamburgerContainer());
            return container;
        }
        //makes the container for the logo
            function alternateNavLogoContainer(){
                let container = document.createElement('div');
                container.id = 'alternateNavLogoContainer';
                container.appendChild(alternateNavLogo());
                return container;
            }
            //makes the alternate nav logo
                function alternateNavLogo(){
                    let logoImg = document.createElement('img');
                    logoImg.src = "logos/logo.png";
                    logoImg.id = 'alternateNavLogo';
                    return logoImg;
                }
        //makes the container for the hamburger icon
            function alternateNavHamburgerContainer(){
                let container = document.createElement('div');
                container.id = 'alternateNavHamburgerContainer';
                container.appendChild(alternateNavHamburger());
                return container;
            }
            //makes the hamburger icon
                function alternateNavHamburger(){
                    let img = document.createElement('img');
                    img.src = 'hamburger.svg';
                    img.id = 'alternateNavHamburger';
                    img.addEventListener('click', hamburgerClick);
                    return img;
                }
                //click event listener for the hamburger icon
                    function hamburgerClick(){
                        if(s = document.getElementById('slideDownNavContainer')){
                            document.getElementById('alternateNav').removeChild(s);
                            document.body.style.pointerEvents = 'auto';
                        }else{
                            //removeing the pointer events from the body except for the icon itself
                                document.body.style.pointerEvents = 'none';
                                document.getElementById('alternateNavHamburger').style.pointerEvents = 'auto';
                            //creating the container and the other elements
                                let container = document.createElement('div');
                                container.id = 'slideDownNavContainer';
                                //function that creates and appends the link to container
                                    addLinksTo(container, ['Home','Services','About','Projects','Contact']);

                            //appending the container
                                document.getElementById('alternateNav').appendChild(container);
                        }
                    }
                    //function that adds an array of links to a container
                        function addLinksTo(container, elements){
                            for(let element of elements){
                                let a = document.createElement('a');
                                a.textContent = `${element}`;
                                //adding the href
                                    let link = element.toLowerCase();
                                    a.href = `#${link}Section`;
                                //adding the event listener
                                    a.addEventListener('click', alternateNavLinkClick);
                                container.appendChild(a);
                            }
                            container.style.pointerEvents = 'auto';
                            return container;
                        }
                        //event listener for when the link is clicked it closes the nav menu
                            function alternateNavLinkClick(){
                                document.getElementById('alternateNav').removeChild(document.getElementById('slideDownNavContainer'));
                            }



//functions for Intersection Observers
    //function for the elements that fade in (appear)
        function appearOnScroll(entries, observer){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('appear');
                }
            });
        }
    
    //function for the elements that slidein
        function slidein(entries, observer){
            console.log('call');
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('slideinAfter');
                }
            });
        }