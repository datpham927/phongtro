import React from 'react'; // Optional in React 17+
import IntroComponent from './IntroComponent';
import ContactComponent from './ContactComponent';

const FooterComponent: React.FC = () => {
  return (
     <>
        <IntroComponent />        
        <ContactComponent />
     </>
  );
}

export default FooterComponent;
