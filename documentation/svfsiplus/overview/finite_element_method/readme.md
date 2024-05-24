
### Finite element method

The finite element method (FEM) is used to numerically solve transient PDEs governing the behavior of a physical system in two
or three space dimensions. FEM approximates the geometry of a physical domain by subdividing it into a collection of discrete
finite elements called a finite element mesh. The finite elements are used numerical interpolation to approximate field variables 
(e.g. velocity) within a geometric region of a physical system. Elements can be implemented using a combination of linear, quadratic, 
and cubic interpolating polynomials.

**svFSIplus** supports the folowing element types 

<ul>
 <li> line - linear and quadratic </li>
 <li> triangle - linear and quadratic </li>
 <li> quadrilateral - bilinear, serendipity, biquadratic </li>
 <li> tetrahedron - linear and quadratic </li>
 <li> hexagonal brick - trilinear, quadratic/serendipity, triquadratic </li>
 <li> wedge - linear </li>
</ul>

The finite element mesh together with appropriate physical properties and boundary conditions generate a system of algebraic equations. 
Depending on the PDE being solved this system of equations can be linear or nonlinear. The solution of a linear system can be directly 
solved to produce an approximation to the actual solution to the PDE. A nonlinear system must be solved using an iterative procedure to 
generate and solve a series of linear systems of equations converging to an approximation to the actual solution to the PDE. 

Most automatic mesh generation software packages produce finite element meshes are composed primarily of tetrahedra.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
The accuracy of a simulation depends on how well the mesh approximates <br><br>
<ol>
<li> Model geometry - changes in geometry (e.g. curvature) in a region </li> 
<li> Field variables - variation in field values </li> 
</ol>
</div>



