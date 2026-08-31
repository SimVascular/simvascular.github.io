
### Checking Simulation Outputs

When your simulation finishes, the results can be viewed by loading the .vtu result files into a 3D viewing software like **Paraview**. Different simulations with different geometries and different boundary conditions will all have different results. But even so, all fluids simulations will exhibit certain features that are expected. It is usually a good idea to do a quick sanity checks for these expected results to ensure the simulation ran properly. If your solution does not exhibit these general features, it is a good indication to check all the inputs to ensure the simulation was setup correctly. First, let’s check the velocity field:

<figure>
  <img class="svImg svImgMd" src="/documentation/svmp_user_guide/img/svmp_ug_ex1_results_velocity_1.png">
  <figcaption class="svCaption" >Velocity field results on the walls from svMultiPhysics simulation with rigid walls.</figcaption>
</figure>

Notice how the entire model appears blue, which is zero velocity according to the color legend. This makes sense since we assumed our simulation to have rigid walls and no slip. If a deformable wall simulation were performed, the wall would have motion and velocity. If you rotate the model to view the caps, you should see there is nonzero velocity there. These nonzero velocities show that blood flow is coming out at these caps.

<figure>
  <img class="svImg svImgMd" src="/documentation/svmp_user_guide/img/svmp_ug_ex1_results_velocity_2.png">
  <figcaption class="svCaption" >Velocity field results on the outlet caps from svMultiPhysics simulation.</figcaption>
</figure>

Next, it is useful to check the pressure distribution in the model. In general, we expect pressure to be highest at the inlets of the model and lowest at the outlets of the model. The decrease in pressure from the inlets to the outlets is a result of the energy needed to overcome viscous friction in the 3D domain:

<figure>
  <img class="svImg svImgMd" src="/documentation/svmp_user_guide/img/svmp_ug_ex1_results_pressure.png">
  <figcaption class="svCaption" >Pressure field results on the from a svMultiPhysics simulation.</figcaption>
</figure>

There may be other factors that produce local increases or decreases in pressure like sudden changes in the vessel radius or deformable walls. But you should observe a general decrease of pressure from inlets to outlets. These general solution characteristics should be present for any rigid wall simulation and are good to check before performing any further analysis. If you do not observe these solution behaviors, it could be an indication that something went wrong with the simulation and you need to re-run it with adjusted parameters.