    var $data = $.get("https://tacos.now.sh/", function() {
      console.log($data.responseJSON);




      $("select").on("change", function() {
        let base = [];
        let myStr = this.children;
        for (var i = 0; i < myStr.length; i++) {
          if (myStr[i].selected) {
            myStr = myStr[i].innerText;
            console.log(myStr);
          }
        }
        let listId = this.value;
        console.log(listId);



        $("#" + listId)[0].innerHTML = "";

        $("#" + listId).append("<ul id=" + listId + 1 + " class=\"collapsible\" data-collapsible=\"accordion\"></ul>");
        for (let i = 0; i < $data.responseJSON[listId].length; i++) {
          if ($data.responseJSON[listId][i].title.indexOf(myStr) != -1) {
            $("#" + listId + "1").append("<li value=" + i + " id=\"test" + i + "\"><div class=\"collapsible-header\">" + $data.responseJSON[listId][i].title + "</li>");
            $("#test" + i).append("<ul id=\"1test" + i + "\" class=\"collapsible-body\"></ul>");
            for (let j = 0; j < $data.responseJSON[listId][i].ingredients.length; j++) {
              base.push($data.responseJSON[listId][i].ingredients[j]);
              $("#1test" + i).append("<li class=\"list\">" + base[j] + "</li>");
            }
            $(".collapsible").collapsible();
          }
        }
      });
    });
