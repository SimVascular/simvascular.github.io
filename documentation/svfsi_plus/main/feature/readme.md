## Main features

 - equations
   + solid mechanics: lin elas, nonlinear, shell, mesh(?)
   + fluid mechanics: navier-stokes, stokes
   + cardiac electrophysiology
   + diffusion, advection-diffusion
   + fluid-structure interaction: mesh movement, ale, cmm

 - finite element mesh: element types, file format (vtk)
 - boundary conditions
 - formulation
 - linear solvers, numerical linear algebra interfaces
 - remeshing
 - domains
 - units
 - material models


The **svFSIplus** solver provides capabilities to simulate several types of transient partial differential equations. 
The following sections briefly describes each equation supported.

Cardiac electrophysiolog: The **coupled momentum method** is used to spproximate fluid-structure interaction using the coupled momentum method. 

Cardiac electrophysiolog: 

Coupled momentum method: The **coupled momentum method** is used to spproximate fluid-structure interaction using the coupled momentum method. 

Fluids:  The **fluids** equation is used to solve the Navier-Stokes equations for unsteady viscous incompressible fluid flow.

Fluid-structure interaction
The **fluid-structure interaction** equation is used to solve the interaction of the Navier-Stokes equations 
with solid equations using the arbitrary Lagrangian-Eulerian (ALE) formulation.

Linear elastodynamics 
The **linear elastodynamics** equation is used to solve the 

Mesh 
The **mesh** equation is used to solve the coupled modified linear elastodynamics equation for fluid-structure interaction
simulations. 

Nonlinear elastodynamics 
The **nonlinear elastodynamics** equation is used to solve the 

Nonlinear elastodynamics using the mixed VMS-stabilized formulation 
The **nonlinear elastodynamics using the mixed VMS-stabilized formulation** equation

Nonlinear thin shell  mechanics:

Unsteady advection-diffusion
The **unsteady advection-diffusion** equation is used to solve the combination of the diffusion and advection equations.
It is used to simulate scalar transport (e.g. dye transport).

Unsteady diffusion 
The **unsteady diffusion** equation is used to solve the Laplace or Poison equation. This is used to simulation unsteady 
diffusion for such applications as heat conduction. 

Unsteady Stokes 
The **unsteady Stokes** equation is used to solve the 


