<br>
<hr class="rounded">

<h1> Running svFSIplus </h1>

This section describes how to set up and run an svFSIplus simulation. Setting up a simulation requires first creating the base files necessary for the definition of the problem mesh, boundary conditions, physics, properties and solution parameters.

<ul style="list-style-type:disc;">

<li> <a href="#run_getting"> Getting the svFSIplus Program </a> </li> 

<li> <a href="#run_finite_element_mesh"> Create files storing the finite element mesh </a> </li> 

<li> <a href="#run_initial_conditions"> Create files storing initial condition data </a> </li> 

<li> <a href="#run_boundary_conditions"> Create files storing boundary condition data </a> </li> 

<li> <a href="#run_solver_xml_file"> Create the solver input XML file </a> </li> 

</ul>

Additional files and parameters will be needed for simulations of more complex problems.

<!-- =================================================================== -->
<!-- ======================= Getting the svFSIplus Program ============= -->
<!-- =================================================================== -->

<h2 id="run_getting"> Getting the svFSIplus Program </h2>
The svFSIplus program is a C++ program compiled into an executable named <strong>svfsiplus</strong>. 

The svFSIplus program can be obtained by
<ul style="list-style-type:disc;">
<li> Downloading an installer from <a href="https://simtk.org/frs/?group_id=188"> SimTK SimVascular Downloads </a> </li>
<li> Building from source downloaded from <a href="https://github.com/SimVascular/svFSIplus?tab=readme-ov-file"> svFSIplus </a> GitHub repository </li>
</ul>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The svFSIplus program requires several software packages to run. 
See the <a href=""> svFSIplus </a> GitHub repository for more information about software dependencies. 
</div>

<!-- =================================================================== -->
<!-- ========================== Finite Element Mesh ==================== -->
<!-- =================================================================== -->

<h2 id="run_finite_element_mesh"> Finite Element Mesh </h2>

The finite element mesh used in a simulation subdivides a 2D or 3D physical domain of a problem
into a discrete set of cells called elements. A finite element mesh consists of 

<ul style="list-style-type:disc;">
<li> nodal coordinates - coordinate locations in 2D or 3D space representing a physical domain </li>
<li> nodal IDs - global node ID which is unique for each node and which distinguishes it from all other nodes</li>
<li> elements - define a domain in a physical space connected by specifying nodal connectivity (nodal IDs) at the element boundaries </li>
</ul>

Each element in a finite element mesh is defined by its nodal connectivity defining the nodal IDs attached to it.
Element nodal connectivity defines how elements are connected and their nodal coordinates.

A finite element mesh is typically created automatically from a geometric model using a 
<a href="https://en.wikipedia.org/wiki/Mesh_generation"> mesh generator</a>. Most of the finite element 
meshes used by svFSIplus are tetrahedral meshes created by the open source 
<a href="https://github.com/libigl/tetgen"> TetGen</a> mesh generator.

Two types of finite element mesh files are used in a simulation 
<ul style="list-style-type:disc;">
<li> domain mesh - stores the 2D or 3D physical domain of a problem </li>
<li> surface mesh - stores the 1D or 2D surfaces (faces) of a physical domain used to specify boundary conditions </li>
</ul>

The surface mesh represents the 2D faces of the elements in a 3D domain mesh or the 1D edges of a 2D domain.

<!--- -------------------------------------- --->
<!--- ------------- Element Types ---------- --->
<!--- -------------------------------------- --->

<h3 id="run_finite_element_mesh_types"> Element Types </h3>

Element types are classified based on <a href="https://en.wikipedia.org/wiki/Types_of_mesh"> shape </a> and order. The element order is the number of nodes located on an element edge and in its interior. Elements with an order higher than 1 can model curved edges and provide more accurate results.

Higher order elements can additionally be classified as 
<ul style="list-style-type:disc;">
<li> Lagrange - introduces additional nodes (degrees of freedom) within the elements </li>
<li> serendipity - nodes only on the element edges </li>
</ul>

svFSIplus supports the following element types

<ul style="list-style-type:disc;">
 <li> <i>line</i> - linear and quadratic </li>
 <li> <i>triangle</i> - linear and quadratic </li>
 <li> <i>quadrilateral</i> - bilinear, serendipity, biquadratic </li>
 <li> <i>tetrahedron </i> - linear and quadratic </li>
 <li> <i>hexahedron </i> - trilinear, quadratic/serendipity, triquadratic </li>
 <li> <i>wedge</i> - linear </li>
