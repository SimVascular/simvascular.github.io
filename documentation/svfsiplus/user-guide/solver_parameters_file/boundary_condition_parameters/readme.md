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

&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Capacitance">Capacitance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Capacitance">/Capacitance&gt;</a>

&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Distal_resistance">Distal_resistance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Distal_resistance">/Distal_resistance&gt;</a>

&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Distal_pressure">Distal_pressure&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Distal_pressure">/Distal_pressure&gt;</a>

&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Initial_pressure">Initial_pressure&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Initial_pressure">/Initial_pressure&gt;</a>

&nbsp;&nbsp;&lt;<a href="#bc_RCR_values_Proximal_resistance">Proximal_resistance&gt;</a> <i>real</i>
&lt;<a href="#bc_RCR_values_Proximal_resistance">/Proximal_resistance&gt;</a>

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

<section id="bc_Apply_along_normal_direction"> Apply_along_normal_direction (optional) - 

<section id="bc_Bct_file_path"> Bct_file_path (optional) - 

<section id="bc_Damping"> Damping (optional) - 

<section id="bc_Distal_pressure"> Distal_pressure (optional) - 

<section id="bc_Effective_direction"> Effective_direction (optional) - 

<section id="bc_Follower_pressure_load"> Follower_pressure_load (optional) - 

<section id="bc_Fourier_coefficients_file_path"> Fourier_coefficients_file_path (optional) - 

<section id="bc_Impose_flux"> Impose_flux (optional) - 

<section id="bc_Impose_on_state_variable_integral"> Impose_on_state_variable_integral (optional) - 

<section id="bc_Initial_displacements_file_path"> Initial_displacements_file_path (optional) - 

<section id="bc_Penalty_parameter"> Penalty_parameter (optional) - 

<section id="bc_Penalty_parameter_normal"> Penalty_parameter_normal (optional) - 

<section id="bc_Penalty_parameter_tangential"> Penalty_parameter_tangential (optional) - 

<section id="bc_Prestress_file_path"> Prestress_file_path (optional) - 

<section id="bc_Profile"> Profile (optional) - 

<section id="bc_Ramp_function"> Ramp_function (optional) - 

<section id="bc_Spatial_profile_file_path"> Spatial_profile_file_path (optional) - 

<section id="bc_Spatial_values_file_path"> Spatial_values_file_path (optional) - The path to the text file containing spatial values. 

<section id="bc_Temporal_and_spatial_values_file_path"> Temporal_and_spatial_values_file_path (optional) - The path to the text file containing temporal and spatial values. 

<section id="bc_Temporal_values_file_path"> Temporal_values_file_path (optional) - The path to the text file containing temporal values. 

<section id="bc_Time_dependence"> Time_dependence (optional, default=steady) - The time dependence of a boundary condition. Permissible values are:
   &middot;general - 
   &middot;spatial - 
   &middot;steady - 
   &middot;unsteady - 

<section id="bc_Traction_values_file_path"> Traction_values_file_path (optional) - The path to the 

<section id="bc_Traction_multiplier"> Traction_multiplier (optional) - 

<section id="bc_Type"> Type - The boundary condition type. Permissible values are:
   &middot;Coupled Momentum - Identifies the face to be treated using the coupled momentum method 
   &middot;Dirichlet 
   &middot;Neumann 
   &middot;Robin 
   &middot;Traction 

<section id="bc_Undeforming_neu_face"> Undeforming_neu_face (optional) - 

<section id="bc_Value"> Value - The value of the state variable. 

<section id="bc_Weakly_applied"> Weakly_applied - 

<section id="bc_Zero_out_perimeter"> Zero_out_perimeter - 

<section id="bc_RCR_values"> RCR_values 
<pre>
  <section id="bc_RCR_values_Capacitance"> Capacitance - 
  <section id="bc_RCR_values_Distal_resistance"> Distal_resistance - 
  <section id="bc_RCR_values_Distal_pressure"> Distal_pressure - 
  <section id="bc_RCR_values_Initial_pressure"> Initial_pressure - 
  <section id="bc_RCR_values_Proximal_resistance"> Proximal_resistance - 
</pre>

</pre>



