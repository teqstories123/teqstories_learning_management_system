import React, { useEffect, useState, useRef } from 'react'
import { api_urls } from '../../../api/api_urls';
import './Session.scss';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/Edit';
import Spinner from '../../../Shared_Components/Loader/Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        marginBottom: "16px",
        marginTop: '40px'
    },
    toolbar: theme.mixins.toolbar,
}))

function Session(props) {

    const classes = useStyles();

    let sessionIndex;
    let batchId;

    const [session, setSessions] = useState([]);
    const [sessionIndexVal, setSessionIndexVal] = useState(null);
    const [batchIdVal, setBatchIdVal] = useState(null);
    const [getOneSessionDetail, setOneSessionDetail] = useState({})
    const [open, setOpen] = useState(false);
    const [showVideo, setShowVideo] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getSessions();
        return () => {

        }
    }, [])

    const getSessions = () => {
        // get the sessions
        Axios.get(`${api_urls.getInfoOfOneBatch}?batchId=${props.match.params.id}`)
            .then(res => {
                console.log(res.data.sessionList);
                setSessions(res.data.sessionList);
                setSessionIndexVal(res.data.sessionList[res.data.sessionList.length - 1].sessionIndex)
                setBatchIdVal(res.data.batchId);
                let vidLink = res.data.sessionList[0].videoLink;
                linkManipulation(vidLink);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(res => {
                console.log(res);
                setLoader(false);
            })
    }

    const showSessionDetails = (res) => {
        console.log(res);
        setOneSessionDetail(res)
        console.log(getOneSessionDetail.sessionNotes);
    }

    // Link manipuation for video playing 
    const linkManipulation = (vidLink) => {
        if (vidLink.includes('drive.google.com')) {
            setShowVideo(vidLink.replace('view?usp=sharing', 'preview'));
        } else if (vidLink.includes('https://transcripts.gotomeeting.com/')) {
            setShowVideo(vidLink);
        }
    }

    const openResources = (transLink) => {
        transLink = 'https://drive.google.com/uc?export=view&id=' + transLink.split('/')[5];
        console.log(transLink);
        window.open(transLink)
    }

    const deleteVid = (id) => {
        Axios.delete(`${api_urls.deleteSession}?sessionId=${id}`)
            .then(res => {
                console.log(res);
                getSessions(res.id);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(res => {
                console.log(res);
            })
    }

    return (
        <>
            <Spinner loading={loader} />
            <Grid container>
                <Grid item md={3} xs={6} sm={3}>
                    <div className="sessionList">
                        <Card className={classes.root} variant="outlined" className="batchList">
                            <CardContent style={{ padding: '0' }}>
                                {
                                    session && session.map((res, index) => (
                                        <div>
                                            <Typography className="batch-details">
                                                <h3 onClick={() => linkManipulation(res.videoLink)} className="session-list-header">Section : {res.sessionTitle} </h3>
                                                {res.transcriptLink ? <Button variant="contained" color="primary" onClick={() => openResources(res.transcriptLink)}>
                                                    Resources
                                                </Button> : null}
                                                <DeleteOutlinedIcon color="primary" onClick={() => deleteVid(res.sessionId)} />
                                                <Link to={`/sessions/create-session/${props.match.params.id}/${res.sessionId}?sessionId=${res.sessionId}`}><EditOutlinedIcon color="primary" /></Link>
                                            </Typography>
                                            <Divider />
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item md={9} xs={6} sm={3}>
                    <div>
                        <iframe width="560" height="315" src={showVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                        <Link to={`/sessions/create-session/${props.match.params.id}/${sessionIndexVal}`}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                                Create session
                            </Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>

        </>
    )
}

export default Session
