import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api_urls } from '../../../api/api_urls'
import './BatchList.scss';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../../Shared_Components/Loader/Spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function BatchList(props) {
    const [batches, setbatches] = useState([]);
    const [loader, setLoader] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        getBatchData();
        return () => {

        }
    }, [])

    const getBatchData = () => {
        Axios.get(`${api_urls.getTrainerDetails}?email=${props.trainerData.match.params.email}`)
            .then(res => {
                console.log(res);
                setbatches(res.data.batches)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(res => {
                console.log(res);
                setLoader(false);
            })
    }

    return (
        <div className={classes.root} id="trainer-batch-list">
            <Spinner loading={loader} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Batch Details</h2>
                </Grid>

                {
                    batches && batches.map(res => (
                        <Grid item xs={6}>
                            <div className="row batch-list-container" key={res.id}>
                                <div className="col-lg-12">
                                    <h3>{res.course}</h3>
                                </div>
                                <div className={classes.root}>
                                    <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <h4>Start Date:</h4>
                                        <small>{res.dateStart}</small>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <h4>End Date</h4>
                                        <small>{res.dateEnd}</small>
                                    </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.root}>
                                <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <h4>Batch Time</h4>
                                    <small>{res.batchTime}</small>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <h4>Weekday/Weekend</h4>
                                    <small>{res.wd_or_wnd}</small>
                                </Grid>
                                </Grid>
                                </div>
                                <div className="col-lg-12 text-right">
                                    <Link to={"/session" + '/' + res.batchId}><a>Access Session</a></Link>
                                </div>
                            </div>
                        </Grid>
                    ))

                }

            </Grid>
        </div>
    )
}

export default BatchList
