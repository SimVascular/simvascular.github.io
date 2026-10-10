
### Running *svMultiPhysics* in Parallel

At this point, the .xml input file is ready and we can run *svMultiPhysics* like we did in the previous example. But since we are running many more timesteps for the unsteady simulation, it may take a long time for the simulation to finish. We can speed up the simulation run time by making use of multiple cores on your computer. Most modern computers have multiple processing cores that it can use for its operations. But by default, individual programs run through the command line only utilize a single core. These programs are said to be running in *series*. We can utilize multiple cores for a single program to run it in *parallel* by using MPI (message passing interface).

A detailed explanation of MPI is beyond the scope of this User Guide. A basic explanation is that MPI provides a framework for different computer cores to communicate instructions and data with each other. Applications can use this to coordinate tasks between cores to complete tasks more quickly, similar to how multiple human workers can combine their efforts to complete a large task. *svMultiPhysics* can be run using MPI to split the mesh into partitions that it assigns to each core. Each core is then responsible for computing the solution of its partition, only communicating information with other cores for overlapping nodes. This can significantly reduce the amount of time it takes to run a simulation since each would only be responsible for a small portion of the domain instead of the entire mesh. Parallel processing is practically necessary for large *svMultiPhysics* jobs with large meshes.

To use MPI, we first need to install the libraries for it if you have not done so already on your machine. Run the following command from the command line terminal:

    sudo apt install -y build-essential openmpi-bin libopenmpi-dev 

After these install, you should have access to the program called `mpirun` to run another program in parallel. Using `mpirun` requires that you specify the number of cores that you want to use as well as the program that you wish to run in parallel. For example, let’s run *svMultiPhysics* for this unsteady case using two cores:

    mpirun -n 2 /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics unsteady_simulation.xml

The `-n 2` flag specifies the number of cores to use for the simulation. If your computer has more cores you can increase this number to speed up the simulation further. Note that we named our input file `unsteady_simulation.xml` but if you named your input file something else then you would need to change that. As the simulation runs, your results will be stored in a folder called `n-procs` where `n` is the number of processors you specified for the simulation.
