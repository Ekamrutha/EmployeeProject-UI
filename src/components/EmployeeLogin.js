import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EmployeeLogin.css'
import { fetchDataRequest, fetchEmployeeID } from '../actions/loginAction';
const EmployeeLogin = () => {
   
    const [empId,setEmpId] = useState();
    const [isMatching,setIsMatching] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    // async function getData(){
    //     const response = await axios.get('http://localhost:8080/', {headers: { 
    //         'Access-Control-Allow-Origin' : '*',
    //         'Access-Control-Allow-Methods':'GET,PUT,POST'}
    //       },).then(res => res.data);
    //    setData(response);
    // }

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, [dispatch])


    const navigate = useNavigate();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const isMatching = data?.some(obj =>  { return obj.username === e.target.username.value && obj.password === e.target.password.value});
        
        setIsMatching(isMatching);
        setIsSubmitted(true);
        isMatching ? navigate('/success') : navigate('/');
        if(isMatching){
       const employeeId = data?.find(obj => obj.username === e.target.username.value && obj.password === e.target.password.value).employeeId;
        dispatch(fetchEmployeeID(employeeId));
        }
    }

    const {data} = useSelector(state => state.login);
    
    return (
        <div className='login'>
            <img src='/people.png' className='image'></img>
            <div className='form'>
                <h1 className='heading'>CNR Software Solutions</h1>
                <form onSubmit={handleSubmit}>
                { isSubmitted && (isMatching ? (<h5 style={{ color: 'green' }}>Login Successful.</h5>) : <h5 style={{ color: 'red' }}> Username/Password is Incorrect.</h5>)}
                    <label>Username</label><br />
                    <input type='email' className='input' name="username" required /><br />
                    <label>Password</label><br />
                    <input type='password' className='input' name="password" required /><br />
                    <input className='button' type='submit' value='Login' />
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin