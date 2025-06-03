<!-- ======================================================================== -->
<!-- ==================== svZeroDSolver Interface Subsection ================ -->
<!-- ======================================================================== -->

<h3 id="svzerodsolver_interface_subsection"> svZeroDSolver Interface Subsection </h3>
The <i>svZeroDSolver Interface Subsection</i> of the <i>Equation Section</i> defines the parameters needed by the svMultiPhysics solver to interface with the svZeroDSolver.

The SimVascular <a href="/documentation/rom_simulation.html#0d-solver"> svZeroDSolver </a> simulates bulk cardiovascular flow rates and pressures using an arbitrary  zero-dimensional (0D) lumped parameter model (LPM) of a discrete network of components analogous to electrical circuits. It provides an Application Programming Interface (API) that allows it to communicate and interact with external software applications directly using function calls to programmatically define custom inflow and outflow boundary conditions for a CFD simulation. The svMultiPhysics solver can directly access the svZeroDSolver API by loading the svZeroDSolver as a shared (dynamic) library available after installing the svZeroDSolver.

The <i>svZeroDSolver Interface Subsection </i> is organized as follows
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>svZeroDSolver_interface</strong>&gt;<br>
[<a href="#svzerodsolver_interface_parameters_desc"> svZeroDSolver Interface Parameters </a> ]
<br>
&lt;<strong>&#47;svZeroDSolver_interface</strong>&gt;<br>
</div>

The <strong>svZeroDSolver_interface</strong> keyword activates coupling for boundary conditions with the 
&lt;<strong>Time_dependence</strong>&gt; Coupled &lt;<strong>&#47;Time_dependence</strong>&gt; keyword for the enclosing equation coupled boundary condition.

The value of <i>svzerodsolver_interface_name</i> can be any string name and is not currently used.

<!-- ------------------------------------------- -->
<!-- ---- svZeroDSolver_interface parameters --- -->
<!-- ------------------------------------------- -->

<h4 id="svzerodsolver_interface_parameters_desc"> svZeroDSolver Interface Parameters </h4>
<div class="bc_param_div"><nobr>
<strong>&lt;Coupling_type&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Coupling_type&gt;</strong><br><br>
The type of coupling used between the svMultiPhysics and svZeroDSolve solvers. The coupling type determines how contributions from the coupled svZeroDSolver are added to the svMultiPhysics solver tangent matrix.<br><br>
The value of the coupling type can be
<ul style="list-style-type:disc;">
  <li> explicit - No contribution is added. This may potentially cause poor nonlinear convergence. </li>
  <li> implicit - Contributions are added as outlet resistances for each svZeroDSolver and svMultiPhysics solver Newton iteration. This leads to theoretically quadratic nonlinear convergence but at the expense of additional computation.
</li>
  <li> semi-implicit - Contributions obtained from the svZeroDSolver for outlet resistances are added only at the beginning of the simulation .</li>
</ul>
<strong>&lt;Configuration_file&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Configuration_file&gt;</strong>
<br><br>
The name of the svZeroDSolver JSON configuration file containing the description of the components of a lumped parameter network and various simulation parameters.
<br><br>
<strong>&lt;Shared_library&gt;</strong> <i>string</i> [none] <nobr>
<strong>&lt;/Shared_library&gt;</strong>
<nobr><br><br>
The path and name of the svZeroDSolver shared library used to access the svZeroDSolver API. The name of the library is specific to the computer platform you are using 
<ul style="list-style-type:disc;">
  <li> Linux - libsvzero_interface.so </li>
  <li> MacOS - libsvzero_interface.dylib </li>
  <li> Windows - libsvzero_interface.dll </li>
</ul>
On MacOS and Linux this library will be installed in the directory /usr/local/sv/svZeroDSolver/DATE/lib.
<br><br>
<strong>&lt;Initial_flows&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Initial_flows&gt;</strong>
<br><br>
Initialize the flows for all coupling blocks with the given value. If this parameter is not given then flows will not be initialized.<br>
<br>
<strong>&lt;Initial_pressures&gt;</strong> <i>real</i> [0.0] <nobr>
<strong>&lt;/Initial_pressures&gt;</strong>
<br><br>
Initialize the pressures for all coupling blocks with the given value. If this parameter is not given then pressures will not be initialized.
</div>



