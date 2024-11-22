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
import json

with open("steadyFlow_calibration.json") as fname:
    my_unoptimized_config = json.load(fname)

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
`calibrate_stenosis_coefficient` &emsp;   | Toggle whether stenosis coefficient should be calibrated &emsp;        | True &emsp;
`set_capacitance_to_zero` &emsp;          | Toggle whether all capacitances should be manually set to zero &emsp;  | False &emsp;
`initial_damping_factor` &emsp;           | Initial damping factor for Levenberg-Marquardt optimization &emsp;     | 1.0 &emsp;

