<!-- --------------------------------------------------- -->
<!-- ------------------- Physics Panel ----------------- -->
<!-- --------------------------------------------------- -->

<h2 id="sv_fsi_tool_physics"> Physics Panel </h2> 
The Physics panel is used to set the equation(s), its physical properties, 
boundary conditions and linear solver solution strategy needed to numerically 
solve it in a simulation.

<h3> Panel Layout </h3> 

<br>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<br>


<h3> Usage </h3> 

**Add or remove equations** - This GUI control is used to add equations to the simulation. Selecting the equation 
name in the left panel and selecting the <strong>&gt;</strong> <i>Button</i> moves it to the right
panel and adds that equation to the simulation. Use the <strong>&lt;</strong> <i>Button</i> to remove
that equation from the simulation.

When an equation is added the <i>Buttons</i> at the bottom of this control (Properties, Output, etc.) are 
used to set the parameters for the selected equation. The GUI controls for setting parameters for each of
these are displayed directly beneath them.

**Properties** <i>Button</i> - Select to display the <a href="#properties_gui_controls"> GUI controls</a> used to set the physicals properties (e.g. density) needed by the equation.

**Output** <i>Button</i> - Select to display the <a href="#output_gui_controls"> GUI controls </a> to 
add/remove names of the quantities for output. 

**BCs** <i>Button</i> - Select to display the <a href="#bcs_gui_controls"> GUI controls </a> to add/remove 
names of the quantities for output. 

**Advanced** <i>Button</i> - Select to display a <a href="#advanced_gui_controls"> GUI panel </a> to set advanced solver options. 

**Linear Solver** <i>Button</i> - Select to display a <a href="#linear_solver_gui_controls"> GUI panel </a> to set linear solver options. 

**Remesher** <i>Button</i> - Select to display a GUI panel to set remeshing options. 

<h4> GUI controls for setting parameters </h4>

<!-- ------------------- Adding properties quantities ----------------- -->

<br>
<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
<h5 id="properties_gui_controls"> Properties <i>Button</i> - Setting physical properties</h5>
The physical properties displayed in the panel depend of the selected equation.
<br> <br>

<strong> Fluid equation properties </strong>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-fluid-props.png" style="width: 30%;">
</figure>
<strong>Density</strong> <i>TextBox</i> - Fluid density
<br>
<strong>Viscosity</strong> <i>TextBox</i> - Fluid viscosity

<br> <br> 
<strong> Linear elasticity equation properties </strong>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-linear-elasticity-props.png" style="width: 30%;">
</figure>
<strong>Density</strong> <i>TextBox</i> - Solid density
<br>
<strong>Elastic modulus</strong> <i>TextBox</i> - Elastic modulus 
<br>
<strong>Poisson ratio</strong> <i>TextBox</i> -  Poisson ratio. Value <= 0.5


<br> <br> 
<strong> Structure equation properties </strong>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-structure-props.png" style="width: 30%;">
</figure>
<strong>Density</strong> <i>TextBox</i> - Solid density
<br>
<strong>Elastic modulus</strong> <i>TextBox</i> - Elastic modulus 
<br>
<strong>Poisson ratio</strong> <i>TextBox</i> -  Poisson ratio. Value <= 0.5
<br>
<strong>Constitutive model</strong> <i>ComboBox</i> - Constitutive model selected from
<ul style="list-style-type:disc;">
<li>stVK - St. Venant-Kirchhoff material model</li>
<li>nHK - NeoHookean material model </li>
</ul>



<br><br>
<strong> FSI equation properties </strong>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-fsi-props.png" style="width: 30%;">
</figure>
<strong>Density</strong> <i>TextBox</i> - Fluid density
<br>
<strong>Viscosity</strong> <i>TextBox</i> - Fluid viscosity
<br>
<strong>Solid Density</strong> <i>TextBox</i> - Solid density
<br>
<strong>Poisson ratio</strong> <i>TextBox</i> -  Poisson ratio. Value <= 0.5
<br>
<strong>Constitutive model</strong> <i>ComboBox</i> - Constitutive model selected from
<ul style="list-style-type:disc;">
<li>stVK - St. Venant-Kirchhoff material model</li>
<li>nHK - NeoHookean material model </li>
</ul>
</div>

<!-- ------------------- Adding output quantities ----------------- -->

<br>
<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
<h5 id="output_gui_controls"> Output <i>Button</i> - Adding output quantities </h5>
The quantities output by default are displayed in the right sub-panel.

