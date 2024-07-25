
<h2 id="data_file_formats_initial_condition"> Initial Condition Data</h2>
The data file is used to initialize values on a finite elemenet volume mesh. It is a 
<a href="#appendix_vtk_file_format"> VTK VTU </a> format file containiing PointData arrays.

<h3> Velocity and Pressue Data</h3>
Velocity and pressue data is initialized using <a href="#appendix_vtk_file_format"> VTK VTU </a> 
format file containiing PointData arrays named <strong>Velocity</strong> and <strong>Pressure</strong>.

The data files are set using the solver input file 
<a href="#bc_mesh_params_Initial_pressures_file_path"> Initial_pressures_file_path</a> and 
<a href="#mesh_params_Initial_velocities_file_path"> Initial_velocities_file_path</a> keywords.

<h3> State Variables </h3>
All state varaiables for a simulation can be initialized using <a href="#appendix_vtk_file_format"> VTK VTU </a> 
format file containiing the appropriate PointData arrays.

The data file is set using the solver input file 
<a href="#general_params_Simulation_initialization_file_path"> Simulation_initialization_file_path</a> keyword.

