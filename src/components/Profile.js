import React from 'react'
import { useSelector } from 'react-redux';
import './Profile.css';

// const firstRowDetails = ['EMPLOYEE ID', 'CLIENT NAME', 'BAND']
// const secondRowDetails = ['EXPERIENCE', 'PROJECT NAME', 'JOB ROLE']
const firstRowDetails = (empData) => {
    const firstRowData = [
        {
            header: 'EMPLOYEE ID',
            data: empData?.employeeId,
        },
        {
            header: 'CLIENT NAME',
            data: empData?.client,
        },
        {
            header: 'BAND',
            data: empData?.band,
        }
    ]
    return firstRowData;
}
const secondRowDetails = (empData) => {
    const secondRowData = [
        {
            header: 'EXPERIENCE',
            data: empData?.experience+" Years",
        },
        {
            header: 'PROJECT NAME',
            data: empData?.projectName,
        },
        {
            header: 'JOB ROLE',
            data: empData?.jobRole,
        }
    ]
    return secondRowData;
}
const Profile = ()  => {
    const {empData} = useSelector(state => state.employeeData);
  return (
    <>
    <p className='heading'>Welcome {empData?.firstName+" "}{empData?.lastName} !!</p>
    <div className='mainBox'>
        <div className='headerLabel'>Employee Details</div>
        <div className='flexBox'>
            {firstRowDetails(empData).map(obj => <div className='eachParameter'>
                            <p className='dataHeader'>{obj.header}</p>
                            <p>{obj.data}</p>
                            </div>)}
        </div>
        <div className='flexBox'>
            {secondRowDetails(empData).map(obj => <div className='eachParameter'>
                            <p className='dataHeader'>{obj.header}</p>
                            <p>{obj.data}</p>
                            </div>)}
        </div>
    </div>
    </>
  )
  
}

export default Profile