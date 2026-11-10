
<h2 id="data_file_formats_fiber_direction"> Fiber and Sheet Direction Data</h2>

Fiber directions define material directions used by anisotropic constitutive models and cardiac
electrophysiology. Use one fiber input type for each mesh:

<ul style="list-style-type:disc;">
  <li><a href="#mesh_params_Fiber_direction_constant"><strong>Fiber_direction_constant</strong></a> for directions that are constant over the mesh.</li>
  <li><a href="#mesh_params_Fiber_direction_from_file_cells"><strong>Fiber_direction_from_file_cells</strong></a> for element-associated directions.</li>
  <li><a href="#mesh_params_Fiber_direction_from_file_points"><strong>Fiber_direction_from_file_points</strong></a> for node-associated directions.</li>
</ul>

Each keyword occurrence defines one direction family. Directions must be unit vectors and are
ordered as fiber, sheet, and sheet-normal when used as a material basis.

Constant directions are specified as vectors with one component per spatial dimension, for example
<strong>(1.0, 0.0, 0.0)</strong> in 3D.

File inputs use <a href="#appendix_vtk_file_format">VTK VTU</a> files containing a vector array
named <strong>FIB_DIR</strong>. The array must be in <strong>CellData</strong> for
<strong>Fiber_direction_from_file_cells</strong> and in <strong>PointData</strong> for
<strong>Fiber_direction_from_file_points</strong>. Point data is interpolated using fiber dyads so
opposite directions do not cancel.

Models requiring an orthonormal basis need $nsd-1$ or $nsd$ mutually orthogonal directions. The
solver completes the final direction when $nsd-1$ directions are supplied. Remeshing supports only
constant fiber directions.

