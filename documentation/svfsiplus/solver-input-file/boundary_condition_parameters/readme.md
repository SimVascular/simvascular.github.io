<!-- =================================================================== -->
<!-- ==================== Boundary Condition Parameters ================ -->
<!-- =================================================================== -->

<h4 id="boundary_condition_parameters"> Boundary Condition Parameters </h4>
The Boundary Condition Parameters section of the solver parameters input file adds boundary conditions to a simulation.
A boundary condition is set on a mesh face (surface) using a face name added to the simulation using the 
&lt;<strong>Add_face</strong> parameter. 

The Boundary Condition Parameters section is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Add_BC</strong> name=<i>face_name</i>&gt;
<br><br>
[Boundary Condition Parameter]
<br><br>
&lt;<strong>RCR_values</strong>&gt;<br>
[<a href="#rcr_boundary_condition_parameters"> RCR Parameters </a> ]
<br>
&lt;<strong>RCR_values</strong>&gt;<br>
<br>
&lt;<strong>Add_BC</strong>&gt;
</div>

The &lt;<strong>Add_BC</strong> name=<i>face_name</i>&gt; parameter adds a boundary condition to the enclosing equation.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Some forms of boundary conditions only apply to certain equations.
</div>

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
a spatially varying load (pressure/traction). The values are stored as nodal values for a face in a VTK VTP format file.

A temporal distribution specifies the time-dependent values of a state variable. The values are stored as the value of 
a state variable integrated over a face stored in a text file.

A temporal and spatial distribution specifies time-dependent values for each node in a face. The values are stored
in a text file.

</div>

<!-- ---------- G e n e r a l  P a r a m e t e r s ---------- -->
<br>
<h5> General Parameters </h5>
<div class="bc_param_div">
<strong>&lt;Bct_file_path&gt;</strong> <i>string</i> [none]  <nobr> 
<strong>&lt;/Bct_file_path&gt;</strong>
</nobr><br>
Load a file used to set the spatial and temporal values for a boundary condition. The file can be a VTK VTP-format file or a text file. 
<br>
<strong>&lt;Impose_flux&gt;</strong> <i>boolean</i> [<i>false</i>]  <nobr> 
<strong>&lt;/Impose_flux&gt;</strong>
</nobr><br>
If <i>true</i> then normalize the spatial profile with the area of the face so that the imposed flux value is converted into the state variable.
<br>
<strong>&lt;Impose_on_state_variable_integral&gt;</strong> <i>boolean</i> [<i>false</i>]  <nobr> 
<strong>&lt;/Impose_on_state_variable_integral&gt;</strong>
</nobr><br>
If <i>true</i> then used for applying a Dirichlet boundary condition on the displacement degrees of freedom when velocity is the state variable (e.g. fluid, CMM, FSI).
<br>
<section id="bc_Initial_displacements_file_path">
<strong>&lt;Initial_displacements_file_path&gt;</strong> <i>string</i> [<i>none/]  <nobr> 
<strong>&lt;/Initial_displacements_file_path&gt;</strong>
</nobr><br>
Use the VTK VTU-format file to initialize CMM using an inflation method resulting from a diastolic or time-averaged fluid traction.
<br>
<strong>&lt;Penalty_parameter&gt;</strong> <i>real</i> [0.0]  <nobr> 
<strong>&lt;/Penalty_parameter&gt;</strong>
</nobr><br> 
If the Poisson ratio for a given case is close to 0.5, then calculated bulk modulus used for dilational penalty model can be extremely high leading to poor linear solver convergence. The users may then override the physical bulk modulus with a penalty constant sufficiently large enough for the linear solver to converge.
<br>
<section id="bc_Prestress_file_path">
<strong>&lt;Prestress_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Prestress_file_path&gt;</strong>
</nobr><br>
Use the VTK VTP-format file to initialize CMM using a prestressed wall under equilibrium with fluid traction.
<br>
<section id="bc_Profile">
<strong>&lt;Profile&gt;</strong> <i>string</i> [flat]  <nobr> 
<strong>&lt;/Profile&gt;</strong>
</nobr><br>
Set the spatial distribution of a state variable on the face. Acceptable values: Flat, Parabolic or User_defined
<br>
<strong>&lt;Ramp_function&gt;</strong> <i>boolean</i> [<i>false</i>]  <nobr> 
<strong>&lt;/Ramp_function&gt;</strong>
</nobr><br>
If <i>true</i> then the first two entries in the file setting an unsteady boundary is used to linearly increment from the first value to the second value, and maintains a steady value thereafter.
<br>
<section id="bc_Spatial_profile_file_path">
<strong>&lt;Spatial_profile_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Spatial_profile_file_path&gt;</strong>
</nobr><br>
Use the given text file to set the spatial distribution of a state variable for a User_defined profile.
<br>
<section id="bc_Spatial_values_file">
<strong>&lt;Spatial_values_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Spatial_values_file_path&gt;</strong>
</nobr><br>
The path to the VTK VTP-format file used to set the spatially varying body force to a face.
<br>
<section id="bc_Temporal_and_spatial_values_file_path">
<strong>&lt;Temporal_and_spatial_values_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Temporal_and_spatial_values_file_path&gt;</strong>
</nobr><br>
The path to the text file containing temporal and spatial values. 
<br>
<section id="bc_Temporal_values_file_path">
<strong>&lt;Temporal_values_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Temporal_values_file_path&gt;</strong>
</nobr><br>
The path to the text file containing temporal values.
<br>
<strong>&lt;Time_dependence&gt;</strong> <i>string</i> [steady]  <nobr> 
<strong>&lt;/Time_dependence&gt;</strong>
</nobr><br>
The time dependence of a boundary condition. Permissible values are:
   &middot;general - Spatial and temporal variations are provided from a file
   &middot;spatial - Spatially varying values
   &middot;steady - A constant value is imposed
   &middot;unsteady - Time-dependent values are provide from a file
