
<h1> Fluid Equation </h1>

The svMultiPhysics fluid equation is used to perform computational fluid dynamics (CFD) simulations based on the incompressible Navier-Stokes 
equations. CFD is used to simulation how blood flows in the human vasculature assuming rigid vessel walls. The primary simulation results output
are pressure and velocity; other secondary quantities such as wall shear stress (WSS) can also be computed and output. Quanties can
also be integrated across boundary walls (e.g., pressues at the outlet boundary surfaces) are written to text files. Plots of these values can be
used to determine if a simulation has reached a converged solution.

Creating a valid CFD simulation requires getting a lot of details right. It is essential to have a background in fluid mechanics to understand 
how to define the physical domain, initial states, and boundary conditions for inlets, outlets, and walls neeed to create a well-posed CFD 
simulation that is stable and able to accurately simulate the process physics of interest. Some knowledge of CFD and numerical methods will 
also be helpful.

The CFD simulations in this section model vessel walls using the **rigid-wall assumption** which treats them as stationary 
and undeformable solid boundaries. Rigid models can approximate quantities such as pressure but do not capture fluid features driven by
vessel walls that continuously deform under pulsatile pressure loads.

An **inflow boundary condition** in a CFD simulation defines the volumetric flow rate, spatial distribution, and temporal pattern of blood entering the 
computational domain. The inflow creates the pressure gradient (driving force) that moves fluid through the vessel. The flow rate is converter
to velocity vectors for the inlet using its cross-sectional area and normal of the boundary surface.

The **finite element mesh** is a discretization of the volume enclosed by the surface model into a set of nodes, 3D elements (tetrahedra), and
element connectivity. The mesh defines the computational domain for the CFD simulation. Each mesh surface boundary is represented as a set of nodes,
2D elements (triangles) and element connectivity.

The and mesh files used for this section model the descending abdominal aorta with two iliac arteries obtained from imaging data. 
The files  can be downloaded from the [SimVascular DemoProject](https://simtk.org/frs/?group_id=930) located on the SimTK website.

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_demo_mesh.png">
  <figcaption class="svCaption"> Descending Abdominal Aorta mesh showing the five surfaces that are used to define boundary conditions.</figcaption>
</figure>



