import React from 'react'
import { useSelector } from 'react-redux';
import './Profile.css';

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
const displaySkills = (empData) => {
   return <div className='overflowBox'>{empData.skills?.split(',').map(obj => <p>{obj}</p>)}</div>
}
const managerDetails = (empData) => {
    const managerData = [
        {
            header: 'MANAGER ID',
            data: empData?.managerId,
        },
        {
            header: 'MANAGER NAME',
            data: empData?.managerName,
        },
    ]
    return managerData;
}
const Profile = ()  => {
    const {empData} = useSelector(state => state.employeeData);
  return (
    <>
    <p className='profileHeading'>Welcome {empData?.firstName+" "}{empData?.lastName} !!</p>
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
        <div className='headerTwoLabel'>Skills</div>
        {displaySkills(empData)}
        <div className='headerTwoLabel'>Manager Details</div>
            <div className='flexBox'>
        {managerDetails(empData).map(obj => <div className='eachParameter'>
                            <p className='dataHeader'>{obj.header}</p>
                            <p>{obj.data}</p>
                        </div>)}
            </div>
    </div>
    </>
  )
  
}

export default Profile