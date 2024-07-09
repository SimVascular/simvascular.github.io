<br>
<hr class="rounded">

<h2> Running svFSIplus </h2>

This section describes how to set up and run an svFSIplus simulaion. Setting up a simulation requires 
first creating the base files necessary for the definition of the problem mesh, boundary conditions, 
physics, properties and solution parameters.

<ul style="list-style-type:disc;">

<li> <a href="#run_finite_element_mesh"> Create files storing the finite element mesh </a> </li> 

<li> <a href="#run_initial_conditions"> Create files storing initial condition data </a> </li> 

<li> <a href="#run_boundary_conditions"> Create files storing boundary condition data </a> </li> 

<li> <a href="#run_solver_xml_file"> Create the solver input XML file </a> </li> 

</ul>

Additional files and parameters will be needed for simulations of more complex problems.

<!-- =================================================================== -->
<!-- ========================== Finite Element Mesh ==================== -->
<!-- =================================================================== -->

<h3 id="run_finite_element_mesh"> Finite Element Mesh </h3>

The finite element mesh used in a simulation subdivides a 2D or 3D physical domain of a problem
into a discrete set of cells called elements. A finite element mesh consists of 

<ul style="list-style-type:disc;">
<li> nodal coordinates - coordinate locations in 2D or 3D space representing a physical domain </li>
<li> nodal IDs - global node ID which is unique for each node and which distinguishes it from all other nodes</li>
<li> elements - define a domain in a physical space connected by specifying nodal connectivity (nodel IDs) at the element boundaries </li>
</ul>

Each element in a finite element mesh is defined by its nodal connectivity defining the nodal IDs attached to it.
Element nodal connectivity defines how elements are connected and their nodal coordinates.

A finite element mesh is typically created automatically from a geomatric model using a 
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

<h4 id="run_finite_element_mesh_types"> Element Types </h4>

Element types are classified based on <a href="https://en.wikipedia.org/wiki/Types_of_mesh"> shape </a>
and order. The element order is the number of nodes located on an element edge and in its interior. 
Elements with an order higher than 1 can model curved edges and provide more accurate results.

Higher order elements can additionally be classified as 
<ul style="list-style-type:disc;">
<li> Lagrange - introduces additional nodes (degrees of freedom) within the elements </li>
<li> serendipity - nodes only on the element edges </li>
</ul>

svFSIplus supports the folowing element types

<ul style="list-style-type:disc;">
 <li> <i>line</i> - linear and quadratic </li>
 <li> <i>triangle</i> - linear and quadratic </li>
 <li> <i>quadrilateral</i> - bilinear, serendipity, biquadratic </li>
 <li> <i>tetrahedron </i> - linear and quadratic </li>
 <li> <i>hexahedron </i> - trilinear, quadratic/serendipity, triquadratic </li>
 <li> <i>wedge</i> - linear </li>
</ul>

<h5 id="run_finite_element_mesh_line"> Line Element </h4>

<h5 id="run_finite_element_mesh_triangle"> Triangle Element </h4>

<h5 id="run_finite_element_mesh_quadrilateral"> Quadrilateral Element </h4>

<h5 id="run_finite_element_mesh_tetrahedron"> Tetrahedron Element </h4>

<h5 id="run_finite_element_mesh_hexahedron"> Hexahedron Element </h4>

<h5 id="run_finite_element_mesh_wedge"> Wedge Element </h4>


<!--- -------------------------------------- --->
<!--- ---------- Mesh File Format ---------- --->
<!--- -------------------------------------- --->

<h4 id="run_finite_element_mesh_vtk"> Mesh File Format </h4>
Finite element mesh files are stored using the
<a href="#appendix_vtk_file_format"> Visualization Toolkit (VTK)</a> compressed XML file format.

<h5 id="run_finite_element_mesh_vtk_vtu"> VTK VTU File Format </h4>
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

