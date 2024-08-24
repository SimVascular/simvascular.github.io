<h2 id="developer_implementation"> Implementation Details</h2>
This section describes some of the svFSIplus implementation details that a developer should find useful.

<ul style="list-style-type:disc;">
  <li> <a href="#developer_implementation_enumeration"> Enumerations </a> </li>
  <li> <a href="#developer_implementation_finite_element_method"> Finite Element Method </a> </li>
  <li> <a href="#developer_implementation_flow_control"> Flow of Control </a> </li>
  <li> <a href="#developer_implementation_linear_algebra"> Linear Algebra Interface </a> </li>
  <li> <a href="#developer_implementation_material_models"> Material Models </a> </li>
  <li> <a href="#developer_implementation_parallel_processing"> Parallel Processing </a> </li>
  <li> <a href="#developer_implementation_vtk"> VTK Interface </a> </li>
</ul>

<!-- ========================================================= -->
<!--                     Enumerations                          -->
<!-- ========================================================= -->

<h3 id="developer_implementation_enumeration"> Enumerations </h3>
Enumerations are used to define user-defined data types that consist of integral constants used to represent a fixed range of possible values. 

The C++ <strong>enum class</strong> is used to define enumerations using a class name as a scope. Most enumerations are defined in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/const.h"> consts.h </a> file. 

<strong>Example</strong> Finite element type
<pre>
enum class ElementType
{
  NA = 100,
  PNT = 101,
  LIN1 = 102,
  LIN2 = 103,
  TRI3 = 104,
  TRI6 = 105,
  QUD4 = 106,
  QUD8 = 107,
  QUD9 = 108,
  TET4 = 109,
  TET10 = 110,
  HEX8 = 111,
  HEX20 = 112,
  HEX27 = 113,
  WDG = 114,
  NRB = 115
};

</pre>

The <strong>HEX8</strong> value is accessed using <strong>ElementType::HEX8</strong>.

The C++ <strong>constexpr</strong> statement can be used to create a short hand name for a <strong>enum class</strong> value 
<pre>
constexpr auto ElementHex8 = ElementType::HEX8;
</pre>

If a <strong>enum class</strong> value needs to be used as an <strong>int</strong> it can be converted using the <strong>enum_int</strong> function 
<pre>
int element_type = enum_int(ElementType::HEX8);
</pre>

<!-- ========================================================= -->
<!--               Finite Element Method                       -->
<!-- ========================================================= -->

<h3 id="developer_implementation_finite_element_method"> Finite Element Method </h3>
This section outlines some of the details of the finite element method implementation. 

<!-- --------------------------------------------------------- -->
<!-- Element properites and shape functions                    -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_finite_element_method_props"> Element properties and shape functions </h4>
The original Fortran code set element properties and shape function data using very large <i>select</i> statements in the NN.f file. The C++ code reproduces this functionality using (very large) <i>std::map</i> data structures implemented in the files with a <i>nn</i> prefix

<br> 
<ul>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/lhsa.cpp"> lhsa.cpp </a> - Assembles the global element stiffness matrix and residue</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn.cpp"> nn.cpp </a> - Set element properties and allocate element arrays</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gip.h"> nn_elem_gip.h </a> - Sets element Gauss integration data</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gnn.h"> nn_elem_gnn.h </a> - Sets element shape function data</li> 
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_gnnxx.h"> nn_elem_gnnxx.h </a> - Sets 2nd derivatives element shape function data</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_nn_bnds.h"> nn_elem_bnds.h </a> - Sets the bounds of element shape functions</li>
  <li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn_elem_props.h"> nn_elem_props.h </a> Sets element properties</li>
</ul>

(It is unclear what the meaning of the <i>nn</i> prefix is.)

The <i>std::map</i> data structures are used to map element types (e.g. ElementType::HEX8) to a lambda function that implements a specific operation (e.g. setting element properties). The functions defined in <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/nn.cpp"> nn.cpp </a> provide an interface accessing the operations defined in the <i>std::map</i> data structures.

<strong>Example</strong> Define the <strong>set_3d_element_props</strong> <i>std::map</i>
<pre>
using SetElementPropsMapType = std::map&lt;int, std::function&lt;void(int, mshType&)>>;

