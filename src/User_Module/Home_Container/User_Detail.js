import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import HomeContainer from './Home_Container';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        marginBottom: "16px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
   
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));
const UserDetail = (props) => {
    
    console.log(props);

    const classes = useStyles();
    
    return (
        <>
            <div className={classes.toolbar} />
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
                <div className="c1-batch-list">
                    <HomeContainer data={props} />
                </div>
                <div className="c1-batch-list">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/lzYabsBSXpA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </Grid>
        </>
    )
}

export default UserDetail;