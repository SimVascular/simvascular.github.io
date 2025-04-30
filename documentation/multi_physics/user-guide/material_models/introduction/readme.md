<h2 id ="user_guide_material_models"> Material Models </h2>
The ALE formulation that svMultiPhysics uses (see section on FSI) solves for displacements and stresses in the solid domain. Different materials have different relationships between the stress and the displacement (or strain) which are represented by material models (also known as constitutive models). These material models are required to solve the system of equations for solids.

One commonly known material model is the linear elastic model, where the Cauchy stress tensor is related to the small strain tensor through a fourth order stiffness tensor. In 1D, the stress and strain are proportional and the constant of proportionality is known as the Young’s modulus. 

$$\boldsymbol{\sigma} = \mathbb{C}\boldsymbol{\epsilon}$$

where 

$$\boldsymbol{\epsilon} = \frac{1}{2} [\nabla \mathbf{u} + (\nabla \mathbf{u})^T]$$

This relationship holds well for metals which experience small deformations. Soft biological tissues on the other hand undergo large nonlinear deformations and are better represented by a class of material models called hyperelastic models. The passive material behavior for hyperelastic materials can be described through the strain energy function $$\Psi$$. Various stress measures can be obtained from the strain energy function by taking a tensor derivative. svMultiPhysics uses the 2nd Piola Kirchhoff Stress $$\mathbf{S}$$.

$$ \mathbf{S} = 2\frac{\partial \Psi}{\partial \mathbf{C}} $$

where $$\mathbf{C}$$ is the right Cauchy-green tensor. The general constitutive relation for these materials can be written as

$$ \mathbf{S} = \mathbb{C}:\mathbf{E}$$

where $$\mathbf{E}$$ is the Green-Lagrange strain tensor. The small strain tensor used for linear elasticity is a linearized form of this strain tensor.

The strain energy function consists of two parts - the isochoric (volume preserving) and the volumetric parts. 

$$ \Psi = \Psi_{vol} (J) + \Psi_{iso} (\bar{\mathbf{C}})$$

Biological materials are rubber-like and are modelled as incompressible or nearly incompressible, and this decomposition is helpful for such cases.

Tissues have extremely complex microstructure due to which we rely on phenomenological material models. svMultiPhysics has a number of options available for material models suitable for different applications.




