<!-- --------------------------------------------------- -->
<!-- ------------------- Domains Panel ----------------- -->
<!-- --------------------------------------------------- -->

<h2 id="sv_fsi_tool_domains"> Domains Panel </h2> 
The Domains panel is used to assign a finite element mesh to a physical domain used in the simulation.
Files are assumed to be stored in a <strong>mesh-complete</strong> directory containing the finite 
element volume and boundary faces mesh files.

<h3> Panel Layout </h3> 

<br>
<figure>
  <img src="/documentation/svfsiplus/sv-fsi-tool/images/domains-panel.png" style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;">
  <p style="clear: both;">
</figure>
<br>


<h3> Usage </h3> 

**Add Mesh-Complete** <i>Button</i> - Selecting this button brings up a file browser used to select the 
<strong>mesh-complete</strong> directory containing finite element mesh files. The volume mesh and 
boundary surface faces stored there will be added to the simulation. The boundary surface faces will be displayed in
the <strong>Face List:</strong> <i>ListTable</i>.

**Domain** <i>ComboBox</i> - Select the current domain. Multiple domains may be read in by selecting more than
on <strong>mesh-complete</strong> directories (e.g. fluid-solid simulation).

**Type:** <i>Ratio Button</i> - Selects the domain physics as a <i>fluid</i> or <i>solid</i>.

<strong>Face List:</strong> <i>ListTable</i> - Lists the boundary surface face names defined for a domain. These
are the names of the files in the <strong>mesh-complete/mesh-surfaces</strong> directory and will later
be used to identify the faces used for boundary conditions.

