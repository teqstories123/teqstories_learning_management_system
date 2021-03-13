import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import { api_urls } from '../../api/api_urls';
import './Batch_List.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        marginBottom: "16px",
        marginTop: '40px'
    },
    toolbar: theme.mixins.toolbar,
}))

const BatchList = (props) => {

    console.log('batch list', props);

    const [batch, batchListDetails] = useState([]);
    const [showVideo, setShowVideo] = useState(null);

    const getSessions = () => {
        // get the sessions
        Axios.get(`${api_urls.getInfoOfOneBatch}?batchId=${props.match.params.batchID}`)
            .then(res => {
                console.log(res);
                batchListDetails(res.data.sessionList);
                let lastIndexOfVidLink = res.data.sessionList[0].videoLink.replace('view?usp=sharing', 'preview');
                console.log('video Updated Link', lastIndexOfVidLink);
                setShowVideo(lastIndexOfVidLink);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(res => {
                console.log(res);
            })
    }

    const openResources = (transLink) => {
        transLink = 'https://drive.google.com/uc?export=view&id=' + transLink.split('/')[5];
        console.log(transLink);
        window.open(transLink)
    }

    const handleVideo = (videoLink) => {
        let vidLink = videoLink.replace('view?usp=sharing', 'preview');
        setShowVideo(vidLink);
    }

    useEffect(() => {
        getSessions();
        return () => {

        }
    }, [])

    const classes = useStyles();

    return (
        <>
            <div className={classes.toolbar} />
            <Grid container>
                <Grid item xs={8}>
                    <iframe width="560" height="315" src={showVideo} frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                </Grid>
                <Grid item xs={4}>
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    <Card className={classes.root} variant="outlined" className="batchList">
                        <CardContent style={{ padding: '0' }}>
                            {
                                batch.map((res, index) => (
                                    <>
                                        <Typography className="batch-details">
                                            <h3 onClick={() => handleVideo(res.videoLink)} className="session-list-header">Section {index + 1}: {res.sessionTitle}</h3>
                                            {res.transcriptLink ? <Button variant="contained" color="primary" onClick={() => openResources(res.transcriptLink)}>
                                                Resources
                                                </Button> : null}
                                        </Typography>
                                        <Divider />
                                    </>
                                ))
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default BatchList;