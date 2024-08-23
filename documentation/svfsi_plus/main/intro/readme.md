## svFSIplus Guide 

<strong>svFSIplus</strong> is an open-source parallel finite element multi-physics solver providing capabilities to simulate 
the transient partial differential equations governing diffusion, heat transfer, incompressible viscous fluid flow, 
nonlinear elastodynamics and electrophysiology. Equations can be solved coupled to simulate the interaction between 
multiple regions representing different physics. For example, in a coupled fluid-solid simulation the motion of 
the fluid can deform a solid region while the changing geometry of the solid region change the way the fluid flows. 
Equation coupling provides a framework for the computational modeling of whole heart dynamics.

Run in parallel on an HPC cluster. automatically partitions the simulation to run on a number of core/nodes using 
MPI for communication.

The <strong>svFSIplus</strong> solver is implemented using the C++ programming language. It is essentially a direct 
line-by-line translation of the Fortran [svFSI](https://github.com/SimVascular/svFSI) solver code into C++. 
The C++ implementation provides a more extensible framework (e.g. plugins for custom BCs) and better support for
object oriented programming and advanced data structures. 

The following sections describe the solver main features, input data and format of the solver input parameters file 
used to run a simulation.

Documentation describing other topics can be found using the following links:
<br> [Installing and building the solver](https://simvascular.github.io/svFSIplus/index.html)
<br> [Some details of the C++ implementation](https://simvascular.github.io/svFSIplus/implementation.html)
<br> [Testing Guide](https://simvascular.github.io/svFSIplus/testing.html)


