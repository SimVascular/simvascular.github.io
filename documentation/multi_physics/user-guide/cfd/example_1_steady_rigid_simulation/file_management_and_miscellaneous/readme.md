
### Output Control and File Management

The `<GeneralSimulationParameters>` section contains several parameters that control how frequently restart files (for resuming simulations) and VTK results files (for visualization) are written. See [Simulation Results Output](https://simvascular.github.io/documentation/multi_physics.html#run_simulation_output) for details.

    <GeneralSimulationParameters>

        ...

        <Restart_file_name>results</Restart_file_name>
        <Increment_in_saving_restart_files>10</Increment_in_saving_restart_files>
        <Start_saving_after_time_step>1</Start_saving_after_time_step>

        <Continue_previous_simulation>false</Continue_previous_simulation>

        <Save_averaged_results>true</Save_averaged_results>

        <Save_results_to_VTK_format>true</Save_results_to_VTK_format>

        <Name_prefix_of_saved_VTK_files>results</Name_prefix_of_saved_VTK_files>

        <Increment_in_saving_VTK_files>10</Increment_in_saving_VTK_files>

        <Spectral_radius_of_infinite_time_step>0.2</Spectral_radius_of_infinite_time_step>

        <Searched_file_name_to_trigger_stop>STOP_SIM</Searched_file_name_to_trigger_stop>

        <Simulation_requires_remeshing>false</Simulation_requires_remeshing>

        <Verbose>true</Verbose>

        <Warning>true</Warning>

        <Debug>false</Debug>

    </GeneralSimulationParameters>

The most useful and important settings are:

1. `<Increment_in_saving_restart_files>` - This specifies the number of time steps between saved restart files. Usually, restart files should not be saved too often, because they can take up too much space and overwhelm a file system. However, saving them periodically allows a simulation to be resumed from a recent state.
2. `<Start_saving_after_time_step>` - This specifies the earliest time step eligible for saving VTK results. Files are written at eligible steps that also satisfy the VTK output interval. This setting does not delay restart files or every text-output history.
3. `<Save_averaged_results>` - This flag will tell *svMultiPhysics* to save one file that contains time-averaged results. This can be convenient if you wish to perform time averaging across all timesteps in an unsteady simulation.
4. `<Save_results_to_VTK_format>` - This flag instructs *svMultiPhysics* to save simulation results in VTK format for visualization in ParaView.
5. `<Increment_in_saving_VTK_files>` - This specifies the number of time steps between saved VTK results files.

For this steady-flow example, the results at the final time steps are of primary interest. Examining several of these results can help determine whether transient effects have subsided. For an unsteady simulation, results should be saved at sufficiently frequent intervals to capture changes over time.

The other settings in this section can be adjusted for more niche cases, but these are the most useful to know for a general *svMultiPhysics* simulation.
