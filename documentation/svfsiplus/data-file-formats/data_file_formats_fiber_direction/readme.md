
<h2 id="data_file_formats_fiber_direction"> Fiber and Sheet Direction Data</h2>
A fiber and sheet direction data file is used to define a local orthonormal coordinate system 
for each element in a finite element volume mesh representing cardiac muscle.
The data file is a <a href="#appendix_vtk_file_format"> VTK VTU </a> format file containing a CellData 
array named </strong>FIB_DIR</strong>.

The data file is set using the solver input file 
<a href="#mesh_params_Fiber_direction_file_path"> Fiber_direction_file_path </a> keyword.

