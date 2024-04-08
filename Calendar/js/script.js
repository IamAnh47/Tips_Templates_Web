document.addEventListener("DOMContentLoaded", function() {
    var calendar = document.getElementById("calendar");
    var schedule = document.getElementById("schedule");
    var selectedDate = null;

    renderCalendar();
    updateDateTime();

    function renderCalendar() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);
        var daysInMonth = lastDay.getDate();
        var startingDay = firstDay.getDay();

        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];

        var html = '<div class="calendar-header"><h1>' + monthNames[month] + ' ' + year + '</h1>';
        html += '<p>Date: <strong>' + monthNames[date.getMonth()] + ' ' + day + ', ' + year + '</strong></p>';
        html += '<p>Time: <strong id="clock">' + hours + ':' + minutes + ':' + seconds + '</strong></p></div>';
        html += '<table class="calendar-table">';
        html += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
        html += '<tbody>';

        var day = 1;
        for (var i = 0; i < 6; i++) {
            html += '<tr>';
            for (var j = 0; j < 7; j++) {
                if (i === 0 && j < startingDay) {
                    html += '<td></td>';
                } else if (day > daysInMonth) {
                    break;
                } else {
                    html += '<td>' + day + '</td>';
                    day++;
                }
            }
            html += '</tr>';
        }

        html += '</tbody></table>';
        calendar.innerHTML = html;

        var calendarDays = document.querySelectorAll('.calendar-table td');
        calendarDays.forEach(function(day) {
            day.addEventListener('click', function() {
                var clickedDate = new Date(year, month, parseInt(this.textContent));
                selectedDate = clickedDate;
                showScheduleForDate(clickedDate);
            });
        });
    }

    function updateDateTime() {
        var clockElement = document.getElementById("clock");
        setInterval(function() {
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            clockElement.textContent = hours + ':' + minutes + ':' + seconds;
        }, 1000);
    }

    function showScheduleForDate(date) {
        var scheduleHtml = '<h2>Schedule for ' + date.toDateString() + '</h2>';
        scheduleHtml += '<p>Sample schedule for ' + date.toDateString() + '</p>';
        schedule.innerHTML = scheduleHtml;
    }
});