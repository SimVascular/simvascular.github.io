<!-- ============================================================== -->
<!-- ==================== Output Subsection ======================= -->
<!-- ============================================================== -->

<h4 id="output_parameters"> Output Subsection </h4>
The <i>Output Subsection</i> section of the <i>Equation Section</i> defines the quantities written to simulation
results files.

The <i>Output Subsection </i>is organized as a list of quantity names with a <i>boolean</i> 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Output</strong> type=<i>output_type</i>&gt;
<br>[<i>Quantity names</i>]<br>
&lt;<strong>Output</strong>&gt;
</div>

The <strong>Output</strong> keyword enables output of quantities for the enclosing equation. 
The value of <i>output_type</i> can be
<ul style="list-style-type:disc;">
  <li> "Boundary_integral" - Quantities computed as a flux through boundary surfaces (faces) (e.g. velocity flux, energy flux)
  <li> "Spatial" - Quantities written to VTK VTU files </li>
  <li> "Volume_integral" - Volume-averaged quantities </li>
</ul>

<i>Quantity names</i> are boolean parameters used to enable quantities for output by setting their value to <i>true</i>.
The quantities available for output depends on the equation being solved. 
Below is a list of all quantity names available for output for the corresponding equation

<ul style="list-style-type:disc;">
  <li> advection_diffusion - Temperature, Heat_flux </li>
  <li> cardiac_electro_physiology - Action_potential </li>
  <li> coupled_momentum - Velocity, Pressure, Displacement,WSS, Vorticity, Vortex, Energy_flux,
       Strain_invariants, Acceleration, Traction, Viscosity, Divergence 
  </li>
  <li> fluid - Velocity, Pressure, WSS, Traction, Vorticity, Vortex, Energy_flux,  
       Strain_invariants, Acceleration, Viscosity, Divergence  </li>
  <li> fluid-solid-interaction - Velocity, Pressure, Displacement, VonMises_stress, WSS, Traction, 
       Vorticity, Vortex, Energy_flux, Strain_invariants, Viscosity, Absolute_velocity, Stress, Strain, 
       Cauchy_stress, Jacobian, Deg_grad, Area/Volume, Fiber_direction, Fiber_alignment, Divergence, Acceleration                   
  </li>
  <li> linear_elasticity - Displacement, VonMises_stress, Stress, Strain, Jacobian, Area/Volume, Velocity, 
       Acceleration 
  </li>
  <li> mesh - Displacement, Velocity, Acceleration </li>
  <li> shell - Displacement, Stress, Strain (Green-Lagrange in-plane), Def_grad, Area, Jacobian, Velocity, 
       1st invariant of Cauchy-Green strain (in-plane), Cauchy-Green strain tensor          
  </li>
  <li> solid_heat - Temperature, Heat_flux </li>
  <li> stokes - Velocity, Pressure, WSS, Vorticity, Traction, Strain_invariants, Viscosity, Divergence </li>
  <li> structural - Displacement, VonMises_stress, Stress, Cauchy_stress, Strain, Jacobian, Def_grad, Area/Volume,
       Fiber_direction, Fiber_alignment, Velocity, Acceleration  </li>
  <li> structural_velocity_pressure - Displacement, VonMises_stress, Stress, Cauchy_stress, Strain,
       Jacobian, Def_grad, Area/Volume, Fiber_direction, Fiber_alignment, Velocity, Pressure, Acceleration,
       Divergence</li>
</ul>


<h5> Example </h5>
<div class="bc_param_div">
&lt;<strong>Output</strong> type="Spatial"&gt;
&lt;<strong>Displacement&gt;</strong> <i>true</i> &lt;/<strong>Displacement</strong>&gt;
&lt;<strong>Stress&gt;</strong> <i>true</i> &lt;/<strong>Stress</strong>&gt;
&lt;<strong>Output</strong>&gt;
</div>





