<h3 id="developer_implementation_commod_class"> ComMod Class</h3>
The <strong>ComMod</strong> C++ class is used to implement the Fortran <strong>COMMOD</strong> module. (A Fortran module is a bit like a C++ class because it can encapsulate both data and procedures.) The svFSI Fortran code used the <strong>COMMOD</strong> module to define data structures and to store data accessed as global variables.

The <strong>ComMod</strong> class is defined in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ComMod.h"> ComMod.h </a> file. This file also defines many of the classes used throughout the code
<ul>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L63"> fcType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L121"> rcrType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L143"> bcType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L249"> fsType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L296"> bfType </a>  -  Body force </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L326"> fibStrsType </a>  - Fiber stress </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L342"> stModelType </a>  - Structural model </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L389"> viscModelType </a>  - Fluid viscosity model </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L415"> dmnType </a>  - Domain </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L447"> adjType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L501> faceType </a> - Surface boundary  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L597"> outputType </a> - Output variables </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L620"> lsType </a> - Linear equation solver </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L676"> cntctModelType </a> - Contact </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L698"> cplFaceType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L734"> </a>  cplBCType </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L790"> mshType </a>  - Mesh </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L980"> eqType </a>  - Equation </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1117"> dataType </a>  </li>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1147"> rmshType </a>  </li>
</ul>

The <a href="https://github.com/SimVascular/svFSIplus/blob/f424b7c9d1e575bc5804293bb4c4181a725561cd/Code/Source/svFSI/ComMod.h#L1313"> ComMod </a> class contains member variables storing all of the data used for a simulation 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
svFSIplus does not use any global variables. A C++ module object is passed to each procedure that needs to access its variables. For example, in C++ the ComMod object com_mod is explicitly passed to
</div>
