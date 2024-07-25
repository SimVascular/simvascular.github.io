
<h2 id="data_file_formats_domain"> Domain IDs Data </h2>
This data file contains integer IDs used to identify the different domains contained with a finite 
element volume mesh. The file can be 
<ul style="list-style-type:disc">
<li> <a href="#data_file_formats_domain_text"> ASCII text </a> file </li> 
<li> <a href="#data_file_formats_domain_vtk"> VTK VTU </a> file </li> 
</ul>

A domain IDs file is set using the solver input file <a href="#mesh_params_Domain_file_path"> Domain_file_path </a> keyword.

<h3 id="data_file_formats_domain_text"> ASCII Text File Format </h3>
The data file contains a list of integer IDs representing the domain ID for each element in the finite 
element volume mesh. The number of IDs in the file should thus be equal to the number of elements in 
finite element volume mesh.

<h3 id="data_file_formats_domain_vtk"> VTK VTU File Format </h3>
The data file is a <a href="#appendix_vtk_file_format"> VTK VTU </a> format file contain a CellData array 
named <strong>DOMAIN_ID</strong> containing the integer IDs representing the domain ID for each element in the finite element volume mesh.


