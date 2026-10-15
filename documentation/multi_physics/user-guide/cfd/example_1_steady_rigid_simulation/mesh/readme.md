
### Finite Element Mesh Files

The finite element mesh used for the simulation comprises:

- a volume mesh of tetrahedral elements defining the three-dimensional computational domain, stored in a VTK VTU file
- surface meshes of triangular elements defining the two-dimensional boundary surfaces, stored in VTK VTP files

The following directory structure shows the mesh files referenced by this example's `solver.xml` input file:

```text
demomesh-mesh-complete/
├── mesh-complete.mesh.vtu
└── mesh-surfaces/
    ├── cap_aorta.vtp
    ├── cap_aorta_2.vtp
    ├── cap_right_iliac.vtp
    ├── wall_aorta.vtp
    └── wall_right_iliac.vtp
```

The `<Add_mesh>` section in `solver.xml` associates a mesh name with its volume-mesh file and identifies the boundary surfaces and their surface-mesh files.

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

The `<Mesh_file_path>` parameter sets the path to the volume mesh file used to define the 3D computational domain. A series of `<Add_face>` parameters are then used to assign names to the 2D boundary surfaces used for boundary conditions. The `<Face_file_path>` parameter specifies the path to each surface mesh file.

<p>
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 6px solid #0000e6">
The svMultiPhysics XML file defines parameter values; no action is performed as individual parameters are read. The entire XML file is read before svMultiPhysics attempts to load the mesh files.
</div>
</p>


