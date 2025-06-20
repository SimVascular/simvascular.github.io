# Boundary Conditions 

The CFD computational 3D domain represents the region of fluid flow for a simulation. It is typically a small anatomical region of interest within the human vasculature. The behavior of the fluid within the 3D domain is governed by interactions with the surrounding vasculature via its 2D boundaries representing vessel inlet and outlet surfaces. 

Boundary conditions define how a fluid interacts with the boundaries of a computational domain. They specify the behavior of the fluid at 
these boundaries, such as inlets, outlets, and walls, and are necessary to obtain a unique and physically meaningful solution. 
For blood flow simulations the boundary conditions define how a fluid interacts with the vascular networks outside of the 3D domain. 
It is crucial that they accurately reproduce the physiology of these networks to obtain meaningful cardiovascular simulation results.

Boundary conditions act as constraints on the fluid flow equations. They must be correctly chosen to ensure accurate and stable simulations; incorrect boundary conditions can lead to unstable and divergent results.


## Boundary condition types

Boundary conditions are applied to the finite element mesh walls and inlet/outlet surfaces (aka faces). Inlet and outlet surfaces are assumed to be flat.

The boundaries of a computational domain $\Omega$ are classified as (Fig. 1)

<ol>
 <li> <strong>inlet</strong> boundary $\Gamma_g$ - Surfaces where a volumetric flow rate of fluid entering the domain is prescribed. It is used to derive a Dirichlet velocity boundary condition applied in the direction normal to the surface.
 <li> <strong>wall</strong> boundary $\Gamma_s$ - This boundary represents the interface between the fluid domain and the vessel wall. Blood flow simulations typically assume a <strong>rigid wall assumption</strong> where a zero velocity condition is applied to vessel surfaces. 
</li>
 <li> <strong>outflow</strong> boundary $\Gamma_h$ - Surfaces where a uniform pressure value is prescribed. 
</ol>

<br> <br>
<figure>
  <img class="svImg svImgMd" src="/documentation/cfd_simulation/images/Fig_1.png">
  <figcaption class="svCaption" >Fig. 1 &nbsp Boundaries of a fluid domain: inlet ($\Gamma_g$), wall ($\Gamma_s$), and outlet ($\Gamma_h$). </figcaption>
</figure>


### Outlet boundary conditions 

There are several boundary conditions that can be used to represent the pressure effects of the downstream vasculature at an outlet surface

<ol>

<li> <strong>Resistance </strong> - Relates the outlet flow to a pressure using $p = p_0 + R * Q$, where $R$ is the resistance parameter that characterizes the downstream vasculature, $p$ is the prescribed pressure, $Q$ is the flow rate passing through the outlet surface. 
</li>

<li> <strong>RCR</strong> - Relates the outlet flow to a pressure using 3-element lumped parameter network (LPN): a proximal resistance $R_p$, a capacitance $C$, and a distal resistance $R_d$. (Fig. 2)
</li>

</ol>

<br><br>
<figure>
  <img class="svImg svImgMd" src="/documentation/cfd_simulation/images/Fig_2.png">
  <figcaption class="svCaption" >Fig. 2 &nbsp An RCR 3-element lumped parameter network </figcaption>
</figure>


