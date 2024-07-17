<hr class="rounded">

<h2 id="sv_fsi_tool_tutorial"> SimVascular FSI Tool Tutorial </h2>
The SimVascular <a href="https://simtk.org/frs/?group_id=930"> Cylinder Project Example</a> will be used 
for the model and mesh data referenced in the following discussion.
<br>

<h3 id="sv_fsi_tool_tutorial_read_project"> Open the CylinderProject </h3>
<table class="table table-bordered" style="width:100%">
  <tr>
    <th> SimVascular </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/cylinder-project.png" width="597" height="412"> </td>
    <td> 
     Start the SimVascular application, read in the CylinderProject project and set the graphics view to a single 3D view. 
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/model-panel.png" width="597" height="412"> </td>
    <td> Select the <i>Data Manager Models</i> <strong>cylinder</strong> <i>Data Node</i> to bring up the
         <strong>SV Modeling</strong> panel.<br><br>
         The <strong>Face List</strong> GUI control panel shows that
         the <strong>cylinder</strong> model has three faces (boundary surfaces) named
         <ul>
         <li> <strong>wall</strong> - cylinder wall surface </li>
         <li> <strong>outlet</strong> - cylinder outlet surface </li>
         <li> <strong>inlet</strong> - cylinder inlet surface </li>
         </ul>
    </td>
  </tr>
</table>

<!-- --------------------------------------------------- -->
<!-- --------------- Creating Mesh Files --------------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_mesh"> Creating Mesh Files </h3> 
The finite element mesh has already been created for this example project. The <strong>SV FSI Tool</strong> 
requires files containing the finite element volume mesh (VTK VTU) and separate (VTK VTP) files containing the boundary surface meshes. 

The following steps demonstrate how to create a directory containing these finite element mesh files. 

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> SimVascular </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/mesh-load.png" width="597" height="412"> </td>
    <td>
     SimVascular does not automatically load finite element mesh data so we will use the GUI to manually load it.
     <br><br>Right-click on the <strong>Meshes/cylinder</strong> <i>Data Node</i> under the 
     <strong>SV Data Manager</strong> and select the <strong>Load/Unload Volume Mesh</strong> menu item. 
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/mesh-vis.png" width="597" height="412"> </td>
    <td>
     The mesh is displayed in the 3D graphics window.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/mesh-export.png" width="597" height="412"> </td>
    <td>
     Right-click on the <strong>Meshes/cylinder</strong> <i>Data Node</i> under the <i>SV Data Manager</i> and select the 
     <strong>Export Mesh Complete</strong> menu item.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/mesh-export-file-browser.png" width="597" height="412"> </td>
    <td>
     A file browser is displayed and used to select to location to store the finite element files.

This creates a <strong>cylinder-mesh-complete</strong> directory containing the finite element mesh files
<pre>
cylinder-mesh-complete
├── mesh-complete.exterior.vtp
├── mesh-complete.mesh.vtu
├── mesh-surfaces
│   ├── inflow.vtp
│   ├── outlet.vtp
│   └── wall.vtp
└── walls_combined.vtp
</pre> 

where 
<ul style="list-style-type:disc;">
  <li> mesh-complete.mesh.vtu - volume mesh </li>
  <li> mesh-surfaces/inflow.vtp - boundary mesh for the <strong>inflow</strong> model face</li>
  <li> mesh-surfaces/outflow.vtp - boundary mesh for the <strong>outflow</strong> model face</li>
  <li> mesh-surfaces/wall.vtp - boundary mesh for the <strong>wall</strong> model face</li>
</ul>

These files will be used to define the finite element mesh for the FSI simulation.
    </td>
  </tr>
</table>


<!-- --------------------------------------------------- -->
<!-- ---------- Creating an FSI Tool Instance ---------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_create_instance"> Creating an FSI Tool Instance </h3> 
The SimVascular <strong>SV FSI Tool</strong> comprises the GUI controls used to create the files needed to
run a simulation. 

