import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeData } from '../actions/employeeDataAction';
import Attendance from './Attendance';
import './EmployeeMainPage.css';
import Financials from './Financials';
import Profile from './Profile';

const component = (selectedHeader) => {
  if(selectedHeader === 'Profile')
    return <Profile/>
  else if (selectedHeader === 'Attendance')
  return <Attendance/>
  else if (selectedHeader === 'Financials')
  return <Financials/>
}

const EmployeeMainPage = () => {
    const dispatch = useDispatch();
    const {empID} = useSelector(state => state.login);
    // async function getData(){
    //     const response = await axios.post('http://localhost:8080/employeeData', empID ,{headers: { 
    //         'Access-Control-Allow-Origin' : '*',
    //         'Content-Type': 'text/plain',
    //         'Access-Control-Allow-Methods':'GET,PUT,POST'}
    //       },).then(res => res.data);
    //    setData(response);
    // }
    const [selectedHeader, setSelectedHeader] = useState('Profile');
    const headers = ['Profile', 'Attendance', 'Financials'];

    useEffect(() => {
       dispatch(fetchEmployeeData(empID));
    }, [empID])
    
  return (
    
    <div>
      <div className='NavBar'>
        <div className='flex'>
          {headers.map(obj => <div className={selectedHeader===obj ? 'border' : 'textColor'} onClick={() => setSelectedHeader(obj)}>{obj}</div>)}
          </div>
      </div>
     {component(selectedHeader)}
    </div>
  )
}

export default EmployeeMainPage