$(document).ready(function(){

  $('#submit').on('click', function(){

      var item = $("#item").val();

      var today = Date();
      var dateString = today.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      var created = dateArray[0];

      var dateObj = { "item": item, "created": created };


      $.ajax({
        type: 'POST',
        url: '/',
        data: dateObj,

        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;
  });

});
