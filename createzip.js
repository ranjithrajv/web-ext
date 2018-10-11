// Uses JSZip.js and FileSaver.js


var zip = new JSZip();

// Add the file
zip.file("manifest.json", "");

// Background Scripts
var background_scripts = zip.folder(background);
background_scripts.file("background.html","//Insert your HTML code here");
background_scripts.file("background.js","//Insert your JS code here");


// Content Scripts
var content_scripts = zip.folder(content);
content_scripts.file("content.css","//Insert your CSS code here");
content_scripts.file("content.js","//Insert your JS code here");

// Browser Actions
var browser_actions = zip.folder(browser);
var icons = browser_scripts.folder(icons);
var popup = browser_scripts.folder(popup);
popup.file("popup.html","//Insert your HTML code here");
popup.file("popup.css","//Insert your CSS code here");
popup.file("popup.js","//Insert your JS code here");


// Page Action
var page_action = zip.folder(pageaction);
var icons = page_action.folder(icons);
var popup = page_action.folder(popup);
popup.file("popup.html","//Insert your HTML code here");
popup.file("popup.css","//Insert your CSS code here");
popup.file("popup.js","//Insert your JS code here");

// Options Page
var options_page = zip.folder(options);
options_page.file("options.html","//Insert your HTML code here");
options_page.file("options.css","//Insert your CSS code here");
options_page.file("options.js","//Insert your JS code here");


// Create the zip
var promise = null;
if (JSZip.support.uint8array) {
  promise = zip.generateAsync({type : "uint8array"}).then(function(content) {
                                            saveAs(content, "example.zip");
                                        });
} else {
  promise = zip.generateAsync({type : "string"}).then(function(content) {
                                            saveAs(content, "example.zip");
                                    });
}
