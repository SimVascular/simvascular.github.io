
## Example 2: Unsteady Rigid Simulation on Descending Aorta with RCR Outlets

This example will describe how to set up a typical unsteady simulation in *svMultiPhysics*. Blood flow rates and pressure naturally fluctuate along with cardiac contractions. These fluctuations create local flow patterns and behavior that cannot be captured in a steady simulation. Compared to a steady simulation, unsteady pulsatile simulations take much more time to complete since they require more timesteps and sometimes a smaller timestep size. There are some applications where a steady simulation is enough to produce useful results. But for most applications in the cardiovascular system, unsteady pulsatile conditions are needed for accurate results.

Besides the changes to the timestepping, there are two main changes are made to the boundary conditions for an unsteady simulation:

1. Inflow boundary condition adjusted to change with time by incorporating a .flow file.
2. Outflow boundary conditions changed to RCR which incorporates the compliance of the downstream vasculature.

All other settings regarding the mesh, equations, and outputs are the same compared to a rigid simulation, and the reader is referred to our previous example for information on these aspects. We will use the same geometric model as the previous example but adjust the settings to run an unsteady pulsatile simulation. The geometry and face names are repeated below for clarity:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_model_and_surfaces.png">
  <figcaption class="svCaption" >Descending Aorta model with mesh surfaces labeled.</figcaption>
</figure>