</ul>

<!-- 
<h4 id="run_finite_element_mesh_line"> Line Element </h4>

<h4 id="run_finite_element_mesh_triangle"> Triangle Element </h4>

<h4 id="run_finite_element_mesh_quadrilateral"> Quadrilateral Element </h4>

<h4 id="run_finite_element_mesh_tetrahedron"> Tetrahedron Element </h4>

<h4 id="run_finite_element_mesh_hexahedron"> Hexahedron Element </h4>

<h4 id="run_finite_element_mesh_wedge"> Wedge Element </h4>

-->


<!--- -------------------------------------- --->
<!--- ---------- Mesh File Format ---------- --->
<!--- -------------------------------------- --->

<h3 id="run_finite_element_mesh_vtk"> Mesh File Format </h3>
Finite element mesh files are stored using the
<a href="#appendix_vtk_file_format"> Visualization Toolkit (VTK)</a> compressed XML file format.

<h4 id="run_finite_element_mesh_vtk_vtu"> VTK VTU File Format </h4>
<pre>
A VTK VTU finite element mesh domain file contains the following data
<ul style="list-style-type:disc;">
<li> Nodal coordinates - A float array of 2D or 3D points. </li> 
<li> Nodal IDs - An integer array of node IDs. Node IDs identify each node with a unique integer ID.</li>
<li> Element connectivity - An integer array of indexes into the nodal coordinates array for each element. These 
indexes range from 0 to <i>number of nodal coordinates</i> - 1.  </li> 
<li> Element IDs - An integer array of element IDs. Element IDs identify each element with a unique integer ID.</li> 
</ul>
</pre>

<h4 id="run_finite_element_mesh_vtk_vtp"> VTK VTP File Format </h4>
<pre>
A VTK VTP finite element mesh surface file contains the following data
<ul style="list-style-type:disc;">
<li> Nodal coordinates - A float array of 2D or 3D points </li> 
<li> Nodal IDs - An integer array of node IDs </li> 
<li> Element connectivity - An integer array of indexes into the nodal coordinates array for each element. These 
indexes range from 0 to <i>number of nodal coordinates</i> - 1.  </li> 
<li> Element IDs - An integer array of element IDs. These IDs identify the element the surface element is from in the domain finite element mesh. </li> 
</ul>
VTP files can also store float data used to set the values of certain boundary conditions. 
</pre>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Finite element mesh files are automatically created by the <a href="#sv-fsi-tool"> SimVascular FSI Tool</a>.
</div>

<!-- =================================================================== -->
<!-- ======================== Initial Condition Data =================== -->
<!-- =================================================================== -->

<h2 id="run_initial_conditions"> Initial Condition Data </h2>
Initial condition data is used to set the initial values of state variables on the problem domain at the start of 
a simulation. Initial values can be set for each domain node using a VTK VTU of VTP file.

Different state variables can be initialized depending on the problem (equation) being solved. The following
list shows the <i>solver input file keywords</i> used to set initial conditions 
<ul style="list-style-type:disc;">
<li> <a href="#general_params_Simulation_initialization_file_path"> Simulation_initialization_file_path<a> - Initialize all state variables
<li> <a href="#mesh_params_Initial_pressures_file_path"> Initial_pressures_file_path<a> - Initialize pressure for an FSI fluid domain
<li> <a href="#mesh_params_Initial_velocities_file_path"> Initial_velocities_file_path<a> - Initialize velocity for an FSI fluid domain 
</ul>

<!-- =================================================================== -->
<!-- ======================== Boundary Condition Data ================== -->
<!-- =================================================================== -->
<h2 id="run_boundary_conditions"> Boundary Condition Data </h2>
Boundary condition data is used to set the initial values of state variables on the problem domain boundary at 
the start of a simulation. Boundary condition data is typically set using an ASCII formatted text file.
However, spatial values for pressure and traction boundary conditions are set using a 
a <a href="#run_finite_element_mesh_vtk_vtp"> VTK VTP </a> file. 

<!-- ------------------------------------------------------ -->
<!-- ------------------- Spatial Profile Data ------------- -->
<!-- ------------------------------------------------------ -->

<h3 id="run_bcs_spatial_profile"> Spatial Profile Data </h3>
The shape of user-defined velocity profile can be given in an ASCII text file. The format of the file is
<pre>
<i>node_id_1</i>  <i>value_1</i>
<i>node_id_2</i>  <i>value_2</i>
...
<i>node_id_N</i>  <i>value_N</i>
</pre>

