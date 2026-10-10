
### Other Parameter Changes for Unsteady Simulation

Besides the boundary conditions, minor adjustments to a couple other settings are required for an unsteady simulation. First, the `<Number_of_time_steps>` and `<Time_step_size>` must be set to capture multiple cardiac cycles in the simulation. When a new *svMultiPhysics* simulation is started, all velocity and pressure values in the domain are set to initial values of zero. Due to the inertia of the fluid in the 3D domain, the velocities and pressures do not immediately “react” to changes in the boundary conditions. That is why we had to run our steady simulation for 100 timesteps in the previous example. This initial phase of a flow simulation is often called the *transient* part and is merely an artifact of the numerical procedure, not representative of physiological behavior.

Because the boundary conditions for unsteady simulations are changing rapidly with time, the transient part of the solution persists for longer. More specifically, it often takes several cardiac cycles for an unsteady simulation to represent true physiologic conditions. It is thus recommended to run at least **four** cardiac cycles in the simulation to ensure the transient part of the solution does not affect our results. Then the results are analyzed for only the last cycle. Note that for deformable wall simulations, transient effects take even longer to decay so more cycles are recommended for those.

Based on the .flow file used for the inlet boundary conditions, this patient has a heart period of one second (i.e. heart rate of 60 bpm). If we set the timestep size to $1 \ ms$ as we typically do, then we need to run at least $4000$ timesteps to simulate four full cardiac cycles:

    …
        <Number_of_time_steps>4000</Number_of_time_steps>
        <Time_step_size>1e-3</Time_step_size>
    …

Since we will be running many more timesteps compared to our steady simulation, it is even more important to confirm the frequency *svMultiPhysics* is saving results. The save frequency needs to be often enough to give adequate time resolution for results but not too often otherwise too many files will be produced:

    …

        <Increment_in_saving_restart_files>10</Increment_in_saving_restart_files>
        <Start_saving_after_time_step>3000</Start_saving_after_time_step>

    …

        <Save_averaged_results>true</Save_averaged_results>
        <Save_results_to_VTK_format>true</Save_results_to_VTK_format>
        <Name_prefix_of_saved_VTK_files>results</Name_prefix_of_saved_VTK_files>
        <Increment_in_saving_VTK_files>10</Increment_in_saving_VTK_files>

    …

Since we only want to save results for the final cycle, we do not save results until after timestep $3000$. We also make sure to activate the flag for saving averaged results which will be convenient when doing our analysis.