The following steps demonstrate how to create an instance of an <strong>SV FSI Tool</strong>.
<br>

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> SimVascular </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/create-select-icon.png" width="597" height="412"> </td>
    <td>
    Click on the <strong>FSI Icon</strong> <img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/fsi-icon.png"width="5%" height="5%">
    located on the SimVascular window <i>Toolbar</i>.
    <br>This displays an <strong>SV FSI Tool</strong> panel.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/create-fsi-popup.png" width="597" height="412"> </td>
    <td>
    From the <strong>SV FSI Tool</strong> panel select the <strong>New Job</strong> <i>Button</i>. A popup <i>DialogBox</i> is displayed.<br><br>
    Type <strong>fluid_simulation</strong> into the <strong>job Name</strong> <i>DialogBox</i>. Select the
    <strong>OK</strong> <i>Button</i>.<br><br>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/create-fsi-new-node.png" width="597" height="412"> </td>
    <td>
    A new <strong>SV FSI Tool</strong> instance <i>Data Node</i> named <strong>fluid_simulation</strong> is created under the <i>SV Data Manager</i>. 
    <br> <br>
    The <strong>fluid_simulation</strong> name is used to identify the <strong>SV FSI Tool</strong> instance and to name the files and directories stored under the SimVascular CylinderProject's svFSI directory. 
    </td>
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/fsi-panel.png" width="597" height="412"> </td>
    <td>
    Double-clicking on the <strong>SV FSI Tool</strong> <strong>fluid_simulation</strong> <i>Data Node</i> brings
    up its <strong>SV FSI</strong> panel containing its GUI controls. 
    <br><br>
    The panel contains four sub-panels used to input a specific category of data needed to create the files
    needed to run a svFSIplus solver simulation
    <ul>
    <li> Domains </li>
    <li> Physics </li>
    <li> Simulation Parameters </li>
    <li> Run Simulation </li>
    </ul>
    <br>
    Selecting a sub-panel name brings up the sub-panel's controls. 
    </td>
  </tr>
</table>

The following sections demonstrate how to use each of these sub-panels.


<!-- --------------------------------------------------- -->
<!-- ---------------- Domains Panel -------------------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_domains"> Domains Panel </h2> 
The <strong>Domains</strong> panel is used to assign a finite element mesh to a physical domain used in the simulation.

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> SimVascular </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/domain-panel-add-mesh.png" width="597" height="412"> </td>
    <td>
    Click on the <strong>Add Mesh-Complete</strong> <i>Button</i>.  
    <br>
    A file browser is displayed used to select to location of the finite element files directory.
    <br><br>
    Select the directory created above and then select the <strong>Open</strong> <i>Button</i>. 
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/domain-panel-faces.png" width="597" height="412"> </td>
    <td>
    The boundary surfaces (faces) <strong>inflow</strong>, <strong>outlet</strong> and <strong>wall</strong> are displayed in the <strong>Face List:</strong> <i>Table</i>. These names are taken from the names of the VTK VTP files store in the <strong>cylinder-mesh-complete/mesh-surfaces</strong> directory.
    <br>
    </td>
  </tr>

</table>

<!-- --------------------------------------------------- -->
<!-- ---------------- Physics Panel -------------------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_tutorial_physics"> Adding a Fluids Equation</h2> 
For this tutorial we are solving a fluid problem with inflow and resistance boundary conditions.

The following steps demonstrate how use the <strong>Physics</strong> panel to set the equation to solve,
its properties and boundary conditions.

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> SimVascular </th>
    <th> Description </th>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/physics-panel.png" width="597" height="412"> </td>
    <td>
    Click on the <strong>Physics</strong> <i>Tab</i>.
    <br> <br> 
    This brings up the <strong>Physics Sub-panel.</strong>
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/fluids-select.png" width="597" height="412"> </td>
    <td>
    Select the <strong>Incomp. fluid</strong> item from the <strong>Add or remove equations</strong> left <i>List</i>.
    <br> <br> 
    Next select the <img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/add-equation-button.png" width="5%" height="5%"> <i>Button</i> to add an <strong>incompressible fluids equation</strong> to the simulation. 
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/fluids-add.png" width="597" height="412"> </td>
    <td>
    The <strong>Incomp. fluid</strong> item has been moved from the <strong>Add or remove equations</strong> left <i>List</i> to the right <i>List</i> and the equation has been added to the simulation.
    <br> <br> 
    The <strong>Properties</strong>, <strong>Outpu</strong>t <strong>BCs</strong>, <strong>Advanced</strong>,
    <strong>Linear Solver</strong> and <strong>Remesher</strong> <i>Buttons</i> at the bottom of the 
    <strong>Add or remove equations</strong> lists set applicable to the currently selected equation in the right <i>List</i>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/svfsiplus/sv-fsi-tool/tutorial/images/fluid-props.png" width="597" height="412"> </td>
    <td>
    Selecting the <strong>Properties</strong> <i>Button</i> brings up a <strong>Physical properties</strong> panel
    that is used to set the values if the fluid's physical properties used in the simulation.
    </td>
  </tr>


</table>

