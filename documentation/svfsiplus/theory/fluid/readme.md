
<h2> Fluid mechanics </h2>

The incompressible Navier-Stokes-Brinkman equations governing fluid flow in porous media are 

$$
\begin{aligned}
    \rho\left(\frac{d\boldsymbol{u}}{dt} + \boldsymbol{u} \cdot \boldsymbol{\nabla} \boldsymbol{u} - \boldsymbol{b}\right) &= \boldsymbol{\nabla} \cdot \boldsymbol{\sigma} - \frac{\mu}{K}\boldsymbol{u}, \\
    \boldsymbol{\nabla} \cdot \boldsymbol{u} &= 0,
\end{aligned}
$$

where $\boldsymbol{u} = \boldsymbol{u}\left(\boldsymbol{x}, t\right)$ is the velocity, $p = p\left(\boldsymbol{x}, t\right)$ is the pressure, $\boldsymbol{b} = \boldsymbol{b}\left(\boldsymbol{x}, t\right)$ is the body force, $\rho$ is the fluid density, and $K$ is the permeability of the porous media. The standard Navier-Stokes equations for general fluid flow can be recovered by simply removing the Darcy component (i.e., $K \rightarrow \infty$). The Cauchy stress tensor is $\boldsymbol{\sigma} = \boldsymbol{\sigma}\left(\boldsymbol{x}, t\right) = -p\boldsymbol{I} + 2\mu\left(\boldsymbol{u}\right)\epsilon$, where  $\epsilon = \epsilon\left(\boldsymbol{u}\right) = \nabla^{s} \boldsymbol{u} = \frac{1}{2}\left(\nabla \boldsymbol{u} + \left(\nabla\boldsymbol{u}\right)^{\text{T}} \right)$ is the strain rate tensor. The effective dynamic viscosity, $\mu\left(\boldsymbol{u}\right)$, is written generally as a function of velocity here to account for non-Newtonian fluids. For Newtonian fluids, $\mu$ is a simply constant. The divergence of the Cauchy stress tensor, written in both vector and index notation, is

$$
\begin{aligned}
    \boldsymbol{\nabla} \cdot \boldsymbol{\sigma} & = -\boldsymbol{\nabla}p + 2\boldsymbol{\epsilon}\boldsymbol{\nabla}\mu + \mu\nabla^{2}\boldsymbol{u}, \\
    \sigma_{ij,j} &= -p_{,i} + 2\epsilon_{ij}\frac{\partial \mu}{\partial x_{j}} + \mu\nabla^{2}u_{i},
\end{aligned}
$$


<!---
Strong form

The incompressible Navier-Stokes-Brinkman equations governing fluid flow in porous media are

$$
\begin{aligned}
    \rho\left(\frac{d\boldsymbol{u}}{dt} + \boldsymbol{u} \cdot \boldsymbol{\nabla} \boldsymbol{u} - \boldsymbol{b}\right) &= \boldsymbol{\nabla} \cdot \boldsymbol{\sigma} - \frac{\mu}{K}\boldsymbol{u}, \\
    \boldsymbol{\nabla} \cdot \boldsymbol{u} &= 0,
\end{aligned}
$$

where $K$ is the permeability of the porous media. The standard Navier-Stokes equations for general fluid flow can be recovered by simply removing the Darcy component (i.e., $K \rightarrow \infty$). 

The effective dynamic viscosity, $\mu\left(\boldsymbol{u}\right)$, is written generally as a function of velocity here to account for non-Newtonian fluids. For Newtonian fluids, $\mu$ is a simply constant. 

The boundary conditions are 

$$
\begin{aligned}
    \boldsymbol{u} &= \boldsymbol{g}, \\
    \boldsymbol{\sigma} \cdot \boldsymbol{n} &= \boldsymbol{h},
\end{aligned}
$$

where $\boldsymbol{g}$ is the prescribed velocity and $\boldsymbol{h}$ is the prescribed traction.

Residuals

The per-element momentum and continuity residuals are

