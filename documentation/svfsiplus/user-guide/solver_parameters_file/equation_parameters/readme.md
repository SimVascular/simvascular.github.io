<!-- ========================================================= -->
<!-- ==================== Equation Parameters ================ -->
<!-- ========================================================= -->

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h4 id="equation_parameters"> Equation Parameters </h4>
The Equation Parameters section of the solver parameters input file defines the properties of an equation
<ul style="list-style-type:disc;">
  <li> physics - fluid, structure, electrophysiology, etc. </li>
  <li> domains </li>
</ul>

The Equation  Parameters section is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Add_equation</strong> type=equation_type</i>&gt;
<br><br>
[Equation Parameters]
<br> <br>
&lt;<strong>LS</strong> type=<i>linear_solver_type</i>&gt;<br>
[<a href="#liner_solver_parameters"> Linear Solver Parameters </a> ]
<br>
&lt;<strong>LS</strong>&gt;

&lt;<strong>Output</strong> type=<i>output_type</i>&gt;<br>
[Output Parameters]
<br>
&lt;<strong>Output</strong>&gt;
<br>

&lt;<strong>Add_equation</strong>&gt;

</div>

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
  <li> "structural_velocity_pressure" - nonlinear elastodynamics equation using mixed VMS-stabilized formulation </li>
</ul>

<!-- ----------------------------------------- -->
<!-- ---------- Equation Parameters ---------- -->
<!-- ----------------------------------------- -->

<h5> Equation Parameters </h5>
<div class="bc_param_div">
<strong>&lt;Coupled&gt;</strong> <i>boolean [true]</i> <nobr>
<strong>&lt;/Coupled&gt;</strong>
</nobr><br>
If <i>true</i> then the convergence of a multi-equation system of equations is coupled: nonlinear iterations are performed within each time step on all the coupled system of equations until convergence is achieved.  
If <i>false</i> then the convergence of each equation is uncoupled and is achieved separately within each time step.
<br>
<strong>&lt;Initialize&gt;</strong> <i>string [none]</i> <nobr>
<strong>&lt;/Initialize&gt;</strong>
</nobr><br>
Initialize the CMM equation. 
   Permissible values are 
   &middot;inflate -
   &middot;prestress -
<br>
<strong>&lt;Initialize_RCR_from_flow&gt;</strong> <i>boolean [false]</i> <nobr>
<strong>&lt;/Initialize_RCR_from_flow&gt;</strong>
</nobr><br>
If true then initialize RCR from flow data.
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
If <i>true</i> then use a Taylor-Hood element pair for increassed stability.
<br>
</div>

