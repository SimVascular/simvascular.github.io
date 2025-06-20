<br>
<hr class="rounded">

<h1 id="cfd_simulation_tool" style="text-align:center;"> SimVascular CFD Simulation Tool </h1>

The SimVascular <strong>CFD Simulation Tool</strong> is used to interactively create the mesh and solver XML input file
needed to run a CFD simulation using the svMultiPhysics solver.

CFD simulation _jobs_ with user-defined names can be created using different finite element meshes, boundary conditions and solver
parameters. Each _job_ is stored using its user-defined name under the _SVPROJECT/Simulations/JOBNAME_ directory. The values of the
GUI parameters set for each _job_ are stored in an XML _SVPROJECT/Simulations/JOBNAME.sjb_ file.

The following sections describe how to use the <strong>CFD Simulation Tool</strong> GUI to set the
mesh, boundary conditions, material properties and solver parameters needed for a simulation.

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
See the <a href="https://simvascular.github.io/documentation/quickguide.html#introduction"> Getting Started / Introduction </a> documentation for a description of the
SimVascular graphical user interface (GUI) controls and useful application <i>Tools</i> concepts.
</div>

<!--- --------------------------------------------------- --->
<!--- --------------- Creating Mesh Files --------------- --->
<!--- --------------------------------------------------- --->

<h2 id="cfd_simulation_tool_mesh"> Creating Mesh Files </h2> 
The <strong>CFD Simulation Tool</strong> requires files containing the finite element volume mesh (VTK VTU) and 
boundary surface meshes (VTK VTP). These files are created by right-clicking on the 
<strong>Meshes</strong> node under the SV Data Manager. Selecting the <strong>Export Mesh Complete</strong> 
menu item displays a file browser used to select to location to store the location for the finite element files.

<!--- -------------------------------------------------------------- --->
<!--- ---------- Creating an CFD Simulation Tool Instance ---------- --->
<!--- -------------------------------------------------------------- --->

<h2 id="cfd_simulation_tool_create_instance"> Creating a CFD Simulation Tool Instance </h2> 
A <strong>CFD Simulation Tool</strong> instance is created by right-clicking on the <strong>Simulations</strong> node 
under the SV Data Manager. Selecting the <strong>Create Simulation job</strong> menu item displays a popup window.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/create-job-popup.png">
<figcaption class="svCaption"> The <strong>Create svFSI Simulation Job </strong> popup menu.  
</figcaption>
</figure>

Type <strong>steady</strong> into the <strong>job Name</strong> <i>DialogBox</i>. This names is used 
to identify the <strong>CFD Simulation Tool</strong> instance and to name the files and directories stored under the 
SimVascular project's Simulations directory. Selecting OK creates an <strong>CFD Simulation Tool</strong> instance node under 
the SV Data Manager. Selecting this instance displays the <strong>CFD Simulation Tool</strong> panel.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/panel-intro.png">
<figcaption class="svCaption"> The <strong>CFD Simulation Tool</strong> panel.  
</figcaption>
</figure>

The panel contains five sub-panels used to input a specific category of data needed to create the files
needed to run a svMultiPhysics solver CFD simulation
<ul>
<li> Basic Parameters </li>
<li> Inlet and Outlet BCs</li>
<li> Wall Properties </li>
<li> Solver Parameters </li>
<li> Create Files and Run Simulation </li>
</ul>

A selecting a sub-panel name brings up the sub-panel's controls. The following sections describe how each of the 
sub-panels are used.


