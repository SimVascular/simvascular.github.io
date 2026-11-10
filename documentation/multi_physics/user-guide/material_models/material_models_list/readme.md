<h3 id ="user_guide_material_models"> List of Available Hyperelastic Models </h3>

Volumetric constitutive models for struct/ustruct equations:

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> Volumetric Model </th>
    <th> Input Keyword </th>
  </tr>

Isochoric constitutive models for struct/ustruct equations.

<table class="table table-bordered" style="width:100%">
  <tr>
    <th> Isochoric Model </th>
    <th> Input Keyword </th>
  </tr>

&dagger; : These models are not available for ustruct.

svMultiPhysics has two options for solving the solid equations - struct and ustruct. “Struct” uses a displacement based formulation i.e. the unknowns that we are solving for in each element are displacements. “Ustruct” uses a mixed formulation where the unknowns are displacements and pressures.<a href="#ref-1_ustruct_formulation">[1]</a>

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Add_equation</strong> type="<i>struct</i>"> <span style="color: #888">// or "ustruct"</span><br>
  <<strong>Coupled</strong>> <i>true</i> </<strong>Coupled</strong>><br>
  <<strong>Min_iterations</strong>> <i>1</i> </<strong>Min_iterations</strong>><br>
  <<strong>Max_iterations</strong>> <i>3</i> </<strong>Max_iterations</strong>><br>
  <<strong>Tolerance</strong>> <i>1e-9</i> </<strong>Tolerance</strong>><br><br>
<span style="color: #888">/*<br>
  Add constitutive model, output type, solver type, boundary conditions<br>
*/</span><br><br>
</<strong>Add_equation</strong>>
</div>

Volumetric Models: These models set the volumetric part of the strain energy function. There is only one material parameter needed in the input file to define this term.

For a displacement based formulation (“struct”), the volumetric part of the strain energy function is a penalty to allow for small amounts of compressibility (models the material as nearly incompressible).

$$
\Psi_{vol} = K_p G(J)
$$

where $ K_p$ can be interpreted as the bulk modulus. $G(J)$ is the penalty function and takes different forms depending on the type of model. Two parameters are p and pl are defined internally to add to the stresses and elasticity tensors. “Struct” , the displacement based formulation calculates these as:

$$
p = \frac{\partial \Psi_{vol}}{\partial J}
$$

$$
pl = p + J\frac{dp}{dJ}
$$

The mixed displacement-pressure formulation does not calculate for p and pl this way. Instead, they are solved along with the displacements.

**Quadratic Model:**

$$
G(J) = \frac{1}{2} (J-1)^2
$$

$$
p = K_p (J -1)
$$

$$
pl = K_p (2J - 1)
$$

**Simo-Taylor91 Model:**

$$
G(J) = \frac{1}{4}(J^2 - 2 ln(J))
$$

$$
p = \frac{1}{2} K_p (J -\frac{1}{J})
$$

$$
pl = K_p J
$$

**Miehe94 Model:**

$$
G(J) = J - ln(J)
$$

$$
p = K_p (1 - \frac{1}{J})
$$

$$
pl = K_p
$$

So, if using “struct”, this is how you would input the volumetric model:

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Dilational_penalty_model</strong>> <i>ST91</i> </<strong>Dilational_penalty_model</strong>><br>
<<strong>Penalty_parameter</strong>> <i>4.0E9</i> </<strong>Penalty_parameter</strong>>
</div>

For “ustruct”:

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Dilational_penalty_model</strong>> <i>ST91</i> </<strong>Dilational_penalty_model</strong>>
</div>

Isochoric Models:

**Saint Venant-Kirchhoff**

This model is an extension of the linear elastic model with the strain energy postulated as a quadratic function of the Green-Lagrange strain tensor. It is an isotropic material model.

$$
\Psi_{iso} = \frac{\lambda}{2} tr(\mathbf{E})^2 + \mu tr(\mathbf{E}^2)
$$

where $\lambda$ and $\mu$ are Lamé constants.

In the code (file set_material_props.h),

$$
C_{10} = \lambda
$$

$$
C_{01} = \mu
$$

Since these parameters are set automatically, we only need to specify the constitutive model type.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Constitutive_model</strong> <i>type="stVK"</i>> </<strong>Constitutive_model</strong>>
</div>

The 2nd Piola-Kirchoff stress is given by

