
### Checking Simulation Outputs

When a simulation finishes, the results can be viewed by loading the `.vtu` result files into ParaView, an open-source application for visualizing 3D data. More information about downloading and running ParaView can be found on its [website](https://www.paraview.org/). To view the results from this example, open ParaView and click “Open”. Navigate to the simulation results folder (typically `1-procs` for a single-process run) and open the file `results_100.vtu`. This file contains the results from the final time step. As discussed earlier, examining several of the final time steps can help determine whether transient effects have subsided. After opening the file, click the green “Apply” button on the left-hand side of the screen to load the results. The geometry should now be visible in the 3D viewing window:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_paraview_interface.png">
  <figcaption class="svCaption" >Paraview interface after loading .vtu results.</figcaption>
</figure>

To view a specific result field, select it from the dropdown menu near the top of the ParaView window. By default, no field is selected, and the model is displayed as `Solid Color`. The menu allows fields such as velocity and pressure to be displayed.

While simulation results depend on the geometry and boundary conditions, there are certain expected solution characteristics that should be present in most simulations. It is usually a good idea to check these characteristics to assess whether the simulation ran as intended. First, examine the velocity field to check whether the velocity boundary conditions were applied correctly:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_velocity_1.png">
  <figcaption class="svCaption" >Velocity field results on the walls from svMultiPhysics simulation with rigid walls.</figcaption>
</figure>

The vessel walls appear blue, indicating zero velocity according to the color legend. This is expected because the simulation assumes rigid, stationary walls with a no-slip boundary condition. In a deformable-wall simulation, wall motion can produce nonzero velocities at the wall. When the model is rotated to show the outlet caps, nonzero velocities should be visible there, consistent with blood flowing through the outlets.

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_velocity_2.png">
  <figcaption class="svCaption" >Velocity field results on the outlet caps from svMultiPhysics simulation.</figcaption>
</figure>

Next, it is useful to check the pressure distribution in the model. In general, pressure is expected to be highest at the inlets and lowest at the outlets. The decrease in pressure from the inlets to the outlets reflects energy losses due to viscous friction in the three-dimensional flow domain:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_results_pressure.png">
  <figcaption class="svCaption" >Pressure field results from an <em>svMultiPhysics</em> simulation.</figcaption>
</figure>

There may be other factors that produce local increases or decreases in pressure, such as sudden changes in vessel radius or deformable walls. However, for this rigid-wall example, pressure should generally decrease from the inlets to the outlets. If this overall trend is absent, possible causes should be investigated before proceeding with further analysis.
