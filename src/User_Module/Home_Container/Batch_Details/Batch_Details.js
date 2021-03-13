import React, { useRef, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import '../Home_Container.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { api_urls } from '../../../api/api_urls';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../../Shared_Components/Loader/Spinner';

const BatchDetails = (props) => {
    console.log(props);
    const [data, setdata] = useState(null);
    const [loader, setLoader] = useState(true);
    // { menuID, data }
    const useStyles = makeStyles((theme) => ({
        root: {
            marginBottom: 16,
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

    useEffect(() => {
        let userCred = sessionStorage.getItem('userCred');
        let userData = JSON.parse(userCred);
        console.log(userData);
        console.log(userCred);
        Axios.post(`${api_urls.login}?email=${userData.email}&password=${userData.password}`)
            .then(res => {
                setdata(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(res => {
                console.log('finally');
                setLoader(false);
            })
        return () => {

        }
    }, [])

    return (
        <div  id="main-container">
            <Spinner loading={loader} />
            <Typography variant="h4">
                Overview
                </Typography>
            <Card className={classes.root} variant="outlined" style={{}}>
                <CardContent style={{ padding: '16px' }}>
                    <div className="subscriptionContainer">
                        <div style={{}}></div>  <div>Your subscription is active</div>
                    </div>
                </CardContent>
            </Card>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                className="c1-batch-list-details"
            >
                <div style={{ width: '50%' }}>
                    {
                        data && data.batchAllocated.map(res => (

                            <Card variant="outlined">
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
                                        <Link to={`${props.data.data.match.path}/batch-list/${res.batchId}`}><Button variant="contained" color="primary" className={classes.pos}>
                                            View Batch Sessions
                                        </Button></Link>
                                    </div>
                                </CardContent>
                            </Card>

                        ))
                    }
                </div>
                <div className="c1-batch-list">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/lzYabsBSXpA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </Grid>
        </div>
    )
}


export default BatchDetails
