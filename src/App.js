import React from 'react';
import { useEffect, useState } from 'react';
import AppMobile from './AppMobile/index';
import AppDesktop from './AppDesktop/index';


function App() {
  const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        setClientWidth(document.documentElement.clientWidth);
      }, 1000)

    })
    return () => {
      window.removeEventListener('resize', () => {
      })
    }
  }, []);

  return (

    clientWidth <= 715 ?
      <AppMobile /> :
      <AppDesktop />


  );
}

export default App;
