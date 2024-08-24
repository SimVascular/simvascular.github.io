
<h2 id="data_file_formats_results"> Results Data </h2>
Simulation results are written to two types of files
<ul style="list-style-type:disc">
<li> <a href="#data_file_formats_results_bin"> Binary results restart format </a> </li> 
<li> <a href="#data_file_formats_results_vtk"> VTK results format </a> </li> 
</ul>

See the <a href="#run_simulation_output"> Simulation Results Output</a> section for a description of the
solver input file keywords used to control how results files are written.

<!-- --------------------------------------------------------- -->
<!-- --------------- Binary Results Format ------------------- -->
<!-- --------------------------------------------------------- -->

<h3 id="data_file_formats_results_bin"> Binary Results Restart File Format </h3>
The binary results restart file stores state variables and mesh data for a single time step in a custom binary format. 
A binary file is a series of sequential bytes, each of which is eight bits in length. The content of this
file is must be accessed by a program (e.g. svFSIplus) that knows how that content is formatted and how to read 
the data programmatically using C++ or Python.

Each restart file contains a header of seven integer (4-byte) values containing  
<ol>
<li> Number of processors used to run the simulation </li>
<li> Number of equations </li>
<li> Number of meshes </li>
<li> Number of nodes </li>
<li> Number of unknowns in the coupled 0D-3D problem </li>
<li> Number of degrees of freedom </li>
<li> An error flag </li>
</ol>

These values are followed by an integer (4-byte) and two double (8-byte) values containing  
<ol>
<li> Simulation time step </li>
<li> Simulation time </li>
<li> Wall clock time </li>
</ol>

Header values are checked when a simulation is restarted to ensure that the restart is valid for the 
the current simulation setup (e.g. same number of processors, same number of equations, etc.).

State variable data (e.g. velocity) is then written after the header. The results from all processors 
in a parallel simulation are written to the restart file..

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The restart file contains information about how the simulation data (e.g. finite element mesh) was partitioned 
to run on multiple processors during a parallel simulation. A simulation can therefore not be restarted using
a different number of processors than was used for the original simulation.
</div>

<!-- --------------------------------------------------------- -->
<!-- --------------- VTK Results Format ---------------------- -->
<!-- --------------------------------------------------------- -->

<h3 id="data_file_formats_results_vtk"> VTK Results File Format </h3>
The data file is a <a href="#appendix_vtk_file_format"> VTK VTU </a> format file. 
State variables and any output quantities given in the solver input file 
<a href="#output_parameters"> Output Subsection </a> are stored using PointData arrays.

A separate VTK file is used to store results for a single time step. Results can be visualized using
the <a href="https://www.paraview.org/"> ParaView </a> visualization program.

Data from all processors in a parallel simulation are written to the VTK files.


