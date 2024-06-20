<!-- =================================================================== -->
<!-- ==================== Boundary Condition Parameters ================ -->
<!-- =================================================================== -->

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h4 id="boundary_condition_parameters"> Boundary Condition Parameters </h4>
The Boundary Condition Parameters section of the solver parameters input file adds boundary conditions to a simulation.
A boundary condition is set on a mesh face (surface) using a face name added to the simulation using the 
&lt;<strong>Add_face</strong> parameter. 

The &lt;<strong>Add_BC</strong> name=<i>face_name</i>&gt; parameter adds a boundary condition to the enclosing equation.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Some forms of boundary conditions only apply to certain equations.
</div>

The &lt;<strong>Add_BC</strong> parameter section contains the following nested parameter sections
<ul style="list-style-type:disc;">
  <li> &lt;RCR_values> - </a> </li>
</ul>

<h5> Boundary condition types </h5>
<div style="background-color: #F0F0F0; padding: 8px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">

<h6 id="coupled_momemtum_bc"> Coupled momentum boundary condition </h6>
The coupled momentum boundary condition identifies the face to be treated using coupled momentum method.

<h6 id="Dirichlet_bc"> Dirichlet boundary condition </h6>
The Dirichlet boundary condition sets the values of a state variable on a face. A state variable
refers to the unknown of the equation that is being solved for. For example, velocity is the state 
variable for a fluid equation.

The following lists the state variable set for each type of equation
<ul style="list-style-type:disc;">
  <li> velocity - stokes, fluid, structural_velocity_pressure, coupled_momentum, fluid-solid-interaction </li>
  <li> displacement - linear_elasticity, structural, shell, mesh   </li>
  <li> temperature - advection_diffusion, solid_heat </li>
  <li> action_potential - cardiac_electro_physiology </li>
</ul>

<h6 id="Neumann_bc"> Neumann boundary condition </h6>
The Neumann boundary condition imposes a normal force on the face.

<h6 id="Robin_bc"> Robin boundary condition </h6>
The Robin boundary condition applies a force to a face. The force is represented as a spring-mass-damper system.

<h6 id="Traction_bc"> Traction boundary condition </h6>
The Traction boundary condition applies a force on a face. The force can be along any direction.
</div>

<h5 id="temporal_spatial_distribution_bc"> Temporal and spatial values for boundary conditions </h5>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
A spatial distribution of values is used for only Neumann or Traction boundary condition types to specify
a spatially varying load (pressure/traction). The values are stored as nodel values for a face in a VTK VTP format file.

A temporal distribution specifies the time-dependent values of a state variable. The values are stored as the value of 
a state variable integrated over a face stored in a text file.

A temporal and spatial distribution specifies time-dependent values for each node in a face. The values are stored
in a text file.

</div>



<br>
<h5> Parameters </h5>

<div style="background-color: #F0F0F0; padding: 8px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">

&lt;<strong>Add_BC</strong> name=<i>bc_name</i>&gt; 
<br>

<nobr>
&nbsp;&lt;<a href="#bc_Apply_along_normal_direction">Apply_along_normal_direction&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Apply_along_normal_direction">/Apply_along_normal_direction&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Bct_file_path">Bct_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Bct_file_path">/Bct_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Damping">Damping&gt;</a> <i>real</i>
&lt;<a href="#bc_Damping">/Damping&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Distal_pressure">Distal_pressure&gt;</a> <i>real</i>
&lt;<a href="#bc_Distal_pressure">/Distal_pressure&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Effective_direction">Effective_direction&gt;</a> <i>real vector</i>
&lt;<a href="#bc_Effective_direction">/Effective_direction&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Follower_pressure_load">Follower_pressure_load&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Follower_pressure_load">/Follower_pressure_load&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Fourier_coefficients_file_path">Fourier_coefficients_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Fourier_coefficients_file_path">/Fourier_coefficients_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Impose_flux">Impose_flux&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Impose_flux">/Impose_flux&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Impose_on_state_variable_integral">Impose_on_state_variable_integral&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Impose_on_state_variable_integral">/Impose_on_state_variable_integral&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Initial_displacements_file_path">Initial_displacements_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Initial_displacements_file_path">/Initial_displacements_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Penalty_parameter">Penalty_parameter&gt;</a> <i>real</i>
&lt;<a href="#bc_Penalty_parameter">/Penalty_parameter&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Penalty_parameter_normal">Penalty_parameter_normal&gt;</a> <i>real</i>
&lt;<a href="#bc_Penalty_parameter_normal">/Penalty_parameter_normal&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Penalty_parameter_tangential">Penalty_parameter_tangential&gt;</a> <i>real</i>
&lt;<a href="#bc_Penalty_parameter_tangential">/Penalty_parameter_tangential&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Prestress_file_path">Prestress_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Prestress_file_path">/Prestress_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Profile">Profile&gt;</a> <i>string</i>
&lt;<a href="#bc_Profile">/Profile&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Ramp_function">Ramp_function&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Ramp_function">/Ramp_function&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_RCR_values">RCR_values&gt;</a>

