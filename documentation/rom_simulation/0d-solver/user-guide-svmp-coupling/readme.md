### Coupling svZeroDSolver to svMultiPhysics

svZeroDSolver can be coupled to svMultiPhysics to prescribe lumped parameter network (LPN) boundary conditions at the outlet of the 3D domain. This provides a powerful, modular multi-fidelity framework where we can implement and assign different types of boundary conditions, with many options spanning from the standard Windkessel boundary conditions to fully closed-loop circulation models. 

#### svMultiPhysics file format

To activate the coupling from the svMultiPhysics side, add an `svZeroDSolver_interface` block inside the equation definition, set `Time_dependence` to `Coupled` for each coupled boundary condition, and name its svZeroDSolver block inside a `Coupling_interface` element. A minimal XML excerpt looks like this:

```xml
<Add_equation type="fluid">
  ...
  <svZeroDSolver_interface> 
     <Coupling_type> semi-implicit </Coupling_type>
     <Configuration_file> svzerod_3Dcoupling.json </Configuration_file>
     <Shared_library> ../../../../svZeroDSolver/build/src/interface/libsvzero_interface.dylib </Shared_library>  
     <Initial_flows> 0.0 </Initial_flows>
     <Initial_pressures> 0.0 </Initial_pressures>
   </svZeroDSolver_interface> 

  <Add_BC name="lumen_outlet">
    <Type>Neu</Type>
    <Time_dependence>Coupled</Time_dependence>
    <Coupling_interface>
      <svZeroDSolver_block> RCR_coupling </svZeroDSolver_block>
    </Coupling_interface>
  </Add_BC>
</Add_equation>
```

Where:
- `Configuration_file` points to the 3D-0D coupling JSON file
- `Shared_library` points to the svZeroDSolver interface in your svZeroDSolver build directory.
- `Coupling_type` is `explicit`, `semi-implicit`, or `implicit`, and sets how the 0D model contributes to the svMultiPhysics tangent matrix.
- Each `svZeroDSolver_block` inside a `Coupling_interface` must be the `name` of one `external_solver_coupling_block` in the svZeroDSolver JSON, enabling the 3D face to exchange data with the matching 0D block.

Versions of svMultiPhysics before May 2026 read `svZeroDSolver_block` directly inside `Add_BC`. Current versions require the `Coupling_interface` element and stop with an error without it.

All `svZeroDSolver_interface` options, including the finite-difference settings used for implicit and semi-implicit coupling, are described in the svMultiPhysics <a href="/documentation/multi_physics.html#svzerodsolver_interface_parameters">svZeroDSolver Interface Subsection</a>. The `Coupling_interface` options, such as under-relaxation and pressure ramping, are described in the svMultiPhysics <a href="/documentation/multi_physics.html#coupling_interface_parameters">Coupling Interface Parameters</a>.

##### Neumann and Dirichlet coupling

The `Type` of the coupled boundary condition decides which quantity each solver sends:

| 3D `Type` &emsp; | svMultiPhysics sends &emsp; | svZeroDSolver returns &emsp; | Coupling block `type` &emsp; |
|---|---|---|---|
| `Neu` &emsp; | Flow rate &emsp; | Pressure &emsp; | `FLOW` &emsp; |
| `Dir` &emsp; | Pressure &emsp; | Flow rate &emsp; | `PRESSURE` &emsp; |

A Dirichlet coupled boundary condition receives a volumetric flow rate rather than a velocity, so it must also set `Impose_flux` to `true`. svMultiPhysics stops with an error otherwise. A velocity profile can be chosen with `Profile`:

```xml
<Add_BC name="inlet">
  <Type> Dir </Type>
  <Time_dependence> Coupled </Time_dependence>
  <Impose_flux> true </Impose_flux>
  <Profile> Parabolic </Profile>
  <Coupling_interface>
    <svZeroDSolver_block> inlet_coupling </svZeroDSolver_block>
  </Coupling_interface>
</Add_BC>
```

See the svMultiPhysics test cases <a href="https://github.com/SimVascular/svMultiPhysics/tree/main/tests/cases/fluid/pipe_RCR_sv0D" target="_blank">pipe_RCR_sv0D</a> (Neumann) and <a href="https://github.com/SimVascular/svMultiPhysics/tree/main/tests/cases/fluid/Tpipe_svZeroD_Dir" target="_blank">Tpipe_svZeroD_Dir</a> (Dirichlet) for complete examples.

