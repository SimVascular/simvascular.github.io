
<h2> Fluid mechanics </h2>

### Strong form

The incompressible Navier-Stokes equations governing fluid flow are 

$$
\rho\left(\frac{d\boldsymbol{u}}{dt} + \boldsymbol{u} \cdot \boldsymbol{\nabla} \boldsymbol{u} - \boldsymbol{b}\right) = \boldsymbol{\nabla} \cdot \boldsymbol{\sigma},
$$

$$
\boldsymbol{\nabla} \cdot \boldsymbol{u} = 0,
$$

where $\boldsymbol{u} = \boldsymbol{u}\left(\boldsymbol{x}, t\right)$ is the velocity, $p = p\left(\boldsymbol{x}, t\right)$ is the pressure, $\boldsymbol{b} = \boldsymbol{b}\left(\boldsymbol{x}, t\right)$ is the body force, and $\rho$ is the fluid density. The first equation corresponds to the momentum conservation in the flow and the second equation corresponds to mass conservation. The momentum equation can augmented with a Darcy permeability term, $-\frac{\mu}{K}\boldsymbol{u}$, on the right-hand side to yield the Navier-Stokes-Brinkman equation <a href="#ref-6">[6]</a> <a href="#ref-7">[7]</a>, such that

$$
\rho\left(\frac{d\boldsymbol{u}}{dt} + \boldsymbol{u} \cdot \boldsymbol{\nabla} \boldsymbol{u} - \boldsymbol{b}\right) = \boldsymbol{\nabla} \cdot \boldsymbol{\sigma} - \frac{\mu}{K}\boldsymbol{u},
$$

This equation models incompressible fluid flow in porous media. Here $K$ is the permeability of the porous media. With this equation, we can of course recover the Navier-Stokes equations by simply removing the Darcy component (i.e., $K \rightarrow \infty$). 

The Cauchy stress tensor is $\boldsymbol{\sigma} = \boldsymbol{\sigma}\left(\boldsymbol{x}, t\right) = -p\boldsymbol{I} + 2\mu\left(\boldsymbol{u}\right)\epsilon$, where  $\epsilon = \epsilon\left(\boldsymbol{u}\right) = \nabla^{s} \boldsymbol{u} = \frac{1}{2}\left(\nabla \boldsymbol{u} + \left(\nabla\boldsymbol{u}\right)^{\text{T}} \right)$ is the strain rate tensor. The effective dynamic viscosity, $\mu\left(\boldsymbol{u}\right)$, is written generally as a function of velocity here to account for non-Newtonian fluids. For Newtonian fluids, $\mu$ is a simply constant. The divergence of the Cauchy stress tensor, written in both vector and index notation, is

$$
\boldsymbol{\nabla} \cdot \boldsymbol{\sigma} = -\boldsymbol{\nabla}p + 2\boldsymbol{\epsilon}\boldsymbol{\nabla}\mu + \mu\nabla^{2}\boldsymbol{u},
$$

$$
\sigma_{ij,j} = -p_{,i} + 2\epsilon_{ij}\frac{\partial \mu}{\partial x_{j}} + \mu u_{i,kk},
$$

The boundary conditions are 

$$
\boldsymbol{u} = \boldsymbol{g},
$$

$$
\boldsymbol{\sigma} \cdot \boldsymbol{n} = \boldsymbol{h},
$$

where $\boldsymbol{g}$ is the prescribed velocity and $\boldsymbol{h}$ is the prescribed traction.

We will solve the Navier-Stokes and Navier-Stokes-Brinkman equations numerically, using the finite element method for spatial discretization <a href="#ref-8">[8]</a>.

### Standard (Galerkin) weak form
    
For the finite element method, we will first derive the Galerkin weak form for the Navier-Stokes-Brinkman equations. We define our trial and weighting function spaces,

$$
u_{i} \in \tau_{i} : \\{u_{i} \in H^{1}\left(\Omega\right) \mid u_{i} = g_{i} \text{ on } \Gamma_{g_{i}}\\},
$$

$$
w_{i} \in \nu_{i} : \\{w_{i} \in H^{1}\left(\Omega\right) \mid w_{i} = 0 \text{ on } \Gamma_{g_{i}}\\},
$$

$$
p, q \in Q : \\{p \in L^{2}\left(\Omega\right)\\},
$$

