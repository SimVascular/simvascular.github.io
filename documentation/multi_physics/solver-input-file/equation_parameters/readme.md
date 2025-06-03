<!-- ========================================================= -->
<!-- ==================== Equation Section =================== -->
<!-- ========================================================= -->

<h2 id="equation_section"> Equation Section </h2>
The <i>Equation Section</i> of the solver parameters input file defines the properties of an equation
<ul style="list-style-type:disc;">
  <li> physics - fluid, structure, electrophysiology, etc. </li>
  <li> domains </li>
</ul>

The <i>Equation Section</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Add_equation</strong> type=<i>equation_type</i>&gt;
<br><br>
[<a href="#equation_parameters_section"> Equation Parameters </a> ]
<br> <br>

&lt;<strong>Domain</strong> id=<i>domain_id</i>&gt;
<br>
[<a href="#domain_section"> Domain Subsection </a> ]
<br>
&lt;<strong>/Domain</strong>&gt;

&lt;<strong>ECGLeads</strong>&gt;
<br>
[<a href="#ECGLeads_subsection"> ECG Leads Subsection </a> ]
<br>
&lt;<strong>/ECGLeads</strong>&gt;

&lt;<strong>svZeroDSolver_interface</strong>&gt;
<br>
[<a href="#svzerodsolver_interface_subsection"> svZeroDSolver Interface Subsection </a> ]
<br>
&lt;<strong>/svZeroDSolver_interface</strong>&gt;

&lt;<strong>Variable_wall_properties</strong> mesh_name=<i>mesh_name</i>&gt;<br>
[<a href="#Variable_wall_properties_subsection"> Variable wall properties Subsection </a> ]
<br>
&lt;<strong>Viscosity</strong>&gt;

&lt;<strong>Viscosity</strong> model=<i>viscosity_model</i>&gt;<br>
[<a href="#viscosity_parameters"> Viscosity Subsection </a> ]
<br>
&lt;<strong>Viscosity</strong>&gt;

&lt;<strong>LS</strong> type=<i>linear_solver_type</i>&gt;<br>
[<a href="#liner_solver_parameters"> Linear Solver Subsection </a> ]
<br>
&lt;<strong>LS</strong>&gt;

&lt;<strong>Output</strong> type=<i>output_type</i>&gt;<br>
[<a href="#output_parameters"> Output Subsection </a>]
<br>
&lt;<strong>Output</strong>&gt;
<br>

&lt;<strong>svZeroDSolver_interface</strong> name=<i>svzerod_interface_name</i>&gt;<br>
[<a href="#svzerodsolver_interface_parameters"> svZeroDSolver Interface Subsection </a>]
<br>
&lt;<strong>svZeroDSolver_interface</strong>&gt;
<br>

&lt;<strong>Add_BC</strong> name=<i>bc_name</i>&gt;<br>
[<a href="#boundary_condition_parameters"> Boundary Condition Subsection </a>]
<br>
&lt;<strong>Add_BC</strong>&gt;
<br>


&lt;<strong>Add_equation</strong>&gt;

</div>

The <strong>Add_equation</strong> keyword adds an equation of type <i>equation_type</i>
to the simulation. Multiple <strong>Add_equation</strong> keywords can be given
within a solver parameters input file.

The value of <i>equation_type</i> is a <i>string</i> identifying the equation type
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
  <li> "structural_velocity_pressure" - nonlinear elastodynamics equation using mixed VMS-stabilized formulation </li>
</ul>

<!-- ----------------------------------------- -->
<!-- ---------- Equation Parameters ---------- -->
<!-- ----------------------------------------- -->

<h3 id="equation_parameters_section"> Equation Parameters </h3>
<div class="bc_param_div">
<strong>&lt;Coupled&gt;</strong> <i>boolean [true]</i> <nobr>
<strong>&lt;/Coupled&gt;</strong>
</nobr><br>
If <i>true</i> then the convergence of a multi-equation system of equations is coupled: nonlinear iterations are performed within each time step on all the coupled system of equations until convergence is achieved. If <i>false</i> then the convergence of each equation is uncoupled and is achieved separately within each time step.
<br>
<strong>&lt;Initialize&gt;</strong> <i>string [none]</i> <nobr>
<strong>&lt;/Initialize&gt;</strong>
</nobr><br>
Initialize the fluid wall for a CMM equation. 
   Permissible values are 
   &middot;inflate - Initialize the fluid wall using displacements read in from a file given in the <a href="#bc_Initial_displacements_file_path"> Initial_displacements_file_path </a> parameter.
   &middot;prestress - Initialize the fluid wall using traction values read in from a file given in the <a href="#bc_Prestress_file_path"> Prestress_file_path </a> parameter.

