
### Checking Simulation during Runtime

After launching a simulation, the terminal window displays information about its progress. If the simulation is diverging or taking too long, it can be stopped to investigate the problem instead of waiting until it reaches the end:

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_ug_ex1_terminal_output.png">
  <figcaption class="svCaption" >Sample terminal output when running svMultiPhysics.</figcaption>
</figure>

The terminal output provides information about the simulation as it progresses. Three particularly useful parts of the output are explained below.

1. `NS xx-xx` - The first two letters in this column identify the system of equations being solved. Since this simulation models only fluid flow, the solver reports `NS` for the Navier-Stokes equations. The next two numbers indicate the current time step and nonlinear iteration within that time step. In the screenshot, the solver advances to the next time step after four nonlinear iterations, rather than continuing to the maximum of ten iterations. The simulation ends after completing the number of time steps specified in `<GeneralSimulationParameters>`.
2. The next number immediately to the right of this column shows the amount of wall-clock time that has elapsed since the simulation was launched, in seconds. The 30th time step in the simulation above started 1,892 seconds after the simulation was launched.
3. The second number inside the square brackets `[ ]` represents a normalized residual relative to the first nonlinear iteration of the time step. The residual measures how closely the current numerical solution satisfies the discretized governing equations. This ratio starts at 1.0 for each time step and generally decreases as the solver converges, although it may fluctuate. The solver can advance to the next time step either when its convergence criteria are satisfied or when the maximum number of nonlinear iterations is reached. The first number in the square brackets shows the change in the residual in decibels (dB). For more details, see the [svMultiPhysics documentation](https://simvascular.github.io/documentation/multi_physics.html), under “Simulation History histor.dat File.”

Monitoring the simulation residual helps assess whether the simulation is converging adequately. If the residual decreases too slowly within a time step or consistently increases, reducing the time-step size may help the simulation converge. If the time-step size is reduced, the number of time steps should also be adjusted to preserve the total simulated time. For example, halving the time-step size requires doubling the number of time steps. To stop a simulation from the command line terminal, press `Ctrl+C`.
