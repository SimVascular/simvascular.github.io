<h2 id="developer_code_organization"> Code Organization </h2>
The svFSIplus code is organized by file. Procedures related to a specific type of application within the code are placed in a single file. For example, the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/fluid.cpp"> fluid.cpp </a> file contains procedures implementing the functionality for fluid flow simulation.

Files are located in two directories
<ul>
<li> <a href="#developer_code_organization_svfsi"> svFSI </a> - Main simulation code </li>
<li> <a href="#developer_code_organization_svfsils"> svFSILS </a> - Custom linear algebra code </li>
</ul>

<h3 id="developer_code_organization_namespace"> Namespaces </h3>
C++ namespaces provide a scope to the identifiers (names of functions, variables, etc) inside it.
svFSIplus uses namespaces to help organize the functions defined within each file. Namespace names are the same as the file name containing their functions.

Example: <a href="https://github.com/SimVascular/svFSIplus/blob/c4871902111fc193a68b729e2793a8da37e26e86/Code/Source/svFSI/mat_fun.cpp#L45">mat_fun.cpp </a> functions are defined within the <strong>mat_fun</strong> namespace. 
<pre>
// Functions are references using the <strong>mat_fun::</strong> prefix.
auto Fi = mat_fun::mat_inv(F, 2);
</pre>

The C++ <i>using</i> statement is used to include a namespace scope.
<pre>
using namespace mat_fun;

// Functions can now be referenced without the <strong>mat_fun::</strong> prefix.
auto Fi = mat_inv(F, 2);
</pre>

<h3 id="developer_code_organization_classes"> Classes </h3>
C++ <i>classes</i> are used to reproduce Fortran modules and user-defined data types. A module is a bit like a C++ class because it can encapsulate both data and procedures. Classes representing Fortran modules are stored in a file using the class name; the A class definition is in an A.h file and its implementation is in a A.cpp file. 

A user-defined data type is implemented as a C++ class and is used primarily to store data. All member data is public. Some have a <strong>destroy</strong> method used to free memory. These classes are defined in the C++ module classes.

Example
<pre>
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ComMod.h"> ComMod.h </a> - Defines the <strong>ComMod</strong> module class and several user-defined data classes (e.g. <strong>fcType</strong>)
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ComMod.cpp"> ComMod.cpp </a> - Defines the implementation of any <strong>ComMod</strong>> methods.
</pre>

<!-- ---------------------------------------------------------- -->
<!-- -------------------- svFSI Code -------------------------- -->
<!-- ---------------------------------------------------------- -->

<h3 id="developer_code_organization_svfsi"> svFSI Code </h3>
The <a href="https://github.com/SimVascular/svFSIplus/tree/main/Code/Source/svFSI"> svFSI </a> directory 
contains the files for the C++ solver implementation. The C++ code attempts to replicate the data structures and flow of control of the Fortran implementation.

The svFSI files can be group by the operations they implement.

<!-- ------------------------------------------------ -->
<!-- --------------- Program entry point ------------ -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_main"> Program entry point </h4>
The <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp"> main.cpp </a> file contains the svFSIplus program entry point <strong>main()</strong> function. It performs the following operations 

<ul style="list-style-type:disc;"><br>
  <li> Process command-line arguments </li>
  <li> Initializes MPI </li>
  <li> Creates a <a href="#developer_simulation_class"> Simulation </a> object </li>
  <li> Reads in the solver input .xml file </li>
  <li> Distributes finite element mesh and boundary condition data to processors </li>
  <li> Time stepping and nonlinear iteration loops </li>
  <li> Writes simulation results </li>
</ul>

<!-- ------------------------------------------------ -->
<!-- ---------------       Equations     ------------ -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_equations"> Equations </h4>
The following list associates each type of equation with the file containing its implementation 