<br>
<strong>&lt;Initialize_RCR_from_flow&gt;</strong> <i>boolean [false]</i> <nobr>
<strong>&lt;/Initialize_RCR_from_flow&gt;</strong>
</nobr><br>
If <i>true</i> then initialize RCR from flow data.
<br>
<strong>&lt;Max_iterations&gt;</strong> <i>integer</i> [1] <nobr>
<strong>&lt;/Max_iterations&gt;</strong>
</nobr><br>
The maximum number of iterations used to solve a nonlinear system of equations.
<br>
<strong>&lt;Min_iterations&gt;</strong> <i>integer</i> [1] <nobr>
<strong>&lt;/Min_iterations&gt;</strong>
</nobr><br>
The minimum number of iterations used to solve a nonlinear system of equations.
<br>
<strong>&lt;Prestress&gt;</strong> <i>boolean [false] </i> <nobr>
<strong>&lt;/Prestress&gt;</strong>
</nobr><br>
If <i>true</i> then enable prestressing a solid domain to mimic physiological conditions. Valid for linear elastic and structural equations only
<br>
<strong>&lt;Tolerance&gt;</strong> <i>real</i> [0.5] <nobr>
<strong>&lt;/Tolerance&gt;</strong>
</nobr><br>
The solution of a nonlinear system of equations is considered to be converged (solved) if the nonlinear residual is less than this value.
<br>
<strong>&lt;Use_taylor_hood_type_basis&gt;</strong> <i>boolean [false] </i> <nobr>
<strong>&lt;/Use_taylor_hood_type_basis&gt;</strong>
</nobr><br>
If <i>true</i> then use a Taylor-Hood element pair for increased stability.
<br>
</div>

<!-- ============================================================== -->
<!-- ====================== ECGLeads Subsection =================== -->
<!-- ============================================================== -->
<h4 id="ECGLeads_subsection"> ECG Leads Subsection </h4>
The <i>ECG Leads Subsection</i> of the <i>Equation Section</i> or <i>Domain Subsection</i> contains 
the parameters used to define ECG leads. 

The <i>ECG Leads  Subsection</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>ECGLeads</strong>&gt;
<br><br>
[ <a href="#ECGLeads_parameters"> ECG Leads Parameters </a> ]
<br> <br>
&lt;<strong>/ECGLeads</strong>&gt;
</div>

The <strong>ECGLeads</strong> keyword defines a subsection for ECG Leads parameters.

<h5 id="ECGLeads_parameters"> ECG Leads Parameters</h5>
<div class="bc_param_div">
<strong>&lt;X_coords_file_path&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/X_coords_file_path&gt;</strong>
</nobr><br>
The path to the text file containing the x-coordinates for the ECG leads. 
<br>
<strong>&lt;Y_coords_file_path&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Y_coords_file_path&gt;</strong>
</nobr><br>
The path to the text file containing the y-coordinates for the ECG leads. 
<br>
<strong>&lt;Z_coords_file_path&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Z_coords_file_path&gt;</strong>
</nobr><br>
The path to the text file containing the z-coordinates for the ECG leads. 
<br>
</div>


<!-- ============================================================== -->
<!-- =============== Variable wall properties Subsection ========= -->
<!-- ============================================================== -->
<h4 id="Variable_wall_properties_subsection"> Variable wall properties Subsection </h4>
The <i>Variable wall properties Subsection</i> of the <i>Equation Section</i> or <i>Domain Subsection</i> defines
the parameters used to define the node-based material properties used in a CMM equation.

The <i>Variable wall properties Subsection</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Variable_wall_properties</strong> mesh_name=<i>mesh_name</i>&gt;
<br><br>
[ <a href="#Variable_wall_properties_parameters"> Variable wall properties Parameters </a> ]
<br> <br>
&lt;<strong>/Variable_wall_properties</strong>&gt;
</div>

The <strong>Variable_wall_properties</strong> keyword defines a subsection for variable wall properties parameters.
The <i>mesh_name</i> attribute is the mesh name to assign the variable wall properties. 

