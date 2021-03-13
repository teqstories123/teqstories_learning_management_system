import React from 'react';
import SideNavigationBar from '../Shared_Components/Header/Header';

const MainComponent = (props) => {
    console.log(props);
    return(
        <>
            <SideNavigationBar data={props}/>
        </>
    )
}

export default MainComponent;