// smooth scrolling with the skipToTop button
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// listener for click on skipToTop button
$("#skipToTop").click(function() {
    scrollToTop();
});

// sets up way to simulate clicking a link in JavaScript
function clickLink(hrefTag, targetBlank = true)
{
    var a = document.createElement("a");
    a.href = hrefTag;

    if(targetBlank)
    {
        a.target = "_blank";
    }
    
    a.click();
}

// Reapply a direct subsection link after all Markdown content has rendered.
// Otherwise, content loaded above the target can push it down after the
// browser performs its initial fragment navigation.
function scrollToHashAfterMarkdownRender()
{
    var hash = decodeURIComponent(window.location.hash.substring(1));

    if (!hash)
    {
        return;
    }

    var markdownElements = Array.from(document.querySelectorAll("zero-md"));
    var renderPromises = markdownElements.map(function(element) {
        if (element.children.length > 0)
        {
            return Promise.resolve();
        }

        return new Promise(function(resolve) {
            element.addEventListener("zero-md-rendered", resolve, {once: true});
        });
    });

    Promise.all(renderPromises).then(function() {
        var target = document.getElementById(hash);

        if (target)
        {
            target.scrollIntoView();
        }
    });
}

scrollToHashAfterMarkdownRender();

// listener for clicking on the logo
$("#logo").click(function() {
    clickLink("/index.html", false);
});

// listeners for clicks on an element with the class "skipTo"
$(".skipTo").click(function() {
    var classes = $(this).attr("class");

    // this reads the class after the "skipTo" class
    var id = classes.split(/\s+/)[1];

    // it directs the page to the section with that id
    clickLink("#" + id, false);
});

// listeners for clicks on an element with the class "clickLink"
$(".clickLink").click(function() {
    var classes = $(this).attr("class");

    // reads the link in the class after the "clickLink" class
    var href = classes.split(/\s+/)[1];

    // it opens a new page with that link
    clickLink(href);
});

// the menu opens and closes depending on if the user is hovering
// on the three bars in the header

// if you click on three bars the navigation bar in the headers
// then the navigation menu stays open

// click_menuOn is true if the menu should be open whether or not
// the user has hovered on the menu because they have clicked on the three bars
var click_menuOn = false;

// listens for the navigation links in the header
$(".navSubLink").click(function() {
    var href = $(this).children()[0].getAttribute("href");
    clickLink(href, false);
});

$(".navLink").click(function() {
    var href = $(this).children()[0].getAttribute("href");
    clickLink(href, false);
});

// hover listeners for the navigation three bars in the header
// "mouseover" means the user is hovering
$("#headerNavBar").on("mouseover", function() {
    // changes the color of the three bars accordingly
    var iconForSkip = document.getElementById("iconForSkip");
    iconForSkip.style.color = "var(--white)";

    // opens the <details> element to show the <summary> element
    var details = getDetails();
    details.open = true;
});

// hover listeners for the navigation three bars in the header
// "mouseout" means the user is not hovering
$("#headerNavBar").on("mouseout", function() {
    if(!click_menuOn)
    {
        // changes the color of the three bars accordingly
        var iconForSkip = document.getElementById("iconForSkip");
        iconForSkip.style.color = "var(--blue)";

        // closes the <details> element to hide the <summary> element
        var details = getDetails();
        details.open = false;
    }
});

// hover listeners for the body of the navigation menu that shows when
// the three bars have been clicked on

// "mouseover" means the user is hovering
$("#navbar_details").on("mouseover", function() {
    // opens the <details> element to show the <summary> element
    var details = getDetails();
    details.open = true;
});

// hover listeners for the body of the navigation menu that shows when
// the three bars have been clicked on

// "mouseout" means the user is not hovering
$("#navbar_details").on("mouseout", function() {
    if(!click_menuOn)
    {
        // closes the <details> element to hide the <summary> element
        var details = getDetails();
        details.open = false;
    }    
});

// this is a listener for whether or not the user has clicked on the three bars
$("#iconForSkip").click(function() {
    // updates the click_menuOn every click
    click_menuOn = !click_menuOn;

    var iconForSkip = document.getElementById("iconForSkip");
    var details = getDetails();

    if(!click_menuOn)
    {
        // opens the <details> element to show the <summary> element
        iconForSkip.style.color = "var(--blue)";
        details.open = true;
    }
    else
    {
        // closes the <details> element to hide the <summary> element
        details.open = false;
        iconForSkip.style.color = "var(--white)";
    }
});

// accesses the <details> element that determines
// whether or not the navigation menu is showing
function getDetails()
{
    var headerNavBar = document.getElementById("headerNavBar");

    // accesses first child of headerNavBar, which is the details element
    return headerNavBar.childNodes[1];
}
