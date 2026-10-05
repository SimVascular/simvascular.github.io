<h2 id="tutorial_create_simulation">Create CFD Simulation</h2>

Computational fluid dynamics (CFD) simulations permit detailed analyses of blood flow and pressure in patient-specific
models of the human vasculature. This section uses the <i>CFD Simulation Tool</i> to configure a rigid-wall simulation
for the <b>aorta-iliacs</b> model, run 500 time steps with the <i>svMultiPhysics</i> solver, and view the final result.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The computational cost of solving the governing fluid equations can be large. This short run demonstrates the
simulation workflow on a workstation. Physiological studies typically require additional model preparation, simulation
time, validation, and computing resources.
</div>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The <i>svMultiPhysics</i> solver does not use predefined units. All physical parameters, boundary conditions, and mesh
dimensions must use a consistent system of units. This tutorial uses the centimeter-gram-second (CGS) system.
</div>

<br>
The <a href="/documentation/cfd_simulation.html#cfd_simulation_tool">CFD Simulation Tool</a> documentation describes
the controls and simulation inputs in more detail.

<h3 id="tutorial_create_simulation_1">Create a simulation job</h3>

Create a CFD simulation job named <b>aorta-iliacs</b> for the model created earlier in this tutorial.

<table class="table table-bordered" style="width:100%; table-layout:fixed">
  <colgroup>
    <col style="width:40%">
    <col style="width:60%">
  </colgroup>
  <caption>Create a CFD simulation job named <b>aorta-iliacs</b></caption>
  <tr>
    <th>GUI</th>
    <th>Description</th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-1.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Right-click the <i>Simulations</i> node in the <i>Data Manager</i>.
        <br><br>
        Select <b>Create CFD Simulation Job</b>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-2.png" width="512" style="max-width:100%; height:auto"></td>
    <td>The <b>Create Simulation Job</b> dialog appears.
        <br><br>
        Select <b>aorta-iliacs</b> for the model, and enter <b>aorta-iliacs</b> for the job name.
        <br><br>
        Click <b>OK</b>.
        <br><br>
        <div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
        The model identifies the faces used to define boundary conditions. The mesh is selected later, because multiple
        meshes can be generated from the same model.
        </div>
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-3.png" width="512" style="max-width:100%; height:auto"></td>
    <td>A node named <b>aorta-iliacs</b> is created under <i>Simulations</i>.
        <br><br>
        Double-click the new simulation node to display its settings in the <i>CFD Simulation</i> panel.
        <br><br>
        In the <b>Basic Parameters</b> section, retain the fluid density of <b>1.06</b>, fluid viscosity of <b>0.04</b>,
        and the displayed initial values.
        <br><br>
        Select <b>Inlet and Outlet BCs</b>.
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_simulation_2">Set inlet and outlet boundary conditions</h3>

Use a steady volumetric flow rate at the aortic inlet and resistance conditions at the two iliac outlets.
Download the <a href="/documentation/getting_started/tutorial/steady.flow" download="steady.flow"><b>steady.flow</b></a>
file. It supplies the steady inlet flow data. Its negative flow values direct flow into this model when
<b>Flip Normal</b> is not selected.

Set both iliac outlets to a resistance of 2000 dyne&middot;s/cm<sup>5</sup>. With approximately half the inlet flow
leaving through each outlet, this resistance produces a mean pressure near the physiological range for this tutorial case.

<table class="table table-bordered" style="width:100%; table-layout:fixed">
  <colgroup>
    <col style="width:40%">
    <col style="width:60%">
  </colgroup>
  <caption>Create inlet and outlet boundary conditions</caption>
  <tr>
    <th>GUI</th>
    <th>Description</th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-4.png" width="512" style="max-width:100%; height:auto"></td>
    <td>The <b>Inlet and Outlet BCs</b> table lists the model faces whose face type is <b>cap</b>.
        <br><br>
        Double-click <b>cap_aorta</b> to define the inlet condition.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-5.png" width="512" style="max-width:100%; height:auto"></td>
    <td>In the <b>Set Inlet/Outlet BCs</b> dialog, select <b>Flow rate (from File):</b>, and open the downloaded
        <b>steady.flow</b> file.
        <br><br>
        Confirm that <b>Flip Normal</b> is not selected.
        <br><br>
        Click <b>OK</b>.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-6.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Confirm that <b>cap_aorta</b> is assigned <b>Prescribed Velocities</b>.
        <br><br>
        Double-click <b>cap_left-iliac</b> to define the first outlet condition.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-7.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Select <b>Resistance</b>, enter <b>2000</b>, and click <b>OK</b>.</td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-8.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Confirm that <b>cap_left-iliac</b> is assigned <b>Resistance</b>.
        <br><br>
        Double-click <b>cap_aorta_2</b> to define the second outlet condition.
    </td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-9.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Select <b>Resistance</b>, enter <b>2000</b>, and click <b>OK</b>.</td>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-10.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Confirm that <b>cap_aorta_2</b> is assigned <b>Resistance</b> and that both outlet values are <b>2000</b>.
        <br><br>
        Save the <i>Project</i>.
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_simulation_3">Confirm wall properties and set solver parameters</h3>

