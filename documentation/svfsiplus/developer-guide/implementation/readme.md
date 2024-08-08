<h3 id="developer_implementation"> Implementation Details</h3>
This section describes some of the svFSIplus implementation details that a developer should find useful.

The code is documented using a text and links to code in GitHub using the followig conventions

<ul style="list-style-type:disc;">
  <li> A call to a function has the function name shown in square brackets [FUNC] </li>
  <li> A line in the code shown as a dot in square brackets [.] </li> 
  <li> A loop is defined using a <strong>foreach</strong> line followed by a colored box enclosing the code within the loop</li> 
</ul> 

The text description may be a link to subsections within this document describing code within a specific function.

<!-- --------------------------------------------------------- -->
<!--                 Flow of Control                           -->
<!-- --------------------------------------------------------- -->

<h4 id="developer_implementation_flow_control"> Flow of Control </h4>
This section outlines the solver flow of control for a simulation.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L770"> main() in main.cpp</a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Initialize MPI [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L781"> . </a> ]

Create <strong>Simulation</strong> object [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L793"> . </a> ]

<a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a>
</div>

<!-- --------------------------------------------------------- -->
<!-- Iterate for restarting a simulation after remeshing       -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </h5>
This code section checks if a remeshing operation is needed while iterating over time. If remeshing is needed then the time
iteration is interrupted, remshing is performed, new mesh data is distributed and time iteration continues.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L805"> main() in main.cpp </a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<strong>while simulation is active: </strong>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
<a href="#developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file, mesh and BC data </a> [ 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L812"> read_files </a>]

<a href="#developer_implementation_flow_control_distribute"> Distribute data to processors</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L819"> distribute </a> ]

<a href="#developer_implementation_flow_control_initialize"> Initialize simulation data </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L828"> initialize </a> ]

<a href="#developer_implementation_flow_control_run_simulation"> Run the simulation</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L848"> run_simulation </a> ]

</div>


</div> 


<!-- --------------------------------------------------------- -->
<!-- Read in a solver XML file and all mesh and BC data        -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file, mesh and BC data </h5>
This code section reads in the solver input file, finite element mesh files and boundary condition data.
<br>

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1597"> read_files() in read_files.cpp</a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<a href="#developer_implementation_flow_control_read_xml_params"> Read the solver XML file </a> [ 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1614"> 
read_parameters </a> ]

Set simulation and module member data from XML parameters [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1648"> set_module_parameters </a> ]

<a href="#developer_implementation_flow_control_read_mesh_data"> Read mesh data</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1654"> 
read_msh</a> ]

<a href="#developer_implementation_flow_control_read_equations"> Read equations and boundary condition data</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1685"> 
read_eq </a> ]

</div> 

<!-- --------------------------------------------------------- -->
<!-- Read the solver XML                                       -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_xml_params"> Read the solver XML </h5>
This code section reads and sets parameters from the solver input XML file.
<br><br>
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Simulation.cpp#L63"> read_parameters() in Simulation.cpp</a>
<br>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Read XML file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Parameters.cpp#L147"> read_xml </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read mesh data                                            -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_mesh_data"> Read mesh data </h5>
This code section reads in the finite element mesh data. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1079"> read_msh() in read_msh.cpp </a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<strong>foreach mesh</strong>: 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Set mesh parameters and read mesh data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1120"> .  </a> ]

