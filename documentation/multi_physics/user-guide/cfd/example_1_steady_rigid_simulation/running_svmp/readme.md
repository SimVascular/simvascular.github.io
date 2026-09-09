
### Running svMultiPhysics from Terminal

When the .xml input file is ready, you can run your simulation from the command line terminal by running the *svMultiPhysics* application. If you have installed *svMultiPhysics* from the .deb installation package, the application should be found in the following location:

    /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics

This example uses the version of *svMultiPhysics* published on 2026-06-11. Note that if you installed a different version of *svMultiPhysics*, the path to the executable will have a different date. If you are having trouble locating your *svMultiPhysics* executable, you can try the following command to search for the installation folder:

    ls /usr/local/sv/svMultiPhysics/

This should show you the installation folders for the version of *svMultiPhysics* that you have. If you have multiple versions, they should be denoted by their dates. Replace the date in your application path to the appropriate one. After you have identified your *svMultiPhysics* application, you can run the simulation by running it from the folder where the .xml input file is located. Navigate to the folder where your .xml file is, then run the following command:

    [svmultiphysics_executable] [name_of_xml_input_file]

For example, if your input file were called `demo_simulation.xml` and if you are using the 2026-06-11 version, the command to run the simulation would be:

    /usr/local/sv/svMultiPhysics/2026-06-11/bin/svmultiphysics demo_simulation.xml