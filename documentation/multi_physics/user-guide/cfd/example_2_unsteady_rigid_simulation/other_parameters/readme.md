
### Other Parameter Changes for Unsteady Simulation

The simulation duration and output settings are specified in the `<GeneralSimulationParameters>` section. `<Number_of_time_steps>` and `<Time_step_size>` determine how much simulated time is covered. A fresh simulation starts from its specified initial conditions, which need not represent the established pulsatile solution. Initial-condition effects must diminish before the repeating response is analyzed; these effects are distinct from the physiological changes that should remain within each cardiac cycle.

This example runs for **four** cardiac cycles, with the final cycle intended for analysis. Four cycles are a starting choice, not a guarantee that initial-condition effects have subsided. Compare pressure or flow at corresponding phases of successive cycles to check whether appreciable cycle-to-cycle changes remain. A longer run may be needed. If earlier-cycle VTK results are not retained, this comparison requires suitable saved boundary histories or a run that retains additional cycles.

The example `cap_aorta.flow` file spans one second, corresponding to 60 cycles per minute. With a time-step size of $1 \ ms$, $4000$ time steps simulate four full cardiac cycles:

    …
        <Number_of_time_steps>4000</Number_of_time_steps>
        <Time_step_size>1e-3</Time_step_size>
    …

The output interval must provide enough temporal resolution for analysis without producing unnecessarily many files. As in Example 1, restart files and VTK results have separate saving intervals:

    …

        <Increment_in_saving_restart_files>10</Increment_in_saving_restart_files>
        <Start_saving_after_time_step>3000</Start_saving_after_time_step>

    …

        <Save_averaged_results>true</Save_averaged_results>
        <Save_results_to_VTK_format>true</Save_results_to_VTK_format>
        <Name_prefix_of_saved_VTK_files>results</Name_prefix_of_saved_VTK_files>
        <Increment_in_saving_VTK_files>10</Increment_in_saving_VTK_files>

    …

The restart and VTK saving intervals remain 10 time steps, as in Example 1. `<Start_saving_after_time_step>` is changed to $3000$ to limit VTK output to the final simulated cycle; it does not delay restart files. With a time-step size of 0.001 seconds, VTK snapshots are spaced 0.01 seconds apart. A one-second cycle spans 100 snapshot intervals; the number of saved files depends on whether both endpoints are included. Saving averaged results remains enabled, which can be convenient for analysis.
