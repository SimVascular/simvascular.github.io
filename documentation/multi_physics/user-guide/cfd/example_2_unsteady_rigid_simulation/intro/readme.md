## Example 2: Pulsatile Rigid-Wall Simulation with RCR Outlet Boundary Conditions

This example starts with Example 1 and increases the realism by using pulsatile inflow. A time-varying inflow, prescribed in a `.flow` file in _svMultiPhysics_, allows the simulation to capture flow patterns and pressure variations throughout the cardiac cycle, and RCR outlet boundary conditions represent resistance and compliance of distal blood vessels. Resolving multiple cardiac cycles, sometimes requiring a smaller time-step size, can make these simulations orders of magnitude more computationally expensive than steady simulations. The following sections describe the changes to the existing XML input file; the fluid properties and wall boundary conditions are retained. The geometry and face names are repeated below for clarity:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_model_and_surfaces.png">
  <figcaption class="svCaption" >Descending Aorta model with mesh surfaces labeled.</figcaption>
</figure>
