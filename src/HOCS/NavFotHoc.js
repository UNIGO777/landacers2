import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar'; // Assuming Navbar is a separate component
import Footer from '../components/Footer/Footer'; // Assuming Footer is a separate component
import SearchBox from '../components/SearchBox/SearchBox';


const WithNavbarAndFooter = ({ WrappedComponent , footer}) => {

    
    const [loginOpen, setLoginOpen] = useState(false);
    return (
        <div>
            <div className='h-[10vh] '>
            <Navbar loginOpen={loginOpen} setLoginOpen={setLoginOpen}/></div>
            
            <WrappedComponent  loginOpen={loginOpen} setLoginOpen={setLoginOpen}/>
            {!footer && <Footer />}
        </div>
    );
};

export default WithNavbarAndFooter;
