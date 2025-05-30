# SimVascular Website

This is the repository for the SimVascular website.

You can use the following table with links to quickly skip to sections.

<table>
        <tr>
                <th>
                        Updating the landing page     
                </th>
                <th>
                        Updating the documentation
                </th>
        </tr>
        <tr>
                <th>
                        <a href="#updating-the-recent-news-section">The Recent News section</a>
                </th>
                <th>
                        <a href="#editing-existing-documentation">Editing existing documentation</a>
                </th>
        </tr>
        <tr>
                <th>
                         <a href="#updating-the-capabilities-section">The Capabilities section</a>
                </th>
                <th>
                        <a href="#adding-new-sections-on-the-same-html-page">Adding new sections</a>
                </th>
        </tr>
         <tr>
                <th>
                        <a href="#updating-the-team-section">The Team section</a>
                </th>
                <th>
                        <a href="#creating-new-user-guide-or-clinical-test-case-pages">Creating new documentation pages</a>
                </th>
        </tr>        
</table>

If markdown does not seem to be rendering properly, check out the <a href="#notes-on-writing-markdown-files">Notes on writing markdown files</a> section.

If you still have questions after reading through this documentation, you can contact the developer of this website Carole Darve at carole.darve@gmail.com.

## Viewing the documentation locally

When updating the documentation (see below), you can build it locally on your computer. If you're using Visual Studio Code, you can download the [Live Server Plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Then, right-click anywhere in `index.html` and select `Open with Live Server`.

