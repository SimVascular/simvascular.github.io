
### Checking Simulation during Runtime

After launching your simulation, you can check the terminal window to see how it is doing. If the simulation is diverging or taking too long, you can stop the simulation and address any issues instead of waiting until it reaches the end:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_terminal_output.png">
  <figcaption class="svCaption" >Sample Terminal Output when running svMultiPhysics.</figcaption>
</figure>

Each column has different information about the simulation as it progresses. We will list some of the most important columns here and how to interpret them.

1. NS xx-xx - The first two letters in this column expresses the current equation that is being solved. Since this simulation is purely fluids, the only equation that gets solved is the Navier-Stokes (NS) equation. The next two numbers next to this show the current timestep and the nonlinear iterations within that timestep. The screenshot above reaches convergence in four nonlinear iterations so it moves onto the next timestep instead of going to the maximum of ten. The simulation will reach its conclusion when the timestep reaches the maximum specified under the `<GeneralSolutionParameters>`
2. The next number immediately to the right of this column shows the amount of walltime that has elapsed since the simulation began in seconds. The 30th timestep in the simulation above started at 1892 real life seconds since the simulation began.
3. The second number inside the [] square brackets expresses the **residual** of the current solution. The residual is an expression of the error in the current numerical solution. More specifically, it shows the discrepancy when plugging in the current numerical solution into the governing equations. Since the numerical solution is not exact, there will always be a difference when plugging back into the governing equation. This number starts at 1.0 at the beginning of each timestep and should reduce upon each nonlinear iteration within that timestep. When this number dips below the tolerance specified in the .xml file, the simulation moves onto the next timestep. The first number in the square brackets shows the decrease in the residual in dB format.

Keeping an eye on the simulation residual is the most important to make sure the simulation is adequately converging. If you observe the residual is not decreasing fast enough within a timestep or even starts to increase, it would be best to stop the simulation and **decrease the timestep size** to help the simulation converge. If you do reduce the timestep size, make sure to also adjust the number of timesteps to ensure the amount of simulated time stays the same. For example, if you halve the timestep size, you need to double the number of timesteps. To stop a simulation from the command line terminal, hit `Ctrl+C` on the keyboard.