
function subsTime (t){
    var current_time = t.text();
    if (current_time > 1) {
        t.text(parseInt(current_time) - 1);
    }
}

function addTime (t) {
    var current_time = t.text();
    t.text(parseInt(current_time) + 1);
}

function formatTime (hr, min, sec) {
    if (hr < 10) {
        hr = ('0' + hr).slice(-2);
    }
    if (min < 10) {
        min = ('0' + min).slice(-2);
    }
    if (sec < 10) {
        sec = ('0' + sec).slice(-2);
    }
    if (hr == 0) {
        return min + ':' + sec;
    }
    else return hr + ':' + min + ':' + sec;
}

function displayTime (session, t, optional){
    var temp_time = session * 60;
    var temp_hr = Math.floor(temp_time / 3600);
    var temp_min = Math.floor((temp_time / 60 - temp_hr * 60));
    var temp_sec = Math.floor(temp_time - temp_hr*3600 - temp_min*60);
    t.removeClass();

    if (optional === undefined) {}
    if (optional == 1) {
        if (temp_hr == 0 && temp_min > 0 && temp_min <= 2 && temp_sec <= 59) {
        t.addClass("yellow");
    }
        else if (temp_hr == 0 && temp_min == 0 && temp_sec <= 59) {
        t.addClass("red");
    }
        else t.addClass("green");
    }
     t.text(formatTime(temp_hr, temp_min, temp_sec));
}

function updateTime (t) {
    var str_time = $('#clock').text().split(':');
    if (str_time.length == 2) {
        temp_hr = 0;
        temp_min = str_time[0];
        temp_sec = str_time[1];
    }
    else {
        temp_hr = str_time[0];
        temp_min = str_time[1];
        temp_sec = str_time[2];
    }

    if (temp_sec > 0) {
        temp_sec--;
    }
    else if (temp_min > 0) {
        temp_sec = 59;
        temp_min--;
    }
    else if (temp_hr > 0) {
        temp_min = 59;
        temp_hr--;
    }

    if (temp_hr == 0 && temp_min > 0 && temp_min <= 2 && temp_sec <= 59) {
        t.addClass("yellow");
    }
    else if (temp_hr == 0 && temp_min == 0 && temp_sec <= 59) {
        t.addClass("red");
    }
    else t.addClass("green");

    t.text(formatTime(temp_hr, temp_min, temp_sec));
}


var interval = null;
var default_session = 25;
var default_break = 5;


$(document).ready(function () {
    var session_count = $('#session').text() * 60;
    var break_count = $('#break').text() * 60;
    var temp_count = session_count;
    var name_count = 0;

    displayTime($('#session').text(), $('#clock'));


    $('#s_minus').on('click', function(){
        subsTime($('#session'));
        session_count = $('#session').text() * 60;
        temp_count = session_count;
        displayTime($('#session').text(), $('#clock'));
    })


    $('#s_add').on('click', function(){
        addTime($('#session'));
        session_count = $('#session').text() * 60;
        temp_count = session_count;
        displayTime($('#session').text(), $('#clock'));
    })


     $('#b_minus').on('click', function(){
        subsTime($('#break'));
        break_count = $('#break').text() * 60;

    })

     $('#b_add').on('click', function(){
        addTime($('#break'));
        break_count = $('#break').text() * 60;

    })


    $('#play').on('click', function() {
        $(this).prop("disabled", true);
        $("#pause").removeClass("enter");
        $("#pause").prop("disabled", false);
        $("#s_minus").prop("disabled", true);
        $("#s_add").prop("disabled", true);
        $("#b_minus").prop("disabled", true);
        $("#b_add").prop("disabled", true);
        interval = setInterval(function () {
            updateTime($('#clock'));
            temp_count--;

            if (temp_count < 0) {
                displayTime(break_count/60, $('#clock'), 1);
                temp_count = break_count;
                break_count = session_count;
                session_count = temp_count;

                if (name_count%2 == 0) {
                    $('#clock_name').text("Break");
                }
                else $('#clock_name').text("Session");
                name_count++;
            }
        },1000);
    })

    $('#pause').on('click', function(){
        $(this).prop("disabled", true);
        $("#play").removeClass("enter");
        $('#play').prop("disabled", false);
        clearInterval(interval);
    })

    $('#stop').on('click', function(){
        name_count = 0;
        $('#play').prop("disabled", false);
        $("#play").removeClass("enter");
        $("#pause").removeClass("enter");
        $("#s_minus").prop("disabled", false);
        $("#s_add").prop("disabled", false);
        $("#b_minus").prop("disabled", false);
        $("#b_add").prop("disabled", false);
        clearInterval(interval);
        session_count = $('#session').text() * 60;
        break_count = $('#break').text() * 60;
        temp_count = session_count;
        $('#clock_name').text("Session");
        displayTime($('#session').text(), $('#clock'));
    })

    $('#reset').on('click', function(){
        name_count = 0;
        $('#play').prop("disabled", false);
        $("#play").removeClass("enter");
        $("#pause").removeClass("enter");
        $("#s_minus").prop("disabled", false);
        $("#s_add").prop("disabled", false);
        $("#b_minus").prop("disabled", false);
        $("#b_add").prop("disabled", false);
        clearInterval(interval);
        $('#session').text(default_session);
        $('#break').text(default_break);
        session_count = $('#session').text() * 60;
        break_count = $('#break').text() * 60;
        temp_count = session_count;
        $('#clock_name').text("Session");
        displayTime($('#session').text(), $('#clock'));
    })

    $('#s_add').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#s_add').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#b_add').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#b_add').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#s_minus').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#s_minus').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#b_minus').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#b_minus').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#play').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#play').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#pause').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#pause').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#reset').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#reset').on('mouseleave', function(){
        $(this).removeClass("enter");
    })

    $('#stop').on('mouseenter', function(){
        $(this).addClass("enter");
    })

    $('#stop').on('mouseleave', function(){
        $(this).removeClass("enter");
    })


})