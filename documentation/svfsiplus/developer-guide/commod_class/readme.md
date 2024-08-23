<h2 id="developer_commod_class"> ComMod Class</h2>
The <strong>ComMod</strong> C++ class is used to implement the Fortran <strong>COMMOD</strong> module. (A Fortran module is a bit like a C++ class because it can encapsulate both data and procedures.) The svFSI Fortran code used the <strong>COMMOD</strong> module to define data structures and to store data accessed as global variables.

The <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ComMod.h"> ComMod.h </a> file defines the <strong>ComMod</strong> class and many of the classes used throughout the code
<ul>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L63"> fcType </a> - Fourier coefficients used for unsteady boundary conditions </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L121"> rcrType </a> - RCR boundary condition  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L143"> bcType </a> - Boundary condition </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L249"> fsType </a> - Function spaces (basis)  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L296"> bfType </a>  -  Body force </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L326"> fibStrsType </a>  - Fiber stress </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L342"> stModelType </a>  - Structural model </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L389"> viscModelType </a>  - Fluid viscosity model </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L415"> dmnType </a>  - Domain </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L447"> adjType </a> - Mesh adjacency (neighboring element for each element) </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L501> faceType </a> - Surface boundary  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L597"> outputType </a> - Output variables </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L620"> lsType </a> - Linear equation solver </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L676"> cntctModelType </a> - Contact </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L734"> cplBCType </a> - Coupled 0D-3D problems </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L790"> mshType </a>  - Mesh </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L980"> eqType </a>  - Equation </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1117"> dataType </a> - Used to write data in the VTK files  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1147"> rmshType </a> - Remeshing </li>
</ul>

The <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1313"> ComMod </a> class contains member variables storing all of the data used for a simulation.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
svFSIplus does not use any global variables. A C++ module object is passed to each procedure that needs to access its variables. For example, in C++ the ComMod object com_mod is explicitly passed to
</div>
