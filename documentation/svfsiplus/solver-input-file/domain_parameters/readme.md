<!-- ============================================================== -->
<!-- ==================== Domain Subsection ======================= -->
<!-- ============================================================== -->

<h4 id="domain_section"> Domain Subsection </h4>
The <i>Domain Subsection</i> of the <i>Equation Section</i> defines the physical properties for a 
region of a finite element mesh used in solving the enclosing equation.

The <i>Domain Subsection</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Domain</strong> id=<i>domain_id</i>&gt;
<br><br>
[<a href="#domain_parameters"> Domain Parameters </a> ]
<br><br>
&lt;<strong>Viscosity</strong> model=<i>viscosity_model</i>&gt;<br>
[<a href="#viscosity_parameters"> Viscosity Subsection </a> ]
<br>
&lt;<strong>Viscosity</strong>&gt;
<br><br>
&lt;<strong>Stimulus</strong> type=<i>stimulus_type</i>&gt;<br>
[<a href="#stimulus_subsection"> Stimulus Subsection </a> ]
<br>
&lt;<strong>Stimulus</strong>&gt;
<br><br>
&lt;<strong>Domain</strong>&gt;
</div>

The <strong>Domain</strong> keyword adds a domain to the enclosing equation. <i>domain_id</i> is an
<i>integer</i> ID defined in <i>Mesh Section</i> for a finite element mesh.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
If the simulation comprises a single domain with uniform properties then the domain parameters don't need to
be defined within a <i>Domain Subsection</i>, they can just be given in the enclosing equation.
</div>

<!-- --------------------------------- -->
<!-- ---------- Parameters ----------- -->
<!-- --------------------------------- -->

<h5 id="domain_eq_parameters"> Domain Parameters by Equation </h5>
The following sections list the parameters associated with a domain for a specific equation. 

<!-- ---------- advection_diffusion domain Parameters ---------- -->

<h6 id="advection_diffusion_domain_parameters"> Advection Diffusion Domain Parameters </h6>
<pre>
<a href="#domain_Conductivity"> Conductivity <a>
<a href="#domain_Source_term"> Source_term <a>
</pre>

<!-- ---------- Cardiac Electrophysiology domain Parameters ---------- -->

<h6 id="cardiac_electrophysiology_domain_parameters"> Cardiac Electrophysiology Domain Parameters </h6>
<pre>
<a href="#domain_Anisotropic_conductivity"> Anisotropic_conductivity <a>
<a href="#domain_Electrophysiology_model"> Electrophysiology_model <a>
<a href="#domain_Myocardial_zone"> Myocardial_zone <a>
<a href="#domain_ODE_solver"> ODE_solver <a>
<a href="#domain_Stimulus"> Stimulus <a>
<a href="#domain_Time_step_for_integration"> Time_step_for_integration <a>
</pre>

<!-- ---------- coupled_momentum domain Parameters ---------- -->

<h6 id="coupled_momentum_domain_parameters"> Coupled Momentum Domain Parameters </h6>
<pre>
<a href="#domain_Elasticity_modulus"> Elasticity_modulus <a>
<a href="#domain_Fluid_density"> Fluid_density <a>
<a href="#domain_Solid_density"> Solid_density<a>
<a href="#domain_Backflow_stabilization_coefficient"> Backflow_stabilization_coefficient <a>
<a href="#domain_Poisson_ratioa"> Poisson_ratio <a>
<a href="#domain_Shell_thickness"> Shell_thickness <a>
</pre>

<!-- ---------- Fluid domain Parameters ---------- -->

<h6 id="fluid_domain_parameters"> Fluid Domain Parameters </h6>
<pre>
<a href="#domain_Backflow_stabilization_coefficient"> Backflow_stabilization_coefficient <a>
<a href="#domain_density"> Density <a>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
</pre>

<!-- ---------- fluid-solid-interactio domain Parameters ---------- -->

<h6 id="fluid-solid-interaction_domain_parameters"> Fluid-Solid Interaction Domain Parameters </h6>
Fluid-solid interaction parameters will be a combination of fluid and 
linear elasticity, structural or structural velocity pressure parameters. 

<!-- ---------- linear_elasticity domain Parameters ---------- -->

<h6 id="linear_elasticity_domain_parameters"> Linear Elasticity Domain Parameters </h6>
<pre>
<a href="#domain_Density"> Density <a>
<a href="#domain_Elasticity_modulus"> Elasticity_modulus <a>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
<a href="#domain_Poisson_ratio"> Poisson_ratio <a>
</pre>

<!-- ---------- mesh domain Parameters ---------- -->

<h6 id="mesh_domain_parameters"> Mesh Domain Parameters </h6>
<pre>
<a href="#domain_Poisson_ratio"> Poisson_ratio <a>
</pre>

<!-- ---------- shel domain Parameters ---------- -->

<h6 id="shell_domain_parameters"> Shell Domain Parameters </h6>
<pre>
<a href="#domain_Density"> Density <a>
<a href="#domain_Elasticity_modulus"> Elasticity_modulus <a>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
<a href="#domain_Poisson_ratio"> Poisson_ratio <a>
</pre>

