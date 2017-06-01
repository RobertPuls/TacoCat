$(".page").hide();

let $data = $.get("https://tacos.now.sh/", function() {
  let tacoObj = {};
  let tacoCount = 0;

  $("#mainList").closest("ul").hide();
  if (localStorage.length > 0) {

    loadSave();

  } else if (localStorage.length === 0) {
    $("#nothing").show();
  }

  function loadSave() {
    for (let i = 0; i < localStorage.length; i++) {
      if (typeof(localStorage[i]) === "undefined") {
        i++;
        tacoCount++;
      }
      tacoObj = (JSON.parse(localStorage[i]));
      tacoSave();
    }
  }

  function tacoSave() {
    $("#nothing").hide();
    $("#mainList").closest("ul").show();
    $("#mainList").innerHTML = "";
    $("#mainList").show();
    $("#mainList").append(`<div id= ${tacoCount} class="collapsible-body" style="text-align: left;"></div>`);

    localStorage[tacoCount] = JSON.stringify(tacoObj);

    let $paragraph = $(`<span class="col s9"></span>`);
    let keyCounter = 0;
    for (let key in tacoObj) {
      keyCounter++;
      let space = ", ";
      if (!keyCounter < (Object.keys(tacoObj)).length) {
        space = "";
      }
      $("#" + tacoCount).append($paragraph);
      $paragraph.append(JSON.parse(localStorage[tacoCount])[key] + space);
      // }
    }
    let $delete = $(`<a class="delete waves-effect waves-light btn">delete</a>`);
    $delete.click(function() {
      localStorage.removeItem(this.closest("div").id);
      tacoCount--;
      this.closest("div").outerHTML = "";
      if (localStorage.length === 0) {
        $("#nothing").show();
        $("#mainList").closest("ul").hide();
      }
    });
    $("#" + tacoCount).append($delete);

    tacoCount++;
  }

  $("#saveTaco").click(tacoSave);
  let desc;

  let catPicsHolder = [];
  let catPics = [];

  let $catPics = $.get("https://thecatapi.com/api/images/get?format=xml&results_per_page=60", function() {
    catPicsHolder = ($catPics.responseXML.children[0].children[0].children[0].children);
    for (let i = 0; i < catPicsHolder.length; i++) {
      catPics[i] = catPicsHolder[i].children[0].innerHTML;


      $.get({
        url: catPics[i],
        success: function() {
          $("#cat").append(`<img class="z-depth-3 materialboxed catImg col s3" src="${catPics[i]}">`);
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
    $("#index").prepend(`<img class="container catGif bottomMargin z-depth-3 topMargin" src="${newCat}">`);
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
    $("#loading").show();
    $(".page").hide();
    setTimeout(function(){
      $("#loading").hide();
      $("." + name + "-page").show();
    }, 1800);

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
    let choice = "";
    let myStr = this.children;
    let listId = this.value;
    let recipes = $data.responseJSON[listId];
    for (let i = 0; i < myStr.length; i++) {
      if (myStr[i].selected) {
        myStr = myStr[i].innerText;
        if (myStr === "Random") {
          randomChoice = Math.floor(Math.random() * recipes.length);
          myStr = (recipes[randomChoice].title);
        } else if (myStr === "All") {
          myStr = "";
        }
      }
    }

    $("#" + listId)[0].innerHTML = "";

    $("#" + listId).append(`<ul id="${listId}_inner" class="center collapsible" data-collapsible="accordion"></ul>`);

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].title.indexOf(myStr) != -1) {
        $(`#${listId}_inner`).append(`<li id="${listId + i}"><div class="collapsible-header">${recipes[i].title}</li>`);
        $(`#${listId + i}`).append(`<ul id="${listId + i}_desc" class="center collapsible-body"></ul>`);
        desc = (recipes[i].description);
        $(`#${listId + i}_desc`).append(`<li class="center list">${desc}</li><a data-layer="${listId}" value="${i}" class="myBut rightMargin rigth waves-effect waves-light btn topMargin" href="#modal1">Recipe</a>`);

        let $button = $(`<a id="taco ${listId}" value="${i}" class="save leftMargin waves-effect waves-light btn topMargin">Add</a>`);
        $button.click(function() {
          if (typeof(Storage) !== "undefined") {
            let layerType = (this.id.slice(this.id.indexOf(" ") + 1));
            let inLayer = $data.responseJSON[layerType][this.getAttribute("value")].title;

            tacoObj[layerType] = inLayer;
          }
        });

        $(`#${listId + i}_desc`).append($button);
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          choice += (`<li>${recipes[i].ingredients[j]}</li>`);
        }
      }
    }

    $(".modal").modal();
    $(".myBut").on("click", function() {
      let idNum = (this.getAttribute("value"));
      let directions = $data.responseJSON[this.dataset.layer][idNum].directions;
      $("#modalBody").html("");
      $("#modalList").html("");
      $("#modalList").html(choice);
      $("#modalBody").html(directions);
    });
    $(".collapsible").collapsible();
  });
});
