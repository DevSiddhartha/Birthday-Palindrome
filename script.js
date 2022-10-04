function reverseString(str)
{
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isStringPalindrome(str)
{
    var reverse = reverseString(str);
    return str === reverse;
}

function convertDateToStr(date)
{
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10)
    {
        dateStr.day = '0' + date.day;
    } else
    {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10)
    {
        dateStr.month = '0' + date.month;
    } else
    {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

// var date = {
//     day: 10,
//     month: 6,
//     year: 1997
// }

function getAllDateFormats(date)
{
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date)
{
    var listOfPalindromes = getAllDateFormats(date);
    var isPalindrome = false;

    for (var i = 0; i < listOfPalindromes.length; i++)
    {
        var check = isStringPalindrome(listOfPalindromes[i])
        if (check === true)
        {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

function isLeapYear(year)
{
    if (year % 400 === 0)
    {
        return true;
    }
    if (year % 100 === 0)
    {
        return false;
    }
    if (year % 4 === 0)
    {
        return true;
    }
    return false;
}
function getNextDate(date)
{
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2)
    {
        if (isLeapYear(year))
        {
            if (day > 29)
            {
                day = 1;
                month++;
            }
        }
        else
        {
            if (day > 28)
            {
                day = 1;
                month++
            }
        }
    }

    else
    {
        if (day > daysInMonth[month - 1])
        {
            month++;
            day = 1;
        }
    }
    if (month > 12)
    {
        day = 1
        month = 1;
        year++;
    }
    return { day: day, month: month, year: year }
}

function getPreviousDate(date)
{
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3)
    {
        if (isLeapYear(year))
        {
            if (day === 0)
            {
                day = 29;
                month--;
            }
        }
        else
        {
            if (day === 0)
            {
                day = 28;
                month--;
            }
        }
    }
    else
    {
        if (day === 0)
        {
            month--;
            day = daysInMonth[month - 1];
        }
    }
    if (month === 0)
    {
        month = 12;
        year--;
        day = 31;
    }
    return { day: day, month: month, year: year }
}

function getNextPalindromeDate(date)
{
    var nextdate = getNextDate(date);
    var ctr = 0;
    while (1)
    {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextdate);
        if (isPalindrome)
        {
            break;
        }
        nextdate = getNextDate(nextdate);
    }
    return [ctr, nextdate];
}

function getPreviousPalindromeDate(date)
{
    var previousDate = getPreviousDate(date);
    var ctr = 0;
    while (1)
    {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome)
        {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr, previousDate];
}


function checkForPalindrome()
{
    var bdayStr = dateInput.value;
    if (bdayStr === '')
    {
        alert("Please enter a valid birthday date");
    }
    if (bdayStr !== '')
    {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome)
        {
            output.innerText = "Yayy!! your birthday is a Palindrome!!";
        }
        else
        {
            var [ctr1, nextDate] = getNextPalindromeDate(date);
            var [ctr2, previousDate] = getPreviousPalindromeDate(date);
            console.log(ctr1, ctr2);
            if (ctr1 < ctr2)
            {
                output.innerText = 'The next palindrome date is ' + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + ", you missed it by " + ctr1 + " days";
            }
            else
            {
                output.innerText = 'The previous palindrome date is ' + previousDate.day + '-' + previousDate.month + '-' + previousDate.year + ", you missed it by " + ctr2 + " days";
            }
        }

    }
}


var dateInput = document.querySelector("#bday-input");
var showButton = document.querySelector("#show-btn");
var output = document.querySelector("#output");

showButton.addEventListener("click", checkForPalindrome);