<!-- =============================================================== -->
<!-- ========================= Projection Section ================== -->
<!-- =============================================================== -->

<h2 id="projection_section"> Projection Section </h2>
The <i>Projection Section</i> of the solver parameters input file is used to couple the interface between the fluid and the solid domains for a fluid-structure interaction (FSI) simulation. The shared boundary surfaces between the fluid and solid must have the same node IDs or coordinates.

A <i>Projection Section</i> is organized as follows 
<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Projection</strong> name=<i>project_to_face_name</i>&gt; 
<br>
&lt;<strong>Project_from_face</strong>&gt; <i>string</i>
&lt;<strong>/Project_from_face</strong>&gt;
<br>
&lt;<strong>/Projection</strong>&gt;
</div>

The <strong>Projection</strong> keyword is used to create a projection. The <strong>name</strong> attribute 
<i>project_from_face_name</i> is the name of a face defined in the <i>Mesh Section</i>.

<h3> Projection Parameters </h3>
<div class="bc_param_div">
<strong>&lt;Project_from_face></strong> <i>string</i><nobr>
<strong>&lt;/Project_from_face&gt;</strong>
</nobr><br>
The name of a face defined in the <i>Mesh Section</i> that is to be coupled to the <i>project_from_face_name</i> face.
<br>
</div>


