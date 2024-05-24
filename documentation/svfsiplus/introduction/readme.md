## Introduction 

<strong>svFSIplus</strong> is an open-source, parallel, finite element multi-physics solver providing capabilities to simulate 
the partial differential equations (PDEs) governing solid and fluid mechanics, diffusion, and electrophysiology. Equations 
can be solved coupled to simulate the interaction between multiple regions representing different physical systems. For example, 
in a coupled fluid-solid simulation the motion of the fluid can deform a solid region while the changing geometry of the solid 
region change the way the fluid flows. Equation coupling provides a framework for the computational modeling of whole heart dynamics.

<strong>svFSIplus</strong> provides boundary conditions useful for the simulation of blood flow in vascular models. It also has an 
interface to the svZeroDSolver that can be used for custom lumped parameter boundary conditions.

The <strong>svFSIplus</strong> solver is implemented using the C++ programming language. It is essentially a direct 
line-by-line translation of the Fortran [svFSI](https://github.com/SimVascular/svFSI) solver code into C++. 
The C++ implementation provides an extensible framework (e.g. plugins for custom BCs) and better support for
modern object oriented programming and a wider range of data structures and algorithms. 

The following sections describe the solver main features, input data and format of the solver input parameters file 
used to run a simulation.

Documentation describing building, installing and testing <strong>svFSIplus</strong> can be found on GitHub 
<br> [Installing and building the solver](https://simvascular.github.io/svFSIplus/index.html)
<br> [Some details of the C++ implementation](https://simvascular.github.io/svFSIplus/implementation.html)
<br> [Testing Guide](https://simvascular.github.io/svFSIplus/testing.html)