where $\boldsymbol{w}$ is the weighting function for velocity and $q$ is the weighting function for pressure. We represent these weighting functions discretely on a per-element-basis as

$$
w_{i} = \sum_{a=1}^{n_{en}} N_{a}^{w}w_{ai},
$$

$$
q = \sum_{a=1}^{n_{en}} N_{a}^{q}q_{a},
$$

where $N_{a}^{w}$ and $N_{a}^{q}$ are the nodal shape (basis) functions for the velocity and pressure spaces, respectively, and $w_{ai}$ and $q_{a}$ are the associated arbitrary nodal coefficients. Similarly, the trial functions are represented by

$$
u_{i} = \sum_{a=1}^{n_{en}} N_{a}^{w}u_{ai},
$$

$$
p = \sum_{a=1}^{n_{en}} N_{a}^{q}p_{a}.
$$

We then multiply the Navier-Stokes-Brinkman equations by $\boldsymbol{w}$ and $q$, respectively, and integrate by parts to obtain the standard Galerkin momentum and continuity weak forms <a href="#ref-7">[7]</a> <a href="#ref-5">[5]</a>,

$$
\int_{\Omega} \rho w_{i}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho w_{i}u_{k}u_{i, k} d\Omega + \int_{\Omega} w_{i, j}\sigma_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}w_{i}u_{i} d\Omega - \int_{\Omega} w_{i}\rho b_{i} d\Omega - \int_{\Gamma_{h}} w_{i}h_{i} d\Gamma = 0,
$$

$$
\int_{\Omega} qu_{i,i} d\Omega = 0.
$$

These two equations can be added together to obtain

$$
\int_{\Omega} qu_{i,i} d\Omega + \int_{\Omega} \rho w_{i}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho w_{i}u_{k}u_{i, k} d\Omega + \int_{\Omega} w_{i, j}\sigma_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}w_{i}u_{i} d\Omega - \int_{\Omega} w_{i}\rho b_{i} d\Omega - \int_{\Gamma_{h}} w_{i}h_{i} d\Gamma = 0.
$$

### Stabilized weak form

The standard weak form is generally not stable. Additional terms must be added to stabilize it. We will apply the residual-based variational multiscale (RBVMS / VMS) method for stabilization <a href="#ref-1">[1]</a> <a href="#ref-5">[5]</a>. 

In VMS, the velocity and pressure terms are separated into coarse-scale and fine-scale components, such that

$$
\boldsymbol{u} = \boldsymbol{u}^{h} + \boldsymbol{u}', \\
$$

$$
p = p^{h} + p',
$$

where the $h$-superscript designates the coarse-scale components and the $'$-superscript denotes the fine-scale components. The fine-scale terms are defined as

$$
\boldsymbol{u}' = -\frac{\tau_{SUPS}}{\rho}\boldsymbol{r}_{M}\left(\boldsymbol{u}^{h}, p^{h}\right),
$$

$$
p' = -\rho\nu_{LSIC}r_{C}\left(\boldsymbol{u}^{h}\right),
$$

where the PDE residuals are

$$
\boldsymbol{r}_{M}\left(\boldsymbol{u}^{h}, p^{h}\right) = \rho\left(\frac{d\boldsymbol{u}^{h}}{dt} + \boldsymbol{u}^{h} \cdot \boldsymbol{\nabla} \boldsymbol{u}^{h} - \boldsymbol{b}\right) - \boldsymbol{\nabla} \cdot \boldsymbol{\sigma}^{h} + \frac{\mu}{K}\boldsymbol{u}^{h},
$$

$$
r_{C}\left(\boldsymbol{u}^{h}\right) = \boldsymbol{\nabla} \cdot \boldsymbol{u}^{h}.
$$

The stabilization parameters are defined as

$$
\tau_{SUPS} = \tau_{M} = \left(\frac{4}{\Delta t^{2}} + \boldsymbol{u}^{h} \cdot \boldsymbol{G}\boldsymbol{u}^{h} + C_{1}\nu^{2}\boldsymbol{G}:\boldsymbol{G} + \left(\frac{\nu}{K}\right)^{2}\right)^{-1/2},
$$

$$
\nu_{LSIC} = \tau_{C} = \left(\tau_{SUPS} \text{tr}\boldsymbol{G} \right)^{-1},
$$

