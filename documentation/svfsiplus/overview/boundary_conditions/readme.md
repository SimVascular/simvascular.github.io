
<h2> Boundary conditions </h2>

Boundary conditions are an integral part of a problem definition and act as constraints necessary for the solution of a PDE.

Different types of boundary conditions can be imposed on the boundary of the domain

<ul style="list-style-type:disc;">
  <li> <i> Dirichlet boundary condition </i>  - Fixed solution values </li>
  <li> <i> Neumann boundary condition </i>  - Derivative of solution values </li>
  <li> <i> Robin boundary condition </i>  - Weighted combination of Dirichlet and Neumann boundary conditions </li>
</ul>

A temporal and spatial distribution of values can be applied to the boundary of a domain.

svFSIplus supports boundary conditions useful for the simulation of blood flow in vascular models 

<ul style="list-style-type:disc;">
  <li> <i> Windkessel (RCR) boundary condition </i> - Electric circuit analogue that has a proximal 
           resistance R in series with a parallel arrangement of a capacitance C and a distal resistance Rd </li>
  <li> <i> Custom lumped parameter network (LPN) boundary condition </i> - Implemented using an interface to the 
           <a href="https://github.com/SimVascular/svZeroDSolver"> svZeroDSolver </a> </li>
</ul>