<h5 id="Variable_wall_properties_parameters"> Variable wall properties Parameters</h5>
<div class="bc_param_div">
<strong>&lt;Wall_properties_file_path&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Wall_properties_file_path&gt;</strong>
</nobr><br>
The path to the VTK VTP-format file used to set the node-wise elasticity modulus and shell thickness properties. 
<br>
</div>


<!-- ============================================================== -->
<!-- ==================== Viscosity Subsection ==================== -->
<!-- ============================================================== -->

<h4 id="viscosity_parameters"> Viscosity Subsection </h4>
The <i>Viscosity Subsection</i> of the <i>Equation Section</i> or <i>Domain Subsection</i> defines 
the parameters for the fluid viscosity model used by fluid, CMM, and stokes equations, or the solid viscosity model used by struct and ustruct.

The <i>Viscosity Subsection</i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Viscosity</strong> model=<i>viscosity_model</i>&gt;
<br><br>
[ Viscosity Parameters ]
<br> <br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

The <strong>Viscosity</strong> keyword defines a subsection for viscosity parameters.

For fluid, CMM, and stokes equations, the value of <i>viscosity_model</i> can be

<ul style="list-style-type:disc;">
 <li> "newtonian" - Newtonian viscosity model </li>
 <li> "carreau-yasuda" - Carreau-Yasuda viscosity model </li>
 <li> "cassons" - Cassons viscosity model </li>
</ul>

<!-- ---------- Newtonian ---------- -->

<h5> Newtonian </h5>
<div class="bc_param_div">
&lt;<strong>Viscosity</strong> model="newtonian"&gt;
<br>
<strong>&lt;Value&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Value&gt;</strong>
</nobr><br>
The value of the viscosity constant. 
<br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

<!-- ---------- Carreau-Yasuda ---------- -->

<h5> Carreau-Yasuda</h5>
<div class="bc_param_div">
&lt;<strong>Viscosity</strong> model="carreau-yasuda"&gt;
<br>
<strong>&lt;Limiting_high_shear_rate_viscosity&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Limiting_high_shear_rate_viscosity&gt;</strong>
</nobr><br>
The value of the limiting high shear rate viscosity parameter.
<br>
<strong>&lt;Limiting_low_shear_rate_viscosity&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Limiting_low_shear_rate_viscosity&gt;</strong>
</nobr><br>
The value of Limiting low shear rate viscosity parameter.
<br>
<strong>&lt;Power_law_index&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Power_law_index&gt;</strong>
</nobr><br>
The value of the power law index parameter.
<br>
<strong>&lt;Shear_rate_tensor_multiplier&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Shear_rate_tensor_multiplier&gt;</strong>
</nobr><br>
The value of the shear rate tensor multiplier parameter.
<br>
<strong>&lt;Shear_rate_tensor_exponent&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Shear_rate_tensor_exponent&gt;</strong>
</nobr><br>
The value of the shear rate tensor exponent parameter.
<br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

<!-- ---------- Cassons ---------- -->

<h5> Cassons</h5>
<div class="bc_param_div">
&lt;<strong>Viscosity</strong> model="cassons"&gt;
<br>
<strong>&lt;Asymptotic_viscosity_parameter&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Asymptotic_viscosity_parameter&gt;</strong>
</nobr><br>
The value of the asymptotic viscosity parameter.
<br>
<strong>&lt;Low_shear_rate_threshold&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Low_shear_rate_threshold&gt;</strong>
</nobr><br>
The value of the low shear rate threshold parameter.
<br>
<strong>&lt;Yield_stress_parameter&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Yield_stress_parameter&gt;</strong>
</nobr><br>
The value of the yield stress parameter.
<br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

For struct and ustruct equations, the value of <i>viscosity_model</i> can be

<ul style="list-style-type:disc;">
 <li> "Newtonian" - Newtonian viscosity model </li>
 <li> "Potential" - Pseudo-potential viscosity model </li>
</ul>

<!-- ---------- Newtonian ---------- -->

<h5> Newtonian </h5>
<div class="bc_param_div">
&lt;<strong>Viscosity</strong> model="Newtonian"&gt;
<br>
<strong>&lt;Value&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Value&gt;</strong>
</nobr><br>
The value of the viscosity constant. 
<br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

<!-- ---------- Potential ---------- -->

<h5> Potential </h5>
<div class="bc_param_div">
&lt;<strong>Viscosity</strong> model="Potential"&gt;
<br>
<strong>&lt;Value&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Value&gt;</strong>
</nobr><br>
The value of the viscosity constant. 
<br>
&lt;<strong>/Viscosity</strong>&gt;
</div>