where <i>node_id</i> is an integer ID for a node on the boundary surface and <i>value</i> is the 
spatial dependent profile vector data for that node.

The following <i>solver input file keyword</i> is used to set the spatial profile 
boundary condition file name
<ul style="list-style-type:disc;">
<li> <a href="#bc_Spatial_values_file"> Spatial_values_file <a> 
</ul>

<!-- ------------------------------------------------------ -->
<!-- ------------------- Temporal Values Data ------------- -->
<!-- ------------------------------------------------------ -->

<h3 id="run_bcs_temporal_values"> Temporal Values Data </h3>
The time-dependent values of a state variable are provided in an ASCII text file with format 
<pre>
<i>nts</i>  <i>nmodes</i>  
<i>time_1</i>  <i>value_1</i>
<i>time_2</i>  <i>value_2</i>
...
<i>time_nts</i>  <i>value_nts</i>
</pre>

where 
<ul style="list-style-type:disc;">
<li> nts = number of time steps </li>
<li> nmodes = number of Fourier modes used to smooth the data in time</li>
<li> <i>time_i</i> = ith time value </li>
<li> <i>value_i</i> = value of the state variable at the ith time <i>time_i</i> </li> 
</ul>

The following <i>solver input file keyword</i> is used to set the temporal 
values boundary condition file name
<ul style="list-style-type:disc;">
<li> <a href="#bc_Temporal_values_file_path"> Temporal_values_file_path <a> 
</ul>

<!-- ------------------------------------------------------ -->
<!-- --------- Temporal and Spatial Values Data ----------- -->
<!-- ------------------------------------------------------ -->

<h3 id="run_bcs_temporal_and_spatial_values"> Temporal and Spatial Values Data </h3>

The time-dependent and spatial variation of a state variable are provided in an ASCII text file with format 
<pre>
<i>ndof</i>  <i>nts</i>  <i>nnodes</i>  
<pre>
<i>time_1</i>  
<i>time_2</i> 
...
<i>time_nts</i>
</pre>

<pre>
<i>node_1</i>
<i>value_1_1_1</i> <i>value_1_1_2</i> ...  <i>value_1_1_ndof</i> 
...
<i>value_1_nts_1</i> <i>value_1_nts_2</i> ...  <i>value_1_nts_ndof</i> 
</pre>
<pre>
<i>node_2</i>
<i>value_2_1_1</i> <i>value_2_1_2</i> ...  <i>value_2_1_ndof</i> 
...
<i>value_2_nts_1</i> <i>value_2_nts_2</i> ...  <i>value_2_nts_ndof</i> 
</pre>
...
<pre>
<i>node_nnodes</i>
<i>value_nnodes_1_1</i> <i>value_nnodes_1_2</i> ...  <i>value_nnodes_1_ndof</i>
...
<i>value_nnodes_nts_1</i> <i>value_nnodes_nts_2</i> ... <i>value_nnodes_nts_ndof</i>
</pre>
</pre>

where 
<ul style="list-style-type:disc;">
<li> ndof = number of data degrees of freedom </li>
<li> nts = number of time steps </li>
<li> nnodes = number of nodes in the boundary surface </li>
<li> <i>value_i_j_k</i> = value of the state variable at the ith node, jth time and kth dof</li> 
</ul>

Example:
<pre>
2   2   3
0.000000000
100.000000000
1
0.000000000000000000e+00 0.000000000000000000e+00
0.000000000000000000e+00 0.000000000000000000e+00
2
1.547824639326119289e+01 0.000000000000000000e+00
1.547824639326119289e+01 0.000000000000000000e+00
3
3.080742881248511011e+01 0.000000000000000000e+00
3.080742881248511011e+01 0.000000000000000000e+00
</pre>

The following <i>solver input file keyword</i> is used to set the temporal and
spatial values boundary condition file name
<ul style="list-style-type:disc;">
<li> <a href="#bc_Temporal_and_spatial_values_file_path"> Temporal_and_spatial_values_file_path <a> 
</ul>

<!-- ------------------------------------------------------ -->
<!-- -------------- Spatial Values Data ------------------- -->
<!-- ------------------------------------------------------ -->

<h3 id="run_bcs_spatial_values_data"> Spatial Values Data </h3>
The spatial variation of a pressure or traction load applied to a face are provided in
a <a href="#run_finite_element_mesh_vtk_vtp"> VTK VTP </a> file. This is used for Neumann 
or Traction boundary condition types.

