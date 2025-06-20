<br>

<h2 id="basic_parameters_panel" style="text-align:center;"> Solver Parameters Panel </h2>

The <strong>Solver Parameters Panel</strong> is used to set parameters controlling how the svMultiPhysics solver executes a fluid simulation.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/solver_parameters_panel.png">
<figcaption class="svCaption"> The <strong>Solver Parameters</strong> panel.
</figcaption>
</figure>

Most entries in the panel have reasonable default values that should work for typical CFD simulations.

Parameters are grouped into four sections.

<ul style="list-style-type:disc;">
  <li> <strong>Time Step</strong> </li> 
  <li> <strong>Output</strong> </li> 
  <li> <strong>Nonlinear Solver</strong> </li> 
  <li> <strong>Linear Solver</strong> </li> 
</ul>

### Time Step 
The <strong>Time Step</strong> section sets solver time stepping parameters. 

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/solver_parameters_time_step.png">
</figure>

<ul>
  <li> <strong> Number of time steps </strong> - The number of time steps to run the simulation. </li>
  <li> <strong> Time step size </strong> - The simulation time step. </li> 
</ul>

### Output
The <strong>Output</strong> section sets solver time stepping parameters. 

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/solver_parameters_output.png">
</figcaption>
</figure>

<ul>
  <li> <strong> Increment in saving restart files </strong> - How often to save solver binary results restart files. </li>
  <li> <strong> Start saving after time step </strong> - Save simulation results after the given time step. </li>
  <li> <strong> Save results to VTK format </strong> - If true then save simulation results to VTK-format files.</li>
  <li> <strong> Increment in saving VTK files </strong> - How often to save simulation results to a VTK-format file. </li>
</ul>

### Nonlinear Solver 
The <strong>Nonlinear Solver</strong> section sets the parameters controlling the behavior of the nonlinear solver.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/solver_parameters_nonlinear.png">
</figcaption>
</figure>

<ul>
  <li> <strong>Min iterations</strong> - The minimum number of iterations used to solve a nonlinear system of equations. </li>
  <li> <strong> Max iterations </strong> - The maximum number of iterations used to solve a nonlinear system of equations. </li>
  <li> <strong> Tolerance </strong> - The solution of a nonlinear system of equations is considered to be converged (solved) if the nonlinear residual is less than this value.</li>
  <li> <strong> Backflow stabilization coefficient </strong> - A parameter used to control flow reversal at outlet boundaries.</li>
</ul>

### Linear Solver
The <strong>Linear Solver</strong> section sets the parameters controlling the behavior of the linear solver.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/solver_parameters_linear.png">
</figcaption>
</figure>

<ul>
  <li> <strong> Solver </strong> - The solver to use to solve a linear system of equations.</li>
  <li> <strong> Max iterations </strong> - The maximum number of iterations used to solve a linear system of equations. </li>
  <li> <strong> NS GM max iterations </strong> - The number of maximum iterations used to the control the convergence of the GMRES portion of the bi-partitioned iterative algorithm. </li>
  <li> <strong> NS GM tolerance</strong> - The tolerance used to control the convergence of the GMRES portion of the bi-partitioned iterative algorithm.</li>
  <li> <strong> NS CG max iterations </strong> - The number of maximum iterations used to the control the convergence of the conjugate gradient portion of the bi-partitioned iterative algorithm. </li>
  <li> <strong> NS CG tolerance </strong> - The tolerance used to the control the convergence of the conjugate gradient portion of the bi-partitioned iterative algorithm. </li>
  <li> <strong> Krylov space dimension </strong> - The dimension of the Kyrlov matrix used to approximate a linear system.  </li>
  <li> <strong> Tolerance </strong> - The solution of a linear system of equations is considered to be converged (solved) if the residual is less than this value. </li>
  <li> <strong> Absolute tolerance </strong> - The solution of a near system of equations is considered to be converged (solved) if the linear residual is less than this value. </li>

</ul>


