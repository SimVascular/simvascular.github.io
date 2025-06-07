## Abdominal aortic aneurysm: geometry and mesh
In this guide, we solve the clinical case of an abdominal aortic aneurysm. The geometrical models of the solid and the fluid are shown in the figure below. 
<br>
<figure>
  <img src="/documentation/multi_physics/user-guide/fluid_solid_interaction/imgs-AAA/model-fluid-solid.png" style="width: 90%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
  <figcaption class="svCaption" >Solid (left) and fluid (right) models of the abdominal aortic aneurysm case. </figcaption>
</figure>
<br>
The fluid domain was obtained from segmenting a medical image, and the solid domain was obtained by extruding the lumen wall of the fluid domain by a constant thickness. For more details on how to generate a patient-specific model look into the modeling section.
The surface mesh for fluid domain, for the solid domain and the inlet section of the combined meshes are shown in the figure below. 
<br>
<figure>
  <img src="/documentation/multi_physics/user-guide/fluid_solid_interaction/imgs-AAA/mesh-solid-fluid.png" style="width: 90%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
  <figcaption class="svCaption" >Solid (left) and fluid (centre) meshes are first created separately, and then used in svMultiPhysics to perform Fluid-Structure-Interaction simulations with Arbitrary Lagrangian–Eulerian (ALE) coordinates. The right figure represent the inlet section of the combined meshes showing the boundary layer refinement for the fluid mesh and the solid mesh. </figcaption>
</figure>
<br>
It is not the purpose of this guide to illustrate the process of mesh creation for FSI problems, but it is important to state that the interface between the solid mesh (inner wall) and fluid mesh (lumen wall) match. Meaning the lumen_wall of the fluid mesh and the inner_wall of the solid mesh should be exactly the same.