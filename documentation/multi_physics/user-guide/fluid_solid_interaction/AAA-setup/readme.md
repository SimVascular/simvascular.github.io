## Abdominal aortic aneurysm: simulation setup 
Before running a simulation, we need to set it up through an input file. The input file for svMultiPhysics is an .xml file. In the following we go through the main steps to take in order to set up an FSI simulation of the Abdominal Aortic Aneurysm problem. It is not the purpose of this guide to provide a detailed description of the input file and all of the options available in svMultiPhysics, but rather to guide the user in setting up a simulation. The first thing to do is to select the time step size. We can estimate the time step size to use for the simulation by taking into account the expected fluid velocity *v* and the average element size *\Delta l* of the fluid mesh. Considering that the CFL (Courant-Friedrichs-Lewy) number should be close to unity, we can get an approximation of the time step size Usually a value between 1 and 10 constitute a stable choice for implicit time integration scheme, such as the one used by svMultiPhysics. The CFL number is defined as follows:
$$ CFL = \frac{v \Delta t}{\Delta l} $$
For the case we are describing here, we set the time step size as follows:
```
<Time_step_size> 1e-3 </Time_step_size> 
```
Since we are simulating an FSI problem we have two meshes, one for fluid domain and one for the solid domain. We will add the mesh files for the fluid domain with the relative surfaces as follows:
```
<Add_mesh name="lumen" > 
  <Mesh_file_path> mesh/fluid-mesh-complete/mesh-complete.mesh.vtu  </Mesh_file_path>
  <Add_face name="lumen_inlet">
      <Face_file_path> mesh/fluid-mesh-complete/mesh-surfaces/inlet.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_outlet1">
      <Face_file_path> mesh/fluid-mesh-complete/mesh-surfaces/outlet1.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_outlet2">
      <Face_file_path> mesh/fluid-mesh-complete/mesh-surfaces/outlet2.vtp </Face_file_path>
  </Add_face>
  <Add_face name="lumen_wall">
      <Face_file_path> mesh/fluid-mesh-complete/mesh-surfaces/lumen_wall.vtp </Face_file_path>
  </Add_face>
  <Domain> 0 </Domain>
</Add_mesh>
```
We do the same for the mesh of the solid domain:
```
<Add_mesh name="wall" >
  <Mesh_file_path> mesh/solid-mesh-complete/mesh-complete.mesh.vtu  </Mesh_file_path>
  <Add_face name="wall_inlet">
      <Face_file_path> mesh/solid-mesh-complete/mesh-surfaces/inlet.vtp </Face_file_path>
  </Add_face>
  <Add_face name="wall_outlet1">
      <Face_file_path> mesh/solid-mesh-complete/mesh-surfaces/outlet1.vtp </Face_file_path>
  </Add_face>
  <Add_face name="wall_outlet2">
      <Face_file_path> mesh/solid-mesh-complete/mesh-surfaces/outlet2.vtp </Face_file_path>
  </Add_face>
  <Add_face name="wall_inner">
      <Face_file_path> mesh/solid-mesh-complete/mesh-surfaces/inner.vtp </Face_file_path>
  </Add_face>
  <Add_face name="wall_outer">
      <Face_file_path> mesh/solid-mesh-complete/mesh-surfaces/outer.vtp </Face_file_path>
  </Add_face>
  <Domain> 1 </Domain>
</Add_mesh>
```
It is important to have two distinct *Domain* attribute, one for the fluid and one for the solid. The path to the files and the names of the surfaces and mesh are at the user discretion. For FSI it is important to define the surface that is the interface between the fluid and solid domain. At this interface the kinematic and dynamic conditions are satisfied automatically since svMultiPhysics solves the system of equations governing the FSI problem in a monolithic way, meaning the fluid and solid equations are strongly coupled and solved as one system of equations. In our input file we do not have to set any boundary conditions at the interface but we need to define which surface is the interface, like this:
```
<Add_projection name="wall_inner" >
   <Project_from_face> lumen_wall </Project_from_face>
</Add_projection>
```
At this point we need to add the equations we want to solve. As we briefly described in the introduction, the FSI problem is solved using the ALE method. For this reason we need two equations, one that solve the strongly coupled system of equations that comprises fluid and solid governing equations, and the second equation that solves for the mesh motion. Let's start from the FSI equation type:
```
<Add_equation type="FSI" > 
   <Coupled> true </Coupled>
   <Min_iterations> 1 </Min_iterations>  
   <Max_iterations> 7 </Max_iterations> 
   <Tolerance> 1e-4 </Tolerance> 

   <Domain id="0" >
      <Equation> fluid </Equation> 
      <Density> 1.06 </Density> 
      <Viscosity model="Constant" >
         <Value> 0.04 </Value>
      </Viscosity>
      <Backflow_stabilization_coefficient> 0.2 </Backflow_stabilization_coefficient> 
   </Domain>
   
   <Domain id="1" >
      <Equation> struct </Equation> 
      <Constitutive_model type="neoHookean"> </Constitutive_model> 
      <Dilational_penalty_model> M94 </Dilational_penalty_model> 
      <Density> 1.2 </Density> 
      <Elasticity_modulus> 8.0e6 </Elasticity_modulus> 
      <Poisson_ratio> 0.49 </Poisson_ratio> 
   </Domain>

   <LS type="GMRES" >
      <Linear_algebra type="fsils" >
         <Preconditioner> fsils </Preconditioner>
      </Linear_algebra>
      <Tolerance> 1e-4 </Tolerance>
      <Max_iterations> 100 </Max_iterations> 
      <Krylov_space_dimension> 50 </Krylov_space_dimension>
   </LS>

   <Output type="Spatial" >
     <Displacement> true </Displacement>
     <Velocity> true </Velocity>
     <Pressure> true </Pressure>
     <Stress> true </Stress>
     <Strain> true </Strain>
     <Cauchy_stress> true </Cauchy_stress>
     <Def_grad> true </Def_grad>
     <VonMises_stress> true </VonMises_stress>
     <WSS> true </WSS>
   </Output>

   <Output type="Alias" >
       <Displacement> FS_Displacement </Displacement>
   </Output>

   <Add_BC name="lumen_inlet" > 
      <Type> Dir </Type> 
      <Time_dependence> Unsteady </Time_dependence> 
      <Temporal_values_file_path> inflow.flow</Temporal_values_file_path> 
      <Profile> Parabolic </Profile> 
      <Impose_flux> true </Impose_flux> 
      <Follower_pressure_load> true </Follower_pressure_load>
   </Add_BC> 

   <Add_BC name="lumen_outlet1" > 
      <Type> Neu </Type> 
      <Time_dependence> RCR </Time_dependence> 
      <RCR_values> 
        <Capacitance> 4.98e-4 </Capacitance> 
        <Distal_resistance> 3474.4 </Distal_resistance> 
        <Proximal_resistance> 347.4 </Proximal_resistance> 
        <Distal_pressure> 0 </Distal_pressure> 
        <Initial_pressure> 0 </Initial_pressure> 
      </RCR_values> 
   </Add_BC> 

   <Add_BC name="lumen_outlet2" > 
      <Type> Neu </Type> 
      <Time_dependence> RCR </Time_dependence> 
      <RCR_values> 
        <Capacitance> 4.98e-4 </Capacitance> 
        <Distal_resistance> 3474.4 </Distal_resistance> 
        <Proximal_resistance> 347.4 </Proximal_resistance> 
        <Distal_pressure> 0 </Distal_pressure> 
        <Initial_pressure> 0 </Initial_pressure>
      </RCR_values> 
   </Add_BC> 


   <Add_BC name="wall_inlet" > 
      <Type> Dir </Type> 
      <Value> 0.0 </Value> 
   </Add_BC> 

   <Add_BC name="wall_outlet1" >
      <Type> Dir </Type> 
      <Value> 0.0 </Value> 
   </Add_BC>

   <Add_BC name="wall_outlet2" >
      <Type> Dir </Type> 
      <Value> 0.0 </Value>  
   </Add_BC> 

   <Add_BC name="wall_outer" > 
      <Type> Robin </Type> 
      <Stiffness> 1.0e6 </Stiffness> 
      <Damping> 0.0 </Damping> 
      <Follower_pressure_load> true </Follower_pressure_load>
   </Add_BC> 
</Add_equation>
```
At the beginning of the equation section of the input file shown above, we defined parameters for Newton linearization scheme, in particular we set the maximum number of iterations to be performed per time step and the relative tolerance of the numerical residual. The relative tolerance should not be very low, as a rule of thumb the values used in this guide should satisfy most of the cases:
```
<Min_iterations> 1 </Min_iterations>  
<Max_iterations> 7 </Max_iterations> 
<Tolerance> 1e-4 </Tolerance> 
```
Note that if lower tolerances are used, the maximum number of iterations should be increased too, since it will take more iterations to converge to the desired tolernace. Next step is to define the fluid and solid properties. In particular for the fluid we need to set the density and viscosity, while for the solid we need to define the consitutive model to use and the material properties. Once we defined the properties and set what type of equations we want to solve for the fluid and solid domain, we have to define how we want to solve the linear system arising from the Newton linearization step. Currently the best approach supported by svMultiPhysics for solving the linear system for FSI problems is to use GMRES as linear solver with the ad-hoc preconditioner specified as *fsils*. The relative tolerance is important to be less or equal to the one used for the Newton scheme. The total number of iterations performed by the linear solver amount to *Max_iterations X Krylov_space_dimension*. The final linear solver setup in the input file is:
```
<LS type="GMRES" >
      <Linear_algebra type="fsils" >
         <Preconditioner> fsils </Preconditioner>
      </Linear_algebra>
      <Tolerance> 1e-4 </Tolerance>
      <Max_iterations> 100 </Max_iterations> 
      <Krylov_space_dimension> 50 </Krylov_space_dimension>
</LS>
```
Note that having *Krylov_space_dimension=50* is generally a good compromise between accuracy and computational efficiency. The FSI problem is completely defined once the boundary conditions are specified. Applying the boundary conditions to the model's surfaces is a critical step in performing a correct simulations of any kind, not only for FSI problems. In this example, for the fluid problem we set a Dirichlet boundary condition at the inlet, in particular we prescribe an unsteady velocity profile based on values from file. At the two outlet we impose Neumann boundary conditions, in other words we impose the traction through the RCR method. For the solid problem we prescribe Dirichlet boundary conditions (clamped conditions) at the inlet and at the two outlets, while we impose Robin boundary conditions at the outer surface. The final step in setting up the FSI simulation of the Abdominal Aortic Aneurysm problem is to define the mesh moving problem. We do something similar to what we did for the previous FSI equation, i.e. we set the Newton linearization scheme parameters, the mesh Poisson ratio (generally the mesh motion is solved considering the fluid mesh as a linear elastostatic problem), the linear solver parameters and the boundary conditions applied at the surfaces of the fluid mesh (generally they follow the boundary conditions applied at the inlet and outlets of the solid mesh). In this example we define the mesh equation in the input file like it follows:
```
<Add_equation type="mesh" >
   <Coupled> true </Coupled>
   <Min_iterations> 1 </Min_iterations>
   <Max_iterations> 7 </Max_iterations>
   <Tolerance> 1e-4 </Tolerance>
   <Poisson_ratio> 0.49 </Poisson_ratio> 

   <LS type="GMRES" >
      <Linear_algebra type="fsils" >
         <Preconditioner> fsils </Preconditioner>
      </Linear_algebra>
      <Tolerance> 1e-4 </Tolerance>
   </LS>

   <Output type="Spatial" >
     <Displacement> true </Displacement>
   </Output>

   <Add_BC name="lumen_inlet" > 
      <Type> Dir </Type> 
      <Value> 0.0 </Value> 
   </Add_BC> 

   <Add_BC name="lumen_outlet1" > 
      <Type> Dir </Type> 
      <Value> 0.0 </Value> 
   </Add_BC> 

   <Add_BC name="lumen_outlet2" > 
      <Type> Dir </Type> 
      <Value> 0.0 </Value> 
   </Add_BC> 

</Add_equation>
```