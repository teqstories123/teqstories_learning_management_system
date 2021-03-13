import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Login.scss';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import LoginImage from '../../Assets/loginImage.jpg';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import { api_urls } from '../../api/api_urls';
import auth from '../../auth/auth';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    padding: {
        paddingBottom: 0
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const email = useRef(null);
    const pwd = useRef(null);

    const [loader, setloader] = useState(false);
    const [data, setdata] = useState(null);
    const [error, setError] = useState(null);
    const [didMount, setDidMount] = useState(false);
    const [type, setType] = useState('password');
    const [show, setShow] = useState(true);

    let handleLogin = (e) => {
        e.preventDefault();
        if((email.current.value && email.current.value == '') && (pwd.current.value && pwd.current.value == '')){
            setError(false);
        }
        // check if the input fields are filled and make http call
        Axios.post(`${api_urls.login}?email=${email.current.value}&password=${pwd.current.value}`)
            .then(res => {
                const userCred = {
                    email: res.data.email,
                    password: res.data.password
                }
                sessionStorage.setItem('userCred', JSON.stringify(userCred))
                setdata(res.data);
            })
            .catch(err => {
                setError(err);
                // refreshForm();
            })
            .finally(res => {
               
            })
    }
    
    if (data && data.role == 'Trainer' && data.active == true) {
        auth.login(() => {
            props.history.push(`/trainer/${data.email}`);
        });
    } else if (data && data.role == 'Learner' && data.active == true) {
        auth.login(() => {
            props.history.push({
                pathname: `/user/home`,
                // pathname: `/learner/${data.email}`,
                state: data
            });
        });
    }

    let refreshForm = () => {
        email.current.value = '';
        pwd.current.value = '';
    }

    let handleIicon = () => {
        if(pwd.current.value) {
            let setPwdType = (type === 'password' ? 'text' : 'password')
            setType(setPwdType);
            setShow(!show);
        }
    }

    return (
        <React.Fragment>
            <div className="loginContainer">
                <Card>
                    <CardContent className="cardContent">
                        <Grid className="cardContainer" container>
                            <Grid className="leftPane" md={6} item xs={12}>
                                <Link to="/"><img src={LoginImage} alt="" /></Link>
                            </Grid>
                            <Grid className="rightPane" md={6} item xs={12}>
                                {error && <Alert severity="warning">Username or Password is incorrect</Alert>}
                                <h2>Log In</h2>
                                <form>
                                    <div className="form-control">
                                        <MailOutlineIcon /><input type="text" name="email" placeholder="Your Email ID" ref={email} />
                                        {/* <small>This field is required</small> */}
                                    </div>
                                    <div className="form-control">
                                        <LockOpenIcon />
                                        <div>
                                            <input type={type} name="password" placeholder="Password" ref={pwd} />
                                            {/* <small>This field is required</small> */}
                                        </div>
                                        {show ? <VisibilityIcon onClick={handleIicon} /> : <VisibilityOffIcon onClick={handleIicon} />}
                                    </div>
                                    <Grid container direction="row" justify="space-between" alignItems="center" className="loginDetails">
                                        {/* <div>
                                            <input type="checkbox" name="rememberMe" /> <span>Remember me</span>
                                        </div> */}
                                        <div style={{ color: '#3f51b5', fontWeight: '500', textDecoration: 'underline' }}>
                                            <Link to="forgot-password"><span>Forgot password?</span></Link>
                                        </div>
                                    </Grid>
                                    <div>
                                        <Button variant="contained" color="primary" onClick={handleLogin}>
                                            Log in
                                        </Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Login;