The VTP file will contain a <i>Float64 PointData DataArray</i> named 
<ul style="list-style-type:disc;">
<li> "Pressure" - Pressure values for a Neumann boundary condition </li>
<li> "Traction" - Traction values for a <i>Traction</i> boundary condition </li>
</ul>

The following <i>solver input file keyword</i> is used to set the spatial values 
boundary condition file name
<ul style="list-style-type:disc;">
<li> <a href="#bc_Spatial_values_file"> Spatial_values_file_path<a> 
</ul>

<!-- ------------------------------------------------------ -->
<!-- ------------------ CMM Values Data ------------------- -->
<!-- ------------------------------------------------------ -->

<h3 id="run_bcs_cmm_values_data"> Coupled Momentum Method (CMM) Values Data </h3>
In Coupled Momentum Method simulations the vessel wall can be initialized with prestressing or with 
initial displacements.
The spatial variation of these values for a face are provided in
a <a href="#run_finite_element_mesh_vtk_vtu"> VTK VTU </a> file. 

The VTU file for initial prestress will contain <i>Float64 PointData DataArrays</i> named 
<ul style="list-style-type:disc;">
<li> "Displacement" - Wall displacement values (NumberOfComponents="3") </li>
<li> "Stress" - Wall stress values (NumberOfComponent="6") </li>
</ul>

The VTU file for initial displacements will contain Float64 PointData DataArray named 
<ul style="list-style-type:disc;">
<li> "Displacement" - Wall displacement values (NumberOfComponents="3") </li>
</ul>

The following <i>solver input file keywords</i> are used to set initial prestress and displacement 
boundary condition file names
<ul style="list-style-type:disc;">
<li> <a href="#bc_Initial_displacements_file_path"> Initial_displacements_file_path<a> 
<li> <a href="#bc_Prestress_file_path"> Prestress_file_path<a> 
</ul>

<!-- =================================================================== -->
<!-- ====================== Simulation Results Output ================== -->
<!-- =================================================================== -->

<h2 id="run_simulation_output"> Simulation Results Output </h2>
svFSIplus can write simulation results in the following file formats 
<ul style="list-style-type:disc;">
<li> Binary results restart file - Custom format used to store state variables and mesh data. 
Can be used to continue a simulation from a previous state.  Uses <strong>.bin</strong></i> file extension.  </li>
<li> <a href="#appendix_vtk_file_format"> VTK </a> format files - VTK format files used to store state variables and any output quantities given in the solver input file <a href="#output_parameters"> Output Subsection</a>. Used for results visualization.  Uses <strong>.vtu</strong> and <strong>.vtp</strong> </i> file extension. </li>
</ul>

There are several keywords in the <a href="#general_parameters"> General Simulation Parameters </a> 
section of the solver input file that can be used to control how restart files are written
<ul style="list-style-type:disc;">
<li> <a href="#gen_Increment_in_saving_restart_files"> Increment_in_saving_restart_files<a> </li>
<li> <a href="#gen_Start_saving_after_time_step"> Start_saving_after_time_step<a> </li>
</ul>

and how VTK files are written
<ul style="list-style-type:disc;">
<li> <a href="#gen_Convert_BIN_to_VTK_format"> Convert_BIN_to_VTK_format<a> </li>
<li> <a href="#gen_Increment_in_saving_VTK_files"> Increment_in_saving_VTK_files <a> </li>
<li> <a href="#gen_Name_prefix_of_saved_VTK_files"> Name_prefix_of_saved_VTK_files <a> </li>
<li> <a href="#gen_Save_results_to_VTK_format"> Save_results_to_VTK_format <a> </li>
</ul>

By default simulation results are saved in the directory named <i>nprocs</i>-procs, where 
<i>nprocs</i> is the number of processors, in the directory where the simulation was run 
(see <a href="#run_run_simulation"> Running a Simulation</a>). 
The directory name can be set using the <a href="#gen_Save_results_in_folder"> Save_results_in_folder <a> keyword.

Example:
<pre>
  &lt;Increment_in_saving_restart_files> 100 &lt;/Increment_in_saving_restart_files>
  &lt;Convert_BIN_to_VTK_format> false &lt;/Convert_BIN_to_VTK_format>

  &lt;Save_results_to_VTK_format> true &lt;/Save_results_to_VTK_format>
  &lt;Name_prefix_of_saved_VTK_files> result &lt;Name_prefix_of_saved_VTK_files>
  &lt;Increment_in_saving_VTK_files> 2 &lt;/Increment_in_saving_VTK_files>
  &lt;Start_saving_after_time_step> 1 &lt;/Start_saving_after_time_step>
