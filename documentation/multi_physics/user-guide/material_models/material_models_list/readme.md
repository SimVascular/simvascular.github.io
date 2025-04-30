<h3 id ="user_guide_material_models"> List of Available Hyperelastic Models </h3>

Volumetric constitutive models for struct/ustruct equations:

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> Volumetric Model </th>
    <th> Input Keyword </th>
  </tr>

  <tr>
    <td> Quadratic model </td>
    <td> "quad", "Quad", "quadratic", "Quadratic" </td>
  </tr>

  <tr>
    <td> Simo-Taylor91 model </td>
    <td> "ST91", "Simo-Taylor91" </td>
  </tr>

  <tr>
    <td> Miehe94 model </td>
    <td> "M94", "Miehe94" </td>
  </tr>
</table>

Isochoric constitutive models for struct/ustruct equations.

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> Isochoric Model </th>
    <th> Input Keyword </th>
  </tr>

  <tr>
    <td> Saint Venant-Kirchhoff $$\dag$$ </td>
    <td> "stVK", "stVenantKirchhoff" </td>
  </tr>

  <tr>
    <td> Neo-Hookean model </td>
    <td> "nHK", "nHK91", "neoHookean", "neoHookeanSimo91" </td>
  </tr>

  <tr>
    <td> Holzapfel-Gasser-Ogden model </td>
    <td> "HGO" </td>
  </tr>

  <tr>
    <td> Guccione model </td>
    <td> "Guccione", "Gucci" </td>
  </tr>

  <tr>
    <td> Holzapfel-Ogden model </td>
    <td> "HO", "HolzapfelOgden" </td>
  </tr>

  <tr>
    <td> Holzapfel-Ogden Modified Anisotropy model </td>
    <td> “HO_ma”, “HolzapfelOgden-ModifiedAnisotropy” </td>
  </tr>
</table>

$$\dag$$ : These models are not available for ustruct.

svMultiPhysics has two options for solving the solid equations - struct and ustruct. “Struct” uses a displacement based formulation i.e. the unknowns that we are solving for in each element are displacements. “Ustruct” uses a mixed formulation where the unknowns are displacements and pressures. 

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 1px solid #d0d0d0">
&lt;<strong>Add_equation</strong> type=<i>"struct"</i>&gt; // or "ustruct"
&lt;<strong>Coupled&gt;</strong> <i>true</i> &lt;/<strong>Coupled</strong>&gt;
&lt;<strong>Min_iterations&gt;</strong> <i>1</i> &lt;/<strong>Min_iterations</strong>&gt;
&lt;<strong>Max_iterations&gt;</strong> <i>3</i> &lt;/<strong>Max_iterations</strong>&gt;
&lt;<strong>Tolerance&gt;</strong> <i>1e-9</i> &lt;/<strong>Tolerance</strong>&gt;
<br><br>
/*
Add constitutive model, output type, solver type, boundary conditions
*/
<br><br>
/&lt;<strong>Add_equation</strong>&gt;
</div>

Volumetric Models: These models set the volumetric part of the strain energy function. There is only one material parameter needed in the input file to define this term. 

For a displacement based formulation (“struct”), the volumetric part of the strain energy function is a penalty to allow for small amounts of compressibility (models the material as nearly incompressible).

$$ \Psi_{vol} = K_p G(J) $$

where $$ K_p$$ can be interpreted as the bulk modulus. $$G(J)$$ is the penalty function and takes different forms depending on the type of model. Two parameters are p and pl are defined internally to add to the stresses and elasticity tensors. “Struct” , the displacement based formulation calculates these as:
$$ p = \frac{\partial \Psi_{vol}}{\partial J}$$
$$ pl = p + J\frac{dp}{dJ}$$
