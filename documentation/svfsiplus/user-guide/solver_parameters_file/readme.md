### Solver Parameter Input File 

The svFSIplus solver reads simulation parameters from a text file in Extensible Markup Language 
<a href="https://en.wikipedia.org/wiki/XML"> (XML) </a> format. The XML file structurally organizes the svFSIplus 
solver parameters and input data (e.g. mesh files) needed to set up and execute a simulation. 

<h4> What is XML </h4>

The XML file is made up of tags, elements and atributes. A tag begins with < and ends with >. 
There are two types of tag
<ul style="list-style-type:disc;">
  <li> start-tag, such as  &ltsection> </li>
  <li> end-tag , such as &lt/section> </li>
</ul>

An XML element is everything from (including) the element's start tag to (including) the element's end tag. 

<pre>
&lt;Tolerance> 0.001 &lt;/Tolerance>;
</pre>

There are three types of elements
<ul style="list-style-type:disc;">
  <li> text </li>
  <li> attributes - name-value pair within a start-tag: name="value" "</li>
  <li> other elements - elements nested within other elements </li>
</ul>

The following XML is an example of these different element types
<pre>
&lt;Add_mesh name="fluid"&gt;

<nobr>
&nbsp;&lt;Mesh_file_path&gt;</a> fluid_mesh.vtu 
&nbsp;&lt;/Mesh_file_path&gt;</a>
<br><br>

&nbsp;&lt;Add_face name="inlet"&gt;<br>
&nbsp;&nbsp;&lt;Face_file_path&gt;</a> inlet.vtp
&lt;/Face_file_path&gt;</a>
<br>
&nbsp;&lt;/Add_face&gt;
<br><br>

<nobr>
&nbsp;&lt;Domain&gt; 1 
&lt;/Domain&gt;
<br>
<nobr>

<br>
<nobr>
&nbsp;&lt;Mesh_scale_factor&gt; 0.1 
&lt;/Mesh_scale_facto&gt;
<br><br>
&lt;/Add_mesh&gt;
</pre>

The above contains 
<ul style="list-style-type:disc;">
  <li> six elements: Add_mesh, Mesh_file_path, Add_face, Face_file_path, Domain and Mesh_scale_factor
  <li> &lt;Add_mesh name="fluid"&gt; has an attibute <strong> name </strong> with value "fluid"</li>
  <li> &lt;Add_mesh name="fluid"&gt; element provides a context for the other elements under it: &lt;Add_face name=inlet&gt 
       associates the face named <strong>inlet</strong> to the mesh named <strong>fluid</strong> </li>
  <li> Mesh_file_path is a text element with text <strong>fluid_mesh.vtu</strong>
  <li> Domain is a text element with text <strong>1</strong>
  <li> Mesh_scale_factor is a text element with text <strong>0.1</strong>
</ul>

For the svFSIplus solver input file the XML elements are the names of the solver parameters.

<h4> The organizaion of the parameter input file </h4>

The parameter input file is organized into six sections used to provide context for the parameters defined under them

<ol>

  <li> <a href="#general_parameters"> &lt;GeneralSimulationParameters> - General Simulation Parameters </a> </li>

  <li> <a href="#mesh_parameters"> &lt;Add_mesh> - Mesh Parameters </a> </li>

  <li> <a href="#equation_parameters"> &lt;Add_equation> - Equation Parameters </a> </li>

  <li> <a href="#liner_solver_parameters"> &lt;LS> - Linear Solver Parameters </a> </li>

  <li> <a href="#output_parameters"> &lt;Output> - Output Parameters </a> </li>

</ol>

The following outlines the basic structure of the parameter input XML file. 

<pre>
<pre>
&lt;<strong>GeneralSimulationParameters</strong>&gt;
[general parameters]
&lt;<strong>/GeneralSimulationParameters</strong>&gt;
</pre>

<pre>
&lt;<strong>Add_mesh</strong> name=<i>mesh_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_n</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;

&lt;<strong>Add_mesh</strong> name=<i>mesh_name_2</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_n</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;
...
&lt;<strong>Add_mesh</strong> name=<i>mesh_name_N</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_M</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;
</pre>

<pre>
&lt;<strong>Add_equation</strong> type=<i>eq_1</i>&gt;
&nbsp;&nbsp;[equation parameters]