Select <b>Wall Properties</b>, and retain <b>Rigid</b> as the wall type. No settings are needed on the
<b>ZeroDSolver Interface</b> or <b>Coupled Momentum Method</b> pages for this tutorial.

The number of time steps and the time step size determine the simulated physical time. Running 500 time steps with a
time step size of 0.001 represents 0.5 seconds of physical time.

<table class="table table-bordered" style="width:100%; table-layout:fixed">
  <colgroup>
    <col style="width:40%">
    <col style="width:60%">
  </colgroup>
  <caption>Set solver parameters</caption>
  <tr>
    <th>GUI</th>
    <th>Description</th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-11.png" width="512" style="max-width:100%; height:auto"></td>
    <td>In the <b>Solver Parameters</b> section, set:
        <br><br>
        <ul>
          <li><b>Number of Timesteps</b>: 500</li>
          <li><b>Time Step Size</b>: 0.001</li>
          <li><b>Increment in saving restart files</b>: 100</li>
        </ul>
        Retain the other displayed values.
        <br><br>
        Select <b>Create Files and Run Simulation</b>.
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_simulation_4">Create the input files and run the simulation</h3>

Before creating the simulation files, configure OpenMPI in SimVascular. Open <b>Preferences</b>, select <b>MPI</b>,
click the <b>...</b> button next to <b>mpiexec</b>, and select the executable. If its directory is not visible, enable the
file browser's option to show hidden files.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Common <b>mpiexec</b> locations include <b>/opt/homebrew/bin/mpiexec</b> on macOS and <b>/usr/bin/mpiexec</b> on Ubuntu or WSL.
</div>

<br>
<table class="table table-bordered" style="width:100%; table-layout:fixed">
  <colgroup>
    <col style="width:40%">
    <col style="width:60%">
  </colgroup>
  <caption>Create the input files and run 500 time steps</caption>
  <tr>
    <th>GUI</th>
    <th>Description</th>
  </tr>

  <tr>
    <td><img src="/documentation/getting_started/tutorial/images/create-simulation-12.png" width="512" style="max-width:100%; height:auto"></td>
    <td>Select <b>aorta-iliacs</b> for the mesh.
        <br><br>
        Click <b>Create Data Files for Simulation</b>.
        <br><br>
        When the information dialog reports that the files were created, click <b>OK</b>, and save the <i>Project</i>.
        <br><br>
        Click <b>Run Simulation</b>. The run may take several minutes.
        <br><br>
        After the run finishes, an information dialog states that the CFD simulation job has finished. Click <b>OK</b>.
    </td>
  </tr>
</table>

<br>
<h3 id="tutorial_create_simulation_5">Inspect the results in ParaView</h3>

The solver writes result files to a run directory inside the simulation job directory. In
<a href="https://www.paraview.org/">ParaView</a>, open that directory, select the grouped <b>result_..vtu</b> files, and
click <b>Apply</b>. Advance to the final saved time step. The images below show surface pressure and volume-rendered
speed for the <b>aorta-iliacs</b> example. See ParaView's
<a href="https://docs.paraview.org/en/latest/Tutorials/SelfDirectedTutorial/basicUsage.html">Basic Usage</a> tutorial for
an introduction to opening and exploring data.

<div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start">
  <figure style="margin:0">
    <img src="/documentation/getting_started/tutorial/images/create-simulation-14.png" width="430">
    <figcaption class="svCaption">Surface pressure</figcaption>
  </figure>
  <figure style="margin:0">
    <img src="/documentation/getting_started/tutorial/images/create-simulation-15.png" width="430">
    <figcaption class="svCaption">Volume-rendered speed</figcaption>
  </figure>
</div>
