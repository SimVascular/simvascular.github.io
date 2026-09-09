
### Time Marching Parameters ###

Our next step is to specify the time marching parameters. This is done in the `<GeneralSimulationParameters>` section at the top of the .xml file. *svMultiPhysics* simulations are solved one discrete timestep at a time, with each timestep separated by a fixed amount of time. This is analogous to how a digital video is shown one frame at a time where each frame is separated by a fixed amount of time. We need to specify how many timesteps we wish to solve in our simulation as well as the timestep size:

    <GeneralSimulationParameters>

        <Number_of_spatial_dimensions>3</Number_of_spatial_dimensions>
        <Number_of_time_steps>100</Number_of_time_steps>
        <Time_step_size>1e-3</Time_step_size>

The timestep size specifies how much time will pass in between timesteps. This parameter should be chosen to give enough time resolution for the results. It should also be sufficiently small to ensure accurate simulation results. Similar to the mesh size, simulation accuracy goes up as the timestep size decreases (at additional computational time and cost). We choose a timestep size of $1 \ ms$ ($0.001 \ seconds$) for this example, which is a good starting point for cardiovascular simulations. Another good rule of thumb for selecting the timestep size is to use the CFL condition:

$$ CFL = v * \Delta t / \Delta x < 1 $$

Here, $v$ is a characteristic velocity in the simulation, $\Delta x$ is the grid spacing for the mesh, and $\Delta t$ is the timestep size. The CFL number should be less than 1 at all points and all times for solution stability. An unstable solution will *diverge*, meaning the errors will grow exponentially until the simulation eventually crashes. The stability of a simulation can be checked in real time by observing the *residual*, which will be explained in a future section. The CFL number is normally hard to compute exactly for a given simulation since the grid spacing is not uniform and the velocity changes at different locations in a simulation. But it is useful to know that smaller grid sizes (which are sometimes needed for more accurate results) require a smaller timestep size for a stable solution. If you find that your simulations are diverging, try **reducing the timestep size** and re-running the simulation to see if that helps.

The number of timesteps then ultimately determines the total simulation time. For this simple simulation, we are simulating $100$ timesteps at $0.001$ seconds each, so the total simulation time is $(100 \ timesteps)(0.001 \ s/timestep) = 0.1 \ s$. Since all our boundary conditions are steady, we only need to simulate a small amount of time to eliminate transient effects from the initial conditions. But if your boundary conditions are changing with time (i.e. you have a pulsatile inflow), you will need to simulate a larger number of timesteps to run multiple cardiac cycles. This will be expanded upon in future examples with pulsatile inflow boundary conditions.