</pre>

<!-- =================================================================== -->
<!-- =================== Creating Solver Input File ==================== -->
<!-- =================================================================== -->

<h2 id="run_solver_input_xml_file"> Creating a Solver Input File </h2>
A <a href="#solver_input_file"> basic solver input XML file </a> is created by adding the
<a href="#general_parameters">General Simulation</a>,
<a href="#mesh_parameters">Mesh</a>,
and <a href="#equation_parameters"> Equation </a> parameters required to perform a simulation

<ul style="list-style-type:disc;">
<li> number of time steps </i> 
<li> time step </i> 
<li> results output </i> 
<li> mesh files </i> 
<li> equation </i> 
  <ul style="list-style-type:square;">
  <li> phyical properties</i> 
  <li> linear solver </i> 
  <li> boundary conditions </i> 
  <li> results quantities to write </i> 
  </ul>
</ul>

A solver input file is automatically created by the <a href="#sv-fsi-tool"> SimVascular FSI Tool</a>.
It can also be created by customizing a copy of a solver input file from the svFSIplus 
<a href="https://github.com/SimVascular/svFSIplus/tree/main/tests/cases"> 
test/case directory</a> that is similar to the simulation you wish to perform.

<h3> Example solver input file for a fluid simulation </h3>
An example of a solver input file for a fluid simulation is given below. The simulation

<ul style="list-style-type:disc;">
<li> Single domain named <strong>fluid_domain</strong> </li> 
<li> Three boundary surfaces (faces) named
<ul style="list-style-type:square;">
<li> <strong>lumen_inlet</strong> </li> 
<li> <strong>lumen_outlet</strong> </li> 
<li> <strong>lumen_wall</strong> </li> 
</ul>
</ul>

<pre>
&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;svFSIFile version="0.1"&gt;
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #F0F0F0; border-left: 1px solid #F0F0F0">
&lt;!--- General Simulation Parameters --->

<a href="#general_parameters">&lt;GeneralSimulationParameters&gt;</a>
  &lt;Continue_previous_simulation&gt; false &lt;/Continue_previous_simulation&gt;
  &lt;Number_of_spatial_dimensions&gt; 3 &lt;/Number_of_spatial_dimensions&gt; 
  &lt;Number_of_time_steps&gt; 2 &lt;/Number_of_time_steps&gt; 
  &lt;Time_step_size&gt; 0.005 &lt;/Time_step_size&gt; 
  &lt;Spectral_radius_of_infinite_time_step&gt; 0.50 &lt;/Spectral_radius_of_infinite_time_step&gt; 
  &lt;Searched_file_name_to_trigger_stop&gt; STOP_SIM &lt;/Searched_file_name_to_trigger_stop&gt; 

  &lt;Save_results_to_VTK_format&gt; true &lt;/Save_results_to_VTK_format&gt; 
  &lt;Name_prefix_of_saved_VTK_files&gt; result &lt;/Name_prefix_of_saved_VTK_files&gt; 
  &lt;Increment_in_saving_VTK_files&gt; 2 &lt;/Increment_in_saving_VTK_files&gt; 
  &lt;Start_saving_after_time_step&gt; 1 &lt;/Start_saving_after_time_step&gt; 

  &lt;Increment_in_saving_restart_files&gt; 100 &lt;/Increment_in_saving_restart_files&gt; 
  &lt;Convert_BIN_to_VTK_format&gt; 0 &lt;/Convert_BIN_to_VTK_format&gt; 
<a href="#general_parameters">&lt;/GeneralSimulationParameters&gt;</a>
</div>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #F0F0F0; border-left: 1px solid #F0F0F0">
&lt;!--- Finite Element Mesh Parameters --->

<a href="#mesh_parameters">&lt;Add_mesh name="fluid_domain" &gt; </a>
  &lt;Mesh_file_path&gt; domain.vtu &lt;/Mesh_file_path&gt;

  &lt;Add_face name="lumen_inlet"&gt;
      &lt;Face_file_path&gt; lumen_inlet.vtp &lt;/Face_file_path&gt;
  &lt;/Add_face&gt;

  &lt;Add_face name="lumen_outlet"&gt;
      &lt;Face_file_path&gt; lumen_outlet.vtp &lt;/Face_file_path&gt;
  &lt;/Add_face&gt;

  &lt;Add_face name="lumen_wall"&gt;
      &lt;Face_file_path&gt; lumen_wall.vtp &lt;/Face_file_path&gt;
  &lt;/Add_face&gt;