[Caddy](https://caddyserver.com/docs/) can also be used as an HTTPS server to locally view the HTML documentation. Once Caddy is installed change directories to your simvascular.github.io clone and run `caddy file-server --listen :2015` from the command line. You can then open a web browser with `localhost:2015` to view the results of edits of your local HTML files. You will need to [disable caching](https://developer.chrome.com/blog/devtools-tips-36) in your browser to see your changes.

## Updating the documentation

Thank you for updating SimVascular's documentation.

The SimVascular website user guides can be found in the documentation folder, and the SimVascular website clinical test cases can be found in the clinical folder. In each folder, there are `html` files and their corresponding folder, which share the same name. For example, the folder associated with the `quickguide.html` file is named quickguide.

The JavaScript that adds functionality to the navigation bar and navigation section in the documentation is read from `documentation.js`.

In each folder, there are markdown files from which the content in the `html` files is generated. [Markdown](https://daringfireball.net/projects/markdown) is a lightweight markup language with plain text formatting syntax that can be editied using a text editor.

The markdown files are accessed and translated into `html` with the `<zero-md>` element, which is placed in the `html` file. Documentation on `<zero-md>` can be found [here](https://zerodevx.github.io/zero-md/).

The icons used in this website come from [fontawesome](https://fontawesome.com/search?o=r&m=free). Some styling comes from [Bootstrap](https://getbootstrap.com/) because we want to make the website as compatible with mobile phones as possible.

Before editing, you should first fork **simvascular.github.io** to your own repository and sync it with https://github.com/SimVascular/simvascular.github.io.

### Notes on writing markdown files

Because the markdown files are rendered through the `<zero-md>` element, there are a few details to look out for to ensure the markdown renders correctly. These are detailed below.

#### Naming all documentation markdown files "readme.md"

Markdown files with a name that is not `readme.md` are not considered by the github.io compiler even if they are linked in `<zero-md>` elements in the rendered `html` page. Because the SimVascular website is hosted with github pages, all markdown files accessed by `<zero-md>` elements should be named `readme.md` to be accessed in the compiling of the website.

In order to differentiate between the different markdown files all titled "readme.md," the markdown files are placed in their own folders.

#### Embedding HTML in markdown files

Markdown is very compatible with `html`, so you can use `html` and markdown interchangebly in a markdown file, and it will render `html` correctly. However, there are a few places where the languages may not render correctly.

For one, you cannot use markdown styling inside `html` elements.

For example:

`<h5> An example **header** </h5>` will display as

<h5> An example **header** </h5>

The word "header" is not bold because the markdown styling with the \*\* to signify bolding was placed inside the `<h5>` element, and markdown styling does not render inside `html` elements.

To still be able to bold the word that you want inside an `html` element, you can use the `html` styling. In this case, instead of writing `<h5> An example **header**</h5>`, which will not render correctly, you can write `<h5> An example <b>header</b></h5>` where `<b>` is the element to bold words in `html`.

Another detail to make sure the page renders the styling correctly is to add new lines between code in html and in markdown.

For example, this code

```
<h5> An example header </h5>
This is styled with **html** and not markdown because there is no new line

<h5> An example header </h5>

This has a new line so it is styled with **markdown**.
```

will renders as follows:

<h5> An example header </h5>
This is styled with **html** and not markdown because there is no new line

<h5> An example header </h5>

This has a new line so it is styled with **markdown**.

Notice how, in the example above, the new line is necessary for the markdown styling to apply.

A similar detail to look out for is indentation in markdown. Indenting a section of code twice in markdown will render it as though it were code.

        This is an example of an indented piece of code.

While this is helpful, the way markdown is rendered will not render `html` elements or markdown styling in this indented section.

        For example, this will not render as **bold** despite the bold markdown styling
        <b>HTML</b> styling does not render either.

This sensitivity to new lines also applies when writing with `html` elements, which is usually written with indents. You can use indentation when writing `html`, but if you do, there cannot be an extra space between the `html` elements.

For example, this code

```
<ul>
    <li>This renders correctly because there is no extra space between the previous html element and the current one.</li>

<li>This will render correctly even though there is an extra space because there is no indent.</li>

    <li>This will not render correctly because there is an indent and an extra space between the previous html element and the current one.</li>

</ul>
```

will render as

<ul>
    <li>This renders correctly because there is no extra space between the previous html element and the current one.</li>

<li>This will render correctly even though there is an extra space because there is no indent.</li>
    
    <li>This will not render correctly because there is both an extra space between the previous html element and the current one and an indent.</li>

</ul>

To check that the markdown you have written will render correctly, you can render it through the `<zero-md>` element and open the `html` page with a local server.

#### Writing math equations in markdown

Math in markdown files that are written in LaTeX is rendered using [Mathjax](https://www.mathjax.org/). Inline math symbols are set apart with a set of $ and math equations that have their own line are set apart with a set of $$.

In order to render the math equations correctly, the `<zero-md>` elements must have the `no-shadow` attribute, and one `<zero-md>` element must have the `id="math"` attribute. The `id="math"` is used later to link each `<zero-md>` element with a Mathjax CDN with the following code.

```
<script>
    math.addEventListener('zero-md-rendered', () => {
      var el = document.createElement('script');
      el.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
      document.head.appendChild(el);
    });
</script>
```

This code adds the script to display LaTeX with Mathjax after the markdown has been translated to `html` through the `<zero-md>` element. Because the markdown file is first translated to `html` then converted with Mathjax, the way LaTeX is written in markdown differs slightly from the default.

The symbols `\,`, `\_`, and `\~` in LaTeX should be written as `\\,`, `\\_`, and `\\~` in the markdown file.

The single `\` in markdown will be removed when the code is translated to `html`, which will prevent Mathjax from rendering the styling correctly. This is the reason a double `\\` should be used. Markdown with `\\` is translated into `html` as `\`, which will then be properly rendered with Mathjax.

#### Notes on paths and links

##### Relative paths in markdown files

When the markdown file is rendered using the `<zero-md>` element, the element translates the file to `html`, which is read directly when viewing the `html` page. For this reason, the paths in the markdown files should be written relative to the `html` page, not relative to the markdown file.

Normally, the path to the `quickguide.html` file from the `template` markdown files, which are placed in multiple folders, would be "../../quickguide.html," for example.

However, because the file is rendered into an `html` page that will be next to the `quickguide.html` page, the path that the markdown file should use is "quickguide.html." This is because "quickguide.html" is the path relative to the `html` page into which the markdown will be translated.

To be able to view the correct paths in both the markdown files and the `html` files, a majority of links use a global, instead of a relative, path.

##### Referencing `id` attributes

Anchor links in markdown files can reference the following `id` attributes:

1. `id`s that are inside the same markdown file
2. `id`s that are in the `<span>` elements surrounding `<zero-md> elements` inside the same `html` file
3. `id`s that are in the `<span>` elements surrounding `<zero-md> elements` inside other `html` files
4. All `id`s that are referenced in the landing page

They cannot, however, reference `id`s that are inside other markdown files.

##### Images rendered with github pages

For simplicity in regards to file paths, a majority of images are referenced with their global path instead of a relative path. An example of this path is displayed below.

```
<img src="/documentation/quickguide/intro/images/sv-pipeline.png">
```

This path will render correctly in the following places:

1. The markdown file.
2. The `html` page when it is viewed on a local server
3. The `html` page when it is viewed on simvascular.github.io

However, it will not render properly if you view your fork of the website through github pages on your account. This is because the fork you have likely made is a Project site instead of a User or Organization site. The difference between the two is detailed [here](https://www.tracktownsoftware.com/jekyll/github/2020/12/22/GitHubPagesUserVsProjectSites.html). Choosing one or the other changes the root of the folder path.

To still be able to view images from your fork, you can do either of the two options below.

1. Rename your fork of simvascular.github.io to your_github_username.github.io to make your fork a User site instead of a Project site.

2. View your fork of the website from a local server instead of viewing it when it is deployed from your github account with github pages.

#### Other notes for writing markdown

Markdown is sensitive to spaces and new lines. Headers without a space after the last "#" will not render correctly.

For example, this code

```
#####This will not render as a header because there is no space.

##### This will render because there is a space
```

will render as

#####This will not render as a header because there is no space.

##### This will render because there is a space.

Markdown is also sensitive to new lines. Not having an extra space between two paragraphs will not render as a distinct paragraph.

For example, this code

```
This will be
in the same paragraph

This will be

in a different paragraph.
```

will render as

This will be
in the same paragraph.

This will be

in a different paragraph.

Notice in the example above that the extra space creates a distinct paragraph.

To check that the markdown you have written will render correctly, you can render it through the `<zero-md>` element and open the `html` page with a local server.

### Editing existing documentation

To edit existing documentation without creating new sections or `html` pages, you can go to the markdown file of the section that you want to edit and make your changes. While making changes, it can help to render the `html` page containing that markdown file on a local server to see how your changes render. If you aren't seeing your changes to the markdown files render, try refreshing the `html` page you are locally hosting.

Once your changes have been pushed, the website documentation will render with the update. Due to caching in browsers, you may not be able to see your changes immediately. To view them more quickly, you can clear your cache or view SimVascular website in incognito mode, which does not use cache.

### Adding new sections on the same `html` page

To add a new section of documentation in an existing page, first find folder that corresponds to the `html` file that renders the page you want to change. Create a new folder with the title of the section you want to add, create a markdown file named `readme.md`, and place the `readme.md` file in the folder that you created. Write your new documentation section in this `readme.md` file.

To add the markdown file you have written to the `html` page, find the `html` file that renders the page you want to change. First locate the section `<section class="docsSection">` which contain `<span>` elements with `<zero-md>` elements in them.

Add your own <span> element with a <zero-md> element in it. The `<span>` element should have a unique `id` that corresponds to the section you have added, and the `<zero-md>` element should have a `src` attribute that links to the path to your markdown file and a `no-shadow` attribute.

When choosing an `id` for the `<span>` elements, consider that it will be used as a class in the navigation section. Some classes like `class="intro"` and `class="container"` have styles applied to them in other contexts, so try to choose a unique name for the `id`.

<span id="title_of_your_section">
    <zero-md src="path_to_the_markdown_file" no-shadow></zero-md>
</span>

After updating the `docsSection` of the `html` page, go to the section `<section class="navigationSection">` in the same `html` page and add the section you have written to the navigation section that appears to the left of the documentation. Make sure that the sections organized in the navigation bar are in the order that they appear on the page.

If the section you have written is a category on its own, create a new `<div>` and use a `<h4>` element as exemplified below.

```
<div>
    <h4 class="skipTo title_of_your_section">Label</h4>
</div>
```

If the section you have written is a subcategory of a category, group it together under the `<div>` element after the `<h4>` element and label it with a `<p>` element as exemplified below.

```
<div>
    <h4 class="skipTo section_1">Section #1</h4>
    <div>
        <p class="skipTo title_of_your_section">Label</p>
    </div>
</div>
```

Whether or not the section you have added is a category or a subcategory, the `<h4>` or `<p>` element must have two classes. The first class must be `skipTo`, which applies styling to the navigation link and allows the link to work. The second class must be the `id` of the `<span>` element that you placed around the `<zero-md>` element rendering the markdown file with the section you added. This is exemplified above.

Once you have updated the `docsSection` and the `navigationSection`, you can render the updated documentation page in a local server to check how the markdown renders and that the navigation link works.

### Creating new documentation pages

Before creating the `html` page for the new user guide or clinical test case page, you may want to begin by writing some documentation in markdown files. To do so, first create a folder with the same name as the `html` page you want to create. In this folder, each markdown file you create will represent a section in the documentation page. For each new section and corresponding markdown file, create a new folder with a relevant name for that section and place a `readme.md` file inside that folder. Write your documentation for each section in these `readme.md` files.

If you want to create a new user guide page, find and copy the `template.html` page in the documentation folder. If you want to create a new clinical test case page, find and copy the `template.html` page in the clinical folder. These pages will have the foundational `html` necessary for the user guide or clinical case page. Rename this file to describe your new documentation page in accordance with the name of the folder you have created containing the markdown files.

Once you have created the markdown files you seek to render in `html`, there are three places in this `html` file to update in order to complete the page.

1. The navigation bar in the header
2. The navigationSection that appears on the left of the documentation page
3. The docsSection that contains the `<zero-md>` elements that will render the markdown files you have written into `html`.

#### Updating the navigation bar in the header

Find the section `<div class="navBarSection">` in the `template.html` page where there are `<div>` elements with the class `class="navSubLink"` as exemplified below:

```
<div class="navSubLink active">
    <a href="name_of_file.html">Name_of_new_page</a>
</div>
```

Copy the example element above and re-label `name_of_file` with the path to the new page you have created. Then, update `Name_of_new_page` with the name of the new page that you created.

The class `active` is present in the `<div>` element above because that will highlight the link to your page in the navigation bar when users are viewing your page to inform users which page they are viewing. No other `navSubLink` `<div>` element should have this `active` class except the one you are creating.

#### Changing the navigation section on the left

In the `temlate.html` page that you copied, in `<section class="navigationSection">`, there is a template structure for the navigation section. Every new category is placed in its own `<div>` section. Category titles are labeled with the `<h4>` element. Subcategories are grouped together under a `<div>` after the `<h4>` element and labeled with a `<p>` element.

The template of this structure is copied below.

```
<div>
    <h4 class="skipTo section_1">Section #1</h4>
    <div>
        <p class="skipTo section_1_sub_section_1">Sub section #1</p>
        <p class="skipTo section_1_sub_section_2">Sub section #2</p>
        <p class="skipTo section_1_sub_section_3">Sub section #3</p>
    </div>
</div>
```

Other navigation sections may have slightly varying structures. The organization can depend on how the page is laid out and what presentation makes the most sense.

Every element in the navigtion section has the same class structure, `class="skipTo id"`. The first class is always `skipTo`, which styles the label and allows the element to act as a navigation link. The second class is the `id` of the `<span>` element that surrounds the `<zero-md>` element. More information on these `<span>` elements, go to <a href="#changing-the-docssection-with-the-zero-md-elements">Changing the docsSection</a> section of this documentation.

When choosing an `id` for the `<span>` elements, consider that it will be used as a class in the navigation section. Some classes like `class="intro"` and `class="container"` have styles applied to them in other contexts, so try to choose a unique name for the `id`.

Once you have updated the navigationSection, you can render the `html` file you have created in a local server to check the functionality of the navigation links and how the section looks.

#### Changing the docsSection with the `<zero-md>` elements

In the `<section class="docsSection">`, the `template.html` page has a template structure that exemplifies how to set up the `<zero-md>` element to link markdown files to your `html` file. Every `<zero-md>` element is surrounded with a `<span>` element, which has an `id` attribute. This `id` should be referenced to skip to the section written in the markdown file that is linked to the `<zero-md>` element.

The first `<zero-md>` element must have the `id="math"` attribute, but the following <zero-md> elements should not have this. Having at least one `<zero-md>` element with the `id="math"` attribute will allow any mathematical equations written in LaTeX in the markdown files to be rendered correctly on the page using [Mathjax](https://www.mathjax.org/).

The example structure of this code is below.

```
<span id="section_1">
    <zero-md id="math" src="template/section_1/intro/readme.md" no-shadow></zero-md>
</span>
<span id="section_1_sub_section_1">
    <zero-md src="template/section_1/sub_section_1/readme.md" no-shadow></zero-md>
    </span>
```

To link a markdown file to the `<zero-md>` file, change the `src` attribute to the path of the markdown file you wish to link.

Every markdown file associated to this new `html` page should represent a section in the `html` file. This way, the navigation section can link to all of the separate markdown sections through the `id` attribute of the `<span>` element. Structure the `<zero-md>` elements in the order that you want the markdown files to be rendered on the page.

When choosing an `id` for the `<span>` elements, consider that it will be used as a class in the navigation section. Some classes like `class="intro"` and `class="container"` have styles applied to them in other contexts, so try to choose a unique name for the `id`.

After this page has been modified, check how it displays on a local server. A few key places to check are: the navigation bar in the header, the navigation section on the left of the page, and the body of the documentation. When viewing the rendered `html` page in a local server, you can use Ctrl F with "#" and "$" to check for errors rendering headers or math equations respectively.

Once you are happy with this page, you will need to update the navigation bar in the headers of all the user guide and clinical test case files to add the new page you have created. You will also need to update the landing page's [Documentation](https://simvascular.github.io/#documentation) section to include the new page of documentation you have created to that list of links.

#### Updating the navigation bar in page headers

When adding a new `html` page, its path should be added to the navigation bar in the headers of the other user guide and clinical test case `html` files. The navigation bar of the new `html` page should already be updated. Make sure to keep the order of the navigation links consistent throughout the website, and remember to also update the headers of the two `template.html` pages, as these too need to be up-to-date.

If you are adding a user guide page, add the navigation element under the `<summary>` element that has the label "User Guides." The element should resemble the following: a `<div>` element with the `class="navSubLink` and an updated `href` link for the `<a>` directing to the new page.

```
<div class="navSubLink">
    <a href="path_to_html_file.html">Page_Name</a>
</div>
```

If you are adding a clinical test case page, add the navigation element under the `<summary>` element that has the label "Clinical Cases." The element should resemble the following: a `<div>` element with the `class="navSubLink` and an updated `href` link for the `<a>` directing to the new page.

```
<div class="navSubLink">
    <a href="path_to_html_file.html">Page_Name</a>
</div>
```

Once you have updated the navigation bars in the headers of the user guide and clinical test case pages, render the website on a local version to check the navigation links to make sure that they work correctly and that the order in which the page links appear in the navigation section is consistent throughout the headers.

#### Updating the landing page documentation section

Unlike the user guide and clinical test case pages, the landing page of the SimVascular website is written purely in `html` and is not generated from markdown files. The landing `html` file is named `index.html`. You can find the documentation section of the landing page by searching for `id="documentation"`.

If you are adding the link to a new User Guide page, copy an anchor element from another link under the "User Guide" section. It may resemble the following `<a>` element with the following attributes: `class="docLinks"`, `target="_blank"`, and an `href` that has the path to the `html` file you have created. After the `<a>` element, add a `<br>` for styling consistency.

```
<a class="docLinks" target="_blank" href="documentation/name_of_html_file.html">Label</a><br>
```

If you are adding the link to a new clinical test case page, copy an anchor element from another link under the "Clinical Case Studies" section. It may resemble the following `<a>` element with the following attributes: `class="docLinks"`, `target="_blank"`, and an `href` that has the path to the `html` file you have created. After the `<a>` element, add a `<br>` for styling consistency.

```
<a class="docLinks" target="_blank" href="clinical/name_of_html_file.html">Label</a><br>
```

Try to keep the order of the pages in the Documentation section of the landing page the same as that in the navigation bar in the headers of the documentation pages for consistency. After updating the Documentation section, render `index.html` in a local server to check how it looks and if the link paths are correct.

## Updating the landing page

Thank you for updating SimVascular's landing page.

Unlike the user guide and clinical test case pages, the landing page is written purely in `html` and is not generated from markdown files. The JavaScript that adds functionality to the links and gallery in the landing page is read from `home.js`.

The landing page using styling from [Bootstrap](https://getbootstrap.com/), a library for responsive layout because we want the website to be as compatible with mobile devices as possible.

### Updating the Capabilities section

The capabilities section is styled with Bootstrap for compatability with mobile devices.

Every new section of capabilities has its own `<ul>` element, with the following classes `class="col-lg-6 col-12 p-5"`. In each `<ul>` element, the first `<li>` element is the header for that capability. This element has the class `class="capabilitiesHeader"`.

The `<li>` elements that follow have an icon element
`<i class="fa-sharp fa-solid fa-check"></i>`, which displays the checkmark icon, and text follows the `<i>` element to describe the sub-capability.

An example structure is as follows:

```
<ul class="col-lg-6 col-12 p-5">
    <li class="capabilitiesHeader">
        The header of the capability section
    </li>
    <li>
        <i class="fa-sharp fa-solid fa-check"></i>
        The label for the sub-capability
    </li>
    <!-- other <li> elements -->
</ul>
```

If you want to add sub-categories under the sub-capability, you can add the class `<li class="indented">` to the `<li>` element.

An example structure is as follows:

```
<li>
    <i class="fa-sharp fa-solid fa-check"></i>
    The label for the sub-capability
</li>
<li class="indented">
    <i class="fa-sharp fa-solid fa-check"></i>
    The label for the sub-sub-capability
</li>
```

After updating the Capabilities section, render `index.html` in a local server to check how it looks and if the presentation is how you intended.

### Updating the Applications section

The applications section is styled with Bootstrap for compatability with mobile devices.

Every section for a new application is set up the same way. There is a `<div>` with the following classes `class="col-lg-4 col-md-6 col-12"`. Inside that `<div>`, there is an `<div class="applicationsHeader">` element, followed by a `<h2>` element with the name of the SimVascular application.

After the `<div class="applicationsHeader">`, there is an `<div class="applicationsText">` element, which is followed by a `<p>` element that contains the text describing the SimVacular application.

An example structure is as follows:

```
<div class="col-lg-4 col-md-6 col-12">
    <div class="applicationsHeader">
        <h2>SimVascular</h2>
    </div>
    <div class="applicationsText">
        <p> An interactive application for implementing all components
        of the image-based pipeline</p>
    </div>
</div>
```

To update the content under an application, change the text inside the `<p>` element.

To create a new section for a new application, copy the entire `<div>` as encoded above, and modify the `<h2>` element text content and the `<p>` element text content.

To create a new row of application, add a new `<div>` element with the following classes `<div class="row justify-content-center">`. The `<div class="col-lg-4 col-md-6 col-12">` will be placed inside the `<div class="row justify-content-center">`. For information on the column and row classes in these `<div>` elements, visit [Bootstrap's documentation on rows and columns](https://getbootstrap.com/docs/5.3/layout/columns).

After updating the Applications section, you can render `index.html` in a local server to check how it looks and if the presentation is how you intended.

### Adding pictures to the Gallery section

The JavaScript behind the gallery section can be found in `home.js`, but this does not need to updated to add a picture to the Gallery section.

To add pictures, there are two elements to add: the picture element and the element for the dots displayed under the gallery images.

The structure of each gallery image is as follows. The image and caption are surrounded by a `<div>` with the classes `class="slides picSlides"`. Inside that `<div>`, there is an `<img>` with a `src` that links to the image, which should be placed with the other gallery images in the `img/gallery/` folder. There is also style applied to the image specifying `style="width:100%"`. After the image in the `<div>` is another `<div>` with the class `class="caption"`, and the text content in that `<div>` should describe the image.

An example of this structure is shown below. To add a new picture, first add this slide in the order you want it to appear in the carousel inside the `<div class="slideshow-container">`.

```
<div class="slides picSlides">
    <img src="pathToImage" style="width:100%">
    <div class="caption">Caption_for_your_image</div>
</div>
```

After adding the new pictures, update the number of dots under the carousel by copying the `<span class="dots picDots" onclick="currentPicSlide(#)"></span>` element and changing the number inside currentPicSlide(#) to the next integer. Place this new `<span class="dots picDots">` element alongside the other `<span class="dots picDots">` elements.

After doing so, make sure that the number of `<span>` elements matches the number of pictures in the gallery, and that the numbers in currentPicSlide(#) are in ascending order.

For example, if there are three pictures, the dots `html` section should resemble

```
<div class="dotsContainer">
    <div style="margin:auto; width: fit-content;">
        <span class="dots picDots" onclick="currentPicSlide(0)"></span>
        <span class="dots picDots" onclick="currentPicSlide(1)"></span>
        <span class="dots picDots" onclick="currentPicSlide(2)"></span>
    </div>
</div>
```

To update pictures in the gallery, change the `src` path in the `<img>` element, and update the caption to an updated description for the new picture.

After updating the Gallery section, you can render `index.html` in a local server to test scrolling through the gallery and check that the presentation is as you intended.

### Updating the Recent News section

To update information in the Recent News section, update the following six places when applicable:

1. The relevant icon for the news type (ex: a calendar icon)
2. The description of the news type (ex: "Event")
3. The date the news takes place (ex: MAY 3 - 5, 2023)
4. The name of the news (ex: Workshop at the CMBBE symposium)
5. A relevant link for more information on the annoucement (ex: https://www.cmbbe-symposium.com/2023/workshops/)
6. The place the news takes place (ex: Takes place in Paris, France)

Each news panel is set up the same way. A `<div>` with the class `class="newNews"` contains the `html` elements containing the information on the recent news announcement. To update an existing news panel, you can simply change the text content inside the `<div class="newNews">` in the relevant places. To add a new panel, you can duplicate another Recent news announcement and update the text content in the relevant places.

Inside the `<div class="newNews">`, there is a `<div>` with the class `class="row"`, which creates a row with [Bootstrap](https://getbootstrap.com/docs/5.3/layout/columns) that contains the news label on the left and the news date on the right.

In the `<div class="row">`, there is a `<div class="col-sm-6 col-12 news_label">`, which contains the label of what type of news is being displayed. The label has two parts: a relevant icon and text for the label. The icons used in this website come from [fontawesome](https://fontawesome.com/search?o=r&m=free).

For example, to label the news as an "Event," a calendar icon from fontawesome is used and the label text content is "Event." The `html` code for this would resemble the following.

```
<div class="col-sm-6 col-12 news_label">
    <i class="iconInHeader fa-regular fa-calendar"></i>
    Event
</div>
```

Additionally in the `<div class="row">`, there is the `<div>` for the date, which has the classes `<div class="col-sm-6 col-12 news_date">`. Inside this `<div>`, there is a `<p>` element, with the date of when the event will take place.

The `html` code for this would resemble the following.

```
<div class="col-sm-6 col-12 news_date">
    <p>Month Start_Date - End_Date, YEAR</p>
</div>
```

The following is an example of this code.

```
<div class="col-sm-6 col-12 news_date">
    <p>MAY 3 - 5, 2023</p>
</div>
```

Try to keep the formatting of the date consistent with the other news announcements.

After the `<div class="row">`, there is a `<div>` with the class `class="news_name"`. This `<div>` is for the name of the news. Inside the `<div>`, there is an anchor `<a>` element with a `href` link to a relevant website regarding more information on the news and the attribute `target="_blank"` so that the link opens in a new tab. The text content of the `<a>` element would be the name of the news.

For example, for a workshop, the code for this section would resemble

```
<div class="news_name">
    <a target="_blank" href="https://www.cmbbe-symposium.com/2023/workshops/">
        Workshop at the CMBBE symposium
    </a>
</div>
```

After the `<div class="news_name">`, there is a `<div>` with the class `<div class="news_place">`, which describes where the news takes place.

For example, if a workshop took place in Paris, France, the code for this section would resemble

```
<div class="news_place">
    Takes place in Paris, France
</div>
```

Try to keep the formatting for the locations consistent with the other news announcements.

All put together, an example of a new news announcement would resemble the following.

```
<div class="newNews">
    <div class="row">
        <div class="col-sm-6 col-12 news_label">
            <i class="iconInHeader fa-regular fa-calendar"></i>
            Event
        </div>
        <div class="col-sm-6 col-12 news_date">
            <p>MAY 3 - 5, 2023</p>
        </div>
    </div>
    <div class="news_name">
        <a target="_blank" href="https://www.cmbbe-symposium.com/2023/workshops/">
            Workshop at the CMBBE symposium
        </a>
    </div>
    <div class="news_place">
        Takes place in Paris, France
    </div>
</div>
```

After updating the Recent News section, you can render `index.html` in a local server to check how it looks and if the presentation is how you intended.

### Updating the Team section

To add a new profile in the Team section, copy the template code below and change the code in the following places.

```
<div class="col-md-4 col-6">
    <div class="team-item">
    <div class="team-triangle">
        <a href="path_link" target="_blank">
        <div class="team-content">
            <img src="image_source" alt="alt_of_image">
            <div class="team-hover text-center"  style="cursor:pointer">
                <p style="font-size: 17px;">name_of_person</p>
            </div>
        </div>
        </a>
    </div>
    </div>
</div>
```

1. Replace `path_link` with a relevant link that would give the user more information on the person. This could be a link to an institutional profile page or a LinkedIn profile.

2. Replace `image_source` with the path to an image of the person. The dimensions of this image must be a perfect square, so that the profile icon is circular. Images for these sections would be placed in the `img/team/` folder.

3. Replace `alt_of_image` with a description of what the image is showing. This alternate description will only show if the website cannot access the image.

4. Replace `name_of_person` with the first and last name of the person you want to add.

Place your modified code alongside the other `<div class="col-md-4 col-6">` elements in the order that you wish for the team member to appear in.

After updating the Team section, you can render `index.html` in a local server to check if the presentation is how you intended and that the profile links are functional.

### Updating the Institutions or Acknowledgements section

To add an institution or acknowledgement, find the Institutions or Acknowledgements section by searching for `id="institutions"` and `id="acknowledgements"` respectively. Copy the code below and change it in the following places:

```
<div class="col-sm-6 col-12 creditContainer">
    <img class="creditImage" src="image_source" alt="alt_of_image"></img>
</div>
```

1. Replace `image_source` with the path to the image of the logo of the institution or acknowledgement. These images should be placed in the `img/institutions/` folder.

2. Replace `alt_of_image` with a description of what the image is showing. This alternate description will only show if the website cannot access the image.

Place your modified code alongside the other `<div class="col-sm-6 col-12 creditContainer">` elements in the order that you wish for institution or acknowledgement to appear in. These elements should all be placed inside the `<div class="row creditsRow">`.

After updating the Institutions or Acknowledgements section, you can render `index.html` in a local server to check if the presentation is how you intended.

### Adding new sections

Each section is set up the same way. A `<div>` element with the class `class="section"` or `class="everyOtherSection"` surrounds the elements that define the content for the new section.

The landing page has a color scheme in which every other section has the `background-color: var(--lightbluegrey)`. This is implemented by alternating between applying the class `<div class="section"> `and `<div class="everyOtherSection">` to the landing page sections. When adding a new section, make sure to maintain the alternating pattern in every section to keep the landing page consistent.

Inside that `<div>` element, there is a `<div class="newSectionHeader">` with an `<h1>` element in it. The `<h1>` element has an `id` that the navigation bar in the header of the landing page uses to skip to that section of the page.

After `<div class="newSectionHeader">`, there is a `<div class="newSectionContent">` which is the `<div>` element that contains the content of the section. In this `<div>`, you can add what you wanted in your new section.

This structure resembles the following

```
<div class="section">
    <div class="newSectionHeader">
        <h1 id="section_id">Title of Section</h1>
    </div>
    <div class="newSectionContent">
        <!-- The content of the section -->
    </div>
</div>
```

Once you have created the new section in `index.html`, update the navigation bar in the header. To do so, find the `<div id="navigationSection">`. To add a new navigation link, copy the following code:

```
 <tr class="skipTo section_id">
    <th>
        <p class="skipItem">Title of Section</p>
    </th>
</tr>
```

The navigation bar in the landing page is made using a `<table>` element.

The `<tr>` element represents a new row in table. The `<tr>` element must have two classes. The first class must be `skipTo`, which styles the row and adds functionality to the navigation link. The second class must be the `id` attribute of the `<h1>` header of your new section. The `<p>` element must have the class `class="skipItem"`, which styles the navigation link.

After adding a new section, you can render `index.html` in a local server to check if the navigation bar link works and if the section displays as you intended.
