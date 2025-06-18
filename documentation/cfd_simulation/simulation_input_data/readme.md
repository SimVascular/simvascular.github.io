# Simulation Input Data 

The data needed for a CFD simulation comprises three components

<ul style="list-style-type:disc;">
  <li> Finite element mesh </li>
  <li> Inlet flow data </li>
  <li> Solver input file </li>
</ul>

These data are created by the **CFD Simulation Tool** and stored under the _SVPROJECT/Simulations_ directory for each simulation _job_. 

## Finite element mesh

Finite element mesh data is stored in the Visualization Toolkit (VTK) file format. Finite element mesh files are typically created using the SimVascular **SV Meshing Tool** and copied into the _SVPROJECT/Simulations/JOBNAME_ directory. The finite element volumetric mesh is stored in a VTK VTU file. The finite element walls and inlet/outlet surfaces are stored in VTK VTP files. These surfaces are named in the **SV Modeling Tool**.

## Inlet flow data 

The inlet flow data is used to define the volumetric flow rate of fluid entering a surface face. It is used to derive a Dirichlet velocity boundary condition applied in the direction normal to the face. The velocity at each node in the surface mesh is adjusted to match the specified volumetric flow rate.

## Solver input file

The solver input file is a text file in Extensible Markup Language (XML) containing simulation parameter values set using the **CFD Simulation Tool** GUI. The svMultiPhysics solver reads the parameters and input data (e.g. mesh files) needed to set up and execute a simulation.

# Simulation Units 

The **svMultiPhysics** solver does assume any specific physical units. However, the units implied by the input data (length scale, flow rate, etc.) must be dimensionally consistent. 

The following table list consistent units in CGS, MGS, and  SI units. 

<table class="table table-bordered">
<thead>
<tr>
  <th>Quantity</th>
  <th>CGS Unit</th>
  <th>MGS Unit</th>
  <th>SI Unit</th>
</tr>
</thead>
<tr>
  <td>Length</td>
  <td>cm</td>
  <td>mm</td>
  <td>m</td>
</tr>
<tr>
  <td>Mass</td>
  <td>gr</td>
  <td>gr</td>
  <td>Kg</td>
</tr>
<tr>
  <td>Time</td>
  <td>s</td>
  <td>s</td>
  <td>s</td>
</tr>
</table>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The default values set in the <strong>Basic Parameters</strong> section of the <strong>CFD Simulation Tool</strong> GUI for fluid density and viscosity are in CGS units. Mesh and flow data are therefor assumed by default to be in CGS units.
</div>

