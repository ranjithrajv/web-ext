

  // Assigning default Values for the Variables
  var extname="Example", extversion="0.1", extdescription="Example Description";

  //Creation of required Objects.
  var data = new Object();

  //Adding the functionality to show and hide the Deck 2
  document.getElementById('pointer').addEventListener("click", function(){
    if(document.getElementById('deck2').style.display == "none"){
      document.getElementById('deck2').style.display == "block";
      document.getElementById('pointer').src = "img/left.svg";
    } else {
      document.getElementById('deck2').style.display == "none";
      document.getElementById('pointer').src = "img/right.svg";
    }
  }, false);

  // Adding on click function for Generate File button
  document.getElementById("submit").addEventListener("click", function(){

    var dummy = new Object();
    var dummy2 = new Object();
    var dummy3 = new Object();
    var dummy4 = new Object();
    var dummy5 = new Object();
    var dummy6 = new Object();
    var dummy7 = new Object();


    // Assigning user entered for the Variables
    var dummy = document.getElementById('extname').value;
    if(dummy != "") {
       extname = dummy;
    }
    console.log("Name : " + extname);

    var dummy = document.getElementById('extdescription').value;
     if(dummy != "") {
      extdescription = dummy;
    }
    console.log("Description : " + extdescription);

    var dummy = document.getElementById('extversion').value;
     if(dummy != null) {
       extversion = dummy;
    }
    console.log("Version : " + extversion);

    //Assigning values to Objects.
    data.manifest_version = 2;
    data.name = extname;
    data.description = extdescription;
    data.version = extversion;

    if(document.getElementById('ShortName').value != "") {
      data.short_name = document.getElementById('ShortName').value();
    }

    if(document.getElementById('VersionName').value != "") {
      data.version_name = document.getElementById('VersionName').value;
    }

    if(document.getElementById('HomepageURL').value != "") {
      data.homepage_url = document.getElementById('HomepageURL').value;
    }

    if(document.getElementById('DevName').value != "" && document.getElementById('DevURL').value != "") {
      data.developer = {
        name:document.getElementById('DevName').value,
        url:document.getElementById('DevURL').value
      };
    }


    if(document.getElementById("page").checked) {
        console.log("Entered the Page Action sequence");

        dummy2.default_icon = {
          "32":"path/example-16X16.png",
          "64":"path/example-32X32.png"
        };

        dummy2.default_title = "Title";
        dummy2.default_popup = "path/examplepage.html";

        data.page_action = dummy2;

        console.log(data.page_action);


    } else if(document.getElementById("browser").checked) {
      console.log("Entered the Browser Action sequence");

      dummy2.default_icon = {
        "32":"path/example-16X16.png",
        "64":"path/example-32X32.png"
      };
      dummy2.default_title = "Title";
      dummy2.default_popup = "path/examplepage.html";

      data.browser_action = dummy2;

      console.log(data.broser_action);


    } else if(document.getElementById("sidebar").checked) {
      console.log("Entered the Sidebar Action sequence");

      dummy2.default_title = data.name;
      dummy2.default_panel = "path/example.html";
      dummy2.default_icon = "path/example.png";

      data.sidebar_action = dummy2;

      console.log(data.sidebar_action);

    }

    if(document.getElementById("backgroundScript").checked) {
      dummy3.scripts = ["background.js"];

      data.background = dummy3;
      console.log(data.background);
    }

    if(document.getElementById("contentScript").checked) {

      dummy4.matches = ["*://*.mozilla.org/*"];
      dummy4.js = ["content.js"];

      data.content_scripts = [dummy4];

      console.log(data.content_scripts);
    }

    if(document.getElementById("OptionsPage").checked) {

      dummy5.page = "options/options.html"
      data.options_ui = dummy5;

      console.log(data.options_ui);
    }

    if(document.getElementById("AddrBarSug").checked) {

      dummy6.keyword = "key";
      data.omnibox = dummy6;

      console.log(data.omnibox);
    }

    if(document.getElementById("DevTools").checked) {

      data.devtools_page = "devtools_page.html";

      console.log(data.devtools_page);
    }


    var checkboxes = document.getElementsByName('check');
    var checkboxesChecked = [];

    // loop over them all
    for (var i=0; i < checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].id);
       }
    }

    if(checkboxesChecked.length > 0) {
      data.permissions = checkboxesChecked;
    }


    //Creating the object text
    var datatext = JSON.stringify(data, null, 6);
    console.log(datatext);

    // Uses JSZip.js and FileSaver.js
    var extension = new JSZip();
    var zip = extension.folder(data.name);
    
    // Manifest file
    zip.file("manifest.json", datatext, {binary : true, compression : "DEFLATE"});

    if(document.getElementById('backgroundScript').checked) {
      // Background Scripts
      var background_scripts = zip.folder("background");
      background_scripts.file("background.html","//Insert your HTML code here", {binary : true, compression : "DEFLATE"});
      background_scripts.file("background.js","//Insert your JS code here", {binary : true, compression : "DEFLATE"});
    }

    if(document.getElementById('contentScript').checked) {
      // Content Scripts
      var content_scripts = zip.folder("content");
      content_scripts.file("content.css","//Insert your CSS code here", {binary : true, compression : "DEFLATE"});
      content_scripts.file("content.js","//Insert your JS code here", {binary : true, compression : "DEFLATE"});
    }

    if(document.getElementById('browser').checked) {
      // Toolbar - Browser Actions
      var browser_scripts = zip.folder("browser");
      var icons = browser_scripts.folder(icons);
      var popup = browser_scripts.folder(popup);
      popup.file("popup.html","//Insert your HTML code here");
      popup.file("popup.css","//Insert your CSS code here");
      popup.file("popup.js","//Insert your JS code here");
    }

    if(document.getElementById('page').checked) {
      // Address Bar - Page Action
      var page_action = zip.folder("page");
      var icons = page_action.folder(icons);
      var popup = page_action.folder(popup);
      popup.file("popup.html","//Insert your HTML code here", {binary : true, compression : "DEFLATE"});
      popup.file("popup.css","//Insert your CSS code here", {binary : true, compression : "DEFLATE"});
      popup.file("popup.js","//Insert your JS code here", {binary : true, compression : "DEFLATE"});
    }

    if(document.getElementById('sidebar').checked) {
      // Sidebar - Sidebar Action
      var sidebar_action = zip.folder("sidebar");
      var icons = sidebar_action.folder(icons);
      popup.file("sidebar.html","//Insert your HTML code here", {binary : true, compression : "DEFLATE"});
      popup.file("sidebar.css","//Insert your CSS code here", {binary : true, compression : "DEFLATE"});
      popup.file("sidebar.js","//Insert your JS code here", {binary : true, compression : "DEFLATE"});
    }

    if(document.getElementById('OptionsPage').checked) {
      // Options Page
      var options_page = zip.folder("options");
      options_page.file("options.html","//Insert your HTML code here", {binary : true, compression : "DEFLATE"});
      options_page.file("options.css","//Insert your CSS code here", {binary : true, compression : "DEFLATE"});
      options_page.file("options.js","//Insert your JS code here", {binary : true, compression : "DEFLATE"});
    }

    // Create the zip
    var promise = null;
    filename = data.name + ".zip";
    promise = zip.generateAsync({type : "blob"}).then(function(content) {
      saveAs(content, filename);
    });

  }, false);