<!-- ---------- solid_heat domain Parameters ---------- -->

<h6 id="solid_heat_domain_parameters"> Solid Heat Domain Parameters </h6>
<pre>
<a href="#domain_Conductivity"> Conductivity <a>
<a href="#domain_Density"> Density <a>
<a href="#domain_Source_term"> Source_term <a>
</pre>
</pre>

<!-- ---------- stokes domain Parameters ---------- -->

<h6 id="stokes_domain_parameters"> Stokes Domain Parameters </h6>
<pre>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
<a href="#domain_Momentum_stabilization_coefficient"> Momentum_stabilization_coefficient <a>
</pre>

<!-- ---------- structural domain Parameters ---------- -->

<h6 id="structural_domain_parameters"> Structural Domain Parameters </h6>
<pre>
<a href="#domain_Density"> Density <a>
<a href="#domain_Elasticity_modulus"> Elasticity_modulus <a>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
<a href="#domain_Poisson_ratio"> Poisson_ratio <a>
<a href="#viscosity_parameters"> Viscosity <a>
</pre>

<!-- ---------- structural_velocity_pressure domain Parameters ---------- -->

<h6 id="structural_velocity_pressure_domain_parameters"> Structural Velocity Pressure Domain Parameters </h6>
<pre>
<a href="#domain_Density"> Density <a>
<a href="#domain_Elasticity_modulus"> Elasticity_modulus <a>
<a href="#domain_Force_x"> Force_x <a>
<a href="#domain_Force_y"> Force_y <a>
<a href="#domain_Force_z"> Force_z <a>
<a href="#domain_Momentum_stabilization_coefficient"> Momentum_stabilization_coefficient <a>
<a href="#domain_Poisson_ratio"> Poisson_ratio <a>
<a href="#viscosity_parameters"> Viscosity <a>
</pre>
</pre>

<!-- ---------- All Parameters ---------- -->

<h5 id="domain_parameters"> Domain Parameters </h5>
The following section lists all of the parameters associated with a domain. However, certain parameters only 
make sense when used in a domain defined for a specific type of equation. 

<div class="bc_param_div">
<strong>&lt;Absolute_tolerance&gt;</strong> <i>real</i> [1e-6] <nobr>
<strong>&lt;/Absolute_tolerance&gt;</strong>
</nobr><br>
Convergence is deemed to occur when the size of the residual becomes sufficiently small compared with this value. 
<br>

<section id="domain_Anisotropic_conductivity">
<strong>&lt;Anisotropic_conductivity&gt;</strong> <i>vector</i> <nobr>
<strong>&lt;/Anisotropic_conductivity&gt;</strong>
</nobr><br>
Sets the anisotropic conductivity constant.
<br>

<section id="domain_Backflow_stabilization_coefficient">
<strong>&lt;Backflow_stabilization_coefficient&gt;</strong> <i>real</i> [0.2] <nobr>
<strong>&lt;/Backflow_stabilization_coefficient&gt;</strong>
</nobr><br>
A parameter used to control flow reversal at outlet boundaries.
<br>

<strong>&lt;Conductivity&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Conductivity&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Continuity_stabilization_coefficient&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Continuity_stabilization_coefficient&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_density">
<strong>&lt;Density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Density&gt;</strong>
</nobr><br>
The density property for a solid or fluid.
<br>

<strong>&lt;Dilational_penalty_model&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Dilational_penalty_mode&gt;</strong>
</nobr><br>
The dilational or volume-preserving component of the hyperelastic strain energy function.
Permissible values are
<ul style="list-style-type:disc;">
  <li> Quadratic - </li>
  <li> Simo-Taylor91 - </li>
  <li> Miehe94 - </li>
</ul>
<br>

<section id="domain_Elasticity_modulus">
<strong>&lt;Elasticity_modulus&gt;</strong> <i>real</i> [1e7] <nobr>
<strong>&lt;/Elasticity_modulus&gt;</strong>
</nobr><br>
The elastic modulus property for a solid or fluid.
<br>

<section id="domain_Electrophysiology_model">
<strong>&lt;Electrophysiology_model&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Electrophysiology_model&gt;</strong>
</nobr><br>
The activation model used to simulation electrical activity in heart muscle.
Permissible values are
<ul style="list-style-type:disc;">
  <li> aliev-panfilov - Aliev-Panfilov model </li>
  <li> bueno-orovio - Bueno-Orovio model </li>
  <li> fitzhugh-nagumo - Fitzhugh-Nagumo model </li>
  <li> tentusscher-panfilov - tenTusscher-Panfilov model </li>
</ul>
<br>

<strong>&lt;Feedback_parameter_for_stretch_activated_currents&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Feedback_parameter_for_stretch_activated_currents&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Fluid_density">
<strong>&lt;Fluid_density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Fluid_density&gt;</strong>
</nobr><br>
The density property for a fluid.
<br>

