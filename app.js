var $data = $.get("https://tacos.now.sh/", function() {
  let myTacos = [];
  let tacoObj = {};
  let tacoCount = 0;
  let tacoHolder = [];



  $("#mainList").closest("ul").hide();
  // console.log(localStorage.length);
  if (localStorage.length > 0) {

    loadSave();

  } else if (localStorage.length === 0) {
    $("#nothing").show();
  }
  // let tacoName = "my taco";

  function loadSave() {
    // for (let i = 0; i < localStorage.length; i++) {
    //   for (var key in JSON.parse(localStorage[i])) {
    //     if (JSON.parse(localStorage[i]).hasOwnProperty(key)) {
    //       tacoObj = (JSON.parse(localStorage[i])[key]);
    //     }
    //   }
    //   // tacoObj = myTacos[i];
    //   tacoSave();
    // }
    for (var i = 0; i < localStorage.length; i++) {
      if (typeof(localStorage[i]) === "undefined") {
        i++;
        tacoCount++;
      }
      myTacos[0] = (JSON.parse(localStorage[i]));
      console.log(tacoHolder);
      // tacoCount++;
      tacoSave();
    }
  }

  function tacoSave() {
    $("#nothing").hide();
    $("#mainList").closest("ul").show();
    if (!jQuery.isEmptyObject(tacoObj)) {
      myTacos[0] = (JSON.parse(JSON.stringify(tacoObj)));
      console.log(myTacos);
    }
    for (let i = 0; i < tacoHolder.length; i++) {
      console.log("here");
      // console.log("2", tacoHolder);
      // myTacos.push(tacoHolder[i]);
    }
    console.log(myTacos);

    // console.log("here");
    // myTacos = [];
    // console.log("here", myTacos);


    // let tacoList = document.createElement("ul");


    // $("#archive").append("<ul id=\"mainList\" class=\"center collapsible\" data-collapsible=\"accordion\"></ul>");
    // $("#mainList").append("<ul id=" + tacoCount + " class=\"center collapsible\" data-collapsible=\"accordion\"></ul>");
    // $("#" + tacoCount).append("<li id=\"list" + tacoCount + "\"><div class=\"collapsible-header\">" + tacoName + "</li>");
    // $("#list" + tacoCount).append("<ul id=\"body" + tacoCount + "\" class=\"center collapsible-body\"></ul>");
    $("#mainList").innerHTML = "";
    $("#mainList").show();
    $("#mainList").append("<div id=" + tacoCount + " class=\"collapsible-body\" style=\"text-align: left;\"></div>");

    // for (let i = tacoCount; i < myTacos.length; i++) {

    localStorage[tacoCount] = JSON.stringify(myTacos[0]);
    console.log(localStorage[tacoCount]);
    // $("#archive")[0].innerHTML = JSON.parse(localStorage[i]).base_layers;

    let $paragraph = $("<span class=\"col s9\"></span>");
    let keyCounter = 0;
    for (var key in myTacos[0]) {
      keyCounter++;
      console.log(key);
      let space = " ";
      console.log(myTacos);
      console.log((Object.keys(myTacos[0])).length);
      if (keyCounter < (Object.keys(myTacos[0])).length) {
        space = ", ";
      }
      $("#" + tacoCount).append($paragraph);
      $paragraph.append(JSON.parse(localStorage[tacoCount])[key] + space);
      // }
    }
    let $delete = $("<a class=\"delete waves-effect waves-light btn\">delete</a>");
    $delete.click(function() {
      // console.log(this.closest("div").id);
      localStorage.removeItem(this.closest("div").id);
      tacoCount--;
      this.closest("div").outerHTML = "";
      if (localStorage.length === 0) {
        $("#nothing").show();
        $("#mainList").closest("ul").hide();
      }
    });
    $("#" + tacoCount).append($delete);

    // }
    tacoCount++;
  }

  $("#saveTaco").click(tacoSave);
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
        success: function() {
          $("#cat").append("<img class=\"z-depth-3 materialboxed catImg col s3\" src=\"" + catPics[i] + "\">");
          $(".materialboxed").materialbox();
        },
        error: function() {
          console.log("not found");
        }
      });
    }
  });

  let newCatHolder = $.get("https://thecatapi.com/api/images/get?format=xml&type=gif", function() {
    let newCat = (newCatHolder.responseXML.children[0].children[0].children[0].children[0].children[0].innerHTML);
    $("#index").prepend("<img class=\"container catGif bottomMargin z-depth-3 topMargin\" src=\"" + newCat + "\">");
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

  function saved() {
    $("h2").text("saved");
  }

  registerPage("saved", saved);

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
        } else if (myStr === "All") {
          myStr = "";
        }
      }
    }
    console.log(listId);



    $("#" + listId)[0].innerHTML = "";


    $("#" + listId).append("<ul id=" + listId + 1 + " class=\"center collapsible\" data-collapsible=\"accordion\"></ul>");
    for (let i = 0; i < $data.responseJSON[listId].length; i++) {
      if ($data.responseJSON[listId][i].title.indexOf(myStr) != -1) {
        $("#" + listId + "1").append("<li value=" + i + " id=\"test" + listId + i + "\"><div class=\"collapsible-header\">" + $data.responseJSON[listId][i].title + "</li>");
        $("#test" + listId + i).append("<ul id=\"1test" + listId + i + "\" class=\"center collapsible-body\"></ul>");
        desc = ($data.responseJSON[listId][i].description);
        $("#1test" + listId + i).append("<li class=\"center list\">" + desc + "</li><a value=" + i + " class=\"myBut rightMargin rigth waves-effect waves-light btn topMargin\" href=\"#modal1\">Recipe</a>");

        let $button = $("<a id=\"taco " + listId + "\" value=" + i + " class=\"save leftMargin waves-effect waves-light btn topMargin\">Save</a>");
        $button.click(function() {
          if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            let layerType = (this.id.slice(this.id.indexOf(" ") + 1));
            let inLayer = $data.responseJSON[layerType][this.getAttribute("value")].title;

            tacoObj[layerType] = inLayer;

            console.log(tacoObj);


          } else {
            // Sorry! No Web Storage support..
          }
        });


        $("#1test" + listId + i).append($button);
        for (let j = 0; j < $data.responseJSON[listId][i].ingredients.length; j++) {
          base += ("<li>" + $data.responseJSON[listId][i].ingredients[j] + "</li>");
        }

      }
    }





    $(".modal").modal();
    $(".myBut").on("click", function() {
      console.log(this);
      let idNum = (this.getAttribute("value"));
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