Read mesh nodal coordinates and element connectivity [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1136"> .  </a> ]

Allocate mesh local to global nodes map (gN) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1147"> .  </a> ]

Global total number of nodes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1168"> .  </a> ]
</div> 

Create global nodal coordinate array [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1184"> .  </a> ]

Process projection faces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1264"> .  </a> ]

Set domain IDs [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1457"> .  </a> ]

Read fiber orientation [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1542"> .  </a> ]

Read prestress data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1603"> .  </a> ]

Set initial mesh pressure, velocity or displacement from a file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L163"> .  </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read equations                                            -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_equations"> Read equations and boundary condition data </h5>
This code section sets the parameter data for a given equation and reads in boundary condition data defined for it.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1346"> read_eq() in read_files.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Set equation properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1426"> set_equation_properties </a> ]

Set the number of function spaces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1432"> . </a> ]

<strong>foreach boundary condition:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Search for face [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1466"> all_fun::find_face </a> ] 

<a href="#developer_implementation_flow_control_read_bc_data"> Read boundary condition data</a> [ 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1471"> read_bc </a> ]

</div>

Initialize cplBC for RCR-type BC [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1476">  . </a> ] 

Read body forces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1520">  read_bf </a> ] 
</div>

<!-- --------------------------------------------------------- -->
<!-- Distribute data to processors                             -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_distribute"> Distribute data to processors</h5>
This code section partitions and distributes data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L57"> distribute() in distribute.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Send simulation parameters to all processors [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L71"> . </a> ]

Compute the weights used to assign a portion of each mesh to the each processor [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L111"> . </a> ]

Partition work [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L141">  all_fun::split_jobs </a> ]

<strong>foreach mesh</strong>: <br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Partition mesh [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L187">  part_msh </a> ]
</div> 

Rearrange body force structure [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L224"> . </a> ]

Partition faces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L282">  part_face </a> ]

Distribute com_mod.x [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L370"> . </a> ]

Distribute prestress (pS0) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L414"> . </a> ]

Distribute initial flow quantities (Pinit, Vinit, Dinit) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L459"> . </a> ]

<a href="#developer_implementation_flow_control_distribute_equation"> Distribute equation data</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L490"> dist_eq </a> ]

Distribute CMM variable wall properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L520"> . </a> ]

Distribute cplBC data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L531"> . </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Distribute equation data to processors                    -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_distribute_equation"> Distribute equation data </h5>
This code section distributes equation data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L940"> dist_eq() in distribute.cpp</a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Distribute equation parameters

Distribute linear solver settings

Distribute domain properties

<strong>foreach domain:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Distribute material properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1063"> dist_mat_consts</a> ]

Distribute viscosity model properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1069"> dist_visc_model </a> ]
</div> 

Distribute cardiac electromechanics parameters<br>
Distribute ECG leads parameters<br>
Distribute output parameters<br>

Distribute boundary condition data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1138"> dist_bc </a> ] 

Distribute body force data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1157"> dist_bf </a> ]
</div>

<!-- --------------------------------------------------------- -->
<!-- Initialize simulation data                                -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_initialize"> Initialize simulation data </h5>
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L313"> initialize() in initialize.cpp</a>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Setup logging to history file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L343"> initialize </a> ]

Set faces for linear solver [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L370"> initialize </a> ]

Set com_mod.stamp [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L497"> initialize </a> ] 

Initialize tensor operations [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L547"> initialize </a> ]

Constructing stiffness matrix [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L551"> initialize </a> ]

Initialize FSILS structures [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L559"> initialize </a> ]

Allocate com_mod.A0, com_mod.An, etc. [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L577"> initialize </a> ]

Initialize electrophysiology [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L606"> initialize </a> ]

Initialize remeshing [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L620"> initialize </a> ]

Initialize function spaces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L731C6-L731C32"> initialize </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Run the simulation                                        -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_run_simulation"> Run the simulation </h5>
This code section just calls the iterate_solution() function.
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L761"> run_simulation() in main.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<a href="#developer_implementation_flow_control_iterate_solution"> Iterate solution</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L763"> iterate_solution</a> ]

</div>

<!-- --------------------------------------------------------- -->
<!-- Read boundary condition data                              -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_read_bc_data"> Read boundary condition data </h5>
This code section reads in boundary condition data.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L152"> read_bc() in read_files.cpp</a> 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L185"> read_trac_bcff </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L246"> read_temporal_values </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L254"> read_fourier_coeff_values_file </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L348"> read_temp_spat_values </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L418"> read_spatial_values </a> ]

CMM: load wall displacements, read prestress tensor, read displacements [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L548"> . </a> ]

</div>

<!-- --------------------------------------------------------- -->
<!-- iterate_solution                                          -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_iterate_solution"> Iterate solution </h5>
This code section solves the simulation equations for each time step. If remeshing is active then a check is made if remeshing is needed. If it is then control is returned to <a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a>.

The code iterates over two nested loops 
<ol type="1">
  <li> Outer loop that steps the simulation in time </li>
  <li> Inner predictor-corrector loop that solves the nonlinear system of equations for the current time step</li> 
</ol>

The <i>Inner predictor-corrector loop</i> will switch between the equations defined for the simulation solving each in turn until convergence is achieved. For example, a fluid-solid interaction simulation will solve for the fluid equation, then solve for the mesh (solid) equation, then solve for the fluid equation and so on.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The current equation being solved is determined by the <strong>com_mod.cEq</strong> variable. This variable is set in the 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L589"> pic::picc </a> function.
</div>

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L194"> iterate_solution() in main.cpp </a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<strong>foreach time step:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">

Incrementing time step [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L296C8-L296C30"> . </a> ]

Compute mesh properties and check if remeshing is needed [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L317C8-L317C54"> . </a> ]

<a href="#developer_implementation_flow_control_predictor_step"> Predictor step </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L334"> picp </a> ]

Apply Dirichlet BCs strongly [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L348"> set_bc::set_bc_dir </a> ]

Iterate the precomputed state-variables in time [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L350"> iterate_precomputed_time </a> ]

Inner loop for nonlinear Newton iteration [<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L358"> . </a>] <br><br>
<strong>while true: </strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #00e000; border-left: 6px solid #00e000">

Initiator step for Generalized α−Method [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L391"> pic::pici </a>]

Allocate com_mod.R and com_mod.Val arrays [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L415"> ls_ns::ls_alloc </a>]

Compute body forces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L427"> bf::set_bf </a>]

<strong>foreach mesh</strong>: 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #00e0e6; border-left: 6px solid #00e0e6">
Assemble equations [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L437">  eq_assem::global_eq_assem </a>]
</div>

Apply Neumman or Traction boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L454"> set_bc::set_bc_neu </a>]

Apply CMM boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L467"> set_bc::set_bc_cmm </a>]

Apply weakly applied Dirichlet boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L476"> set_bc::set_bc_dir_w </a>] 

Apply contact model [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L481"> contact::construct_contact_pnlty </a>]

Synchronize R across processes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L500"> all_fun::commu </a>]

Update residual in displacement equation for USTRUCT physics [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L513"> ustruct::ustruct_r </a>]

Set the residual of the continuity equation and its tangent matrix due to variation with pressure to 0 on all the edge nodes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L523"> fs::thood_val_rc </a>]

Treat Neumann boundaries that are not deforming [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L532"> set_bc::set_bc_undef_neu </a>]

Solve equation [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L567"> ls_ns::ls_solve </a>]

Update corrector and check for convergence [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L589"> pic::picc </a>]

Write results [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L601"> output::output_result </a>]
</div><br>

Save text files containing average results [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L630"> txt_ns::txt </a>]

Check if remeshing is needed [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L632"> . </a>]

Save result to restart bin file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L694"> output::write_restart </a>]

Save result to VTK file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L715"> vtk_xml::write_vtus </a>]

Set last time step flag [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L682"> . </a>]

Check for last time step [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L735"> . </a>]
</div>

</div>

<!-- --------------------------------------------------------- -->
<!-- Predictor step                                            -->
<!-- --------------------------------------------------------- -->
<h5 id="developer_implementation_flow_control_predictor_step"> Predictor step </h5>
This code section implements the predictor step in a two-stage predictor–multicorrector algorithm for solving the nonlinear finite element equations.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L579"> picp() in pic.cpp </a>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Prestress initialization 

<strong>foreach equation:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Update An, Dn
Electrophysiology [  cep_ion::cep_integ() ]
</div>

</div>