<section id="domain_Force_x">
<strong>&lt;Force_x&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Force_x&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Force_y">
<strong>&lt;Force_y&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Force_y&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Force_z">
<strong>&lt;Force_z&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Force_z&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;G_Na&gt;</strong> <i>real</i> [14.838] <nobr>
<strong>&lt;/G_Na&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;G_CaL&gt;</strong> <i>real</i> [3.98E-5] <nobr>
<strong>&lt;/G_CaL&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;G_Kr&gt;</strong> <i>real</i> [0.153] <nobr>
<strong>&lt;/G_Kr&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;G_Ks&gt;</strong> <i>real</i> [0.392] <nobr>
<strong>&lt;/G_Ks&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;G_to&gt;</strong> <i>real</i> [0.294] <nobr>
<strong>&lt;/G_to&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Isotropic_conductivity&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Isotropic_conductivity&gt;</strong>
</nobr><br>
Sets the isotropic conductivity constant.
<br>

<strong>&lt;Mass_damping&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Mass_damping&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Momentum_stabilization_coefficient">
<strong>&lt;Momentum_stabilization_coefficient&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Momentum_stabilization_coefficient&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Myocardial_zone">
<strong>&lt;Myocardial_zone&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Myocardial_zone&gt;</strong>
</nobr><br>
The region of the heart the domain is representing. This is needed for some activation models. 
Permissible values are
<ul style="list-style-type:disc;">
  <li> endocardium </li>
  <li> epicardium </li>
  <li> myocardium </li>
</ul>
<br>

<section id="domain_ODE_solver">
<strong>&lt;ODE_solver&gt;</strong> <i>string </i> [euler] <nobr>
<strong>&lt;/ODE_solver&gt;</strong>
</nobr><br>
The time integration method to solve the ODEs used to integrate activation models.
<ul style="list-style-type:disc;">
  <li> euler </li>
  <li> implicit - </li>
  <li> runge - </li>
</ul>
<br>

<strong>&lt;Penalty_parameter&gt;</strong> <i>real </i> [0.0] <nobr>
<strong>&lt;/Penalty_parameter&gt;</strong>
</nobr><br>
The penalty constant used to override the physical bulk modulus. This is needed if the Poisson ratio 
for a solid is close to 0.5.
<br>

<section id="domain_Poisson_ratio">
<strong>&lt;Poisson_ratio&gt;</strong> <i>real </i> [0.3] <nobr>
<strong>&lt;/Poisson_ratio&gt;</strong>
</nobr><br>
The Poisson ratio property for a solid. Permissible values are between 0.0 and 0.5.
<br>

<strong>&lt;Relative_tolerance&gt;</strong> <i>real</i> [1e-4] <nobr>
<strong>&lt;/Relative_tolerance&gt;</strong>
</nobr><br>
Convergence is deemed to occur when the size of the residual becomes sufficiently small compared 
with the first error estimate calculated.
<br>

<section id="domain_Shell_thickness">
<strong>&lt;Shell_thickness&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Shell_thickness&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Solid_density">
<strong>&lt;Solid_density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Solid_density&gt;</strong>
</nobr><br>
The density property for a solid.
<br>

<strong>&lt;Solid_viscosity&gt;</strong> <i>real</i> [0.9] <nobr>
<strong>&lt;/Solid_viscosity&gt;</strong>
</nobr><br>
The viscosity property for a solid.
<br>

<strong>&lt;Source_term&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Source_term&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;tau_fi&gt;</strong> <i>real</i> [0.110] <nobr>
<strong>&lt;/tau_fi&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;tau_si&gt;</strong> <i>real</i> [1.88750] <nobr>
<strong>&lt;/tau_si&gt;</strong>
</nobr><br>
?
<br>

<section id="domain_Time_step_for_integration">
<strong>&lt;Time_step_for_integration&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Time_step_for_integration&gt;</strong>
</nobr><br>
The time step size used to integrate activation models if different from simulation time step. 
<br>

</div>

<!-- ------------------------------------------ -->
<!-- ---------- Stimulus Subsection ----------- -->
<!-- ------------------------------------------ -->

<h5 id="stimulus_subsection"> Stimulus Subsection </h5>
The <i>Stimulus Subsection</i> of the <i>Domain Subsection</i> defines the stimulus
settings for pacemaker cells for a cardiac electrophysiology simulation.

The <i>Stimulus Subsection</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Stimulus</strong> type=<i>stimulus_type</i>&gt;<br>
<br>
[<a href="#stimulus_parameters"> Stimulus Parameters </a> ]
<br><br>
&lt;<strong>/Stimulus</strong>&gt;
</div>

The <strong>Stimulus</strong> keyword adds stimulus settings to the enclosing domain. The 
<i>stimulus_type</i> attribute can be

<ul style="list-style-type:disc;">
  <li> "Istim" - </li>
</ul>

<h6 id="stimulus_parameters"> Parameters </h6>
<div class="bc_param_div">
<strong>&lt;Amplitude&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Amplitude&gt;</strong>
</nobr><br>
?
<br>
<strong>&lt;Cycle_length&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Cycle_length&gt;</strong>
</nobr><br>
?
<br>
<strong>&lt;Duration&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Duration&gt;</strong>
</nobr><br>
?
<br>
<strong>&lt;Start_time&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Start_time&gt;</strong>
</nobr><br>
?
<br>
</div>


