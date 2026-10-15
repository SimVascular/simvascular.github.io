
## Example 1: Steady Rigid Simulation with Resistance Outlet Boundary Conditions

This example introduces a rigid-wall CFD simulation with a constant inlet flow rate and resistance boundary conditions at the outlets. The goal is a steady solution, but completing the specified number of time steps does not by itself establish that steady flow has been reached. svMultiPhysics advances the transient Navier-Stokes equations in time, allowing the effects of the initial conditions to subside.

The data required for this simulation comprise:

- Finite element volume and surface mesh files
- A `solver.xml` input file

