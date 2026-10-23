
### Running svMultiPhysics from the Command Line in a Terminal

A simulation can be run from the command line by executing the *svMultiPhysics* application binary in a terminal.
For installations of *svMultiPhysics* on macOS or Ubuntu, the `svmultiphysics` application binary should be found
in the following location:

    /usr/local/sv/svMultiPhysics/DATE/bin/svmultiphysics

where DATE is the build date (e.g., 2026-06-11). Different installed versions have different build dates in their executable paths. The following command lists the installation folders:

    ls /usr/local/sv/svMultiPhysics/

This should show the *svMultiPhysics* installation folders. If multiple versions are installed, their folders should be identified by build date. The date in the executable path should match the appropriate build date. After identifying the executable, navigate to the folder containing the XML input file and run:

    [svmultiphysics_executable] [name_of_xml_input_file]

For example, to run `demo_simulation.xml` using the 2026-06-11 version of *svMultiPhysics*, use:

    /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics demo_simulation.xml

To run the simulation on `N` cores using Open MPI, use `mpiexec`:

    mpiexec -n N /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics demo_simulation.xml


