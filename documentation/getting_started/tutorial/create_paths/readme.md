<h2 id="tutorial_create_paths"> Create Vessel Paths </h2>

Creating an anatomic model based on medical image data requires constructing the geometry of a region of interest
using image segmentation. SimVascular uses approximate vessel centerlines called <i>Paths</i> to identify
anatomical regions of interest within an image volume. <i>Paths</i> are later used by the <i>Segmentations</i> <i>Tool</i>
to construct a model of the vascular anatomy using a series of segmentations generated from 2D image cross-sections.

The following sections demonstrate how to create a path defining the abdominal aorta and right iliac artery and another path
for the left iliac artery. A detailed discussion about creating paths can be found in the SimVascular
<a href="modeling.html#modelingPathPlanning">Modeling Guide / Path Planning</a> documentation.

<h3 id="tutorial_create_paths_1"> Create an instance of a <i>Paths Tool</i> for the aorta/right iliac artery</h3>
Create an instance of a <i>Paths Tool</i> named <b>aorta</b>, used to define <i>Path</i> geometry for the abdominal aorta
and right iliac artery.

<table class="table table-bordered" style="width:100%">
  <caption> Create a <i>Paths Tool</i> instance named <b>aorta</b> </caption>
  <tr>
    <th> GUI </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-1.png" width="512" height="360"> </td>
    <td> Right-click the <i>Paths</i> <i>Tool</i> in the <i>Data Manager</i>. <br><br>
         Select the <b>Create Path</b> menu option.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-2.png" width="512" height="360">
    </td>
    <td> A <b>Create New Path</b> <i>DialogBox</i> appears. <br><br>
         Enter <b>aorta</b> for the <i>Path</i> name in the <b>Path Name:</b> <i>TextBox</i>. <br><br>
         From the <b>Subdivision type</b> <i>ComboBox</i>, select <b>Spacing Based</b>. <br><br>
         An <i>Information Popup</i> appears; press the <b>OK</b> <i>Button</i>. <br><br>
         Press the <b>Create New Path</b> <i>DialogBox</i> <b>OK</b> <i>Button</i>.
    </td>
  </tr>

  <tr>
    <td> <img src="/documentation/getting_started/tutorial/images/create-path-3.png" width="512" height="360">
    </td>
    <td> A <i>Data Node</i> named <b>aorta</b> (an instance of a <i>Paths</i> <i>Tool</i>) is created under the
         <i>Data Manager</i> <i>Paths</i> <i>Tool Type</i>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-4.png" width="512" height="360"> </td>
    <td> Double-click the <i>Data Manager</i> <b>Paths / aorta</b> <i>Data Node</i> with the left mouse button to bring
         up the <i>SV Path Planning Panel</i>. <br><br>
         Placing the mouse cursor over each GUI control in the <i>SV Path Planning Panel</i> displays a brief description
         explaining what the control does.<br><br>
         Some GUI controls: <br><br>
         <ul style="list-style-type:none;">
             <li> <img src="/documentation/getting_started/tutorial/images/path-add-button.png" width="62" height="15"> - Add a <i>Path</i> point 
                  at the current crosshairs location. <br><br>
             </li>
             <li> <img src="/documentation/getting_started/tutorial/images/path-del-button.png" width="62" height="15"> - Delete the currently 
                  selected <i>Path</i> point.
             </li>
         </ul>
    </td>
  </tr>

</table>

<br>
<h3 id="tutorial_create_paths_2"> Create the aorta/right iliac <i>Path</i> </h3>

This section demonstrates how to create a set of points representing a <i>Path</i> from the proximal descending aorta to the
end of the right iliac artery. Path points are added interactively by positioning crosshairs in the three 2D
views to select the approximate center of a vessel lumen.

The crosshairs are moved using the left mouse button or the <a href="#gui_image_navigator"><i>Image Navigator</i></a>.

<table class="table table-bordered" style="width:100%">
  <caption> Add <i>Path</i> points using the <b>aorta</b> <i>Paths Tool</i> </caption>
  <tr>
    <th> GUI </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-5.png" width="512" height="360"> </td>
    <td> Using the left mouse button, move the crosshairs in the <i>Sagittal 2D View</i> to the top of the aorta. <br><br>
         Press the <b>Add</b> <i>Button</i> in the <i>SV Path Planning Panel</i>. <br><br>
         The selected <i>Path</i> point is shown as a red marker in the 2D views and as a blue cube in the 3D view.<br><br>
         The coordinates of the point are shown in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>. 
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-6.png" width="512" height="360"> </td>
    <td> Select the <i>Data Manager</i> <b>Paths / aorta</b> <i>Data Node</i> with the right mouse button to display
         the <i>Data Node</i> menu. <br><br>
         The menu options specialized for <i>Path Tool</i> <i>Data Nodes</i> are: <br><br>
         <ul style="list-style-type:none;">
           <li> <b>Point 2D Size</b> - Set the size in image units of the 2D markers used to show <i>Path</i> points in 2D views <br><br>
           <li> <b>Point 3D Size</b> - Set the size in image units of the 3D markers used to show <i>Path</i> points in the 3D view <br><br>
         </ul>
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-7.png" width="512" height="360"></td>
    <td> 
         Create several more <i>Path</i> points using the left mouse button to move the crosshairs in the 2D views and 
         pressing the <b>Add</b>  <i>Button</i>. <br><br>
         The coordinates of the <i>Path</i> points are shown in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>. <br><br>
         Switch the view to a single 3D view. <br><br>
         The <i>Path</i> points are shown as blue cubes. Hovering the mouse cursor over a <i>Path</i> point highlights it in that view
         and in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>. <br><br>
         Press the <img src="/documentation/getting_started/gui/images/gui-save-icon.png" width="20" height="17"> icon in the
         <i>ToolBar</i> to save the <i>Project</i>.
    </td>

  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-8.png" width="512" height="360"> </td>
    <td> 
         Selecting a <i>Path</i> point from the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>
         positions the three 2D views so that they intersect at approximately that point.
         <br><br>
         New <i>Path</i> points may be inserted at any location along the path. 
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_paths_3"> Create an instance of a <i>Paths Tool</i> for the left iliac artery</h3>

