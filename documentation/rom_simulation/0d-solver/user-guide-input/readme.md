### Input File Format

svZeroDSolver is configured using either a JSON file or a Python dictionary. JSON is a convenient file format to represent a dictionary-like object. More details can be found [here](https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/).

The top-level structure of both is:

```python
{
    "simulation_parameters": {...},
    "vessels": [...],
    "junctions": [...],
    "boundary_conditions": [...],
    "external_solver_coupling_blocks": [...], # Optional: Coupling to an external solver
    "closed_loop_blocks": [...], # Optional: Closed-loop heart model
    "valves": [...], # Optional: Heart valves
    "chambers": [...] # Optional: Heart chambers
}
```

In the following sections, the individual categories are described in more
detail.

Examples of how blocks may be specified in a json configuration file can be found within each block's respective class documentation [here](https://simvascular.github.io/svZeroDSolver/annotated.html)

#### Block types

Every block in the input file is created from a *type* string. The key that holds the type depends on the section the block is in. The table below lists the type key and the valid type strings for each section. Each type string links to the documentation of its block, which describes the block's parameters and JSON usage.

| Section &emsp; | Type key &emsp; | Valid values &emsp; |
|---|---|---|
| `vessels` &emsp; | `zero_d_element_type` &emsp; | [`BloodVessel`](https://simvascular.github.io/svZeroDSolver/class_blood_vessel.html), [`BloodVesselCRL`](https://simvascular.github.io/svZeroDSolver/class_blood_vessel_c_r_l.html), [`BloodVesselRC`](https://simvascular.github.io/svZeroDSolver/class_blood_vessel_r_c.html) &emsp; |
| `junctions` &emsp; | `junction_type` &emsp; | [`NORMAL_JUNCTION`](https://simvascular.github.io/svZeroDSolver/class_junction.html), [`resistive_junction`](https://simvascular.github.io/svZeroDSolver/class_resistive_junction.html), [`BloodVesselJunction`](https://simvascular.github.io/svZeroDSolver/class_blood_vessel_junction.html) &emsp; |
| `boundary_conditions` &emsp; | `bc_type` &emsp; | See [Boundary conditions](#boundary-conditions) below &emsp; |
| `external_solver_coupling_blocks` &emsp; | `type` &emsp; | The same values as `bc_type`; in practice `FLOW` or `PRESSURE`. See [External coupling blocks](#external-coupling-blocks) below &emsp; |
| `closed_loop_blocks` &emsp; | `closed_loop_type` &emsp; | [`ClosedLoopHeartAndPulmonary`](https://simvascular.github.io/svZeroDSolver/class_closed_loop_heart_pulmonary.html) &emsp; |
| `valves` &emsp; | `type` &emsp; | [`ValveTanh`](https://simvascular.github.io/svZeroDSolver/class_valve_tanh.html), [`PiecewiseValve`](https://simvascular.github.io/svZeroDSolver/class_piecewise_valve.html) &emsp; |
| `chambers` &emsp; | `type` &emsp; | [`ChamberSphere`](https://simvascular.github.io/svZeroDSolver/class_chamber_sphere.html), [`ChamberElastanceInductor`](https://simvascular.github.io/svZeroDSolver/class_chamber_elastance_inductor.html), [`ChamberElastanceInductorExponential`](https://simvascular.github.io/svZeroDSolver/class_chamber_elastance_inductor_exponential.html), [`LinearElastanceChamber`](https://simvascular.github.io/svZeroDSolver/class_linear_elastance_chamber.html) &emsp; |

Type strings are case-sensitive. If a type is misspelled, or a block is placed in the wrong section, the solver stops with an error when it loads the input file.

#### Simulation parameters

The svZeroDSolver can be configured with the following options in the
`simulation_parameters` section of the input file. Parameters without a
default value must be specified. an example of the simulation parameters in a json configuration file can be found [here](https://simvascular.github.io/svZeroDSolver/struct_simulation_parameters.html)

|Parameter key                                  | Description                                                 | Default value |
|-----------------------------------------------|------------------------------------------------------------ | --------------|
|`number_of_cardiac_cycles` &emsp;              | Number of cardiac cycles to simulate &emsp;                        | - |
|`number_of_time_pts_per_cardiac_cycle` &emsp;  | Number of time steps per cardiac cycle &emsp;                      | - |
|`absolute_tolerance` &emsp;                    | Absolute tolerance for time integration &emsp;                    | $10^{-8}$ |
|`maximum_nonlinear_iterations` &emsp;          | Maximum number of nonlinear iterations for time integration &emsp; | $30$ |
|`steady_initial` &emsp;                        | Toggle whether to use the steady solution as the initial condition for the simulation &emsp; | true |
|`output_variable_based` &emsp;                 | Output solution based on variables (i.e. flow and pressure at nodes and internal variables) &emsp; | false |
|`output_interval` &emsp;                       | The frequency of writing timesteps to the output (1 means every timestep is written) &emsp; | $1$ |
|`output_mean_only` &emsp;                      | Write only the mean values over every timestep to output file &emsp; | false |
|`output_derivative` &emsp;                     | Write time derivatives to output file &emsp; | false |
|`output_all_cycles` &emsp;                     | Write all cardiac cycles to output file &emsp; | false |
|`use_cycle_to_cycle_error` &emsp;              | Use cycle-to-cycle error to determine number of cycles for convergence &emsp; | false |
|`sim_cycle_to_cycle_percent_error` &emsp;      | Percentage error threshold for cycle-to-cycle pressure and flow difference &emsp; | 1.0 |

The option `use_cycle_to_cycle_error` allows the solver to change the number of cardiac cycles it runs depending on the cycle-to-cycle convergence of the simulation. For simulations with no RCR boundary conditions, the simulation will add extra cardiac cycles until the difference between the mean pressure and flow in consecutive cycles is below the threshold set by `sim_cycle_to_cycle_percent_error` at all inlets and outlets of the model. If there is at least one RCR boundary condition, the number of cycles is determined based on equation 21 of <a href="#0d-Pfaller2021">Pfaller et al. (2021)</a>, using the RCR boundary condition with the largest time constant.


<style>
table{
    border-collapse: collapse;
    border-spacing: 100000px;
    border:1px solid #000000;
}

th{
    border:0.1px dotted #000000;
    padding: 15px;
}

td{
    border:0.1px dotted #000000;
    padding: 5px;
}
</style>

#### Vessels

More information about the vessels can be found in their respective class references. Below is a template vessel block with boundary conditions, `INFLOW` and `OUT`, at its inlet and outlet respectively.

```python
{
    "boundary_conditions": {
        "inlet": "INFLOW", # Optional: Name of inlet boundary condition
        "outlet": "OUT", # Optional: Name of outlet boundary condition
    },
    "vessel_id": 0, # ID of the vessel
    "vessel_name": "branch0_seg0", # Name of vessel
    "zero_d_element_type": "BloodVessel", # Type of vessel
    "zero_d_element_values": {...} # Values for configuration parameters
}
```

| Description                              | Class                       | `zero_d_element_type` &emsp; | `zero_d_element_values` &emsp; |
| ---------------------------------------- | --------------------------- | --------------------- | ------------------------|
| Blood vessel with optional stenosis &emsp;      | [BloodVessel](https://simvascular.github.io/svZeroDSolver/class_blood_vessel.html) &emsp; | `BloodVessel` &emsp;         | `C`: Capacitance <br> `L`: Inductance <br> `R_poiseuille`: Poiseuille resistance <br> `stenosis_coefficient`: Stenosis coefficient &emsp; |


#### Junctions

More information about the junctions can be found in their respective class references. Below is a template junction block that connects vessel ID 0 with vessel IDs 1 and 2.

```python
{
    "junction_name": "J0", # Name of the junction
    "junction_type": "BloodVesselJunction", # Type of the junction
    "inlet_vessels": [0], # List of vessel IDs connected to the inlet
    "outlet_vessels": [1, 2], # List of vessel IDs connected to the inlet
    "junction_values": {...} # Values for configuration parameters
}
```

Description &emsp;                          | Class &emsp;               | `junction_type` &emsp;      | `junction_values` &emsp;
------------------------------------- | ---------------------| --------------------- | -----------
Purely mass conserving junction &emsp; | [Junction](https://simvascular.github.io/svZeroDSolver/class_junction.html) &emsp; | `NORMAL_JUNCTION` &emsp;     | - &emsp;
Resistive junction &emsp;                 | [ResistiveJunction](https://simvascular.github.io/svZeroDSolver/class_resistive_junction.html) &emsp;    | `resistive_junction` &emsp;  | `R`: Ordered list of resistances for all inlets and outlets &emsp;
Blood vessel junction &emsp;             | [BloodVesselJunction](https://simvascular.github.io/svZeroDSolver/class_blood_vessel_junction.html) &emsp;  | `BloodVesselJunction` &emsp; | Same as for `BloodVessel` element but as ordered list for each inlet and outlet &emsp;

#### Boundary conditions

More information about the boundary conditions can be found in their respective class references. Below is a template `FLOW` boundary condition.

```python
{
    "bc_name": "INFLOW", # Name of the boundary condition
    "bc_type": "FLOW", # Type of the boundary condition
    "bc_values": {...} # Values for configuration parameters
},
```

Description &emsp;                           | Class &emsp;                  | `bc_type` &emsp;             | `bc_values` &emsp;
------------------------------------- | ---------------------- | --------------------- | ----------
Prescribed (transient) flow &emsp;           | [FlowReferenceBC](https://simvascular.github.io/svZeroDSolver/class_flow_reference_b_c.html) &emsp;        | `FLOW` &emsp;                | `Q`: Time-dependent flow values <br> `t`: Time steps &emsp;
Prescribed (transient) pressure &emsp;       | [PressureReferenceBC](https://simvascular.github.io/svZeroDSolver/class_pressure_reference_b_c.html) &emsp;    | `PRESSURE` &emsp;            | `P`: Time-dependent pressure values <br> `t`: Time steps &emsp;
Resistance &emsp;                            | [ResistanceBC](https://simvascular.github.io/svZeroDSolver/class_resistance_b_c.html) &emsp;           | `RESISTANCE` &emsp;          | `R`: Resistance <br> `Pd`: Time-dependent distal pressure <br> `t`: Time stamps &emsp;
Windkessel or RCR &emsp;                            | [WindkesselBC](https://simvascular.github.io/svZeroDSolver/class_windkessel_b_c.html) &emsp;           | `RCR` &emsp;                 | `Rp`: Proximal resistance <br> `C`: Capacitance <br> `Rd`: Distal resistance <br> `Pd`: Distal pressure &emsp;
Coronary outlet &emsp;                       | [OpenLoopCoronaryBC](https://simvascular.github.io/svZeroDSolver/class_open_loop_coronary_b_c.html) &emsp;     | `CORONARY` &emsp;            | `Ra`: Proximal resistance <br> `Ram`: Microvascular resistance <br> `Rv`: Venous resistance <br> `Ca`: Small artery capacitance <br> `Cim`: Intramyocardial capacitance <br> `Pim`: Intramyocardial pressure <br> `Pv`: Venous pressure &emsp;

The above table describes the most commonly used boundary conditions. The other valid `bc_type` values are listed below; see each block's documentation for its `bc_values`.

Description &emsp;                                    | Class &emsp;                  | `bc_type` &emsp;
---------------------------------------------- | ---------------------- | ---------------------
Structured-tree impedance &emsp;                      | [ImpedanceBC](https://simvascular.github.io/svZeroDSolver/class_impedance_b_c.html) &emsp; | `IMPEDANCE` &emsp;
Coronary outlet with time-varying microvascular resistance &emsp; | [OpenLoopCoronaryVarResBC](https://simvascular.github.io/svZeroDSolver/class_open_loop_coronary_var_res_b_c.html) &emsp; | `CORONARY_VAR_RES` &emsp;
Closed-loop RCR &emsp;                                | [ClosedLoopRCRBC](https://simvascular.github.io/svZeroDSolver/class_closed_loop_r_c_r_b_c.html) &emsp; | `ClosedLoopRCR` &emsp;
Closed-loop coronary outlet, left side &emsp;         | [ClosedLoopCoronaryLeftBC](https://simvascular.github.io/svZeroDSolver/class_closed_loop_coronary_left_b_c.html) &emsp; | `ClosedLoopCoronaryLeft` &emsp;
Closed-loop coronary outlet, right side &emsp;        | [ClosedLoopCoronaryRightBC](https://simvascular.github.io/svZeroDSolver/class_closed_loop_coronary_right_b_c.html) &emsp; | `ClosedLoopCoronaryRight` &emsp;

The closed-loop boundary conditions are used together with the closed-loop heart model, `ClosedLoopHeartAndPulmonary`. The heart model is not a `bc_type`: it is configured under `closed_loop_blocks`, with `closed_loop_type` set to `ClosedLoopHeartAndPulmonary`. See <a href="#0d-Menon2023">Menon et al. (2023)</a> for details of a closed-loop 0D model. Examples can also be found in `svZeroDSolver/tests/cases`.

Values of the boundary condition can be specified as a function of time as follow:
```python
{
    "bc_name": "INFLOW", # Name of the boundary condition
    "bc_type": "FLOW", # Type of the boundary condition
    "bc_values": {
        "Q": [ ..., ..., ... ], # Comma-separated list of values
        "t": [ ..., ..., ... ]  # Comma-separated list of corresponding time stamps
    }
},
```
See `svZeroDSolver/tests/cases/pulsatileFlow_R_RCR.json` for an example.

#### External coupling blocks

An entry in `external_solver_coupling_blocks` is the boundary through which an external solver (for example, a 3D solver such as svMultiPhysics) exchanges flow and pressure with the 0D model. Below is a template external coupling block that couples a 3D outlet to the inlet of a `RCR` boundary condition named `RCR_0`.

```python
{
    "name": "RCR_coupling", # Name of the coupling block
    "type": "FLOW", # Type of the coupling block, usually FLOW or PRESSURE
    "location": "inlet", # Side of connected_block the coupling block attaches to: inlet or outlet
    "connected_block": "RCR_0", # Name of the 0D block on the other side of the coupling block
    "periodic": False, # Optional: Whether the prescribed values are periodic (default: true)
    "values": {...} # Values for configuration parameters, as for the corresponding bc_type
}
```

The coupling block keys are:

<ul>
<li> <code>connected_block</code>: the 0D block on the other side of the coupling block, given as a boundary condition's <code>bc_name</code>, a vessel's <code>vessel_name</code>, or <code>ClosedLoopHeartAndPulmonary</code>. </li>
<li> <code>location</code>: <code>inlet</code> or <code>outlet</code>, the side of <code>connected_block</code> the coupling block attaches to. With <code>inlet</code>, flow goes from the coupling block into <code>connected_block</code>. With <code>outlet</code>, flow goes from <code>connected_block</code> into the coupling block. </li>
</ul>

Only some connected blocks are supported at each location. The type of a connected block is its `bc_type` for a boundary condition, or `BloodVessel` for any vessel.

| `location` &emsp; | Supported connected block types &emsp; |
|---|---|
| `inlet` &emsp; | `RESISTANCE`, `RCR`, `IMPEDANCE`, `ClosedLoopRCR`, `CORONARY`, `ClosedLoopCoronaryLeft`, `ClosedLoopCoronaryRight`, `BloodVessel` &emsp; |
| `outlet` &emsp; | `ClosedLoopRCR`, `ClosedLoopHeartAndPulmonary`, `BloodVessel` &emsp; |