&nbsp;&nbsp;&lt;<strong>Domain</strong> id=0</i>&gt;
&nbsp;&nbsp;&lt;<strong>Domain</strong> id=1</i>&gt;
&nbsp;&nbsp;...
&nbsp;&nbsp;&lt;<strong>Domain</strong> id=N</i>&gt;

&nbsp;&nbsp;&lt;<strong>LS</strong> type=<i>ls_type</i>&gt;
&nbsp;&nbsp[linear solver parameters]
&nbsp;&nbsp;&lt;<strong>/LS</strong>&gt;

&nbsp;&nbsp;&lt;<strong>Output</strong> type=<i>output_type</i>&gt;
&nbsp;&nbsp[solver output parmeters]
&nbsp;&nbsp;&lt;<strong>/Output</strong>&gt;

&lt;<strong>/Add_equation</strong>&gt;
</pre>

</pre>

<!-- =================================================== -->
<!-- ========== General Simulation Parameters ========== -->
<!-- =================================================== -->

<h4 id="general_parameters"> General Simulation Parameters </h4>
The General Simulation Parameters section 

<h5>Parameters</h5>

<pre>
&lt;<strong>GeneralSimulationParameters</strong>&gt;
<nobr>
&lt;<a href="#Continue_previous_simulation">Continue_previous_simulation&gt;</a> <i>boolean</i>
&lt;<a href="#Continue_previous_simulation">/Continue_previous_simulation&gt;</a>
<br>

<nobr>
&lt;<a href="#Number_of_spatial_dimensions">Number_of_spatial_dimensions&gt;</a> <i>integer</i>
&lt;<a href="#Number_of_spatial_dimensions">/Number_of_spatial_dimensions&gt;</a>
<br>

<nobr>
&lt;<a href="#Number_of_time_steps">Number_of_time_steps&gt;</a> <i>integer</i>
&lt;<a href="#Number_of_time_steps">/Number_of_time_steps&gt;</a>
<br>

<nobr>
&lt;<a href="#Time_step_size">Time_step_size&gt;</a> <i>real</i>
&lt;<a href="#Time_step_size">/Time_step_size&gt;</a>
<br>

<nobr>
&lt;<a href="#Spectral_radius_of_infinite_time_step">Spectral_radius_of_infinite_time_step&gt;</a> <i>real</i>
&lt;<a href="#Spectral_radius_of_infinite_time_step">/Spectral_radius_of_infinite_time_step&gt;</a>
<br>

<nobr>
&lt;<a href="#Save_results_to_VTK_format">Save_results_to_VTK_format&gt;</a> <i>boolean</i>
&lt;<a href="#Save_results_to_VTK_format">/Save_results_to_VTK_format&gt;</a>
<br>

<nobr>
&lt;<a href="#Name_prefix_of_saved_VTK_files">Name_prefix_of_saved_VTK_files&gt;</a> <i>string</i>
&lt;<a href="#Name_prefix_of_saved_VTK_files">/Name_prefix_of_saved_VTK_files&gt;</a>
<br>

<nobr>
&lt;<a href="#Increment_in_saving_VTK_files">Increment_in_saving_VTK_files&gt;</a> <i>integer</i>
&lt;<a href="#Increment_in_saving_VTK_files">/Increment_in_saving_VTK_files&gt;</a>
<br>

<nobr>
&lt;<a href="#Convert_BIN_to_VTK_format">Convert_BIN_to_VTK_format&gt;</a> <i>boolean</i>
&lt;<a href="#Convert_BIN_to_VTK_format">/Convert_BIN_to_VTK_format&gt;</a>
<br>

<nobr>
&lt;<a href="#Start_saving_after_time_step">Start_saving_after_time_step&gt;</a> <i>integer</i>
&lt;<a href="#Start_saving_after_time_step">/Start_saving_after_time_step&gt;</a>
<br>

<nobr>
&lt;<a href="#Increment_in_saving_restart_files">Increment_in_saving_restart_files&gt;</a> <i>integer</i>
&lt;<a href="#Increment_in_saving_restart_files">/Increment_in_saving_restart_files&gt;</a>
<br>

&lt;<strong>/GeneralSimulationParameters</strong>&gt;
</pre>


