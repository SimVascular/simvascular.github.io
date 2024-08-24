<h2 id="developer_simulation_class"> Simulation Class</h2>
The C++ <strong>Simulation</strong> class encapsulates all of the objects used for a simulation. It is defined in 
the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Simulation.h"> Simulation.h </a> file. 
The <strong>Simulation</strong> class does not contain any methods used in the core simulation code. Like the Fortran svFSI code it is just used to pass data to procedures to carry out a series of computational steps.

The <strong>Simulation</strong> class contains the following objects
<ul>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/CepMod.h#L219"> CepMod</a> - Cardiac electrophysiology </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ChnlMod.h#L100"> ChnlMod</a> - I/O </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/CmMod.h#L62"> CmMod</a> - Interface to MPI </li>
<li> <a href="#developer_commod_class"> ComMod </a> - Stores all data used and produced by a simulation</li>
<li> <a href="#developer_xml_parameters_class"> Parameters </a> - Stores simulation parameters read in from the solver input XML file </li>
</ul>