<ul><br>
  <li> advection_diffusion - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/heatf.cpp"> heatf.cpp </a> </li> 
  <li> cardiac_electro_physiology - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/cep.cpp"> cep.cpp </a> </li> 
  <li> coupled_momentum - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/cmm.cpp"> cmm.cpp </a> </li> 
  <li> fluid - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/fluid.cpp"> fluid.cpp </a> </li> 
  <li> fluid-solid-interaction - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/fsi.cpp"> fsi.cpp </a> </li> 
  <li> linear_elasticity - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/l_elas.cpp"> l_elas.cpp </a> </li> 
  <li> mesh - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/mesh.cpp"> mesh.cpp </a> </li> 
  <li> shell - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/shells.cpp"> shells.cpp </a> </li> 
  <li> solid_heat - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/heats.cpp"> heats.cpp </a> </li> 
  <li> stokes - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/stokes.cpp"> stokes.cpp</a> </li> 
  <li> structural - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/sv_struct.cpp"> sv_struct.cpp </a> </li> 
  <li> structural_velocity_pressure - <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ustruct.cpp"> ustruct.cpp </a> </li> 

</ul>

<!-- ------------------------------------------------ -->
<!-- -----------  Cardiac Electrophysiology --------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_cep"> Cardiac Electrophysiology </h4>
The following is a list of the files used for cardiac electrophysiology. 

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CepMod.h"> CepMod.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CepModAp.h"> CepModAp.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CepModBo.h"> CepModBo.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CepModFn.h"> CepModFn.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CepModTtp.h"> CepModTtp.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/cep.h"> cep.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/cep_ion.h"> cep_ion.h </a> </li> 
</ul>

<!-- ------------------------------------------------ -->
<!-- -----------      Boundary Conditions ----------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_boundary_conditions"> Boundary Conditions </h4>
The following is a list of the files used for boundary conditions..

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/baf_ini.cpp"> baf_ini.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/bf.cpp"> bf.cpp </a> - Body forces </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/set_bc.cpp"> set_bc.cpp </a> - </li>
</ul><br>


<!-- ------------------------------------------------ -->
<!-- -----------  Finite Element -------------------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_finite_element"> Finite Element Method</h4>
The following is a list of the files associated with the finite element method.

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp"> eq_assem.cpp </a> - Assembles the finite element left-hand side matrix from boundary conditions</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/fs.cpp"> fs.cpp </a> - Function spaces, Taylor-Hood elements</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/lhsa.cpp"> lhsa.cpp </a> - Assembles the global element stiffness matrix and residue</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn.cpp"> nn.cpp </a> - Set element properties and allocate element arrays</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gip.h"> nn_elem_gip.h </a> - Sets element Gauss integration data</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gnn.h"> nn_elem_gnn.h </a> - Sets element shape function data</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gnnxx.h"> nn_elem_gnnxx.h </a> - Sets 2nd derivatives element shape function data</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_nn_bnds.h"> nn_elem_bnds.h </a> - Sets the bounds of element shape functions</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_props.h"> nn_elem_props.h </a> Sets element properties</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp"> pic.cpp </a> - Time step iterator </li> 
</ul>

The <a href="#developer_code_organization_svfsi_equations"> Equations </a> files also implement the finite element method for each equation type. 

<!-- ------------------------------------------------ -->
<!-- -----------      Linear Algebra     ------------ -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_cep"> Linear Algebra </h4>
The following is a list of the files used for numerical linear algebra. 

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/FsilsLinearAlgebra.h"> FsilsLinearAlgebra.h </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/LinearAlgebra.h"> LinearAlgebra.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/PetscLinearAlgebra.h"> PetscLinearAlgebra.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/TrilinosLinearAlgebra.h"> TrilinosLinearAlgebra.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/ls.h"> ls.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/lhsa.h"> lhsa.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/mat_fun.cpp"> mat_fun.cpp  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/petsc_impl.h"> petsc_impl.h  </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/trilinos_impl.h"> trilinos_impl.h  </a> </li> 
</ul>

