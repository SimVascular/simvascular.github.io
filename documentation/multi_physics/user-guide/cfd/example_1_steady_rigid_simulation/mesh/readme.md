
### Finite element mesh files

The finite element mesh used for the simulation comprises 
- volume mesh defining the 3D computational domain: tetraheda stored in a VTK VTU file
- surface meshes for each 2D boundary surface: triangles stored in a VTK VTP file

These files are stored under the **demomesh-mesh-complete** folder that is typically created by the SimVascular Simulation Tool with the 
following organization

<img src="/documentation/multi_physics/user-guide/cfd/img/svmp_mesh_files.png">

The <b>\<Add_mesh\></b> parameter section defines the name associated with each mesh file and the path to the file

    <Add_mesh name="demomesh-mesh-complete">

        <Mesh_file_path>demomesh-mesh-complete/mesh-complete.mesh.vtu</Mesh_file_path>

        <Add_face name="cap_aorta">
            <Face_file_path>demomesh-mesh-complete/mesh-surfaces/cap_aorta.vtp</Face_file_path>
        </Add_face>

        <Add_face name="cap_aorta_2">
            <Face_file_path>demomesh-mesh-complete/mesh-surfaces/cap_aorta_2.vtp</Face_file_path>
        </Add_face>

        <Add_face name="cap_right_iliac">
            <Face_file_path>demomesh-mesh-complete/mesh-surfaces/cap_right_iliac.vtp</Face_file_path>
        </Add_face>

        <Add_face name="wall_aorta">
            <Face_file_path>demomesh-mesh-complete/mesh-surfaces/wall_aorta.vtp</Face_file_path>
        </Add_face>

        <Add_face name="wall_right_iliac">
            <Face_file_path>demomesh-mesh-complete/mesh-surfaces/wall_right_iliac.vtp</Face_file_path>
        </Add_face>

    </Add_mesh>

The <b>\<Mesh_file_path\></b> parameter sets the path to the volume mesh file used to define the 3D computational domain. 
A series of <b>\<Add_face\></b> parameters are then used to set names of the 2D boundary surfaces used for boundary conditions. 
The <b>\<Face_file_path\></b> parameter sets the location of the mesh files. 

<p>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #0000e6">
The svMultiPhysics XML file is used to just set parameter values; no action is performed when a parameter is read.
Therefore the XML file is completely read in before there is any attempt to read in mesh files.
</div>
</p>


