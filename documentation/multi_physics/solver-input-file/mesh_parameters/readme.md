<!-- =============================================================== -->
<!-- ========================= Mesh Section ======================== -->
<!-- =============================================================== -->

<h2 id="mesh_parameters"> Mesh Section </h2>
A <i>Mesh Section</i> of the solver parameters input file is primarily used to identify the finite element 
mesh files used in a simulation. The <strong>Add_mesh</strong> keyword defines the volumetric and surfaces meshes 
used in the simulation. 

A <i>Mesh Section</i> is organized as follows 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; 
<br> <br>
&lt;<strong>Add_face</strong> name=<i>mesh_face_1_name</i>&gt;<br>
[Face 1 parameters]
<br>
&lt;<strong>Add_face</strong>&gt; 

&lt;<strong>Add_face</strong> name=<i>mesh_face_2_name</i>&gt;<br>
[Face 2 parameters]
<br>
&lt;<strong>Add_face</strong>&gt; 
<br>
<strong>...</strong><br>
&lt;<strong>Add_face</strong> name=<i>mesh_face_<i>N</i>_name</i>&gt;<br>
[Face <i>N</i> parameters]
<br>
&lt;<strong>Add_face</strong>&gt; 
<br>

<a href="#mesh_parameters">

[<a href="#mesh_parameters"> Mesh Parameters </a> ]

&lt;<strong>/Add_mesh</strong> &gt;
</div>

The &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameter adds a volumetric mesh named <i>mesh_name</i> 
to the simulation. Multiple &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameters can be given
within a solver parameters input file. 

The &lt;<strong>Add_face</strong> name=<i>mesh_face_name</i>&gt; parameters subsection under the 
&lt;<strong>Add_mesh</strong>&gt; parameter associates the surface mesh named <i>mesh_face_name</i>
with the volumetric mesh. A surface mesh, referred to as a <i>face</i>, is used to apply boundary conditions.


<!-- ---------------------------------------- -->
<!-- ---------- General Parameters ---------- -->
<!-- ---------------------------------------- -->

