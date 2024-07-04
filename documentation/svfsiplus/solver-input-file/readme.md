<h2 id="solver_input_file"> Solver Parameter Input File </h2>

The svFSIplus solver reads simulation parameters from a text file in Extensible Markup Language 
<a href="https://en.wikipedia.org/wiki/XML"> (XML) </a> format. The XML file structurally organizes the svFSIplus 
solver parameters and input data (e.g. mesh files) needed to set up and execute a simulation. 

<h3> What is XML </h3>

The XML format is made up of tags, elements and atributes. A tag begins with < and ends with >. 
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
  <li> &lt;Add_mesh name="fluid"&gt; has an attibute <strong> name </strong> with value "fluid"</li>
  <li> &lt;Add_mesh name="fluid"&gt; element provides a context for the other elements under it: &lt;Add_face name=inlet&gt 
       associates the face named <strong>inlet</strong> to the mesh named <strong>fluid</strong> </li>
  <li> Mesh_file_path is a text element with text <strong>fluid_mesh.vtu</strong>
  <li> Domain is a text element with text <strong>1</strong>
  <li> Mesh_scale_factor is a text element with text <strong>0.1</strong>
</ul>

<!-- ================================================================================= -->
<!-- ============================== How svFSIplus uses XML =========================== -->
<!-- ================================================================================= -->

<h3> How svFSIplus uses XML </h3>

For the svFSIplus solver input file the XML elements are used as the names of the solver parameters.

svFSIplus defines for each parameter 
<ul style="list-style-type:disc;">
  <li> Name - Case sensitive with the first letter capitalized </li> 
  <li> Data type 
   <ul style="list-style-type:square;">
     <li> boolean - on, off </li>
     <li> integer - numeric with no decimal </li>
     <li> string - a contiguous list of characters </li>
     <li> real - numeric with decimal or scientific notation </li>
   </ul>
  <li> Context - parameters can only be found within the context of another parameter </li> 
</ul>

If a value for a parameter is not valid svFSIplus will display an error message indicating where in the file the error occured. 

Some parameters are optional. There are two types of optional parameters 
<ul style="list-style-type:disc;">
  <li> Used if not set - a default value is used 
  <li> Not used if not set - no default value 
</ul>

<!-- ================================================================================================== -->
<!-- ============================== organizaion of the parameter input file =========================== -->
<!-- ================================================================================================== -->

<h3> The organizaion of the parameter input file </h3>

The parameter input file is organized into six sections used to provide context for the parameters defined under them

<ol>

  <li> <a href="#general_parameters"> &lt;GeneralSimulationParameters> - General Simulation Parameters </a> </li>

  <li> <a href="#mesh_parameters"> &lt;Add_mesh> - Mesh Parameters </a> </li>

  <li> <a href="#equation_section"> &lt;Add_equation> - Equation Section </a> </li>

  <li> <a href="#liner_solver_parameters"> &lt;LS> - Linear Solver Parameters </a> </li>

  <li> <a href="#output_parameters"> &lt;Output> - Output Parameters </a> </li>

</ol>

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
&nbsp;&nbsp[solver output parmeters]
&nbsp;&nbsp;&lt;<strong>/Output</strong>&gt;

&lt;<strong>/Add_equation</strong>&gt;
</pre>

</pre>

