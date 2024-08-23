<h2 id="developer_xml"> Processing XML</h2>
The svFSIplus reads simulation parameters from the <a href="#solver_input_file"> solver input file </a> 
stored in the Extensible Markup Language (XML) file format.

The solver input file is read when the svFSIplus program starts using a 
<a href="https://github.com/SimVascular/svFSIplus/blob/main/Code/Source/svFSI/Parameters.h"> Parameters </a> object.
The code then uses an API to access the parameter values from the <strong>Parameters</strong> object.
The XML file is parsed using the <a href="https://github.com/leethomason/tinyxml2"> TinyXML-2</a> C++ XML parser.

<!-- ---------------------------------------------------------- -->
<!-- -------------------- Parameters class -------------------- -->
<!-- ---------------------------------------------------------- -->

<h3 id="developer_xml_parameters_class"> Parameters class </h3>
The Parameters class is used to read and store simulation parameters parsed from an XML file using using 
the <a href="https://github.com/leethomason/tinyxml2"> TinyXML-2</a> C++ XML parser. Parameter types are checked 
as they are read so errors in parameter values are immediately detected.

The <strong>Parameters</strong>  class contains objects for each of the top-level sections in the parameters file
<pre>
GeneralSimulationParameters general_simulation_parameters;
std::vector<MeshParameters*> mesh_parameters;
std::vector<EquationParameters*> equation_parameters;
std::vector<ProjectionParameters*> projection_parameters;
</pre>
Each section is represented as a class containing objects for the parameters defined for that section and objects representing any sub-sections. Objects representing parameters are named the same as the name used in the XML file except with a lower case first character. Each parameter has a name and a value with as a basic type (bool, double, int, etc.) using the <strong>Parameter</strong> template class.

Example: <strong>MeshParameters</strong> class <strong>Parameter</strong> objects

<pre>
class MeshParameters : public ParameterLists
{
    // &lt;Add_mesh name=NAME >
    Parameter&lt;std::string> name;                       
 
    // &lt;Initialize_RCR_from_flow> BOOL &lt;/Initialize_RCR_from_flow>
    Parameter&lt;bool> initialize_rcr_from_flow;          
 
    // &lt;Mesh_file_path> FILE_NAME &lt;/Mesh_file_path>
    Parameter&lt;std::string> mesh_file_path;             
    
    // &lt;Mesh_scale_factor> SCALE &lt;/Mesh_scale_factor>
    Parameter&lt;double> mesh_scale_factor;               
};
</pre>


All section classes inherit from the <strong>ParameterLists</strong> class which has methods to set parameter values and store them in a map for processing (e.g. checking that all required parameters have been set).

Parameter names and default values are set in each section object constructor using member data. The <strong>ParameterLists::set_parameter()</strong> sets the name and default value for a parameter, and if a value for it is required to be given in the XML file.


Example: Setting parameter names and values in the <strong>MeshParameters</strong> constructor
<pre>
MeshParameters::MeshParameters()
{
  bool required = true;
 
  set_parameter("Domain", 0,  !required, domain_id);
  set_parameter("Domain_file_path", "", !required, domain_file_path);
 
  set_parameter("Fiber_direction_file_path", {}, !required, fiber_direction_file_paths);
 
  set_parameter("Mesh_file_path", "", required, mesh_file_path);
  set_parameter("Mesh_scale_factor", 1.0, !required, mesh_scale_factor);
  set_parameter("Prestress_file_path", "", !required, prestress_file_path);
 
  set_parameter("Initial_displacements_file_path", "", !required, initial_displacements_file_path);
  set_parameter("Initial_pressures_file_path", "", !required, initial_pressures_file_path);
  set_parameter("Initial_velocities_file_path", "", !required, initial_velocities_file_path);
 
  set_parameter("Set_mesh_as_fibers", false, !required, set_mesh_as_fibers);
  set_parameter("Set_mesh_as_shell", false, !required, set_mesh_as_shell);
}
</pre>

Parameter values are set using the <strong>set_values()</strong> method which contains calls to TinyXML2 to parse parameter values from an XML file. The XML elements within a section are extracted in a while loop. Sub-sections or data will need to be checked and processed. The <strong>ParameterLists::set_parameter_value()</strong> method is used to set the value of a parameter from a string.

Sections that contain simple elements (i.e., no sub-sections or special data processing) can be automatically parsed
a C++ function pointer.
<pre>
using std::placeholders::_1;
using std::placeholders::_2;
 
// Create a function pointer 'fptr' to 'LinearSolverParameters::set_parameter_value'.
std::function<void(const std::string&, const std::string&)> ftpr =
    std::bind( &LinearSolverParameters::set_parameter_value, *this, _1, _2);
 
// Parse XML and set parameter values.
xml_util_set_parameters(ftpr, xml_elem, error_msg);
</pre>


<!-- ---------------------------------------------------------- -->
<!-- -------------------- Accessing Parameters ---------------- -->
<!-- ---------------------------------------------------------- -->

<h3 id="developer_xml_accessing_parameters"> Accessing Parameters</h3>
Parameter values are accessed from the core simulation code using the <strong>Simulation</strong> object's 
<strong>Parameters</strong>  object. The <strong>template</strong> class () operator or value() method is used to 
access the parameter's value, the defined() method is used to check if a parameter's value has been set.

Example: Accessing parameter values
<pre>
auto& general_params = simulation->parameters.general_simulation_parameters
const int nsd = general_params.number_of_spatial_dimensions();
auto file_path = simulation.parameters.mesh_parameters[0].mesh_file_path();
 
if (eq_params->variable_wall_properties.defined()) { }
</pre>