<div style="background-color: #E0E0E0; padding: 1px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">

&nbsp;&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Capacitance">Capacitance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Capacitance">/Capacitance&gt;</a>

&nbsp;&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Distal_resistance">Distal_resistance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Distal_resistance">/Distal_resistance&gt;</a>

&nbsp;&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Distal_pressure">Distal_pressure&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Distal_pressure">/Distal_pressure&gt;</a>

&nbsp;&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Initial_pressure">Initial_pressure&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Initial_pressure">/Initial_pressure&gt;</a>

&nbsp;&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Proximal_resistance">Proximal_resistance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Proximal_resistance">/Proximal_resistance&gt;</a>
</div>

&lt;<a href="#bc_RCR_values">/RCR_values&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Spatial_profile_file_path">Spatial_profile_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Spatial_profile_file_path">/Spatial_profile_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Spatial_values_file_path">Spatial_values_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Spatial_values_file_path">/Spatial_values_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Stiffness">Stiffness&gt;</a> <i>real</i>
&lt;<a href="#bc_Stiffness">/Stiffness&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Temporal_and_spatial_values_file_path">Temporal_and_spatial_values_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Temporal_and_spatial_values_file_path">/Temporal_and_spatial_values_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Temporal_values_file_path">Temporal_values_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Temporal_values_file_path>/Temporal_values_file_path&gt;</a>

<nobr>
&nbsp;&lt;<a href="#bc_Time_dependence">Time_dependence&gt;</a> <i>string</i>
&lt;<a href="#bc_Time_dependence">/Time_dependence&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Traction_values_file_path">Traction_values_file_path&gt;</a> <i>string</i>
&lt;<a href="#bc_Traction_values_file_path">/Traction_values_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Traction_multiplier">Traction_multiplier&gt;</a> <i>real</i>
&lt;<a href="#bc_Traction_multiplier">/Traction_multiplier&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Type">Type&gt;</a> <i>string</i>
&lt;<a href="#bc_Type">/Type&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Undeforming_neu_face">Undeforming_neu_face&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Undeforming_neu_face">/Undeforming_neu_face&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Value">Value&gt;</a> <i>real</i>
&lt;<a href="#bc_Value">/Value&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Weakly_applied">Weakly_applied&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Weakly_applied">/Weakly_applied&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#bc_Zero_out_perimeter">Zero_out_perimeter&gt;</a> <i>boolean</i>
&lt;<a href="#bc_Zero_out_perimeter">/Zero_out_perimeter&gt;</a>
<br><br>

&lt;<strong>/Add_BC</strong>&gt;
</div>

<!-- --------------------------------- -->
<!-- ---------- Description ---------- -->
<!-- --------------------------------- -->

<h5> Description </h5>

<pre>

<section id="bc_Apply_along_normal_direction"> Apply_along_normal_direction (Robin, optional) - If true then when the Robin BC is applied along the normal direction the applied surface traction takes the form sigma.n = -(k u.n + c v.n - p)n

<section id="bc_Bct_file_path"> Bct_file_path (optional) - Load a file used to set the spatial and temporal values for a boundary condition. The file can be a VTK VTP-format file or a text file. 

<section id="bc_Damping"> Damping (Robin) - The damping constant for the spring-mass-damper force used to implement a Robin boundary condition.

<section id="bc_Distal_pressure"> Distal_pressure (Neumann, default=0.0) - The distal pressure used to initialize an RCR boundary condition.

<section id="bc_Effective_direction"> Effective_direction (Dirichlet, optional) - Enforce a Dirichlet boundary condition along a given Cartesian coordinate 3-vector. The vector has the form (x,y,z).

<section id="bc_Follower_pressure_load"> Follower_pressure_load (Neumann, default=false) - If true then the applied load <i>follows</i> the mesh deformation. This implies that the magnitude of the load is proportional to the surface area during the deformation.

<section id="bc_Fourier_coefficients_file_path"> Fourier_coefficients_file_path (Neumann, optional) - A text file containing the Fourier coefficients interpolating a time-dependent state variable.

<section id="bc_Impose_flux"> Impose_flux (default=false) - If true then normalize the spatial profile with the area of the face so that the imposed flux value is converted into the state variable.

<section id="bc_Impose_on_state_variable_integral"> Impose_on_state_variable_integral (default=false) - If true then used for applying a Dirichlet boundary condition on the displacement degrees of freedom when velocity is the state variable (e.g. fluid, CMM, FSI).