<a href="#mesh_parameters">&lt;/Add_mesh&gt;</a>
</div>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #F0F0F0; border-left: 1px solid #F0F0F0">
&lt;!--- Equation Parameters --->

<a href="#equation_parameters">&lt;Add_equation type="fluid" &gt;</a>
   &lt;Coupled&gt; true &lt;/Coupled&gt;
   &lt;Min_iterations&gt; 3 &lt;/Min_iterations&gt;  
   &lt;Max_iterations&gt; 5&lt;/Max_iterations&gt; 
   &lt;Tolerance&gt; 1e-11 &lt;/Tolerance&gt; 
   &lt;Backflow_stabilization_coefficient&gt; 0.2 &lt;/Backflow_stabilization_coefficient&gt; 

   &lt;Density&gt; 1.06 &lt;/Density&gt; 
   &lt;Viscosity model="Constant" &gt;
     &lt;Value&gt; 0.04 &lt;/Value&gt;
   &lt;/Viscosity&gt;

   <a href="#output_parameters">&lt;Output type="Spatial" &gt;</a>
      &lt;Velocity&gt; true &lt;/Velocity&gt;
      &lt;Pressure&gt; true &lt;/Pressure&gt;
      &lt;Traction&gt; true &lt;/Traction&gt;
      &lt;Vorticity&gt; true&lt;/Vorticity&gt;
      &lt;Divergence&gt; true&lt;/Divergence&gt;
      &lt;WSS&gt; true &lt;/WSS&gt;
   <a href="#output_parameters">&lt;/Output&gt;</a>

   <a href="#liner_solver_parameters">&lt;LS type="GMRES" &gt;</a>
      &lt;Linear_algebra type="fsils" &gt;
         &lt;Preconditioner&gt; fsils &lt;/Preconditioner&gt;
      &lt;/Linear_algebra&gt;
     &lt;Max_iterations&gt; 100 &lt;/Max_iterations&gt;
     &lt;Tolerance&gt; 1e-12 &lt;/Tolerance&gt;
   <a href="#liner_solver_parameters">&lt;/LS&gt;</a>

   <a href="#boundary_condition_parameters">&lt;Add_BC name="lumen_inlet" &gt; </a>
      &lt;Type&gt; Dirichlet &lt;/Type&gt; 
      &lt;Time_dependence&gt; Unsteady &lt;/Time_dependence&gt; 
     &lt;Temporal_values_file_path&gt; lumen_inlet.flow&lt;/Temporal_values_file_path&gt; 
      &lt;Profile&gt; Parabolic &lt;/Profile&gt; 
      &lt;Impose_flux&gt; true &lt;/Impose_flux&gt; 
   <a href="#boundary_condition_parameters">&lt;/Add_BC&gt; </a>

   <a href="#boundary_condition_parameters">&lt;Add_BC name="lumen_outlet" &gt;</a>
      &lt;Type&gt; Neumann &lt;/Type&gt; 
      &lt;Time_dependence&gt; RCR &lt;/Time_dependence&gt; 
      &lt;RCR_values&gt; 
        &lt;Capacitance&gt; 1.5e-5 &lt;/Capacitance&gt; 
        &lt;Distal_resistance&gt; 1212 &lt;/Distal_resistance&gt; 
        &lt;Proximal_resistance&gt; 121 &lt;/Proximal_resistance&gt; 
        &lt;Distal_pressure&gt; 0 &lt;/Distal_pressure&gt; 
        &lt;Initial_pressure&gt; 0 &lt;/Initial_pressure&gt; 
      &lt;/RCR_values&gt; 
   <a href="#boundary_condition_parameters">&lt;/Add_BC&gt;</a>

   <a href="#boundary_condition_parameters">&lt;Add_BC name="lumen_wall" &gt;</a>
      &lt;Type&gt; Dirichlet &lt;/Type&gt; 
      &lt;Time_dependence&gt; Steady &lt;/Time_dependence&gt; 
      &lt;Value&gt; 0.0 &lt;/Value&gt; 
   <a href="#boundary_condition_parameters">&lt;/Add_BC&gt;</a>
<a href="#equation_parameters">&lt;/Add_equation&gt;</a>
</div>
&lt;/svFSIFile&gt;
</pre>

<!-- =================================================================== -->
<!-- ======================== Running a Simulation ===================== -->
<!-- =================================================================== -->

