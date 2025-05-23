## Input file for fluid simulations

In this example, the abdominal aortic aneurysm (AAA) model is used as the fluid domain to perform the hemodynamics simulation, as shown in the figure below. 

<br>
<figure>
  <img src="/documentation/multi_physics/user-guide/hemodynamics/imgs/AAA_geometry.png" style="float: left; width: 20%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<br>

An XML input file is needed to run the simulation. The setup of the input file is introduced in the following tutorial.

The mesh files, including the lumen of the AAA, inlet and outlet surfaces, and wall surfaces, are first added to the input file to specify the computational domain.

```
<Add_mesh name="lumen" > 
  <Mesh_file_path> mesh/lumen-mesh-complete/mesh-complete.mesh.vtu  </Mesh_file_path>
  <Add_face name="lumen_inlet">
      <Face_file_path> mesh/lumen-mesh-complete/mesh-surfaces/Inlet.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_outlet1">
      <Face_file_path> mesh/lumen-mesh-complete/mesh-surfaces/Outlet_1.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_outlet2">
      <Face_file_path> mesh/lumen-mesh-complete/mesh-surfaces/Outlet_2.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_wall">
      <Face_file_path> mesh/lumen-mesh-complete/mesh-surfaces/lumen_wall.vtp </Face_file_path>
  </Add_face>
  <Domain> 0 </Domain>
</Add_mesh>

```

In the equation section, the fluid equation is employed for computational hemodynamics to solve the Navier-Stokes equations. The setup of equation parameters can be found in the equation section. In this example, the Newtonian fluid with a constant viscosity of 0.04 is used to model the blood. Multiple quantities, including velocity, pressure, traction, etc, are contained in the output section.

```
<Add_equation type="fluid" > 
   <Coupled> true </Coupled>
   <Min_iterations> 3 </Min_iterations>  
   <Max_iterations> 5</Max_iterations> 
   <Tolerance> 1e-11 </Tolerance> 
   <Backflow_stabilization_coefficient> 0.2 </Backflow_stabilization_coefficient> 

   <Density> 1.06 </Density> 
   <Viscosity model="Constant" >
     <Value> 0.04 </Value>
   </Viscosity>

   <Output type="Spatial" >
      <Velocity> true </Velocity>
      <Pressure> true </Pressure>
      <Traction> true </Traction>
      <Vorticity> true</Vorticity>
      <Divergence> true</Divergence>
      <WSS> true </WSS>
   </Output>
```

The Navier-Stokes linear solver based on the partitioned method for fluid equations is selected for this example, with both the linear algebra type and preconditioner specified as “fsils”. A comprehensive introduction of the parameters in the linear solver can be found in the linear solver subsection.

```
   <LS type="NS" >
      <Linear_algebra type="fsils" >
         <Preconditioner> fsils </Preconditioner>
      </Linear_algebra>
      <Max_iterations> 15 </Max_iterations>
      <NS_GM_max_iterations> 10 </NS_GM_max_iterations>
      <NS_CG_max_iterations> 300 </NS_CG_max_iterations>
      <Tolerance> 1e-3 </Tolerance>
      <NS_GM_tolerance> 1e-3 </NS_GM_tolerance>
      <NS_CG_tolerance> 1e-3 </NS_CG_tolerance>
      <Absolute_tolerance> 1e-17 </Absolute_tolerance>
      <Krylov_space_dimension> 250 </Krylov_space_dimension>
   </LS>
```

Notably, boundary conditions need to be defined on the surfaces of the AAA mesh. Dirichlet boundary conditions are imposed on the lumen inlet and wall surface, and Neumann boundary conditions are specified for the lumen outlets.

```
   <Add_BC name="lumen_inlet" > 
      <Type> Dir </Type> 
      <Value> -62.79 </Value> 
   </Add_BC> 

   <Add_BC name="lumen_outlet1" > 
      <Type> Neu </Type>
      <Time_dependence> Resistance </Time_dependence>
      <Value> 381.8 </Value>
   </Add_BC>

   <Add_BC name="lumen_outlet2" > 
      <Type> Neu </Type>
      <Time_dependence> Resistance </Time_dependence>
      <Value> 381.8 </Value>
   </Add_BC>

   <Add_BC name="lumen_wall" > 
      <Type> Dir </Type> 
      <Time_dependence> Steady </Time_dependence> 
      <Value> 0.0 </Value> 
   </Add_BC> 

</Add_equation>
```

## Prescribed Wall Motion

In this section, we discuss how to set up a simulation with prescribed wall motion. For example, one may wish to extract the motion of the walls of the ventricle from CT/MR scans, and reconstruct the flow fields by solving the Navier-Stokes equations. This is accomplished by computing the displacement trajectory of the endocardial surface and prescribed it as the boundary condition. This must be done offline by the user for their specific problem. This is typically done for a small subset of the total times, and displacements between the specified times are prescribed by using a piece-wise linear interpolant. Some researchers refer to this method as the one-way coupled fluid-structure interaction modeling. But since only fluid equation is solved here, we categorize it as flow simulation. 


<h3> Wall motion </h3>

