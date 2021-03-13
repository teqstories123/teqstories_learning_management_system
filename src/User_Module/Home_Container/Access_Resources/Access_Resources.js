import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
// import { batchDetails, accessResources } from "../../Mock_Data/constant";
import '../Home_Container.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const AccessResources = (props) => {
    console.log(props);
    let { url } = useRouteMatch();
    console.log(props);
    // { menuID, data }
    const useStyles = makeStyles((theme) => ({
        root: {
            marginBottom: 16
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
            marginTop: 12,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));


    const classes = useStyles();
    return (
        <>
             <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={props.openModal}
                        onClose={props.handleModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.openModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">Dear User!</h2>
                                <p id="transition-modal-description">You are not allowed to access this resources :(</p>
                                <button type="button" onClick={props.handleModalClose}>
                                   Close
                                </button>
                            </div>
                        </Fade>
                    </Modal>
                </div>
        </>
    )
}


export default AccessResources
