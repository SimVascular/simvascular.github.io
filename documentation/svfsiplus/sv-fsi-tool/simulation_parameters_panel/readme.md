<!-- --------------------------------------------------- -->
<!-- ------------- Simulation Parameters Panel --------- -->
<!-- --------------------------------------------------- -->

<h2 id="simulation_parameters_panel"> Simulation Parameters Panel </h2> 
The Simulation Parameters panel is used to set general solver parameters.

<h3> Panel Layout </h3> 

<br>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/simulation-parameters-panel.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<br>


<h3> Usage </h3> 

<pre>
<h5>Time control</h5> 
<strong>Start from previous simulation</strong> <i>CheckBox</i> - If selected then start the simulation from 
the saved state of a previous simulation.

<strong>Number of time steps</strong> <i>TextBox</i> - The number of time steps to run the simulation.

<strong>Time step size</strong> <i>TextBox</i> - The simulation time step.
</pre>

<pre>
<h5>Restart files</h5> 
<strong>Name</strong><i> TextBox</i> - The name prefix of the files used to store simulation state data.

<strong>Save increment</strong> <i>TextBox</i> - Indicates how often to save restart files.

<strong>Save results after time step</strong> <i>TextBox</i> - Start saving simulation results after this time.
</pre>

<pre>
<strong>Save as VTK</strong> <i>CheckBox</i> - If selected then save simulation output to VTK files.

<strong>Name</strong> <i>TextBox</i> - The name prefix of the VTK files used to store output data.

<strong>Save increment</strong> <i>TextBox</i> - Indicates how often to save the VTK files.
</pre>

<strong>Time-averaged results</strong> <i>CheckBox</i> - If selected then compute time-averaged results for 
the entire simulation using the using VTU files written during the simulation.
<br>

<pre>
<strong>Advanced options</strong> <i>CheckBox</i> - If selected then enable setting advanced parameters.

<strong>Spectral radius of infinite time step</strong> <i>TextBox</i> - The spectral radius is used to compute parameters for the generalized alpha method. A value of 0.0 leads to an over-damped system while 1.0 leads to an undamped system.

<strong>Remeshing</strong> <i>CheckBox</i> - If selected then the finite element mesh for FSI simulations will be
automatically remeshed during a simulation.

<strong>Warning</strong> <i>CheckBox</i> - If selected then print out warning messages indicating unexpected
inputs or simulation behavior.

<strong>Verbose</strong> <i>CheckBox</i> - If selected print detailed messages when processing input.

<strong>Debug</strong> <i>CheckBox</i> - If selected the print additional information that may be used for debugging purposes.
</pre>

