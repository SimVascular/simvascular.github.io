# svMultiPhysics - Beta Version
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The svMultiPhysics documentation is in a <b>Beta phase of release</b>. 

The contents of the documentation are not finalized and could change in the future.

Some sections of the documentation are incomplete and are actively being updated.

All User Guide sections are being updated. 

</div>

# Introduction 

svMultiPhysics is an open-source, parallel, finite element multi-physics solver providing capabilities to simulate 
the partial differential equations (PDEs) governing solid and fluid mechanics, diffusion, and electrophysiology. Equations 
can be solved coupled to simulate the interaction between multiple regions representing different physical systems. For example, 
in a coupled fluid-solid simulation the motion of the fluid can deform a solid region while the changing geometry of the solid 
region change the way the fluid flows. Equation coupling provides a framework for the computational modeling of whole heart dynamics.

svMultiPhysics implements boundary conditions useful for the simulation of blood flow in vascular models. It also has an 
interface to the [svZeroDSolver](https://github.com/SimVascular/svZeroDSolver) that can be used for custom lumped parameter network 
(LPN) boundary conditions. 

The svMultiPhysics solver is implemented in C++, a popular general-purpose object-oriented programming language that provides powerful 
features for producing modular software with a clear structure. C++ has many built-in data structures that can be used to efficiently 
organize and store data. The svMultiPhysics code is essentially a direct line-by-line translation of the Fortran 
[svFSI](https://github.com/SimVascular/svFSI) solver code into C++. 

The following sections describe the solver modeling capabilities, input data and format of the solver input parameters file 
used to run a simulation.

Documentation describing building, installing and testing svMultiPhysics can be found using the following links 
<br> [Installing and building the solver](https://github.com/SimVascular/svMultiPhysics/blob/main/README.md)
<br> [Testing Guide](https://github.com/SimVascular/svMultiPhysics/blob/main/tests/README.md)