$$
\mathbf{S} = \lambda tr(\mathbf{E}) \mathbf{I} + 2\mu \mathbf{E}
$$

**NOTE:** To modify the Lamé constants for any model that uses default parameters, we do it through specifying the elasticity modulus $E$ and poisson’s ratio $\nu$.

$$
\mu = \frac{E}{2(1+\nu)}
$$

$$
\lambda =  \frac{E \nu}{(1+\nu)(1-2\nu)}
$$

The bulk modulus $\kappa$ is given by

$$
\kappa = \frac{E}{3(1-2\nu)}
$$

$\lambda$ and $\kappa$ are set to zero if the material is incompressible, i.e. $\nu=0.5$.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Elasticity_modulus</strong>> <i>240.56596e6</i> </<strong>Elasticity_modulus</strong>><br>
<<strong>Poisson_ratio</strong>> <i>0.4999999</i> </<strong>Poisson_ratio</strong>>
</div>

**Neo-Hookean model**

$$
\Psi_{iso} = C_{10} (\bar{I}_1 - 3)
$$

<div class="nhk">
<<strong>Constitutive_model</strong> <i>type="neoHookean"</i> > </<strong>Constitutive_model</strong>>
</div>

The parameter $ C_{10}$ is automatically set (file set_material_props.h):

$$
C_{10} = \frac{\mu}{2}
$$

**Holzapfel-Gasser-Ogden model**

Requires two fiber directions. 

$$
\Psi_{aniso} = \frac{a_4}{2b_4} \left( \exp\left( b_4\left( \kappa \bar{I}_1 + (1-3\kappa)\bar{I}_4 - 1\right)^2 \right) - 1 \right) + \frac{a_6}{2b_6} \left( \exp\left( b_6\left( \kappa \bar{I}_1 + (1-3\kappa)\bar{I}_6 - 1 \right)^2 \right) - 1 \right)
$$

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Constitutive_model</strong> <i>type="HGO"</i>><br>
  <<strong>a4</strong>> <i>9.966e5</i> </<strong>a4</strong>><br>
  <<strong>b4</strong>> <i>524.6</i> </<strong>b4</strong>><br>
  <<strong>a6</strong>> <i>9.966e5</i> </<strong>a6</strong>><br>
  <<strong>b6</strong>> <i>524.6</i> </<strong>b6</strong>><br>
  <<strong>kappa</strong>> <i>0.1</i> </<strong>kappa</strong>><br>
</<strong>Constitutive_model</strong>>
</div>

The isotropic part is the same as neoHookean - the parameters are automatically assigned from elasticity modulus and poisson’s ratio. The parameters $a_4$ and $b_4$ correspond to $k_1$and $k_2$ from the original paper (applied to the $\bar I_4$ fiber family), and $a_6$ and $b_6$ correspond to $k_1$ and $k_2$ (applied to the $\bar I_6$fiber family). In the original Gasser–Ogden–Holzapfel formulation both fiber families share identical $k_1,k_2$ values (i.e. $a_4=a_6=k_1, b_4=b_6=k_2$); this implementation generalizes the model by allowing each family its own pair of stiffness parameters.

**Guccione model**

Requires an orthonormal fiber basis. The user needs to pass at least two orthonormal fiber directions.

$$
\Psi = \frac{c}{2} \left( \exp\left( Q(\bar{\mathbf{E}}) \right) - 1 \right)
$$

where $\bar{\mathbf{E}}$ is the local Green-Lagrange strain tensor, and

<p>
$$
Q(\bar{\mathbf{E}}) = b_{ff} \left( \bar{E}_{ff} \right)^2 + b_{ss} \left( \bar{E}_{ss}^2 + \bar{E}_{nn}^2 + \bar{E}_{sn}^2 \right) + 2b_{fs} \left( \bar{E}_{fs}^2 + \bar{E}_{fn}^2 \right)
$$
</p>

In the code, $b_f = b_{ff}$ and $b_t = b_{ss}$.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Constitutive_model</strong> <i>type="Gucci"</i>><br>
  <<strong>c</strong>> <i>880</i> </<strong>c</strong>><br>
  <<strong>bf</strong>> <i>8</i> </<strong>bf</strong>><br>
  <<strong>bt</strong>> <i>6</i> </<strong>bt</strong>><br>
  <<strong>bfs</strong>> <i>12</i> </<strong>bfs</strong>><br>