where $\boldsymbol{G}$ is the element metric tensor and $\text{tr}\boldsymbol{G}$ is the trace of the metric tensor <a href="#ref-1">[1]</a>.

Using standard Galerkin momentum and continuity weak forms, and removing the $h$-superscript from the coarse-scale components for notational simplicity (i.e., $\boldsymbol{u}^{h} \rightarrow \boldsymbol{u}$ and $p^{h} \rightarrow p$), we obtain

$$
\int_{\Omega} qu_{i,i} d\Omega + \int_{\Omega} \rho w_{i}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho w_{i}u_{k}u_{i, k} d\Omega + \int_{\Omega} w_{i, j}\sigma_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}w_{i}u_{i} d\Omega - \int_{\Omega} w_{i}\rho b_{i} d\Omega - \int_{\Gamma_{h}} w_{i}h_{i} d\Gamma + \int_{\Omega} \tau_{SUPS}\left(\frac{q_{,i}}{\rho} + w_{i,k}u_{k}\right)r_{Mi} d\Omega + \int_{\Omega} \rho \nu_{LSIC}r_{C}w_{i,i} d\Omega - \int_{\Omega} w_{i}\tau_{SUPS}r_{Mk}u_{i,k} d\Omega - \int_{\Omega} w_{i,k}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} d\Omega - \int_{\Omega} \frac{\nu}{K}w_{i}\tau_{SUPS}r_{Mi} d\Omega = 0.
$$

This is the VMS-stabilized weak form for the Navier-Stokes-Brinkman equations <a href="#ref-7">[7]</a> <a href="#ref-5">[5]</a> <a href="#ref-6">[6]</a>. The first seven terms on the left-hand side correspond to the standard Galerkin weak form. The last five terms are the stabilization terms obtained via VMS. In deriving this equation, we used the continuity equation to obtain $w_{i}u_{k}u_{i,k} = w_{i}\left(u_{k}u_{i}\right)_{,k}$. We also applied the following assumptions <a href="#ref-5">[5]</a>,
<li> $\frac{du'}{dt} = 0$,
</li>
<li> $u' = 0$ on $\Gamma_{g}$ and $\Gamma_{h}$,
</li>
<li> $\nabla^{s}\boldsymbol{w}:2\mu\nabla^{s}\boldsymbol{u}' = 0$.
</li>

We then add an additional stabilization term, $\int_{\Omega} \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} w_{i,k}r_{Mk}r_{Mj}u_{i,j} d\Omega$ <a href="#ref-3">[3]</a> <a href="#ref-4">[4]</a> <a href="#ref-2">[2]</a>, to obtain

$$
\int_{\Omega} qu_{i,i} d\Omega + \int_{\Omega} \rho w_{i}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho w_{i}u_{k}u_{i, k} d\Omega + \int_{\Omega} w_{i, j}\sigma_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}w_{i}u_{i} d\Omega - \int_{\Omega} w_{i}\rho b_{i} d\Omega - \int_{\Gamma_{h}} w_{i}h_{i} d\Gamma + \int_{\Omega} \tau_{SUPS}\left(\frac{q_{,i}}{\rho} + w_{i,k}u_{k}\right)r_{Mi} d\Omega + \int_{\Omega} \rho \nu_{LSIC}r_{C}w_{i,i} d\Omega - \int_{\Omega} w_{i}\tau_{SUPS}r_{Mk}u_{i,k} d\Omega - \int_{\Omega} w_{i,k}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} d\Omega - \int_{\Omega} \frac{\nu}{K}w_{i}\tau_{SUPS}r_{Mi} d\Omega + \int_{\Omega} \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} w_{i,k}r_{Mk}r_{Mj}u_{i,j} d\Omega = 0.
$$

This equation is the full stabilized weak form used in fluid.cpp in svFSIplus.

### Residuals

We will temporally discretize the stabilized weak form using the generalized - $\alpha$ method. The resulting nonlinear equation will be linearized and solved iteratively using the Newton-Raphson (Newton) method.

To compute the residuals for each element in the mesh, we separate the stabilized weak form into momentum and continuity components,

