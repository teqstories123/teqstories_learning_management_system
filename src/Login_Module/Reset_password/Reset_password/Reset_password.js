import React, { useRef } from 'react'
import Axios from 'axios';
import { api_urls } from '../../../api/api_urls';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import LoginImage from '../../../Assets/loginImage.jpg';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Reset_password(props) {

    const token = props.match.params.token;

    const pwd = useRef(null);
    const confirmPwd = useRef(null)

    let handleResetPwd = (e) => {
        e.preventDefault();
        if (pwd && (pwd.current.value === confirmPwd.current.value)) {
            Axios.put(`${api_urls.changePassword}?token=${token}&password=${pwd.current.value}`)
                .then(res => {
                    console.log(res);
                    props.history.push(`/`);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log('password did not match');
        }

    }

    return (
        <div className="loginContainer">
            <Card>
                <CardContent className="cardContent">
                    <Grid className="cardContainer" container>
                        <Grid className="leftPane" md={6} item xs={12}>
                            <img src={LoginImage} alt="" />
                        </Grid>
                        <Grid className="rightPane" md={6} item xs={12}>
                            <h2>Let’s fix your password!</h2>
                            <form>
                                <div className="form-control">
                                    <LockOpenIcon /><input type="password" name="password" placeholder="Password" ref={pwd} />
                                </div>
                                <div className="form-control">
                                    <LockOpenIcon /><input type="password" name="password" placeholder="Confirm Password" ref={confirmPwd} />
                                </div>
                                <div>
                                    <Button variant="contained" color="primary" onClick={handleResetPwd}>Reset Password
                                </Button>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Reset_password
