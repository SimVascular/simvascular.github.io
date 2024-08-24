
<br>
<hr class="rounded">

<h1 id="solver_input_file"> Solver Parameter Input File </h1>

The svFSIplus solver reads simulation parameters from a text file in Extensible Markup Language 
<a href="https://en.wikipedia.org/wiki/XML"> (XML) </a> format. The XML file structurally organizes the svFSIplus 
solver parameters and input data (e.g. mesh files) needed to set up and execute a simulation. 

<h2> What is XML </h2>

The XML format is made up of tags, elements and attributes. A tag begins with < and ends with >. 
There are two types of tag
<ul style="list-style-type:disc;">
  <li> start-tag, such as  &ltsection> </li>
  <li> end-tag , such as &lt/section> </li>
</ul>

An XML element is everything from (including) the element's start tag to (including) the element's end tag. 

<pre>
&lt;Tolerance> 0.001 &lt;/Tolerance>;
</pre>

There are three types of elements
<ul style="list-style-type:disc;">
  <li> text </li>
  <li> attributes - name-value pair within a start-tag: name="value" "</li>
  <li> other elements - elements nested within other elements </li>
</ul>

The following XML is an example of these different element types
<pre>
&lt;Add_mesh name="fluid"&gt;

<nobr>
&nbsp;&lt;Mesh_file_path&gt;</a> fluid_mesh.vtu 
&nbsp;&lt;/Mesh_file_path&gt;</a>
<br><br>

&nbsp;&lt;Add_face name="inlet"&gt;<br>
&nbsp;&nbsp;&lt;Face_file_path&gt;</a> inlet.vtp
&lt;/Face_file_path&gt;</a>
<br>
&nbsp;&lt;/Add_face&gt;
<br><br>

<nobr>
&nbsp;&lt;Domain&gt; 1 
&lt;/Domain&gt;
<br>
<nobr>

<br>
<nobr>
&nbsp;&lt;Mesh_scale_factor&gt; 0.1 
&lt;/Mesh_scale_facto&gt;
<br><br>
&lt;/Add_mesh&gt;
</pre>

The above contains 
<ul style="list-style-type:disc;">
  <li> six elements: Add_mesh, Mesh_file_path, Add_face, Face_file_path, Domain and Mesh_scale_factor
  <li> &lt;Add_mesh name="fluid"&gt; has an attribute <strong> name </strong> with value "fluid"</li>
  <li> &lt;Add_mesh name="fluid"&gt; element provides a context for the other elements under it: &lt;Add_face name=inlet&gt 
       associates the face named <strong>inlet</strong> to the mesh named <strong>fluid</strong> </li>
  <li> Mesh_file_path is a text element with text <strong>fluid_mesh.vtu</strong>
  <li> Domain is a text element with text <strong>1</strong>
  <li> Mesh_scale_factor is a text element with text <strong>0.1</strong>
</ul>

<!-- ================================================================================= -->
<!-- ============================== How svFSIplus uses XML =========================== -->
<!-- ================================================================================= -->

<h2> How svFSIplus uses XML </h2>

For the svFSIplus solver input file the XML elements are used as the names of the solver parameters.

svFSIplus defines for each parameter 
<ul style="list-style-type:disc;">
  <li> Name - Case sensitive with the first letter capitalized </li> 
  <li> Data type 
   <ul style="list-style-type:square;">
     <li> <i>boolean</i> - on, off </li>
     <li> <i>integer</i> - numeric with no decimal </li>
     <li> <i>string</i> - a contiguous list of characters </li>
     <li> <i>real</i> - numeric with decimal or scientific notation </li>
   </ul>
  <li> Context - parameters can only be found within the context of another parameter </li> 
</ul>

If a value for a parameter is not valid svFSIplus will display an error message indicating where in the file the error occurred. 

Some parameters are optional. There are two types of optional parameters 
<ul style="list-style-type:disc;">
  <li> Used if not set - a default value is used 
  <li> Not used if not set - no default value 
</ul>

<!-- ================================================================================================== -->
<!-- ============================== organizaion of the parameter input file =========================== -->
<!-- ================================================================================================== -->

<h2> The organization of the parameter input file </h2>

The parameter input file is organized into six sections used to provide context for the parameters defined under them

