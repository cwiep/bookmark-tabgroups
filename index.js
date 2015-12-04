var buttons = require("sdk/ui/button/action");
var tabs = require("sdk/tabs")
let {Bookmark, Group, save } = require("sdk/places/bookmarks")

var button = buttons.ActionButton({
    id: "bookmark-tabgroups",
    label: "Bookmark all tabgroups",
    icon: {
        "16": "./button_16px.png"
    },
    onClick: createBookmarks
});

function createBookmarks(state) {
    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
    }
    // create new folder for all currently opened tabs
    var folderName = "bookmarks_" + Date.now();
    console.log("Bookmarking all tabs to folder '"+folderName+"'.");
    var group = Group({title: folderName});
    var bookmarks = []
    for(let tab of tabs) {
        console.log(tab.title + ": " + tab.url);
        bm = Bookmark({title: tab.title, url: tab.url, group:group});
        bookmarks.push(bm);
    }
    save(bookmarks).on("end", function (saves, inputs) {
      // like the previous example, the "end" event returns an
      // array of all of our updated saves. Only explicitly saved
      // items are returned in this array -- the `group` won't be
      // present here.
      console.log("Bookmarked " + saves.length + " items."); // "Ran"
    });
}
