function getIndexPage() {
    return new Promise(resolve)
}



$(document).ready(function(){
  var first = $(location).attr('pathname');
  first.indexOf(1);
  first.toLowerCase();
  first = first.split("/")[1];
  
  $("#content").load("/" + first + "/cookie");
});