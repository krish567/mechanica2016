$(document).ready(function () {
  setInterval(function() {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var hourDegrees = hours * 30 + (minutes / 2);
    var minuteDegrees = minutes * 6;
    var secondDegrees = seconds * 6;
    var hourRotate = 'rotate(' + hourDegrees + 'deg)';
    var minuteRotate = 'rotate(' + minuteDegrees + 'deg)';
    var secondRotate = 'rotate(' + secondDegrees + 'deg)';
    $('.hours').css({'transform': hourRotate});
    $('.minutes').css({'transform' : minuteRotate});
    $('.seconds').css({'transform' : secondRotate});
  }, 1000);
});