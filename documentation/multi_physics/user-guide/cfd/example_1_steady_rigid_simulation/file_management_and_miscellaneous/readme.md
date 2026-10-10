
### Output Control and File Management

The `<GeneralSimulationParameters>` section contains several parameters used to control the frequency to write the 
solver state and VTK results files:

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

1. `<Increment_in_saving_restart_files>` - This specifies how often you want to save simulation outputs in terms of number of timesteps. Usually, you do not want to save results too often otherwise it will take up too much space and overwhelm a file system. But you also want to have enough time resolution to adequately analyze your results. This setting is more relevant for unsteady cases since for a steady case like this, we only need the results at the final timestep.
2. `<Start_saving_after_time_step>` - Allows the simulation to skip saving results for the first few timesteps. Usually, the first few timesteps only contain initial conditions or transient results so you can skip some to save a bit of space.
3. `<Save_averaged_results>` - This flag will tell *svMultiPhysics* to save one file that contains time-averaged results. This can be convenient if you wish to perform time averaging across all timesteps in an unsteady simulation.
4. `<Save_results_to_VTK_format>` - This flag will tell *svMultiPhysics* to automatically convert simulation results to VTK format which is convenient for viewing in Paraview.

The other settings in this section can be adjusted for more niche cases, but these are the most useful to know for a general *svMultiPhysics* simulation.