Create an instance of a <i>Paths Tool</i> named <b>left-iliac</b>, used to define <i>Path</i> geometry from the
aortic bifurcation to the end of the left iliac artery.

<table class="table table-bordered" style="width:100%">
  <caption> Create a <i>Paths Tool</i> instance named <b>left-iliac</b> </caption>
  <tr>
    <th> GUI </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-9.png" width="512" height="360"> </td>
    <td> Right-click the <i>Paths</i> <i>Tool</i> in the <i>Data Manager</i>. <br><br>
         Select the <b>Create Path</b> menu option.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-10.png" width="512" height="360">
    </td>
    <td> A <b>Create New Path</b> <i>DialogBox</i> appears. <br><br>
         Enter <b>left-iliac</b> for the <i>Path</i> name in the <b>Path Name:</b> <i>TextBox</i>. <br><br>
         From the <b>Subdivision type</b> <i>ComboBox</i>, select <b>Spacing Based</b>. <br><br>
         An <i>Information Popup</i> appears; press the <b>OK</b> <i>Button</i>. <br><br>
         Press the <b>Create New Path</b> <i>DialogBox</i> <b>OK</b> <i>Button</i>.
    </td>
  </tr>

  <tr>
    <td> <img src="/documentation/getting_started/tutorial/images/create-path-11.png" width="512" height="360">
    </td>
    <td> A <i>Data Node</i> named <b>left-iliac</b> (an instance of a <i>Paths</i> <i>Tool</i>) is created under the
         <i>Data Manager</i> <i>Paths</i> <i>Tool Type</i>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-12.png" width="512" height="360"> </td>
    <td> Double-click the <i>Data Manager</i> <b>Paths / left-iliac</b> <i>Data Node</i> with the left mouse button to bring
         up the <i>SV Path Planning Panel</i>. <br><br>
         Placing the mouse cursor over each GUI control in the <i>SV Path Planning Panel</i> displays a brief description
         explaining what the control does.
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_paths_4"> Create the left iliac <i>Path</i> </h3>

This section demonstrates how to create a set of points representing a <i>Path</i> from the aortic bifurcation
to the end of the left iliac artery. Path points are added interactively by positioning crosshairs in the three 2D views to
select the approximate center of a vessel lumen.

The crosshairs are moved using the left mouse button.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
It is important to place the first <i>Path</i> point for the left iliac <i>Path</i> such that the proximal end of the path runs
through the aorta. This is needed to produce an accurate image-based geometric model near the aortic bifurcation
when the left iliac artery is joined with the aorta.
</div>
<br>

<table class="table table-bordered" style="width:100%">
  <caption> Add <i>Path</i> points using the <b>left-iliac</b> <i>Paths Tool</i> </caption>
  <tr>
    <th> GUI </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-13.png" width="512" height="360"> </td>
    <td> Using the left mouse button, move the crosshairs to a point inside the aorta near its bifurcation into the left 
         and right iliac arteries. <br><br> 
         Press the <b>Add</b> <i>Button</i> in the <i>SV Path Planning Panel</i>. <br><br>
         The coordinates of the point are shown in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-path-14.png" width="512" height="360"> </td>
    <td> Create several more <i>Path</i> points using the left mouse button to move the crosshairs in the 2D views and
         pressing the <b>Add</b> <i>Button</i>. <br><br>
         The coordinates of the <i>Path</i> points are shown in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>. <br><br>
         Switch the view to a single 3D view. <br><br>
         The <i>Path</i> points are shown as blue cubes. Hovering the mouse cursor over a <i>Path</i> point highlights it in that view
         and in the <i>SV Path Planning Panel</i> <b>Control Point List</b> <i>Table</i>. <br><br>
         Press the <img src="/documentation/getting_started/gui/images/gui-save-icon.png" width="20" height="17"> icon in the
         <i>ToolBar</i> to save the <i>Project</i>.
    </td>

  </tr>
</table>
