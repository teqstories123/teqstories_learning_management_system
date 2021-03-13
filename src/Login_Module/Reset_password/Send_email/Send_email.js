import React, {useRef} from 'react'
import Axios from 'axios';
import { api_urls } from '../../../api/api_urls';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LoginImage from '../../../Assets/loginImage.jpg';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Button from '@material-ui/core/Button';

function Send_email() {

    let email = useRef(null);

    let sendEmail = (e) => {
        e.preventDefault();
        Axios.post(`${api_urls.sendEmailForPasswordChange}?email=${email.current.value}`)
        .then(res=>{
            console.log(res);
            email.current.value = '';
        })
        .catch(err=>{
            console.log(err);
        })
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
                                <MailOutlineIcon /><input type="text" name="email" placeholder="Your Email ID"  ref={email} />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" onClick={sendEmail}>
                                    Send Email
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

export default Send_email