<h5 id="run_finite_element_mesh_vtk_vtp"> VTK VTP File Format </h4>
<pre>
A VTK VTP finite element mesh surface file contains the following data
<ul style="list-style-type:disc;">
<li> Nodal coordinates - A float array of 2D or 3D points </li> 
<li> Nodal IDs - An integer array of node IDs </li> 
<li> Element connectivity - An integer array of indexes into the nodal coordinates array for each element. These 
indexes range from 0 to <i>number of nodal coordinates</i> - 1.  </li> 
<li> Element IDs - An integer array of element IDs. These IDs identify the element the surface element is from in the domain finite element mesh. </li> 
</ul>
VTP files can also store float data used to set the values of certain boundary conidtions. 
</pre>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Finite element mesh files are automatically created by the <a href="#sv-fsi-tool"> SimVascular FSI Tool</a>.
</div>

<!-- =================================================================== -->
<!-- ======================== Initial Condition Data =================== -->
<!-- =================================================================== -->

<h3 id="run_initial_conditions"> Initial Condition Data </h3>
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
<h3 id="run_boundary_conditions"> Boundary Condition Data </h3>
Boundary condition data is used to set the initial values of state variables on the problem domain boundary at 
the start of a simulation. Boundary condition data is typicaly set using an ASCII formatted text file.
However, spatial values for pressure and traction boundary conditions are set using a 
a <a href="#run_finite_element_mesh_vtk_vtp"> VTK VTP </a> file. 

<!-- ------------------------------------------------------ -->
<!-- ------------------- Spatial Profile Data ------------- -->
<!-- ------------------------------------------------------ -->

<h4 id="run_bcs_spatial_profile"> Spatial Profile Data </h3>
The shape of user-defined velocty profile can be given in an ASCII text file. The format of the file is
<pre>
<i>node_id_1</i>  <i>value_1</i>
<i>node_id_2</i>  <i>value_2</i>
...
<i>node_id_N</i>  <i>value_N</i>
</pre>

where <i>node_id</i> is an integer ID for a node on the boundary surface and <i>value</i> is the 
spatial dependant profile vector data for that node.

The following <i>solver input file keyword</i> is used to set the spatial profile 
boundary condition file name
<ul style="list-style-type:disc;">
<li> <a href="#bc_Spatial_values_file"> Spatial_values_file <a> 
</ul>

<!-- ------------------------------------------------------ -->
<!-- ------------------- Temporal Values Data ------------- -->
<!-- ------------------------------------------------------ -->

<h4 id="run_bcs_temporal_values"> Temporal Values Data </h3>
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

<h4 id="run_bcs_temporal_and_spatial_values"> Temporal and Spatial Values Data </h3>

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

<h4 id="run_bcs_spatial_values_data"> Spatial Values Data </h3>
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

<h4 id="run_bcs_cmm_values_data"> Coupled Momentum Method (CMM) Values Data </h3>
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

<h3 id="run_simulation_output"> Simulation Results Output </h3>
svFSIplus can write simulation results in the following file formats 
<ul style="list-style-type:disc;">
<li> Binary results restart file - Custom format used to store state variables and mesh data. 
Can be used to continue a simulation from a previous state.  Uses <strong>.bin</strong></i> file extension.  </li>
<li> <a href="#appendix_vtk_file_format"> VTK VTU</a> format file - Custom format used to store state variables and mesh data.  Used for results visualization.  Uses <strong>.vtu</strong> </i> file extension. </li>
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
<!-- ======================== Solver Input XML File ==================== -->
<!-- =================================================================== -->

<h3 id="run_solver_input_xml_file"> Creating a Solver Input File </h3>
A <a href="#solver_input_file"> basic solver input XML file </a> is created by adding the
<a href="#general_parameters">General Simulation</a> 
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

<h4> Example solver input file for a fluid simulation </h4>
An example of solver input file for a fluid simulation is given below. The simulation

<ul style="list-style-type:disc;">
<li> Single domain named <strong>fluid_domain</strong> </li> 
<li> Three faces named
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

<h3 id="run_run_simulation"> Running a Simulation </h3>

<!-- =================================================================== -->
<!-- ======================== Restarting a Simulation ===================== -->
<!-- =================================================================== -->

<h3 id="run_restart_simulation"> Restarting a Simulation </h3>



