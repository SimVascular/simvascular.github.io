
<h2> Fluid mechanics </h2>

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
\begin{aligned}
  L_{ac} = & \alpha_{f}\gamma\Delta t \int \tau_{SUPS}\frac{N_{a, i}^{q}}{\rho}N_{c, i}^{q} \,d\Omega,
\end{aligned}
$$

where 

$$
\frac{\partial r_{Mi}}{\partial \left[u_{n+\alpha_f}\right]_{bj}} = \left(\rho u_{k} N_{b,k}^{w} - \mu N_{b,kk}^{w} + \frac{\mu}{K} N_{b}^{w} - \frac{\partial \mu}{\partial x_{k}} N_{b,k}^{w} \right)\delta_{ij} - \frac{2}{\gamma} \frac{\partial \mu}{\partial \gamma} \epsilon_{il} N_{b,l}^{w} u_{j, kk} - \frac{\partial \mu}{\partial x_{j}} N_{b,i}^{w}.
$$