<h3 id="add_mesh_parameters"> Mesh Parameters</h3>
<div class="bc_param_div">
<strong>&lt;Mesh_file_path&gt;</strong> <i>string</i> <nobr>
<strong>&lt;/Mesh_file_path&gt;</strong>
</nobr><br>
The path to a VTK VTU file defining a finite element volume mesh in the simulation.
<br>
<strong>&lt;Mesh_domain&gt;</strong> <i>integer</i> <nobr>
<strong>&lt;/Mesh_domain&gt;</strong>
</nobr><br>
The integer ID used to identify a domain in the simulation.
<br>
<section id="mesh_params_Domain_file_path">
<strong>&lt;Domain_file_path&gt;</strong> <i>string</i> <nobr>
<strong>&lt;/Domain_file_path&gt;</strong>
</nobr><br>
Creates IDs for multiple domains from a VTK VTU file. Domain IDs are assumed to be stored in a VTK Cell data array named DOMAIN_ID.
<br>
<strong>&lt;Mesh_scale_factor&gt;</strong> <i>real</i> [1.0] <nobr>
<strong>&lt;/Mesh_scale_factor&gt;</strong>
</nobr><br>
The value used to scale mesh nodal coordinates. 
<br>
<section id="mesh_params_Initial_pressures_file_path">
<strong>&lt;Initial_pressures_file_path&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Initial_pressures_file_path&gt;</strong>
</nobr><br>
The name of the VTK VTU file used to initialize simulation pressure values on a fluid domain. See <a href="#data_file_formats_initial_condition"> Initial Condition Data</a>.
<br>
<section id="mesh_params_Initial_velocities_file_path">
<strong>&lt;Initial_velocities_file_path&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Initial_velocities_file_path&gt;</strong>
</nobr><br>
The name of the VTK VTU file used to initialize simulation velocity values on a fluid domain. See <a href="#data_file_formats_initial_condition"> Initial Condition Data</a>.
<br>
<section id="mesh_params_Initial_displacements_file_path">
<strong>&lt;Initial_displacements_file_path&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Initial_displacements_file_path&gt;</strong>
</nobr><br>
The name of the VTK VTU file used to initialize simulation displacement values on a solid domain. See <a href="#data_file_formats_initial_condition"> Initial Condition Data</a>.
<br>
<section id="mesh_params_Prestress_file_path">
<strong>&lt;Prestress_file_path&gt;</strong> <i>string [none] </i> <nobr>
<strong>&lt;/Prestress_file_path&gt;</strong>
</nobr><br>
The name of the VTK VTU file used to initialize simulation stress values on a solid domain. See <a href="#data_file_formats_initial_condition"> Initial Condition Data</a>.
<br>
<section id="mesh_params_Fiber_direction_constant">
<strong>&lt;Fiber_direction_constant&gt;</strong> <i>vector [none] (repeatable)</i> <nobr>
<strong>&lt;/Fiber_direction_constant&gt;</strong>
</nobr><br>
Defines a unit direction that is constant over the mesh. Repeat for each direction family.
<br>
<section id="mesh_params_Fiber_direction_from_file_cells">
<strong>&lt;Fiber_direction_from_file_cells&gt;</strong> <i>string [none] (repeatable)</i> <nobr>
<strong>&lt;/Fiber_direction_from_file_cells&gt;</strong>
</nobr><br>
The name of a VTK VTU file containing one unit direction in a CellData array named
<strong>FIB_DIR</strong>. Repeat for each direction family.
<br>
<section id="mesh_params_Fiber_direction_from_file_points">
<strong>&lt;Fiber_direction_from_file_points&gt;</strong> <i>string [none] (repeatable)</i> <nobr>
<strong>&lt;/Fiber_direction_from_file_points&gt;</strong>
</nobr><br>
The name of a VTK VTU file containing one unit direction in a PointData array named
<strong>FIB_DIR</strong>. Repeat for each direction family.
<br>
The three fiber input types cannot be mixed.
<br>
<strong>&lt;Set_mesh_as_fibers&gt;</strong> <i>boolean [false] </i> <nobr>
<strong>&lt;/Set_mesh_as_fibers&gt;</strong>
</nobr><br>
If <i>true</i> then the mesh given in the <strong>Mesh_file_path</strong> keywork is treated as a mesh of one-dimensional elements in 3D.
The mesh typically defines a network of Purkinje fibers used in cardiac electrophysiology simulations.
<br>
<strong>&lt;Set_mesh_as_shell&gt;</strong> <i>boolean [false] </i> <nobr>
<strong>&lt;/Set_mesh_as_shell&gt;</strong>
</nobr><br>
If <i>true</i> then the mesh given in the <strong>Mesh_file_path</strong> keywork is treated as a mesh of shell elements. The mesh can then be used for solving the <strong>shell</strong> equation type. A shell mesh is also needed for initializing a <strong>CMM</strong> equation using a prestress or displacements.
<br>
<strong>&lt;quadrature_modifier_TET4&gt;</strong> <i>real</i> [0.5854] <nobr>
<strong>&lt;/quadrature_modifier_TET4&gt;</strong>
</nobr><br>
The quadrature used for tetrahedral elements.
<br>
</div>

<!-- ------------------------------------- -->
<!-- ---------- Face Parameters ---------- -->
<!-- ------------------------------------- -->

<h3 id="add_face_parameters"> Add_Face Parameters</h3>
<div class="bc_param_div">
<strong>&lt;Add_face&gt;</strong><br> 
<strong>&lt;Face_file_path&gt;</strong> <i>string</i> <nobr>
<strong>&lt;/Face_file_path&gt;</strong>
</nobr><br>
The path to a VTK VTP file defining a finite element surface mesh for a face in the simulation.
<br>
<strong>&lt;Quadrature_modifier_TRI3&gt;</strong> <i>real</i> [0.6666] <nobr>
<strong>&lt;/Quadrature_modifier_TRI3&gt;</strong>
</nobr><br>
The quadrature used for triangle elements.
<br>
<strong>&lt;/Add_face&gt;</strong>
</div>