<section id="bc_Initial_displacements_file_path"> Initial_displacements_file_path (CMM, optional) - Use the VTK VTP-format file to initialize CMM using an inflation method resulting from a diastolic or time-averaged fluid traction.

<section id="bc_Penalty_parameter"> Penalty_parameter (optional) - If the Poisson ratio for a given case is close to 0.5, then calculated bulk modulus used for dilational penalty model can be extremely high leading to poor linear solver convergence. The users may then override the physical bulk modulus with a penalty constant sufficiently large enough for the linear solver to converge.

<section id="bc_Penalty_parameter_normal"> Penalty_parameter_normal (Dirichlet, optional) - If true then if the Dirichlet boundary condition is weakly applied then it is applied in a normal direction.

<section id="bc_Penalty_parameter_tangential"> Penalty_parameter_tangential (optional) - If true then if the Dirichlet boundary condition is weakly applied then it is applied in a tangential direction.

<section id="bc_Prestress_file_path"> Prestress_file_path (CMM, optional) - Use the VTK VTP-format file to initialize CMM using a prestressed wall under equilibrium with fluid traction.

<section id="bc_Profile"> Profile (default=flat) - Set the spatial distribution of a state varible on the face. Acceptable values: Flat, Parabolic or User_defined

<section id="bc_Ramp_function"> Ramp_function (default=false) - If true then the first two entries in the file setting an unsteady boundary is used to linearly increment from the first value to the second value, and maintains a steady value thereafter.

<section id="bc_Spatial_profile_file_path"> Spatial_profile_file_path (optional) - Use the given text file to set the spatial distribution of a state varible for a User_defined profile.

<section id="bc_Spatial_values_file_path"> Spatial_values_file_path (optional) - The path to the VTK VTU-format file used to set the spatially varying body force to a face. 

<section id="bc_Temporal_and_spatial_values_file_path"> Temporal_and_spatial_values_file_path (optional) - The path to the text file containing temporal and spatial values. 

<section id="bc_Temporal_values_file_path"> Temporal_values_file_path (optional) - The path to the text file containing temporal values. 

<section id="bc_Time_dependence"> Time_dependence (default=steady) - The time dependence of a boundary condition. Permissible values are:
   &middot;general - Spatial and temporal variations are provided from a file
   &middot;spatial - Spatially varying values 
   &middot;steady - A constant value is imposed 
   &middot;unsteady - Time-dependent values are provide from a file 

<section id="bc_Traction_values_file_path"> Traction_values_file_path (Traction, optional) - TThe path to the VTK VTP-format file containing nodally varying traction values. 

<section id="bc_Traction_multiplier"> Traction_multiplier (Traction, default=1.0) - The value used to scale the traction values read from from a file.

<section id="bc_Type"> Type - The boundary condition type. Permissible values are:
   &middot;Coupled Momentum - Identifies the face to be treated using the coupled momentum method 
   &middot;Dirichlet - Identifies the face to be treated as a Dirichlet boundary condition
   &middot;Neumann - Identifies the face to be treated as a Neumann boundary condition
   &middot;Robin - Identifies the face to be treated as a Robin boundary condition
   &middot;Traction - Identifies the face to be treated as a Traction boundary condition

<section id="bc_Undeforming_neu_face"> Undeforming_neu_face (Neumann, optional) - If true then mimic clamped condition on a specimen routinely done in experiments. Clamping will not allow the surface, on which the load is applied, to deform. Used only for nonlinear elastodynamics.

<section id="bc_Value"> Value - The value of the state variable. 

<section id="bc_Weakly_applied"> Weakly_applied (Dirichlet, optional) - If true then the Dirichlet boundary condition is applied weakly using augmented Lagrange-multiplier formulation. This setting is applied to fluid/FSI equations only.

<section id="bc_Zero_out_perimeter"> Zero_out_perimeter (Dirichlet, default=true) - If true then the solver will zero out the nodes shared by two adjacent faces.

<section id="bc_RCR_values"> RCR_values 
<pre>
  <section id="bc_RCR_values_Capacitance"> Capacitance - compliance/capacitance.
  <section id="bc_RCR_values_Distal_resistance"> Distal_resistance - distal resistance
  <section id="bc_RCR_values_Distal_pressure"> Distal_pressure - The distal pressure used to initialize an RCR boundary condition.
 
  <section id="bc_RCR_values_Initial_pressure"> Initial_pressure - The initial pressure used to initialize an RCR boundary condition.

  <section id="bc_RCR_values_Proximal_resistance"> Proximal_resistance - proximal resistance
</pre>

</pre>