<!-- ------------------------------------------------ -->
<!-- -----------      File I/O     ------------------ -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_file_io"> File Input/Output </h4>
The following is a list of the files used for file input/output.

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Parameters.cpp"> Parameters.cpp </a> - Read solver input XML file</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/VtkData.cpp"> VtkData.cpp </a> - Read VTK-format files</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/load_msh.cpp"> load_msh.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/output.cpp"> output.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/post.cpp"> post.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp"> read_files.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp"> read_msh.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/txt.cpp"> txt.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/vtk_xml.cpp"> vtk_xml.cpp </a> </li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/vtk_xml_parser.cpp"> vtk_xml_parser.cpp </a> </li>
</ul>

<!-- ------------------------------------------------ -->
<!-- -----------  Parallel Processing  -------------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_parallel"> Parallel Processing </h4>
The following is a list of the files associated with parallel processing.

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CmMod.cpp"> CmMod.cpp </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/all_fun.cpp"> all_fun.cpp </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp"> distribute.cpp </a> </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp"> initialize.cpp </a> </li> 
</ul>

<!-- ========================================================== -->
<!-- -------------------- svFSILS Code ------------------------ -->
<!-- ========================================================== -->

<h3 id="developer_code_organization_svfsils"> svFSILS Code </h3>
The <a href="https://github.com/SimVascular/svFSIplus/tree/main/Code/Source/svFSILS"> svFSILS </a> directory 
contains the C++ files for the custom linear algebra implementation.

The svFSILS files can be group by the operations they implement.


<!-- ------------------------------------------------ -->
<!-- -----------      Boundary Conditions ----------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsils_boundary_conditions"> Boundary Conditions </h4>
The following is a list of the files used for boundary conditions..

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/add_bc_mul.cpp"> add_bc_mul.cpp </a> - Add contribution from coupled boundary conditions</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/bc.cpp"> bc.cpp </a> - General boundary conditions </li> 
</ul><br>

<!-- ------------------------------------------------ -->
<!-- -----------  Linear Solvers -------------------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsils_linear_solvers"> Linear Solvers </h4>
The following is a list of the files associated with linear solvers.

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/bicgs.cpp"> bicgs.cpp </a> - Biconjugate-gradient algorithm </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/cgrad.cpp"> cgrad.cpp </a> - Conjugate-gradient algorithm</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/ge.cpp"> ge.cpp </a> - Gauss elimination</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/gmres.cpp"> gmres.cpp </a> - Generalized minimum residual algorithm</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/lhs.cpp"> lhs.cpp </a> - Create left hand side array</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/ls.cpp"> ls.cpp </a> - Create a linear solver</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/ns_solver.cpp"> ns_solver.cpp </a> - Solver for incompressible Navier-Stokes or fluid-solid equations </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/precond.cpp"> precond.cpp </a> - Apply preconditioner</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/solve.cpp"> solve.cpp </a> - Solve a liner system using a specific algorithm</li> 
</ul>

<!-- ------------------------------------------------ -->
<!-- -----------      Linear Algebra     ------------ -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsi_cep"> Linear Algebra </h4>
The following is a list of the files used for numerical linear algebra. 

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/dot.cpp"> dot.cpp </a> - Dot products vector.vector, array.array, etc</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/norm.cpp"> norm.cpp </a> - Compute vector and array norms</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/omp_la.cpp"> omp_la.cpp </a> - General linear algebra computations initially for OpenMP</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/spar_mul.cpp"> spar_mul.cpp </a> - Sparse matrix multiply</li> 
</ul>


<!-- ------------------------------------------------ -->
<!-- -----------  Parallel Processing  -------------- -->
<!-- ------------------------------------------------ -->

<h4 id="developer_code_organization_svfsils_parallel"> Parallel Processing </h4>
The following is a list of the files associated with parallel processing.

<ul><br>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/bcast.cpp"> bcast.cpp </a> - Broadcast a variable to all processors </li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/commu.cpp"> commu.cpp </a> - Creates MPI communicator</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS/in_commu.cpp"> in_commu.cpp </a> - Syncronize the data on the boundaries between the processors</li> 
</ul><br>



