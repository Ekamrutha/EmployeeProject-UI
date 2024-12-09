import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceDetails } from '../actions/attendanceAction';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Attendance.css';
import WeekNumbers from 'react-calendar/dist/cjs/MonthView/WeekNumbers';

const Attendance = () => {

  const dispatch = useDispatch();
  const {empID} = useSelector(state => state.login);
  const {attendanceData} = useSelector(state => state.attendance);
  useEffect(() => {
    dispatch(fetchAttendanceDetails(empID));
  }, [empID])
  const [date, setDate] = useState('');
  const [selectedButton, setSelectedButton] = useState('Day');
  const attendance = attendanceData.filter(obj => obj.date === moment(date).format('YYYY-MM-DD'));
  const attendanceDisplay = attendance.length === 0 ? [{
    captured : "-",
    date : moment(date).format('YYYY-MM-DD'),
    in_time : "-",
    out_time : "-",
    }] : attendance
  const maxDate = new Date();
  const minDate = new Date(moment().subtract(3, 'months'));

  const [dateRange, setDateRange] = useState([]);
  const firstDate = moment(dateRange?.[0]).format('YYYY-MM-DD');
  const lastDate = moment(dateRange?.[1]).format('YYYY-MM-DD');

  const dateRangeAttendance = attendanceData.filter(obj => obj.date <=  moment(lastDate).format('YYYY-MM-DD') && obj.date>= moment(firstDate).format('YYYY-MM-DD'));
  const selectedAttendance = (selectedButton) => {
      if(selectedButton === 'Day'){
      return date!=='' ? 
      <div className='attendanceContainer'>
     {attendanceDisplay.map(obj =>  <div className='attendance'>
     <div className='display'>Attendance : <div className={moment(obj.date).format('dddd') === 'Saturday' || moment(obj.date).format('dddd') === 'Sunday' ? '' : obj.captured === 'Y' ? 'green' : 'red'}>{moment(obj.date).format('dddd') === 'Saturday' || moment(obj.date).format('dddd') === 'Sunday' ? 'Weekly Off' : ''}</div></div>
     <p>Date : {moment(obj.date).format('Do MMMM YYYY')}</p>
     <p>Day : {moment(obj.date).format('dddd')}</p>
     <p>In Time : {obj.captured === 'N' ? '-' : obj.in_time}</p>
     <p>Out Time : {obj.captured === 'N' ? '-' : obj.out_time}</p>
   </div>)} </div>: 
      <div className='attendanceContainer'>
      <div className='attendance'>Please select a Date</div>
      </div>
      }
      else if (selectedButton === 'Date Range'){
        return firstDate!=='' && lastDate!=='' ? 
        dateRangeAttendance.map(obj => <div className='attendanceContainer'><div className='attendance'>
        <div className='display'>Attendance : <div className={moment(obj.date).format('dddd') === 'Saturday' || moment(obj.date).format('dddd') === 'Sunday' ? '' : obj.captured === 'Y' ? 'green' : 'red'}>{moment(obj.date).format('dddd') === 'Saturday' || moment(obj.date).format('dddd') === 'Sunday' ? 'Weekly Off' : ''}</div></div>
        <p>Date : {moment(obj.date).format('Do MMMM YYYY')}</p>
        <p>Day : {moment(obj.date).format('dddd')}</p>
        <p>In Time : {obj.captured === 'N' ? '-' : obj.in_time}</p>
        <p>Out Time : {obj.captured === 'N' ? '-' : obj.out_time}</p>
      </div></div>) : 
         <div className='attendance'>Please select Date Range</div>
      }
  }

  return (
    <div className='main'>
      <div>
        <div className='buttonContainer'>
            <div className={selectedButton==='Day' ? 'selectedButton' : 'attendanceButton'} onClick={() => setSelectedButton('Day')}>Day</div>
            <div className={selectedButton==='Date Range' ? 'selectedButton' : 'attendanceButton'} onClick={() => setSelectedButton('Date Range')}>Date Range</div>
      </div>
      {selectedAttendance(selectedButton)}
      </div>
        <div>
        {selectedButton === 'Day' ? <Calendar className='calendar' value={date} onChange={(value) => setDate(value)} minDate={minDate} maxDate={maxDate}/>
        : <Calendar className='calendar' minDate={minDate} maxDate={maxDate} selectRange={true} value={dateRange} onChange={(value) => setDateRange(value)}/>}
        </div>
    </div>
    
  )
}

export default Attendance