$$
\int_{\Omega} \rho w_{i}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho w_{i}u_{k}u_{i, k} d\Omega + \int_{\Omega} w_{i, j}\sigma_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}w_{i}u_{i} d\Omega - \int_{\Omega} w_{i}\rho b_{i} d\Omega - \int_{\Gamma_{h}} w_{i}h_{i} d\Gamma + \int_{\Omega} \tau_{SUPS}w_{i,k}u_{k}r_{Mi} d\Omega + \int_{\Omega} \rho \nu_{LSIC}r_{C}w_{i,i} d\Omega - \int_{\Omega} w_{i}\tau_{SUPS}r_{Mk}u_{i,k} d\Omega - \int_{\Omega} w_{i,k}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} d\Omega - \int_{\Omega} \frac{\nu}{K}w_{i}\tau_{SUPS}r_{Mi} d\Omega + \int_{\Omega} \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} w_{i,k}r_{Mk}r_{Mj}u_{i,j} d\Omega = 0,
$$

$$
\int_{\Omega} qu_{i,i} d\Omega + \int_{\Omega} \tau_{SUPS}\frac{q_{,i}}{\rho}r_{Mi} d\Omega = 0.
$$

Then, by plugging weighting functions into these equations and holding the results true for any arbitrary $w_{ai}$ and $q_{a}$, we obtain the momentum and continuity residuals,

$$
R_{ai}^{m} = \int_{\Omega} \rho N_{a}^{w}\frac{du_{i}}{dt} d\Omega + \int_{\Omega} \rho N_{a}^{w}u_{k}u_{i, k} d\Omega - \int_{\Omega} pN_{a, i}^{w} d\Omega + \int_{\Omega} N_{a, j}^{w}2\mu\epsilon_{ij} d\Omega + \int_{\Omega} \frac{\mu}{K}N_{a}^{w}u_{i} d\Omega - \int_{\Omega} N_{a}^{w} \rho b_{i} d\Omega + \int_{\Omega} \tau_{SUPS}N_{a, k}^{w}u_{k}r_{Mi} d\Omega + \int_{\Omega} \rho \nu_{LSIC}r_{C}N_{a, i}^{w} d\Omega - \int_{\Omega} N_{a}^{w}\tau_{SUPS}r_{Mk}u_{i,k} d\Omega - \int_{\Omega} N_{a, k}^{w}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} d\Omega - \int_{\Omega} \frac{\nu}{K}\tau_{SUPS}N_{a}^{w}r_{Mi} d\Omega + \int_{\Omega} \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a, k}^{w}r_{Mk}r_{Mj}u_{i,j} d\Omega,
$$

$$
R_{a}^{c} = \int_{\Omega} N_{a}^{q}u_{i,i} d\Omega + \int_{\Omega} \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}r_{Mi} d\Omega,
$$

where, for the $a^{\text{th}}$ node in a given element, $R_{ai}^{m}$ is the momentum residual in the $i^{\text{th}}$ direction and $R_{a}^{c}$ is continuity residual. The full residual vector, as used in the generalized - $\alpha$ method, is $\boldsymbol{R} = \left[R_{ai}^{m}, R_{a}^{c}\right]^{T}$. $R_{ai}^{m}$ and $R_{a}^{c}$ are coded in the fluid\_2d\_m/fluid\_3d\_m and fluid\_2d\_c/fluid\_3d\_c functions, respectively, in fluid.cpp in svFSIplus.

### Tangent matrices

To compute the elemental tangent matrices, as used in the Newton iterations in the generalized - $\alpha$ method, we plug trial functions into the residuals. We then differentiate the resulting equations with respect to $\frac{du_{n+1}}{dt}$ and $\frac{dp_{n+1}}{dt}$. This yields the tangent matrix,

$$
    \boldsymbol{J} = 
    \begin{bmatrix}
        \boldsymbol{K} &  \boldsymbol{G} \ \cr
        \boldsymbol{D} &  \boldsymbol{L}
    \end{bmatrix} = 
    \begin{bmatrix}
        \left[K_{ab}^{ij}\right] &  \left[G_{ac}^{i}\right] \ \cr
        \left[D_{ab}^{j}\right] &  \left[L_{ac}\right]
    \end{bmatrix}
    ,
$$

where 

$$
K_{ab}^{ij} = \frac{\partial R_{ai}^{m}}{\partial \dot{u}_{n+1,bj}},
$$

$$
G_{ac}^{i} = \frac{\partial R_{ai}^{m}}{\partial \dot{p}_{n+1,c}},
$$

