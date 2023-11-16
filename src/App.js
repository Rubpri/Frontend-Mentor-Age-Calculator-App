import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
 
  const [day, setDay] = useState('--')
  const [month, setMonth] = useState('--')
  const [year, setYear] = useState('--')

  const [inputDay, setInputDay] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');

  const [resultDay, setResultDay] = useState('');
  const [resultMonth, setResultMonth] = useState('');
  const [resultYear, setResultYear] = useState('');

  const [error, setError] = useState('');

  const results = () => {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    if (inputDay === "") {setDay("--")}
    if (inputMonth === "") {setMonth("--")}
    if (inputYear === "") {setYear("--")}

    if (inputMonth > 0 && inputMonth < 13 && inputDay > 0 && inputDay < 32 && inputYear != "" &&
          (inputYear < currentDate.getFullYear() || inputYear <= currentYear && inputMonth < currentMonth || inputYear <= currentYear && inputMonth <= currentMonth && inputDay < currentDay)
          ){
      if (inputMonth == 1 || inputMonth == 3 || inputMonth == 5 || inputMonth == 7 || inputMonth == 8 || inputMonth == 10 || inputMonth == 12) {
        if (inputDay > 0 && inputDay < 32) {
          setResultDay(inputDay)
          setResultMonth(inputMonth)
          setResultYear(inputYear)  
          setError('');
        } else {
          setError('');
        };
      } else if (inputMonth == 4 || inputMonth == 6 || inputMonth == 9 || inputMonth == 11) {
          if (inputDay > 0 && inputDay < 31) {
            setResultDay(inputDay)
            setResultMonth(inputMonth)
            setResultYear(inputYear)
            setError('');
          } else {
            setError('');
          }
      } else {
          if (inputDay > 0 && inputDay < 29) {
            setResultDay(inputDay)
            setResultMonth(inputMonth)
            setResultYear(inputYear)
            setError('');  
          } else {
            setError('Invalid date')
          }
      }
    
      let daysDifference = currentDay - resultDay
      let monthsDifference = currentMonth - resultMonth
      let yearsDifference = currentYear - resultYear

      if (currentMonth < resultMonth) {
        yearsDifference -= 1; 
        monthsDifference = 12 - Math.abs(currentMonth - resultMonth);
      }

      if (currentDay < resultDay) {
        const lastDayOfLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        daysDifference = lastDayOfLastMonth - resultDay + currentDay;
        monthsDifference--;
      }

      setDay(daysDifference)
      setMonth(monthsDifference)
      setYear(yearsDifference)

    }   else {
          if (inputDay === "" || inputMonth === "" || inputYear === "") {
            setError('');
          } else { setError('Invalid date')}     
    }
  }

  useEffect(() => {
    results()
    }, );

  return (
    <div className="App" >

      <div className="App-center">
      
      <form className="day-month-year">
  
      <div className="day"> 
        <label htmlFor="day">DAY</label>
        <input 
          type="number" 
          id="day" 
          name="day" 
          placeholder="DD" 
          value={inputDay}
          onChange={(e) => setInputDay(e.target.value)}
          required
          >
          </input>
          
      </div>

      <div className="month"> 
        <label htmlFor="month">MONTH</label>
        <input 
          type="text" 
          id="month" 
          name="month" 
          placeholder="MM"
          value={inputMonth}
          onChange={(e) => setInputMonth(e.target.value)}
          required
          ></input>
      </div>

      <div className="year"> 
        <label htmlFor="year">YEAR</label>
        <input 
          type="text" 
          id="year" 
          name="year" 
          placeholder="YYYY" 
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          required
          ></input>
      </div>
      
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <div className="separator">
        <i className="fa-solid fa-circle-down"></i>
      </div>

      <div className="result">

        <h4><span>{year}</span> years</h4>
        <h4><span>{month}</span> months</h4>
        <h4><span>{day}</span> days</h4>

      </div>
      
      </div>
    </div>
  );
}

export default App;