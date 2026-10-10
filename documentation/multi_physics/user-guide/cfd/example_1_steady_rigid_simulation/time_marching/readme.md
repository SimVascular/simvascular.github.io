
### Time Step Parameters ###

The transient (unsteady) Navier-Stokes equations are solved to describe how the velocity and pressure of the fluid evolves 
over time. The time step is the increment of time used by numerical procedures to advance a transient (time-dependent) finite 
element simulation from one time instance: the time step between two consecutive computed solutions.

The `<GeneralSimulationParameters>` section of the XML fule contains parameters to set the time step and the number of time
steps for a simulation:

    <GeneralSimulationParameters>

        <Number_of_time_steps> 100 </Number_of_time_steps>

        <Time_step_size> 1e-3 </Time_step_size>

It is important to select a `<Time_step_size>` value that will produce a stable and accurate solution. 
Similar to the mesh size, simulation accuracy goes up as the timestep size decreases (at additional computational time and cost). We choose a timestep size of $1 \ ms$ ($0.001 \ seconds$) for this example, which is a good starting point for cardiovascular simulations. Another good rule of thumb for selecting the timestep size is to use the CFL condition:

$$ CFL = v * \Delta t / \Delta x < 1 $$

Here, $v$ is a characteristic velocity in the simulation, $\Delta x$ is the grid spacing for the mesh, and $\Delta t$ is the timestep size. The CFL number should be less than 1 at all points and all times for solution stability. An unstable solution will *diverge*, meaning the errors will grow exponentially until the simulation eventually crashes. The stability of a simulation can be checked in real time by observing the *residual*, which will be explained in a future section. The CFL number is normally hard to compute exactly for a given simulation since the grid spacing is not uniform and the velocity changes at different locations in a simulation. But it is useful to know that smaller grid sizes (which are sometimes needed for more accurate results) require a smaller timestep size for a stable solution. If you find that your simulations are diverging, try **reducing the timestep size** and re-running the simulation to see if that helps.

The number of timesteps then ultimately determines the total simulation time. For this simple simulation, we are simulating $100$ timesteps at $0.001$ seconds each, so the total simulation time is $(100 \ timesteps)(0.001 \ s/timestep) = 0.1 \ s$. Since all our boundary conditions are steady, we only need to simulate a small amount of time to eliminate transient effects from the initial conditions. But if your boundary conditions are changing with time (i.e. you have a pulsatile inflow), you will need to simulate a larger number of timesteps to run multiple cardiac cycles. This will be expanded upon in future examples with pulsatile inflow boundary conditions.