Selecting the output quantity name in the left panel and selecting the <strong>&gt;</strong> <i>Button</i> moves 
it to the right panel and adds that quantity for output.
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-output.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
</div>

<!-- ------------------- Adding Boundary Conditions ----------------- -->

<br>
<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
<h5 id="bcs_gui_controls"> BCs <i>Button</i> - Adding Boundary Conditions </h4>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-bcs.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<strong>Add</strong> <i>Button</i> - Select to add a boundary condition. A <strong>Boundary Condition Setup</strong> popup window is displayed with a list of mesh boundary faces. Selecting a face name allows for setting the various parameters for a given type of boundary condition.
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-bc-popup.png" style="float: left; width: 50%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
<strong>Boundary Condition Setup Parameters</strong>
<br>
<strong>Face list:</strong> <i>ListTable</i> - Lists the boundary surface face names defined for a domain. 
Selecting a face name adds a boundary condition for that face.

<strong>BC Type:</strong> <i>ComboBox</i> - Select boundary condition type from the list [ Neumann Dirichlet] 

<strong>Directional BC </strong> <i>CheckBox</i> - If selected 

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #000000; border-left: 1px solid #d0d0d0">
<strong>Time dependence</strong> 

<strong>Steady</strong> <i>CheckBox</i> - If selected 

<strong>Value</strong> <i>TextBox</i> - 

<strong>Unsteady</strong> <i>CheckBox</i> - If selected 

<strong>Temporal values file</strong> <i>FileBrowser</i> - Select to identify the time values
</div>

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #000000; border-left: 1px solid #d0d0d0">
<strong>Resistance</strong> - <i>CheckBox</i> - If selected

<strong>Value</strong> <i>TextBox</i> - 

<strong>Coupled</strong> - <i>CheckBox</i> - If selected
</div>

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #000000; border-left: 1px solid #d0d0d0">
<strong>General</strong> - <i>CheckBox</i> - If selected

<strong>Temporal and spatial values file</strong> <i>FileBrowser</i> - Select to identify the time values
</div>

<strong>Projection</strong> - <i>CheckBox</i> - If selected

<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #000000; border-left: 1px solid #d0d0d0">
<strong>Profiledependance</strong> 

<strong>Zero out perimeter</strong> - <i>CheckBox</i> - If selected

<strong>Impose flux</strong> - <i>CheckBox</i> - If selected

<strong>Flat</strong> - <i>CheckBox</i> - If selected

<strong>Parabolic</strong> - <i>CheckBox</i> - If selected

<strong>User defined</strong> - <i>CheckBox</i> - If selected

<strong>Spatial profile file path</strong> <i>FileBrowser</i> - Select to identify the time values

</div>

<strong>Impose on state variable integral</strong> - <i>CheckBox</i> - If selected

<strong>Effective direction</strong> <i>TextBox</i> - 

<strong>Reset</strong> <i>Button</i> - 

<strong>Cancel</strong> <i>Button</i> - 

<strong>OK</strong> <i>Button</i> - 

</div>

<!-- ------------------- Advanced ----------------- -->

<br>
<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
<h5 id="advanced_gui_controls"> Advanced <i>Button</i> - Setting advanced solver parameters </h4>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-advanced.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
<strong>Coupled</strong> - <i>CheckBox</i> - If selected

<strong>Tolerance</strong> <i>TextBox</i> - 

<strong>Residual dB reduction</strong> <i>SpinBox</i> - 

<strong>Min iterations</strong> <i>SpinBox</i> - 

<strong>Max iterations</strong> <i>SpinBox</i> - 

<strong>Backflow stabilization</strong> <i>SpinBox</i> - 

<strong>Reset</strong> <i>Button</i> - 

</div>

<!-- ------------------- Linear Solver ----------------- -->

<br>
<div style="background-color: #E0E0E0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
<h5 id="linear_solver_gui_controls"> Linear solver<i>Button</i> - Setting linear solver parameters </h4>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/physics-panel-linear-solver.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
<strong>Coupled</strong> - <i>CheckBox</i> - If selected

<strong>Type</strong> <i>ComboBox</i> - Select the linear solver to use.

<strong>Max iterations</strong> <i>TextBox</i> - 

<strong>Tolerance</strong> <i>TextBox</i> - 

<strong>Krylov dimension</strong> <i>TextBox</i> - 

<strong>Absolute Tolerance</strong> <i>TextBox</i> - 

<strong>Preconditioner</strong> <i>ComboBox</i> - Select the linear solver preconditioner to use.

</div>


