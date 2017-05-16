let $data = $.get("https://tacos.now.sh/", function(){
  console.log($data.responseJSON);
  let base = [];
  let td1 =[];
  let td =[];
  let myStr = "Chicken";
  for (var i = 0; i < $data.responseJSON.base_layers.length; i++) {
    if ($data.responseJSON.base_layers[i].title.indexOf(myStr) != -1) {
      console.log("found");
      console.log($data.responseJSON.base_layers[i].title);
    }
  }

  // let i = 0;
  // for (var key in $data.responseJSON) {
  //   if ($data.responseJSON.hasOwnProperty(key)) {
  //     console.log($data.responseJSON[key][0].title);
  //     td1.push(document.createElement("td"));
  //     tr.push(document.createElement("tr"));
  //     td.push(document.createElement("td"));
  //     td[i].innerText = $data.responseJSON[key].title;
  //     td1[i].innerText = $data.responseJSON[key][0].title;
  //     tr[i].append(td[i]);
  //     tr[i].append(td1[i]);
  //     $("tbody")[0].append(tr[i]);
  //   }
  //   i++;
  // }
});
