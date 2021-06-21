import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  projectImages from './images';
import companyLogo from './imagesAndIcons/logo.png';
import hamburgerIcon from './imagesAndIcons/hamburger.svg';

// global variables 

    //all landscaping services to appear in the services section
    let landscapingServices = ['Designs', 'New Installation', 'Mulching', 'Tree planting', 'Maintenance', 'Shrub planting', 'Leaf cleanup', 'Topsoil','Fertilization','Irrigation Systems'];
    //all hardscaping services to appear in the services section
    let hardscapingServices = ['Stone or Concrete Walkways', 'Decks', 'Retaining walls', 'Patios', 'Potting containers', 'Landscape lighting', 'Pavillions', 'Fences', 'Wooden gazebos', 'Wooden arbors'];

    //creating the media query variable for the nav
    const navMediaQuery = window.matchMedia('(max-width: 850px)');
    //creating a media query for the slide in animations
    const slideinMediaQuery = window.matchMedia('(min-width: 800px)');


    //wrapper for the whole project
class Wrapper extends React.Component{
    constructor(props){
        super(props);
        //if the nav media queary matches
        this.state = {navQuery : navMediaQuery.matches}
        // adding change event to the nav media query
        navMediaQuery.addEventListener('change', this.navMediaQueryChange);
    }
    // event handles for when the nav media query changes
    navMediaQueryChange = (e) => {
        this.setState({navQuery : e.matches});
    }
    render(){
        let navBar = (this.state.navQuery) ? <AlternativeNavBar></AlternativeNavBar> : <NavBar></NavBar>;
        return (<div id="Wrapper">
            <HomeSection id="homeSection"></HomeSection>
            {navBar}
            <ServicesSection id="servicesSection"></ServicesSection>
            <AboutSection id="aboutSection"></AboutSection>
            <ProjectsSection id="projectsSection"></ProjectsSection>
            <ContactSection id="contactSection"></ContactSection>
            <Footer></Footer>
            </div>)
    }
}

    // home section
    class HomeSection extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <section id={this.props.id}><GetQuoteButton id="getQuoteButton"></GetQuoteButton></section>
        }
    }
        //get Quote Button
        class GetQuoteButton extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <button id={this.props.id}>Get Quote</button>
            }
        }

    // services Section
    class ServicesSection extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <section id={this.props.id}>
                <SectionHeader text="Services"></SectionHeader>
                <ServicesSectionContainer id="servicesSectionContainer"></ServicesSectionContainer>
                </section>
        }
    }
        //container for the services section
        class ServicesSectionContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <div id={this.props.id}>
                    <ServicesGridContainer id="servicesGridContainer"></ServicesGridContainer>
                    <ServicesSectionPAndImgContainer id="servicesSectionPAndImgContainer"></ServicesSectionPAndImgContainer>
                </div>
            }
        }
            // container in the services section that holds the landscaping and hardscaping services
            class ServicesGridContainer extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return <div id={this.props.id}>
                        <ServicesDisplayContainer headerText="Landscaping" services={landscapingServices}></ServicesDisplayContainer>
                        <ServicesDisplayContainer headerText="Hardscaping" services={hardscapingServices}></ServicesDisplayContainer>
                    </div>
                }
            }
                // services display that show the services 
                class ServicesDisplayContainer extends React.Component{
                    constructor(props){
                        super(props);
                    }
                    render(){
                        let services = this.props.services.map((service, index) => <li key={index}>{service}</li>)
                        return (
                           <div className="servicesBox">
                               <h3>{this.props.headerText}</h3>
                               <ul>{services}</ul>
                           </div> 
                        )
                    }
                }
        // container that holds the img and discription in the services section
        class ServicesSectionPAndImgContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <div id={this.props.id}>
                    <img src="https://drscdn.500px.org/photo/220920477/m%3D900/v2?sig=151cdf5d5571cdbb83a55d4b9f9c3325a6371a84c5bcedc62c8900d9942f4b71"></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at diam nunc. Vestibulum tempor mi id erat euismod, sed ultricies velit mattis. Praesent mollis ultricies condimentum. Phasellus ut ipsum blandit, consectetur felis id, bibendum nibh. Maecenas aliquam ut velit non euismod. Phasellus et elit velit.</p>
                </div>
            }
        }

    // About section
    class AboutSection extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <section id={this.props.id}>
                <SectionHeader text="About"></SectionHeader>
                <AboutInformationContainer id="aboutInformationContainer"></AboutInformationContainer>
            </section>
        }
    }
        // container inside the about section
        class AboutInformationContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <div id={this.props.id}>
                    <AboutDisplayContainer intersectionClass="slideinLeftOriginal" imgSrc="imagesAndIcons/whoWeAre.svg" headerText="Who We Are" pText="Proin lorem metus, gravida a vehicula at, feugiat at lacus. Fusce suscipit molestie libero nec tristique. Vivamus varius mauris venenatis ipsum lobortis sagittis. Mauris vestibulum magna viverra nisl dignissim, accumsan posuere ipsum placerat. Praesent ornare enim posuere urna luctus mattis. Mauris nec lobortis nisl, sed viverra mauris. Proin mi libero, porta non leo et, efficitur elementum enim. Quisque elementum elit sit amet viverra venenatis. Suspendisse viverra neque turpis, nec aliquam nunc bibendum quis. Cras condimentum vel libero vitae iaculis. Mauris purus lectus, laoreet vitae dapibus et, pretium sed ante. Nunc lacinia tristique pretium. Proin nec consectetur tellus. Maecenas vel gravida dui. Nam nec vulputate dui."></AboutDisplayContainer>
                    <AboutDisplayContainer intersectionClass="appearElement" imgSrc="imagesAndIcons/theProcess.svg" headerText="The Process" pText="Suspendisse fringilla lacinia ante eu luctus. Pellentesque efficitur lacus nec fermentum tristique. Fusce tincidunt molestie sapien id consequat. Nunc scelerisque at lectus vitae sodales. Vestibulum vitae pharetra ante, a ornare ex. Vivamus mi enim, placerat in placerat at, volutpat lacinia lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."></AboutDisplayContainer>
                    <AboutDisplayContainer intersectionClass="appearElement" imgSrc="imagesAndIcons/ourMission.svg" headerText="Our Mission" pText="Sed id nisl scelerisque, tincidunt lorem eu, elementum magna. Sed venenatis tempor dui, sed vulputate velit consectetur a. Quisque sollicitudin ullamcorper tellus ut elementum. Mauris vel ornare purus. Integer id est at justo auctor lobortis sit amet eget tellus. Aenean dapibus risus sit amet quam ultricies ornare. Cras ultrices, sem laoreet suscipit convallis, nisi massa faucibus ipsum, quis vulputate nibh est eget tortor. Vestibulum eget mi sed est tincidunt luctus eget sit amet nulla. Etiam aliquam aliquam quam nec sagittis. Sed id rhoncus metus."></AboutDisplayContainer>
                </div>
            }
        }
            // display container that holds a section in the about section
            class AboutDisplayContainer extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return (
                        <div className="aboutInformationContainerDivs">
                        <h2 className="aboutH2">{this.props.headerText}</h2>
                        <p className="aboutInformationP" className="appearElement">{this.props.pText}</p>
                        <img src={this.props.imgSrc} className="aboutInformationImg" className={this.props.intersectionClass}></img>
                        </div>
                    )
                }
            }

    // projects section
    class ProjectsSection extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <section id={this.props.id}>
                    <ProjectsSectionHeader></ProjectsSectionHeader>
                    <ProjectsSectionContainer id="projectsSectionContainer"></ProjectsSectionContainer>
                </section>
            )
        }
    }
        // projects section header
        class ProjectsSectionHeader extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <h2>Our Work</h2>
                )
            }
        }
        // container in the projects section that holds the images
        class ProjectsSectionContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                let imagesSrc = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg','7.jpg','8.jpg','9.jpg'];
                let images = imagesSrc.map((img, index) => {
                    return <CommonImage key={index.toString()} src={`${projectImages[index]}`}></CommonImage>
                });
                return <div id={this.props.id}>{images}</div>

            }
        }

    // contact section
    class ContactSection extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <section id={this.props.id}>
                <ContactSectionContainer id="contactSectionContainer"></ContactSectionContainer>
            </section>
        }
    }
        // flex container for the contact section
        class ContactSectionContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <div id={this.props.id}>
                        <ContactInfo id="contactInfoContainer"></ContactInfo>
                        <ContactFormContainer></ContactFormContainer>
                    </div>
                )
            }
        }
            // div that holds the contact info
            class ContactInfo extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return (<div id={this.props.id}>
                        <h2>Contact</h2>
                        <p className="contactDescription">Please fill out the form with your proper information so we can get an accurate description of what you need, and we will get back to you as soon as possible</p>
                        <h4>Address</h4>
                        <p>435 Street Road, Newton PA, 19790-005</p>
                        <p><span className="contactHeader">Phone:</span> 215-800-8932</p>
                        <p><span className="contactHeader">Fax:</span> 23-576-9908</p>
                    </div>)
                }
            }
            // div that holds the contact form
            class ContactFormContainer extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return (
                        <div id="contactFormContainer">
                            <form id="contactFormElement">
                                <label for="nameInput">Name:</label>
                                <input type="text" for="nameInput"></input>
                                <label for="emailInput">Email:</label>
                                <input type="email" id="emailInput"></input>
                                <label for="messageInput">Message:</label>
                                <textarea id="messageInput"></textarea>
                            </form>
                        </div>
                    )
                }
            }

    // Footer
    class Footer extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <footer id="footer">
                <p id="copyrightP">Copyright - <span className="footerCompany">GBR Landscaping</span>. 2021. All Rights Reserved.</p>
                <p>Designed by - <span className="footerCompany">Triple G Develops</span></p>
                </footer>
            )
        }
    }

    // Nav Bars
        // nav bar that renders when viewport is
        // greater than 850px
        class NavBar extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
               return (
                <nav id="originalNav">
                    <div id="navLogoContainer">
                        <img src={companyLogo}></img>
                    </div>
                    <ListOfLinks id="navListContainer"></ListOfLinks>
                </nav>
                )
            }
        }

        //Nav bar that appears when the screen is 
        // less than 850px
        class AlternativeNavBar extends React.Component{
            constructor(props){
                super(props);
                this.state = {open : false}
            }
            hamburgerIconClick(e){
                if(document.getElementById('slideDownNavContainer')){
                    this.setState({open : false});
                }else{
                    this.setState({open : true});
                }
            }
            linkClickEventHandler = (e) => {
                this.setState({open : false});
            }
            render(){
                return (
                    <nav id="alternateNav">
                    <div id="alternateNavContainer">
                        <div id="alternateNavLogoContainer">
                            <img id="alternateNavLogo" src={companyLogo}></img>
                        </div>
                        <div id="alternateNavHamburgerContainer" onClick={this.hamburgerIconClick.bind(this)}>
                            <img id="alternateNavHamburger" src={hamburgerIcon}></img>
                        </div>
                    </div>
                    {this.slideDownNav()}
                    </nav>
                )
            }
            // slide down part of the nav bar
            slideDownNav(){
                if(this.state.open){
                    return <ListOfLinks id="slideDownNavContainer" linkClickEventHandler={this.linkClickEventHandler}></ListOfLinks>
                }else{
                    return ""
                }

            }
        }

        // Common nav bar components
            // div that holds all the links
            class ListOfLinks extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return (
                        <div id={this.props.id}>
                            <NavBarListElement href="#homeSection" text="Home" clickEventHandler={this.props.linkClickEventHandler}></NavBarListElement>
                            <NavBarListElement href="#servicesSection" text="Services" clickEventHandler={this.props.linkClickEventHandler}></NavBarListElement>
                            <NavBarListElement href="#aboutSection" text="About" clickEventHandler={this.props.linkClickEventHandler}></NavBarListElement>
                            <NavBarListElement href="#projectsSection" text="Projects" clickEventHandler={this.props.linkClickEventHandler}></NavBarListElement>
                            <NavBarListElement href="#contactSection" text="Contact" clickEventHandler={this.props.linkClickEventHandler}></NavBarListElement> 
                        </div>
                    )
                }
            }
                // nav bar list element
                class NavBarListElement extends React.Component{
                    constructor(props){
                        super(props);
                    }
                    render(){
                        return <a href={this.props.href} onClick={this.props.clickEventHandler}>{this.props.text}</a>
                    }
                }


    // universal
        // header for each section
        class SectionHeader extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <h1 id={this.props.id || ''}>{this.props.text}</h1>
            }
        }
        // common img element
        class CommonImage extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return <img src={this.props.src}></img>
            }
        }




    ReactDOM.render(<Wrapper id="Wrapper"></Wrapper>, document.getElementById('root'));