</<strong>Constitutive_model</strong>>
</div>

**Holzapfel-Ogden model**

Requires an orthonormal fiber basis. The user needs to pass at least two orthonormal fiber directions.

<p>
  \( 
  \Psi_{\text{iso}} = \frac{a}{2b} \exp\left( b (\bar{I}_1 - 3) \right)
  + \sum_{i \in \{f,s\}} \frac{a_i}{2b_i} \, \chi(\bar{I}_{4i})
  \left( \exp\left( b_i (\bar{I}_{4i} - 1)^2 \right) - 1 \right)
  + \frac{a_{fs}}{2b_{fs}} \left( \exp\left( b_{fs} \bar{I}_{8fs}^2 \right) - 1 \right)
  \)
</p>

where $\chi (\eta)$ is the smoother heaviside function defined as

$$
\chi(\eta) = \frac{1}{1 + exp\{ -k_{\chi} (\eta -1)\} }
$$

The heaviside function is multiplied as a switching function to turn off the fibers during contraction. This is useful for modeling collagen in cardiac mechanics for example which does not support contraction.

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Constitutive_model</strong> <i>type="HolzapfelOgden"</i>><br>
  <<strong>a</strong>> <i>590.0</i> </<strong>a</strong>><br>
  <<strong>b</strong>> <i>8.023</i> </<strong>b</strong>><br>
  <<strong>a4f</strong>> <i>184720.0</i> </<strong>a4f</strong>><br>
  <<strong>b4f</strong>> <i>16.026</i> </<strong>b4f</strong>><br>
  <<strong>a4s</strong>> <i>24810.0</i> </<strong>a4s</strong>><br>
  <<strong>b4s</strong>> <i>11.12</i> </<strong>b4s</strong>><br>
  <<strong>afs</strong>> <i>2160.0</i> </<strong>afs</strong>><br>
  <<strong>bfs</strong>> <i>11.436</i> </<strong>bfs</strong>><br>
  <<strong>k</strong>> <i>100.0</i> </<strong>k</strong>><br>
</<strong>Constitutive_model</strong>>
</div>

**Holzapfel-Ogden Modified Anisotropy model**

Requires an orthonormal fiber basis. The user needs to pass at least two orthonormal fiber directions.

This model is very similar to the Holzapfel Ogden model - the only difference is the use of full invariants instead of isochoric.

<p>
\[
\Psi_{\text{iso}} = \frac{a}{2b} \exp\left( b (\bar{I}_1 - 3) \right)
+ \sum_{i \in \{f,s\}} \frac{a_i}{2b_i} \, \chi(I_{4i})
\left( \exp\left( b_i (I_{4i} - 1)^2 \right) - 1 \right)
+ \frac{a_{fs}}{2b_{fs}} \left( \exp\left( b_{fs} I_{8fs}^2 \right) - 1 \right)
\]
</p>

where f and s are the fiber and sheet directions and the smoothed heaviside function is:

$$
\chi(\eta) = \frac{1}{1 + exp\{ -k_{\chi} (\eta -1)\} }
$$

<div style="background-color: #F0F0F0; padding: 10px; border: 1px solid #d0d0d0; border-left: 4px solid #d0d0d0; font-family: monospace;">
<<strong>Constitutive_model</strong> <i>type="HolzapfelOgden-ModifiedAnisotropy"</i>><br>
  <<strong>a</strong>> <i>590.0</i> </<strong>a</strong>><br>
  <<strong>b</strong>> <i>8.023</i> </<strong>b</strong>><br>
  <<strong>a4f</strong>> <i>184720.0</i> </<strong>a4f</strong>><br>
  <<strong>b4f</strong>> <i>16.026</i> </<strong>b4f</strong>><br>
  <<strong>a4s</strong>> <i>24810.0</i> </<strong>a4s</strong>><br>
  <<strong>b4s</strong>> <i>11.12</i> </<strong>b4s</strong>><br>
  <<strong>afs</strong>> <i>2160.0</i> </<strong>afs</strong>><br>
  <<strong>bfs</strong>> <i>11.436</i> </<strong>bfs</strong>><br>
  <<strong>k</strong>> <i>100.0</i> </<strong>k</strong>><br>
</<strong>Constitutive_model</strong>>
</div>
