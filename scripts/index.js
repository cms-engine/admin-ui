import { initializeHeaderTime } from './main-page/showHeaderTime.js'
import initializeCharts from './main-page/chart.js'
import { initTable } from './main-page/table.js'

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts()
    initializeHeaderTime()

    const data = [
        { name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, startDate: "2008/11/28", salary: 162700 },
        { name: "Angelica Ramos", position: "CEO", office: "London", age: 47, startDate: "2009/10/09", salary: 1200000 },
        {
            name: "Ashton Cox",
            position: "Junior Technical Author",
            office: "San Francisco",
            age: 66,
            startDate: "2009/01/12",
            salary: 86000
        },
        {
            name: "Tiger Nixon",
            position: "System Architect",
            office: "Edinburgh",
            age: 61,
            startDate: "2011/04/25",
            salary: 320800
        },
        {
            name: "Garrett Winters",
            position: "Accountant",
            office: "Tokyo",
            age: 63,
            startDate: "2011/07/25",
            salary: 170750
        },
        {
            name: "Cedric Kelly",
            position: "Senior Javascript Developer",
            office: "Edinburgh",
            age: 22,
            startDate: "2012/03/29",
            salary: 433060
        },
        {
            name: "Herrod Chandler",
            position: "Sales Assistant",
            office: "San Francisco",
            age: 59,
            startDate: "2012/08/06",
            salary: 137500
        },
        {
            name: "Rhona Davidson",
            position: "Integration Specialist",
            office: "Tokyo",
            age: 55,
            startDate: "2010/10/14",
            salary: 327900
        },
        {
            name: "Colleen Hurst",
            position: "Javascript Developer",
            office: "San Francisco",
            age: 39,
            startDate: "2009/09/15",
            salary: 205500
        },
        {
            name: "Sonya Frost",
            position: "Software Engineer",
            office: "Edinburgh",
            age: 23,
            startDate: "2008/12/13",
            salary: 103600
        },
        {
            name: "Jena Gaines",
            position: "Office Manager",
            office: "London",
            age: 30,
            startDate: "2008/12/19",
            salary: 90560
        },
        {
            name: "Quinn Flynn",
            position: "Support Lead",
            office: "Edinburgh",
            age: 22,
            startDate: "2013/03/03",
            salary: 342000
        },
        {
            name: "Charde Marshall",
            position: "Regional Director",
            office: "San Francisco",
            age: 36,
            startDate: "2008/10/16",
            salary: 470600
        },
        {
            name: "Haley Kennedy",
            position: "Senior Marketing Designer",
            office: "London",
            age: 43,
            startDate: "2012/12/18",
            salary: 313500
        },
        {
            name: "Tatyana Fitzpatrick",
            position: "Regional Director",
            office: "London",
            age: 19,
            startDate: "2010/03/17",
            salary: 385750
        },
        {
            name: "Michael Silva",
            position: "Marketing Designer",
            office: "San Francisco",
            age: 66,
            startDate: "2012/11/27",
            salary: 198500
        },
        {
            name: "Paul Byrd",
            position: "Chief Financial Officer (CFO)",
            office: "New York",
            age: 64,
            startDate: "2010/06/09",
            salary: 725000
        },
        {
            name: "Gloria Little",
            position: "Systems Administrator",
            office: "New York",
            age: 59,
            startDate: "2009/04/10",
            salary: 237500
        },
        {
            name: "Bradley Greer",
            position: "Software Engineer",
            office: "London",
            age: 41,
            startDate: "2012/10/13",
            salary: 132000
        },
        {
            name: "Dai Rios",
            position: "Personnel Lead",
            office: "Edinburgh",
            age: 35,
            startDate: "2012/09/26",
            salary: 217500
        },
        {
            name: "Jenette Caldwell",
            position: "Development Lead",
            office: "New York",
            age: 30,
            startDate: "2011/09/03",
            salary: 345000
        },
        {
            name: "Yuri Berry",
            position: "Chief Marketing Officer (CMO)",
            office: "New York",
            age: 40,
            startDate: "2009/06/25",
            salary: 675000
        },
        {
            name: "Caesar Vance",
            position: "Pre-Sales Support",
            office: "New York",
            age: 21,
            startDate: "2011/12/12",
            salary: 106450
        },
        {
            name: "Doris Wilder",
            position: "Sales Assistant",
            office: "Sidney",
            age: 23,
            startDate: "2010/09/20",
            salary: 85600
        }
    ]

    if (document.getElementById('tableBody')) {
        initTable(data)
    }

    // showToast('Test Message: Top-Right Toast')
})

/**
 * Fetches data from a specified API endpoint and handles any errors.
 * Also logs the data to the console.
 */
