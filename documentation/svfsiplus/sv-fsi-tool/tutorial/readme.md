<hr class="rounded">

<h2 id="sv_fsi_tool_tutorial"> SimVascular FSI Tool Tutorial </h2>
The SimVascular <a href="https://simtk.org/frs/?group_id=930"> Cylinder Project Example</a> will be used 
for the model and mesh data referenced in the discussion.

The <strong>cylinder</strong> model has three faces (boundary surfaces)
<ul>
<li> <strong>wall</strong> - the cylinder wall surface </li>
<li> <strong>outlet</strong> - the cylinder outlet surface </li>
<li> <strong>inlet</strong> - the cylinder inlet surface </li>
</ul>

<figure>
<img class="svImg svImgSm" src="/documentation/svfsiplus/sv-fsi-tool/images/sv-cylinder-project.png">
<figcaption class="svCaption"> The SimVascular Cylinder Project. The <strong>SV Modeling Tool</strong> 
panel displayed to the right of the graphics window shows the model <strong>Face List</strong>.</figcaption>
</figure>

<!-- --------------------------------------------------- -->
<!-- --------------- Creating Mesh Files --------------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_mesh"> Creating Mesh Files </h3> 
The <strong>SV FSI Tool</strong> requires files containing the finite element volume mesh (VTK VTU) and 
boundary surface meshes (VTK VTP). These files are created by by right-clicking on the 
<strong>Meshes/cylinder</strong> node under the SV Data Manager. Selecting the <strong>Export Mesh Complete</strong> 
menu item displays a file browser used to select to location to store the location for the finite element files.

<br><br>
<figure>
<img class="svImg svImgSm" src="/documentation/svfsiplus/sv-fsi-tool/images/create-mesh-complete.png">
<figcaption class="svCaption"> Creating <strong>mesh-complete</strong> files.
</figcaption>
</figure>

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

<!-- --------------------------------------------------- -->
<!-- ---------- Creating an FSI Tool Instance ---------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_create_instance"> Creating an FSI Tool Instance </h3> 
A <strong>SV FSI Tool</strong> instance is created by right-clicking on the <strong>svFSI</strong> node 
under the SV Data Manager. Selecting the <strong>Create svFSI job</strong> menu item displays a popup window.

<figure>
<img class="svImg svImgSm" src="/documentation/svfsiplus/sv-fsi-tool/images/create-job-popup.png">
<figcaption class="svCaption"> The <strong>Create svFSI Simulation Job </strong> popup menu.  
</figcaption>
</figure>

Type <strong>fluid_simulation</strong> into the <strong>job Name</strong> <i>DialogBox</i>. This names is used 
to identify the <strong>SV FSI Tool</strong> instance and to name the files and directories stored under the 
SimVascular project's svFSI directory. Selecting OK creates an <strong>SV FSI Tool</strong> instance node under 
the SV Data Manager. Selecting this instance displays the <strong>SV FSI Tool</strong> panel.

<figure>
<img class="svImg svImgSm" src="/documentation/svfsiplus/sv-fsi-tool/images/sv-fsi-tool.png">
<figcaption class="svCaption"> The <strong>SV FSI Tool</strong> panel displayed to the right of the graphics window.  
</figcaption>
</figure>

The panel contains four sub-panels used to input a specific category of data needed to create the files
needed to run a svFSIplus solver simulation
<ul>
<li> Domains </li>
<li> Physics </li>
<li> Simulation Parameters </li>
<li> Run Simulation </li>
</ul>

A selecting a sub-panel name brings up the sub-panel's widgets. The following sections describe how each of the 
sub-panels are used.

<!-- --------------------------------------------------- -->
<!-- ---------------- Domains Panel -------------------- -->
<!-- --------------------------------------------------- -->

<h3 id="sv_fsi_tool_domains"> Domains Panel </h2>. A <strong>SV FSI Tool</strong> 

