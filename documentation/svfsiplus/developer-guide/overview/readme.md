<h2 id="developer_overview"> Overview </h2>
svFSIplus is a C++ implementation of the Fortran <a href="https://github.com/SimVascular/svFSI"> svFSI </a>
multi-physics finite element solver designed for computational modeling of the cardiovascular system. It represents the <i>First Stage</i> in the development of a C++ multi-physics finite element solver and is essentially a direct line-by-line translation of the svFSI Fortran code. This was done to maintain a simple mapping between the code of the two versions and to facilitate debugging by comparing intermediate data (i.e. element stiffness matrices) and simulation results.

svFSIplus uses a procedural programming paradigm which it inherited from its Fortran predecessor. This means that the 
code is implemented as a set of functions that call each other. The solver program thus executes by 
passing data to functions to carry out a series of computational steps.

The <i>Second Stage</i> of development will be a re-implementation of the code using an object-oriented architecture. This will be performed incrementally (if possible!) by creating objects representing the fundamental components of the
finite element analysis (e.g. element technology). 