SetElementPropsMapType set_3d_element_props = {

  {2, [](int insd, mshType& mesh) -> void {
    mesh.eType = ElementType::LIN1;
    mesh.nG = 2;
    mesh.vtkType = 3;
    mesh.nEf = 2;
    mesh.lShpF = true;
    }
  },

  {4, [](int insd, mshType& mesh) -> void {
    mesh.eType = ElementType::TET4;
    mesh.nG = 4;
    mesh.vtkType = 10;
    mesh.nEf = 4;
    mesh.lShpF = true;
    }
  }
...
};
</pre>

The <strong>set_3d_element_props</strong> <i>std::map</i> maps integers (number of element nodes) to a lambda function of type <strong>void (int insd, mshType& mesh)</strong> which sets the element properties for the input <strong>mesh</strong>.

<strong>Example</strong> Set element properties based on integration dimension and number of element nodes
<pre>
void select_ele(const ComMod& com_mod, mshType& mesh)
{
  int insd = com_mod.nsd;

  try {
    set_3d_element_props[mesh.eNoN](insd, mesh);
  } catch (const std::bad_function_call& exception) {
      throw std::runtime_error("[select_ele] No support for " + std::to_string(mesh.eNoN) + " noded " +
          std::to_string(insd) + "D elements.");
  }
</pre>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
This implementation will be replaced by C++ classes defined for each element type.
</div>

<!-- --------------------------------------------------------- -->
<!-- Element matrix assembly                                   -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_finite_element_assembly"> Element matrix assembly </h4>
Element matrices are assembled to into a global system of equations. Matrix assembly is implemented in files named by the equation it is used for (see <a href="#developer_code_organization_svfsi_equations"> Organization Equations </a>). 

Each of these files has a <strong>construct_<i>equation_name</i></strong> function used to assemble the element equations into a stiffness matrix <strong>lK</strong> and residual matrix <strong>lR</strong>. These matrices are then assembled into global matrices using a call to <strong>eq.linear_algebra->assemble()</strong>. See <a href="#developer_implementation_flow_control_assemble_equations"> Flow of Control / Assemble equations</a>.

<!-- ========================================================= -->
<!--                Linear Algebra Interface                   -->
<!-- ========================================================= -->

<h3 id="developer_implementation_linear_algebra"> Linear Algebra Interface </h3>
svFSIplus supports a C++ interface to numerical linear algebra packages. The <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/LinearAlgebra.h"> LinearAlgebra </a> class implements an abstract interface to linear algebra frameworks for 

<br>
<ul>
<li> <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSILS"> FSILS </a> - Custom linear algebra functions </li>
<li> <a href="https://trilinos.github.io/"> Trilinos</a> - A collection of scientific software libraries for for linear solvers, non-linear solvers, etc. </li>
<li> <a href="https://petsc.org/"> PETSc </a> - Portable, Extensible Toolkit for Scientific Computation is for the parallel solution of scientific applications modeled by partial differential equations  </li>
</ul>

The <strong>LinearAlgebra</strong> provides an abstract interface to functions used for 
<ul>
<li> Finite element assembly - assemble() </li>
<li> Solve a linear system - solve() </li>
</ul>

The interface for each linear algebra framework is implemented in
<ul>
<li> 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/FsilsLinearAlgebra.h"> FsilsLinearAlgebra.h </a> 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/FsilsLinearAlgebra.cpp"> FsilsLinearAlgebra.cpp </a> 
</li>
<li> 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/PetscLinearAlgebra.h"> PetscLinearAlgebra.h </a>  
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/PetscLinearAlgebra.cpp"> PetscLinearAlgebra.cpp</a>  
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/petsc_impl.cpp"> petsc_impl.cpp</a>  
</li>
<li> 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/TrilinosLinearAlgebra.h"> TrilinosLinearAlgebra.h </a>  
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/TrilinosLinearAlgebra.cpp"> TrilinosLinearAlgebra.cpp </a>  
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/trilinos_impl.cpp"> trilinos_impl.cpp </a>  
</li>
</ul>

Code referencing package-depedent data structures and functions is isolated in <strong>_impl.cpp</strong> files.

The <b>eqType</b> class contains a <b>LinearAlgebra* linear_algebra</b> object used to interface to a linear algebra framework.
This object is created in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L68"> add_eq_linear_algebra</a> function.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The <b>PetscLinearAlgebra</b> interface was taken from an implementation for the Fortran svFSI code. Its implementation uses static global objects so it can only support a single instance of a the <b>PetscLinearAlgebra</b> object.
</div>

<!-- ========================================================= -->
<!--                Material Models                            -->
<!-- ========================================================= -->

<h3 id="developer_implementation_material_models"> Material Models </h3>
Material models are implemented using function templates in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/mat_models_carray.h"> mat_models_carray.h</a> file. The function templates are parameterized by space dimension 2 or 3.

<strong>Example</strong> Calling the <strong>get_pk2cc</strong> function template for dimension 3
<pre>
mat_models_carray::get_pk2cc&lt;3>(com_mod, cep_mod, dmn, F, nFn, fN, ya_g, S, Dm);
</pre>

The functions implementing material models use a C++ <strong>switch</strong> statement to select model types which are all implemented in that function.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
This implementation will be replaced by C++ classes defined for each material model.
</div>

<!-- ========================================================= -->
<!--                Parallel Processing                        -->
<!-- ========================================================= -->

<h3 id="developer_implementation_parallel_processing"> Parallel Processing </h3>
The svFSIplus program uses Message Passing Interface (MPI) library routines to run in parallel on an HPC cluster. Coarse-grained parallelism is employed to divide the program into large tasks (svFISplus program) and assign them to different processors for computation. No fine-grained data parallelism is used (i.e. loop-level parallelism using OpenMP or GPUs).

See <a href="#developer_code_organization_svfsi_parallel"> Organization / svFSI Parallel Processing </a> and 
<a href="#developer_code_organization_svfsils_parallel"> Organization / FSILS Parallel Processing </a> for a list of the files associated with parallel processing.

MPI is initialized in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L781"> main </a> 
svFSIplus function. Each process reads in the solver input XML file. The master process then partitions the simulation mesh and boundary conditions and sends the partitioned data to each process.

The <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/CmMod.h#L82"> cmType class </a> <strong>bcast</strong> functions wrap <strong>MPI_Bcast</strong> for C++ data types (e.g., bool, double, etc.) and svFSIplus <strong>Vector</strong> objects. C++ <strong>enum</strong> values are sent as <strong>int</strong>s using the <strong>bcast_enum</strong> template function.

<strong>Example</strong> Broadcasting the value of dmn.phys (class enum <strong>EquationType</strong>)
<pre>
cm.bcast_enum(cm_mod, &dmn.phys);
</pre>

MPI functions use raw pointers (e.g. double*) as function arguments. The <strong>Vector, Array and Array3</strong> classes all have a <strong>data()</strong> method that returns a raw pointer to their internal data. 

<strong>Example</strong> Passing M.gIEN, sCount, and disp Array and Vector data to the MPI_Scatterv function
<pre>
MPI_Scatterv(lM.gIEN.data(), sCount.data(), disp.data(), cm_mod::mpint, lM.IEN.data(), nEl*eNoN, cm_mod::mpint, cm_mod.master, cm.com());
</pre>

<!-- ========================================================= -->
<!--                    VTK Interface                          -->
<!-- ========================================================= -->

<h3 id="developer_implementation_vtk"> VTK Interface </h3>
svFSIplus currently uses VTK-format files to store finite element mesh, boundary condition and initial condition data. The Fortran svFSI program used custom code (!) to read in VTK-format files. This code has been replaced with functions using the VTK library.

An interface isolating calls to the VTK API has been implemented in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/VtkData.h"> VtkData </a> abstract class. This class provides methods for read, writing and accessing VTK data stored in VTP and VTU files. It is primarily used in the <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/vtk_xml.cpp"> vtk_xml_.cpp </a> code. 

The <b>VtkData</b> base class is used to defined the two concrete class
<ul>
<li><b>VtkVtpData</b> - Interface for reading, writing and accessing data from VTP files </li>
<li><b>VtkVtuData</b> - Interface for reading, writing and accessing data from VTU files </li>
</ul>

Each of these classes have an <b>Impl</b> class containing calls to the VTK API.

The <b>VtkData</b> class contains two factory methods 
<ul>
<li><b>create_reader</b> - Create a reader for VTP or VTU files depending on file extension (.vtp or .vtu) </li>
<li><b>create_writer</b> - Create a writer for VTP or VTU files depending on file extension (.vtp or .vtu) </li>
</ul>

<b>Example</b> Reading a VTK file using the <b>VtkData</b> class
<pre>
auto vtk_data = VtkData::create_reader(fName);
int num_elems = vtk_data->num_elems();
int num_points = vtk_data->num_points();
mesh.IEN = vtk_data->get_connectivity();
mesh.x = vtk_data->get_points();
</pre>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/vtk_xml_parser.cpp"> vtk_xml_parser.cpp </a> file still contains calls to the VTK API. These will be replaced with the <b>VtkData</b> class. 
</div>


<!-- ========================================================= -->
<!--                 Flow of Control                           -->
<!-- ========================================================= -->

<h3 id="developer_implementation_flow_control"> Flow of Control </h3>
This section outlines the solver flow of control for a simulation.

The code is documented using a text and links to code in GitHub using the following conventions

<ul style="list-style-type:disc;">
  <li> A call to a function has the function name shown in square brackets [<i>function_name</i>] </li>
  <li> A line in the code shown as a dot in square brackets [.] </li> 
  <li> A loop is defined using a <strong>foreach</strong> line followed by a colored box enclosing the code within the loop</li> 
</ul> 

The text description may be a link to subsections within this document describing code within a specific function.

<strong>Sections</strong>
<ul>
  <li> <a href="#developer_implementation_flow_control_main"> Main </a> 
  <li> <a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a> 
  <li> <a href="#developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file, mesh and BC data </a> 
  <li> <a href="#developer_implementation_flow_control_read_xml_params">  Read the solver XML </a> 
  <li> <a href="#developer_implementation_flow_control_read_mesh_data">  Read mesh data </a> 
  <li> <a href="#developer_implementation_flow_control_read_equations">  Read equations and boundary condition data </a> 
  <li> <a href="#developer_implementation_flow_control_distribute">  Distribute data to processors </a> 
  <li> <a href="#developer_implementation_flow_control_distribute_equation">  Distribute equation data </a> 
  <li> <a href="#developer_implementation_flow_control_initialize">  Initialize simulation data </a> 
  <li> <a href="#developer_implementation_flow_control_run_simulation">  Run the simulation </a> 
  <li> <a href="#developer_implementation_flow_control_read_bc_data">  Read boundary condition data </a> 
  <li> <a href="#developer_implementation_flow_control_iterate_solution">  Iterate solution </a> 
  <li> <a href="#developer_implementation_flow_control_predictor_step">  Predictor step </a> 
  <li> <a href="#developer_implementation_flow_control_initiator_step">  Initiator step for Generalized α−Method </a> 
  <li> <a href="#developer_implementation_flow_control_assemble_equations">  Assemble equations </a> 
</ul>


<!-- --------------------------------------------------------- -->
<!-- Main                                                      -->
<!-- --------------------------------------------------------- -->

<h4 id="developer_implementation_flow_control_main"> Main </h4>
The <strong>main</strong> function is the entry point for the svFSIplus program.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L770"> main() in main.cpp</a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Initialize MPI [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L781"> . </a> ]