<h2 id="run_run_simulation"> Running a Simulation </h2>
The following steps take place when running the <strong>svfsiplus</strong> executable using N 
processors (cores)
<ul style="list-style-type:disc;">
<li> Read the solver input XML file </li>
<li> Read mesh files </li>
<li> Read any boundary condition data files </li>
<li> Create a directory to store simulation results </li> 
<li> Partition mesh and boundary condition data into N parts and write that data to N files </li>
<li> If running on an HPC cluster then distribute files to MPI processors </li>
<li> Run N svfsiplus programs on the N processors </li>
<li> Step in time writing result and state files to <i>N</i>-procs </li>
</ul>

The svfsiplus program stores state and results files in a directory named, by default, <i>N</i>-procs. 
The default directory name can be changed using the <a href="#gen_Save_results_in_folder"> 
Save_results_in_folder parameter</a>. 

The svfsiplus program can be run on a workstation using
<ul style="list-style-type:disc;">
<li> <a href="#sv-fsi-tool"> SimVascular FSI Tool</a> </li>
<li> Command line in a terminal </li>
</ul>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The size of a finite element mesh needed to accurately represent the vasculature of an anatomical region can be
quite large (millions of elements). Simulations may also require 1000s of time steps to reproduce 
realistic blood flow. Such large complex simulations are typically run on HPC clusters using 10s of processors.

Simulations may be run on a workstation for just a few time steps to verify that the simulation
is setup correctly. 
</div>

<h3> Running a Simulation from the Command Line </h3>
The svfsiplus program located in the <i>svFSIplusPath</i> directory can be run from a terminal window 
on a workstation using the mpiexec command
<pre>
mpiexec -np N svFSIplusPath/svfsiplus solver_input.xml
</pre>
This will run N svfsiplus programs on N cores.

<!-- --------------------------------------------------------- -->
<!-- ------------- Simulation History ------------------------ -->
<!-- --------------------------------------------------------- -->

<h3>Simulation History histor.dat File </h3>
The svfsiplus program creates a text file named <strong>histor.dat</strong> used to store 
the information about how a simulation is progressing. The convergence of nonlinear and
linear numerical algorithms can be used to evaluate the correctness of the solution for
a give time step.

The finite element solution procedure uses an iterative algorithm to create a convergent 
sequence of linear approximations to obtain the approximate solution to a nonlinear problem.
The linear approximation at each nonlinear iteration is solved for the state variables of the 
problem also using iterative algorithms.

A residual is used to measure the error between the approximate and exact solutions to equations. 
Iterative methods seek solutions to equations by systematically minimizing the residual. Convergence 
is assumed when size of the residual is less than a given tolerance. The norm of a residual is a 
scalar measure of the magnitude of the residual. Residual norms are computed for both the nonlinear
and linear problems for each nonlinear iteration. The ratio of residual norms are used to determine
how effective is the solution strategy (.e.g tolerances, number of iterations, preconditioner) used for 
the nonlinear solution.

In the following definitions the term <i>norm</i> will be used to mean the norm of a residual.

The histor.dat file contains 10 columns of information labeled as
<pre>
Eq    N-i    T    dB    Ri/R1    Ri/R0    R/Ri    lsIt    dB    %t
</pre>

<h4>Eq</h4> 
<i>Eq</i> Is a two-character abbreviation name of the equation being solved. <i>Eq</i> can be </li>
<ul style="list-style-type:disc;">
<li> CM - coupled_momentum </li> 
<li> EP - cardiac_electro_physiology </li> 
<li> FS - fluid-solid-interaction </li> 
<li> HF - advection_diffusion </li> 
<li> HS - solid_heat </li> 
<li> LE - linear_elasticity </li> 
<li> MS - mesh </li> 
<li> NS - fluid (Navier-Stokes) </li> 
<li> SH - shell </li> 
<li> SS - stokes </li> 
<li> ST - structural and structural_velocity_pressure</li> 
</ul>

<h4> <i>N</i>-<i>i</i> </h4>
The <i>N</i>-<i>i</i> column shows the current time step <i>N</i> and the nonlinear iteration step <i>i</i>.

<h4> <i>T</i> </h4>
The <i>T</i> column shows the cpu time in seconds counted since the start of the analysis.

<h4> <i>dB</i> </h4>
The <i>dB</i> column shows the logarithm of the residual change. A large negative value means that
the size of the residual is rapidly decreasing. 
<pre>
  norm_ratio = <i>Initial linear system norm</i> / <i>Initial nonlinear norm</i> / <i>First nonlinear iteration norm</i> 
  dB = (20.0 * log10(norm_ratio))
