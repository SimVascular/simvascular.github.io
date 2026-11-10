### Coupling svZeroDSolver to svMultiPhysics

svZeroDSolver can be coupled to svMultiPhysics to prescribe lumped parameter network (LPN) boundary conditions at the outlet of the 3D domain. This provides a powerful, modular multi-fidelity framework where we can implement and assign different types of boundary conditions, with many options spanning from the standard Windkessel boundary conditions to fully closed-loop circulation models. 

#### svMultiPhysics file format

To activate the coupling from the svMultiPhysics side, add an `svZeroDSolver_interface` block inside the equation definition and mark the corresponding boundary conditions as `Coupled`. A minimal XML excerpt looks like this:

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
    <svZeroDSolver_block> RCR_coupling </svZeroDSolver_block> 
  </Add_BC>
</Add_equation>
```

Where:
- `Configuration_file` points to the 3D-0D coupling JSON file
- `Shared_library` points to the svZeroDSolver interface in your svZeroDSolver build directory.
- Each `Add_BC` `svZeroDSolver_block` should correspond to one `external_solver_coupling_block` listed in the svZeroDSolver JSON, enabling the 3D face to exchange data with the matching 0D block.

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
| `steady_initial` &emsp; | Optional &emsp; | Starts the coupled run from a steady-state solution when `true`; set to `false` if transient start-up data are provided by svMultiPhysics. `false` is preferred in most cases |

Other general svZeroDSolver <a href="/documentation/rom_simulation.html#0d-solver-user-guide-input"> simulation parameters </a> (e.g. tolerances or error controls) can also be included as needed and behave the same as in standalone 0D simulations.

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
| `type` &emsp; | Yes &emsp; | Quantity sent from the 0D solver to the 3D solver; currently `FLOW` or `PRESSURE` are supported. |
| `location` &emsp; | Yes &emsp; | Boundary location **with respect to the 0D model** (`inlet`, `outlet`) that the coupling block represents. For example, an outlet BC for the 3D model would use an `inlet` coupling block.  |
| `connected_block` &emsp; | Yes &emsp; | The 0D block on the other side of the coupling block: a boundary condition's `bc_name`, a vessel's `vessel_name`, or `ClosedLoopHeartAndPulmonary`. |
| `periodic` &emsp; | Optional &emsp; | Set `true` if the provided waveform should repeat when the 3D solver requests multiple cycles. |
| `values` &emsp; | Yes &emsp; | Populated by the solver for data handling between 3D and 0D simulation, leave at default values {"t": [0.0, 1.0], "Q": [1.0, 1.0]} |

With `location` set to `inlet`, flow goes from the coupling block into `connected_block`. With `outlet`, flow goes from `connected_block` into the coupling block. Only some connected blocks are supported at each location. The type of a connected block is its `bc_type` for a boundary condition, or `BloodVessel` for any vessel.

| `location` &emsp; | Supported connected block types &emsp; |
|---|---|
| `inlet` &emsp; | `RESISTANCE`, `RCR`, `IMPEDANCE`, `ClosedLoopRCR`, `CORONARY`, `ClosedLoopCoronaryLeft`, `ClosedLoopCoronaryRight`, `BloodVessel` &emsp; |
| `outlet` &emsp; | `ClosedLoopRCR`, `ClosedLoopHeartAndPulmonary`, `BloodVessel` &emsp; |