<h5> Description </h5>
<section id="Continue_previous_simulation"> Continue_previous_simulation - optional, default=false
<section id="Convert_BIN_to_VTK_format"> Convert_BIN_to_VTK_format - optional, default=false
<section id="Increment_in_saving_restart_files"> Increment_in_saving_restart_files - default=1
<section id="Increment_in_saving_VTK_files"> Increment_in_saving_VTK_files - optional, default=none
<section id="Name_prefix_of_saved_VTK_files"> Name_prefix_of_saved_VTK_files - optional, default=none
<section id="Number_of_spatial_dimensions"> Number_of_spatial_dimensions - 
<section id="Number_of_time_steps"> Number_of_time_steps - 
<section id="Save_results_to_VTK_format"> Save_results_to_VTK_format - optional, default=false
<section id="Spectral_radius_of_infinite_time_step"> Spectral_radius_of_infinite_time_step - optional, default=0.5
<section id="Start_saving_after_time_step"> Start_saving_after_time_step - default=1
<section id="Time_step_size"> Time_step_size - 

<h5>Examples</h5>


<!-- =============================================================== -->
<!-- ========================= Mesh Parameters ===================== -->
<!-- =============================================================== -->

<h4 id="mesh_parameters"> Mesh Parameters </h4>
The Mesh Parameters section of the solver parameters input file is primarily used to identify the finite element 
mesh files used in a simulation.

The &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameter adds a volumetric mesh named <i>mesh_name</i> 
to the simulation. Multiple &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameters can be given
within a solver parameters input file. 

The &lt;<strong>Add_face</strong> name=<i>mesh_face_name</i>&gt; parameters specified under the 
&lt;<strong>Add_mesh</strong>&gt; parameter associates the surface named <i>mesh_face_name</i>
with the volumetric mesh.

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h5>Parameters</h5>

<pre>

&lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt;
<nobr>
&nbsp;&lt;<a href="#Mesh_file_path">Mesh_file_path&gt;</a> <i>string</i>
&nbsp;&lt;<a href="#Mesh_file_path">/Mesh_file_path&gt;</a>
<br><br>

&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh_face_name</i>&gt;<br>
&nbsp;&nbsp;&lt;<a href="#Face_file_path">Face_file_path&gt;</a> <i>string</i>
&lt;<a href="#Face_file_path">/Face_file_path&gt;</a>
<br>
&nbsp;&lt;<strong>/Add_face</strong>&gt;
<br><br>

<nobr>
&nbsp;&lt;<a href="#Mesh_domain">Domain&gt;</a> <i>integer</i>
&lt;<a href="#Mesh_domain">/Domain&gt;</a>
<br>
<nobr>
&nbsp;&lt;<a href="#Domain_file_path">Domain_file_path&gt;</a> <i>string</i>
&lt;<a href="#Domain_file_path">/Domain_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Mesh_scale_factor">Mesh_scale_factor&gt;</a> <i>real</i>
&lt;<a href="#Mesh_scale_factor">/Mesh_scale_facto&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Initial_pressures_file_path">Initial_pressures_file_path&gt;</a> <i>string</i>
&lt;<a href="#Initial_pressures_file_path">/Initial_pressures_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Initial_velocities_file_path">Initial_velocities_file_path&gt;</a> <i>string</i>
&lt;<a href="#Initial_velocities_file_path">/Initial_velocities_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#initial_displacements_file_path">Initial_displacements_file_path&gt;</a> <i>string</i>
&lt;<a href="#initial_displacements_file_path">/Initial_displacements_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Prestress_file_path">Prestress_file_path&gt;</a> <i>string</i>
&lt;<a href="#Prestress_file_path">/Prestress_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Fiber_direction_file_path">Fiber_direction_file_path&gt;</a> <i>string</i>
&lt;<a href="#Fiber_direction_file_path">/Fiber_direction_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Set_mesh_as_fibers">Set_mesh_as_fibers&gt;</a> <i>boolean</i>
&lt;<a href="#Set_mesh_as_fibers">/Set_mesh_as_fibers&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Set_mesh_as_shell">Set_mesh_as_shell&gt;</a> <i>boolean</i>
&lt;<a href="#Set_mesh_as_shell">/Set_mesh_as_shell&gt;</a>
<br><br>