There are many established pipelines to obtain the wall motion from CT/MR scans<a href="#ref-3">[3-5]</a>. Here, we would recommend using the [cardiac geometric modeling tool](simcardio.html#automatic-cardiac-modeling) developed in the **SimCardio** project.

For the wall motion file, the file format is as follows. First, specify the dimension of the problem (three), the number of times at which to specify the displacements, and the number of vertices in the moving wall mesh. Then specify the times at which the displacements occur. Next, for each vertex, specify its index and then the prescribed displacements for each time. Note that in the case of multiple moving faces, these numbers may not start at one for any given face, as indexing is global. If a vertex is on an edge between two faces, it should have the same index and displacement fields, specified redundantly in both files.

```
Dimension n_times m_vertices
t_1
t_2
...
t_n
vertex_1_index
displacement_1_vertex_1
displacement_2_vertex_1
...
displacement_n_vertex_1
vertex_2_index
displacement_1_vertex_2
displacement_2_vertex_2
...
displacement_n_vertex_2
...
```

For example,

```
3   21   14907
0.000000
3.800E-2
7.600E-2
1.140E-1
1.520E-1
1.900E-1
2.280E-1
2.660E-1
3.040E-1
3.419E-1
3.800E-1
4.180E-1
4.560E-1
4.940E-1
5.320E-1
5.699E-1
6.080E-1
6.460E-1
6.839E-1
7.220E-1
7.600E-1
1
0.000000   0.000000   0.000000
2.800E-1   -8.99E-2   -1.00E-2
8.799E-1   -2.09E-1   -8.10E-1
1.339999   -1.59E-1   -1.43000
1.509999   7.000E-2   -1.59000
1.310000   3.100E-1   -1.52000
1.069999   5.100E-1   -1.41000
1.009999   6.000E-1   -1.28000
9.699E-1   3.600E-1   -1.10000
1.049999   -1.09E-1   -8.80E-1
1.169999   -6.69E-1   -7.60E-1
1.169999   -1.17999   -7.90E-1
1.129999   -1.31999   -9.69E-1
1.049999   -1.25999   -1.34000
1.000000   -9.39E-1   -1.64000
9.899E-1   -4.29E-1   -1.96000
1.000000   3.000E-2   -2.15000
9.299E-1   3.600E-1   -1.90000
6.599E-1   4.200E-1   -1.14000
1.999E-1   1.500E-1   -3.50E-1
0.000000   0.000000   0.000000
2
0.000000   0.000000   0.000000
2.700E-1   -8.99E-2   0.000000
8.500E-1   -1.99E-1   -6.80E-1
1.280000   -1.59E-1   -1.16999
1.430000   5.000E-2   -1.28000
1.230000   2.599E-1   -1.19999
1.010000   4.499E-1   -1.09000
9.500E-1   5.099E-1   -9.69E-1
9.100E-1   2.400E-1   -8.19E-1
1.000000   -2.59E-1   -6.70E-1
1.120000   -8.29E-1   -5.69E-1
1.130000   -1.31999   -5.89E-1
1.090000   -1.44999   -7.50E-1
1.000000   -1.36000   -1.06999
9.400E-1   -1.00999   -1.31000
9.300E-1   -4.69E-1   -1.56999
9.500E-1   0.000000   -1.72999
8.900E-1   3.299E-1   -1.53999
6.200E-1   3.999E-1   -9.39E-1
1.900E-1   1.399E-1   -2.90E-1
0.000000   0.000000   0.000000
...
```

Note that in this example, we wish the mesh motion to be periodic in time, and thus the final displacement is zero.

<!-- <h3> Input file </h3>

To set up the input file, set the equation to be FSI to allow the mesh to move under the ALE framework, even though there is not necessarily a structure. For the moving wall, add the motion file when specifying the wall boundary condition, and turn on the option “Impose on state variable integral”.

```
    Add BC: moving_wall {
        Type: Dirichlet
        Time dependence: General
        Temporal and spatial values file path: wall_motion.dat
        Profile: Flat
        Zero out perimeter: 1
        Impose flux: 0
        #---------------- Add this line to the moving boundary face -----------
        Impose on state variable integral: 1
    }
```

It is recommended to include remeshing if the wall motion is such that the domain undergoes large changes. For example, set

```
    Remesher: Tetgen {
        Max edge size: lumen { val: 3.0 }
        Min dihedral angle: 10.0
        Max radius ratio: 1.1
        Remesh frequency: 100
        Frequency for copying data: 1
    }
```

The max edge size should be consistent with the original mesh size.

Under the mesh equation, we similarly add the motion file.

```
    Add equation: mesh {
        Coupled: 1
        Min iterations: 1
        Max iterations: 8
        Tolerance: 1e-3
        Residual dB reduction: -20
        Poisson ratio: 0
        Output: Spatial {
            Displacement: t
        }

        #---------- Add the BC for the moving_wall to the mesh equation as well ------
        Add BC: moving_wall {
            Type: Dirichlet
            Time dependence: General
            Temporal and spatial values file path: wall_motion.dat
            Profile: Flat
            Zero out perimeter: 1
            Impose flux: 0
            #---------------- Add this line to the moving boundary face -----------
            Impose on state variable integral: 1
    }
```

Follow this [instruction](svfsi.html#app_restart_after_remesh) if you need to restart your simulation after stoppage. -->
