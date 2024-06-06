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

The &lt;<strong>Add_equation</strong> parameter section contains the following nested parameter sections 
<ul style="list-style-type:disc;">
  <li> <a href="#liner_solver_parameters"> &lt;LS> - Linear Solver Parameters </a> </li>

  <li> <a href="#output_parameters"> &lt;Output> - Output Parameters </a> </li>

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
  <li> "structural_velocity_pressure" - nonlinear elastodynamics equation using mixed VMS-stabilized formulation </li>
</ul>

<h5> Parameters </h5>

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