&lt;<strong>/Add_mesh</strong>&gt;
</pre>

<!-- --------------------------------- -->
<!-- ---------- Description ---------- -->
<!-- --------------------------------- -->

<h5> Description </h5>

<pre>
<section id="Domain_file_path"> Domain_file_path (optional) - Load IDs for multiple domains from a VTK VTU file. Domain IDs are assumed to be stored in a VTK Cell data array named DOMAIN_ID.

<section id="Face_file_path"> Face_file_path - The path to a VTK VTP file defining a finite element surface mesh for a face in the simulation.

<section id="Fiber_direction_file_path"> Fiber_direction_file_path (optional) - 

<section id="Initial_displacements_file_path"> Initial_displacements_file_path (optional) - 

<section id="Initial_pressures_file_path"> Initial_pressures_file_path (optional) - 

<section id="Initial_velocities_file_path"> initial_velocities_file_path (optional) - 

<section id="Mesh_domain"> Domain (optional) - 

<section id="Mesh_file_path"> Mesh_file_path - The path to a VTK VTU file defining a finite element volume mesh in the simulation.

<section id="Mesh_scale_factor"> Mesh_scale_factor - optional, default=1.0

<section id="Prestress_file_path"> Prestress_file_path - optional, default=none

<section id="Set_mesh_as_fibers"> Set_mesh_as_fibers - optional, default=false

<section id="Set_mesh_as_shell"> Set_mesh_as_shell - optional, default=false

</pre>

<!-- ========================================================= -->
<!-- ==================== Equation Parameters ================ -->
<!-- ========================================================= -->

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h4 id="equation_parameters"> Equation Parameters </h4>
The Equation Parameters section 

<pre>

&lt;<strong>Add_equation</strong> type=<i>equation_type</i>&gt;
<nobr>
&nbsp;&lt;<a href="#Coupled">Coupled&gt;</a> <i>boolean</i>
&lt;<a href="#Coupled">/Coupled&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Initialize">Initialize&gt;</a> <i>string</i>
&lt;<a href="#Initialize">/Initialize&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Initialize_RCR_from_flow">Initialize_RCR_from_flow&gt;</a> <i>string</i>
&lt;<a href="#Initialize_RCR_from_flow">/Initialize_RCR_from_flo&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Max_iterations">Max_iterations&gt;</a> <i>integer</i>
&lt;<a href="#Max_iterations">/Max_iterations&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Min_iterations">Min_iterations&gt;</a> <i>integer</i>
&lt;<a href="#Min_iterations">/Min_iterations&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Prestress">Prestress&gt;</a> <i>boolean</i>
&lt;<a href="#Prestress">/Prestress&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Tolerance">Tolerance&gt;</a> <i>real</i>
&lt;<a href="#Tolerance">/Tolerance&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Use_taylor_hood_type_basis">Use_taylor_hood_type_basis&gt;</a> <i>boolean</i>
&lt;<a href="#Use_taylor_hood_type_basis">/Use_taylor_hood_type_basis&gt;</a>
<br><br>

&lt;<strong>/Add_equation</strong>&gt;

</pre>

<!-- --------------------------------- -->
<!-- ---------- Description ---------- -->
<!-- --------------------------------- -->

<h5> Description </h5>
<pre>
<section id="Coupled"> Coupled -  

<section id="Initialize"> Initialize (optional) - 

<section id="Initialize_RCR_from_flow"> Initialize_RCR_from_flow (optional) -

<section id="Max_iterations"> Max_iterations (optional, default=1) - The maximum number of iterations used to solve a nonlinear system of equations. 

<section id="Min_iterations"> Min_iterations (optional, default=1) - 

<section id="Prestress"> Prestress (optional) - 

<section id="Tolerance"> Tolerance (optional, default=0.5) - 

<section id="Use_taylor_hood_type_basis"> Use_taylor_hood_type_basis (optional) - 

</pre>


<!-- ==================== Linear Solver Parameters ================ -->

<h4 id="liner_solver_parameters"> Linear Solver Parameters </h4>
The Linear Solver Parameters section 

<!-- ==================== Output Parameters ================ -->

<h4 id="output_parameters"> Output Parameters </h4>
The Linear Solver Parameters section 

