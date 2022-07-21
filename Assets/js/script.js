//loads everything on ready
$(document).ready(function(){
    //grabs HTML DOM elements using jQuery
    var currentDayEl = $('#currentDay');
    var containerEl = $('.container');
    //creates a variable for dynamically added elements
    var scheduleHourContainer = $('col-1 hour')
    
    //uses moment library to find the current hour of the day
    var currentHour = moment().hour();
    
    //creates an array of hours that will be shown on the schedule
    var scheduleHours = [
        moment().hour(9).format('hA'),
        moment().hour(10).format('hA'),
        moment().hour(11).format('hA'),
        moment().hour(12).format('hA'),
        moment().hour(13).format('hA'),
        moment().hour(14).format('hA'),
        moment().hour(15).format('hA'),
        moment().hour(16).format('hA'),
        moment().hour(17).format('hA')
    ];
    
    
    //adds current day to header
    var currentDay = moment().format('dddd, MMMM Do');
    currentDayEl.text(currentDay);
    
    
    
    function hourColor(textArea) {
        //creates a variable of scheduleHour (the hour written in the first column of the page) to use to compare to the currentHour
        var scheduleHour = moment($(scheduleHourContainer).text().trim(), 'hA').hour();
    
    
        //conditional statement verifies what color background each textarea should have
        if (scheduleHour > currentHour) {
            $(textArea).addClass('future');
        }
        else if (scheduleHour === currentHour) {
            $(textArea).addClass('present');
        }
        else {
            $(textArea).addClass('past');
        }
    }
    
    
    //adds time blocks for each work hour
    for (var i = 0; i < scheduleHours.length; i++) {
    
        //adds div that will contain hour, task and save button, adds classes for styling, adds id
        var rowContainer = $('<div>')
            .addClass('row time-block')
            .attr({
                id: 'row-' + (i + 9)
            })
    
        //adds div for hour column, adds classes for styling, adds id
        var scheduleHourContainer = $('<div>')
            .addClass('col-1 hour')
            .text(scheduleHours[i])
    
        //adds a textarea to add task, adds classes for styling, adds id
        var textArea = $('<textarea>')
            .addClass('col-10 description')
        
    
        //calls on function to verify what color each textArea should be
        hourColor(textArea);
    
        //adds a button in the last column of the rowContainer, adds class saveBtn, adds id
        var saveBtn = $('<button>')
            .addClass('col-1 saveBtn')
            .attr({
                id: 'save-button-' + (i + 9),
                type: 'button',
            })
    
        //adds save icon that will be appended to the save button
        var saveIcon = $('<i>')
            .addClass('fas fa-save');
    
        //appends dynamically created elements
        $(containerEl).append(rowContainer);
        $(rowContainer).append(scheduleHourContainer);
        $(rowContainer).append(textArea);
        $(rowContainer).append(saveBtn);
        $(saveBtn).append(saveIcon);
    }
    
    
    function saveTask() {
        //this is whatever you click on the page -- the save button, take its sibling with class .description and get its value
        var value = $(this).siblings('.description').val();
        //take parent of button clicked and get id 
        var time = $(this).parent().attr('id');

        //saves the value and time in local storage
        localStorage.setItem(time, value);
        
        //creates a div with text and a class of notification
        var saveMessage = $('<div>').addClass('notification').text('Appointment Added ✅');
        //adds the created div to the top of the container
        $('.container').prepend(saveMessage);
        
        //removes saveMessage after 5 seconds
        setTimeout (function() {
            $('.notification').remove();
        }
            , 5000);
    }


   //listener for save button, invokes call back function 
    $('.saveBtn').on('click', saveTask);
//load any saved data from local storage 
    for (var i = 0; i < 15; i++) {
        $('#row-' + (i+9) + ' .description').val(localStorage.getItem('row-' + (i+9)))
    }
})