$$
D_{ab}^{j} = \frac{\partial R_{a}^{c}}{\partial \dot{u}_{n+1,bj}},
$$

$$
L_{ac} = \frac{\partial R_{a}^{c}}{\partial \dot{p}_{n+1,c}}.
$$

In fluid.cpp of svFSIplus, the following inconsistent tangent matrices are used,

$$
K_{ab}^{ij} = \alpha_{m} A_{ab}^{ij} + \alpha_{f}\gamma\Delta t B_{ab}^{ij}
$$

$$
G_{ac}^{i} = \alpha_{f}\gamma\Delta t \left(-\int_{\Omega} N_{c}^{q}N_{a, i}^{w} d\Omega + \int_{\Omega} \tau_{SUPS} N_{a, g}^{w} u_{g} N_{c, i}^{q} d\Omega - \int_{\Omega} N_{a, k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} N_{c, i}^{q} r_{Mk} d\Omega \right),
$$

$$
D_{ab}^{j} = \alpha_{f}\gamma\Delta t \left(\int_{\Omega} N_{a}^{q}N_{b, j}^{w} d\Omega - \int_{\Omega} \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}\left(-\frac{\alpha_{m}}{\alpha_{f}\gamma\Delta t}\rho N_{b}^{w}\delta_{ij} - \frac{\partial r_{Mi}}{\partial u_{n+\alpha_f,bj}}\right) d\Omega\right),
$$

$$
L_{ac} = \alpha_{f}\gamma\Delta t \int_{\Omega} \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}N_{c, i}^{q} d\Omega,
$$

where 

$$
A_{ab}^{ij} = \int_{\Omega} \left( \rho N_{a}^{w}N_{b}^{w} \delta_{ij} + \tau_{SUPS} N_{a,g}^{w} u_{g} \rho N_{b}^{w} \delta_{ij} - N_{a,k}^{w} \tau_{SUPS}^{2} N_{b}^{w} \delta_{ij} r_{Mk} \right) d\Omega ,
$$

$$
B_{ab}^{ij} = \int_{\Omega} \left( \rho N_{a}^{w} u_{k} N_{b, k}^{w} \delta_{ij} + N_{a, l}^{w} \mu N_{b, l}^{w} \delta_{ij} + N_{a, j}^{w} \mu N_{b, i}^{w} + \frac{\mu}{K} N_{a}^{w} N_{b}^{w} \delta_{ij} + \tau_{SUPS} N_{a,g}^{w} u_{g} \frac{\partial r_{Mi}}{\partial u_{n+\alpha_f,bj}} + \rho \nu_{LSIC} N_{b,j}^{w} N_{a,i}^{w} - N_{a}^{w} \tau_{SUPS} N_{b,k}^{w} \delta_{ij} r_{Mk} - N_{a,k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} \frac{\partial r_{Mi}}{\partial u_{n+\alpha_f,bj}} r_{Mk} + \frac{4}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{jk} N_{b,k}^{w} \epsilon_{il} N_{a,l}^{w} + \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a,k}^{w} N_{b,z}^{w} r_{Mk} r_{Mz} \delta_{ij} \right) d\Omega ,
$$

and 

$$
\frac{\partial r_{Mi}}{\partial u_{n+\alpha_f,bj}} = \left(\rho u_{k} N_{b,k}^{w} - \mu N_{b,kk}^{w} + \frac{\mu}{K} N_{b}^{w} - \frac{\partial \mu}{\partial x_{k}} N_{b,k}^{w} \right)\delta_{ij} - \frac{2}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{il} N_{b,l}^{w} u_{j, kk} - \frac{\partial \mu}{\partial x_{j}} N_{b,i}^{w}.
$$

These inconsistent tangent matrices were derived by using these assumptions:

<li> convective velocities (the $\boldsymbol{u}$ in $\boldsymbol{u} \cdot \boldsymbol{\nabla} u_{i}$) are constant,
</li>
<li> stabilization parameters, $\tau_{SUPS}$ and $\nu_{LSIC}$, are constant.
</li>

$K_{ab}^{ij}$ and $G_{ac}^{i}$ are coded in the fluid\_2d\_m/fluid\_3d\_m functions, while $D_{ab}^{j}$ and $L_{ac}$ are coded in the fluid\_2d\_c/fluid\_3d\_c functions.