<br>

<hr class="rounded">

<h1> User Guide </h1>

The svMultiPhysics solver provides capabilities to solve the partial differential equations (PDEs) describing different
physical systems for solid and fluid mechanics, diffusion, and electrophysiology. The finite element method (FEM) is used to approximately solve the PDEs using a system of nonlinear equations that can then be solved using numerical methods.

Creating a finite element simulation that accurately represents the blood flow in an anatomical region requires careful
attention to several details:

<ul>
<li> Finite element mesh quality and density </li>
<li> Initial and boundary conditions </li>
<li> Time-step size </li>
<li> Nonlinear and linear solver parameters </li>
</ul>

Most of the following sections provide a guide for setting up and running simulations for each of the 
<a href="#equation_section"> equations </a> supported by the svMultiPhysics solver. Other sections will discuss the details of more specific topics 
like linear system solution and material models. The simulations will be similar to those used for medical research when possible.
The steps needed to create an accurate simulation will be highlighted along with discussion of how to use various solver parameters within the context of the problem being solved.

<p>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
svMultiPhysics does not assume any system of units. The units represented by the mesh must therefore be consistent with the units implied by
the values of the physical parameters used in a simulation.
</div>
</p>



