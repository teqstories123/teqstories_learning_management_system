import React from 'react'
import { Link } from 'react-router-dom';
import auth from '../../auth/auth'
import BatchList from '../Batch_Module/Batch_List/BatchList';
import './Trainer.scss';

function Trainer(props) {

    let logout = () => {
        auth.logout(() => {
            props.history.push("/");
        })
    }
    return (
        <div>
            <BatchList trainerData={props} />
        </div>
    )
}

export default Trainer
