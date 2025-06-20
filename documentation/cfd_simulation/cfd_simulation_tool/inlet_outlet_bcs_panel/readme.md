<br>

<h2 id="inlet_outlet_bcs_panel" style="text-align:center;"> Inlet and outlet bcs Panel </h2>

The <strong>Inlet and outlet bcs Panel</strong> is used to set the boundary conditions for the fluid simulation.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/inlet_outlet_bcs_panel.png">
<figcaption class="svCaption"> The <strong>Inlet and outlet bcs</strong> panel.
</figcaption>
</figure>

The panel displays <i>Table</i> with a list of mesh boundary faces. Selecting a face name allows for setting the various parameters for a given type of boundary condition.

Selecting the table entry for a face under the <strong>BC Type</strong> column displays a <i>ComboBox</i> used to select the boundary condition type for the given face.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/inlet_outlet_bcs_type.png">
<figcaption class="svCaption"> Selecting a boundary condition type from the <strong>BC Type</strong> menu.
</figcaption>
</figure>

The <i>ComboBox</i> contains three boundary condition types

<ul style="list-style-type:disc;">
  <li> <strong>Prescribed Velocities</strong> Inlet flow data is used to define the volumetric flow rate of fluid entering a face surface.</li>
  <li> <strong>Resistance</strong> A resistance boundary condition defined by a single value in the <strong>Values</strong> column. </li>
  <li> <strong>RCR</strong> An RCR boundary condition defined by a three values in the <strong>Values</strong> column.</li>
</ul>

### Setting inlet flow data

For a face with a <strong>Prescribed Velocities</strong> boundary condition type selecting <strong>inlet</strong> face from the <strong>Name</strong> column displays the <strong>Set Inlet/Outlet BCs </strong> <i>Popup</i> panel for setting a velocity profile.

<figure>
<img class="svImg svImgSm" src="/documentation/cfd_simulation/cfd_simulation_tool/images/inlet_outlet_bcs_velocities.png">
<figcaption class="svCaption"> The <strong>Set Inlet/Outlet BCs </strong> <i>Popup</i> panel for setting inflow boundary condition data.
</figcaption>
</figure>

<strong>Set Inlet/Outlet BCs </strong>

<ul style="list-style-type:disc;">
  <li> <strong>Analytical Shape</strong> A <i>ComboBox</i> used to select the velocity profile shape.</li>
  <li> <strong>Point Number</strong> The number of temporal data points used for one period of flow. </i>
  <li> <strong>Fourier Modes</strong> The number of modes used for Fourier smoothing of flow data. </i>
  <li> <strong>Flow rate (from file)</strong> Selects the file containing the flow data. </i>
  <li> <strong>Perioed</strong> The time period of the data contained in the flow data file. </i>
  <li> <strong>Flip normal</strong> Flip the face normal used to compute the direction of flow. </i>
</ul>

Select <strong>Flow rate (from file)</strong> to read the <strong>unsteady.flow</strong> flow data file.

Select <strong>outlet</strong> face from the <strong>Name</strong> column to set the resistance for that face to 1333.0. 






