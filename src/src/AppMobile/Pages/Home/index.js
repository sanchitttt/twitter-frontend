import { SwipeableDrawer } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Bottom from '../../Components/Bottom';
import TopHeadingLeft from '../../Components/Helper/TopHeadingLeft';
import SideNavBar from '../../Components/SideNavBar';
import Top from '../../Components/Top';
import TopHeading from '../../Components/TopHeading';
import './styles.css'

const style = {
    width: '280px'
}

function HomePage() {
    const [showSideNavBar, setShowSideNavBar] = useState(false);
    const navigate = useNavigate();
    const url1Handler = () => {
        setShowSideNavBar(true);
    }
    useEffect(() => {
      const makeReq = async () => {
        try {
          const result = await axios.get('http://localhost:8082/pages/home', { withCredentials: true });
          if (result.status === 200) {
          }
          else{
            navigate('/')
          }
        } catch (error) {
          navigate('/')
        }
      }
      makeReq();
    }, []);
    return (

        <div id='homePageM'>
            <TopHeading
                url1='https://pbs.twimg.com/profile_images/1555754123420913664/P0uQDM-b_400x400.jpg'
                url2='https://i.ibb.co/ZBQj15g/star-needed.png'
                url1Handler={url1Handler}
            >
                Home
            </TopHeading>
            <Top />
            <div style={{ width: '280px' }}>
                <SwipeableDrawer
                    anchor={'left'}
                    open={showSideNavBar}
                    onClose={() => setShowSideNavBar(false)}
                    onOpen={() => setShowSideNavBar(true)}
                >
                   <div><SideNavBar /></div> 
                </SwipeableDrawer>
            </div>


            <Bottom />
        </div>

    )
}

export default HomePage;