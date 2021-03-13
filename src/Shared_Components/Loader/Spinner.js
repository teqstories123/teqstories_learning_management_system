import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";



const override = css` 
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
`;


let Spinner = (props) => {
  return (
    <>
      {props.loading &&
      <>
       <div style={{
        background: '#4c4747',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        opacity: '0.5',
        width: '100%',
        height: '100vh'
      }} >
     </div>
       <div style={{
         width: '100%', height: '100%', display: 'flex',
         justifyContent: 'center', alignItems: 'center', margin: '0 auto',
         position: 'fixed', left: '0', top: '0', zIndex: '9999',
         opacity: '.5'
       }}>
         <ClipLoader loading={props.loading} size={100} />
       </div>
       </>
      }
    </>
  )
}

export default Spinner;