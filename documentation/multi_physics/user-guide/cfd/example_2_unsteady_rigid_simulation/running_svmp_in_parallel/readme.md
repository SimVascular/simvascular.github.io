
### Running *svMultiPhysics* in Parallel

The simulation can be run as in Example 1 or in parallel using multiple processes. See [Running a Simulation](/documentation/multi_physics.html#run_run_simulation) for the general parallel-run instructions. With MPI available, the following command runs this example using two processes:

    mpirun -n 2 /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics unsteady_simulation.xml

The `-n 2` option specifies two processes. Replace the executable path and input filename as needed for the local installation. Results are stored in `2-procs` unless a different results folder is specified.
