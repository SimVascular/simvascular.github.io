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

<h5 id="domain_parameters"> Parameters </h5>
The following section lists all of the parameters associated with a domain. However, certain parameters only 
make sense when used in a domain defined for a specific type of equation. The list of equations  
where a parameter is used is listed after its definition in [].

<div class="bc_param_div">
<strong>&lt;Absolute_tolerance&gt;</strong> <i>real</i> [1e-6] <nobr>
<strong>&lt;/Absolute_tolerance&gt;</strong>
</nobr><br>
?
[cardiac_electro_physiology]
<br>

<strong>&lt;Anisotropic_conductivity&gt;</strong> <i>vector</i> <nobr>
<strong>&lt;/Anisotropic_conductivity&gt;</strong>
</nobr><br>
?
[cardiac electrophysiology]
<br>

<strong>&lt;Conductivity&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Conductivity&gt;</strong>
</nobr><br>
?
[advection_diffusion, solid_heat]
<br>

<strong>&lt;Continuity_stabilization_coefficient&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Continuity_stabilization_coefficient&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Density&gt;</strong>
</nobr><br>
?
[fluid, fluid-solid-interaction, linear_elasticity, shell, solid_heat, structural, structural_velocity_pressure]
<br>

<strong>&lt;Dilational_penalty_model&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Dilational_penalty_mode&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Elasticity_modulus&gt;</strong> <i>real</i> [1e7] <nobr>
<strong>&lt;/Elasticity_modulus&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Electrophysiology_model&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Electrophysiology_model&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Feedback_parameter_for_stretch_activated_currents&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Feedback_parameter_for_stretch_activated_currents&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Fluid_density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Fluid_density&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Force_x&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Force_x&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Force_y&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Force_y&gt;</strong>
</nobr><br>
?
<br>

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
?
<br>

<strong>&lt;Mass_damping&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Mass_damping&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Momentum_stabilization_coefficient&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Momentum_stabilization_coefficient&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Myocardial_zone&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Myocardial_zone&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;ODE_solver&gt;</strong> <i>string </i> [euler] <nobr>
<strong>&lt;/ODE_solver&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Penalty_parameter&gt;</strong> <i>real </i> [0.0] <nobr>
<strong>&lt;/Penalty_parameter&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Poisson_ratio&gt;</strong> <i>real </i> [0.3] <nobr>
<strong>&lt;/Poisson_ratio&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Relative_tolerance&gt;</strong> <i>real</i> [1e-4] <nobr>
<strong>&lt;/Relative_tolerance&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Shell_thickness&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Shell_thickness&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Solid_density&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Solid_density&gt;</strong>
</nobr><br>
?
<br>

<strong>&lt;Solid_viscosity&gt;</strong> <i>real</i> [0.9] <nobr>
<strong>&lt;/Solid_viscosity&gt;</strong>
</nobr><br>
?
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
</div>


