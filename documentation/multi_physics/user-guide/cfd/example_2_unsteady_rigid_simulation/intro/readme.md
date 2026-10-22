## Example 2: Pulsatile Rigid-Wall Simulation with RCR Outlet Boundary Conditions

Building on Example 1, this example models pulsatile blood flow using a time-varying inlet flow rate and RCR outlet boundary conditions that provide a simple lumped-parameter representation of the flow impedance of the vasculature downstream of the 3D model. Resolving multiple cardiac cycles, sometimes requiring a smaller time-step size, can make these simulations orders of magnitude more computationally expensive than steady simulations. The following sections describe the changes to the existing XML input file. The fluid properties and wall boundary conditions are retained. The geometry and face names are repeated below for clarity:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_model_and_surfaces.png">
  <figcaption class="svCaption" >Descending aorta model with mesh surfaces labeled.</figcaption>
</figure>
