
### Checking Simulation Outputs

When your simulation finishes, the results can be viewed by loading the .vtu result files into a 3D viewing software like Paraview. Paraview is an open-source software that you can download to view 3D model data like *svMultiPhysics* simulation results. More information about downloading and running Paraview can be found on their website. To view your *svMultiPhysics* results, open Paraview then click “Open”. Navigate to the folder where your results are saved (which should be `1-procs`) and open the file `results_100.vtu`. Since we ran a steady simulation, we only need to view the results at the final timestep where steady-state has been achieved. After opening the file, click the green “Apply” button on the left-hand side of the screen to load the results. You should now see your geometry in the 3D viewing window:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_paraview_interface.png">
  <figcaption class="svCaption" >Paraview interface after loading .vtu results.</figcaption>
</figure>

To view a specific result field, it needs to be loaded into the 3D viewer. There is a dropdown menu near the top of the screen which lets you select the field for viewing. By default, no field is selected and the model is displayed as a `Solid Color`. Clicking on this dropdown menu will allow you to view results like the velocity or pressure fields. While each simulation job will have different results that depend on the patient geometry and boundary conditions, there are certain expected solution characteristics that should be present in most simulations. It is usually a good idea to do some quick sanity checks to ensure the simulation ran properly. First, let’s check the velocity field to ensure our velocity boundary conditions were applied correctly:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_velocity_1.png">
  <figcaption class="svCaption" >Velocity field results on the walls from svMultiPhysics simulation with rigid walls.</figcaption>
</figure>

Notice how the entire model appears blue, which is zero velocity according to the color legend. This makes sense since we assumed our simulation to have rigid walls and no slip. If a deformable wall simulation were performed, the wall would have motion and velocity. If you rotate the model to view the caps, you should see there is nonzero velocity there. These nonzero velocities show that blood flow is coming out at these caps.

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_velocity_2.png">
  <figcaption class="svCaption" >Velocity field results on the outlet caps from svMultiPhysics simulation.</figcaption>
</figure>

Next, it is useful to check the pressure distribution in the model. In general, we expect pressure to be highest at the inlets of the model and lowest at the outlets of the model. The decrease in pressure from the inlets to the outlets is a result of the energy needed to overcome viscous friction in the 3D domain:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_pressure.png">
  <figcaption class="svCaption" >Pressure field results on the from a svMultiPhysics simulation.</figcaption>
</figure>

There may be other factors that produce local increases or decreases in pressure like sudden changes in the vessel radius or deformable walls. But you should observe a general decrease of pressure from inlets to outlets. These general solution characteristics should be present for any rigid wall simulation and are good to check before performing any further analysis. If you do not observe these solution behaviors, it could be an indication that something went wrong with the simulation and you need to re-run it with adjusted parameters.