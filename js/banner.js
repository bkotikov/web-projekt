
    var first = $(location).attr('pathname');
    first.indexOf(1);
    first.toLowerCase();
    first = first.split("/")[1];
    
    $("#banner").load("/" + first + "/banner");
  