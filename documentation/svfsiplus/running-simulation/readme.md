<br>
<hr class="rounded">

<h2> Running svFSIplus </h2>

This section describes how to set up and run an svFSIplus simulaion. Setting up a simulation requires 
first creating the base files necessary for the definition of the problem mesh, boundary conditions, physics 
and solution parameters.

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

Finite element mesh files are stored in the 
<a href="https://docs.vtk.org/en/latest/"> Visualization Toolkit</a> (VTK) 
<a href="https://docs.vtk.org/en/latest/design_documents/VTKFileFormats.html"> XML file format</a>.

The VTK XML file formats used are
<ul style="list-style-type:disc;">
<li> VTU format - Unstructured grid data used to store problem domains, fiber directions, and initial values. Files use a <strong>.vtu</strong> file extension. </li> 
<li> VTP format - Polygonal data used to store boundary surfaces (faces) and data. Files use a <strong>.vtp</strong> file extension.</li> 
</ul> 

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

<pre>
A VTK VTP finite element mesh surface file contains the following data
<ul style="list-style-type:disc;">
<li> Nodal coordinates - A float array of 2D or 3D points </li> 
<li> Nodal IDs - An integer array of node IDs </li> 
<li> Element connectivity - An integer array of indexes into the nodal coordinates array for each element. These 
indexes range from 0 to <i>number of nodal coordinates</i> - 1.  </li> 
<li> Element IDs - An integer array of element IDs. These IDs identify the element the surface element is from in the domain finite element mesh. </li> 
</ul>
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
<li> Initialize all state variables - <a href="#general_params_Simulation_initialization_file_path"> Simulation_initialization_file_path <a> 
<li> Initialize pressure for an FSI fluid domain - <a href="#mesh_params_Initial_pressures_file_path"> Initial_pressures_file_path<a> 
<li> Initialize velocity for an FSI fluid domain - <a href="#mesh_params_Initial_velocities_file_path"> Initial_velocities_file_path<a> 
</ul>

<!-- =================================================================== -->
<!-- ======================== Boundary Condition Data ================== -->
<!-- =================================================================== -->
<h3 id="run_boundary_conditions"> Boundary Condition Data </h3>
Boundary condition data is used to set the initial values of state variables on the problem domain boundary at 
the start of a simulation. Boundary condition data is typicaly set using an ASCII formatted text file.
However, spatial values for pressure and traction boundary conditions are set using a VTK VTP file. 

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

<h4 id="run_bcs_temporal_values"> Temporal Values Data </h3>
The time-dependent values of a state variable are provided in an ASCII text file with format 
<pre>
<i>NUM_TIME</i>  <i>NUM_MODES</i>  
<i>time_1</i>  <i>value_1</i>
<i>time_2</i>  <i>value_2</i>
...
<i>time_N</i>  <i>value_N</i>
</pre>

where 
<ul style="list-style-type:disc;">
<li> NUM_TIME = number of time steps </li>
<li> NUM_MODES = number of Fourier modes used to smooth the data in time</li>
<li> <i>time_i</i> = ith time value </li>
<li> <i>value_i</i> = value of the state variable at the ith time <i>time_i</i> </li> 
</ul>

<h4 id="run_bcs_temporal_and_spatial_values"> Temporal and Spatial Values Data </h3>

The time-dependent and spatial variation of a state variable are provided in an ASCII text file with format 
<pre>
<i>NUM_DOF</i>  <i>NUM_TIME</i>  <i>NUM_NODES</i>  
<pre>
<i>time_1</i>  
<i>time_2</i> 
...
<i>time_NUM_TIME</i>
</pre>

<pre>
<i>node_1</i>
<i>value_1_1_1</i> <i>value_1_1_2</i> ...  <i>value_1_1_NUM_DOF</i> 
...
<i>value_1_NUM_TIME_1</i> <i>value_1_NUM_TIME_2</i> ...  <i>value_1_NUM_TIME_NUM_DOF</i> 
</pre>
<pre>
<i>node_2</i>
<i>value_2_1_1</i> <i>value_2_1_2</i> ...  <i>value_2_1_NUM_DOF</i> 
...
<i>value_2_NUM_TIME_1</i> <i>value_2_NUM_TIME_2</i> ...  <i>value_2_NUM_TIME_NUM_DOF</i> 
</pre>
...
<pre>
<i>node_NUM_NODES</i>
<i>value_NUM_NODES_1_1</i> <i>value_NUM_NODES_1_2</i> ...  <i>value_NUM_NODES_1_NUM_DOF</i>
...
<i>value_NUM_NODES_NUM_TIME_1</i> <i>value_NUM_NODES_NUM_TIME_2</i> ... <i>value_NUM_NODES_NUM_TIME_NUM_DOF</i>
</pre>
</pre>

where 
<ul style="list-style-type:disc;">
<li> NUM_DOF = number of data degrees of freedom </li>
<li> NUM_TIME = number of time steps </li>
<li> NUM_NODES = number of nodes in the boundary surface </li>
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


<!-- =================================================================== -->
<!-- ======================== Solver Input XML File ==================== -->
<!-- =================================================================== -->

<h3 id="run_solver_input_xml_file"> Solver Input File </h3>



