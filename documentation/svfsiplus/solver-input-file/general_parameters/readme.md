<!-- =================================================== -->
<!-- ========== General Simulation Parameters ========== -->
<!-- =================================================== -->

<h4 id="general_parameters"> General Simulation Parameters </h4>
The General Simulation Parameters section contains the basic parameters used to setup the simulation
<ul style="list-style-type:disc;">
  <li> spatial dimension </li> 
  <li> time step control </li>
  <li> results output </li>
</ul>

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h5>Parameters</h5>
<div class="bc_param_div">
<strong>&lt;Continue_previous_simulation&gt;</strong> <i>boolean</i> [false]  <nobr>
<strong>&lt;/Continue_previous_simulation&gt;</strong>
</nobr><br>
If <i>true</i> then restart the simulation with a restart file generated by svFSIplus.
<br>
<strong>&lt;Number_of_spatial_dimensions&gt;</strong> <i>integer</i> <nobr>
<strong>&lt;/Number_of_spatial_dimensions&gt;</strong>
</nobr><br>
The number of spatial dimensions the simulation is using. Acceptable values: 2 or 3
<br>
<strong>&lt;Number_of_time_steps&gt;</strong> <i>integer</i> <nobr>
<strong>&lt;/Number_of_time_steps&gt;</strong>
</nobr><br>
The number of time steps to run the simulation.
<br>
<strong>&lt;Time_step_size&gt;</strong> <i>real</i> <nobr>
<strong>&lt;/Time_step_size&gt;</strong>
</nobr><br>
The value use to increment the simulation time.
<br>
<strong>&lt;Spectral_radius_of_infinite_time_step&gt;</strong> <i>real</i>  [0.5] <nobr>
<strong>&lt;/Spectral_radius_of_infinite_time_step&gt;</strong>
</nobr><br>
The spectral radius is used to compute parameters for the generalized alpha method. A value of 0.0 leads to an over-damped system while 1.0 leads to an undamped system.
<br>
<section id="gen_Save_results_to_VTK_format">
<strong>&lt;Save_results_to_VTK_format&gt;</strong> <i>boolean [false]</i> <nobr>
<strong>&lt;/Save_results_to_VTK_format&gt;</strong>
</nobr><br>
If <i>true</i> then save simulation results to VTK-format files. 
<br>
<section id="gen_Name_prefix_of_saved_VTK_files">
<strong>&lt;Name_prefix_of_saved_VTK_files&gt;</strong> <i>string</i> [result] <nobr>
<strong>&lt;/Name_prefix_of_saved_VTK_files&gt;</strong>
</nobr><br>
The name prefixed to a the file name when saving simulation results to VTK-format files.
<br>
<section id="gen_Increment_in_saving_VTK_files">
<strong>&lt;Increment_in_saving_VTK_files&gt;</strong> <i>integer</i> [1] <nobr>
<strong>&lt;/Increment_in_saving_VTK_files&gt;</strong>
</nobr><br>
Indicates how often to save simulation results to a VTK-format file.
<br>
<section id="gen_Save_results_in_folder">
<strong>&lt;Save_results_in_folder&gt;</strong> <i>string [none]</i> <nobr>
<strong>&lt;/Save_results_in_folder&gt;</strong>
</nobr><br>
Save simulation results in the specified directory. 
<br>
<section id="gen_Start_saving_after_time_step">
<section id="gen_Convert_BIN_to_VTK_format">
<strong>&lt;Convert_BIN_to_VTK_format&gt;</strong> <i>boolean [false]</i> <nobr>
<strong>&lt;/Convert_BIN_to_VTK_format&gt;</strong>
</nobr><br>
If <i>true</i> then all available restart files will be converted to VTK format files.
<br>
<strong>&lt;Start_saving_after_time_step&gt;</strong> <i>integer</i> [1] <nobr>
<strong>&lt;/Start_saving_after_time_step&gt;</strong>
</nobr><br>
Save simulation results after the given time step.
<br>
<section id="gen_Increment_in_saving_restart_files">
<strong>&lt;Increment_in_saving_restart_files&gt;</strong> <i>integer</i> [10] <nobr>
<strong>&lt;/Increment_in_saving_restart_files&gt;</strong>
</nobr><br>
Indicates how often to save restart files.
<br>
<section id="gen_Restart_file_name">
<strong>&lt;Restart_file_name&gt;</strong> <i>string [stFile.bin]</i> <nobr>
<strong>&lt;/Restart_file_name&gt;</strong>
</nobr><br>
Name of the file used to store simulation state data. This file is used for restarting simulations.
<br>
<section id="general_params_Simulation_initialization_file_path">
<strong>&lt;Simulation_initialization_file_path&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Simulation_initialization_file_path&gt;</strong>
</nobr><br>
Initialize all state variables from a VTK VTU file.
<br>
</div>

<h5>Examples</h5>