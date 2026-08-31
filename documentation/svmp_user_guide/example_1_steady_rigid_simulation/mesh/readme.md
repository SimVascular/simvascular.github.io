

### Loading Mesh and Geometry into svMultiPhysics

The first step to running an *svMultiPhysics* simulation is to establish your geometry and mesh. You will need a volumetric mesh file (typically .vtu format) that contains the coordinates of all the nodes in the mesh as well as the element connectivity. You will also need separate mesh files for each of the exterior surfaces (typically .vtp format) that will be used to identify regions to apply boundary conditions. In the .xml input file, reading the mesh takes place in the `<Add_mesh>` section:

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

        <Domain>0</Domain>

    </Add_mesh>

First, the .vtu file for the volumetric mesh is loaded using the `<Mesh_file_path>` command. This loads in all of the nodal coordinates and connectivities for the mesh nodes and elements. Next, each of the exterior face meshes are loaded with `<Add_face>` commands. These are used to label certain exterior surfaces on the mesh so that we can apply different boundary conditions on them later on. Notice how each of these commands references a specific file inside a folder called “mesh-complete”. When running *svMultiPhysics*, it is important that the relative path to the mesh files stays consistent with how they are defined in the .xml file. In other words, if you wish to run the simulation from a different directory on your system, you must move BOTH the .xml file and the folder with all required input files.

The last command in this section labels this section of the domain as “0”. For a pure fluids simulation, there is only one domain where the fluid resides. In multi-physics problems that have different domains for the solid and fluid, you can label different domains accordingly.

At this point, we pause to discuss units. The unit system used by *svMultiPhysics* is determined by the units used when creating the geometric model and mesh. To be more specific, the units of the coordinates of all of the nodes in the mesh determine what units you should use for the rest of the parameters in *svMultiPhysics*. For example, if your model and mesh were created using centimeters as the unit of measure, then you should use CGS (centimeters-grams-seconds) for all other parameters in *svMultiPhysics*.