<br>
<strong>&lt;Traction_values_file_path&gt;</strong> <i>string</i> [<i>none</i>]  <nobr> 
<strong>&lt;/Traction_values_file_path&gt;</strong>
</nobr><br>
The path to the VTK VTP-format file containing nodally varying traction values.
<br>
<strong>&lt;Traction_multiplier&gt;</strong> <i>real</i> [1.0]  <nobr> 
<strong>&lt;/Traction_multiplier&gt;</strong>
</nobr><br>
The value used to scale the traction values read from from a file.
<br>
<strong>&lt;Type&gt;</strong> <i>string</i> <nobr> 
<strong>&lt;/Type&gt;</strong>
</nobr><br>
The boundary condition type. Permissible values are:
   &middot;Coupled Momentum - Identifies the face to be treated using the coupled momentum method
   &middot;Dirichlet - Identifies the face to be treated as a Dirichlet boundary condition
   &middot;Neumann - Identifies the face to be treated as a Neumann boundary condition
   &middot;Robin - Identifies the face to be treated as a Robin boundary condition
   &middot;Traction - Identifies the face to be treated as a Traction boundary condition
<br>
<strong>&lt;Value&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Value&gt;</strong>
</nobr><br>
The value of the state variable.
<br>
</div>

<!-- ---------- R C R  P a r a m e t e r s ---------- -->

<h5 id="rcr_boundary_condition_parameters"> RCR Boundary Condition Parameters </h5>
<div class="bc_param_div">
<strong>&lt;RCR_values&gt;</strong><br>
<strong>&lt;Capacitance&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Capacitance&gt;</strong>
</nobr><br>
Capacitance. 
<br>
<strong>&lt;Distal_resistance&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Distal_resistance&gt;</strong>
</nobr><br>
Distal resistance. 
<br>
<strong>&lt;Distal_pressure&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Distal_pressure&gt;</strong>
</nobr><br>
The distal pressure used to initialize an RCR boundary condition.
<br>
<strong>&lt;Initial_pressure&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Initial_pressure&gt;</strong>
</nobr><br>
The initial pressure used to initialize an RCR boundary condition.
<br>
<strong>&lt;Proximal_resistance&gt;</strong> <i>real</i> <nobr> 
<strong>&lt;/Proximal_resistance&gt;</strong>
</nobr><br>
Proximal resistance. 
<br>
<strong>&lt;/RCR_values&gt;</strong>
</div>