#### svZeroDSolver file format

We only need to add one additional key to the top level structure of the svZeroDSolver json file:

```python
{
    "simulation_parameters": {...},
    "vessels": [...],
    "junctions": [...],
    "boundary_conditions": [...],
    "external_solver_coupling_blocks": [...]
}
```

The `simulation_parameters` block reuses the standard svZeroDSolver keys, but a few fields are essential for 3D–0D coupling. The most common options are listed below.

| Parameter key &emsp; | Required &emsp; | Description |
|----------------------|-----------------|-------------|
| `coupled_simulation` &emsp; | Yes &emsp; | Must be set to `true` so the solver exchanges interface data with svMultiPhysics. |
| `number_of_time_pts` &emsp; | Yes &emsp; | Number of discrete points for which the svZeroDSolver will integrate the 0D model between 3D timesteps. |
| `output_all_cycles` &emsp; | Yes &emsp; | Must be set to `true`. It defaults to `false`, and the svZeroDSolver interface library stops with an error when it is `false`. |
| `steady_initial` &emsp; | Optional &emsp; | Starts the coupled run from a steady-state solution when `true`; set to `false` if transient start-up data are provided by svMultiPhysics. `false` is preferred in most cases |

Other general svZeroDSolver <a href="/documentation/rom_simulation.html#0d-solver-user-guide-input"> simulation parameters </a> (e.g. tolerances or error controls) can also be included as needed and behave the same as in standalone 0D simulations. The exception is `output_mean_only`, which the interface library does not support: leave it at `false`.

each `external_solver_coupling_block` will connect some block in the 0D model to a boundary of the 3D model. The structure of each `external_solver_coupling_block` is as follows:

```python
{
    "name": "sample_block",
    "type": "FLOW",
    "location": "inlet",
    "connected_block": "boundary_condition_1",
    "periodic": false,
    "values": {
        "t": [
            0.0,
            1.0
        ],
        "Q": [
            1.0,
            1.0
        ]
    }
}
```
The keys inside an `external_solver_coupling_block` control how a 3D boundary exchanges data with the 0D model.

| Parameter key &emsp; | Required &emsp; | Description |
|----------------------|-----------------|-------------|
| `name` &emsp; | Yes &emsp; | Unique identifier for the coupling block; used to label exchanged interface results. |
| `type` &emsp; | Yes &emsp; | Quantity the 3D solver sends to the 0D model through this block: `FLOW` or `PRESSURE`. The 0D model returns the other quantity. For example, a 3D outlet with a Neumann boundary condition sends `FLOW` and receives pressure. |
| `location` &emsp; | Yes &emsp; | Boundary location **with respect to the 0D model** (`inlet`, `outlet`) that the coupling block represents. For example, an outlet BC for the 3D model would use an `inlet` coupling block.  |
| `connected_block` &emsp; | Yes &emsp; | The 0D block on the other side of the coupling block: a boundary condition's `bc_name`, a vessel's `vessel_name`, or `ClosedLoopHeartAndPulmonary`. |
| `periodic` &emsp; | Optional &emsp; | Whether the waveform in `values` repeats when the 3D solver requests multiple cycles. Defaults to `true`. |
| `values` &emsp; | Yes &emsp; | Populated by the solver for data handling between 3D and 0D simulation. Leave at placeholder values: {"t": [0.0, 1.0], "Q": [1.0, 1.0]} for a `FLOW` block, or {"t": [0.0, 1.0], "P": [1.0, 1.0]} for a `PRESSURE` block. |

With `location` set to `inlet`, flow goes from the coupling block into `connected_block`. With `outlet`, flow goes from `connected_block` into the coupling block. Only some connected blocks are supported at each location. The type of a connected block is its `bc_type` for a boundary condition, or `BloodVessel` for any vessel.

| `location` &emsp; | Supported connected block types &emsp; |
|---|---|
| `inlet` &emsp; | `RESISTANCE`, `RCR`, `IMPEDANCE`, `ClosedLoopRCR`, `CORONARY`, `ClosedLoopCoronaryLeft`, `ClosedLoopCoronaryRight`, `BloodVessel` &emsp; |
| `outlet` &emsp; | `ClosedLoopRCR`, `ClosedLoopHeartAndPulmonary`, `BloodVessel` &emsp; |
