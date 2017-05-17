var $data = $.get("https://tacos.now.sh/", function() {
  console.log($data.responseJSON);
  let desc;

  let catPicsHolder = [];
  let catPics = [];

  var $catPics = $.get("https://thecatapi.com/api/images/get?format=xml&results_per_page=60", function() {
    catPicsHolder = ($catPics.responseXML.children[0].children[0].children[0].children);
    for (let i = 0; i < catPicsHolder.length; i++) {
      catPics[i] = catPicsHolder[i].children[0].innerHTML;


      $.get({
        url: catPics[i],
        success: function(){
          $("#cat").append("<img class=\"z-depth-3 catImg col s3\" src=\"" + catPics[i] + "\">");
        },
        error: function(){
          console.log("not found");
        }
      });
    }
  });

  let newCatHolder = $.get("https://thecatapi.com/api/images/get?format=xml&type=gif", function() {
    let newCat = (newCatHolder.responseXML.children[0].children[0].children[0].children[0].children[0].innerHTML);
    $("#index").prepend("<img class=\"container bottomMargin z-depth-3 topMargin\" src=\"" + newCat + "\">");
  });

  $(function() {
    showPage("index");
  });

  const pageFunctions = {};

  function registerPage(name, pageFunction) {
    pageFunctions[name] = pageFunction;
  }

  $(".page-link").click(function(event) {
    event.preventDefault();
    const name = this.dataset.page;
    $(".active").removeClass("active");
    this.classList.add("active");
    showPage(name);
  });

  function showPage(name) {
    $(".page").hide();
    $("." + name + "-page").show();

    pageFunctions[name]();
  }

  function index() {
    $("h2").text("index");
  }

  registerPage("index", index);

  function recipe() {
    $("h2").text("recipe");
  }

  registerPage("recipe", recipe);

  function cat() {
    $("h2").text("cat");
  }

  registerPage("cat", cat);

  $("select").on("change", function() {
    let randomChoice;
    let base = "";
    let myStr = this.children;
    let listId = this.value;
    for (var i = 0; i < myStr.length; i++) {
      if (myStr[i].selected) {
        myStr = myStr[i].innerText;
        console.log(myStr);
        if (myStr === "Random") {
          randomChoice = Math.floor(Math.random() * $data.responseJSON[listId].length);
          myStr = ($data.responseJSON[listId][randomChoice].title);
        }
      }
    }
    console.log(listId);



    $("#" + listId)[0].innerHTML = "";


    $("#" + listId).append("<ul id=" + listId + 1 + " class=\"collapsible\" data-collapsible=\"accordion\"></ul>");
    for (let i = 0; i < $data.responseJSON[listId].length; i++) {
      if ($data.responseJSON[listId][i].title.indexOf(myStr) != -1) {
        $("#" + listId + "1").append("<li value=" + i + " id=\"test" + i + "\"><div class=\"collapsible-header\">" + $data.responseJSON[listId][i].title + "</li>");
        $("#test" + i).append("<ul id=\"1test" + i + "\" class=\"center collapsible-body\"><a value=" + i + " class=\"myBut rigth waves-effect waves-light btn\" href=\"#modal1\">Modal</a></ul>");
        desc = ($data.responseJSON[listId][i].description);
        $("#1test" + i).append("<li class=\"list\">" + desc + "</li>");
        for (let j = 0; j < $data.responseJSON[listId][i].ingredients.length; j++) {
          base += ("<li>" + $data.responseJSON[listId][i].ingredients[j] + "</li>");
        }

      }
    }
    $(".modal").modal();
    $(".myBut").on("click", function() {
      console.log(this);
      let idNum = (this.getAttribute("value"));
      console.log(listId);
      console.log(base);
      $("#modalBody").html("");
      $("#modalList").html("");
      $("#modalList").html(base);
      $("#modalBody").html($data.responseJSON[listId][idNum].directions);
      // $("#modalBody").text($data.responseJSON[listId][idNum].directions);
      // $("#modalBody")[0].innerText($data.responseJSON[listId][i].directions);
    });
    $(".collapsible").collapsible();
    $("#submit").on("click", function() {
      // console.log($("#" + listId + "1")[0].children);
      for (var i = 0; i < $("#" + listId + "1")[0].children.length; i++) {
        if ($("#" + listId + "1")[0].children[i].classList.contains("active")) {
          console.log($data.responseJSON[listId][$("#" + listId + "1")[0].children[i].value].directions);
          $("body").append($data.responseJSON[listId][$("#" + listId + "1")[0].children[i].value].directions);
        }
      }
    });
  });
});