$$
\begin{aligned}
  R_{ai}^{m} = & \int \rho N_{a}^{w}\frac{du_{i}}{dt} \,d\Omega + \int \rho N_{a}^{w}u_{k}u_{i, k} \,d\Omega - \int pN_{a, i}^{w} \,d\Omega + \int N_{a, j}^{w}2\mu\epsilon_{ij} \,d\Omega + \int \frac{\mu}{K}N_{a}^{w}u_{i} \,d\Omega - \int N_{a}^{w} \rho b_{i} \,d\Omega \\ 
        & + \int \tau_{SUPS}N_{a, k}^{w}u_{k}r_{Mi} \,d\Omega + \int \rho \nu_{LSIC}r_{C}N_{a, i}^{w} \,d\Omega - \int N_{a}^{w}\tau_{SUPS}r_{Mk}u_{i,k} \,d\Omega \\
        & - \int N_{a, k}^{w}\frac{\tau_{SUPS}^{2}}{\rho}r_{Mi}r_{Mk} \,d\Omega - \int \frac{\nu}{K}\tau_{SUPS}N_{a}^{w}r_{Mi} \,d\Omega + \int \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a, k}^{w}r_{Mk}r_{Mj}u_{i,j} \,d\Omega, \\
  R_{a}^{c} = & \int N_{a}^{q}u_{i,i} \,d\Omega + \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}r_{Mi} \,d\Omega,
\end{aligned}
$$

where, for the $a^{\text{th}}$ node in a given element, $R_{ai}^{m}$ is the momentum residual in the $i^{\text{th}}$ direction and $R_{a}^{c}$ is continuity residual.

Tangent matrices
  
The following inconsistent tangent matrices are used,

$$
K_{ab}^{ij} = \alpha_{m}\left( \int \rho N_{a}^{w}N_{b}^{w} \delta_{ij} \,d\Omega + \int \tau_{SUPS} N_{a,g}^{w} u_{g} \rho N_{b}^{w} \delta_{ij} \,d\Omega - \int N_{a,k}^{w} \tau_{SUPS}^{2} N_{b}^{w} \delta_{ij} r_{Mk} \,d\Omega\right)  + \alpha_{f}\gamma\Delta t \left(\int \rho N_{a}^{w} u_{k} N_{b, k}^{w} \delta_{ij} \,d\Omega + \int N_{a, l}^{w} \mu N_{b, l}^{w} \delta_{ij} \,d\Omega + \int N_{a, j}^{w} \mu N_{b, i}^{w} \,d\Omega \right.  + \left. \int \frac{\mu}{K} N_{a}^{w} N_{b}^{w} \delta_{ij} \,d\Omega + \int \tau_{SUPS} N_{a,g}^{w} u_{g} \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} \,d\Omega + \int \rho \nu_{LSIC} N_{b,j}^{w} N_{a,i}^{w} \,d\Omega \right.  - \left. \int N_{a}^{w} \tau_{SUPS} N_{b,k}^{w} \delta_{ij} r_{Mk} \,d\Omega - \int N_{a,k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} r_{Mk} \,d\Omega \right.  + \left. \int \frac{4}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{jk} N_{b,k}^{w} \epsilon_{il} N_{a,l}^{w} \,d\Omega + \int \frac{\bar{\tau}\tau_{SUPS}^{2}}{\rho} N_{a,k}^{w} N_{b,z}^{w} r_{Mk} r_{Mz} \delta_{ij} \,d\Omega\right),
$$

$$
G_{ac}^{i} = \alpha_{f}\gamma\Delta t \left(-\int N_{c}^{q}N_{a, i}^{w} \,d\Omega + \int \tau_{SUPS} N_{a, g}^{w} u_{g} N_{c, i}^{q} \,d\Omega - \int N_{a, k}^{w} \frac{\tau_{SUPS}^{2}}{\rho} N_{c, i}^{q} r_{Mk} \,d\Omega \right),
$$

$$
D_{ab}^{j} = \alpha_{f}\gamma\Delta t \left(\int N_{a}^{q}N_{b, j}^{w} \,d\Omega - \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}\left(-\frac{\alpha_{m}}{\alpha_{f}\gamma\Delta t}\rho N_{b}^{w}\delta_{ij} - \frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}}\right) \,d\Omega\right),
$$

$$
L_{ac} = \alpha_{f}\gamma\Delta t \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}N_{c, i}^{q} \,d\Omega,
$$

where 

$$
\frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} = \left(\rho u_{k} N_{b,k}^{w} - \mu N_{b,kk}^{w} + \frac{\mu}{K} N_{b}^{w} - \frac{\partial \mu}{\partial x_{k}} N_{b,k}^{w} \right)\delta_{ij} - \frac{2}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{il} N_{b,l}^{w} u_{j, kk} - \frac{\partial \mu}{\partial x_{j}} N_{b,i}^{w}.
$$
-->

