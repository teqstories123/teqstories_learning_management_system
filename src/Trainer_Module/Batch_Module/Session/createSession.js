import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import { api_urls } from '../../../api/api_urls';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const CreateSession = (props) => {
    const classes = useStyles();
    let query = useQuery();
    const querySessionId = query.get("sessionId");
    console.log('create session', props);
    console.log('id', query.get("sessionId"))
    const sessId = useRef();
    const videoLink = useRef();
    const transcriptLink = useRef();
    const sessionNotes = useRef();
    const sessionTitle = useRef();

    function getSession() {
        Axios.get(`${api_urls.getSession}?sessionId=${querySessionId}`)
            .then(res => {
                    sessId.current.value = res.data.sessionId;
                    videoLink.current.value = res.data.videoLink;
                    transcriptLink.current.value = res.data.transcriptLink;
                    sessionTitle.current.value = res.data.sessionTitle;
                    sessionNotes.current.value = res.data.sessionNotes;
            })
            .catch(res => console.log(res));
    }

    useEffect(() => {
        if(querySessionId){
            getSession();
        }
        return () => {
        }
    }, [])

    const addSessions = (e) => {
        e.preventDefault();
        let addSession = {
            sessionIndex: props.match.params.sessionIndex ? (parseInt(props.match.params.sessionIndex) + 1) : 1,
            videoLink: videoLink.current.value,
            transcriptLink: transcriptLink.current.value,
            sessionTitle: sessionTitle.current.value,
            sessionNotes: sessionNotes.current.value,
            batch: {
                batchId: parseInt(props.match.params.id)
            }
        }
        console.log('sessId',sessId.current.value);
        if(sessId.current.value==''){
            Axios.post(`${api_urls.createNewSession}`, addSession)
            .then(res => {
                console.log(res)
                // getSessions();
                props.history.push(`/session/${props.match.params.id}`)
            })
            .catch(res => console.log(res));
        }else {
            addSession.sessionId = sessId.current.value;
            Axios.put(`${api_urls.updateSession}`, addSession)
            .then(res => {
                console.log('put',res)
                // getSessions();
                props.history.push(`/session/${props.match.params.id}`)
            })
            .catch(res => console.log(res));
        }
    }

    return (
        <form onSubmit={addSessions} className={classes.root} noValidate autoComplete="off">
            <input type="hidden" ref={sessId}/>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Video Link"
                    variant="outlined"
                    inputRef={videoLink}
                />
            </div>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Session Title"
                    variant="outlined"
                    inputRef={sessionTitle}
                />
            </div>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Transcript Link"
                    variant="outlined"
                    inputRef={transcriptLink}
                />
            </div>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={4}
                    variant="outlined"
                    inputRef={sessionNotes}
                />
            </div>
            <div>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default CreateSession;