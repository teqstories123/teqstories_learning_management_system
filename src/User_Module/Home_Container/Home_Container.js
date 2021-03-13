import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import { batchDetails, accessResources } from "../../Mock_Data/constant";
import './Home_Container.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const HomeContainer = (props) => {
    console.log(props);
    let { url } = useRouteMatch();
    console.log(props);
    // { menuID, data }
    const useStyles = makeStyles((theme)=>({
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

    const myCourses =
        <Card className={classes.root} variant="outlined">
            <CardContent style={{ padding: '16px' }}>
                <div>

                </div>
                <Typography variant="h6">
                    Courses
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Your recent courses
                </Typography>
                <Divider />
                {
                    props.data.data.data && props.data.data.data.location.state.batchAllocated.map(res => (
                        <>
                            <Typography variant="body1" className={classes.pos}>
                                {res.course}
                            </Typography>
                            <Divider />
                            {/* <div className="view-btn">
                                <Button variant="contained" color="primary" className={classes.pos}>
                                    View Batch Sessions
                                        </Button>
                            </div> */}
                        </>
                    )
                    )
                }
            </CardContent>

        </Card>;

    switch (props.data.menuID) {
        case myCourses:
            return myCourses;
        case batchDetails:
            return (
                <>
                    {
                        props.data.data.data && props.data.data.data.location.state.batchAllocated.map(res => (

                            <Card className={classes.root} variant="outlined">
                                <CardContent style={{ padding: '16px' }}>
                                    <Typography variant="h6">
                                        Batch Details
                    </Typography>
                                    <Typography variant="body1" className={classes.pos}>
                                        Course: {res.course}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body1" className={classes.pos}>
                                        Start Date: {res.dateStart}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body1" className={classes.pos}>
                                        End Date: {res.dateEnd}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body1" className={classes.pos}>
                                        Session Link: {res.batchMeetingLink}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body1" className={classes.pos}>
                                        Batch Time: {res.batchTime}
                                    </Typography>
                                    <Divider />
                                    <div className="view-btn">
                                        <Link to={`${props.data.data.data.match.path}/batch-list/${res.batchId}`}><Button variant="contained" color="primary" className={classes.pos}>
                                            View Batch Sessions
                                        </Button></Link>
                                    </div>
                                </CardContent>
                            </Card>

                        ))
                    }
                </>
            )
        case accessResources:
            return (
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={props.data.openModal}
                        onClose={props.data.handleModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.data.openModal}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">Dear User!</h2>
                                <p id="transition-modal-description">You are not allowed to access this resources :(</p>
                                <button type="button" onClick={props.data.handleModalClose}>
                                   Close
                                </button>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            );
        default:
            return myCourses;
    }
}


export default HomeContainer
