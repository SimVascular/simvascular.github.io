## svZeroDCalibrator - Quick User Guide

svZeroDCalibrator can be used to calibrate cardiovascular 0D models (i.e. infer optimal
parameters for the 0D elements) based on a given transient result (i.e. from a
3D simulation).

### Run svZeroDCalibrator

#### From the command line
svZeroDCalibrator can be executed from the command line using a JSON configuration
file.

```bash
svzerodcalibrator path/to/input_file.json path/to/output_file.json
```

The result will be written to a JSON file.


#### In Python

svZeroDCalibrator can also be called directly from Python.
Please make sure that you installed svZerodSolver via pip to enable this feature. We start by
importing pysvzerod:

```python
import pysvzerod

my_unoptimized_config = {...}
my_optimized_config = pysvzerod.calibrate(my_unoptimized_config)
```

### Configuration file

In order to make svZeroDCalibrator easy to use, it is based on a similar configuration
file than svZeroDSolver. Instead of the `simulation_parameters` section, it has a section
called `calibration_parameters`. Additionally the optimization target (i.e. a given)
3D result is passed with the key `y` and it's temporal derivative via `dy`. See
`tests/cases/steadyFlow_calibration.json` for an example input file.

```python
{
    "calibration_parameters": {...},
    "vessels": [...],
    "junctions": [...],
    "boundary_conditions": [...],
    "y": {
      "flow:INFLOW:branch0_seg0": [0.0, 0.1, ...],  # Time series for DOF
      "pressure:INFLOW:branch0_seg0": [0.0, 0.1, ...],  # Time series for DOF
      ...
    },
    "dy": {
      "flow:INFLOW:branch0_seg0": [0.0, 0.1, ...],  # Time series for DOF
      "pressure:INFLOW:branch0_seg0": [0.0, 0.1, ...],  # Time series for DOF
      ...
    },
}
```

#### Calibration parameters

Here is a list of the parameters that can be specified in the `calibration_parameters`
section of the configuration file.

Parameter key &emsp;                      | Description &emsp;                                                     | Default value &emsp;
----------------------------------------- | ---------------------------------------------------------------------- | -----------
`tolerance_gradient` &emsp;               | Gradient tolerance for calibration &emsp;                              | $10^{-5}$ &emsp;
`tolerance_increment` &emsp;              | Increment tolerance for calibration &emsp;                             | $10^{-10}$ &emsp;
`maximum_iterations` &emsp;               | Maximum calibration iterations &emsp;                                  | 100 &emsp;
`initial_damping_factor` &emsp;           | Initial damping factor for Levenberg-Marquardt optimization &emsp;     | 1.0 &emsp;

#### Selecting which parameters to calibrate

Each vessel and multi-outlet junction must declare which of its parameters
the calibrator should optimize via a `calibrate` field listing the
parameter names. Parameters that are not listed are held constant at the
value found in the input file. The names must match the parameter names
the block exposes (e.g. `R_poiseuille`, `C`, `L`, `stenosis_coefficient`
for a `BloodVessel`; `R_poiseuille`, `L`, `stenosis_coefficient` per outlet
for a `BloodVesselJunction`).

```json
{
  "vessel_name": "branch0_seg0",
  "zero_d_element_type": "BloodVessel",
  "zero_d_element_values": {
    "R_poiseuille": 0.0,
    "C": 1.2e-6,
    "L": 0.25,
    "stenosis_coefficient": 1.06e-5
  },
  "calibrate": ["R_poiseuille"]
}
```

If a block has no `calibrate` field (or an empty list), every parameter of
that block is held at its input value. The calibrator errors out if no
parameter ends up selected anywhere in the model.
