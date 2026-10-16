
### Running *svMultiPhysics* in Parallel

At this point, the XML input file is ready and *svMultiPhysics* can be run as in Example 1. The larger number of time steps can make the pulsatile simulation more computationally expensive. MPI (Message Passing Interface) allows the simulation to run in *parallel* using multiple processes and cores, rather than as a *serial* run with one process.

A detailed explanation of MPI is beyond the scope of this User Guide. MPI provides a framework for processes to communicate instructions and data, allowing work to be coordinated across multiple cores. This is similar to how multiple workers can share a larger task. *svMultiPhysics* distributes the mesh and solution work among processes, which exchange information needed across partition boundaries. This can reduce run time, although the benefit depends on problem size, hardware, and communication overhead. Parallel processing is important for large simulations.

MPI must be installed before using this command. The following installation command applies to Ubuntu or Debian systems; other platforms require their corresponding installation instructions:

    sudo apt install -y build-essential openmpi-bin libopenmpi-dev 

After installation, `mpirun` can launch the simulation in parallel. The following command uses two MPI processes, typically assigned to two cores:

    mpirun -n 2 /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics unsteady_simulation.xml

The `-n 2` flag specifies two MPI processes. Increasing this number may reduce run time when enough cores are available, but does not guarantee a speedup. The command assumes the input file is named `unsteady_simulation.xml`; use the actual input filename if it differs. Results are stored in a folder called `n-procs`, where `n` is the number of MPI processes used for the simulation.
