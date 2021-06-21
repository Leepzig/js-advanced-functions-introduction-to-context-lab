// Your code here

const employeeRecordArrays = [
  ["Andrew", "Simmons", "Developer","8.50"],
   ["Andrew", "Simmons", "Developer","8.50"]
  ]
const record = ["Andrew", "Simmons", "Developer","3"]

const recordObj = {
  firstName: 'Andrew',
  familyName: 'Simmons',
  title: 'Developer',
  payPerHour: '3',
  timeInEvents: [ { type: 'TimeIn', hour: 1000, date: '2021-06-19' }, { type: 'TimeIn', hour: 700, date: '2021-06-20' } ],
  timeOutEvents: [ { type: 'TimeOut', hour: 1500, date: '2021-06-19' }, { type: 'TimeOut', hour: 1900, date: '2021-06-20' } ]
}

const createEmployeeRecord = (arr) => {
  const record = {
    firstName:arr[0],
    familyName:arr[1],
    title:arr[2],
    payPerHour:arr[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
  return record
}

const createEmployeeRecords = (nestedArr) => {
  return nestedArr.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = (record, dateStamp) => {
  const date =dateStamp.split(" ")
  const clockIn = {
    type:"TimeIn",
    hour:parseInt(date[1]),
    date:date[0]
  }
  record.timeInEvents.push(clockIn)
  return record
}

const createTimeOutEvent = (record, dateStamp) => {
  const date =dateStamp.split(" ")
  const clockOut = {
    type:"TimeOut",
    hour:parseInt(date[1]),
    date:date[0]
  }
  record.timeOutEvents.push(clockOut)
  return record
}

const hoursWorkedOnDate = (record, date) => {
  const timeIn = record.timeInEvents.find(eve => eve.date === date)
  const timeOut = record.timeOutEvents.find(eve => eve.date === date)
  return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (record, date) => {
  const hoursWorked = hoursWorkedOnDate(record, date)
  //console.log("PAY RATE:", record.payPerHour)
  //console.log("Hours Worked:", hoursWorked)
  //console.log("One Day's Wage:",hoursWorked * record.payPerHour)
  return hoursWorked * record.payPerHour
}

const allWagesFor = (record) => {
  const allDates = record.timeInEvents.map(eve => eve.date)
  // console.log("ALL THE DATES:", allDates)
  const wageArr = allDates.map( date => {
    // console.log(`Date:`, date)
    // console.log(wagesEarnedOnDate(record, date))
    return wagesEarnedOnDate(record, date)
    
  })
  // console.log("WAGES:", wageArr)
  return wageArr.reduce((total, element) => total + element)

}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
  return employeeRecords.find(record => record.firstName === firstName)
}

const calculatePayroll = (employeeRecords) => {
  const totals = employeeRecords.map(record => allWagesFor(record))
  console.log("Employees Owed:", totals)
  return totals.reduce((accum, element) => accum + element)
}

