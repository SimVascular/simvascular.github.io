
## Computational Fluid Dynamics (CFD)

The svMultiPhysics fluid equation is used to perform computational fluid dynamics (CFD) simulations based on the incompressible Navier-Stokes equations. In this guide, CFD is used to model blood flow through the human vasculature under the rigid-wall assumption. The primary simulation outputs are pressure and velocity; secondary quantities such as wall shear stress (WSS) can also be computed and output.
Boundary quantities such as outlet pressure and flow can also be written to text files and plotted to help assess whether a simulation has reached a converged solution.

Creating a valid CFD simulation requires getting a lot of details right. Some familiarity with fluid mechanics is helpful for understanding how to define the physical domain, initial conditions, and boundary conditions for inlets, outlets, and walls needed to create a well-posed CFD simulation that is stable and able to accurately simulate the physical processes of interest. Some knowledge of CFD and numerical methods will also be helpful.

The CFD simulations in this section model vessel walls using a rigid-wall assumption, which treats them as stationary throughout the simulation. Rigid models can approximate quantities such as pressure, but do not capture motion associated with vessel walls that deform under pulsatile pressure loads.

An **inflow boundary condition** in a CFD simulation defines the volumetric flow rate, spatial distribution, and temporal pattern of fluid entering the computational domain. The specified flow rate is converted to a velocity field at the inlet according to the selected inflow profile, with velocity vectors normal to the inlet face.

The **finite element mesh** is a discretization of the volume enclosed by the surface model into a set of nodes, 3D elements (tetrahedra), and
element connectivity. The mesh defines the computational domain for the CFD simulation. Each mesh surface boundary is represented as a set of nodes,
2D elements (triangles), and element connectivity.

The mesh files used for this section model the descending abdominal aorta with two iliac arteries obtained from imaging data.
The files can be downloaded from the [SimVascular DemoProject](https://simtk.org/frs/?group_id=930) located on the SimTK website.

<figure>
  <img class="svImg svImgMd" src="/documentation/multi_physics/user-guide/cfd/img/svmp_demo_mesh.png">
  <figcaption class="svCaption">Surface mesh of the descending abdominal aorta showing the five surfaces used to define boundary conditions.</figcaption>
</figure>



