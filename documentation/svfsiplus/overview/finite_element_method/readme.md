
<h2> Finite element method </h2>

The finite element method (FEM) is used to numerically solve transient PDEs governing the behavior of a physical system in two
or three space dimensions. FEM approximates the geometry of a physical domain by subdividing it into a collection of discrete
finite elements called a finite element mesh. The finite elements use numerical interpolation to approximate field variables 
(e.g. velocity) within a geometric region of a physical system. Elements can be implemented using a combination of linear, quadratic, 
and cubic interpolating polynomials.

svFSIplus supports the following element types 

<ul style="list-style-type:disc;">
 <li> <i>line</i> - linear and quadratic </li>
 <li> <i>triangle</i> - linear and quadratic </li>
 <li> <i>quadrilateral</i> - bilinear, serendipity, biquadratic </li>
 <li> <i>tetrahedron </i> - linear and quadratic </li>
 <li> <i>hexahedron</i> - trilinear, quadratic/serendipity, triquadratic </li>
 <li> <i>wedge</i> - linear </li>
</ul>

The finite element mesh together with appropriate physical properties and boundary conditions generate a system of algebraic equations. 
Depending on the PDE being solved this system of equations can be linear or nonlinear. The solution of a linear system can be directly 
solved to produce an approximation to the actual solution to the PDE. A nonlinear system must be solved using an iterative procedure to 
generate and solve a series of linear systems of equations converging to an approximation to the actual solution to the nonlinear PDE. 

Most automatic mesh generation software packages produce finite element meshes are composed primarily of tetrahedron.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">

The accuracy of a simulation depends on how well the mesh approximates <br>
<ol>
<li> Model geometry - changes in geometry (e.g. curvature) in a region </li> 
<li> Field variables - spatial variation in field values </li> 
</ol>
</div>



