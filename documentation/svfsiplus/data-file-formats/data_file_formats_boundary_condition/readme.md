
<h2 id="data_file_formats_boundary_condition"> Boundary Condition Data</h2>
The data used for a boundary condition defines the spatial and/or the temporal distribution of values
over a boundary surface. Data can be of five types

<ul style="list-style-type:disc;">
  <li> <a href="#data_file_formats_boundary_condition_fourier"> Fourier coefficients <a> </li>
  <li> <a href="#data_file_formats_boundary_condition_spatial"> Spatial distribution <a> </li>
  <li> <a href="#data_file_formats_boundary_condition_temporal"> Temporal distribution <a> </li>
  <li> <a href="#data_file_formats_boundary_condition_temporal_spatial"> Temporal and spatial distribution <a> </li>
  <li> <a href="#bdata_file_formats_boundary_condition_profile"> User-defined flow profile <a> </li>
</ul>

Data is stored using two file formats
<ul style="list-style-type:disc;">
  <li> ASCII text file usually with a <strong>.dat</strong> file extension. </i>
  <li> <a href="#appendix_vtk_file_format"> VTK format </a> file </i> 
</ul> 

<!-- --------------------------------------------------- -->
<!-- ---------- Fourier coefficients Data -------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_fourier"> Fourier coefficients Data</h3>
The data file contains the Fourier coefficients interpolating temporal distribution data for a boundary face. This data will be directly used to represent periodic data at intermediate time values.

This file is set using the solver input file <a href="#bc_Fourier_coefficients_file_path"> Fourier_coefficients_file_path</a> keyword. 

The file format is
<pre>
<i>InitialTime</i> <i>Period</i>
<i>InitialValue_1</i> <i>InitialValue_2</i> ... <i>InitialValue_<strong>NDIM</strong></i> 
<i>TimeDerivativeLinearPart1</i> <i>TimeDerivativeLinearPart2</i> ... <i>TimeDerivativeLinearPart_NDIM</i>
<i>NumberOfFourierModes</i>
<i>RealPart_1</i> <i>ImaginaryPart_1</i>
...
</pre>

where <strong>NDIM</strong> is the number of space dimensions used in the simulation.

<!-- --------------------------------------------------- -->
<!-- ----------- Spatial Distribution Data ------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_spatial"> Spatial Distribution Data</h3>
The data files for the spatial distribution of data are used for 
<ul style="list-style-type:disc;">
  <li> Neumann boundary condition </li>
  <li> Traction boundary condition </li>
  <li> Coupled Momentum boundary condition </li>
</ul> 

<h4> Neumann and Traction boundary conditions </h4>
For Neumann and Traction boundary conditions the data file is a 
<a href="#appendix_vtk_file_format"> VTK VTP </a> format file containing a PointData array
named 
<ul style="list-style-type:disc;">
  <li> <strong>Pressure</strong> - Neumann boundary condition </li>
  <li> <strong>Traction</strong> - Traction boundary condition </li>
</ul> 

A spatial data file is set using the solver input file <a href="#bc_Spatial_values_file"> Spatial_values_file </a> keyword.

<h4> Coupled momentum boundary condition </h4>
For a coupled momentum boundary condition the data file is a 
<a href="#appendix_vtk_file_format"> VTK VTU </a> format file used to initialized stresses (prestress) and 
displacements using PointData arrays named
<ul style="list-style-type:disc;">
  <li> <strong>Stress</strong> - Initialize stresses </li>
  <li> <strong>Displacement</strong> - Initialize displacements </li>
</ul> 

These spatial data files are set using the solver input file 
<a href="#bc_Initial_displacements_file_path"> Initial_displacements_file_path</a> and 
<a href="#bc_Prestress_file_path"> Prestress_file_path </a> and keywords.


<!-- --------------------------------------------------- -->
<!-- ---------- Temporal distribution Data ------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_temporal"> Temporal Distribution Data</h3>
The data file contains a single time-varying value per time step for a boundary surface. The values (e.g. flow rate) will be distributed to the boundary surface nodes and interpolated in time using a given number of Fourier modes.

Temporal data will be interpolated internally using Fourier series interpolation to obtain periodic data at intermediate time values.

This file is set using the solver input file <a href="#bc_Temporal_values_file_path"> Temporal_values_file_path</a> keyword. 

The file format is
<pre>
<i>NumberOfTimePoints</i>  <i>NumberOfFourierModes</i>  
<i>Time_1</i>  <i>Value_1</i>  
<i>Time_2</i>  <i>Value_2</i>  
...
<i>Time_<strong>NumberOfTimePoints</i></strong>  <i>Value_<strong>NumberOfTimePoints</strong></i>  
</pre>

Example: <a href="https://github.com/SimVascular/svFSIplus/blob/main/tests/cases/fluid/pipe_RCR_3d/lumen_inlet.flow"> Inlet fluid flow rate <a>

<!-- --------------------------------------------------- -->
<!-- ---- Temporal and spatial distribution Data ------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_temporal_spatial"> Temporal and Spatial Distribution Data</h3>
The data file contains time-varying values per time step for each node on a boundary surface. 
The values are interpolated in time using a given number of Fourier modes.

This file is set using the solver input file <a href="#bc_Temporal_and_spatial_values_file_path"> Temporal_and_spatial_values_file_path</a> keyword. 

The file format is
<pre>
<i>NumberDegreesOfFreedom</i> <i>NumberOfTimePoints</i>  <i>NumberOfNodes</i>
<i>Time_1</i>  
<i>Time_2</i> 
...
<i>Time_<strong>NumberOfTimePoints</i></strong>  
<i>NodeID_1</i>
<i>Time_1</i>  <i>Value_1,1</i> <i>Value_1,2</i>  ... <i>Value_1,<strong>NumberDegreesOfFreedom</strong></i>
<i>Time_2</i>  <i>Value_2,1</i> <i>Value_2,2</i>  ... <i>Value_2,<strong>NumberDegreesOfFreedom</strong></i>
....
<i>NodeID_2</i>
<i>Time_1</i>  <i>Valu_1</i> <i>Value_2</i>  ... <i>Value_<strong>NumberDegreesOfFreedom</strong></i>
...
<i>NodeID_</strong>NumberOfNodes</strong></i>
...
</pre>

Example: <a href="https://media.githubusercontent.com/media/SimVascular/svFSIplus/main/tests/cases/stokes/manufactured_solution/P1P1/bforce/N016/bforce.dat"> Volumetric body force <a>


<!-- --------------------------------------------------- -->
<!-- ---------------- User Profile Data ---------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_profile"> User Profile Data</h3>
The data file contains values for each node on a boundary surface defining the shape of the profile for a boundary surface. 

This file is set using the solver input file <a href="#bc_Spatial_profile_file_path"> Spatial_profile_file_path </a> keyword. 

The file format is
<pre>
<i>NodeID_1</i> <i>Value_1</i>
<i>NodeID_2</i> <i>Value_2</i>
...
<i>NodeID_<strong>NumberOfFaceNodes</strong></i> <i>Value_<strong>NumberOfFaceNodes</strong></i> 
</pre>

where <strong>NumberOfFaceNodes</strong> is the number of nodes in the boundary surface.

