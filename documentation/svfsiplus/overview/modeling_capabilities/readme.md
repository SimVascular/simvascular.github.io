
<h2> Modeling capabilities </h2>

svFSIplus can numerically solve PDEs governing solid and fluid mechanics, diffusion, and electrophysiology. 
Some equations can be coupled and solved simultaneously to simulate the interaction between multiple regions representing 
different physical system.  

svFSIplus supports the solution of the following equations

<li> Solid mechanics equations 

<ul>
  <li> <i>Linear elastodynamics</i> - Solves the linear elasticity problem. </li>

  <li> <i> Linear elastodynamics modified for mesh motion used in fluid-solid interaction </i> - Solves for
       the elastic deformation of a solid region as part of the Arbitrary Lagrangian-Eulerian (ALE) formulation
       in a fluid-solid interaction simulation.  </li>

  <li> <i> Nonlinear elastodynamics </i> - Solves the nonlinear structural mechanics problem using a pure 
       displacement-based formulation. </li>

  <li> <i> Nonlinear elastodynamics using a mixed formulation </i> - Solves the nonlinear structural dynamics 
       problem where the structure's velocity and pressure are the unknown degrees of freedom. </li>

  <li> <i> Nonlinear thin shell mechanics </i> - Solves the nonlinear shell mechanics problem. </li> 
</ul>
</li>

<li> Fluid mechanics equations 

<ul>
  <li> <i> Navier-Stokes equation </i> -  Solves the incompressible viscous fluid flow problem. </li>
  <li> <i> Unsteady Stokes flow </i> - Solves for unsteady flow where inertia is negligible (creeping flow). </li>
</ul>
</li>

<li> Diffusion equations 

<ul>
  <li> <i> Unsteady diffusion </i> - Solves the diffusion problem in a solid. </li>
  <li> <i> Unsteady advection-diffusion </i> - Solves the unsteady advection-diffusion 
                problem in a fluid (e.g. dye transport). </li>
</ul>
</li>

<li> Coupled fluid-solid equations 

<ul>
  <li> <i> Coupled momentum method (CMM) </i> - Solves the fluid-solid interaction problem using the coupled momentum method. </li>
  <li> <i> Arbitrary Lagrangian-Eulerian (ALE) formulation </i> - Solves the fluid-solid interaction problem using the 
        Arbitrary Lagrangian-Eularian (ALE) method. </li>
</ul>
</li>

<li> Cardiac electrophysiology

<ul>
  <li> <i> Mono-domain model of cardiac electrophysiology </i> - Solves for the electrical propagation in myocardial tissue. </li>
</ul>
</li>


