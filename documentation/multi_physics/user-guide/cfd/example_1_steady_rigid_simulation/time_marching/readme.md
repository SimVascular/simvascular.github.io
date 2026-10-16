
### Time Step Parameters ###

The transient (unsteady) Navier-Stokes equations are solved to describe how the velocity and pressure of the fluid evolve over time. Each time step advances the numerical solution to a new point in simulated time. The time-step size specifies the interval of simulated time between consecutive solutions.

The `<GeneralSimulationParameters>` section of the XML file contains parameters to set the time-step size and the number of time steps for a simulation:

    <GeneralSimulationParameters>

        <Number_of_time_steps> 100 </Number_of_time_steps>

        <Time_step_size> 1e-3 </Time_step_size>

It is important to select a `<Time_step_size>` value that will produce a stable and accurate solution. Similar to the mesh size, simulation accuracy goes up as the time-step size decreases (at additional computational time and cost). We choose a time-step size of $1 \ ms$ ($0.001 \ seconds$) for this example, which is a good starting point for cardiovascular simulations. Another good rule of thumb for selecting the time-step size is to use the CFL condition:

$$ CFL = v * \Delta t / \Delta x < 1 $$

Here, $v$ is a characteristic velocity in the simulation, $\Delta x$ is the grid spacing for the mesh, and $\Delta t$ is the time-step size.

A CFL number below 1 can be a conservative starting estimate, but it is not a universal stability requirement for the implicit time integration used by svMultiPhysics. The time-step size should also be assessed from convergence behavior and, when needed, a sensitivity check of the quantities of interest.

An unstable solution will *diverge*, meaning the errors will grow exponentially until the simulation eventually crashes. The stability of a simulation can be monitored in real time by observing the *residual*, which will be explained in a future section. The CFL number is normally hard to compute exactly for a given simulation since the grid spacing is not uniform and the velocity changes at different locations in a simulation. If a simulation is diverging, reducing the time-step size and re-running the simulation may help.

The number of time steps, together with the time-step size, determines the total simulation time. For this simple simulation, we are simulating $100$ time steps at $0.001$ seconds each, so the total simulation time is $(100 \ timesteps)(0.001 \ s/timestep) = 0.1 \ s$. Several final time steps should be inspected for remaining changes in pressure and flow before treating the result as steady. By contrast, if the boundary conditions are changing with time, as in a simulation with pulsatile inflow, it is necessary to simulate a larger number of time steps to run multiple cardiac cycles. The next example will demonstrate how to simulate multiple cardiac cycles with pulsatile inflow boundary conditions.
