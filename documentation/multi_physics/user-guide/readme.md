<br>

<hr class="rounded">

<h1> User Guide </h1>

The svMultiPhysics solver provides capabilities to solve the partial differential equations (PDEs) describing different 
physical systems for solid and fluid mechanics, diffusion, and electrophysiology. The finite element method (FEM) is used to 
approximate the PDEs by a system of nonlinear equations and that can then be solved using numerical methods.

Creating an finite element simulation that accuratly represents the blood flow in a anatomical region requires careful 
attention to several details

<ul>
<li> Finite element mesh quality and density </li>
<li> Initial and boundary conditions </li>
<li> Time step </li>
<li> Nonlinear and linear solver parameters </li>
</ul>

Most of the following sections provide a guide for setting up and running simulations for each of the 
<a href="#equation_section"> equations </a> supported by the svMultiPhysics solver. Other sections will discuss the details of more specific topics 
like liner solver solution and material models. The simulations will be similar to those used for medical research when possible. 
The steps needed for creating an accurate simulation will be highlighted and will discuss how to use various solver 
parameters within the context of the problem being solved. 

<p>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
svMultiPhysics does not assume any system of units. The units represented by the mesh must therefore be consistant with the units implied by
the values of the physical parameters (e.g., density) used in a simulation.
</div>
</p>



