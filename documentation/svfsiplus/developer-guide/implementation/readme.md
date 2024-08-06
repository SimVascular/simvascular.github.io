<h3 id="developer_implementation"> Implementation Details</h3>
This section describes some of the svFSIplus implementation details that a developer should find useful.


<h4 id="developer_implementation_flow_control"> Flow of Control </h4>
This section outlines the solver flow of control for a simulation.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L770"> main() in main.cpp</a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L781"> Initialize MPI</a>
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L793"> Create Simulation object</a>

<a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a>
<a href=""> </a>

</div>

<!-- --------------------------------------------------------- -->
<!-- Iterate for restarting a simulation after remeshing       -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </h5>
This code section checks if a remeshing operation is needed while iterating over time. 

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L805"> main() in main.cpp </a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<strong>for each time step: </strong>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L812"> Read in a solver XML file and all mesh and BC data </a> <a href="#developer_implementation_flow_control_read_xml_bcs"> [read_files] </a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L819"> Distribute data to processors</a> <a href="#developer_implementation_flow_control_distribute"> [distribute]</a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L828"> Initialize simulation data </a> <a href="#developer_implementation_flow_control_initialize"> [initialize]</a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L848"> Run the simulation</a> 
<a href="#developer_implementation_flow_control_run_simulation"> [run_simulation]</a>
</div>


<a href=""> </a>
</div> 


<!-- --------------------------------------------------------- -->
<!-- Read in a solver XML file and all mesh and BC data        -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file and all mesh and BC data </h5>
This code section reads in the solver input file, finite element mesh files and boundary condition data.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1597"> read_files() in read_files.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1614"> Read the solver XML file </a> <a href="#developer_implementation_flow_control_read_xml_params"> [read_parameters]</a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1648"> Set simulation and module member data from XML parameters [set_module_parameters()]</a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1654"> Read mesh data</a> <a href="#developer_implementation_flow_control_read_mesh_data"> [read_msh]</a>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1685"> Read equations and boundary condition data</a> <a href="#developer_implementation_flow_control_read_equations"> [read_eq] </a>

<a href=""> </a>


</div> 

<!-- --------------------------------------------------------- -->
<!-- Read the solver XML                                       -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_xml_params"> Read the solver XML </h5>
This code section reads and sets parameters from the solver input XML file.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/Simulation.cpp#L63"> read_parameters() in Simulation.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Parameters::read_xml(file_name);
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read mesh data                                            -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_mesh_data"> Read mesh data </h5>
This code section reads in the finite element mesh data. 

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_msh.cpp#L1079"> read_msh() in read_msh.cpp </a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<strong>for each mesh</strong>: 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Set mesh parameters and read mesh data
Read mesh nodal coordinates and element connectivity <br>
Allocate mesh local to global nodes map (gN)<br>
Global total number of nodes<br>
</div> 
<br>
Create global nodal coordinate array<br>
Process projection faces <br>
Set domain IDs<br>
Read fiber orientation<br>
Read prestress data<br>
Set initial mesh pressure, velocity or displacement from a file
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read equations                                            -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_equations"> Read equations and boundary condition data </h5>
This code section sets the parameter data for a given equation and reads in boundary condition data defined for it.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1346"> read_eq() in read_files.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Set equation properties [set_equation_properties()] <br>

Set the number of function spaces <br>

<strong>for each boundary condition:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
[ all_fun::find_face() ] <br>
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L1471"> Read boundary condition data</a> <a href="#developer_implementation_flow_control_read_bc_data"> [read_bc] </a>
</div>
Initialize cplBC for RCR-type BC <br>
Set body forces<br>
[ read_bf() ]<br>
</div>

<!-- --------------------------------------------------------- -->
<!-- Distribute data to processors                             -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_distribute"> Distribute data to processors</h5>
This code section partitions and distributes data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/distribute.cpp#L57"> distribute() in distribute.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Send simulation parameters to all processors [ cm.bcast() ]
Compute the weights used to assign a portion of each mesh to the each processor <br>
[ all_fun::split_jobs() ] <br>
<strong>for each mesh</strong>: <br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
[ part_msh() ] <br>
</div> 
Rearrange body force structure <br>
Partition faces [ part_face() ] <br>
Distribute com_mod.x [ all_fun::local() ] <br>
Distribute prestress (pS0) <br>
Distribute initial flow quantities (Pinit, Vinit, Dinit) <br>

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/distribute.cpp#L490"> Distribute equations</a> <a href="#developer_implementation_flow_control_distribute_equation"> [dist_eq] </a>

Distribute CMM variable wall properties  <br>
Distribute cplBC data <br>
</div> 

<!-- --------------------------------------------------------- -->
<!-- Distribute equation data to processors                    -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_distribute_equation"> Distribute _equation data to processors</h5>
This code section distributes equation data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/distribute.cpp#L940"> dist_eq() in distribute.cpp</a>


<!-- --------------------------------------------------------- -->
<!-- Initialize simulation data                                -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_initialize"> Initialize simulation data </h5>
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/initialize.cpp#L313"> initialize() in initialize.cpp</a>

<!-- --------------------------------------------------------- -->
<!-- Run the simulation                                        -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_run_simulation"> Run the simulation </h5>
This code section just calls the iterate_solution() function.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L761"> run_simulation() in main.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L763"> Iterate solution</a> <a href="#developer_implementation_flow_control_iterate_solution"> [iterate_solution]</a>
</div>

<!-- --------------------------------------------------------- -->
<!-- Read boundary condition data                              -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_bc_data"> Read boundary condition data </h5>
This code section reads in boundary condition data.

<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/read_files.cpp#L152"> read_bc() in read_files.cpp</a> 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
[ read_trac_bcff() ]<br>
[ read_temporal_values() ]<br>
[ read_fourier_coeff_values_file() ]<br>
[ read_temp_spat_values() ]<br>
[ read_spatial_values() ]<br>
CMM: load wall displacements, read prestress tensor, read displacements <br>
</div>

<!-- --------------------------------------------------------- -->
<!-- iterate_solution                                          -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_iterate_solution"> Iterate solution </h5>
<a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/main.cpp#L194"> iterate_solution() in main.cpp </a>