</pre>

<h4> <i>Ri/R1</i> </h4>
The <i>Ri/R1</i> column shows the ratio of linear and nonlinear norms.
<pre>
Ri/R1 = (<i>Initial linear system norm</i> / <i>Initial nonlinear norm</i>) / <i>(First nonlinear iteration norm</i>
</pre>

<h4> <i>Ri/R0</i> </h4>
The <i>Ri/R0</i> column shows the ratio of linear and nonlinear norms.
<pre>
Ri/R0 = <i>Initial linear system norm</i> / <i>Initial nonlinear norm</i> 
</pre>

<h4> <i>R/Ri</i> </h4>
The <i>R/Ri</i> column shows the ratio linear system norms.
<pre>
R/Ri = <i>Final linear system norm</i> / <i>Initial linear system norm</i>
</pre>

<h4> <i>lsIt</i> </h4>
The <i>lsIt</i> column shows the number of iterations used to solve the linear system.

<h4> <i>dB</i> </h4>
The <i>dB</i> column shows the logarithm of the residual change for the linear system.

<h4> <i>%t</i> </h4>
The <i>%t</i> column shows the percentage of cpu time spent in the solution of the linear system.


<h4> Example: Fluid simulation histor.dat file  </h4>
This following text shows the histor.dat file create by a fluid simulation.
<pre>
----------------------------------------------------------------------------
 Eq   N-i     T          dB     Ri/R1     Ri/R0      R/Ri      lsIt dB  %t
----------------------------------------------------------------------------
 NS   1-1  8.960e-01  [   0  1.000e+00  1.000e+00  3.692e-04]  [5  -16  83]
 NS   1-2  1.667e+00  [ -62  7.921e-04  7.921e-04  3.603e-04]  [4  -15  81]
 NS   1-3s 2.460e+00  [-128  3.796e-07  3.796e-07  5.880e-04]  [4  -16  78]
 NS   2-1  3.452e+00  [   0  1.000e+00  3.552e+01  5.392e-04]  [3  -16  49]
 NS   2-2  4.230e+00  [ -65  5.446e-04  1.935e-02  5.010e-04]  [4  -18  81]
 NS   2-3s 5.037e+00  [-128  3.757e-07  1.335e-05  3.266e-04]  [4  -17  78]
</pre>

<ul style="list-style-type:disc;">
<li> This is a simulation with a single fluid equation so the <i>Eq</i> column contains only the 
<strong>NS</strong> equation. </li>

<li>The <i>N-i</i> column shows two time steps with three nonlinear iterations. </li>

<li>The first <i>dB</i> column shows that the nonlinear residual is rapidly decreasing in size for each nonlinear iteration. </li>

<li>All of the ratio of the residual norms <i>Ri/R1, Ri/R0, R/Ri</i> are small for the last nonlinear iteration. </li> 

<li>The <i>lsIt</i> column shows that linear system at each nonlinear step take 5 or less iterations to solve. </li> 

<li>The last <i>dB</i> column shows that the linear system residual is rapidly decreasing in size for each 
nonlinear iteration. </li>

</ul>

<!-- --------------------------------------------------------- -->
<!-- --------------- Simulation Results ---------------------- -->
<!-- --------------------------------------------------------- -->

<h3> Simulation Results </h3>
Simulation state data is stored in binary files named, by default, stFile_<i>T</i>.bin, where <i>T</i> is 
the time step. The default name can be changed using the <a href="#gen_Restart_file_name">Restart_file_name</a> parameter. State data files can be used to restart a simulation from a given state (time step).

Simulation results data is stored in <a href="#appendix_vtk_file_format"> VTK VTU </a> files named, by default, 
result_<i>T</i>.vtu, where <i>T</i> is the time step. The default name can be changed using the 
<a href="#gen_Restart_file_name">Restart_file_name</a> parameter.

<!-- =================================================================== -->
<!-- ====================== Restarting a Simulation ==================== -->
<!-- =================================================================== -->

<h2 id="run_restart_simulation"> Restarting a Simulation </h2>
A simulation can be continued from a previous state using a state data binary file.
The <a href="#gen_Continue_previous_simulation"> Continue_previous_simulation </a> and 
<a href="#gen_Restart_file_name"> Restart_file_name</a> parameters are used to restart the simulation
from a previous state.