Create <strong>Simulation</strong> object [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L793"> . </a> ]

<a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a>
</div>

<!-- --------------------------------------------------------- -->
<!-- Iterate for restarting a simulation after remeshing       -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </h4>
This code section checks if a remeshing operation is needed while iterating over time. If remeshing is needed then the time
iteration is interrupted, remeshing is performed, new mesh data is distributed and time iteration continues.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L805"> main() in main.cpp </a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<strong>while simulation is active: </strong>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
<a href="#developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file, mesh and BC data </a> [ 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L812"> read_files </a>]

<a href="#developer_implementation_flow_control_distribute"> Distribute data to processors</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L819"> distribute </a> ]

<a href="#developer_implementation_flow_control_initialize"> Initialize simulation data </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L828"> initialize </a> ]

<a href="#developer_implementation_flow_control_run_simulation"> Run the simulation</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L848"> run_simulation </a> ]

</div>


</div> 


<!-- --------------------------------------------------------- -->
<!-- Read in a solver XML file and all mesh and BC data        -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_read_xml_bcs"> Read in a solver XML file, mesh and BC data </h4>
This code section reads in the solver input file, finite element mesh files and boundary condition data.
<br>

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1597"> read_files() in read_files.cpp</a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<a href="#developer_implementation_flow_control_read_xml_params"> Read the solver XML file </a> [ 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1614"> 
read_parameters </a> ]

