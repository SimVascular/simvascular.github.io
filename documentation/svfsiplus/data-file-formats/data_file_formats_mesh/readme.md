
<h2 id="data_file_formats_mesh"> Finite Element Mesh Data </h1>
Finite element mesh data is stored in the <a href="#appendix_vtk_file_format"> Visualization Toolkit (VTK) </a> file format. Finite element mesh files are typically created using the SimVascular <a href="quickguide.html#"> SV Meshing Tool </a>. 
<br>
<h3 id="data_file_formats_mesh_volume"> Finite Element Volume Mesh </h3>
A finite element volume mesh is stored in a VTK VTU-format file using the <strong>UnstructuredGrid</strong> 
data type. The file contains the following mesh data
<ul style="list-style-type:disc;">
<li> number of nodes - NumberOfPoints </li>
<li> nodal coordinates - DataArray type="Float32" Name="Points" </li>
<li> number of elements -  NumberOfCells </i>
<li> element connectivity -  DataArray type="Int64" Name="connectivity" </i>
<li> user-defined arrays - CellData (element) or PointData (node) data specific to a SimVascular application </li> 
  <ul style="list-style-type:square">
  <li> GlobalElementID - CellData </li> 
  <li> GlobalNodeID - PointData </li> 
  <li> ModelRegionID - CellData </li> 
  </ul>
</ul>

A finite element volume mesh file is set using the solver input file <a href="#add_mesh_parameters"> Mesh_file_path </a> keyword.

Example: A finite element volume mesh comprising 8561 nodes and 45723 elements
<pre>
&lt;?xml version="1.0"?>
&lt;VTKFile type="UnstructuredGrid" version="0.1" byte_order="LittleEndian" header_type="UInt32" compressor="vtkZLibDataCompressor">
  &lt;UnstructuredGrid>
    &lt;Piece NumberOfPoints="8561"                 NumberOfCells="45723"               >
      &lt;PointData>
        &lt;DataArray type="Int32" Name="GlobalNodeID" format="appended" RangeMin="1"                    RangeMax="8561"                 offset="0"                   />
      &lt;/PointData>
      &lt;CellData Scalars="ModelRegionID">
        &lt;DataArray type="Int32" Name="ModelRegionID" format="appended" RangeMin="1"                    RangeMax="1"                    offset="15964"               />
        &lt;DataArray type="Int32" Name="GlobalElementID" format="appended" RangeMin="1"                    RangeMax="45723"                offset="16444"               />
      &lt;/CellData>
      &lt;Points>
        &lt;DataArray type="Float32" Name="Points" NumberOfComponents="3" format="appended" RangeMin="0.12837002719"        RangeMax="30.066622254"         offset="100980"              />
      &lt;/Points>
      &lt;Cells>
        &lt;DataArray type="Int64" Name="connectivity" format="appended" RangeMin=""                     RangeMax=""                     offset="227180"              />
        &lt;DataArray type="Int64" Name="offsets" format="appended" RangeMin=""                     RangeMax=""                     offset="788628"              />
        &lt;DataArray type="UInt8" Name="types" format="appended" RangeMin=""                     RangeMax=""                     offset="868152"              />
      &lt;/Cells>
    &lt;/Piece>
  &lt;/UnstructuredGrid>
[COMPRESSED DATA]
</pre>

The nodes and elements in the finite element mesh are identified by a unique ID in the 
<strong>GlobalNodeID</strong> and <strong>GlobalElementID</strong> arrays, respectively.

<br>
<h3 id="data_file_formats_mesh_volume"> Finite Element Boundary Surface Mesh </h3>
A finite element boundary surface mesh is stored in a VTK VTP-format file using the <strong>PolyData</strong>
data type. The file contains the following mesh data
<ul style="list-style-type:disc;">
<li> number of nodes - NumberOfPoints </li>
<li> nodal coordinates - DataArray type="Float32" Name="Points" </li>
<li> number of face elements -  NumberOfCells </i>
<li> element face connectivity -  DataArray type="Int64" Name="connectivity" </i>
<li> user-defined arrays - CellData (element) or PointData (node) data specific to a SimVascular application </li>
  <ul style="list-style-type:square">
  <li> GlobalElementID - CellData </li>
  <li> GlobalNodeID - PointData </li>
  <li> ModelFaceID - CellData </li>
  </ul>
</ul>

A finite element boundary surface mesh file is set using the solver input file <a href="#add_face_parameters"> Face_file_path </a> keyword. 

Example: A finite element boundary surface mesh comprising 2647 nodes and 5290 elements
<pre>
&lt;?xml version="1.0"?>
&lt;VTKFile type="PolyData" version="0.1" byte_order="LittleEndian" header_type="UInt32" compressor="vtkZLibDataCompressor">
  &lt;PolyData>
    &lt;Piece NumberOfPoints="2647"                 NumberOfVerts="0"                    NumberOfLines="0"                    NumberOfStrips="0"                    NumberOfPolys="5290"                >
      &lt;PointData Scalars="GlobalNodeID">
        &lt;DataArray type="Int32" Name="GlobalNodeID" format="appended" RangeMin="1"                    RangeMax="2647"                 offset="0"                   />
      &lt;/PointData>
      &lt;CellData Scalars="ModelFaceID">
        &lt;DataArray type="Int32" Name="GlobalElementID" format="appended" RangeMin="2"                    RangeMax="45702"                offset="4964"                />
        &lt;DataArray type="Int32" Name="ModelFaceID" format="appended" RangeMin="1"                    RangeMax="3"                    offset="23712"               />
      &lt;/CellData>
      &lt;Points>
        &lt;DataArray type="Float32" Name="Points" NumberOfComponents="3" format="appended" RangeMin="0.12837002719"        RangeMax="30.066622254"         offset="23932"               >
        &lt;/DataArray>
      &lt;/Points>
      &lt;Verts>
        &lt;DataArray type="Int64" Name="connectivity" format="appended" RangeMin=""                     RangeMax=""                     offset="62272"               />
        &lt;DataArray type="Int64" Name="offsets" format="appended" RangeMin=""                     RangeMax=""                     offset="62288"               />
      &lt;/Verts>
      &lt;Lines>
        &lt;DataArray type="Int64" Name="connectivity" format="appended" RangeMin=""                     RangeMax=""                     offset="62304"               />
        &lt;DataArray type="Int64" Name="offsets" format="appended" RangeMin=""                     RangeMax=""                     offset="62320"               />
      &lt;/Lines>
      &lt;Strips>
        &lt;DataArray type="Int64" Name="connectivity" format="appended" RangeMin=""                     RangeMax=""                     offset="62336"               />
        &lt;DataArray type="Int64" Name="offsets" format="appended" RangeMin=""                     RangeMax=""                     offset="62352"               />
      &lt;/Strips>
      &lt;Polys>
        &lt;DataArray type="Int64" Name="connectivity" format="appended" RangeMin=""                     RangeMax=""                     offset="62368"               />
        &lt;DataArray type="Int64" Name="offsets" format="appended" RangeMin=""                     RangeMax=""                     offset="99592"               />
      &lt;/Polys>
    &lt;/Piece>
  &lt;/PolyData>
  &lt;AppendedData encoding="base64">
[COMPRESSED DATA]
</pre>

The node IDs contained in the <strong>GlobalNodeID</strong> array identify the nodes stored in the
boundary surface VTP with the nodes in the finite element volume mesh.

The element IDs contained in the <strong>GlobalElementID</strong> array identify the element in the
finite element volume mesh that each polygon of the face belongs to. 



