<br>
<hr class="rounded">

<h1> Appendix </h1> 

<!-- =================================================================== -->
<!-- ========================== VTK File Format ======================== -->
<!-- =================================================================== -->

<h2 id="appendix_vtk_file_format"> VTK File Format </h2> 
The <a href="https://docs.vtk.org/en/latest/"> Visualization Toolkit (VTK)</a> compressed XML file format
(see <a href="https://docs.vtk.org/en/latest/design_documents/VTKFileFormats.html"> VTK file formats</a>)
is used by svFSIplus to store
<br>
<ul style="list-style-type:disc;">
<li> Finite element mesh </i>
<li> Boundary condition data </i>
<li> Simulation results </i>
</ul>

The VTK XML files store geometry data (points, lines, polygons, polyhedron) as well user-defined arrays
containing integer and float data

<ul style="list-style-type:disc;">
<li> Integer arrays - used to associate values (e.g. node and element IDs) with geometric entities </i>
<li> Float arrays - used to initialize state variables and set values for certain types of boundary conditions </i>
</ul>

The VTK XML file formats used are
<ul style="list-style-type:disc;">
<li> <strong>VTU</strong> format - Unstructured grid data used to store problem domains, fiber directions, and initial values. Files use a <strong>.vtu</strong> file extension. </li> 
<li> <strong>VTP</strong> format - Polygonal data used to store boundary surfaces (faces) and data. Files use a <strong>.vtp</strong> file extension.</li> 
</ul> 

A finite element is represented in VTK using the vtkCell C++ class. A large set of linear  
and higher-order element types are supported.

User-defined arrays can have arbitrary names. They can be stored as 
<ul style="list-style-type:disc;">
<li> CellData - Values for each element in a mesh </li> 
<li> PointData - Values for each node in a mesh </li> 
</ul>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #e6e600; border-left: 6px solid #e6e600">
VTK software is used to visualize data using C++ and Python languages which index arrays starting from 0.
The element connectivity array accesses the <strong>Points</strong> array using 0-based indexing (indices range from 0 to NumberOfPoints-1).
</div>

