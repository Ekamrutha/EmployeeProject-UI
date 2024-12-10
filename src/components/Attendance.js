import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceDetails } from '../actions/attendanceAction';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Attendance.css';

const Attendance = () => {

  const dispatch = useDispatch();
  const {empID} = useSelector(state => state.login);
  const {attendanceData} = useSelector(state => state.attendance);
  useEffect(() => {
    dispatch(fetchAttendanceDetails(empID));
  }, [empID])
  const [date, setDate] = useState('');
  const [selectedButton, setSelectedButton] = useState('Day');
  const [index, setIndex] = useState(1);
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
  const firstDate = dateRange.length ? moment(dateRange?.[0]).format('YYYY-MM-DD') : '';
  const lastDate = dateRange.length ? moment(dateRange?.[1]).format('YYYY-MM-DD') : '';
  
  const dateRangeAttendance = attendanceData.filter(obj => obj.date <=  moment(lastDate).format('YYYY-MM-DD') && obj.date>= moment(firstDate).format('YYYY-MM-DD'));

  const handleNextClick = () => {
   if(index<dateRangeAttendance.length){
    setIndex(index+1);
   }
  }

  const handlePrevClick = () => {
   if(index>1){
    setIndex(index-1);
   }
  }

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
        return (firstDate!=='' && lastDate!=='') ? 
        (<div className='attendanceContainer'><div className='attendance'>
        <div className='display'>Attendance : <div className={moment(dateRangeAttendance[index-1]['date']).format('dddd') === 'Saturday' || moment(dateRangeAttendance[index-1]['date']).format('dddd') === 'Sunday' ? '' : dateRangeAttendance[index-1]['captured']=== 'Y' ? 'green' : 'red'}>{moment(dateRangeAttendance[index-1]['date']).format('dddd') === 'Saturday' || moment(dateRangeAttendance[index-1]['date']).format('dddd') === 'Sunday' ? 'Weekly Off' : ''}</div></div>
        <p>Date : {moment(dateRangeAttendance[index-1]['date']).format('Do MMMM YYYY')}</p>
        <p>Day : {moment(dateRangeAttendance[index-1]['date']).format('dddd')}</p>
        <p>In Time : {dateRangeAttendance[index-1]['captured'] === 'N' ? '-' : dateRangeAttendance[index-1]['in_time']}</p>
        <p>Out Time : {dateRangeAttendance[index-1]['captured'] === 'N' ? '-' : dateRangeAttendance[index-1]['out_time']}</p>
        <div className='buttonContainer1'>
          <div className={index===1 ? 'disabledButton' : 'navigateButton'} onClick={handlePrevClick}>Prev</div>
          <div className={index===dateRangeAttendance.length ? 'disabledButton' : 'navigateButton'} onClick={handleNextClick}>Next</div>
        </div>
      </div>
      </div>) : 
      <div className='attendanceContainer'>
         <div className='attendance'>Please select Date Range</div>
      </div>
      }
  }

  return (
    <div className='main'>
      <div>
        <div className='buttonContainer'>
            <div className={selectedButton==='Day' ? 'selectedButton' : 'attendanceButton'} onClick={() => {setSelectedButton('Day'); setDate('')}}>Day</div>
            <div className={selectedButton==='Date Range' ? 'selectedButton' : 'attendanceButton'} onClick={() => {setSelectedButton('Date Range'); setDateRange([])}}>Date Range</div>
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