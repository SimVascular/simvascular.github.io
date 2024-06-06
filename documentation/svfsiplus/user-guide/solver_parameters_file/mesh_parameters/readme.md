<!-- =============================================================== -->
<!-- ========================= Mesh Parameters ===================== -->
<!-- =============================================================== -->

<h4 id="mesh_parameters"> Mesh Parameters </h4>
The Mesh Parameters section of the solver parameters input file is primarily used to identify the finite element 
mesh files used in a simulation.

The &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameter adds a volumetric mesh named <i>mesh_name</i> 
to the simulation. Multiple &lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt; parameters can be given
within a solver parameters input file. 

The &lt;<strong>Add_face</strong> name=<i>mesh_face_name</i>&gt; parameters specified under the 
&lt;<strong>Add_mesh</strong>&gt; parameter associates the surface named <i>mesh_face_name</i>
with the volumetric mesh.

<!-- -------------------------------- -->
<!-- ---------- Parameters ---------- -->
<!-- -------------------------------- -->

<h5>Parameters</h5>

<pre>

&lt;<strong>Add_mesh</strong> name=<i>mesh_name</i>&gt;
<nobr>
&nbsp;&lt;<a href="#Mesh_file_path">Mesh_file_path&gt;</a> <i>string</i>
&nbsp;&lt;<a href="#Mesh_file_path">/Mesh_file_path&gt;</a>
<br><br>

&nbsp;&lt;<strong>Add_face</strong> name=<i>mesh_face_name</i>&gt;<br>
&nbsp;&nbsp;&lt;<a href="#Face_file_path">Face_file_path&gt;</a> <i>string</i>
&lt;<a href="#Face_file_path">/Face_file_path&gt;</a>
<br>
&nbsp;&lt;<strong>/Add_face</strong>&gt;
<br><br>

<nobr>
&nbsp;&lt;<a href="#Mesh_domain">Domain&gt;</a> <i>integer</i>
&lt;<a href="#Mesh_domain">/Domain&gt;</a>
<br>
<nobr>
&nbsp;&lt;<a href="#Domain_file_path">Domain_file_path&gt;</a> <i>string</i>
&lt;<a href="#Domain_file_path">/Domain_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Mesh_scale_factor">Mesh_scale_factor&gt;</a> <i>real</i>
&lt;<a href="#Mesh_scale_factor">/Mesh_scale_facto&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Initial_pressures_file_path">Initial_pressures_file_path&gt;</a> <i>string</i>
&lt;<a href="#Initial_pressures_file_path">/Initial_pressures_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Initial_velocities_file_path">Initial_velocities_file_path&gt;</a> <i>string</i>
&lt;<a href="#Initial_velocities_file_path">/Initial_velocities_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#initial_displacements_file_path">Initial_displacements_file_path&gt;</a> <i>string</i>
&lt;<a href="#initial_displacements_file_path">/Initial_displacements_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Prestress_file_path">Prestress_file_path&gt;</a> <i>string</i>
&lt;<a href="#Prestress_file_path">/Prestress_file_path&gt;</a>
<br>

<nobr>
&nbsp;&lt;<a href="#Fiber_direction_file_path">Fiber_direction_file_path&gt;</a> <i>string</i>
&lt;<a href="#Fiber_direction_file_path">/Fiber_direction_file_path&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Set_mesh_as_fibers">Set_mesh_as_fibers&gt;</a> <i>boolean</i>
&lt;<a href="#Set_mesh_as_fibers">/Set_mesh_as_fibers&gt;</a>
<br><br>

<nobr>
&nbsp;&lt;<a href="#Set_mesh_as_shell">Set_mesh_as_shell&gt;</a> <i>boolean</i>
&lt;<a href="#Set_mesh_as_shell">/Set_mesh_as_shell&gt;</a>
<br><br>

&lt;<strong>/Add_mesh</strong>&gt;
</pre>

<!-- --------------------------------- -->
<!-- ---------- Description ---------- -->
<!-- --------------------------------- -->

<h5> Description </h5>

<pre>
<section id="Domain_file_path"> Domain_file_path (optional) - Load IDs for multiple domains from a VTK VTU file. Domain IDs are assumed to be stored in a VTK Cell data array named DOMAIN_ID.

<section id="Face_file_path"> Face_file_path - The path to a VTK VTP file defining a finite element surface mesh for a face in the simulation.

<section id="Fiber_direction_file_path"> Fiber_direction_file_path (optional) - 

<section id="Initial_displacements_file_path"> Initial_displacements_file_path (optional) - 

<section id="Initial_pressures_file_path"> Initial_pressures_file_path (optional) - 

<section id="Initial_velocities_file_path"> initial_velocities_file_path (optional) - 

<section id="Mesh_domain"> Domain (optional) - 

<section id="Mesh_file_path"> Mesh_file_path - The path to a VTK VTU file defining a finite element volume mesh in the simulation.

<section id="Mesh_scale_factor"> Mesh_scale_factor - optional, default=1.0

<section id="Prestress_file_path"> Prestress_file_path - optional, default=none

<section id="Set_mesh_as_fibers"> Set_mesh_as_fibers - optional, default=false

<section id="Set_mesh_as_shell"> Set_mesh_as_shell - optional, default=false

</pre>
