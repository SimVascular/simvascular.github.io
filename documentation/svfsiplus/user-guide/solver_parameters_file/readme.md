### Solver Parameter Input File 

The svFSIplus solver reads simulation parameters from a text file in Extensible Markup Language 
<a href="https://en.wikipedia.org/wiki/XML"> (XML) </a> format. The XML file structurally organizes the svFSIplus 
solver parameters and input data (e.g. mesh files) needed to set up and execute a simulation. 

<h4> What is XML </h4>

The XML format is made up of tags, elements and atributes. A tag begins with < and ends with >. 
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

<!-- ================================================================================= -->
<!-- ============================== How svFSIplus uses XML =========================== -->
<!-- ================================================================================= -->

<h4> How svFSIplus uses XML </h4>

For the svFSIplus solver input file the XML elements are used as the names of the solver parameters.

svFSIplus defines for each parameter 
<ul style="list-style-type:disc;">
  <li> Name - Case sensitive with the first letter capitalized </li> 
  <li> Data type 
   <ul style="list-style-type:square;">
     <li> boolean - on, off </li>
     <li> integer - numeric with no decimal </li>
     <li> string - a contiguous list of characters </li>
     <li> real - numeric with decimal or scientific notation </li>
   </ul>
  <li> Context - parameters can only be found within the context of another parameter </li> 
</ul>

If a value for a parameter is not valid svFSIplus will display an error message indicating where in the file the error occured. 

Some parameters are optional. There are two types of optional parameters 
<ul style="list-style-type:disc;">
  <li> Used if not set - a default value is used 
  <li> Not used if not set - no default value 
</ul>

<!-- ================================================================================================== -->
<!-- ============================== organizaion of the parameter input file =========================== -->
<!-- ================================================================================================== -->

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
The General Simulation Parameters section contains the basic parameters used to setup the simulation
<ul style="list-style-type:disc;">
  <li> spatial dimension </li> 
  <li> time step control </li>
  <li> results output </li>
</ul>

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

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
<pre>
<section id="Continue_previous_simulation"> Continue_previous_simulation (optional) - If set to true this will restart the simulation with a restart file generated by svFSIplus.

<section id="Convert_BIN_to_VTK_format"> Convert_BIN_to_VTK_format (optional) - If set to true all available restart files will be convert to VTK format files.

<section id="Increment_in_saving_restart_files"> Increment_in_saving_restart_files (optional,  default=10) - Indicates how often to save restart files.

<section id="Increment_in_saving_VTK_files"> Increment_in_saving_VTK_files (optional) - Indicates how often to save simulation results to a VTK-format file. 

<section id="Name_prefix_of_saved_VTK_files"> Name_prefix_of_saved_VTK_files (optional, default=result) - The name prefixed to a the file name when saving simulation results to VTK-format files.

<section id="Number_of_spatial_dimensions"> Number_of_spatial_dimensions - The number of spatial dimensions the simulation is using. Can be 2 or 3.

<section id="Number_of_time_steps"> Number_of_time_steps - The number of time steps to run the simulation.

<section id="Save_results_to_VTK_format"> Save_results_to_VTK_format (optional) - If true then save simulation results to VTK-format files. 

<section id="Spectral_radius_of_infinite_time_step"> Spectral_radius_of_infinite_time_step (optional, default=0.5) - The spectral radius is used to compute parameters for the generalized alpha method. A value of 0.0 leads to an over-damped system while 1.0 leads to an undamped system. 

<section id="Start_saving_after_time_step"> Start_saving_after_time_step (optional, default=1) - Save simulation results after the given time step.

<section id="Time_step_size"> Time_step_size - The value use to increment the simulation time.
</pre>

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
The Equation Parameters section section of the solver parameters input file defines the properties of an equation
<ul style="list-style-type:disc;">
  <li> physics - fluid, structure, electrophysiology, etc. </li>
  <li> domains </li>
  <li> linear solver </li>
  <li> boundary conditions </li>
  <li> simulation results to output </li>
</ul>

The &lt;<strong>Add_equation</strong> type=<i>equation_type</i>&gt; parameter adds an equation of type <i>equation_type</i>
to the simulation. Multiple &lt;<strong>Add_equation</strong> type=<i>equation_type</i>&gt; parameters can be given
within a solver parameters input file.

The value of <i>equation_type</i> can be 
<ul style="list-style-type:disc;">
  <li> "advection_diffusion" - unsteady advection-diffusion   </li>
  <li> "cardiac_electro_physiology" - solves the mono-domain model of cardiac electrophysiology</li>
  <li> "coupled_momentum" - coupled momentum method for fluid-structure interaction </li>
  <li> "fluid" - Navier-Stokes equations for unsteady viscous incompressible fluid flow </li>
  <li> "fluid-solid-interaction" - fluid-solid interaction using the arbitrary Lagrangian-Eulerian (ALE) formulation</li>
  <li> "linear_elasticity" - linear elastodynamics equation </li>
  <li> "mesh" - solves a modified linear elasticity equation for mesh motion in an fluid-solid interaction simulation </li>
  <li> "shell" - nonlinear thin shell mechanics (Kirchhoff-Love theory) </li>
  <li> "solid_heat" - unsteady diffusion equation </li>
  <li> "stokes" - unsteady Stokes equations </li>
  <li> "structural" - nonlinear elastodynamics equation </li>


</ul>


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
<section id="Coupled"> Coupled (optional, default=true) - If true then the convergence of a multi-equation system of equations is coupled: nonlinear iterations are performed within each time step on all the coupled system of equations until convergence is achieved.  
    If false then the convergence of each equation is uncoupled and is achieved separately within each time step.

<section id="Initialize"> Initialize (optional) - Initialize the CMM equation. 
   Permissible values are 
   &middot;inflate - 
   &middot;prestress - 

<section id="Initialize_RCR_from_flow"> Initialize_RCR_from_flow (optional) - If true then initialize RCR from flow data.

<section id="Max_iterations"> Max_iterations (optional, default=1) - The maximum number of iterations used to solve a nonlinear system of equations. 

<section id="Min_iterations"> Min_iterations (optional, default=1) - The minimum number of iterations used to solve a nonlinear system of equations. 

<section id="Prestress"> Prestress (optional) - If true then enable prestressing a solid domain to mimic physiological conditions. Valid for linear elastic and structural equations only.

<section id="Tolerance"> Tolerance (optional, default=0.5) - The solution of a nonlinear system of equations is considered to be converged (solved) if the nonlinear residual is less than this value.

<section id="Use_taylor_hood_type_basis"> Use_taylor_hood_type_basis (optional) - If true then use a Taylor-Hood element pair for increassed stability.

</pre>


<!-- ==================== Linear Solver Parameters ================ -->

<h4 id="liner_solver_parameters"> Linear Solver Parameters </h4>
The Linear Solver Parameters section 

<!-- ==================== Output Parameters ================ -->

<h4 id="output_parameters"> Output Parameters </h4>
The Linear Solver Parameters section 

