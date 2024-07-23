
<h2 id="data_file_formats_boundary_condition"> Boundary Condition Data</h2>
The data used for a boundary condition defines the spatial and/or the temporal distribution of values
over a boundary surface. Data can be of four types

<ul style="list-style-type:disc;">
  <li> <a href="#data_file_formats_boundary_condition_fourier"> Fourier coefficients <a> </li>
  <li> <a href="#data_file_formats_boundary_condition_temporal"> Temporal distribution <a> </li>
  <li> <a href="#data_file_formats_boundary_condition_temporal_spatial"> Temporal and spatial distribution <a> </li>
  <li> <a href="#bdata_file_formats_boundary_condition_profile"> User-defined flow profile <a> </li>
</ul>

Data is stored in an ASCII text file usually with a <strong>.dat</strong> file extension.

<!-- --------------------------------------------------- -->
<!-- ---------- Fourier coefficients Data -------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_fourier"> Fourier coefficients Data</h3>

<!-- --------------------------------------------------- -->
<!-- ---------- Temporal distribution Data ------------- -->
<!-- --------------------------------------------------- -->

<br>
<h3 id="data_file_formats_boundary_condition_temporal"> Temporal Distribution Data</h3>
The data file contains a single time-varying value per time step for a boundary surface. The values (e.g. flow rate) will be distributed to the boundary surface nodes and interpolated in time using a given number of Fourier modes.

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


