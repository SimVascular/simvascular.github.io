<br>
<hr class="rounded">

<h1 id="sv_multiphysics_tool" style="text-align:center;"> SimVascular MultiPhysics Tool </h1>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The SimVascular MultiPhysics Tool does not yet support writing svMultiPhysics solver XML files.
</div>

The SimVascular <strong>SV MultiPhysics Tool</strong> is used to interactively create the mesh and solver XML input files
needed to run an svMultiPhysics simulation.

The <strong>MultiPhysics Tool</strong> stores data in the <i>Project</i>/svMultiPhysics/<i>Data Node</i> directory.
The <strong>MultiPhysics Tool</strong> stores values input via the GUI controls into the 
<i>Project</i>MultiPhysics/<i>Data Node</i>.multiphysicsjob file.

The following sections describe how to use the SimVascular <strong>MultiPhysics Tool</strong> GUI to set the
mesh, boundary conditions, material properties and solver parameters needed for a simulation.

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
See the <a href="#introduction"> Getting Started / Introduction </a> documentation for a description of the
SimVascular graphical user interface (GUI) controls and useful application <i>Tools</i> concepts.
</div>

<!--- --------------------------------------------------- --->
<!--- --------------- Creating Mesh Files --------------- --->
<!--- --------------------------------------------------- --->

<h2 id="sv_multiphysics_tool_mesh"> Creating Mesh Files </h2> 
The <strong>MultiPhysics Tool</strong> requires files containing the finite element volume mesh (VTK VTU) and 
boundary surface meshes (VTK VTP). These files are created by by right-clicking on the 
<strong>Meshes</strong> node under the SV Data Manager. Selecting the <strong>Export Mesh Complete</strong> 
menu item displays a file browser used to select to location to store the location for the finite element files.

<!--- ------------------------------------------------------------ --->
<!--- ---------- Creating an MultiPhysics Tool Instance ---------- --->
<!--- ------------------------------------------------------------ --->

<h2 id="sv_multiphysics_tool_create_instance"> Creating an MultiPhysics Tool Instance </h2> 
A <strong>MultiPhysics Tool</strong> instance is created by right-clicking on the <strong>MultiPhysics</strong> node 
under the SV Data Manager. Selecting the <strong>Create MultiPhysics job</strong> menu item displays a popup window.

<figure>
<img class="svImg svImgSm" src="/documentation/multi_physics/sv-multiphysics-tool/images/create-job-popup.png">
<figcaption class="svCaption"> The <strong>Create MultiPhysics Simulation Job </strong> popup menu.  
</figcaption>
</figure>

Type <strong>fluid_simulation</strong> into the <strong>job Name</strong> <i>DialogBox</i>. This names is used 
to identify the <strong>MultiPhysics Tool</strong> instance and to name the files and directories stored under the 
SimVascular project's MultiPhysics directory. Selecting OK creates an <strong>MultiPhysics Tool</strong> instance node under 
the SV Data Manager. Selecting this instance displays the <strong>MultiPhysics Tool</strong> panel.

<figure>
<img class="svImg svImgSm" src="/documentation/multi_physics/sv-multiphysics-tool/images/panel-intro.png">
<figcaption class="svCaption"> The <strong>MultiPhysics Tool</strong> panel.  
</figcaption>
</figure>

The panel contains four buttons at the top used to primarily to create new svMultiPhysics simulations (jobs)

<strong>New job</strong> <i>Button</i> - Selecting to create a new MultiPhysics instance

<strong>Save job</strong> <i>Button</i> - Select to write the values of GUI controls into the <i>SVPROJECT</i>/MultiPhysics<i>Job Name</i>.multiphysicsjob file.

<strong>Load job</strong> <i>Button</i> - Select to display a file browser used to select a .multiphysicsjob file. The 
values of GUI controls are then set from the values in this file. 

<strong>Load mesh</strong> - Reads in the finite element mesh stored in the <i>Project</i>/Meshes directory. At
startup SimVascular does not read in the finite element mesh so this must be initiated manually. 

The panel contains four sub-panels used to input a specific category of data needed to create the files
needed to run a svMultiPhysics solver simulation
<ul>
<li> Domains </li>
<li> Physics </li>
<li> Simulation Parameters </li>
<li> Run Simulation </li>
</ul>

A selecting a sub-panel name brings up the sub-panel's controls. The following sections describe how each of the 
sub-panels are used.