<ol>

  <li> <a href="#general_parameters"> &lt;GeneralSimulationParameters> - General Simulation Parameters </a> </li>

  <li> <a href="#mesh_parameters"> &lt;Add_mesh> - Mesh Parameters </a> </li>

  <li> <a href="#equation_section"> &lt;Add_equation> - Equation Section </a> </li>

  <li> <a href="#liner_solver_parameters"> &lt;LS> - Linear Solver Parameters </a> </li>

  <li> <a href="#output_parameters"> &lt;Output> - Output Parameters </a> </li>

</ol>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
The parameter input XML file must start with the following two lines

&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
<br>
&lt;svFSIFile version="0.1"&gt;

and end with the single line

&lt;/svFSIFile&gt;

where 

<ul style="list-style-type:disc;">
  <li> <strong>&lt;?xml</strong> - identifies the file as an XML format file </li>
  <li> <strong>&lt;svFSIFile</strong> - identifies the file as an svFSIplus XML format file </li>
</ul>

</div>


The following outlines the basic structure of the parameter input XML file. 

<pre>
<pre>
&lt;<strong>GeneralSimulationParameters</strong>&gt;
[general parameters]
&lt;<strong>/GeneralSimulationParameters</strong>&gt;
</pre>

<pre>
&lt;<strong>Add_mesh</strong> name=<i>mesh_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh1_face_name_n</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;

&lt;<strong>Add_mesh</strong> name=<i>mesh_name_2</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh2_face_name_n</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;
...
&lt;<strong>Add_mesh</strong> name=<i>mesh_name_N</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_1</i>&gt;
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_2</i>&gt;
&nbsp;&nbsp...
&nbsp;&nbsp;&lt;<strong>Add_face</strong> name=<i>meshN_face_name_M</i>&gt;
&lt;<strong>/Add_mesh</strong>&gt;
</pre>

<pre>
&lt;<strong>Add_equation</strong> type=<i>eq_1</i>&gt;
&nbsp;&nbsp;[equation parameters]

&nbsp;&nbsp;&lt;<strong>Domain</strong> id=0</i>&gt;
&nbsp;&nbsp;&lt;<strong>Domain</strong> id=1</i>&gt;
&nbsp;&nbsp;...
&nbsp;&nbsp;&lt;<strong>Domain</strong> id=N</i>&gt;

&nbsp;&nbsp;&lt;<strong>LS</strong> type=<i>ls_type</i>&gt;
&nbsp;&nbsp[linear solver parameters]
&nbsp;&nbsp;&lt;<strong>/LS</strong>&gt;

&nbsp;&nbsp;&lt;<strong>Output</strong> type=<i>output_type</i>&gt;
&nbsp;&nbsp[solver output parameters]
&nbsp;&nbsp;&lt;<strong>/Output</strong>&gt;

&lt;<strong>/Add_equation</strong>&gt;
</pre>
</pre>

<h2> Parameter Documentation Conventions </h2>
Parameters are documented using the parameter <strong>Name</strong> and <i>DataType</i>. If the parameter is optional its default value is shown between square brackets

<strong>Example</strong> The optional <strong>Spectral_radius_of_infinite_time_step</strong> parameter with default value 0.5
<pre>
<strong>&lt;Spectral_radius_of_infinite_time_step&gt;</strong> <i>real</i>  [0.5] <nobr>
<strong>&lt;/Spectral_radius_of_infinite_time_step&gt;</strong>
</pre>

A string parameter will have a default value of <i>none</i>. If not set the parameter will have a value of an empty string ("" in C++) and will be treated as being unset and will not be used.

<strong>Example</strong> The optional <strong>Save_results_in_folder</strong> <i>string</i> parameter with default value <i>none</i>
<pre>
<strong>&lt;Save_results_in_folder&gt;</strong> <i>string [none]</i> <nobr>
<strong>&lt;/Save_results_in_folder&gt;</strong>
</pre>


A required parameter will have no default value.

<strong>Example</strong>  The required <strong>Number_of_time_steps</strong> parameter with no default value
<pre>
<strong>&lt;Number_of_time_steps&gt;</strong> <i>integer</i> <nobr>
<strong>&lt;/Number_of_time_steps&gt;</strong>
</pre>

<h2 id="solver_input_file_exmaples"> Solver Parameter Input File Examples</h2>
The svFSIplus GitHub repository <a href="https://github.com/SimVascular/svFSIplus/tree/main/tests/cases"> Test Cases </a> directory contains solver input XML files used to test svFSIplus. These XML files can be used as templates that can be customized for a particular application.




