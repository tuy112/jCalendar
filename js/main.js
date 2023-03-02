// made by JStol

// 시계 Part "요구하신대로 utc표준시 적용해서 전 세계 동일하게 출력됩니다"
var clock = document.querySelector(".clock");
function getTimezoneOffset(){
    var time = new Date();

    var hour = String(time.getHours()).padStart(2,"0");
    var minutes = String(time.getMinutes()).padStart(2,"0");
    var seconds = String(time.getSeconds()).padStart(2,"0");

    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();

    document.getElementById("clock").innerHTML = hour +":" + minutes + ":"+ seconds;
    document.getElementById("date").innerHTML = year +"년 " + month + "월 "+ date + "일 ";
}



// 달력 Part
$(document).ready(function() {
    calendarInit();
});
function calendarInit(){
    var date = new Date();
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    var kstGap = 9 * 60 * 60 * 1000;
    var today = new Date(utc + kstGap);
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    
    var currentYear = thisMonth.getFullYear();
    var currentMonth = thisMonth.getMonth();
    var currentDate = thisMonth.getDate();

    // 달력 Part - 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        $('.yearMonth').text(currentYear + '.' + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }
        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }


    // 달력 Part - nav
    $('.navBtn.prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });
    $('.navBtn.next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });
}

var time = new Date();

var viewYear = time.getFullYear();
var viewMonth = time.getMonth();
// document.querySelector('.yearMonth').textContent = `${viewYear}년 ${viewMonth + 1}월`;






// 최종 출력되는 곳
window.onload = function() {
    getTimezoneOffset();
    setInterval(getTimezoneOffset,1000);
}