<!-- ---------- D i r i ch l e t  P a r a m e t e r s ---------- -->

<h5> Dirichlet Boundary Condition Parameters </h5>
<div class="bc_param_div">
<strong>&lt;Effective_direction&gt;</strong> vector [none]  <nobr> 
<strong>&lt;/Effective_direction&gt;</strong>
</nobr><br>
Enforce a Dirichlet boundary condition along a given Cartesian coordinate 3-vector. The vector has the form (x,y,z).
<br>
<strong>&lt;Penalty_parameter_normal&gt;</strong> real [0.0]  <nobr> 
<strong>&lt;/Penalty_parameter_normal&gt;</strong>
</nobr><br>
If the Dirichlet boundary condition is weakly applied then it is applied in a normal direction.
<br>
<strong>&lt;Penalty_parameter_tangential&gt;</strong> real [0.0]  <nobr> 
<strong>&lt;/Penalty_parameter_tangential&gt;</strong>
</nobr><br>
If the Dirichlet boundary condition is weakly applied then it is applied in a tangential direction.
<br>
<strong>&lt;Weakly_applied&gt;</strong> boolean [false]  <nobr> 
<strong>&lt;/Weakly_applied&gt;</strong>
</nobr><br>
If <i>true</i> then the Dirichlet boundary condition is applied weakly using augmented Lagrange-multiplier formulation. This setting is applied to fluid/FSI equations only.
<br>
<strong>&lt;Zero_out_perimeter&gt;</strong> boolean [true]  <nobr> 
<strong>&lt;/Zero_out_perimeter&gt;</strong>
</nobr><br>
If <i>true</i> then the solver will zero out the nodes shared by two adjacent faces.
<br>
</div>

<!-- ---------- N e u m a n n  P a r a m e t e r s ---------- -->

<h5> Neumann Boundary Condition Parameters </h5>
<div class="bc_param_div">
<strong>&lt;Distal_pressure&gt;</strong> real [0.0]  <nobr> 
<strong>&lt;/Distal_pressure&gt;</strong>
</nobr><br>
The distal pressure used to initialize an RCR boundary condition.
<br>
<strong>&lt;Follower_pressure_load&gt;</strong> boolean [false]  <nobr> 
<strong>&lt;/Follower_pressure_load&gt;</strong>
</nobr><br>
If <i>true</i> then the applied load <i>follows</i> the mesh deformation. This implies that the magnitude of the load is proportional to the surface area during the deformation.
<br>
<section id="bc_Fourier_coefficients_file_path">
<strong>&lt;Fourier_coefficients_file_path&gt;</strong> string [none]  <nobr> 
<strong>&lt;/Fourier_coefficients_file_path&gt;</strong>
</nobr><br>
A text file containing the Fourier coefficients interpolating a time-dependent state variable.
<br>
<strong>&lt;Undeforming_neu_face&gt;</strong> boolean [false]  <nobr> 
<strong>&lt;/Undeforming_neu_face&gt;</strong>
</nobr><br>
If <i>true</i> then mimic clamped condition on a specimen routinely done in experiments. Clamping will not allow the surface, on which the load is applied, to deform. Used only for nonlinear elastodynamics.
</div>

<!-- ---------- R o b i n  P a r a m e t e r s ---------- -->

<h5> Robin Boundary Condition Parameters </h5>
<div class="bc_param_div">
<strong>&lt;Apply_along_normal_direction&gt;</strong> <i>boolean [false]</i> <nobr> 
<strong>&lt;/Apply_along_normal_direction&gt;</strong>
</nobr><br>
If <i>true</i> then when the Robin BC is applied along the normal direction the applied surface traction takes the form sigma.n = -(k u.n + c v.n - p)n
<br>
<strong>&lt;Damping>&gt;</strong> <i>real [1.0]</i> <nobr> 
<strong>&lt;/Damping&gt;</strong>
</nobr><br>
The damping constant for the spring-mass-damper force used to implement a Robin boundary condition.
</div>

