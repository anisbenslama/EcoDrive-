document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var eventModal = document.getElementById('eventModal');
  var closeModal = document.getElementsByClassName('close')[0];
  var eventForm = document.getElementById('eventForm');
  var lessonDateInput = document.getElementById('lessonDate');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    dateClick: function(info) {
      lessonDateInput.value = info.dateStr;
      eventModal.style.display = "block";
    },
    events: [] // You can add pre-defined events here
  });

  calendar.render();

  closeModal.onclick = function() {
    eventModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == eventModal) {
      eventModal.style.display = "none";
    }
  }

  eventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var courseType = document.getElementById('courseType').value;
    var instructorName = document.getElementById('instructorName').value;
    var lessonTime = document.getElementById('lessonTime').value;
    var lessonDate = document.getElementById('lessonDate').value;
    
    var newEvent = {
      title: courseType.charAt(0).toUpperCase() + courseType.slice(1) + ' - ' + instructorName,
      start: lessonDate + 'T' + lessonTime
    };

    calendar.addEvent(newEvent);
    eventModal.style.display = "none";
    eventForm.reset();
  });
});