Set simulation and module member data from XML parameters [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1648"> set_module_parameters </a> ]

<a href="#developer_implementation_flow_control_read_mesh_data"> Read mesh data</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1654"> 
read_msh</a> ]

<a href="#developer_implementation_flow_control_read_equations"> Read equations and boundary condition data</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1685"> 
read_eq </a> ]

</div> 

<!-- --------------------------------------------------------- -->
<!-- Read the solver XML                                       -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_read_xml_params"> Read the solver XML </h4>
This code section reads and sets parameters from the solver input XML file.
<br><br>
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Simulation.cpp#L63"> read_parameters() in Simulation.cpp</a>
<br>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Read XML file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Parameters.cpp#L147"> read_xml </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read mesh data                                            -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_read_mesh_data"> Read mesh data </h4>
This code section reads in the finite element mesh data. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1079"> read_msh() in read_msh.cpp </a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<strong>foreach mesh</strong>: 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Set mesh parameters and read mesh data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1120"> .  </a> ]

Read mesh nodal coordinates and element connectivity [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1136"> .  </a> ]

Allocate mesh local to global nodes map (gN) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1147"> .  </a> ]

Global total number of nodes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1168"> .  </a> ]
</div> 

Create global nodal coordinate array [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1184"> .  </a> ]

Process projection faces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1264"> .  </a> ]

Set domain IDs [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1457"> .  </a> ]

Read fiber orientation [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1542"> .  </a> ]

Read prestress data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L1603"> .  </a> ]

Set initial mesh pressure, velocity or displacement from a file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_msh.cpp#L163"> .  </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Read equations                                            -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_read_equations"> Read equations and boundary condition data </h4>
This code section sets the parameter data for a given equation and reads in boundary condition data defined for it.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1346"> read_eq() in read_files.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Set equation properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1426"> set_equation_properties </a> ]

Set the number of function spaces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1432"> . </a> ]

<strong>foreach boundary condition:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Search for face [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1466"> all_fun::find_face </a> ] 

<a href="#developer_implementation_flow_control_read_bc_data"> Read boundary condition data</a> [ 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1471"> read_bc </a> ]

</div>

Initialize cplBC for RCR-type BC [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1476">  . </a> ] 

Read body forces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L1520">  read_bf </a> ] 
</div>

<!-- --------------------------------------------------------- -->
<!-- Distribute data to processors                             -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_distribute"> Distribute data to processors</h4>
This code section partitions and distributes data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L57"> distribute() in distribute.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Send simulation parameters to all processors [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L71"> . </a> ]

Compute the weights used to assign a portion of each mesh to the each processor [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L111"> . </a> ]

Partition work [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L141">  all_fun::split_jobs </a> ]

<strong>foreach mesh</strong>: <br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Partition mesh [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L187">  part_msh </a> ]
</div> 

Rearrange body force structure [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L224"> . </a> ]

Partition faces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L282">  part_face </a> ]

Distribute com_mod.x [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L370"> . </a> ]

Distribute prestress (pS0) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L414"> . </a> ]

Distribute initial flow quantities (Pinit, Vinit, Dinit) [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L459"> . </a> ]

<a href="#developer_implementation_flow_control_distribute_equation"> Distribute equation data</a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L490"> dist_eq </a> ]

Distribute CMM variable wall properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L520"> . </a> ]

Distribute cplBC data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L531"> . </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Distribute equation data to processors                    -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_distribute_equation"> Distribute equation data </h4>
This code section distributes equation data to processors. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L940"> dist_eq() in distribute.cpp</a>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

Distribute equation parameters

Distribute linear solver settings

Distribute domain properties

<strong>foreach domain:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Distribute material properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1063"> dist_mat_consts</a> ]

Distribute viscosity model properties [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1069"> dist_visc_model </a> ]
</div> 

Distribute cardiac electromechanics parameters<br>
Distribute ECG leads parameters<br>
Distribute output parameters<br>

Distribute boundary condition data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1138"> dist_bc </a> ] 

Distribute body force data [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/distribute.cpp#L1157"> dist_bf </a> ]
</div>

<!-- --------------------------------------------------------- -->
<!-- Initialize simulation data                                -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_initialize"> Initialize simulation data </h4>
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L313"> initialize() in initialize.cpp</a>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Setup logging to history file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L343"> initialize </a> ]

Set faces for linear solver [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L370"> initialize </a> ]

Set com_mod.stamp [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L497"> initialize </a> ] 

Initialize tensor operations [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L547"> initialize </a> ]

Constructing stiffness matrix [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L551"> initialize </a> ]

Initialize FSILS structures [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L559"> initialize </a> ]

Allocate com_mod.A0, com_mod.An, etc. [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L577"> initialize </a> ]

Initialize electrophysiology [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L606"> initialize </a> ]

Initialize remeshing [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L620"> initialize </a> ]

Initialize function spaces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/initialize.cpp#L731C6-L731C32"> initialize </a> ]
</div> 

<!-- --------------------------------------------------------- -->
<!-- Run the simulation                                        -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_run_simulation"> Run the simulation </h4>
This code section just calls the iterate_solution() function.
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L761"> run_simulation() in main.cpp</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<a href="#developer_implementation_flow_control_iterate_solution"> Iterate solution</a> [
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L763"> iterate_solution</a> ]

</div>

<!-- --------------------------------------------------------- -->
<!-- Read boundary condition data                              -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_read_bc_data"> Read boundary condition data </h4>
This code section reads in boundary condition data.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L152"> read_bc() in read_files.cpp</a> 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L185"> read_trac_bcff </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L246"> read_temporal_values </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L254"> read_fourier_coeff_values_file </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L348"> read_temp_spat_values </a> ]

[ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L418"> read_spatial_values </a> ]

CMM: load wall displacements, read prestress tensor, read displacements [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/read_files.cpp#L548"> . </a> ]

</div>

<!-- --------------------------------------------------------- -->
<!-- iterate_solution                                          -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_iterate_solution"> Iterate solution </h4>
This code section solves the simulation equations for each time step. If remeshing is active then a check is made if remeshing is needed. If it is then control is returned to <a href="#developer_implementation_flow_control_remesh_loop"> Iterate for restarting a simulation after remeshing </a>.

The code iterates over two nested loops 
<ol type="1">
  <li> Outer loop that steps the simulation in time </li>
  <li> Inner predictor-corrector loop that solves the nonlinear system of equations for the current time step</li> 
</ol>

The <i>Inner predictor-corrector loop</i> will switch between the equations defined for the simulation solving each in turn until convergence is achieved. For example, a fluid-solid interaction simulation will solve for the fluid equation, then solve for the mesh (solid) equation, then solve for the fluid equation and so on.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The current equation being solved is determined by the <strong>com_mod.cEq</strong> variable. This variable is set in the 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L589"> pic::picc </a> function.
</div>

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L194"> iterate_solution() in main.cpp </a>
<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">

<strong>foreach time step:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">

Incrementing time step [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L296C8-L296C30"> . </a> ]

Compute mesh properties and check if remeshing is needed [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L317C8-L317C54"> . </a> ]

<a href="#developer_implementation_flow_control_predictor_step"> Predictor step </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L334"> picp </a> ]

Apply Dirichlet BCs strongly [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L348"> set_bc::set_bc_dir </a> ]

Iterate the precomputed state-variables in time [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L350"> iterate_precomputed_time </a> ]

Inner loop for nonlinear Newton iteration [<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L358"> . </a>] <br><br>
<strong>while true: </strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #00e000; border-left: 6px solid #00e000">

<a href="#developer_implementation_flow_control_initiator_step"> Initiator step for Generalized α−Method </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L391"> pic::pici </a>]

Allocate com_mod.R and com_mod.Val arrays [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L415"> ls_ns::ls_alloc </a>]

Compute body forces [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L427"> bf::set_bf </a>]

<strong>foreach mesh</strong>: 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #00e0e6; border-left: 6px solid #00e0e6">

<a href="#developer_implementation_flow_control_assemble_equations"> Assemble equations </a> [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L437">  eq_assem::global_eq_assem </a>]
</div>

Apply Neumman or Traction boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L454"> set_bc::set_bc_neu </a>]

Apply CMM boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L467"> set_bc::set_bc_cmm </a>]

Apply weakly applied Dirichlet boundary conditions [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L476"> set_bc::set_bc_dir_w </a>] 

Apply contact model [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L481"> contact::construct_contact_pnlty </a>]

Synchronize R across processes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L500"> all_fun::commu </a>]

Update residual in displacement equation for USTRUCT physics [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L513"> ustruct::ustruct_r </a>]

Set the residual of the continuity equation and its tangent matrix due to variation with pressure to 0 on all the edge nodes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L523"> fs::thood_val_rc </a>]

Treat Neumann boundaries that are not deforming [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L532"> set_bc::set_bc_undef_neu </a>]

Solve equation [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L567"> ls_ns::ls_solve </a>]

Update corrector and check for convergence [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L589"> pic::picc </a>]

Write results [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L601"> output::output_result </a>]
</div><br>

Save text files containing average results [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L630"> txt_ns::txt </a>]

Check if remeshing is needed [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L632"> . </a>]

Save result to restart bin file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L694"> output::write_restart </a>]

Save result to VTK file [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L715"> vtk_xml::write_vtus </a>]

Set last time step flag [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L682"> . </a>]

Check for last time step [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/main.cpp#L735"> . </a>]
</div>

</div>

<!-- --------------------------------------------------------- -->
<!-- Predictor step                                            -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_predictor_step"> Predictor step </h4>
This code section implements the predictor step in a two-stage predictor–multicorrector algorithm for solving the nonlinear finite element equations.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L579"> picp() in pic.cpp </a>

<br>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
Prestress initialization [ 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L604"> . </a> ]

<strong>foreach equation:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">

Update com_mod.An [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L662"> . </a> ]

Electrophysiology [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L668"> cep_ion::cep_integ </a> ]

Update com_mod.Yn [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L671"> . </a> ]

Update com_mod.Dn [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L678"> . </a> ]

</div>
</div>

<!-- --------------------------------------------------------- -->
<!-- Initiator step for Generalized α−Method                   -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_initiator_step"> Initiator step for Generalized α−Method </h4>
This code section implements the initiator step for the Generalized α−Method time stepping. 

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L479"> pici() in pic.cpp </a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
eq.itr = eq.itr + 1 [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L495"> . </a> ]

<strong>foreach equation:</strong>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">
Update Ag, Dg, Yg [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/pic.cpp#L529"> . </a> ]
</div>

</div>

<!-- --------------------------------------------------------- -->
<!-- Assemble equations                                        -->
<!-- --------------------------------------------------------- -->
<h4 id="developer_implementation_flow_control_assemble_equations"> Assemble equations </h4>
This code section implements assembly of the finite element matrices for a given finite element mesh for the current equation specified by <strong>com_mod.cEq</strong>.

<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L309"> global_eq_assem() in eq_assem.cpp </a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #d0d0d0">
<strong>switch on eq.phys:</strong> 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #0000e6; border-left: 6px solid #0000e6">

EquationType::phys_fluid [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L333"> fluid::construct_fluid  </a> ]

EquationType::phys_heatF [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L337"> heatf::construct_heatf </a> ]

EquationType::phys_heatS [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L341"> heats::construct_heats </a> ]

EquationType::phys_lElas [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L345"> l_elas::construct_l_elas </a> ]

EquationType::phys_struct [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L349"> struct_ns::construct_dsolid </a> ]

EquationType::phys_ustruct [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L353"> ustruct::construct_usolid </a> ]

EquationType::cmm::construct_cmm [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L357"> cmm::construct_cmm </a> ]

EquationType::phys_shell [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L361"> </a> ]

EquationType::phys_FSI [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L365"> fsi::construct_fsi </a> ]

EquationType::phys_mesh [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L369"> mesh::construct_mesh </a> ]

EquationType::phys_CEP [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L373"> cep::construct_cep </a> ]

EquationType::phys_stokes [ <a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/eq_assem.cpp#L377"> stokes::construct_stokes </a> ]

</div> 
</div> 



